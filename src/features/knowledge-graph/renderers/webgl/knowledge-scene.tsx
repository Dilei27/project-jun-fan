'use client';

import { Canvas, useFrame, useThree, type ThreeEvent } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { Group, Mesh } from 'three';
import { Color, TOUCH, Vector3, AdditiveBlending, PerspectiveCamera, MeshBasicMaterial, LineBasicMaterial, type Line } from 'three';
import { getFullGraph } from '@/core';
import type { GraphData } from '@/core';
import { getNodeIdentity } from '@/features/knowledge-graph/lib/node-identity';
import { horizonScene, starkGraph } from '@/design-system/scene-theme';
import { getKnowledgeDriveDuration, knowledgeDriveTiming, type KnowledgeDriveState } from '../../knowledge-drive';

type Position = [number, number, number];

function hash(value: string) {
  return Array.from(value).reduce((total, character) => ((total << 5) - total) + character.charCodeAt(0), 0);
}

function randomAt(index: number, salt: number) {
  const value = Math.sin((index + 1) * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function SceneNode({ node, position, selected, hovered, onSelect, onHover, variant, mode, motionEnabled, anticipating, pointerResponsive, connectedToCore }: { node: ReturnType<typeof getFullGraph>['nodes'][number]; position: Position; selected: boolean; hovered: boolean; onSelect: () => void; onHover: (active: boolean) => void; variant: 'home' | 'explorer'; mode: 'explore' | 'architect'; motionEnabled: boolean; anticipating: boolean; pointerResponsive: boolean; connectedToCore: boolean }) {
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
  const structural = major || node.type === 'architecture';
  const explorer = variant === 'explorer';
  const distance = Math.hypot(position[0], position[1]);
  const depthVisibility = Math.max(0.72, Math.min(1, 1.08 - distance / (variant === 'home' ? 22 : 9)));
  const architect = mode === 'architect';

  // Stark palette selection
  const s = starkGraph.node;
  const h = horizonScene;
  const activeColor = selected
    ? (explorer ? s.selected : h.node.selected)
    : hovered
      ? (explorer ? s.active : h.edge.active)
      : structural
        ? (explorer ? s.structural : h.node.structural)
        : (explorer ? s.dormant : h.node.dormant);
  const rimColor = selected
    ? (explorer ? s.selected : h.node.selected)
    : hovered
      ? (explorer ? s.active : h.edge.active)
      : structural
        ? (explorer ? s.structuralRim : h.node.structural)
        : (explorer ? s.dormantRim : h.node.dormant);

  // Material differentiation by node type
  const isRing = identity.shape === 'ring';
  const isTriangle = identity.shape === 'shield';
  const isSecondary = !major && !structural;

  // Base opacity hierarchy — increased base visibility for readable silhouettes
  let materialOpacity: number;
  if (selected || hovered) materialOpacity = 0.88;
  else if (architect) materialOpacity = structural ? (explorer ? 0.88 : 0.7) : (explorer ? 0.72 : 0.56);
  else materialOpacity = structural ? (explorer ? 0.82 : 0.54) : isRing ? (explorer ? 0.72 : 0.5) : (explorer ? 0.68 : 0.44);
  materialOpacity *= depthVisibility;

  // Emissive intensity hierarchy
  let emissiveIntensity: number;
  if (selected) emissiveIntensity = explorer ? 1.05 : 0.92;
  else if (hovered) emissiveIntensity = explorer ? 0.42 : 0.34;
  else if (architect) emissiveIntensity = structural ? (explorer ? (node.type === 'architecture' ? 0.42 : 0.36) : 0.24) : (explorer ? 0.12 : 0.08);
  else emissiveIntensity = structural ? (explorer ? 0.14 : 0.075) : (explorer ? 0.05 : 0.025);
  emissiveIntensity += (anticipating && major ? 0.08 : 0);

  // Metallic material properties by type
  const roughness = explorer ? (major ? 0.28 : isSecondary ? 0.55 : 0.42) : 0.42;
  const metalness = explorer ? (major ? 0.78 : isSecondary ? 0.45 : 0.62) : 0.58;

  return <group ref={mesh} position={position} onClick={(event: ThreeEvent<MouseEvent>) => { event.stopPropagation(); onSelect(); }} onPointerOver={(event: ThreeEvent<PointerEvent>) => { if (pointerResponsive && event.nativeEvent.pointerType === 'mouse') { event.stopPropagation(); onHover(true); } }} onPointerOut={() => onHover(false)}>
    {/* Main geometry */}
    <mesh>
      {geometry}
      <meshStandardMaterial
        color={new Color(activeColor)}
        emissive={new Color(rimColor)}
        emissiveIntensity={emissiveIntensity}
        transparent
        opacity={materialOpacity}
        roughness={roughness}
        metalness={metalness}
        wireframe={architect && !isRing}
      />
    </mesh>
    {/* Rim light for major nodes — subtle fresnel-like glow */}
    {explorer && major && <mesh scale={1.06}>
      {geometry}
      <meshBasicMaterial color={new Color(rimColor)} transparent opacity={(selected || hovered ? 0.28 : architect ? 0.18 : 0.1) * depthVisibility} depthWrite={false} blending={AdditiveBlending} />
    </mesh>}
    {/* Major node orbital accent */}
    {major && <mesh rotation={[0.8, 0.25, 0]}><torusGeometry args={[0.61, 0.018, 6, 28, Math.PI * 1.15]} /><meshBasicMaterial color={new Color(selected ? (explorer ? s.selected : h.node.selected) : hovered ? (explorer ? s.active : h.edge.active) : architect ? (explorer ? starkGraph.core.base : h.core.base) : (explorer ? s.dormant : h.node.dormant))} transparent opacity={(selected || hovered ? 0.7 : architect ? (explorer ? 0.56 : 0.44) : (explorer ? 0.42 : 0.24)) * depthVisibility} /></mesh>}
    {/* Ring nodes — hollow instrumentation */}
    {isRing && <>
      <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.34, 0.012, 8, 24]} /><meshBasicMaterial color={new Color(explorer ? s.ringEdge : h.core.energy)} transparent opacity={(architect ? (explorer ? 0.48 : 0.28) : (explorer ? 0.32 : 0.16)) * depthVisibility} /></mesh>
      {explorer && <mesh rotation={[Math.PI / 2, 0, 0]} scale={1.08}><torusGeometry args={[0.34, 0.008, 8, 24]} /><meshBasicMaterial color={new Color(s.ringInner)} transparent opacity={connectedToCore ? 0.26 : 0.14} depthWrite={false} blending={AdditiveBlending} /></mesh>}
    </>}
    {/* Triangle nodes — architectural markers */}
    {explorer && isTriangle && <mesh rotation={[0, 0, Math.PI]} scale={0.92}>
      {geometry}
      <meshStandardMaterial color={new Color(s.triangleFace)} emissive={new Color(s.triangleEdge)} emissiveIntensity={architect ? 0.28 : 0.14} transparent opacity={materialOpacity * 0.85} roughness={0.35} metalness={0.65} wireframe={architect} />
    </mesh>}
  </group>;
}

function CoreHalo({ mobile, variant }: { mobile: boolean; variant: 'home' | 'explorer' }) {
  const explorer = variant === 'explorer';
  // Volumetric atmospheric field — very soft, very large
  const haloRadius = explorer ? (mobile ? 3.2 : starkGraph.halo.radius) : variant === 'home' && !mobile ? 0.38 : mobile ? 2.4 : 3.5;
  const haloOpacity = explorer ? (mobile ? 0.012 : starkGraph.halo.opacity) : mobile ? 0.018 : 0.035;
  const lightIntensity = explorer ? (mobile ? 0.65 : starkGraph.lighting.coreIntensity) : mobile ? 0.5 : 0.8;
  const lightDistance = explorer ? (mobile ? 10 : 18) : mobile ? 8 : 12;
  return <>
    <pointLight position={[0, 0, 1.5]} intensity={lightIntensity} distance={lightDistance} color={explorer ? starkGraph.core.energy : horizonScene.core.energy} />
    {explorer && <pointLight position={[0, 0, -2]} intensity={mobile ? 0.25 : 0.45} distance={mobile ? 6 : 10} color={starkGraph.core.hot} />}
    <mesh position={[0, 0, -1.8]}>
      <sphereGeometry args={[haloRadius, 32, 32]} />
      <meshBasicMaterial color={explorer ? starkGraph.halo.color : horizonScene.core.energy} transparent opacity={haloOpacity} depthWrite={false} blending={AdditiveBlending} />
    </mesh>
    {explorer && !mobile && <mesh position={[0, 0, -2.2]}>
      <sphereGeometry args={[haloRadius * 0.65, 24, 24]} />
      <meshBasicMaterial color={starkGraph.core.energy} transparent opacity={haloOpacity * 0.6} depthWrite={false} blending={AdditiveBlending} />
    </mesh>}
  </>;
}

function HomeCoreTelemetry({ active, driveState, motionEnabled }: { active: boolean; driveState: KnowledgeDriveState; motionEnabled: boolean }) {
  const outerScan = useRef<Group>(null);
  const innerScan = useRef<Group>(null);
  const orbit = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (!motionEnabled) return;
    const boosted = active || driveState === 'ready' || driveState === 'compress' || driveState === 'drive';
    const scanSpeed = boosted ? 0.0028 : 0.0011;
    if (outerScan.current) {
      outerScan.current.rotation.z += scanSpeed;
      outerScan.current.rotation.y = Math.sin(clock.elapsedTime * 0.38) * 0.14;
      outerScan.current.scale.setScalar(boosted ? 1.06 + Math.sin(clock.elapsedTime * 3.2) * 0.025 : 1);
    }
    if (innerScan.current) {
      innerScan.current.rotation.z -= scanSpeed * 1.6;
      innerScan.current.rotation.x = 0.62 + Math.cos(clock.elapsedTime * 0.44) * 0.08;
      innerScan.current.scale.setScalar(boosted ? 1.04 + Math.cos(clock.elapsedTime * 4.1) * 0.02 : 1);
    }
    if (orbit.current) {
      orbit.current.rotation.z -= scanSpeed * 2.2;
      orbit.current.scale.setScalar(boosted ? 1.08 : 1);
    }
  });

  const scanOpacity = driveState === 'drive' ? 0.92 : active ? 0.72 : 0.5;
  return <group>
    <group ref={outerScan} rotation={[0.22, 0.18, 0]}>
      <mesh><torusGeometry args={[3.1, 0.009, 6, 72, Math.PI * 0.34]} /><meshBasicMaterial color={horizonScene.core.energy} transparent opacity={scanOpacity} blending={AdditiveBlending} depthWrite={false} /></mesh>
      <mesh rotation={[0, 0, 1.42]}><torusGeometry args={[3.1, 0.009, 6, 72, Math.PI * 0.18]} /><meshBasicMaterial color={horizonScene.core.hot} transparent opacity={scanOpacity * 0.78} blending={AdditiveBlending} depthWrite={false} /></mesh>
      <mesh rotation={[0, 0, 3.28]}><torusGeometry args={[3.1, 0.006, 6, 72, Math.PI * 0.12]} /><meshBasicMaterial color={horizonScene.core.accent} transparent opacity={scanOpacity * 0.68} blending={AdditiveBlending} depthWrite={false} /></mesh>
    </group>
    <group ref={innerScan} rotation={[0.62, -0.4, 0.3]}>
      <mesh><torusGeometry args={[2.56, 0.011, 6, 64, Math.PI * 0.26]} /><meshBasicMaterial color={horizonScene.core.energy} transparent opacity={scanOpacity * 0.86} blending={AdditiveBlending} depthWrite={false} /></mesh>
      <mesh rotation={[0, 0, 2.22]}><torusGeometry args={[2.56, 0.007, 6, 64, Math.PI * 0.16]} /><meshBasicMaterial color={horizonScene.core.hot} transparent opacity={scanOpacity * 0.62} blending={AdditiveBlending} depthWrite={false} /></mesh>
    </group>
    <group ref={orbit} rotation={[0.12, -0.34, 0]}>
      {[[2.82, 0.08], [-1.42, 2.42], [-1.4, -2.4]].map(([x, y], index) => <group key={index} position={[x, y, 0.2]}>
        <mesh><sphereGeometry args={[0.052, 10, 10]} /><meshBasicMaterial color={index === 1 ? horizonScene.core.hot : horizonScene.core.energy} transparent opacity={scanOpacity} blending={AdditiveBlending} depthWrite={false} /></mesh>
        <mesh scale={2.2}><ringGeometry args={[0.05, 0.075, 16]} /><meshBasicMaterial color={horizonScene.core.energy} transparent opacity={scanOpacity * 0.4} blending={AdditiveBlending} depthWrite={false} /></mesh>
      </group>)}
    </group>
  </group>;
}

function KnowledgeCore({ position, active, homeCoreHovered, mode, motionEnabled, onSelect, onHover, variant, driveState, mobile, selectedIds, hoveredId }: { position: Position; active: boolean; homeCoreHovered: boolean; mode: 'explore' | 'architect'; motionEnabled: boolean; onSelect: () => void; onHover: (active: boolean) => void; variant: 'home' | 'explorer'; driveState: KnowledgeDriveState; mobile: boolean; selectedIds: Set<string>; hoveredId: string | null }) {
  const explorer = variant === 'explorer';
  const core = useRef<Group | null>(null);
  const computeCore = useRef<Group | null>(null);
  const transfer = useRef<Mesh | null>(null);
  const instrumentA = useRef<Group | null>(null);
  const instrumentB = useRef<Group | null>(null);
  const instrumentC = useRef<Group | null>(null);
  const reticle = useRef<Group | null>(null);
  const arcTrace = useRef<Mesh | null>(null);
  const nucleus = useRef<Mesh | null>(null);
  const driveRef = useRef({ state: driveState, at: 0 });
  // Stark energy reactor pulse
  const reactorPulse = useRef(0);
  useFrame(({ clock, pointer }) => {
    if (!core.current || !motionEnabled) return;
    if (driveRef.current.state !== driveState) driveRef.current = { state: driveState, at: clock.elapsedTime };
    const driveElapsed = clock.elapsedTime - driveRef.current.at;
    const compressing = driveState === 'compress' ? Math.min(driveElapsed / 0.11, 1) : 0;
    core.current.rotation.y += horizonScene.motion.coreRotation;
    if (!mobile) {
      core.current.rotation.x += pointer.y * 0.0008;
      core.current.rotation.z += pointer.x * 0.0008;
    }
    const contraction = 1 - compressing * 0.16;
    core.current.scale.setScalar(contraction + Math.sin(clock.elapsedTime * 0.86) * (compressing > 0 ? 0.012 : explorer ? 0.042 : 0.035));
    if (nucleus.current) nucleus.current.scale.setScalar(1 + compressing * 1.9 + (explorer ? Math.sin(clock.elapsedTime * 1.4) * 0.12 : 0));
    if (computeCore.current) {
      computeCore.current.rotation.x -= 0.0017 + compressing * 0.02;
      computeCore.current.rotation.y += 0.0012 + compressing * 0.016;
    }
    if (instrumentA.current) instrumentA.current.rotation.z += driveState === 'compress' ? 0.006 : driveState === 'ready' ? 0.00006 : driveState === 'drive' ? 0.0012 : explorer ? 0.00045 : 0.00035;
    if (instrumentB.current) instrumentB.current.rotation.z -= driveState === 'compress' ? 0.005 : driveState === 'ready' ? 0.00004 : driveState === 'drive' ? 0.0009 : explorer ? 0.00032 : 0.00022;
    if (instrumentC.current) instrumentC.current.rotation.y += 0.00012 + compressing * 0.008;
    if (reticle.current) reticle.current.rotation.z -= 0.0005 + compressing * 0.01;
    if (instrumentC.current) instrumentC.current.rotation.y += 0.00012;
    if (reticle.current) reticle.current.rotation.z -= 0.0005;
    // Stark: micro pulse when node selected/hovered
    reactorPulse.current = selectedIds.size > 0 || hoveredId ? Math.min(reactorPulse.current + 0.03, 1) : Math.max(reactorPulse.current - 0.02, 0);
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
  // Color palette selection
  const cShell = explorer ? starkGraph.core.shellOuter : horizonScene.core.shell;
  const cEnergy = explorer ? starkGraph.core.energy : horizonScene.core.energy;
  const cBase = explorer ? starkGraph.core.shellMid : horizonScene.core.base;
  const cHot = explorer ? starkGraph.core.hot : horizonScene.core.hot;
  const cNucleus = explorer ? starkGraph.core.nucleus : horizonScene.core.hot;
  const cAccent = explorer ? starkGraph.core.accent : horizonScene.core.accent;
  // Layered emissive intensities
  const shellEmissive = mode === 'architect'
    ? (explorer ? 0.72 : 0.5)
    : driveState === 'ready' ? 0.78 : driveState === 'compress' ? 0.32 : driveState === 'drive' ? 1.5 : driveState === 'transition' ? 0.9 : active ? 0.5 : explorer ? 0.38 : 0.28;
  const shellOpacity = mode === 'architect'
    ? (explorer ? 0.68 : 0.56)
    : explorer ? 0.46 : 0.38;
  const wireOpacity = mode === 'architect' ? (explorer ? 0.48 : 0.42) : explorer ? 0.3 : 0.24;
  const innerEmissive = mode === 'architect'
    ? (explorer ? 0.85 : 0.68)
    : driveState === 'drive' ? 1.45 : driveState === 'ready' ? 0.54 : explorer ? 0.42 : 0.36;
  const innerOpacity = mode === 'architect' ? 0.9 : explorer ? 0.8 : 0.76;
  const hotWireOpacity = driveState === 'drive' ? 1 : driveState === 'ready' ? 0.8 : explorer ? 0.72 : 0.68;
  return <group ref={core} position={position} scale={variant === 'home' ? mobile ? 1.1 : 10 : 1.45} onClick={(event: ThreeEvent<MouseEvent>) => { event.stopPropagation(); onSelect(); }} onPointerOver={(event: ThreeEvent<PointerEvent>) => { if (variant === 'home' && !mobile && event.nativeEvent.pointerType === 'mouse') { event.stopPropagation(); onHover(true); } }} onPointerOut={() => { if (variant === 'home') onHover(false); }}>
    <CoreHalo mobile={mobile} variant={variant} />
    {variant === 'home' && <HomeCoreTelemetry active={active || homeCoreHovered} driveState={driveState} motionEnabled={motionEnabled} />}
    {/* Outer shell — dark steel-blue */}
    <mesh><dodecahedronGeometry args={[0.62, 0]} /><meshStandardMaterial color={new Color(cShell)} emissive={new Color(cEnergy)} emissiveIntensity={shellEmissive} transparent opacity={shellOpacity} roughness={0.14} metalness={0.78} /></mesh>
    {/* Wireframe mid structure */}
    <mesh scale={1.16}><icosahedronGeometry args={[0.62, 1]} /><meshBasicMaterial color={new Color(cEnergy)} transparent opacity={wireOpacity} wireframe /></mesh>
    {/* Inner compute core */}
    <group ref={computeCore}>
      <mesh scale={0.54}><octahedronGeometry args={[0.56, 1]} /><meshStandardMaterial color={new Color(cBase)} emissive={new Color(cEnergy)} emissiveIntensity={innerEmissive} transparent opacity={innerOpacity} roughness={0.12} metalness={0.82} /></mesh>
      <mesh scale={0.76}><icosahedronGeometry args={[0.46, 1]} /><meshBasicMaterial color={new Color(cHot)} transparent opacity={hotWireOpacity} wireframe /></mesh>
    </group>
    {/* Internal energy anchors */}
    {INTERNAL_ANCHORS.map((anchor, index) => <group key={`${anchor.join('-')}-${index}`}>
      <line><bufferGeometry><bufferAttribute attach="attributes-position" args={[new Float32Array([0, 0, 0, ...anchor]), 3]} /></bufferGeometry><lineBasicMaterial color={new Color(cEnergy)} transparent opacity={explorer ? 0.38 : 0.28} /></line>
      <mesh position={anchor}><sphereGeometry args={[0.035, 8, 8]} /><meshBasicMaterial color={new Color(cHot)} transparent opacity={explorer ? 0.82 : 0.72} /></mesh>
    </group>)}
    {/* Nucleus — cold white ice-blue */}
    <mesh ref={nucleus}><sphereGeometry args={[0.105, 12, 12]} /><meshBasicMaterial color={new Color(cNucleus)} /></mesh>
    {/* Energy transfer particle */}
    <mesh ref={transfer}><sphereGeometry args={[0.045, 10, 10]} /><meshBasicMaterial color={new Color(cHot)} /></mesh>
    {/* Stark HUD reticle */}
    <group ref={reticle}>
      {RETICLE_BRACKETS.map(([x, y, rotation], index) => <mesh key={index} position={[x, y, 0.22]} rotation={[0, 0, rotation]}><boxGeometry args={[0.18, 0.018, 0.012]} /><meshBasicMaterial color={new Color(cHot)} transparent opacity={explorer ? 0.65 : 0.55} /></mesh>)}
    </group>
    {/* Orbital rings */}
    <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[1.02, 0.018, 8, 48, Math.PI * 1.45]} /><meshBasicMaterial color={new Color(cAccent)} transparent opacity={mode === 'architect' ? (explorer ? 0.22 : 0.16) : explorer ? 0.38 : 0.34} /></mesh>
    <mesh rotation={[0.65, 0.7, 0]}><torusGeometry args={[1.28, 0.012, 8, 48, Math.PI * 1.2]} /><meshBasicMaterial color={new Color(cEnergy)} transparent opacity={explorer ? 0.26 : 0.2} /></mesh>
    <mesh rotation={[-0.5, 0.2, 0.7]}><torusGeometry args={[1.55, 0.01, 8, 48, Math.PI * 1.05]} /><meshBasicMaterial color={new Color(cBase)} transparent opacity={explorer ? 0.34 : 0.28} /></mesh>
    <mesh rotation={[0.3, -0.6, -0.2]}><torusGeometry args={[1.8, 0.007, 8, 48, Math.PI * 0.9]} /><meshBasicMaterial color={new Color(cBase)} transparent opacity={explorer ? 0.26 : 0.2} /></mesh>
    {/* Axis bars */}
    {[-0.9, -0.3, 0.3, 0.9].map((offset, index) => <mesh key={offset} rotation={[0.4 + index * 0.18, 0.3, offset]}><boxGeometry args={[0.035, 2.15, 0.035]} /><meshBasicMaterial color={new Color(cBase)} transparent opacity={explorer ? 0.38 : 0.32} /></mesh>)}
    {/* Instrumentation rings */}
    <group ref={instrumentA} rotation={[0.1, 0.08, 0]}>
      <mesh><torusGeometry args={[2.12, 0.008, 6, 48, Math.PI * 0.38]} /><meshBasicMaterial color={new Color(cEnergy)} transparent opacity={explorer ? 0.36 : 0.28} /></mesh>
      <mesh rotation={[0, 0, 1.6]}><torusGeometry args={[2.12, 0.008, 6, 48, Math.PI * 0.26]} /><meshBasicMaterial color={new Color(cBase)} transparent opacity={explorer ? 0.44 : 0.36} /></mesh>
      {CALIBRATION_MARKS.slice(0, 8).map(([x, y, rotation], index) => <mesh key={index} position={[x, y, 0.04]} rotation={[0, 0, rotation]}><boxGeometry args={[index % 3 === 0 ? 0.14 : 0.08, 0.014, 0.01]} /><meshBasicMaterial color={new Color(cBase)} transparent opacity={explorer ? 0.62 : 0.55} /></mesh>)}
    </group>
    <group ref={instrumentB} rotation={[0.45, 0.35, 0.9]}>
      <mesh><torusGeometry args={[2.45, 0.006, 6, 56, Math.PI * 0.32]} /><meshBasicMaterial color={new Color(cBase)} transparent opacity={explorer ? 0.42 : 0.34} /></mesh>
      <mesh rotation={[0, 0, 2.1]}><torusGeometry args={[2.45, 0.006, 6, 56, Math.PI * 0.18]} /><meshBasicMaterial color={new Color(cEnergy)} transparent opacity={explorer ? 0.32 : 0.24} /></mesh>
      {CALIBRATION_MARKS.slice(8).map(([x, y, rotation], index) => <mesh key={index} position={[x * 1.16, y * 1.16, -0.06]} rotation={[0, 0, rotation]}><boxGeometry args={[index % 4 === 0 ? 0.15 : 0.075, 0.012, 0.01]} /><meshBasicMaterial color={new Color(cBase)} transparent opacity={explorer ? 0.52 : 0.46} /></mesh>)}
    </group>
    <group ref={instrumentC} rotation={[-0.3, 0.55, -0.4]}>
      <mesh><torusGeometry args={[2.78, 0.005, 6, 56, Math.PI * 0.22]} /><meshBasicMaterial color={new Color(cBase)} transparent opacity={explorer ? 0.34 : 0.28} /></mesh>
      <mesh rotation={[0, 0, 2.7]}><torusGeometry args={[2.78, 0.005, 6, 56, Math.PI * 0.16]} /><meshBasicMaterial color={new Color(cEnergy)} transparent opacity={explorer ? 0.26 : 0.2} /></mesh>
    </group>
    {/* Calibration crosshairs */}
    <mesh position={[0, 0, 0.18]}><boxGeometry args={[4.4, 0.012, 0.01]} /><meshBasicMaterial color={new Color(cBase)} transparent opacity={explorer ? 0.34 : 0.28} /></mesh>
    <mesh position={[0, 0.2, 0.18]}><boxGeometry args={[0.012, 1.1, 0.01]} /><meshBasicMaterial color={new Color(cBase)} transparent opacity={explorer ? 0.28 : 0.22} /></mesh>
    {/* Energy ports */}
    {PORTS.map(([x, y], index) => <mesh key={index} position={[x, y, 0.12]}><sphereGeometry args={[0.055, 8, 8]} /><meshBasicMaterial color={active || driveState !== 'idle' ? new Color(cEnergy) : new Color(cBase)} transparent opacity={active || driveState !== 'idle' ? driveState === 'drive' ? 1 : 0.82 : explorer ? 0.48 : 0.42} /></mesh>)}
    <mesh ref={arcTrace} position={[2.16, 0, 0.08]}><sphereGeometry args={[0.045, 10, 10]} /><meshBasicMaterial color={new Color(cHot)} /></mesh>
  </group>;
}

function DriveField({ state, mobile }: { state: KnowledgeDriveState; mobile: boolean }) {
  const field = useRef<Group>(null);
  const started = useRef({ state, at: 0 });
  const releaseDuration = useMemo(() => getKnowledgeDriveDuration(knowledgeDriveTiming.release) / 1000, []);
  useFrame(({ clock }) => {
    if (!field.current) return;
    if (started.current.state !== state) started.current = { state, at: clock.elapsedTime };
    const elapsed = clock.elapsedTime - started.current.at;
    const release = state === 'drive' || state === 'transition' ? Math.min(elapsed / releaseDuration, 1) : 0;
    const prepared = state === 'ready' || state === 'compress' ? Math.min(elapsed / 0.3, 1) : 0;
    field.current.visible = state === 'ready' || state === 'compress' || state === 'drive' || state === 'transition';
    const fade = state === 'transition' ? Math.max(1 - elapsed / releaseDuration, 0) : 1;
    field.current.scale.set((0.6 + release * (mobile ? 1.1 : 2.2)) * fade, (0.6 + release * (mobile ? 1.1 : 2.2)) * fade, 0.3 + prepared * 0.2 + release * (mobile ? 1.6 : 3.4));
  });
  return <group ref={field} position={[0, 0, -1.8]} rotation={[Math.PI / 2, 0, 0]} visible={false}>
    <mesh><coneGeometry args={[1.55, 4.8, 24, 1, true]} /><meshBasicMaterial color="#BCEEFF" transparent opacity={mobile ? 0.16 : 0.26} depthWrite={false} blending={AdditiveBlending} /></mesh>
    <mesh scale={[0.62, 0.72, 1]}><coneGeometry args={[1.15, 4.5, 20, 1, true]} /><meshBasicMaterial color={horizonScene.core.energy} transparent opacity={mobile ? 0.24 : 0.36} depthWrite={false} blending={AdditiveBlending} /></mesh>
    <mesh scale={[0.24, 0.38, 1.05]}><coneGeometry args={[0.8, 4.2, 16, 1, true]} /><meshBasicMaterial color="#E8F7FF" transparent opacity={0.5} depthWrite={false} blending={AdditiveBlending} /></mesh>
  </group>;
}

function DriveShockwave({ state }: { state: KnowledgeDriveState }) {
  const ring = useRef<Group>(null);
  const started = useRef({ state, at: 0 });
  const duration = 0.35;
  useFrame(({ clock }) => {
    if (!ring.current) return;
    if (started.current.state !== state) started.current = { state, at: clock.elapsedTime };
    const active = state === 'drive';
    ring.current.visible = active;
    if (!active) return;
    const progress = Math.min((clock.elapsedTime - started.current.at) / duration, 1);
    const eased = 1 - (1 - progress) ** 2;
    const scale = 0.8 + eased * 7.5;
    ring.current.scale.setScalar(scale);
    ring.current.children.forEach(child => {
      const material = (child as Mesh).material as MeshBasicMaterial | undefined;
      if (material) material.opacity = 0.85 * (1 - progress);
    });
  });
  return <group ref={ring} position={[0, 0, 0.3]} visible={false}>
    <mesh><torusGeometry args={[1, 0.045, 8, 64]} /><meshBasicMaterial color="#E8F7FF" transparent opacity={0.85} depthWrite={false} blending={AdditiveBlending} /></mesh>
    <mesh><torusGeometry args={[1.25, 0.018, 8, 64]} /><meshBasicMaterial color={horizonScene.core.energy} transparent opacity={0.55} depthWrite={false} blending={AdditiveBlending} /></mesh>
  </group>;
}

function DriveStreaks({ targets, state, mobile }: { targets: Position[]; state: KnowledgeDriveState; mobile: boolean }) {
  const group = useRef<Group>(null);
  const started = useRef({ state, at: 0 });
  const releaseDuration = useMemo(() => getKnowledgeDriveDuration(knowledgeDriveTiming.release) / 1000, []);
  useFrame(({ clock }) => {
    if (!group.current) return;
    if (started.current.state !== state) started.current = { state, at: clock.elapsedTime };
    const active = state === 'drive';
    group.current.visible = active;
    if (!active) return;
    const elapsed = clock.elapsedTime - started.current.at;
    const progress = Math.min(elapsed / releaseDuration, 1);
    const strength = progress < 0.15 ? progress / 0.15 : Math.max(1 - (progress - 0.15) / 0.85, 0);
    group.current.children.forEach((child, index) => {
      const material = (child as Line).material as LineBasicMaterial | undefined;
      if (material) material.opacity = (index === 0 ? 0.6 : 0.4) * strength;
    });
  });
  return <group ref={group} visible={false}>
    {targets.slice(0, mobile ? 1 : 4).map((target, index) => <line key={index}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[new Float32Array([0, 0, 0, ...target]), 3]} /></bufferGeometry>
      <lineBasicMaterial color={index === 0 ? '#E8F7FF' : horizonScene.core.energy} transparent opacity={0} />
    </line>)}
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

function applyDriveFov(camera: import('three').Camera, fov: number) {
  const perspective = camera as PerspectiveCamera;
  if (!perspective.isPerspectiveCamera) return;
  perspective.fov = fov;
  perspective.updateProjectionMatrix();
}

function CameraFocus({ target, overviewVersion, variant, mobile, driveState, reducedMotion }: { target: Position | null; overviewVersion: number; variant: 'home' | 'explorer'; mobile: boolean; driveState: KnowledgeDriveState; reducedMotion: boolean }) {
  const { camera } = useThree();
  const overviewRef = useRef(overviewVersion);
  const returnActive = useRef(false);
  const driveRef = useRef({ state: driveState, at: 0 });
  const releaseDuration = useMemo(() => getKnowledgeDriveDuration(knowledgeDriveTiming.release) / 1000, []);
  useFrame(({ clock }) => {
    if (driveRef.current.state !== driveState) driveRef.current = { state: driveState, at: clock.elapsedTime };
    if (overviewRef.current !== overviewVersion) {
      overviewRef.current = overviewVersion;
      returnActive.current = true;
    }
    const driving = variant === 'home' && !reducedMotion && (driveState === 'drive' || driveState === 'transition');
    const driveElapsed = clock.elapsedTime - driveRef.current.at;
    if (driving) {
      const progress = Math.min(driveElapsed / releaseDuration, 1);
      const easedDrive = 1 - (1 - progress) ** 3;
      const homeDistance = mobile ? 8.2 : 5.8;
      camera.position.set(0, 0, homeDistance + (mobile ? 6.5 : 14) * easedDrive);
      const targetFov = 46 + (mobile ? 10 : 18) * Math.sin(progress * Math.PI);
      applyDriveFov(camera, targetFov);
      camera.lookAt(0, 0, 0);
      return;
    }
    if (perspectiveCameraGuard(camera)) { applyDriveFov(camera, 46); }
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

function perspectiveCameraGuard(camera: import('three').Camera): camera is PerspectiveCamera {
  return (camera as PerspectiveCamera).isPerspectiveCamera;
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

function MicroParticles({ count, radius, mobile }: { count: number; radius: number; mobile: boolean }) {
  const points = useRef<Mesh>(null);
  const particleData = useMemo(() => Array.from({ length: count }, (_, i) => ({
    angle: (i / count) * Math.PI * 2 + randomAt(i, 1) * 0.5,
    yOffset: (randomAt(i, 2) - 0.5) * radius * 0.6,
    speed: 0.08 + randomAt(i, 3) * 0.12,
    dist: radius * 0.3 + randomAt(i, 4) * radius * 0.7,
    phase: randomAt(i, 5) * Math.PI * 2,
  })), [count, radius]);
  useFrame(({ clock }) => {
    if (!points.current) return;
    const positions = (points.current.geometry as import('three').BufferGeometry).attributes.position.array as Float32Array;
    particleData.forEach((p, i) => {
      const t = clock.elapsedTime * p.speed + p.phase;
      positions[i * 3] = Math.cos(p.angle + t * 0.3) * p.dist;
      positions[i * 3 + 1] = p.yOffset + Math.sin(t * 0.5) * 0.3;
      positions[i * 3 + 2] = Math.sin(p.angle + t * 0.3) * p.dist * 0.4;
    });
    (points.current.geometry as import('three').BufferGeometry).attributes.position.needsUpdate = true;
  });
  if (mobile) return null;
  return <points ref={points}>
    <bufferGeometry>
      <bufferAttribute attach="attributes-position" args={[new Float32Array(count * 3), 3]} />
    </bufferGeometry>
    <pointsMaterial color={starkGraph.particle.color} size={0.035} transparent opacity={starkGraph.particle.opacity} sizeAttenuation depthWrite={false} blending={AdditiveBlending} />
  </points>;
}

function EnergyPulse({ from, to, trigger }: { from: Position; to: Position; trigger: number }) {
  const pulse = useRef<Mesh>(null);
  const started = useRef(0);
  useEffect(() => { if (trigger > 0) started.current = performance.now() / 1000; }, [trigger]);
  useFrame(({ clock }) => {
    if (!pulse.current) return;
    const elapsed = clock.elapsedTime - started.current;
    if (elapsed < 0 || elapsed > 1.2) { pulse.current.visible = false; return; }
    pulse.current.visible = true;
    const t = elapsed / 1.2;
    const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    pulse.current.position.set(from[0] + (to[0] - from[0]) * eased, from[1] + (to[1] - from[1]) * eased, from[2] + (to[2] - from[2]) * eased);
    const mat = pulse.current.material as MeshBasicMaterial;
    mat.opacity = Math.sin(t * Math.PI) * 0.9;
  });
  return <mesh ref={pulse} position={from}><sphereGeometry args={[0.055, 10, 10]} /><meshBasicMaterial color={starkGraph.edge.active} transparent opacity={0} depthWrite={false} blending={AdditiveBlending} /></mesh>;
}

function KnowledgeUniverse({ onSelect, mode, selectedIds, pathEdgeKeys, pathNodeIds, graph, variant, motionEnabled, driveState, mobile, homeCoreHovered }: { onSelect: (id: string) => void; mode: 'explore' | 'architect'; selectedIds: Set<string>; pathEdgeKeys: Set<string>; pathNodeIds: Set<string>; graph: GraphData; variant: 'home' | 'explorer'; motionEnabled: boolean; driveState: KnowledgeDriveState; mobile: boolean; homeCoreHovered: boolean }) {
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
  const driveReveal = useRef({ state: driveState, at: 0 });
  const [revealProgress, setRevealProgress] = useState(driveState === 'idle' || driveState === 'ready' || driveState === 'compress' ? 0 : 1);
  // Stark energy pulse state
  const [energyPulseTrigger, setEnergyPulseTrigger] = useState(0);
  const [energyPulseTarget, setEnergyPulseTarget] = useState<Position>([0, 0, 0]);
  const energyTimer = useRef(0);
  useFrame(({ clock }) => {
    if (driveReveal.current.state !== driveState) {
      driveReveal.current = { state: driveState, at: clock.elapsedTime };
      if (driveState === 'idle' || driveState === 'ready' || driveState === 'compress') setRevealProgress(0);
    }
    if (driveState === 'drive' || driveState === 'transition') {
      const releaseDuration = getKnowledgeDriveDuration(knowledgeDriveTiming.release) / 1000;
      const progress = Math.min((clock.elapsedTime - driveReveal.current.at) / releaseDuration, 1);
      setRevealProgress(previous => Math.max(previous, progress));
    }
    // Occasional Core-to-node energy transmission
    if (variant === 'explorer' && clock.elapsedTime - energyTimer.current > 4 + Math.random() * 6) {
      energyTimer.current = clock.elapsedTime;
      const targetNode = nodes.find(n => n.id !== coreId && Math.random() > 0.6);
      const targetPos = targetNode ? positions.get(targetNode.id) : null;
      if (targetPos) {
        setEnergyPulseTarget(targetPos);
        setEnergyPulseTrigger(t => t + 1);
      }
    }
  });
  const revealThreshold = variant === 'home' ? (driveState === 'idle' || driveState === 'ready' || driveState === 'compress' ? 0 : revealProgress) : 1;
  const focusedNode = selectedIds.size > 0 ? nodes.find(node => selectedIds.has(node.id)) ?? null : null;
  const explorer = variant === 'explorer';
  const focusedRelations = focusedNode
    ? edges.filter(edge => edge.source === focusedNode.id || edge.target === focusedNode.id)
    : [];
  const focusedNodeIds = new Set(focusedRelations.map(e => e.source === focusedNode?.id ? e.target : e.source));
  const visibleNodes = variant === 'home' ? (revealThreshold >= 1 ? nodes : nodes.filter((node, index) => node.id === coreId || (mobile && index >= 5 ? false : revealThreshold > (mobile ? 0.1 : 0.02) + index * (mobile ? 0.14 : 0.11)))) : nodes;
  const visibleNodeIds = new Set(visibleNodes.map(node => node.id));
  // Connected to core map
  const connectedToCore = useMemo(() => {
    const set = new Set<string>();
    edges.forEach(e => { if (e.source === coreId) set.add(e.target); if (e.target === coreId) set.add(e.source); });
    return set;
  }, [edges, coreId]);
  // Lighting setup
  const ambientIntensity = explorer
    ? (mode === 'architect' ? starkGraph.lighting.ambientArchitect : starkGraph.lighting.ambient)
    : (mode === 'architect' ? horizonScene.lighting.ambient * 1.3 : horizonScene.lighting.ambient);
  const keyIntensity = explorer
    ? (mode === 'architect' ? starkGraph.lighting.keyIntensityArchitect : starkGraph.lighting.keyIntensity)
    : (mode === 'architect' ? horizonScene.lighting.keyIntensity * 1.2 : horizonScene.lighting.keyIntensity);
  const coreLightIntensity = explorer
    ? (mode === 'architect' ? starkGraph.lighting.coreIntensityArchitect : starkGraph.lighting.coreIntensity)
    : (mode === 'architect' ? horizonScene.lighting.coreIntensity * 0.8 : horizonScene.lighting.coreIntensity);
  const coreLightColor = explorer ? starkGraph.core.energy : horizonScene.core.energy;
  return <>
    <ambientLight intensity={ambientIntensity} />
    <directionalLight position={[-4, 5, 6]} intensity={keyIntensity} color={explorer ? starkGraph.lighting.key : horizonScene.lighting.key} />
    <pointLight position={[0, 0, 4]} intensity={coreLightIntensity} color={coreLightColor} distance={mode === 'architect' ? 20 : 16} />
    {/* Rim light from core direction */}
    {explorer && <pointLight position={[2, -2, 3]} intensity={mode === 'architect' ? 0.55 : 0.35} distance={12} color={starkGraph.core.energy} />}
    {/* Micro particles around core */}
    {explorer && !mobile && <MicroParticles count={32} radius={5} mobile={mobile} />}
    {/* Edges with strict hierarchy */}
    {edges.filter(edge => visibleNodeIds.has(edge.source) && visibleNodeIds.has(edge.target)).map(edge => {
      const from = positions.get(edge.source); const to = positions.get(edge.target);
      if (!from || !to) return null;
      const onPath = pathEdgeKeys.has(`${edge.source}->${edge.target}`);
      const isFocusedRelation = focusedNode ? (edge.source === focusedNode.id || edge.target === focusedNode.id) : false;
      const active = onPath || selectedIds.has(edge.source) || selectedIds.has(edge.target) || hoveredId === edge.source || hoveredId === edge.target;
      const pathIndex = pathNodeIds.has(edge.source) && pathNodeIds.has(edge.target) ? Math.min([...pathNodeIds].indexOf(edge.source), [...pathNodeIds].indexOf(edge.target)) : -1;
      const depthVisibility = Math.max(0.72, Math.min(1.2, 1 + (from[2] + to[2]) / 14));
      const driveBoost = variant === 'home' && (driveState === 'drive' || driveState === 'transition') ? 0.5 : 0;
      // Stark edge opacity hierarchy
      let baseOpacity: number;
      if (onPath) baseOpacity = 0.96;
      else if (active) baseOpacity = explorer ? 0.88 : 0.76;
      else if (mode === 'architect') baseOpacity = explorer ? 0.75 : 0.56;
      else baseOpacity = explorer ? 0.42 : 0.24;
      // Selection dimming: unrelated edges get darker
      if (explorer && focusedNode && !isFocusedRelation && !onPath) baseOpacity *= 0.45;
      const edgeColor = onPath
        ? (explorer ? starkGraph.edge.path : horizonScene.edge.path)
        : active
          ? (explorer ? starkGraph.edge.active : horizonScene.edge.active)
          : mode === 'architect'
            ? (explorer ? starkGraph.edge.structural : horizonScene.edge.architect)
            : (explorer ? starkGraph.edge.dormantVisible : horizonScene.edge.dormant);
      return <group key={`${edge.source}-${edge.target}`}>
        <line>
          <bufferGeometry><bufferAttribute attach="attributes-position" args={[new Float32Array([...from, ...to]), 3]} /></bufferGeometry>
          <lineBasicMaterial color={edgeColor} transparent opacity={Math.min(1, (baseOpacity + driveBoost) * depthVisibility)} />
        </line>
        {onPath && pathIndex >= 0 && <PathPulse from={from} to={to} delay={pathIndex * 0.22} enabled={motionEnabled} />}
        {explorer && isFocusedRelation && <PathPulse from={from} to={to} delay={0.1} enabled={motionEnabled} />}
      </group>;
    })}
    {variant === 'home' && motionEnabled && <DriveField state={driveState} mobile={mobile} />}
    {variant === 'home' && motionEnabled && <DriveShockwave state={driveState} />}
    {variant === 'home' && motionEnabled && <DriveStreaks targets={nodes.filter(node => node.id !== coreId).map(node => positions.get(node.id)).filter((position): position is Position => Boolean(position))} state={driveState} mobile={mobile} />}
    {/* Energy transmission pulse */}
    {explorer && <EnergyPulse from={[0, 0, 0]} to={energyPulseTarget} trigger={energyPulseTrigger} />}
    {visibleNodes.map(node => node.id === coreId
      ? <KnowledgeCore key={node.id} position={positions.get(node.id)!} active={selectedIds.size > 0 || Boolean(hoveredId)} homeCoreHovered={homeCoreHovered} mode={mode} motionEnabled={motionEnabled} onSelect={() => onSelect(node.id)} onHover={active => setHoveredId(active ? node.id : null)} variant={variant} driveState={driveState} mobile={mobile} selectedIds={selectedIds} hoveredId={hoveredId} />
      : <SceneNode key={node.id} node={node} position={positions.get(node.id)!} selected={selectedIds.has(node.id) || pathNodeIds.has(node.id)} hovered={hoveredId === node.id} onHover={active => setHoveredId(active ? node.id : null)} onSelect={() => onSelect(node.id)} variant={variant} mode={mode} motionEnabled={motionEnabled} anticipating={driveState === 'ready'} pointerResponsive={!mobile} connectedToCore={connectedToCore.has(node.id)} />)}
    {focusedNode && <SpatialAnnotation node={focusedNode} position={positions.get(focusedNode.id)!} relationCount={focusedRelations.length} primary />}
    {focusedRelations.slice(0, 3).map(edge => {
      const relatedId = edge.source === focusedNode?.id ? edge.target : edge.source;
      const related = nodes.find(node => node.id === relatedId);
      const position = positions.get(relatedId);
      return related && position ? <SpatialAnnotation key={`annotation-${relatedId}`} node={related} position={position} relationCount={0} primary={false} /> : null;
    })}
  </>;
}

export function KnowledgeScene({ className = '', onNodeSelect, onEmptySpace, onUnavailable, mode = 'explore', quality = 'standard', focusId, selectedIds = [], pathNodeIds = [], pathEdgeKeys = [], graphData, variant = 'explorer', overviewVersion = 0, driveState = 'idle' }: { className?: string; onNodeSelect?: (id: string) => void; onEmptySpace?: () => void; onUnavailable?: () => void; mode?: 'explore' | 'architect'; quality?: 'low' | 'standard' | 'ultra'; focusId?: string | null; selectedIds?: string[]; pathNodeIds?: string[]; pathEdgeKeys?: string[]; graphData?: GraphData; variant?: 'home' | 'explorer'; overviewVersion?: number; driveState?: KnowledgeDriveState }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [homeCoreHovered, setHomeCoreHovered] = useState(false);
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
  return <div ref={hostRef} className={className} aria-label="Visualização espacial do conhecimento" onPointerMove={event => {
    if (variant !== 'home' || mobile || event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left - bounds.width / 2) / (bounds.width / 2);
    const y = (event.clientY - bounds.top - bounds.height / 2) / (bounds.height / 2);
    setHomeCoreHovered(Math.hypot(x, y) < 0.42);
  }} onPointerLeave={() => setHomeCoreHovered(false)}>
    <Canvas frameloop={isVisible && isPageVisible ? 'always' : 'never'} camera={{ position: variant === 'home' ? [0, 0, mobile ? 8.2 : 5.8] : [0, 0, 13], fov: 46 }} dpr={reducedMotion || mobile ? [1, 1] : dpr} gl={{ antialias: !mobile && quality !== 'low', alpha: true }} onPointerMissed={onEmptySpace} onCreated={({ gl }) => gl.domElement.addEventListener('webglcontextlost', event => { event.preventDefault(); onUnavailable?.(); }, { once: true })}>
      <fog attach="fog" args={[mode === 'architect' ? (variant === 'explorer' ? starkGraph.environment.fogArchitect : '#101A29') : (variant === 'explorer' ? starkGraph.environment.fogExplore : horizonScene.environment.fog), 8, 22]} />
      <KnowledgeUniverse graph={graph} variant={variant} mode={mode} motionEnabled={!reducedMotion} driveState={driveState} onSelect={onNodeSelect ?? (() => {})} selectedIds={new Set(selectedIds)} pathNodeIds={new Set(pathNodeIds)} pathEdgeKeys={new Set(pathEdgeKeys)} mobile={mobile} homeCoreHovered={homeCoreHovered} />
      {!reducedMotion && <CameraFocus target={focusPosition} overviewVersion={overviewVersion} variant={variant} mobile={mobile} driveState={driveState} reducedMotion={reducedMotion} />}
      <OrbitControls enabled={variant === 'explorer' && !focusId && !reducedMotion} enablePan enableZoom enableRotate touches={{ ONE: TOUCH.PAN, TWO: TOUCH.DOLLY_ROTATE }} minDistance={6} maxDistance={22} maxPolarAngle={Math.PI * 0.65} minPolarAngle={Math.PI * 0.35} />
    </Canvas>
  </div>;
}
