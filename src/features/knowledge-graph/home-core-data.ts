import { getFullGraph, type GraphData } from '@/core';

const PRIMARY_IDS = [
  'product-qa-command-center',
  'product-desktop-discovery-engine',
  'product-vigilante-ai',
  'project-automacao-erp-uau',
  'project-whatsapp-ai',
] as const;

export function getHomeCoreGraph(): GraphData {
  const graph = getFullGraph();
  const selectedIds = new Set<string>(PRIMARY_IDS);
  // Keep only a few real direct relations so the Home reads as a machine, not the full graph.
  for (const edge of graph.edges) {
    if (selectedIds.has(edge.source) && selectedIds.size < 8) selectedIds.add(edge.target);
    if (selectedIds.has(edge.target) && selectedIds.size < 8) selectedIds.add(edge.source);
  }
  return {
    nodes: graph.nodes.filter(node => selectedIds.has(node.id)),
    edges: graph.edges.filter(edge => selectedIds.has(edge.source) && selectedIds.has(edge.target)),
  };
}
