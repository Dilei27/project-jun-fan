'use client';

import { useState, useCallback, useMemo, useEffect, useLayoutEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Maximize2, Minimize2, Keyboard, X } from 'lucide-react';
import { getFilteredGraph, getNodeConnections, searchNodes } from '@/core';
import type { GraphNode, GraphEdge } from '@/core';
import { motion as m } from '@/design-system/motion';
import { runSimulation } from './lib/force-simulation';
import {
  getNodeIdentity,
  getNodeColor,
  getEntryWave,
} from './lib/node-identity';
import {
  useCamera,
  computeFocusTarget,
  computeInitialFit,
  type CameraTarget,
} from './lib/camera';
import { findOneHop, findShortestPath } from './lib/path-finder';
import { ConnectionPath, connectionIntensity } from './components/connection-path';
import { NodeShapeSVG, NodeRimLight, NodeInnerPattern } from './components/node-shapes';
import { InfoPanel } from './components/info-panel';
import { CinematicIntro, type IntroPhase } from './components/cinematic-intro';
import { HoverPreview } from './components/hover-preview';

/**
 * Virtual canvas size — independent from container size.
 * Simulation runs in this space; SVG uses viewBox to scale to fit container.
 */
const CANVAS_WIDTH = 1400;
const CANVAS_HEIGHT = 900;

// Instrumentation — set true to debug, false for production
const DEBUG_GRAPH = true;
function debugLog(...args: unknown[]) {
  if (DEBUG_GRAPH) console.log('[KG]', ...args);
}

export function KnowledgeExplorer() {
  // State
  const [activeFilters, setActiveFilters] = useState<string[]>([
    'mission', 'product', 'project', 'agent', 'architecture',
    'decision', 'doc', 'timeline', 'metric', 'technology', 'lab', 'skill',
  ]);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [selectedSecondary, setSelectedSecondary] = useState<GraphNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
  const [hoverScreen, setHoverScreen] = useState<{ x: number; y: number } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [introPhase, setIntroPhase] = useState<IntroPhase>('ambient');
  const [revealedWaves, setRevealedWaves] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Refs
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cameraGroupRef = useRef<SVGGElement>(null);

  // Data
  const data = useMemo(() => getFilteredGraph(activeFilters), [activeFilters]);

  // Simulation — deterministic, runs identically on server and client
  const positions: Map<string, { x: number; y: number }> = useMemo(() => {
    const simNodes = runSimulation(
      data.nodes.map(n => ({ id: n.id, type: n.type })),
      data.edges,
      { width: CANVAS_WIDTH, height: CANVAS_HEIGHT },
    );
    const map = new Map<string, { x: number; y: number }>();
    simNodes.forEach(n => map.set(n.id, { x: n.x, y: n.y }));

    debugLog('nodes in', data.nodes.length);
    debugLog('nodes out', simNodes.length);
    debugLog('first 5 positions after sim:', simNodes.slice(0, 5).map(n => ({ id: n.id, x: n.x.toFixed(1), y: n.y.toFixed(1) })));

    return map;
  }, [data]);

  // Canvas dimensions in viewBox space — camera operates in viewBox coordinates
  const canvasSize = useMemo(
    () => ({ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }),
    [],
  );

  // Compute fit target synchronously so the camera starts centered on first paint
  const initialFit: CameraTarget = useMemo(() => {
    if (positions.size === 0) {
      debugLog('positions empty, returning identity transform');
      return { x: 0, y: 0, zoom: 1 };
    }
    const arr = Array.from(positions.values());
    const target = computeInitialFit(arr, canvasSize, 100);
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (const p of arr) {
      if (p.x < minX) minX = p.x;
      if (p.x > maxX) maxX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.y > maxY) maxY = p.y;
    }
    debugLog('bbox:', { minX: minX.toFixed(1), maxX: maxX.toFixed(1), minY: minY.toFixed(1), maxY: maxY.toFixed(1), w: (maxX - minX).toFixed(1), h: (maxY - minY).toFixed(1) });
    debugLog('initialFit:', { x: target.x.toFixed(1), y: target.y.toFixed(1), zoom: target.zoom.toFixed(3) });
    return target;
  }, [positions, canvasSize]);

  // Camera — initial fit already computed, no flash
  const camera = useCamera({
    initial: initialFit,
  });

  /**
   * Fit graph to viewport.
   * Called on data change, container resize, and manual reset.
   */
  const fitToView = useCallback(
    (animated = true) => {
      if (positions.size === 0) return;
      const arr = Array.from(positions.values());
      const target = computeInitialFit(arr, canvasSize, 100);
      if (animated) {
        camera.travelTo(target, 0.9);
      } else {
        camera.setImmediate(target);
      }
    },
    [positions, canvasSize, camera],
  );

  // Initial fit is computed synchronously — no flash.
  // Safety: force camera to initialFit after mount in case spring
  // initialization drifts from the source MotionValue.
  const appliedInitialFit = useRef(false);
  useEffect(() => {
    if (appliedInitialFit.current) return;
    if (positions.size === 0) return;
    appliedInitialFit.current = true;
    camera.setImmediate(initialFit);
    debugLog('safety enforce camera:', { x: initialFit.x.toFixed(1), y: initialFit.y.toFixed(1), zoom: initialFit.zoom.toFixed(3) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fallback: force camera again after a short delay, in case the SVG
  // layout / viewBox mapping was not ready during the first call.
  useEffect(() => {
    if (positions.size === 0) return;
    const id = setTimeout(() => {
      const arr = Array.from(positions.values());
      const target = computeInitialFit(arr, canvasSize, 100);
      camera.setImmediate(target);
      debugLog('fallback enforce camera:', { x: target.x.toFixed(1), y: target.y.toFixed(1), zoom: target.zoom.toFixed(3) });
    }, 800);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Apply camera transform directly as SVG attribute (not CSS transform).
  // useLayoutEffect ensures the transform is applied before browser paint,
  // avoiding a flash of untransformed content on the first frame.
  useLayoutEffect(() => {
    const g = cameraGroupRef.current;
    if (!g) return;
    const updateTransform = () => {
      g.setAttribute(
        'transform',
        `translate(${camera.panX.get()}, ${camera.panY.get()}) scale(${camera.zoom.get()})`,
      );
    };
    const unsub1 = camera.panX.on('change', updateTransform);
    const unsub2 = camera.panY.on('change', updateTransform);
    const unsub3 = camera.zoom.on('change', updateTransform);
    updateTransform();
    return () => { unsub1(); unsub2(); unsub3(); };
  }, [camera]);

  // Reveal waves (driven by intro phase)
  useEffect(() => {
    let cancelled = false;
    if (introPhase === 'ambient' || introPhase === 'camera') {
      queueMicrotask(() => {
        if (!cancelled) setRevealedWaves(0);
      });
    } else if (introPhase === 'waves') {
      const waves = [0, 1, 2, 3, 4, 5];
      const timers = waves.map((w, i) =>
        setTimeout(() => {
          if (!cancelled) setRevealedWaves(w + 1);
        }, i * 250),
      );
      return () => {
        cancelled = true;
        timers.forEach(clearTimeout);
      };
    } else if (introPhase === 'connections' || introPhase === 'hud' || introPhase === 'done') {
      queueMicrotask(() => {
        if (!cancelled) setRevealedWaves(99);
      });
    }
    return () => {
      cancelled = true;
    };
  }, [introPhase]);

  // Connections context
  const relatedEdges = useMemo<GraphEdge[]>(() => {
    if (!selectedNode) return [];
    return getNodeConnections(selectedNode.id);
  }, [selectedNode]);

  const oneHopData = useMemo(() => {
    if (!selectedNode) return { neighbors: new Set<string>(), edgeKeys: new Set<string>() };
    return findOneHop(selectedNode.id, data.edges);
  }, [selectedNode, data.edges]);

  const pathData = useMemo(() => {
    if (!selectedNode || !selectedSecondary) return null;
    return findShortestPath(selectedNode.id, selectedSecondary.id, data.edges);
  }, [selectedNode, selectedSecondary, data.edges]);

  // Handlers
  const handleNodeClick = useCallback((node: GraphNode) => {
    if (selectedNode?.id === node.id) {
      setSelectedNode(null);
      setSelectedSecondary(null);
    } else if (selectedNode && selectedSecondary?.id === node.id) {
      setSelectedSecondary(null);
    } else if (selectedNode) {
      setSelectedSecondary(node);
    } else {
      setSelectedNode(node);
      setSelectedSecondary(null);
      const pos = positions.get(node.id);
      if (pos) {
        const target = computeFocusTarget(pos, canvasSize, 1.4);
        camera.travelTo(target, 0.9);
      }
    }
  }, [selectedNode, selectedSecondary, positions, camera, canvasSize]);

  const handlePanelNavigate = useCallback((node: GraphNode) => {
    if (!selectedNode) {
      setSelectedNode(node);
    } else if (selectedNode.id === node.id) {
      setSelectedNode(null);
      setSelectedSecondary(null);
    } else {
      setSelectedSecondary(node);
    }
    const pos = positions.get(node.id);
    if (pos) {
      const target = computeFocusTarget(pos, canvasSize, 1.4);
      camera.travelTo(target, 0.9);
    }
  }, [selectedNode, positions, camera, canvasSize]);

  const handleSearch = useCallback((q: string) => {
    setSearchQuery(q);
    if (!q.trim()) return;
    const results = searchNodes(q);
    if (results.length > 0) {
      const found = results[0];
      setSelectedNode(found);
      setSelectedSecondary(null);
      const pos = positions.get(found.id);
      if (pos) {
        const target = computeFocusTarget(pos, canvasSize, 1.4);
        camera.travelTo(target, 1.2);
      }
    }
  }, [positions, camera, canvasSize]);

  const handleReset = useCallback(() => {
    setSelectedNode(null);
    setSelectedSecondary(null);
    setSearchQuery('');
    fitToView(true);
  }, [fitToView]);

  // Filter handling
  const toggleFilter = useCallback((type: string) => {
    setActiveFilters(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type],
    );
  }, []);

  // Pan/zoom — direct manipulation
  const handleWheel = useCallback((e: React.WheelEvent) => {
    const factor = e.deltaY > 0 ? 0.92 : 1.08;
    const currentZoom = camera.zoom.get();
    const newZoom = Math.max(0.3, Math.min(3, currentZoom * factor));
    camera.travelZoom(newZoom, 0.15);
  }, [camera]);

  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0, panX: 0, panY: 0 });

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.kg-node, .kg-hud')) return;
    isDragging.current = true;
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      panX: camera.panX.get(),
      panY: camera.panY.get(),
    };
  }, [camera]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging.current) {
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      camera.setImmediate({
        x: dragStart.current.panX + dx,
        y: dragStart.current.panY + dy,
        zoom: camera.zoom.get(),
      });
    } else if (hoveredNode && svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect();
      setHoverScreen({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  }, [camera, hoveredNode]);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  // Keyboard
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      const isTyping = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA';
      if (isTyping) return;

      if (e.key === 'Escape') {
        setSelectedNode(null);
        setSelectedSecondary(null);
        setSearchQuery('');
      } else if (e.key === 'r' || e.key === 'R') {
        handleReset();
      } else if (e.key === 'f' || e.key === 'F') {
        setIsFullscreen(prev => !prev);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleReset]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}
      style={{
        background:
          'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(79, 140, 255, 0.06), transparent 70%), radial-gradient(ellipse 50% 40% at 80% 80%, rgba(45, 212, 191, 0.04), transparent 60%)',
      }}
    >
      {/* Background grid — extremely subtle */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(244, 247, 250, 0.4) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Cinematic intro overlay */}
      <CinematicIntro
        onPhaseChange={setIntroPhase}
        onComplete={() => setIntroPhase('done')}
      />

      {/* Discovery hint — shown briefly after intro */}
      <AnimatePresence>
        {introPhase === 'done' && !selectedNode && !hoveredNode && (
          <motion.div
            key="hint"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.6, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none text-center"
          >
            <motion.div
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="text-[10px] uppercase tracking-[0.14em] text-text-muted font-medium"
            >
              Clique em um nó para explorar
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HUD: search */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{
          opacity: introPhase === 'done' || introPhase === 'hud' ? 1 : 0,
          y: 0,
        }}
        transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="kg-hud absolute top-6 left-6 z-20"
      >
        <div
          className="jf-glass-modal rounded-xl flex items-center gap-2 px-3 py-2 w-80"
          style={{
            boxShadow:
              'inset 0 1px 0 0 rgba(244, 247, 250, 0.06), 0 12px 32px -8px rgba(0, 0, 0, 0.4)',
          }}
        >
          <Search size={14} className="text-text-muted shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => handleSearch(e.target.value)}
            placeholder="Buscar entidades, conceitos..."
            className="flex-1 bg-transparent text-text-primary text-sm placeholder:text-text-muted outline-none"
            aria-label="Buscar no Knowledge Explorer"
          />
          {searchQuery && (
            <button
              onClick={() => { setSearchQuery(''); setSelectedNode(null); }}
              className="text-text-muted hover:text-text-primary transition-colors"
              aria-label="Limpar busca"
            >
              <X size={12} />
            </button>
          )}
        </div>
      </motion.div>

      {/* HUD: legend / filters */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{
          opacity: introPhase === 'done' || introPhase === 'hud' ? 1 : 0,
          y: 0,
        }}
        transition={{ duration: 0.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="kg-hud absolute top-6 right-6 z-20 flex flex-col items-end gap-2"
      >
        <div className="flex gap-1.5 flex-wrap justify-end max-w-md">
          {Object.entries(legend).map(([type, info]) => {
            const active = activeFilters.includes(type);
            return (
              <motion.button
                key={type}
                whileTap={m.tap.soft}
                onClick={() => toggleFilter(type)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-[10px] font-medium uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  active
                    ? 'bg-surface-elevated/80 border-border-subtle/60 text-text-primary'
                    : 'bg-surface-default/30 border-border-subtle/30 text-text-muted'
                }`}
                style={
                  active
                    ? {
                        boxShadow: `inset 0 1px 0 0 rgba(244, 247, 250, 0.04), 0 0 0 1px ${info.color}30`,
                      }
                    : undefined
                }
                aria-pressed={active}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: active ? info.color : '#687385' }}
                />
                {info.label}
              </motion.button>
            );
          })}
        </div>
        <div className="flex gap-1.5 mt-1">
          <motion.button
            whileTap={m.tap.soft}
            onClick={handleReset}
            className="px-2.5 py-1 rounded-md bg-surface-default/40 border border-border-subtle/40 text-[10px] text-text-muted hover:text-text-primary transition-colors"
            aria-label="Resetar câmera"
            title="Resetar câmera (R)"
          >
            <span className="flex items-center gap-1">
              <Maximize2 size={10} /> Reset
            </span>
          </motion.button>
          <motion.button
            whileTap={m.tap.soft}
            onClick={() => setIsFullscreen(p => !p)}
            className="px-2.5 py-1 rounded-md bg-surface-default/40 border border-border-subtle/40 text-[10px] text-text-muted hover:text-text-primary transition-colors"
            aria-label="Tela cheia"
            title="Tela cheia (F)"
          >
            <span className="flex items-center gap-1">
              {isFullscreen ? <Minimize2 size={10} /> : <Maximize2 size={10} />}
              {isFullscreen ? 'Sair' : 'Fullscreen'}
            </span>
          </motion.button>
        </div>
      </motion.div>

      {/* SVG canvas — viewBox-based, scales to fit container */}
      <svg
        ref={svgRef}
        className="w-full h-full cursor-grab active:cursor-grabbing select-none block"
        viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}
        preserveAspectRatio="xMidYMid meet"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => {
          isDragging.current = false;
          setHoveredNode(null);
          setHoverScreen(null);
        }}
      >
        <defs>
          <radialGradient id="kg-node-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.22" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="0.08" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
          <filter id="kg-node-glow">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g
          ref={cameraGroupRef}
        >
          {/* Backdrop rect — verifies viewBox mapping and camera transform */}
          <rect
            x={0} y={0} width={CANVAS_WIDTH} height={CANVAS_HEIGHT}
            fill="rgba(79, 140, 255, 0.03)"
            stroke="rgba(79, 140, 255, 0.15)"
            strokeWidth={1}
            pointerEvents="none"
          />
          {data.edges.map((edge) => {
            const si = data.nodes.findIndex(n => n.id === edge.source);
            const ti = data.nodes.findIndex(n => n.id === edge.target);
            if (si === -1 || ti === -1 || !positions.has(edge.source) || !positions.has(edge.target)) {
              return null;
            }
            const p1 = positions.get(edge.source)!;
            const p2 = positions.get(edge.target)!;
            const sourceNode = data.nodes[si];
            const targetNode = data.nodes[ti];
            const intensity = connectionIntensity(
              edge,
              selectedNode?.id ?? null,
              oneHopData.neighbors,
              pathData?.edgeKeys ?? new Set(),
            );
            const targetIntensity = connectionIntensity(
              edge,
              selectedSecondary?.id ?? null,
              new Set(),
              new Set(),
            );
            const finalIntensity = intensity === 'normal' && targetIntensity === 'highlight' ? 'highlight' : intensity;
            const isConnectionsPhase = introPhase === 'connections' || introPhase === 'hud' || introPhase === 'done';
            return (
              <ConnectionPath
                key={`edge-${edge.source}-${edge.target}`}
                edge={edge}
                x1={p1.x}
                y1={p1.y}
                x2={p2.x}
                y2={p2.y}
                intensity={isConnectionsPhase ? finalIntensity : 'dim'}
                sourceColor={getNodeColor(sourceNode.type)}
                targetColor={getNodeColor(targetNode.type)}
                delay={isConnectionsPhase ? Math.min(data.edges.indexOf(edge) * 0.01, 0.4) : 0}
                gradientKey={`${edge.source}-${edge.target}`}
              />
            );
          })}

          {data.nodes.map((node) => {
            const pos = positions.get(node.id);
            if (!pos) return null;
            const identity = getNodeIdentity(node.type);
            const color = getNodeColor(node.type);
            const wave = getEntryWave(node.type);
            const isRevealed = revealedWaves > wave;
            const isSelected = selectedNode?.id === node.id;
            const isSecondary = selectedSecondary?.id === node.id;
            const isOnPath = pathData?.nodeIds.includes(node.id) ?? false;
            const isDimmed = (selectedNode && !isSelected && !oneHopData.neighbors.has(node.id) && !isOnPath) ||
                            (selectedSecondary && !isSecondary && !oneHopData.neighbors.has(node.id) && !isOnPath);
            const isHovered = hoveredNode?.id === node.id;
            const r = identity.baseRadius;
            const haloR = r * identity.haloRadius;
            const scale = isHovered ? 1.12 : isSelected ? 1.08 : 1;
            const haloOpacity = isDimmed ? 0 : isSelected ? 0.6 : isHovered ? 0.45 : identity.haloIntensity;
            const nodeOpacity = isDimmed ? 0.25 : isHovered ? 1 : 0.92;
            const labelText = getNodeLabel(node, identity, r);
            const showLabel = identity.labelMode !== 'none' && (isHovered || isSelected || identity.labelMode === 'outside');

            return (
              <g
                key={node.id}
                className="kg-node"
                transform={`translate(${pos.x}, ${pos.y})`}
                style={{ cursor: 'pointer', color }}
                onClick={() => handleNodeClick(node)}
                onMouseEnter={(e) => {
                  setHoveredNode(node);
                  if (svgRef.current) {
                    const rect = svgRef.current.getBoundingClientRect();
                    setHoverScreen({ x: e.clientX - rect.left, y: e.clientY - rect.top });
                  }
                }}
                onMouseLeave={() => {
                  setHoveredNode(null);
                  setHoverScreen(null);
                }}
              >
                <motion.g
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{
                    opacity: isRevealed ? nodeOpacity : 0,
                    scale: isRevealed ? scale : 0.4,
                  }}
                  transition={{
                    opacity: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                    scale: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                  }}
                >
                  <circle
                    r={haloR}
                    fill="url(#kg-node-halo)"
                    opacity={haloOpacity}
                    style={{ transition: 'opacity 0.4s ease-out' }}
                  />
                  {(isSelected || isSecondary) && (
                    <motion.circle
                      r={r + 10}
                      fill="none"
                      stroke={color}
                      strokeWidth={1.5}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 0.4, scale: 1 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      style={{ animation: 'glow 3.5s ease-in-out infinite' }}
                    />
                  )}
                  {isOnPath && !isSelected && !isSecondary && (
                    <circle
                      r={r + 4}
                      fill="none"
                      stroke="#4F8CFF"
                      strokeWidth={1}
                      opacity={0.6}
                    />
                  )}
                  <motion.g
                    animate={{ scale }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    filter={isSelected ? 'url(#kg-node-glow)' : undefined}
                  >
                    <NodeShapeSVG
                      shape={identity.shape}
                      r={r}
                      fill={color}
                      stroke={isSelected || isSecondary ? '#F4F7FA' : 'none'}
                      strokeWidth={isSelected || isSecondary ? 1.5 : 0}
                      strokeDasharray={identity.borderStyle === 'dashed' ? '3 2' : undefined}
                    />
                    <NodeInnerPattern shape={identity.shape} r={r} color={color} />
                    {identity.rimLight && <NodeRimLight shape={identity.shape} r={r} />}
                    {identity.glyph && (
                      <text
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill="rgba(244, 247, 250, 0.95)"
                        fontSize={identity.glyphSize}
                        fontWeight={600}
                        className="pointer-events-none select-none"
                      >
                        {identity.glyph}
                      </text>
                    )}
                    {identity.labelMode === 'inside' && labelText && (
                      <text
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill="rgba(244, 247, 250, 0.95)"
                        fontSize={identity.glyphSize}
                        fontWeight={500}
                        className="pointer-events-none select-none"
                      >
                        {labelText}
                      </text>
                    )}
                  </motion.g>
                  {identity.labelMode === 'outside' && showLabel && labelText && (
                    <motion.text
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      textAnchor="middle"
                      dy={r + 14}
                      fill="rgba(244, 247, 250, 0.9)"
                      fontSize={10}
                      fontWeight={500}
                      className="pointer-events-none select-none"
                      style={{ textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}
                    >
                      {labelText}
                    </motion.text>
                  )}
                </motion.g>
              </g>
            );
          })}
        </g>
      </svg>

      {/* Hover preview */}
      <HoverPreview node={hoveredNode} screenPosition={hoverScreen} />

      {/* Info panel */}
      <InfoPanel
        node={selectedNode}
        relatedEdges={relatedEdges}
        allNodes={data.nodes}
        onClose={() => { setSelectedNode(null); setSelectedSecondary(null); }}
        onNavigate={handlePanelNavigate}
      />

      {/* Bottom HUD: stats */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{
          opacity: introPhase === 'done' || introPhase === 'hud' ? 1 : 0,
          y: 0,
        }}
        transition={{ duration: 0.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="kg-hud absolute bottom-6 left-6 z-20"
      >
        <div className="flex items-center gap-3 text-[10px] text-text-muted">
          <span className="tabular-nums">{data.nodes.length} nós</span>
          <span className="opacity-30">·</span>
          <span className="tabular-nums">{data.edges.length} conexões</span>
          {selectedNode && (
            <>
              <span className="opacity-30">·</span>
              <span className="text-text-secondary">
                Foco: {selectedNode.label}
              </span>
            </>
          )}
          {selectedSecondary && (
            <>
              <span className="opacity-30">→</span>
              <span className="text-text-secondary">
                {selectedSecondary.label}
              </span>
            </>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{
          opacity: introPhase === 'done' || introPhase === 'hud' ? 1 : 0,
          y: 0,
        }}
        transition={{ duration: 0.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="kg-hud absolute bottom-6 right-6 z-20"
      >
        <div className="flex items-center gap-1.5 text-[10px] text-text-muted">
          <Keyboard size={10} />
          <span className="px-1.5 py-0.5 bg-surface-default/50 border border-border-subtle/40 rounded">R</span>
          <span>Reset</span>
          <span className="opacity-30 mx-1">·</span>
          <span className="px-1.5 py-0.5 bg-surface-default/50 border border-border-subtle/40 rounded">F</span>
          <span>Fullscreen</span>
          <span className="opacity-30 mx-1">·</span>
          <span className="px-1.5 py-0.5 bg-surface-default/50 border border-border-subtle/40 rounded">ESC</span>
          <span>Fechar</span>
        </div>
      </motion.div>
    </div>
  );
}

function getNodeLabel(
  node: GraphNode,
  identity: ReturnType<typeof getNodeIdentity>,
  r: number,
): string {
  if (identity.labelMode === 'none') return '';
  if (node.type === 'timeline') {
    return node.label.split(' — ')[0] || node.label;
  }
  if (node.type === 'skill' || node.type === 'technology') return '';
  const max = r > 24 ? 14 : r > 18 ? 10 : 6;
  return node.label.length > max ? node.label.substring(0, max) + '…' : node.label;
}

const legend: Record<string, { label: string; color: string }> = {
  mission: { label: 'Missão', color: '#22C55E' },
  product: { label: 'Produto', color: '#4F8CFF' },
  project: { label: 'Projeto', color: '#60A5FA' },
  agent: { label: 'Agente', color: '#F97316' },
  architecture: { label: 'Arq.', color: '#06B6D4' },
  decision: { label: 'Decisão', color: '#A855F7' },
  doc: { label: 'Doc', color: '#EAB308' },
  timeline: { label: 'Marco', color: '#10B981' },
  metric: { label: 'Métrica', color: '#F59E0B' },
  lab: { label: 'Lab', color: '#687385' },
  technology: { label: 'Tech', color: '#FBBF24' },
  skill: { label: 'Skill', color: '#9AA6B8' },
};
