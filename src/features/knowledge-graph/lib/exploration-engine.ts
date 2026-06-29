/**
 * ExplorationEngine — Camada de navegação desacoplada da interface.
 *
 * Responsabilidades:
 *  - Gerenciar nó atual, visitados, expandidos, foco, pilha
 *  - Controlar níveis de expansão (1-hop, 2-hop, ecossistema)
 *  - Gerenciar filtros inteligentes
 *  - Navegação com histórico reutilizável pelo Sensei
 *
 * Nenhuma dependência de React, DOM ou interface.
 */

import type { GraphNode, GraphEdge } from '@/core';

/* ─── Types ─── */

export type ExpansionLevel = 0 | 1 | 2 | 3;

export interface FilterCriteria {
  types: string[]
  clusters: string[]
  health: string[]
  risk: string[]
  status: string[]
  owner: string[]
  tags: string[]
  maturity: string[]
}

export interface ExplorerState {
  currentId: string | null
  visitedIds: string[]
  expandedIds: Map<string, ExpansionLevel>
  focusedCluster: string | null
  navigationStack: string[]
  history: HistoryEntry[]
  filters: FilterCriteria
  selectedEdge: { source: string; target: string } | null
}

export interface HistoryEntry {
  nodeId: string
  nodeLabel: string
  timestamp: number
  action: 'select' | 'expand' | 'back' | 'search'
}

export interface NodeContext {
  node: GraphNode
  level: ExpansionLevel
  isVisited: boolean
  isCurrent: boolean
  connections: {
    oneHop: string[]
    twoHop: string[]
    incoming: string[]
    outgoing: string[]
  }
}

/* ─── Defaults ─── */

const DEFAULT_FILTERS: FilterCriteria = {
  types: [],
  clusters: [],
  health: [],
  risk: [],
  status: [],
  owner: [],
  tags: [],
  maturity: [],
};

/* ─── CLUSTERS (mirror DR-010 clusters) ─── */

const CLUSTER_TYPES: Record<string, string[]> = {
  core: ['mission', 'architecture'],
  products: ['product', 'technology'],
  projects: ['project', 'agent', 'lab'],
  knowledge: ['doc', 'timeline'],
  decisions: ['decision'],
  skills: ['skill', 'metric'],
};

function getClusterForType(type: string): string {
  for (const [clusterId, types] of Object.entries(CLUSTER_TYPES)) {
    if (types.includes(type)) return clusterId;
  }
  return 'other';
}

/* ─── Engine ─── */

export class ExplorationEngine {
  /* ─── Private state ─── */
  private _currentId: string | null = null
  private _visitedIds: string[] = []
  private _expandedIds = new Map<string, ExpansionLevel>()
  private _focusedCluster: string | null = null
  private _navigationStack: string[] = []
  private _history: HistoryEntry[] = []
  private _filters: FilterCriteria = { ...DEFAULT_FILTERS, types: [] }
  private _selectedEdge: { source: string; target: string } | null = null
  private _allNodes: GraphNode[] = []
  private _allEdges: GraphEdge[] = []
  private _listeners: Array<() => void> = []
  private _snapshot: ExplorerState | null = null
  private _dirty = true

  /* ─── Initialization ─── */

  initialize(nodes: GraphNode[], edges: GraphEdge[]) {
    this._allNodes = nodes
    this._allEdges = edges
    this._currentId = null
    this._visitedIds = []
    this._expandedIds = new Map()
    this._focusedCluster = null
    this._navigationStack = []
    this._history = []
    this._filters = { ...DEFAULT_FILTERS, types: [] }
    this._selectedEdge = null
    this._notify()
  }

  subscribe(fn: () => void) {
    this._listeners.push(fn)
    return () => {
      this._listeners = this._listeners.filter(l => l !== fn)
    }
  }

  private _notify() {
    this._dirty = true
    this._snapshot = null
    for (const fn of this._listeners) fn()
  }

  /* ─── Node selection ─── */

  selectNode(nodeId: string) {
    if (nodeId === this._currentId) {
      this.deselectNode()
      return
    }

    if (this._currentId) {
      this._navigationStack.push(this._currentId)
    }

    this._currentId = nodeId
    this._selectedEdge = null

    if (!this._visitedIds.includes(nodeId)) {
      this._visitedIds.push(nodeId)
    }

    this._ensureExpanded(nodeId, 1)

    this._history.push({
      nodeId,
      nodeLabel: this._findNode(nodeId)?.label ?? nodeId,
      timestamp: Date.now(),
      action: 'select',
    })

    this._focusedCluster = getClusterForType(this._findNode(nodeId)?.type ?? '')
    this._notify()
  }

  deselectNode() {
    this._currentId = null
    this._selectedEdge = null
    this._notify()
  }

  goBack(): string | null {
    const prev = this._navigationStack.pop()
    if (prev) {
      this._currentId = prev
      this._selectedEdge = null
      this._history.push({
        nodeId: prev,
        nodeLabel: this._findNode(prev)?.label ?? prev,
        timestamp: Date.now(),
        action: 'back',
      })
      this._notify()
      return prev
    }
    return null
  }

  /* ─── Expansion ─── */

  expandNode(nodeId: string) {
    const current = this._expandedIds.get(nodeId) ?? 0
    const next = Math.min(current + 1, 3) as ExpansionLevel
    this._expandedIds.set(nodeId, next)

    this._history.push({
      nodeId,
      nodeLabel: this._findNode(nodeId)?.label ?? nodeId,
      timestamp: Date.now(),
      action: 'expand',
    })

    this._notify()
  }

  collapseNode(nodeId: string) {
    this._expandedIds.set(nodeId, 0)
    this._notify()
  }

  expandAll(level: ExpansionLevel) {
    for (const node of this._allNodes) {
      this._expandedIds.set(node.id, level)
    }
    this._notify()
  }

  resetExpansion() {
    this._expandedIds = new Map()
    this._currentId = null
    this._navigationStack = []
    this._focusedCluster = null
    this._notify()
  }

  private _ensureExpanded(nodeId: string, level: ExpansionLevel) {
    const cur = this._expandedIds.get(nodeId) ?? 0
    if (cur < level) {
      this._expandedIds.set(nodeId, level)
    }
  }

  /* ─── Edge selection ─── */

  selectEdge(sourceId: string, targetId: string) {
    if (!sourceId || !targetId) {
      this._selectedEdge = null
    } else if (this._selectedEdge?.source === sourceId && this._selectedEdge?.target === targetId) {
      this._selectedEdge = null
    } else {
      this._selectedEdge = { source: sourceId, target: targetId }
    }
    this._notify()
  }

  /* ─── Cluster focus ─── */

  focusCluster(clusterId: string | null) {
    if (this._focusedCluster === clusterId) return
    this._focusedCluster = clusterId
    this._notify()
  }

  /* ─── Filters ─── */

  setFilter<K extends keyof FilterCriteria>(key: K, values: FilterCriteria[K]) {
    if (this._filtersEqual(key, values)) return
    this._filters[key] = values
    this._notify()
  }

  private _filtersEqual<K extends keyof FilterCriteria>(key: K, values: FilterCriteria[K]): boolean {
    const current = this._filters[key]
    if (!Array.isArray(current) || !Array.isArray(values)) return false
    if (current.length !== values.length) return false
    return (current as unknown[]).every((v, i) => v === values[i])
  }

  resetFilters() {
    this._filters = { ...DEFAULT_FILTERS, types: [] }
    this._notify()
  }

  getActiveClustersFromFilters(): string[] {
    const clusterMap = new Map<string, number>()
    for (const type of this._filters.types) {
      const cluster = getClusterForType(type)
      clusterMap.set(cluster, (clusterMap.get(cluster) ?? 0) + 1)
    }
    return Array.from(clusterMap.keys())
  }

  /* ─── Getters (stateless queries) ─── */

  get state(): ExplorerState {
    if (!this._dirty && this._snapshot) return this._snapshot
    this._snapshot = {
      currentId: this._currentId,
      visitedIds: [...this._visitedIds],
      expandedIds: new Map(this._expandedIds),
      focusedCluster: this._focusedCluster,
      navigationStack: [...this._navigationStack],
      history: [...this._history],
      filters: { ...this._filters },
      selectedEdge: this._selectedEdge ? { ...this._selectedEdge } : null,
    }
    this._dirty = false
    return this._snapshot
  }

  get filteredNodes(): GraphNode[] {
    return this._allNodes.filter(n => {
      if (this._filters.types.length > 0 && !this._filters.types.includes(n.type)) return false
      if (this._focusedCluster) {
        const clusterTypes = CLUSTER_TYPES[this._focusedCluster]
        if (clusterTypes && !clusterTypes.includes(n.type)) return false
      }
      return true
    })
  }

  get filteredEdges(): GraphEdge[] {
    const validIds = new Set(this.filteredNodes.map(n => n.id))
    return this._allEdges.filter(e =>
      validIds.has(e.source) && validIds.has(e.target),
    )
  }

  get visibleNodeIds(): Set<string> {
    const visible = new Set<string>()

    if (this._currentId && this._expandedIds.size > 0) {
      for (const [id, level] of this._expandedIds) {
        visible.add(id)
        if (level >= 1) {
          const oneHop = this._getOneHopNeighbors(id)
          oneHop.forEach(nid => visible.add(nid))
        }
        if (level >= 2) {
          const twoHop = this._getTwoHopNeighbors(id)
          twoHop.forEach(nid => visible.add(nid))
        }
        if (level >= 3) {
          this._allNodes.forEach(n => visible.add(n.id))
        }
      }
    } else {
      this._allNodes.forEach(n => visible.add(n.id))
    }

    // Apply filters
    const filtered = this.filteredNodes
    const filteredIds = new Set(filtered.map(n => n.id))
    return new Set([...visible].filter(id => filteredIds.has(id)))
  }

  get nodeContext(): Map<string, NodeContext> {
    const ctx = new Map<string, NodeContext>()
    for (const node of this._allNodes) {
      ctx.set(node.id, {
        node,
        level: this._expandedIds.get(node.id) ?? 0,
        isVisited: this._visitedIds.includes(node.id),
        isCurrent: this._currentId === node.id,
        connections: {
          oneHop: this._getOneHopNeighbors(node.id),
          twoHop: this._getTwoHopNeighbors(node.id),
          incoming: this._getIncoming(node.id),
          outgoing: this._getOutgoing(node.id),
        },
      })
    }
    return ctx
  }

  getEdgeData(sourceId: string, targetId: string): {
    edge: GraphEdge | undefined
    source: GraphNode | undefined
    target: GraphNode | undefined
  } {
    const edge = this._allEdges.find(
      e => (e.source === sourceId && e.target === targetId) ||
           (e.source === targetId && e.target === sourceId),
    )
    return {
      edge,
      source: this._findNode(sourceId),
      target: this._findNode(targetId),
    }
  }

  getNodeActions(nodeId: string): Array<{ label: string; action: string; href?: string }> {
    const node = this._findNode(nodeId)
    if (!node) return []

    const actions: Array<{ label: string; action: string; href?: string }> = []

    if (node.url) {
      actions.push({ label: 'Abrir documentação', action: 'navigate', href: node.url })
    }

    actions.push({ label: 'Focar cluster', action: 'focus-cluster' })
    actions.push({ label: 'Revelar relacionados', action: 'expand' })

    const neighbors = this._getOneHopNeighbors(nodeId)
    if (neighbors.length > 0) {
      const docNeighbors = neighbors.filter(nid => {
        const n = this._findNode(nid)
        return n?.type === 'doc'
      })
      const decisionNeighbors = neighbors.filter(nid => {
        const n = this._findNode(nid)
        return n?.type === 'decision'
      })
      if (docNeighbors.length > 0) {
        actions.push({ label: `Docs relacionados (${docNeighbors.length})`, action: 'navigate', href: '/docs/' })
      }
      if (decisionNeighbors.length > 0) {
        actions.push({ label: `Decisões relacionadas (${decisionNeighbors.length})`, action: 'navigate', href: '/decisoes/' })
      }
    }

    return actions
  }

  /* ─── Private helpers ─── */

  private _findNode(id: string): GraphNode | undefined {
    return this._allNodes.find(n => n.id === id)
  }

  private _getOneHopNeighbors(nodeId: string): string[] {
    const neighbors = new Set<string>()
    for (const edge of this._allEdges) {
      if (edge.source === nodeId) neighbors.add(edge.target)
      if (edge.target === nodeId) neighbors.add(edge.source)
    }
    return Array.from(neighbors)
  }

  private _getTwoHopNeighbors(nodeId: string): string[] {
    const oneHop = this._getOneHopNeighbors(nodeId)
    const twoHop = new Set<string>()
    for (const nid of oneHop) {
      const next = this._getOneHopNeighbors(nid)
      next.forEach(n => {
        if (n !== nodeId && !oneHop.includes(n)) {
          twoHop.add(n)
        }
      })
    }
    return Array.from(twoHop)
  }

  private _getIncoming(nodeId: string): string[] {
    return this._allEdges
      .filter(e => e.target === nodeId)
      .map(e => e.source)
  }

  private _getOutgoing(nodeId: string): string[] {
    return this._allEdges
      .filter(e => e.source === nodeId)
      .map(e => e.target)
  }
}
