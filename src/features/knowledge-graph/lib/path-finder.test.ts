import { describe, expect, it } from 'vitest';
import { findOneHop, findShortestPath } from './path-finder';
import type { GraphEdge } from '@/core';

const edges: GraphEdge[] = [
  { source: 'core', target: 'project', type: 'contains', label: 'contém', weight: 1 },
  { source: 'project', target: 'technology', type: 'uses', label: 'usa', weight: 1 },
  { source: 'core', target: 'decision', type: 'references', label: 'referencia', weight: 1 },
];

describe('knowledge paths', () => {
  it('returns the shortest chain and its active edge keys', () => {
    const path = findShortestPath('core', 'technology', edges);
    expect(path?.nodeIds).toEqual(['core', 'project', 'technology']);
    expect(path?.edgeKeys).toContain('core->project');
    expect(path?.edgeKeys).toContain('project->technology');
  });

  it('returns null for disconnected entities', () => {
    expect(findShortestPath('core', 'missing', edges)).toBeNull();
  });

  it('lists direct neighbors without fabricating relationships', () => {
    const result = findOneHop('project', edges);
    expect([...result.neighbors].sort()).toEqual(['core', 'technology']);
  });
});
