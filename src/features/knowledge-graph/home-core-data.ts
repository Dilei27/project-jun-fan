import { getFullGraph, type GraphData, type GraphNode } from '@/core';

const HOME_TYPES = ['mission', 'architecture', 'product', 'project', 'agent', 'decision', 'document', 'metric'];

export function getHomeCoreGraph(): GraphData {
  const graph = getFullGraph();
  const degree = new Map<string, number>();
  for (const edge of graph.edges) {
    degree.set(edge.source, (degree.get(edge.source) ?? 0) + 1);
    degree.set(edge.target, (degree.get(edge.target) ?? 0) + 1);
  }

  const selected: GraphNode[] = [];
  for (const type of HOME_TYPES) {
    const nodes = graph.nodes
      .filter(item => item.type === type)
      .sort((a, b) => (degree.get(b.id) ?? 0) - (degree.get(a.id) ?? 0))[0];
    if (type === 'product' || type === 'project') {
      selected.push(...graph.nodes.filter(item => item.type === type));
    } else if (nodes) selected.push(nodes);
  }

  const selectedIds = new Set(selected.map(node => node.id));
  return {
    nodes: selected,
    edges: graph.edges.filter(edge => selectedIds.has(edge.source) && selectedIds.has(edge.target)),
  };
}
