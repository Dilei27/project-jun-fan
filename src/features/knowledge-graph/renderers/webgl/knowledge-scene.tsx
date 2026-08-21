'use client';

import { Canvas, useFrame, useThree, type ThreeEvent } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { Mesh, Group } from 'three';
import { Color, Vector3 } from 'three';
import { getFullGraph } from '@/core';
import type { GraphData } from '@/core';
import { getNodeIdentity } from '@/features/knowledge-graph/lib/node-identity';
import { horizonScene } from '@/design-system/scene-theme';

type Position = [number, number, number];

function hash(value: string) {
  return Array.from(value).reduce((total, character) => ((total << 5) - total) + character.charCodeAt(0), 0);
}

function SceneNode({ node, position, selected, hovered, onSelect, onHover, variant, mode, motionEnabled }: { node: ReturnType<typeof getFullGraph>['nodes'][number]; position: Position; selected: boolean; hovered: boolean; onSelect: () => void; onHover: (active: boolean) => void; variant: 'home' | 'explorer'; mode: 'explore' | 'architect'; motionEnabled: boolean }) {
  const mesh = useRef<Mesh>(null);
  const identity = getNodeIdentity(node.type);
  const scale = identity.baseRadius / 38;
  useFrame(({ clock }) => {
    if (!mesh.current) return;
    if (!motionEnabled) return;
    const energy = selected ? 1.22 : hovered ? 1.12 : 1 + Math.sin(clock.elapsedTime * 0.8 + hash(node.id)) * horizonScene.motion.nodePulse;
    mesh.current.scale.setScalar(scale * energy);
    mesh.current.rotation.z += identity.pulse === 'slow-rotate' ? horizonScene.motion.coreRotation : horizonScene.motion.nodeRotation;
  });

  const geometry = identity.shape === 'hexagon' ? <cylinderGeometry args={[0.5, 0.5, 0.16, 6]} />
    : identity.shape === 'diamond' ? <octahedronGeometry args={[0.58, 0]} />
      : identity.shape === 'shield' ? <coneGeometry args={[0.5, 0.85, 4]} />
        : identity.shape === 'ring' ? <torusGeometry args={[0.42, 0.08, 8, 24]} />
          : <sphereGeometry args={[0.46, 20, 20]} />;

  return (
    <mesh ref={mesh} position={position} onClick={(event: ThreeEvent<MouseEvent>) => { event.stopPropagation(); onSelect(); }} onPointerOver={(event: ThreeEvent<PointerEvent>) => { event.stopPropagation(); onHover(true); }} onPointerOut={() => onHover(false)}>
      {geometry}
      <meshStandardMaterial color={new Color(selected || hovered || variant === 'explorer' ? node.color : horizonScene.node.dormant)} emissive={new Color(selected || hovered || variant === 'explorer' ? node.color : horizonScene.node.dormant)} emissiveIntensity={mode === 'architect' ? 0.12 : selected ? 1.5 : hovered ? 0.6 : variant === 'home' ? 0.015 : 0.35} transparent opacity={mode === 'architect' ? 0.48 : identity.shape === 'ring' ? 0.45 : variant === 'home' ? 0.42 : 0.92} roughness={0.48} metalness={0.35} wireframe={mode === 'architect' && identity.shape !== 'ring'} />
    </mesh>
  );
}

function KnowledgeCore({ position, active, mode, motionEnabled, onSelect }: { position: Position; active: boolean; mode: 'explore' | 'architect'; motionEnabled: boolean; onSelect: () => void }) {
  const core = useRef<Group | null>(null);
  useFrame(({ clock, pointer }) => {
    if (!core.current || !motionEnabled) return;
    core.current.rotation.y += horizonScene.motion.coreRotation;
    core.current.rotation.x += pointer.y * 0.0008;
    core.current.rotation.z += pointer.x * 0.0008;
    core.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * 0.7) * 0.035);
  });
  return <group ref={core} position={position} scale={1.45} onClick={(event: ThreeEvent<MouseEvent>) => { event.stopPropagation(); onSelect(); }}>
    <mesh><icosahedronGeometry args={[0.78, 2]} /><meshStandardMaterial color={horizonScene.core.base} emissive={horizonScene.core.energy} emissiveIntensity={mode === 'architect' ? 0.16 : active ? 1.3 : 0.8} transparent opacity={mode === 'architect' ? 0.7 : 0.45} wireframe /></mesh>
    <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[1.02, 0.018, 8, 48, Math.PI * 1.55]} /><meshBasicMaterial color={horizonScene.core.accent} transparent opacity={mode === 'architect' ? 0.22 : 0.38} /></mesh>
    <mesh rotation={[0.65, 0.7, 0]}><torusGeometry args={[1.24, 0.012, 8, 48, Math.PI * 1.3]} /><meshBasicMaterial color={horizonScene.core.energy} transparent opacity={0.22} /></mesh>
    <mesh rotation={[-0.5, 0.2, 0.7]}><torusGeometry args={[1.42, 0.008, 8, 48, Math.PI * 1.15]} /><meshBasicMaterial color={horizonScene.core.base} transparent opacity={0.25} /></mesh>
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

function SpatialAnnotation({ node, position, relationCount, primary }: { node: ReturnType<typeof getFullGraph>['nodes'][number]; position: Position; relationCount: number; primary: boolean }) {
  return <Html position={position} center distanceFactor={9} style={{ pointerEvents: 'none' }}>
    <div className={`whitespace-nowrap ${primary ? 'translate-x-10 -translate-y-10' : 'translate-x-4 -translate-y-4'} text-left`}>
      <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-text-primary">
        <span className="h-px w-8 bg-accent-qa/70" />
        {primary ? node.label : node.type}
      </div>
      {primary && <div className="mt-1 pl-10 text-[9px] uppercase tracking-[0.12em] text-text-muted">{node.type} · {relationCount} relações</div>}
    </div>
  </Html>;
}

function PathPulse({ from, to, delay, enabled }: { from: Position; to: Position; delay: number; enabled: boolean }) {
  const pulse = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    if (!pulse.current || !enabled) return;
    const progress = (clock.elapsedTime * 0.55 - delay) % 1;
    const t = progress < 0 ? progress + 1 : progress;
    pulse.current.position.set(from[0] + (to[0] - from[0]) * t, from[1] + (to[1] - from[1]) * t, from[2] + (to[2] - from[2]) * t);
  });
  return <mesh ref={pulse} position={from}><sphereGeometry args={[0.07, 10, 10]} /><meshBasicMaterial color={horizonScene.edge.path} /></mesh>;
}

function KnowledgeUniverse({ onSelect, mode, selectedIds, pathEdgeKeys, pathNodeIds, graph, variant, motionEnabled }: { onSelect: (id: string) => void; mode: 'explore' | 'architect'; selectedIds: Set<string>; pathEdgeKeys: Set<string>; pathNodeIds: Set<string>; graph: GraphData; variant: 'home' | 'explorer'; motionEnabled: boolean }) {
  const { nodes, edges, positions, coreId } = useMemo(() => {
    const degree = new Map<string, number>();
    graph.edges.forEach(edge => { degree.set(edge.source, (degree.get(edge.source) ?? 0) + 1); degree.set(edge.target, (degree.get(edge.target) ?? 0) + 1); });
    const coreId = variant === 'home' && graph.nodes.some(node => node.id === 'product-qa-command-center')
      ? 'product-qa-command-center'
      : [...graph.nodes].sort((a, b) => (degree.get(b.id) ?? 0) - (degree.get(a.id) ?? 0))[0]?.id;
    const positions = new Map<string, Position>();
    graph.nodes.forEach((node, index) => {
      if (node.id === coreId) {
        positions.set(node.id, [0, 0, 0]);
        return;
      }
      const rank = index - (index > graph.nodes.findIndex(item => item.id === coreId) ? 1 : 0);
      const angle = rank * 2.399963;
      const radius = variant === 'home' ? 2.8 + Math.sqrt(Math.max(rank, 0)) * 0.72 : 2.2 + Math.sqrt(index) * 0.58;
      const topologyDepth = Math.min(2.8, Math.max(-2.8, ((degree.get(node.id) ?? 0) - 2) * -0.16 + Math.sin(index * 1.7)));
      positions.set(node.id, [Math.cos(angle) * radius, Math.sin(angle) * radius * 0.6, topologyDepth]);
    });
    return { ...graph, positions, coreId };
  }, [graph, variant]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const focusedNode = selectedIds.size > 0 ? nodes.find(node => selectedIds.has(node.id)) ?? null : null;
  const focusedRelations = focusedNode
    ? edges.filter(edge => edge.source === focusedNode.id || edge.target === focusedNode.id)
    : [];
  return <>
    <ambientLight intensity={horizonScene.lighting.ambient} />
    <directionalLight position={[4, 5, 6]} intensity={horizonScene.lighting.keyIntensity} color={horizonScene.lighting.key} />
    <pointLight position={[0, 0, 4]} intensity={horizonScene.lighting.coreIntensity} color={horizonScene.core.energy} distance={14} />
    {edges.map(edge => {
      const from = positions.get(edge.source); const to = positions.get(edge.target);
      if (!from || !to) return null;
      const onPath = pathEdgeKeys.has(`${edge.source}->${edge.target}`);
      const active = onPath || selectedIds.has(edge.source) || selectedIds.has(edge.target) || hoveredId === edge.source || hoveredId === edge.target;
      const pathIndex = pathNodeIds.has(edge.source) && pathNodeIds.has(edge.target) ? Math.min([...pathNodeIds].indexOf(edge.source), [...pathNodeIds].indexOf(edge.target)) : -1;
      return <group key={`${edge.source}-${edge.target}`}><line><bufferGeometry><bufferAttribute attach="attributes-position" args={[new Float32Array([...from, ...to]), 3]} /></bufferGeometry><lineBasicMaterial color={onPath ? horizonScene.edge.path : active ? horizonScene.edge.active : mode === 'architect' ? horizonScene.edge.architect : horizonScene.edge.dormant} transparent opacity={onPath ? 0.92 : active ? 0.7 : mode === 'architect' ? 0.34 : 0.15} /></line>{onPath && pathIndex >= 0 && <PathPulse from={from} to={to} delay={pathIndex * 0.22} enabled={motionEnabled} />}</group>;
    })}
    {nodes.map(node => node.id === coreId ? <KnowledgeCore key={node.id} position={positions.get(node.id)!} active={selectedIds.size > 0 || Boolean(hoveredId)} mode={mode} motionEnabled={motionEnabled} onSelect={() => onSelect(node.id)} /> : <SceneNode key={node.id} node={node} position={positions.get(node.id)!} selected={selectedIds.has(node.id) || pathNodeIds.has(node.id)} hovered={hoveredId === node.id} onHover={active => setHoveredId(active ? node.id : null)} onSelect={() => onSelect(node.id)} variant={variant} mode={mode} motionEnabled={motionEnabled} />)}
    {focusedNode && <SpatialAnnotation node={focusedNode} position={positions.get(focusedNode.id)!} relationCount={focusedRelations.length} primary />}
    {focusedRelations.slice(0, 3).map(edge => {
      const relatedId = edge.source === focusedNode?.id ? edge.target : edge.source;
      const related = nodes.find(node => node.id === relatedId);
      const position = positions.get(relatedId);
      return related && position ? <SpatialAnnotation key={`annotation-${relatedId}`} node={related} position={position} relationCount={0} primary={false} /> : null;
    })}
  </>;
}

export function KnowledgeScene({ className = '', onNodeSelect, onEmptySpace, onUnavailable, mode = 'explore', quality = 'standard', focusId, selectedIds = [], pathNodeIds = [], pathEdgeKeys = [], graphData, variant = 'explorer' }: { className?: string; onNodeSelect?: (id: string) => void; onEmptySpace?: () => void; onUnavailable?: () => void; mode?: 'explore' | 'architect'; quality?: 'low' | 'standard' | 'ultra'; focusId?: string | null; selectedIds?: string[]; pathNodeIds?: string[]; pathEdgeKeys?: string[]; graphData?: GraphData; variant?: 'home' | 'explorer' }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const graph = useMemo(() => graphData ?? getFullGraph(), [graphData]);
  const focusPosition = useMemo(() => {
    if (!focusId) return null;
    const index = graph.nodes.findIndex(node => node.id === focusId);
    if (index < 0) return null;
    const homeCoreIndex = graph.nodes.findIndex(node => node.id === 'product-qa-command-center');
    if (variant === 'home' && index === homeCoreIndex) return [0, 0, 0] as Position;
    const rank = variant === 'home' ? index - (index > homeCoreIndex ? 1 : 0) : index;
    const angle = rank * 2.399963;
    const degree = graph.edges.filter(edge => edge.source === focusId || edge.target === focusId).length;
    const radius = variant === 'home' ? 2.8 + Math.sqrt(Math.max(rank, 0)) * 0.72 : 2.2 + Math.sqrt(index) * 0.58;
    return [Math.cos(angle) * radius, Math.sin(angle) * radius * 0.6, Math.min(2.8, Math.max(-2.8, (degree - 2) * -0.16 + Math.sin(index * 1.7)))] as Position;
  }, [focusId, graph, variant]);
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
    <Canvas frameloop={isVisible && isPageVisible ? 'always' : 'never'} camera={{ position: variant === 'home' ? [0, 0, 10.5] : [0, 0, 13], fov: 46 }} dpr={reducedMotion ? [1, 1] : dpr} gl={{ antialias: quality !== 'low', alpha: true }} onPointerMissed={onEmptySpace} onCreated={({ gl }) => gl.domElement.addEventListener('webglcontextlost', event => { event.preventDefault(); onUnavailable?.(); }, { once: true })}>
      <fog attach="fog" args={[horizonScene.environment.fog, 8, 22]} />
      <KnowledgeUniverse graph={graph} variant={variant} mode={mode} motionEnabled={!reducedMotion} onSelect={onNodeSelect ?? (() => {})} selectedIds={new Set(selectedIds)} pathNodeIds={new Set(pathNodeIds)} pathEdgeKeys={new Set(pathEdgeKeys)} />
      {!reducedMotion && <CameraFocus target={focusPosition} />}
      <OrbitControls enabled={variant === 'explorer' && !focusId && !reducedMotion} enablePan enableZoom enableRotate minDistance={6} maxDistance={22} maxPolarAngle={Math.PI * 0.65} minPolarAngle={Math.PI * 0.35} />
    </Canvas>
  </div>;
}
