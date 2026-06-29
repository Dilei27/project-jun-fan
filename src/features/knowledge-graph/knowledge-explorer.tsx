'use client';

import { useState, useCallback, useMemo, useLayoutEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Maximize2, Minimize2, Keyboard, X, Map as MapIcon, Play } from 'lucide-react';
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
  computeFocusTarget,
  computeInitialFit,
  CameraTarget,
  cubicBezier,
} from './lib/camera';
import { findOneHop, findShortestPath } from './lib/path-finder';
import { ConnectionPath, connectionIntensity } from './components/connection-path';
import { NodeShapeSVG, NodeRimLight, NodeInnerPattern } from './components/node-shapes';
import { InfoPanel } from './components/info-panel';
import { CinematicIntro, type IntroPhase } from './components/cinematic-intro';
import { HoverPreview } from './components/hover-preview';
import { KGLegend } from './components/kg-legend';
import { KGLoading, KGError } from './components/kg-states';
import { ClusterContours } from './components/cluster-contours';
import { MiniMap } from './components/mini-map';
import { CLUSTERS, getClusterForType, getClusterBounds } from './lib/cluster';
import { useExploration } from './hooks/use-exploration';
import { RelationshipInspector } from './components/relationship-inspector';
import { ContextNavigator } from './components/context-navigator';
import { ContextActions } from './components/context-actions';
import { ReplayBar } from './components/replay-bar';
import { useLivingHover } from './hooks/use-living-hover';
import { LH, shouldEdgeFlow, getNodeHoverClass } from './lib/living-hover';

const CANVAS_WIDTH = 1400;
const CANVAS_HEIGHT = 900;

const FILTER_TYPES = [
  'mission', 'product', 'project', 'agent', 'architecture',
  'decision', 'doc', 'timeline', 'metric', 'technology', 'lab', 'skill',
] as const;

const SEED_TYPES = ['mission', 'product'];

const DEBUG_GRAPH = true;
function debugLog(...args: unknown[]) {
  if (DEBUG_GRAPH) console.log('[KG]', ...args);
}

type StoryPhase = 'idle' | 'clusters' | 'connections' | 'done';

function getNodeLabel(node: GraphNode, identity: ReturnType<typeof getNodeIdentity>, r: number): string {
  if (identity.labelMode === 'none') return '';
  if (node.type === 'timeline') return node.label.split(' — ')[0] || node.label;
  if (node.type === 'skill' || node.type === 'technology') return '';
  const max = r > 24 ? 14 : r > 18 ? 10 : 6;
  return node.label.length > max ? node.label.substring(0, max) + '…' : node.label;
}

function computeClusterIds(nodes: GraphNode[]): string[] {
  const types = new Set(nodes.map(n => n.type));
  return CLUSTERS.filter(c => c.types.some(t => types.has(t))).map(c => c.id);
}

export function KnowledgeExplorer() {
  /* ─── UI-only state ─── */
  const [selectedSecondary, setSelectedSecondary] = useState<GraphNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
  const [hoverScreen, setHoverScreen] = useState<{ x: number; y: number } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [introPhase, setIntroPhase] = useState<IntroPhase>('ambient');
  const [revealedWaves, setRevealedWaves] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [graphError, setGraphError] = useState<string | null>(null);
  const [showMiniMap, setShowMiniMap] = useState(false);
  const [storyPhase, setStoryPhase] = useState<StoryPhase>('idle');
  const [storyClusterIndex, setStoryClusterIndex] = useState(0);

  /* ─── Refs ─── */
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cameraGroupRef = useRef<SVGGElement>(null);
  const cameraRef = useRef({ x: 0, y: 0, zoom: 1 });
  const dragStartRef = useRef({ x: 0, y: 0, panX: 0, panY: 0 });
  const isDragging = useRef(false);
  const animFrameRef = useRef<number | null>(null);

  const updateTransform = useCallback(() => {
    const g = cameraGroupRef.current;
    if (!g) return;
    const { x, y, zoom } = cameraRef.current;
    g.setAttribute('transform', `translate(${x}, ${y}) scale(${zoom})`);
  }, []);

  /* ─── Living Hover ─── */
  const livingHover = useLivingHover(svgRef, CANVAS_WIDTH, CANVAS_HEIGHT);

  /* ─── Data ─── */
  const [activeFilters, setActiveFilters] = useState<string[]>([...FILTER_TYPES]);
  const data = useMemo(() => getFilteredGraph(activeFilters), [activeFilters]);

  /* ─── Exploration Engine ─── */
  const exploration = useExploration(data.nodes, data.edges);
  const { state: engineState } = exploration;
  const selectedNode = useMemo(
    () => engineState.currentId ? data.nodes.find(n => n.id === engineState.currentId) ?? null : null,
    [engineState.currentId, data.nodes],
  );

  /* Sync filter types with engine */
  useLayoutEffect(() => {
    exploration.setFilter('types', activeFilters as unknown as string[])
  }, [activeFilters, exploration]);

  /* ─── Simulation ─── */
  const positions: Map<string, { x: number; y: number }> = useMemo(() => {
    try {
      const simNodes = runSimulation(
        data.nodes.map(n => ({ id: n.id, type: n.type })),
        data.edges,
        { width: CANVAS_WIDTH, height: CANVAS_HEIGHT },
      );
      const map = new Map<string, { x: number; y: number }>();
      simNodes.forEach(n => map.set(n.id, { x: n.x, y: n.y }));
      return map;
    } catch (err) {
      console.error('[KG] simulation error:', err);
      return new Map();
    }
  }, [data]);

  useLayoutEffect(() => {
    if (data.nodes.length > 0 && positions.size === 0) {
      setGraphError('Falha ao processar layout do grafo.');
    } else {
      setGraphError(null);
    }
  }, [data.nodes.length, positions.size]);

  const canvasSize = useMemo(() => ({ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }), []);

  const initialFit: CameraTarget = useMemo(() => {
    if (positions.size === 0) return { x: 0, y: 0, zoom: 1 };
    return computeInitialFit(Array.from(positions.values()), canvasSize, 100);
  }, [positions, canvasSize]);

  useLayoutEffect(() => {
    cameraRef.current = { ...initialFit };
    updateTransform();
  }, [initialFit, updateTransform]);

  /* ─── Camera helpers ─── */
  const travelTo = useCallback((target: CameraTarget, duration: number) => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    const start = { ...cameraRef.current };
    const startTime = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - startTime) / (duration * 1000), 1);
      const ease = cubicBezier(t);
      cameraRef.current.x = start.x + (target.x - start.x) * ease;
      cameraRef.current.y = start.y + (target.y - start.y) * ease;
      cameraRef.current.zoom = start.zoom + (target.zoom - start.zoom) * ease;
      updateTransform();
      if (t < 1) animFrameRef.current = requestAnimationFrame(step);
    };
    animFrameRef.current = requestAnimationFrame(step);
  }, [updateTransform]);

  const setCameraImmediate = useCallback((target: CameraTarget) => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    cameraRef.current = { ...target };
    updateTransform();
  }, [updateTransform]);

  const fitToView = useCallback((animated = true) => {
    if (positions.size === 0) return;
    const arr = Array.from(positions.values());
    const target = computeInitialFit(arr, canvasSize, 100);
    if (animated) travelTo(target, 0.9);
    else setCameraImmediate(target);
  }, [positions, canvasSize, travelTo, setCameraImmediate]);

  /* ─── Connections context (UI layer) ─── */
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

  const hoverConnections = useMemo(() => {
    if (!hoveredNode || selectedNode) return { neighbors: new Set<string>(), edgeKeys: new Set<string>() };
    return findOneHop(hoveredNode.id, data.edges);
  }, [hoveredNode, selectedNode, data.edges]);

  const countsByType = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const node of data.nodes) counts[node.type] = (counts[node.type] || 0) + 1;
    return counts;
  }, [data.nodes]);

  const availableClusters = useMemo(() => computeClusterIds(data.nodes), [data.nodes]);

  const visibleNodes = useMemo(() => {
    const visibleIds = exploration.visibleNodeIds
    return data.nodes.filter(n => visibleIds.has(n.id))
  }, [data.nodes, exploration.visibleNodeIds])

  /* ─── Handlers ─── */
  const handleNodeClick = useCallback((node: GraphNode) => {
    // If clicking the same node while a secondary is selected, clear secondary
    if (selectedNode?.id === node.id && selectedSecondary) {
      setSelectedSecondary(null);
      return;
    }

    // If clicking a different node with a secondary, make it secondary
    if (selectedNode && selectedSecondary?.id === node.id) {
      setSelectedSecondary(null);
      return;
    }

    if (selectedNode && !selectedSecondary) {
      setSelectedSecondary(node);
      return;
    }

    if (selectedNode && selectedSecondary) {
      // Two nodes already selected → reset with new primary
      setSelectedSecondary(null);
    }

    exploration.selectNode(node.id);

    const pos = positions.get(node.id);
    if (pos) travelTo(computeFocusTarget(pos, canvasSize, 1.4), 0.9);

    // Expand to level 1 on click
    exploration.expandNode(node.id);
  }, [selectedNode, selectedSecondary, positions, canvasSize, travelTo, exploration]);

  const handleEdgeClick = useCallback((source: string, target: string) => {
    exploration.selectEdge(source, target);
  }, [exploration]);

  const handlePanelNavigate = useCallback((node: GraphNode) => {
    exploration.selectNode(node.id);
    exploration.expandNode(node.id);
    setSelectedSecondary(null);
    const pos = positions.get(node.id);
    if (pos) travelTo(computeFocusTarget(pos, canvasSize, 1.4), 0.9);
  }, [positions, canvasSize, travelTo, exploration]);

  const handleSearch = useCallback((q: string) => {
    setSearchQuery(q);
    if (!q.trim()) return;
    const results = searchNodes(q);
    if (results.length > 0) {
      const found = results[0];
      exploration.selectNode(found.id);
      exploration.expandNode(found.id);
      setSelectedSecondary(null);
      const pos = positions.get(found.id);
      if (pos) travelTo(computeFocusTarget(pos, canvasSize, 1.4), 1.2);
    }
  }, [positions, canvasSize, travelTo, exploration]);

  const handleReset = useCallback(() => {
    exploration.deselectNode();
    exploration.resetExpansion();
    setSelectedSecondary(null);
    setSearchQuery('');
    fitToView(true);
  }, [exploration, fitToView]);

  const toggleFilter = useCallback((type: string) => {
    setActiveFilters(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type],
    );
  }, []);

  const handleTrailClick = useCallback((node: GraphNode) => {
    exploration.selectNode(node.id);
    setSelectedSecondary(null);
    const pos = positions.get(node.id);
    if (pos) travelTo(computeFocusTarget(pos, canvasSize, 1.4), 0.7);
  }, [positions, canvasSize, travelTo, exploration]);

  const handleMiniMapClick = useCallback((vx: number, vy: number) => {
    const target = computeFocusTarget({ x: vx, y: vy }, canvasSize, 1);
    travelTo(target, 0.5);
  }, [canvasSize, travelTo]);

  const [replayActive, setReplayActive] = useState(false);

  const handleReplayCamera = useCallback((target: { clusterId: string; zoom?: number }) => {
    const clusterPositions = positions;
    const clusterVisible = visibleNodes.map(n => ({
      id: n.id, type: n.type,
      x: clusterPositions.get(n.id)?.x ?? 0,
      y: clusterPositions.get(n.id)?.y ?? 0,
    }));
    const boundsMap = getClusterBounds(clusterVisible);
    const bounds = boundsMap.get(target.clusterId);
    if (bounds) {
      travelTo(computeFocusTarget({ x: bounds.cx, y: bounds.cy }, canvasSize, target.zoom ?? 1.2), 1.2);
    }
  }, [visibleNodes, positions, canvasSize, travelTo]);

  /* ─── Navigator back ─── */
  const handleNavigatorBack = useCallback(() => {
    const prevId = exploration.goBack();
    if (prevId) {
      setSelectedSecondary(null);
      const pos = positions.get(prevId);
      if (pos) travelTo(computeFocusTarget(pos, canvasSize, 1.4), 0.7);
    }
  }, [exploration, positions, canvasSize, travelTo]);

  const handleNavigatorNavigate = useCallback((nodeId: string) => {
    exploration.selectNode(nodeId);
    setSelectedSecondary(null);
    const pos = positions.get(nodeId);
    if (pos) travelTo(computeFocusTarget(pos, canvasSize, 1.4), 0.7);
  }, [exploration, positions, canvasSize, travelTo]);

  /* ─── Context actions ─── */
  const nodeActions = useMemo(() => {
    if (!selectedNode) return []
    return exploration.getNodeActions(selectedNode.id)
  }, [selectedNode, exploration])

  const handleContextAction = useCallback((action: string) => {
    if (action === 'focus-cluster' && selectedNode) {
      exploration.focusCluster(getClusterForType(selectedNode.type).id)
    } else if (action === 'expand' && selectedNode) {
      exploration.expandNode(selectedNode.id)
    }
  }, [selectedNode, exploration])

  /* ─── Story mode ─── */
  const runStoryCluster = useCallback((clusterIdx: number) => {
    if (clusterIdx >= availableClusters.length) {
      setStoryPhase('done');
      fitToView(true);
      return;
    }
    const clusterId = availableClusters[clusterIdx];
    const cluster = CLUSTERS.find(c => c.id === clusterId);
    if (!cluster) { setStoryPhase('done'); return; }
    const members = data.nodes.filter(n => cluster.types.includes(n.type));
    if (members.length === 0) { setStoryPhase('done'); return; }
    const pos = positions.get(members[0].id);
    if (pos) {
      const target = computeFocusTarget(pos, canvasSize, 1.2);
      travelTo(target, 1.2);
    }
  }, [availableClusters, data.nodes, positions, canvasSize, travelTo, fitToView]);

  const handleStoryStep = useCallback(() => {
    if (storyPhase === 'clusters') {
      const next = storyClusterIndex + 1;
      setStoryClusterIndex(next);
      runStoryCluster(next);
    }
  }, [storyPhase, storyClusterIndex, runStoryCluster]);

  const startStory = useCallback(() => {
    setStoryPhase('clusters');
    setStoryClusterIndex(0);
    runStoryCluster(0);
  }, [runStoryCluster]);

  /* ─── Input handlers ─── */
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const factor = e.deltaY > 0 ? 0.92 : 1.08;
    const cur = cameraRef.current;
    const newZoom = Math.max(0.3, Math.min(3, cur.zoom * factor));
    travelTo({ x: cur.x, y: cur.y, zoom: newZoom }, 0.15);
  }, [travelTo]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.kg-node, .kg-hud, .kg-edge')) return;
    isDragging.current = true;
    dragStartRef.current = {
      x: e.clientX, y: e.clientY,
      panX: cameraRef.current.x, panY: cameraRef.current.y,
    };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    livingHover.handleMouseMove(e.clientX, e.clientY)
    if (isDragging.current) {
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      const svg = svgRef.current;
      const scaleFactor = svg ? svg.clientWidth / CANVAS_WIDTH : 1;
      cameraRef.current.x = dragStartRef.current.panX + dx / scaleFactor;
      cameraRef.current.y = dragStartRef.current.panY + dy / scaleFactor;
      updateTransform();
    } else if (hoveredNode && svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect();
      setHoverScreen({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  }, [hoveredNode, updateTransform, livingHover]);

  const handleMouseUp = useCallback(() => { isDragging.current = false; }, []);

  /* ─── Keyboard ─── */
  useLayoutEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.target as HTMLElement).tagName === 'INPUT' || (e.target as HTMLElement).tagName === 'TEXTAREA') return;
      if (e.key === 'Escape') {
        exploration.deselectNode();
        setSelectedSecondary(null);
        setSearchQuery('');
      } else if (e.key === 'r' || e.key === 'R') handleReset();
      else if (e.key === 'f' || e.key === 'F') setIsFullscreen(p => !p);
      else if (e.key === 'm' || e.key === 'M') setShowMiniMap(p => !p);
      else if (e.key === 'Backspace') handleNavigatorBack();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleReset, exploration, handleNavigatorBack]);

  /* ─── Reveal waves ─── */
  useLayoutEffect(() => {
    let cancelled = false;
    if (introPhase === 'ambient' || introPhase === 'camera') {
      queueMicrotask(() => { if (!cancelled) setRevealedWaves(0); });
    } else if (introPhase === 'waves') {
      const timers = [0, 1, 2, 3, 4, 5].map((w, i) =>
        setTimeout(() => { if (!cancelled) setRevealedWaves(w + 1); }, i * 250),
      );
      return () => { cancelled = true; timers.forEach(clearTimeout); };
    } else if (introPhase === 'connections' || introPhase === 'hud' || introPhase === 'done') {
      queueMicrotask(() => { if (!cancelled) setRevealedWaves(99); });
    }
    return () => { cancelled = true; };
  }, [introPhase]);

  /* ─── Render ─── */
  if (data.nodes.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#0A0E16] rounded-2xl">
        <div className="text-center">
          <p className="text-text-muted text-sm">Nenhum nó disponível</p>
          <p className="text-text-muted text-xs mt-1">Selecione ao menos um filtro para explorar</p>
        </div>
      </div>
    );
  }

  const hasError = !!graphError;
  const showHud = introPhase === 'done' || introPhase === 'hud';

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}
      style={{ background: 'rgb(7, 10, 18)' }}
    >
      {hasError && <KGError message={graphError!} onRetry={() => setGraphError(null)} />}
      <KGLoading visible={false} />

      {/* Ambient glow */}
      <div aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(79, 140, 255, 0.07), transparent 70%), ' +
            'radial-gradient(ellipse 40% 30% at 80% 80%, rgba(45, 212, 191, 0.04), transparent 60%), ' +
            'radial-gradient(ellipse 40% 30% at 20% 70%, rgba(192, 132, 252, 0.03), transparent 60%)',
        }}
      />
      <div aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(244, 247, 250, 0.6) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Cinematic intro */}
      <CinematicIntro onPhaseChange={setIntroPhase} onComplete={() => setIntroPhase('done')} />

      {/* Discovery hint */}
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

      {/* ─── HUD: Search + Navigation Trail + Navigator ─── */}
      <div className="kg-hud absolute top-6 left-6 z-20 flex flex-col gap-1.5">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: showHud ? 1 : 0, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="jf-glass-modal rounded-xl flex items-center gap-2 px-3 py-2 w-80"
            style={{
              boxShadow: 'inset 0 1px 0 0 rgba(244, 247, 250, 0.06), 0 12px 32px -8px rgba(0, 0, 0, 0.4)',
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
                onClick={() => { setSearchQuery(''); exploration.deselectNode(); }}
                className="text-text-muted hover:text-text-primary transition-colors"
                aria-label="Limpar busca"
              >
                <X size={12} />
              </button>
            )}
          </div>
        </motion.div>

        {/* Context Navigator (engine-driven breadcrumb) */}
        {showHud && (
          <ContextNavigator
            stack={engineState.navigationStack}
            allNodes={data.nodes}
            onBack={handleNavigatorBack}
            onNavigate={handleNavigatorNavigate}
          />
        )}

        {/* Navigation trail */}
        <AnimatePresence>
          {engineState.visitedIds.length > 0 && showHud && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="flex items-center gap-1 flex-wrap"
            >
              {engineState.visitedIds.slice(-6).map((nodeId, i) => {
                const n = data.nodes.find(nn => nn.id === nodeId)
                if (!n) return null
                const isCurrent = nodeId === engineState.currentId
                return (
                  <button
                    key={`${nodeId}-${i}`}
                    onClick={() => handleTrailClick(n)}
                    className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] transition-colors"
                    style={{
                      background: isCurrent
                        ? `${getNodeColor(n.type)}15`
                        : 'rgba(244,247,250,0.04)',
                      color: isCurrent
                        ? getNodeColor(n.type)
                        : 'rgba(244,247,250,0.6)',
                    }}
                  >
                    <span className="w-1 h-1 rounded-full" style={{ backgroundColor: getNodeColor(n.type) }} />
                    <span className="truncate max-w-[80px]">{n.label}</span>
                  </button>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Context Actions */}
        {showHud && selectedNode && (
          <ContextActions
            actions={nodeActions}
            onAction={handleContextAction}
            visible={showHud}
          />
        )}
      </div>

      {/* ─── HUD: right side ─── */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: showHud ? 1 : 0, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="kg-hud absolute top-6 right-6 z-20 flex flex-col items-end gap-2"
      >
        {/* Story mode button */}
        {showHud && storyPhase === 'idle' && !selectedNode && (
          <motion.button
            whileTap={m.tap.soft}
            onClick={startStory}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border-subtle/40 text-[10px] text-text-muted hover:text-text-primary transition-all"
            style={{
              background: 'rgba(10, 14, 22, 0.6)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <Play size={10} />
            Tour guiado
          </motion.button>
        )}

        {storyPhase === 'clusters' && (
          <motion.button
            whileTap={m.tap.soft}
            onClick={handleStoryStep}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-accent-primary/30 text-[10px] text-accent-primary transition-all"
            style={{
              background: 'rgba(79, 140, 255, 0.08)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <Play size={10} />
            {storyClusterIndex + 1}/{availableClusters.length}
          </motion.button>
        )}

        {/* Cluster Lens buttons */}
        {showHud && (
          <div className="flex gap-1 flex-wrap justify-end max-w-xs">
            {CLUSTERS.filter(c => availableClusters.includes(c.id)).map(cluster => {
              const isActive = engineState.focusedCluster === cluster.id
              return (
                <motion.button
                  key={cluster.id}
                  whileTap={m.tap.soft}
                  onClick={() => exploration.focusCluster(isActive ? null : cluster.id)}
                  className={`flex items-center gap-1 px-2 py-1 rounded-full text-[8px] font-medium uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'border text-text-primary'
                      : 'text-text-muted border-transparent'
                  }`}
                  style={{
                    background: isActive ? `${cluster.color}15` : 'rgba(244,247,250,0.03)',
                    borderColor: isActive ? `${cluster.color}40` : 'transparent',
                  }}
                  aria-pressed={isActive}
                >
                  <span className="w-1 h-1 rounded-full" style={{ backgroundColor: isActive ? cluster.color : '#687385' }} />
                  {cluster.label}
                </motion.button>
              )
            })}
          </div>
        )}

        {/* Filters */}
        <div className="flex gap-1.5 flex-wrap justify-end max-w-md">
          {FILTER_TYPES.map(type => {
            const active = activeFilters.includes(type);
            const color = getNodeColor(type);
            const identity = getNodeIdentity(type);
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
                style={active ? { boxShadow: `inset 0 1px 0 0 rgba(244, 247, 250, 0.04), 0 0 0 1px ${color}30` } : undefined}
                aria-pressed={active}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: active ? color : '#687385' }} />
                {identity.label}
              </motion.button>
            );
          })}
        </div>

        <div className="flex gap-1.5 mt-1">
          <motion.button
            whileTap={m.tap.soft}
            onClick={handleReset}
            className="px-2.5 py-1 rounded-md bg-surface-default/40 border border-border-subtle/40 text-[10px] text-text-muted hover:text-text-primary transition-colors"
            aria-label="Resetar câmera" title="Resetar câmera (R)"
          >
            <span className="flex items-center gap-1"><Maximize2 size={10} /> Reset</span>
          </motion.button>
          <motion.button
            whileTap={m.tap.soft}
            onClick={() => setShowMiniMap(p => !p)}
            className="px-2.5 py-1 rounded-md bg-surface-default/40 border border-border-subtle/40 text-[10px] text-text-muted hover:text-text-primary transition-colors"
            aria-label="Mini mapa" title="Mini mapa (M)"
          >
            <span className="flex items-center gap-1"><MapIcon size={10} /> Mapa</span>
          </motion.button>
          <motion.button
            whileTap={m.tap.soft}
            onClick={() => setIsFullscreen(p => !p)}
            className="px-2.5 py-1 rounded-md bg-surface-default/40 border border-border-subtle/40 text-[10px] text-text-muted hover:text-text-primary transition-colors"
            aria-label="Tela cheia" title="Tela cheia (F)"
          >
            <span className="flex items-center gap-1">
              {isFullscreen ? <Minimize2 size={10} /> : <Maximize2 size={10} />}
              {isFullscreen ? 'Sair' : 'Fullscreen'}
            </span>
          </motion.button>
        </div>
      </motion.div>

      {/* ─── SVG canvas ─── */}
      <svg
        ref={svgRef}
        className="w-full h-full cursor-grab active:cursor-grabbing select-none block"
        viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}
        preserveAspectRatio="xMidYMid meet"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => { isDragging.current = false; setHoveredNode(null); setHoverScreen(null); }}
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
          <pattern id="kg-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="0" cy="0" r="0.6" fill="rgba(244, 247, 250, 0.04)" />
            <circle cx="60" cy="0" r="0.6" fill="rgba(244, 247, 250, 0.04)" />
            <circle cx="30" cy="30" r="0.6" fill="rgba(244, 247, 250, 0.03)" />
          </pattern>
          <marker id="kg-arrow" viewBox="0 0 10 8" refX="8" refY="4" markerWidth="8" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 4 L 0 8 Z" fill="rgba(244, 247, 250, 0.5)" />
          </marker>
        </defs>

        <rect width={CANVAS_WIDTH} height={CANVAS_HEIGHT} fill="url(#kg-grid)" />

        <g ref={cameraGroupRef}>
          {/* Cluster contours */}
          <ClusterContours
            nodes={visibleNodes}
            positions={positions}
            selectedType={selectedNode?.type ?? hoveredNode?.type ?? null}
          />

          {/* Edges */}
          {data.edges.map(edge => {
            const si = data.nodes.findIndex(n => n.id === edge.source);
            const ti = data.nodes.findIndex(n => n.id === edge.target);
            if (si === -1 || ti === -1 || !positions.has(edge.source) || !positions.has(edge.target)) return null;
            const p1 = positions.get(edge.source)!;
            const p2 = positions.get(edge.target)!;
            const sourceNode = data.nodes[si];
            const targetNode = data.nodes[ti];
            const intensity = connectionIntensity(
              edge, selectedNode?.id ?? null, oneHopData.neighbors, pathData?.edgeKeys ?? new Set(),
            );
            const targetIntensity = connectionIntensity(
              edge, selectedSecondary?.id ?? null, new Set(), new Set(),
            );
            const finalIntensity = intensity === 'normal' && targetIntensity === 'highlight' ? 'highlight' : intensity;
            const isConnectionsPhase = introPhase === 'connections' || introPhase === 'hud' || introPhase === 'done';
            const isSelectedEdge =
              engineState.selectedEdge?.source === edge.source &&
              engineState.selectedEdge?.target === edge.target;
            return (
              <g
                key={`edge-${edge.source}-${edge.target}`}
                className="kg-edge"
                style={{ cursor: 'pointer' }}
                onClick={() => handleEdgeClick(edge.source, edge.target)}
              >
                <ConnectionPath
                  edge={edge}
                  x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
                  intensity={isSelectedEdge ? 'highlight' : isConnectionsPhase ? finalIntensity : 'dim'}
                  sourceColor={getNodeColor(sourceNode.type)}
                  targetColor={getNodeColor(targetNode.type)}
                  delay={isConnectionsPhase ? Math.min(data.edges.indexOf(edge) * 0.01, 0.4) : 0}
                  gradientKey={`${edge.source}-${edge.target}`}
                  showArrow={isConnectionsPhase && finalIntensity !== 'dim'}
                  hoverFlow={shouldEdgeFlow(
                    edge.source, edge.target,
                    hoveredNode?.id ?? null,
                    hoverConnections.neighbors,
                  )}
                />
              </g>
            );
          })}

          {/* Nodes */}
          {visibleNodes.map(node => {
            const pos = positions.get(node.id);
            if (!pos) return null;
            const identity = getNodeIdentity(node.type);
            const color = getNodeColor(node.type);
            const wave = getEntryWave(node.type);
            const isRevealed = revealedWaves > wave;
            const isSelected = selectedNode?.id === node.id;
            const isSecondary = selectedSecondary?.id === node.id;
            const isOnPath = pathData?.nodeIds.includes(node.id) ?? false;
            const isHovered = hoveredNode?.id === node.id;
            const isDimmedBySelection = (selectedNode && !isSelected && !oneHopData.neighbors.has(node.id) && !isOnPath) ||
              (selectedSecondary && !isSecondary && !oneHopData.neighbors.has(node.id) && !isOnPath);
            const isDimmedByHover = !selectedNode && !selectedSecondary && !!hoveredNode && !isHovered && !hoverConnections.neighbors.has(node.id);
            const isDimmed = isDimmedBySelection || isDimmedByHover;
            const isNeighbor = !isHovered && !isDimmed && !!hoveredNode && hoverConnections.neighbors.has(node.id);
            const r = identity.baseRadius;
            const haloR = r * identity.haloRadius;
            const scale = isHovered ? 1.12 : isSelected ? 1.08 : 1;
            const haloOpacity = isDimmed ? 0 : isSelected ? 0.6 : isHovered ? 0.5 : isNeighbor ? 0.2 : identity.haloIntensity;
            const nodeOpacity = isDimmed ? 0.25 : isHovered ? 1 : 0.92;
            const labelText = getNodeLabel(node, identity, r);
            const showLabel = identity.labelMode !== 'none' && (isHovered || isSelected || identity.labelMode === 'outside');

            const hoverClass = getNodeHoverClass(isHovered, isNeighbor, isDimmed)
            const magnetic = isHovered ? livingHover.magneticRef.current : { dx: 0, dy: 0 }
            const neighborIndex = isNeighbor ? Array.from(hoverConnections.neighbors).indexOf(node.id) : 0

            return (
              <g
                key={node.id}
                className={`kg-node ${hoverClass}`}
                transform={`translate(${pos.x}, ${pos.y})`}
                style={{
                  cursor: 'pointer',
                  color,
                  '--kg-lh-cascade-delay': isNeighbor ? `${Math.min(neighborIndex * 0.035, 0.35)}s` : '0s',
                  '--kg-lh-magnetic-x': `${magnetic.dx}px`,
                  '--kg-lh-magnetic-y': `${magnetic.dy}px`,
                } as React.CSSProperties}
                onClick={() => handleNodeClick(node)}
                onMouseEnter={(e) => {
                  setHoveredNode(node);
                  livingHover.setMagneticTarget(node.id, pos.x, pos.y, e.clientX, e.clientY)
                  if (svgRef.current) {
                    const rect = svgRef.current.getBoundingClientRect();
                    setHoverScreen({ x: e.clientX - rect.left, y: e.clientY - rect.top });
                  }
                }}
                onMouseLeave={() => { setHoveredNode(null); setHoverScreen(null); livingHover.clearMagnetic(); }}
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
                    className="kg-lh-halo"
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
                  {(isHovered && !isSelected && !isSecondary) && (
                    <motion.circle
                      r={r + 6}
                      fill="none"
                      stroke={color}
                      strokeWidth={1}
                      className="kg-lh-outer-ring"
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 0.5, scale: 1 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                  {isOnPath && !isSelected && !isSecondary && (
                    <circle r={r + 4} fill="none" stroke="#4F8CFF" strokeWidth={1} opacity={0.6} />
                  )}
                  <motion.g
                    animate={{ scale, x: magnetic.dx, y: magnetic.dy }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    filter={isSelected ? 'url(#kg-node-glow)' : undefined}
                    className="kg-lh-shape-group"
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
                        textAnchor="middle" dominantBaseline="central"
                        fill="rgba(244, 247, 250, 0.95)" fontSize={identity.glyphSize}
                        fontWeight={600} className="pointer-events-none select-none"
                      >
                        {identity.glyph}
                      </text>
                    )}
                    {identity.labelMode === 'inside' && labelText && (
                      <text
                        textAnchor="middle" dominantBaseline="central"
                        fill="rgba(244, 247, 250, 0.95)" fontSize={identity.glyphSize}
                        fontWeight={500} className="pointer-events-none select-none"
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
                      textAnchor="middle" dy={r + 14}
                      fill="rgba(244, 247, 250, 0.9)" fontSize={10}
                      fontWeight={500} className="pointer-events-none select-none kg-lh-label"
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

        {/* Cursor trail (reacts to points ref changes via useLayoutEffect) */}
        {livingHover.trailRef.current.length > 1 && (
          <polyline
            className="kg-lh-trail-polyline"
            points={livingHover.trailRef.current.map(p => `${p.x},${p.y}`).join(' ')}
          />
        )}
      </svg>

      {/* Hover preview */}
      <HoverPreview
        node={hoveredNode}
        screenPosition={hoverScreen}
        connectionCount={hoveredNode ? hoverConnections.neighbors.size : undefined}
      />

      {/* Relationship Inspector */}
      <RelationshipInspector
        edge={engineState.selectedEdge}
        allNodes={data.nodes}
        allEdges={data.edges}
        onClose={() => exploration.selectEdge('', '')}
        onNodeClick={(nodeId) => {
          const node = data.nodes.find(n => n.id === nodeId)
          if (node) handleNodeClick(node)
        }}
      />

      {/* Info panel */}
      <AnimatePresence>
        {selectedNode && (
          <InfoPanel
            node={selectedNode}
            onClose={() => { exploration.deselectNode(); setSelectedSecondary(null); }}
            edges={relatedEdges}
            allNodes={data.nodes}
          />
        )}
      </AnimatePresence>

      {/* Legend */}
      <KGLegend
        counts={countsByType}
        activeFilters={activeFilters}
        onToggle={toggleFilter}
        visible={showHud}
      />

      {/* Mini map */}
      <AnimatePresence>
        {showMiniMap && showHud && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="kg-hud absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
          >
            <MiniMap
              nodes={visibleNodes}
              positions={positions}
              camera={cameraRef.current}
              canvasWidth={CANVAS_WIDTH}
              canvasHeight={CANVAS_HEIGHT}
              onClick={handleMiniMapClick}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Replay Bar */}
      <ReplayBar
        onCameraTarget={handleReplayCamera}
        onReplayActive={setReplayActive}
      />

      {/* Bottom HUD: stats */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: showHud ? 1 : 0, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="kg-hud absolute bottom-6 left-6 z-20"
      >
        <div
          className="flex items-center gap-3 px-3 py-1.5 rounded-lg"
          style={{
            background: 'rgba(10, 14, 22, 0.6)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid rgba(244, 247, 250, 0.04)',
          }}
        >
          <span className="text-[10px] text-text-muted font-medium tabular-nums">
            {visibleNodes.length} <span className="font-normal opacity-60">nós</span>
          </span>
          <span className="w-px h-3 bg-border-subtle/30" />
          <span className="text-[10px] text-text-muted tabular-nums">
            {data.edges.length} <span className="font-normal opacity-60">conexões</span>
          </span>
          {selectedNode && (
            <>
              <span className="w-px h-3 bg-border-subtle/30" />
              <span className="text-[10px] text-accent-qa/80 font-medium truncate max-w-[120px]">
                {selectedNode.label}
              </span>
            </>
          )}
          {selectedSecondary && (
            <>
              <span className="text-text-muted/40 text-[9px]">→</span>
              <span className="text-[10px] text-accent-teal/70 font-medium truncate max-w-[100px]">
                {selectedSecondary.label}
              </span>
            </>
          )}
          {selectedNode && (
            <>
              <span className="w-px h-3 bg-border-subtle/30" />
              <span
                className="text-[9px] font-medium"
                style={{ color: getClusterForType(selectedNode.type).color }}
              >
                {getClusterForType(selectedNode.type).label}
              </span>
            </>
          )}
        </div>
      </motion.div>

      {/* Keyboard HUD */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: showHud ? 1 : 0, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="kg-hud absolute bottom-6 right-6 z-20"
      >
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
          style={{
            background: 'rgba(10, 14, 22, 0.6)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid rgba(244, 247, 250, 0.04)',
          }}
        >
          <Keyboard size={10} className="text-text-muted/50" />
          <span className="px-1 py-0.5 rounded text-[9px] font-mono text-text-muted/70" style={{ background: 'rgba(244, 247, 250, 0.04)' }}>R</span>
          <span className="text-[9px] text-text-muted/50">Reset</span>
          <span className="text-text-muted/20">·</span>
          <span className="px-1 py-0.5 rounded text-[9px] font-mono text-text-muted/70" style={{ background: 'rgba(244, 247, 250, 0.04)' }}>F</span>
          <span className="text-[9px] text-text-muted/50">Fullscreen</span>
          <span className="text-text-muted/20">·</span>
          <span className="px-1 py-0.5 rounded text-[9px] font-mono text-text-muted/70" style={{ background: 'rgba(244, 247, 250, 0.04)' }}>M</span>
          <span className="text-[9px] text-text-muted/50">Mapa</span>
          <span className="text-text-muted/20">·</span>
          <span className="px-1 py-0.5 rounded text-[9px] font-mono text-text-muted/70" style={{ background: 'rgba(244, 247, 250, 0.04)' }}>⌫</span>
          <span className="text-[9px] text-text-muted/50">Voltar</span>
          <span className="text-text-muted/20">·</span>
          <span className="px-1 py-0.5 rounded text-[9px] font-mono text-text-muted/70" style={{ background: 'rgba(244, 247, 250, 0.04)' }}>ESC</span>
          <span className="text-[9px] text-text-muted/50">Fechar</span>
        </div>
      </motion.div>
    </div>
  );
}
