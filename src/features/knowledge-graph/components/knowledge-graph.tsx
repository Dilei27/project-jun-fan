'use client';

import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getFilteredGraph, getNodeConnections, searchNodes } from '@/core';
import type { GraphNode, GraphEdge } from '@/core';
import { entityLabels } from '@/core/types';

interface Position { x: number; y: number }

const NODE_RADIUS_BY_TYPE: Record<string, number> = {
  product: 28, project: 24, decision: 20, doc: 18, timeline: 18, skill: 14,
}

function forceSimulation(nodes: GraphNode[], edges: GraphEdge[], width: number, height: number): Position[] {
  const positions: Position[] = nodes.map(() => ({
    x: width / 2 + (Math.random() - 0.5) * width * 0.4,
    y: height / 2 + (Math.random() - 0.5) * height * 0.4,
  }))
  const velocities: Position[] = nodes.map(() => ({ x: 0, y: 0 }))
  const REPULSION = 1500; const ATTRACTION = 0.01; const CENTER = 0.005; const DAMPING = 0.85; const ITERATIONS = 100

  for (let iter = 0; iter < ITERATIONS; iter++) {
    const cooling = 1 - iter / ITERATIONS
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = positions[j].x - positions[i].x; const dy = positions[j].y - positions[i].y
        const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 1); const force = REPULSION / (dist * dist)
        const fx = (dx / dist) * force * cooling; const fy = (dy / dist) * force * cooling
        velocities[i].x -= fx; velocities[i].y -= fy; velocities[j].x += fx; velocities[j].y += fy
      }
    }
    for (const edge of edges) {
      const si = nodes.findIndex(n => n.id === edge.source); const ti = nodes.findIndex(n => n.id === edge.target)
      if (si === -1 || ti === -1) continue
      const dx = positions[ti].x - positions[si].x; const dy = positions[ti].y - positions[si].y
      const dist = Math.sqrt(dx * dx + dy * dy); const force = (dist - 100) * ATTRACTION * cooling
      const fx = (dx / (dist || 1)) * force; const fy = (dy / (dist || 1)) * force
      velocities[si].x += fx; velocities[si].y += fy; velocities[ti].x -= fx; velocities[ti].y -= fy
    }
    for (let i = 0; i < nodes.length; i++) {
      velocities[i].x += (width / 2 - positions[i].x) * CENTER * cooling
      velocities[i].y += (height / 2 - positions[i].y) * CENTER * cooling
    }
    for (let i = 0; i < nodes.length; i++) {
      velocities[i].x *= DAMPING; velocities[i].y *= DAMPING
      positions[i].x += velocities[i].x; positions[i].y += velocities[i].y
    }
  }
  return positions
}

export function KnowledgeGraph() {
  const [activeFilters, setActiveFilters] = useState<string[]>(['product', 'project', 'decision', 'doc', 'timeline', 'skill'])
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null)
  const [selectedConnections, setSelectedConnections] = useState<GraphEdge[]>([])
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState<Position>({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 })

  const data = useMemo(() => {
    return activeFilters.length > 0 ? getFilteredGraph(activeFilters) : getFilteredGraph(activeFilters)
  }, [activeFilters])

  const positions = useMemo(() => {
    return forceSimulation(data.nodes, data.edges, 1000, 600)
  }, [data])

  const handleNodeClick = useCallback((node: GraphNode) => {
    if (selectedNode?.id === node.id) {
      setSelectedNode(null); setSelectedConnections([])
    } else {
      setSelectedNode(node); setSelectedConnections(getNodeConnections(node.id))
    }
  }, [selectedNode])

  const handleSearch = useCallback((q: string) => {
    setSearchQuery(q)
    if (!q.trim()) return
    const results = searchNodes(q)
    if (results.length > 0) {
      const idx = data.nodes.findIndex(n => n.id === results[0].id)
      if (idx !== -1 && positions[idx]) {
        setPan({ x: -positions[idx].x * zoom + 500, y: -positions[idx].y * zoom + 300 })
        setSelectedNode(results[0])
        setSelectedConnections(getNodeConnections(results[0].id))
      }
    }
  }, [data.nodes, positions, zoom])

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    setZoom(z => Math.max(0.3, Math.min(3, z * (e.deltaY > 0 ? 0.9 : 1.1))))
  }, [])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.graph-node')) return
    setIsDragging(true)
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
  }, [pan])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging) setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y })
  }, [isDragging, dragStart])

  const handleMouseUp = useCallback(() => setIsDragging(false), [])

  return (
    <div className="relative w-full h-full">
      <input
        type="text"
        value={searchQuery}
        onChange={e => handleSearch(e.target.value)}
        placeholder="Buscar no grafo..."
        className="absolute top-4 left-4 z-10 w-64 px-4 py-2 bg-surface-elevated border border-border-subtle rounded-lg text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-accent-qa transition-colors"
        aria-label="Buscar no grafo de conhecimento"
      />

      <div className="absolute top-4 right-4 z-10 flex flex-wrap gap-2 max-w-md justify-end">
        {Object.entries(entityLabels).map(([type, label]) => (
          <button
            key={type}
            onClick={() => setActiveFilters(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type])}
            className={`px-3 py-1.5 text-xs rounded-full border transition-colors cursor-pointer ${
              activeFilters.includes(type)
                ? 'bg-accent-qa/10 border-accent-qa/30 text-accent-qa'
                : 'bg-surface-default border-border-subtle text-text-muted hover:text-text-secondary'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <svg
        className="w-full h-full cursor-grab active:cursor-grabbing select-none"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
          {data.edges.map((edge, i) => {
            const si = data.nodes.findIndex(n => n.id === edge.source)
            const ti = data.nodes.findIndex(n => n.id === edge.target)
            if (si === -1 || ti === -1 || !positions[si] || !positions[ti]) return null
            const isHighlighted = selectedNode && (edge.source === selectedNode.id || edge.target === selectedNode.id)
            return (
              <line
                key={`edge-${i}`}
                x1={positions[si].x} y1={positions[si].y}
                x2={positions[ti].x} y2={positions[ti].y}
                stroke={isHighlighted ? '#4F8CFF' : '#263241'}
                strokeWidth={isHighlighted ? 2 : 1}
                opacity={isHighlighted ? 0.8 : 0.3}
              />
            )
          })}

          {data.nodes.map((node, i) => {
            if (!positions[i]) return null
            const pos = positions[i]
            const isSelected = selectedNode?.id === node.id
            const isHovered = hoveredNode === node.id
            const isConnected = selectedNode && selectedConnections.some(e => e.source === node.id || e.target === node.id)
            const isDimmed = selectedNode && !isSelected && !isConnected
            const r = NODE_RADIUS_BY_TYPE[node.type] || 16

            return (
              <g
                key={node.id}
                className="graph-node"
                transform={`translate(${pos.x}, ${pos.y})`}
                style={{ cursor: 'pointer' }}
                onClick={() => handleNodeClick(node)}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {isSelected && (
                  <circle r={r + 8} fill="none" stroke={node.color} strokeWidth={2} opacity={0.3} className="animate-pulse" />
                )}
                <circle
                  r={isHovered ? r + 3 : r}
                  fill={node.color}
                  opacity={isDimmed ? 0.2 : isHovered ? 1 : 0.85}
                  className="transition-all duration-160"
                />
                <text
                  textAnchor="middle" dy={r > 20 ? 0 : 4} fill="white"
                  fontSize={r > 20 ? 11 : 9} fontWeight={600}
                  opacity={isDimmed ? 0.3 : 1}
                  className="pointer-events-none select-none"
                >
                  {node.type === 'timeline' ? (node.label.split(' — ')[0]) : node.type === 'skill' ? '' : node.label.substring(0, r > 20 ? 12 : 6)}
                </text>
                {isHovered && (
                  <text textAnchor="middle" dy={-r - 10} fill="#F4F7FA" fontSize={11} className="pointer-events-none select-none">
                    {node.label.substring(0, 30)}{node.label.length > 30 ? '…' : ''}
                  </text>
                )}
              </g>
            )
          })}
        </g>
      </svg>

      <AnimatePresence>
        {selectedNode && (
          <NodePanel
            node={selectedNode}
            connections={selectedConnections}
            allNodes={data.nodes}
            onClose={() => { setSelectedNode(null); setSelectedConnections([]) }}
          />
        )}
      </AnimatePresence>

      <div className="absolute bottom-4 left-4 text-xs text-text-muted">
        {data.nodes.length} nós · {data.edges.length} conexões
        {zoom !== 1 && ` · ${Math.round(zoom * 100)}%`}
      </div>
    </div>
  )
}

function NodePanel({ node, connections, allNodes, onClose }: {
  node: GraphNode; connections: GraphEdge[]; allNodes: GraphNode[]; onClose: () => void
}) {
  const relatedByType = useMemo(() => {
    const byType: Record<string, { node: GraphNode; relation: string }[]> = {}
    for (const edge of connections) {
      const otherId = edge.source === node.id ? edge.target : edge.source
      const other = allNodes.find(n => n.id === otherId)
      if (!other) continue
      if (!byType[other.type]) byType[other.type] = []
      byType[other.type].push({ node: other, relation: edge.label || 'relaciona' })
    }
    return byType
  }, [node, connections, allNodes])

  return (
    <motion.div
      initial={{ opacity: 0, x: 320 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 320 }}
      transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
      className="absolute top-4 right-4 w-80 bg-surface-elevated border border-border-subtle rounded-xl shadow-2xl overflow-hidden z-20"
    >
      <div className="p-5 border-b border-border-subtle">
        <div className="flex items-start justify-between mb-2">
          <div>
            <span className="text-xs font-medium text-text-muted uppercase tracking-wider">
              {entityLabels[node.type] || node.type}
            </span>
            <h3 className="text-base font-semibold text-text-primary mt-1">{node.label}</h3>
          </div>
          <button onClick={onClose} className="p-1 text-text-muted hover:text-text-primary rounded cursor-pointer" aria-label="Fechar painel">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
        <p className="text-sm text-text-secondary leading-relaxed">{node.description}</p>
      </div>

      <div className="p-5 max-h-72 overflow-y-auto">
        {Object.keys(relatedByType).length > 0 ? (
          Object.entries(relatedByType).map(([type, items]) => (
            <div key={type} className="mb-4 last:mb-0">
              <span className="text-xs font-medium text-text-muted uppercase tracking-wider mb-2 block">
                {entityLabels[type] || type} ({items.length})
              </span>
              <div className="space-y-2">
                {items.map(item => (
                  <a
                    key={item.node.id}
                    href={item.node.url || '#'}
                    className="flex items-center gap-2 p-2 bg-surface-default border border-border-subtle rounded-lg text-sm text-text-secondary hover:bg-surface-soft transition-colors"
                  >
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: item.node.color }} />
                    <span className="flex-1 truncate">{item.node.label}</span>
                    <span className="text-xs text-text-muted">{item.relation}</span>
                  </a>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-text-muted">Nenhuma conexão direta.</p>
        )}
      </div>

      {node.url && (
        <div className="px-5 pb-5">
          <a href={node.url} className="inline-flex items-center gap-1 text-sm text-accent-qa hover:underline">
            Abrir página → 
          </a>
        </div>
      )}
    </motion.div>
  )
}
