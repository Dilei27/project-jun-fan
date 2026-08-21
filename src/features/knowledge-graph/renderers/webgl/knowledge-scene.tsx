'use client';

import { Canvas, useFrame, useThree, type ThreeEvent } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { Mesh, Group } from 'three';
import { Color, Vector3 } from 'three';
import { getFullGraph } from '@/core';
import { getNodeIdentity } from '@/features/knowledge-graph/lib/node-identity';
import { horizonScene } from '@/design-system/scene-theme';

type Position = [number, number, number];

function hash(value: string) {
  return Array.from(value).reduce((total, character) => ((total << 5) - total) + character.charCodeAt(0), 0);
}

function SceneNode({ node, position, selected, onSelect }: { node: ReturnType<typeof getFullGraph>['nodes'][number]; position: Position; selected: boolean; onSelect: () => void }) {
  const mesh = useRef<Mesh>(null);
  const identity = getNodeIdentity(node.type);
  const scale = identity.baseRadius / 38;
  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const energy = selected ? 1.22 : 1 + Math.sin(clock.elapsedTime * 0.8 + hash(node.id)) * horizonScene.motion.nodePulse;
    mesh.current.scale.setScalar(scale * energy);
    mesh.current.rotation.z += identity.pulse === 'slow-rotate' ? horizonScene.motion.coreRotation : horizonScene.motion.nodeRotation;
  });

  const geometry = identity.shape === 'hexagon' ? <cylinderGeometry args={[0.5, 0.5, 0.16, 6]} />
    : identity.shape === 'diamond' ? <octahedronGeometry args={[0.58, 0]} />
      : identity.shape === 'shield' ? <coneGeometry args={[0.5, 0.85, 4]} />
        : identity.shape === 'ring' ? <torusGeometry args={[0.42, 0.08, 8, 24]} />
          : <sphereGeometry args={[0.46, 20, 20]} />;

  return (
    <mesh ref={mesh} position={position} onClick={(event: ThreeEvent<MouseEvent>) => { event.stopPropagation(); onSelect(); }}>
      {geometry}
      <meshStandardMaterial color={new Color(node.color)} emissive={new Color(node.color)} emissiveIntensity={selected ? 1.5 : 0.35} transparent opacity={identity.shape === 'ring' ? 0.8 : 0.92} roughness={0.35} metalness={0.2} />
    </mesh>
  );
}

function KnowledgeCore({ position }: { position: Position }) {
  const core = useRef<Group | null>(null);
  useFrame(({ clock }) => {
    if (!core.current) return;
    core.current.rotation.y += horizonScene.motion.coreRotation;
    core.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * 0.7) * 0.035);
  });
  return <group ref={core} position={position}>
    <mesh><icosahedronGeometry args={[0.78, 2]} /><meshStandardMaterial color={horizonScene.core.base} emissive={horizonScene.core.energy} emissiveIntensity={0.8} transparent opacity={0.45} wireframe /></mesh>
    <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[1.02, 0.018, 8, 48]} /><meshBasicMaterial color={horizonScene.core.accent} transparent opacity={0.5} /></mesh>
    <mesh rotation={[0.65, 0.7, 0]}><torusGeometry args={[1.24, 0.012, 8, 48]} /><meshBasicMaterial color={horizonScene.core.energy} transparent opacity={0.3} /></mesh>
  </group>;
}

function CameraFocus({ target }: { target: Position | null }) {
  const { camera } = useThree();
  useFrame(() => {
    if (!target) return;
    const desired = new Vector3(target[0] * 1.12, target[1] * 1.12, target[2] + 6.4);
    camera.position.lerp(desired, 0.045);
    camera.lookAt(target[0], target[1], target[2]);
  });
  return null;
}

function KnowledgeUniverse({ onSelect, mode, selectedIds, pathEdgeKeys, pathNodeIds }: { onSelect: (id: string) => void; mode: 'explore' | 'architect'; selectedIds: Set<string>; pathEdgeKeys: Set<string>; pathNodeIds: Set<string> }) {
  const { nodes, edges, positions, coreId } = useMemo(() => {
    const graph = getFullGraph();
    const degree = new Map<string, number>();
    graph.edges.forEach(edge => { degree.set(edge.source, (degree.get(edge.source) ?? 0) + 1); degree.set(edge.target, (degree.get(edge.target) ?? 0) + 1); });
    const coreId = [...graph.nodes].sort((a, b) => (degree.get(b.id) ?? 0) - (degree.get(a.id) ?? 0))[0]?.id;
    const positions = new Map<string, Position>();
    graph.nodes.forEach((node, index) => {
      const angle = index * 2.399963;
      const radius = 2.2 + Math.sqrt(index) * 0.58;
      const topologyDepth = Math.min(2.8, Math.max(-2.8, ((degree.get(node.id) ?? 0) - 2) * -0.16 + Math.sin(index * 1.7)));
      positions.set(node.id, [Math.cos(angle) * radius, Math.sin(angle) * radius * 0.6, topologyDepth]);
    });
    return { ...graph, positions, coreId };
  }, []);
  return <>
    <ambientLight intensity={horizonScene.lighting.ambient} />
    <directionalLight position={[4, 5, 6]} intensity={horizonScene.lighting.keyIntensity} color={horizonScene.lighting.key} />
    <pointLight position={[0, 0, 4]} intensity={horizonScene.lighting.coreIntensity} color={horizonScene.core.energy} distance={14} />
    {edges.map(edge => {
      const from = positions.get(edge.source); const to = positions.get(edge.target);
      if (!from || !to) return null;
      const onPath = pathEdgeKeys.has(`${edge.source}->${edge.target}`);
      const active = onPath || selectedIds.has(edge.source) || selectedIds.has(edge.target);
      return <line key={`${edge.source}-${edge.target}`}><bufferGeometry><bufferAttribute attach="attributes-position" args={[new Float32Array([...from, ...to]), 3]} /></bufferGeometry><lineBasicMaterial color={onPath ? horizonScene.edge.path : active ? horizonScene.edge.active : mode === 'architect' ? horizonScene.edge.architect : horizonScene.edge.dormant} transparent opacity={onPath ? 0.92 : active ? 0.7 : mode === 'architect' ? 0.34 : 0.15} /></line>;
    })}
    {nodes.map(node => node.id === coreId ? <KnowledgeCore key={node.id} position={positions.get(node.id)!} /> : <SceneNode key={node.id} node={node} position={positions.get(node.id)!} selected={selectedIds.has(node.id) || pathNodeIds.has(node.id)} onSelect={() => onSelect(node.id)} />)}
  </>;
}

export function KnowledgeScene({ className = '', onNodeSelect, onUnavailable, mode = 'explore', quality = 'standard', focusId, selectedIds = [], pathNodeIds = [], pathEdgeKeys = [] }: { className?: string; onNodeSelect?: (id: string) => void; onUnavailable?: () => void; mode?: 'explore' | 'architect'; quality?: 'low' | 'standard' | 'ultra'; focusId?: string | null; selectedIds?: string[]; pathNodeIds?: string[]; pathEdgeKeys?: string[] }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const graph = useMemo(() => getFullGraph(), []);
  const focusPosition = useMemo(() => {
    if (!focusId) return null;
    const index = graph.nodes.findIndex(node => node.id === focusId);
    if (index < 0) return null;
    const angle = index * 2.399963;
    const degree = graph.edges.filter(edge => edge.source === focusId || edge.target === focusId).length;
    return [Math.cos(angle) * (2.2 + Math.sqrt(index) * 0.58), Math.sin(angle) * (2.2 + Math.sqrt(index) * 0.58) * 0.6, Math.min(2.8, Math.max(-2.8, (degree - 2) * -0.16 + Math.sin(index * 1.7)))] as Position;
  }, [focusId, graph]);
  const dpr: [number, number] = quality === 'low' ? [1, 1] : quality === 'ultra' ? [1, 2] : [1, 1.75];
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReducedMotion(media.matches);
    const updateVisibility = () => setIsPageVisible(!document.hidden);
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.05 });
    if (hostRef.current) observer.observe(hostRef.current);
    updateMotion();
    updateVisibility();
    media.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => { observer.disconnect(); media.removeEventListener('change', updateMotion); document.removeEventListener('visibilitychange', updateVisibility); };
  }, []);
  return <div ref={hostRef} className={className} aria-label="Visualização espacial do conhecimento">
    <Canvas frameloop={isVisible && isPageVisible ? 'always' : 'never'} camera={{ position: [0, 0, 13], fov: 46 }} dpr={reducedMotion ? [1, 1] : dpr} gl={{ antialias: quality !== 'low', alpha: true }} onCreated={({ gl }) => gl.domElement.addEventListener('webglcontextlost', event => { event.preventDefault(); onUnavailable?.(); }, { once: true })}>
      <fog attach="fog" args={[horizonScene.environment.fog, 8, 22]} />
      <KnowledgeUniverse mode={mode} onSelect={onNodeSelect ?? (() => {})} selectedIds={new Set(selectedIds)} pathNodeIds={new Set(pathNodeIds)} pathEdgeKeys={new Set(pathEdgeKeys)} />
      {!reducedMotion && <CameraFocus target={focusPosition} />}
      <OrbitControls enabled={!focusId && !reducedMotion} enablePan enableZoom enableRotate minDistance={6} maxDistance={22} maxPolarAngle={Math.PI * 0.65} minPolarAngle={Math.PI * 0.35} />
    </Canvas>
  </div>;
}
