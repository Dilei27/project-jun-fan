'use client';

import { Canvas, useFrame, useThree, type ThreeEvent } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import type { Mesh, Group } from 'three';
import { Color, Vector3 } from 'three';
import { getFullGraph } from '@/core';
import { getNodeIdentity } from '@/features/knowledge-graph/lib/node-identity';

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
    const energy = selected ? 1.22 : 1 + Math.sin(clock.elapsedTime * 0.8 + hash(node.id)) * 0.035;
    mesh.current.scale.setScalar(scale * energy);
    mesh.current.rotation.z += identity.pulse === 'slow-rotate' ? 0.003 : 0.0006;
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
    core.current.rotation.y += 0.003;
    core.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * 0.7) * 0.035);
  });
  return <group ref={core} position={position}>
    <mesh><icosahedronGeometry args={[0.78, 2]} /><meshStandardMaterial color="#4F8CFF" emissive="#4F8CFF" emissiveIntensity={0.8} transparent opacity={0.45} wireframe /></mesh>
    <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[1.02, 0.018, 8, 48]} /><meshBasicMaterial color="#2DD4BF" transparent opacity={0.5} /></mesh>
    <mesh rotation={[0.65, 0.7, 0]}><torusGeometry args={[1.24, 0.012, 8, 48]} /><meshBasicMaterial color="#4F8CFF" transparent opacity={0.3} /></mesh>
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
    <ambientLight intensity={0.25} />
    <directionalLight position={[4, 5, 6]} intensity={1.1} color="#D6E6FF" />
    <pointLight position={[0, 0, 4]} intensity={1.8} color="#4F8CFF" distance={14} />
    {edges.map(edge => {
      const from = positions.get(edge.source); const to = positions.get(edge.target);
      if (!from || !to) return null;
      const onPath = pathEdgeKeys.has(`${edge.source}->${edge.target}`);
      const active = onPath || selectedIds.has(edge.source) || selectedIds.has(edge.target);
      return <line key={`${edge.source}-${edge.target}`}><bufferGeometry><bufferAttribute attach="attributes-position" args={[new Float32Array([...from, ...to]), 3]} /></bufferGeometry><lineBasicMaterial color={onPath ? '#2DD4BF' : active ? '#4F8CFF' : '#6D7B90'} transparent opacity={onPath ? 0.92 : active ? 0.7 : mode === 'architect' ? 0.34 : 0.15} /></line>;
    })}
    {nodes.map(node => node.id === coreId ? <KnowledgeCore key={node.id} position={positions.get(node.id)!} /> : <SceneNode key={node.id} node={node} position={positions.get(node.id)!} selected={selectedIds.has(node.id) || pathNodeIds.has(node.id)} onSelect={() => onSelect(node.id)} />)}
  </>;
}

export function KnowledgeScene({ className = '', onNodeSelect, mode = 'explore', quality = 'standard', focusId, selectedIds = [], pathNodeIds = [], pathEdgeKeys = [] }: { className?: string; onNodeSelect?: (id: string) => void; mode?: 'explore' | 'architect'; quality?: 'low' | 'standard' | 'ultra'; focusId?: string | null; selectedIds?: string[]; pathNodeIds?: string[]; pathEdgeKeys?: string[] }) {
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
  return <div className={className} aria-label="Visualização espacial do conhecimento">
    <Canvas camera={{ position: [0, 0, 13], fov: 46 }} dpr={dpr} gl={{ antialias: quality !== 'low', alpha: true }}>
      <fog attach="fog" args={['#080C12', 8, 22]} />
      <KnowledgeUniverse mode={mode} onSelect={onNodeSelect ?? (() => {})} selectedIds={new Set(selectedIds)} pathNodeIds={new Set(pathNodeIds)} pathEdgeKeys={new Set(pathEdgeKeys)} />
      <CameraFocus target={focusPosition} />
      <OrbitControls enabled={!focusId} enablePan enableZoom enableRotate minDistance={6} maxDistance={22} maxPolarAngle={Math.PI * 0.65} minPolarAngle={Math.PI * 0.35} />
    </Canvas>
  </div>;
}
