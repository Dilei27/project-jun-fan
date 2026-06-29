/**
 * BFS path finder — encontra o caminho mais curto entre dois nós.
 * Usado para destacar paths no Knowledge Explorer.
 */

import type { GraphEdge } from '@/core';

export interface PathResult {
  nodeIds: string[];
  edgeKeys: Set<string>; // "source->target" canonical
}

export function findShortestPath(
  sourceId: string,
  targetId: string,
  edges: GraphEdge[],
): PathResult | null {
  if (sourceId === targetId) {
    return { nodeIds: [sourceId], edgeKeys: new Set() };
  }

  // Build adjacency
  const adjacency = new Map<string, string[]>();
  for (const edge of edges) {
    if (!adjacency.has(edge.source)) adjacency.set(edge.source, []);
    if (!adjacency.has(edge.target)) adjacency.set(edge.target, []);
    adjacency.get(edge.source)!.push(edge.target);
    adjacency.get(edge.target)!.push(edge.source);
  }

  // BFS
  const visited = new Set<string>([sourceId]);
  const parents = new Map<string, string>();
  const queue: string[] = [sourceId];
  let head = 0;

  while (head < queue.length) {
    const current = queue[head++];
    if (current === targetId) break;
    const neighbors = adjacency.get(current) || [];
    for (const n of neighbors) {
      if (visited.has(n)) continue;
      visited.add(n);
      parents.set(n, current);
      queue.push(n);
    }
  }

  if (!visited.has(targetId)) return null;

  // Reconstruct path
  const path: string[] = [];
  let cur: string | undefined = targetId;
  while (cur) {
    path.unshift(cur);
    cur = parents.get(cur);
  }

  // Build edge set
  const edgeKeys = new Set<string>();
  for (let i = 0; i < path.length - 1; i++) {
    const a = path[i];
    const b = path[i + 1];
    edgeKeys.add(`${a}->${b}`);
    edgeKeys.add(`${b}->${a}`);
  }

  return { nodeIds: path, edgeKeys };
}

/**
 * Find all 1-hop neighbors of a node.
 */
export function findOneHop(
  nodeId: string,
  edges: GraphEdge[],
): { neighbors: Set<string>; edgeKeys: Set<string> } {
  const neighbors = new Set<string>();
  const edgeKeys = new Set<string>();
  for (const edge of edges) {
    if (edge.source === nodeId) {
      neighbors.add(edge.target);
      edgeKeys.add(`${edge.source}->${edge.target}`);
    } else if (edge.target === nodeId) {
      neighbors.add(edge.source);
      edgeKeys.add(`${edge.source}->${edge.target}`);
    }
  }
  return { neighbors, edgeKeys };
}
