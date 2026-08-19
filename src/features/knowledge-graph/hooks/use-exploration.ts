'use client';

import { useSyncExternalStore, useCallback, useEffect, useMemo, useState } from 'react';
import { ExplorationEngine, type FilterCriteria } from '../lib/exploration-engine';
import type { GraphNode, GraphEdge } from '@/core';

export function useExploration(nodes: GraphNode[], edges: GraphEdge[]) {
  const [engine] = useState(() => new ExplorationEngine())

  useEffect(() => {
    engine.initialize(nodes, edges)
  }, [nodes, edges, engine])

  const subscribe = useCallback(
    (fn: () => void) => engine.subscribe(fn),
    [engine],
  )

  const getSnapshot = useCallback(
    () => engine.state,
    [engine],
  )

  const state = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)

  const selectNode = useCallback((id: string) => engine.selectNode(id), [engine])
  const deselectNode = useCallback(() => engine.deselectNode(), [engine])
  const goBack = useCallback(() => engine.goBack(), [engine])
  const expandNode = useCallback((id: string) => engine.expandNode(id), [engine])
  const collapseNode = useCallback((id: string) => engine.collapseNode(id), [engine])
  const expandAll = useCallback((level: 0 | 1 | 2 | 3) => engine.expandAll(level), [engine])
  const resetExpansion = useCallback(() => engine.resetExpansion(), [engine])
  const focusCluster = useCallback((id: string | null) => engine.focusCluster(id), [engine])
  const selectEdge = useCallback((s: string, t: string) => engine.selectEdge(s, t), [engine])
  const setFilter = useCallback((key: keyof FilterCriteria, values: string[]) => {
    engine.setFilter(key, values)
  }, [engine])
  const resetFilters = useCallback(() => engine.resetFilters(), [engine])
  const getEdgeData = useCallback(
    (s: string, t: string) => engine.getEdgeData(s, t),
    [engine],
  )
  const getNodeActions = useCallback(
    (id: string) => engine.getNodeActions(id),
    [engine],
  )

  // Cache derived data reactively — only recompute when engine state changes
  const visibleNodeIds = engine.visibleNodeIds
  const filteredNodes = engine.filteredNodes
  const filteredEdges = engine.filteredEdges
  const nodeContext = engine.nodeContext

  return useMemo(() => ({
    state,
    visibleNodeIds,
    filteredNodes,
    filteredEdges,
    nodeContext,
    getEdgeData,
    getNodeActions,
    selectNode,
    deselectNode,
    goBack,
    expandNode,
    collapseNode,
    expandAll,
    resetExpansion,
    focusCluster,
    selectEdge,
    setFilter,
    resetFilters,
  }), [
    state, visibleNodeIds, filteredNodes, filteredEdges, nodeContext,
    getEdgeData, getNodeActions,
    selectNode, deselectNode, goBack,
    expandNode, collapseNode, expandAll, resetExpansion,
    focusCluster, selectEdge, setFilter, resetFilters,
  ])
}
