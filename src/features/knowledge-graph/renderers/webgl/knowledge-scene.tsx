'use client';

import { Canvas, useFrame, useThree, type ThreeEvent } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { Group, Mesh } from 'three';
import { Color, TOUCH, Vector3 } from 'three';
import { getFullGraph } from '@/core';
import type { GraphData } from '@/core';
import { getNodeIdentity } from '@/features/knowledge-graph/lib/node-identity';
import { horizonScene } from '@/design-system/scene-theme';

type Position = [number, number, number];

function hash(value: string) {
  return Array.from(value).reduce((total, character) => ((total << 5) - total) + character.charCodeAt(0), 0);
}

function SceneNode({ node, position, selected, hovered, onSelect, onHover, variant, mode, motionEnabled, anticipating, pointerResponsive }: { node: ReturnType<typeof getFullGraph>['nodes'][number]; position: Position; selected: boolean; hovered: boolean; onSelect: () => void; onHover: (active: boolean) => void; variant: 'home' | 'explorer'; mode: 'explore' | 'architect'; motionEnabled: boolean; anticipating: boolean; pointerResponsive: boolean }) {
  const mesh = useRef<Group>(null);
  const identity = getNodeIdentity(node.type);
  const scale = identity.baseRadius / 38;
  useFrame(({ clock, pointer }) => {
    if (!mesh.current) return;
    if (!motionEnabled) return;
    const energy = selected ? 1.22 : hovered ? 1.12 : 1 + Math.sin(clock.elapsedTime * 0.98 + hash(node.id)) * horizonScene.motion.nodePulse;
    mesh.current.scale.setScalar(scale * energy);
    mesh.current.rotation.z += identity.pulse === 'slow-rotate' ? horizonScene.motion.coreRotation : horizonScene.motion.nodeRotation;
    const phase = hash(node.id) * 0.01;
   const magnetic = pointerResponsive ? Math.max(0, 1 - Math.hypot(position[0] - pointer.x * 8, position[1] - pointer.y * 5) / 8) : 0;
   mesh.current.position.set(position[0] + Math.sin(clock.elapsedTime * 0.44 + phase) * 0.035 + (pointerResponsive ? pointer.x * magnetic * 0.05 : 0), position[1] + Math.cos(clock.elapsedTime * 0.35 + phase) * 0.028 + (pointerResponsive ? pointer.y * magnetic * 0.04 : 0), position[2] + Math.sin(clock.elapsedTime * 0.28 + phase) * 0.06);
  });

  const geometry = identity.shape === 'hexagon' ? <cylinderGeometry args={[0.5, 0.5, 0.16, 6]} />
    : identity.shape === 'diamond' ? <octahedronGeometry args={[0.58, 0]} />
      : identity.shape === 'shield' ? <coneGeometry args={[0.5, 0.85, 4]} />
        : identity.shape === 'ring' ? <torusGeometry args={[0.42, 0.08, 8, 24]} />
          : <sphereGeometry args={[0.46, 20, 20]} />;

  const major = node.type === 'product' || node.type === 'project';
  const activeColor = selected || hovered ? node.color : horizonScene.node.dormant;
  return <group ref={mesh} position={position} onClick={(event: ThreeEvent<MouseEvent>) => { event.stopPropagation(); onSelect(); }} onPointerOver={(event: ThreeEvent<PointerEvent>) => { if (pointerResponsive && event.nativeEvent.pointerType === 'mouse') { event.stopPropagation(); onHover(true); } }} onPointerOut={() => onHover(false)}>
    <mesh>
      {geometry}
      <meshStandardMaterial color={new Color(activeColor)} emissive={new Color(activeColor)} emissiveIntensity={mode === 'architect' ? selected ? 0.72 : hovered ? 0.34 : major ? 0.16 : 0.08 : selected ? 1.35 : hovered ? 0.48 : anticipating && major ? 0.14 : 0.012} transparent opacity={mode === 'architect' ? major ? 0.64 : 0.5 : identity.shape === 'ring' ? 0.42 : variant === 'home' ? anticipating && major ? 0.56 : 0.38 : 0.5} roughness={0.5} metalness={0.42} wireframe={mode === 'architect' && identity.shape !== 'ring'} />
    </mesh>
    {major && <mesh rotation={[0.8, 0.25, 0]}><torusGeometry args={[0.61, 0.018, 6, 28, Math.PI * 1.15]} /><meshBasicMaterial color={selected || hovered ? horizonScene.core.energy : mode === 'architect' ? horizonScene.core.base : horizonScene.node.dormant} transparent opacity={selected || hovered ? 0.55 : mode === 'architect' ? 0.32 : 0.16} /></mesh>}
  </group>;
}

function KnowledgeCore({ position, active, mode, motionEnabled, onSelect, variant, anticipating, mobile }: { position: Position; active: boolean; mode: 'explore' | 'architect'; motionEnabled: boolean; onSelect: () => void; variant: 'home' | 'explorer'; anticipating: boolean; mobile: boolean }) {
  const core = useRef<Group | null>(null);
  const computeCore = useRef<Group | null>(null);
  const transfer = useRef<Mesh | null>(null);
  const instrumentA = useRef<Group | null>(null);
  const instrumentB = useRef<Group | null>(null);
  const instrumentC = useRef<Group | null>(null);
  const reticle = useRef<Group | null>(null);
  const arcTrace = useRef<Mesh | null>(null);
  useFrame(({ clock, pointer }) => {
    if (!core.current || !motionEnabled) return;
    core.current.rotation.y += horizonScene.motion.coreRotation;
    if (!mobile) {
      core.current.rotation.x += pointer.y * 0.0008;
      core.current.rotation.z += pointer.x * 0.0008;
    }
    core.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * 0.86) * 0.035);
    if (computeCore.current) {
      computeCore.current.rotation.x -= 0.0017;
      computeCore.current.rotation.y += 0.0012;
    }
    if (instrumentA.current) instrumentA.current.rotation.z += anticipating ? 0.00012 : 0.00035;
    if (instrumentB.current) instrumentB.current.rotation.z -= anticipating ? 0.00008 : 0.00022;
    if (instrumentC.current) instrumentC.current.rotation.y += 0.00012;
    if (reticle.current) reticle.current.rotation.z -= 0.0005;
    if (transfer.current) {
      const cycle = clock.elapsedTime % 6;
      const activeTransfer = cycle < 0.7;
      transfer.current.visible = activeTransfer;
      if (activeTransfer) {
        const anchor = INTERNAL_ANCHORS[Math.floor(clock.elapsedTime / 6) % INTERNAL_ANCHORS.length];
        const progress = cycle / 0.7;
        transfer.current.position.set(anchor[0] * progress, anchor[1] * progress, anchor[2] * progress);
      }
    }
    if (arcTrace.current) {
      const cycle = clock.elapsedTime % 9;
      const activeTrace = cycle < 0.65;
      arcTrace.current.visible = activeTrace;
      if (activeTrace) {
        const angle = -0.7 + (cycle / 0.65) * 1.4;
        arcTrace.current.position.set(Math.cos(angle) * 2.16, Math.sin(angle) * 2.16, 0.08);
      }
    }
  });
  return <group ref={core} position={position} scale={variant === 'home' ? mobile ? 1.1 : 10 : 1.45} onClick={(event: ThreeEvent<MouseEvent>) => { event.stopPropagation(); onSelect(); }}>
    <mesh><dodecahedronGeometry args={[0.62, 0]} /><meshStandardMaterial color={horizonScene.core.shell} emissive={horizonScene.core.energy} emissiveIntensity={mode === 'architect' ? 0.38 : anticipating ? 0.7 : active ? 0.42 : 0.2} transparent opacity={mode === 'architect' ? 0.48 : 0.32} roughness={0.18} metalness={0.58} /></mesh>
    <mesh scale={1.16}><icosahedronGeometry args={[0.62, 1]} /><meshBasicMaterial color={horizonScene.core.energy} transparent opacity={mode === 'architect' ? 0.34 : 0.18} wireframe /></mesh>
    <group ref={computeCore}>
      <mesh scale={0.54}><octahedronGeometry args={[0.56, 1]} /><meshStandardMaterial color={horizonScene.core.base} emissive={horizonScene.core.energy} emissiveIntensity={mode === 'architect' ? 0.52 : 0.28} transparent opacity={mode === 'architect' ? 0.86 : 0.7} roughness={0.22} metalness={0.7} /></mesh>
      <mesh scale={0.76}><icosahedronGeometry args={[0.46, 1]} /><meshBasicMaterial color={horizonScene.core.hot} transparent opacity={0.6} wireframe /></mesh>
    </group>
    {INTERNAL_ANCHORS.map((anchor, index) => <group key={`${anchor.join('-')}-${index}`}>
      <line><bufferGeometry><bufferAttribute attach="attributes-position" args={[new Float32Array([0, 0, 0, ...anchor]), 3]} /></bufferGeometry><lineBasicMaterial color={horizonScene.core.energy} transparent opacity={0.2} /></line>
      <mesh position={anchor}><sphereGeometry args={[0.035, 8, 8]} /><meshBasicMaterial color={horizonScene.core.energy} transparent opacity={0.55} /></mesh>
    </group>)}
    <mesh><sphereGeometry args={[0.105, 12, 12]} /><meshBasicMaterial color={horizonScene.core.hot} /></mesh>
    <mesh ref={transfer}><sphereGeometry args={[0.045, 10, 10]} /><meshBasicMaterial color={horizonScene.core.hot} /></mesh>
    <group ref={reticle}>
      {RETICLE_BRACKETS.map(([x, y, rotation], index) => <mesh key={index} position={[x, y, 0.22]} rotation={[0, 0, rotation]}><boxGeometry args={[0.18, 0.018, 0.012]} /><meshBasicMaterial color={horizonScene.core.hot} transparent opacity={0.55} /></mesh>)}
    </group>
    <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[1.02, 0.018, 8, 48, Math.PI * 1.45]} /><meshBasicMaterial color={horizonScene.core.accent} transparent opacity={mode === 'architect' ? 0.16 : 0.34} /></mesh>
    <mesh rotation={[0.65, 0.7, 0]}><torusGeometry args={[1.28, 0.012, 8, 48, Math.PI * 1.2]} /><meshBasicMaterial color={horizonScene.core.energy} transparent opacity={0.2} /></mesh>
    <mesh rotation={[-0.5, 0.2, 0.7]}><torusGeometry args={[1.55, 0.01, 8, 48, Math.PI * 1.05]} /><meshBasicMaterial color={horizonScene.core.base} transparent opacity={0.28} /></mesh>
    <mesh rotation={[0.3, -0.6, -0.2]}><torusGeometry args={[1.8, 0.007, 8, 48, Math.PI * 0.9]} /><meshBasicMaterial color={horizonScene.core.base} transparent opacity={0.2} /></mesh>
    {[-0.9, -0.3, 0.3, 0.9].map((offset, index) => <mesh key={offset} rotation={[0.4 + index * 0.18, 0.3, offset]}><boxGeometry args={[0.035, 2.15, 0.035]} /><meshBasicMaterial color={horizonScene.core.base} transparent opacity={0.32} /></mesh>)}
    <group ref={instrumentA} rotation={[0.1, 0.08, 0]}>
      <mesh><torusGeometry args={[2.12, 0.008, 6, 48, Math.PI * 0.38]} /><meshBasicMaterial color={horizonScene.core.energy} transparent opacity={0.28} /></mesh>
      <mesh rotation={[0, 0, 1.6]}><torusGeometry args={[2.12, 0.008, 6, 48, Math.PI * 0.26]} /><meshBasicMaterial color={horizonScene.core.base} transparent opacity={0.36} /></mesh>
      {CALIBRATION_MARKS.slice(0, 8).map(([x, y, rotation], index) => <mesh key={index} position={[x, y, 0.04]} rotation={[0, 0, rotation]}><boxGeometry args={[index % 3 === 0 ? 0.14 : 0.08, 0.014, 0.01]} /><meshBasicMaterial color={horizonScene.core.base} transparent opacity={0.55} /></mesh>)}
    </group>
    <group ref={instrumentB} rotation={[0.45, 0.35, 0.9]}>
      <mesh><torusGeometry args={[2.45, 0.006, 6, 56, Math.PI * 0.32]} /><meshBasicMaterial color={horizonScene.core.base} transparent opacity={0.34} /></mesh>
      <mesh rotation={[0, 0, 2.1]}><torusGeometry args={[2.45, 0.006, 6, 56, Math.PI * 0.18]} /><meshBasicMaterial color={horizonScene.core.energy} transparent opacity={0.24} /></mesh>
      {CALIBRATION_MARKS.slice(8).map(([x, y, rotation], index) => <mesh key={index} position={[x * 1.16, y * 1.16, -0.06]} rotation={[0, 0, rotation]}><boxGeometry args={[index % 4 === 0 ? 0.15 : 0.075, 0.012, 0.01]} /><meshBasicMaterial color={horizonScene.core.base} transparent opacity={0.46} /></mesh>)}
    </group>
    <group ref={instrumentC} rotation={[-0.3, 0.55, -0.4]}>
      <mesh><torusGeometry args={[2.78, 0.005, 6, 56, Math.PI * 0.22]} /><meshBasicMaterial color={horizonScene.core.base} transparent opacity={0.28} /></mesh>
      <mesh rotation={[0, 0, 2.7]}><torusGeometry args={[2.78, 0.005, 6, 56, Math.PI * 0.16]} /><meshBasicMaterial color={horizonScene.core.energy} transparent opacity={0.2} /></mesh>
    </group>
    <mesh position={[0, 0, 0.18]}><boxGeometry args={[4.4, 0.012, 0.01]} /><meshBasicMaterial color={horizonScene.core.base} transparent opacity={0.28} /></mesh>
    <mesh position={[0, 0.2, 0.18]}><boxGeometry args={[0.012, 1.1, 0.01]} /><meshBasicMaterial color={horizonScene.core.base} transparent opacity={0.22} /></mesh>
    {PORTS.map(([x, y], index) => <mesh key={index} position={[x, y, 0.12]}><sphereGeometry args={[0.055, 8, 8]} /><meshBasicMaterial color={active || anticipating ? horizonScene.core.energy : horizonScene.core.base} transparent opacity={active || anticipating ? 0.82 : 0.42} /></mesh>)}
    <mesh ref={arcTrace} position={[2.16, 0, 0.08]}><sphereGeometry args={[0.045, 10, 10]} /><meshBasicMaterial color={horizonScene.core.hot} /></mesh>
  </group>;
}

const INTERNAL_ANCHORS: Array<[number, number, number]> = [
  [0.44, 0.12, 0.2], [-0.38, 0.28, -0.18], [0.16, -0.46, 0.22],
  [-0.18, -0.34, -0.36], [0.34, 0.38, -0.12], [-0.46, -0.08, 0.26],
  [0.08, 0.46, 0.34], [0.28, -0.18, -0.42],
];

const RETICLE_BRACKETS: Array<[number, number, number]> = [
  [0.22, 0.22, 0], [-0.22, 0.22, Math.PI / 2], [-0.22, -0.22, Math.PI], [0.22, -0.22, -Math.PI / 2],
];

const CALIBRATION_MARKS: Array<[number, number, number]> = Array.from({ length: 16 }, (_, index) => {
  const angle = (index / 16) * Math.PI * 2;
  return [Math.cos(angle) * 2.12, Math.sin(angle) * 2.12, angle + Math.PI / 2];
});

const PORTS: Array<[number, number]> = [
  [2.05, 0], [0.7, 1.92], [-1.45, 1.45], [-2.05, -0.15], [-0.62, -1.96], [1.5, -1.4],
];

function CameraFocus({ target, overviewVersion, variant, mobile }: { target: Position | null; overviewVersion: number; variant: 'home' | 'explorer'; mobile: boolean }) {
  const { camera } = useThree();
  const overviewRef = useRef(overviewVersion);
  const returnActive = useRef(false);
  useFrame(() => {
    if (overviewRef.current !== overviewVersion) {
      overviewRef.current = overviewVersion;
      returnActive.current = true;
    }
    if (!target && !returnActive.current) return;
    const desired = target
      ? new Vector3(target[0] * 1.12, target[1] * 1.12, target[2] + 6.4)
      : new Vector3(0, 0, variant === 'home' ? mobile ? 8.2 : 5.8 : 13);
    camera.position.lerp(desired, 0.045);
    camera.lookAt(target?.[0] ?? 0, target?.[1] ?? 0, target?.[2] ?? 0);
    if (!target && camera.position.distanceTo(desired) < 0.08) returnActive.current = false;
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

function KnowledgeUniverse({ onSelect, mode, selectedIds, pathEdgeKeys, pathNodeIds, graph, variant, motionEnabled, anticipating, mobile }: { onSelect: (id: string) => void; mode: 'explore' | 'architect'; selectedIds: Set<string>; pathEdgeKeys: Set<string>; pathNodeIds: Set<string>; graph: GraphData; variant: 'home' | 'explorer'; motionEnabled: boolean; anticipating: boolean; mobile: boolean }) {
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
      const radius = variant === 'home' ? mobile ? 4.4 + Math.sqrt(Math.max(rank, 0)) * 0.35 : 15 + Math.sqrt(Math.max(rank, 0)) * 1.5 : 2.2 + Math.sqrt(index) * 0.58;
      const topologyDepth = Math.min(2.8, Math.max(-2.8, ((degree.get(node.id) ?? 0) - 2) * -0.16 + Math.sin(index * 1.7)));
      positions.set(node.id, [Math.cos(angle) * radius, Math.sin(angle) * radius * 0.6, topologyDepth]);
    });
    return { ...graph, positions, coreId };
  }, [graph, mobile, variant]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const focusedNode = selectedIds.size > 0 ? nodes.find(node => selectedIds.has(node.id)) ?? null : null;
  const focusedRelations = focusedNode
    ? edges.filter(edge => edge.source === focusedNode.id || edge.target === focusedNode.id)
    : [];
  const visibleNodes = mobile && variant === 'home' ? nodes.filter(node => node.id === coreId || nodes.indexOf(node) < 5) : nodes;
  const visibleNodeIds = new Set(visibleNodes.map(node => node.id));
  return <>
    <ambientLight intensity={mode === 'architect' ? horizonScene.lighting.ambient * 1.3 : horizonScene.lighting.ambient} />
    <directionalLight position={[-4, 5, 6]} intensity={mode === 'architect' ? horizonScene.lighting.keyIntensity * 1.2 : horizonScene.lighting.keyIntensity} color={horizonScene.lighting.key} />
    <pointLight position={[0, 0, 4]} intensity={mode === 'architect' ? horizonScene.lighting.coreIntensity * 0.8 : horizonScene.lighting.coreIntensity} color={horizonScene.core.energy} distance={mode === 'architect' ? 18 : 14} />
    {edges.filter(edge => visibleNodeIds.has(edge.source) && visibleNodeIds.has(edge.target)).map(edge => {
      const from = positions.get(edge.source); const to = positions.get(edge.target);
      if (!from || !to) return null;
      const onPath = pathEdgeKeys.has(`${edge.source}->${edge.target}`);
      const active = onPath || selectedIds.has(edge.source) || selectedIds.has(edge.target) || hoveredId === edge.source || hoveredId === edge.target;
      const pathIndex = pathNodeIds.has(edge.source) && pathNodeIds.has(edge.target) ? Math.min([...pathNodeIds].indexOf(edge.source), [...pathNodeIds].indexOf(edge.target)) : -1;
      const depthVisibility = Math.max(0.72, Math.min(1.2, 1 + (from[2] + to[2]) / 14));
      const baseOpacity = onPath ? 0.92 : active ? 0.7 : mode === 'architect' ? 0.44 : 0.15;
      return <group key={`${edge.source}-${edge.target}`}><line><bufferGeometry><bufferAttribute attach="attributes-position" args={[new Float32Array([...from, ...to]), 3]} /></bufferGeometry><lineBasicMaterial color={onPath ? horizonScene.edge.path : active ? horizonScene.edge.active : mode === 'architect' ? horizonScene.edge.architect : horizonScene.edge.dormant} transparent opacity={baseOpacity * depthVisibility} /></line>{onPath && pathIndex >= 0 && <PathPulse from={from} to={to} delay={pathIndex * 0.22} enabled={motionEnabled} />}</group>;
    })}
    {visibleNodes.map(node => node.id === coreId ? <KnowledgeCore key={node.id} position={positions.get(node.id)!} active={selectedIds.size > 0 || Boolean(hoveredId)} mode={mode} motionEnabled={motionEnabled} onSelect={() => onSelect(node.id)} variant={variant} anticipating={anticipating} mobile={mobile} /> : <SceneNode key={node.id} node={node} position={positions.get(node.id)!} selected={selectedIds.has(node.id) || pathNodeIds.has(node.id)} hovered={hoveredId === node.id} onHover={active => setHoveredId(active ? node.id : null)} onSelect={() => onSelect(node.id)} variant={variant} mode={mode} motionEnabled={motionEnabled} anticipating={anticipating} pointerResponsive={!mobile} />)}
    {focusedNode && <SpatialAnnotation node={focusedNode} position={positions.get(focusedNode.id)!} relationCount={focusedRelations.length} primary />}
    {focusedRelations.slice(0, 3).map(edge => {
      const relatedId = edge.source === focusedNode?.id ? edge.target : edge.source;
      const related = nodes.find(node => node.id === relatedId);
      const position = positions.get(relatedId);
      return related && position ? <SpatialAnnotation key={`annotation-${relatedId}`} node={related} position={position} relationCount={0} primary={false} /> : null;
    })}
  </>;
}

export function KnowledgeScene({ className = '', onNodeSelect, onEmptySpace, onUnavailable, mode = 'explore', quality = 'standard', focusId, selectedIds = [], pathNodeIds = [], pathEdgeKeys = [], graphData, variant = 'explorer', overviewVersion = 0, anticipating = false }: { className?: string; onNodeSelect?: (id: string) => void; onEmptySpace?: () => void; onUnavailable?: () => void; mode?: 'explore' | 'architect'; quality?: 'low' | 'standard' | 'ultra'; focusId?: string | null; selectedIds?: string[]; pathNodeIds?: string[]; pathEdgeKeys?: string[]; graphData?: GraphData; variant?: 'home' | 'explorer'; overviewVersion?: number; anticipating?: boolean }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mobile, setMobile] = useState(false);
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
    const radius = variant === 'home' ? mobile ? 4.4 + Math.sqrt(Math.max(rank, 0)) * 0.35 : 15 + Math.sqrt(Math.max(rank, 0)) * 1.5 : 2.2 + Math.sqrt(index) * 0.58;
    return [Math.cos(angle) * radius, Math.sin(angle) * radius * 0.6, Math.min(2.8, Math.max(-2.8, (degree - 2) * -0.16 + Math.sin(index * 1.7)))] as Position;
  }, [focusId, graph, mobile, variant]);
  const dpr: [number, number] = quality === 'low' ? [1, 1] : quality === 'ultra' ? [1, 2] : [1, 1.75];
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReducedMotion(media.matches);
    const updateVisibility = () => setIsPageVisible(!document.hidden);
    const mediaMobile = window.matchMedia('(max-width: 767px)');
    const updateMobile = () => setMobile(mediaMobile.matches);
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.05 });
    if (hostRef.current) observer.observe(hostRef.current);
    updateMotion();
    updateVisibility();
    updateMobile();
    media.addEventListener('change', updateMotion);
    mediaMobile.addEventListener('change', updateMobile);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => { observer.disconnect(); media.removeEventListener('change', updateMotion); mediaMobile.removeEventListener('change', updateMobile); document.removeEventListener('visibilitychange', updateVisibility); };
  }, []);
  return <div ref={hostRef} className={className} aria-label="Visualização espacial do conhecimento">
    <Canvas frameloop={isVisible && isPageVisible ? 'always' : 'never'} camera={{ position: variant === 'home' ? [0, 0, mobile ? 8.2 : 5.8] : [0, 0, 13], fov: 46 }} dpr={reducedMotion || mobile ? [1, 1] : dpr} gl={{ antialias: !mobile && quality !== 'low', alpha: true }} onPointerMissed={onEmptySpace} onCreated={({ gl }) => gl.domElement.addEventListener('webglcontextlost', event => { event.preventDefault(); onUnavailable?.(); }, { once: true })}>
      <fog attach="fog" args={[horizonScene.environment.fog, 8, 22]} />
      <KnowledgeUniverse graph={graph} variant={variant} mode={mode} motionEnabled={!reducedMotion} anticipating={anticipating} onSelect={onNodeSelect ?? (() => {})} selectedIds={new Set(selectedIds)} pathNodeIds={new Set(pathNodeIds)} pathEdgeKeys={new Set(pathEdgeKeys)} mobile={mobile} />
      {!reducedMotion && <CameraFocus target={focusPosition} overviewVersion={overviewVersion} variant={variant} mobile={mobile} />}
      <OrbitControls enabled={variant === 'explorer' && !focusId && !reducedMotion} enablePan enableZoom enableRotate touches={{ ONE: TOUCH.PAN, TWO: TOUCH.DOLLY_ROTATE }} minDistance={6} maxDistance={22} maxPolarAngle={Math.PI * 0.65} minPolarAngle={Math.PI * 0.35} />
    </Canvas>
  </div>;
}
