'use client';

import { useMemo } from 'react';
import { getClusterForType, CLUSTERS, getClusterBounds } from '../lib/cluster';
import type { GraphNode } from '@/core';

export function ClusterContours({
  nodes,
  positions,
  selectedType,
}: {
  nodes: GraphNode[];
  positions: Map<string, { x: number; y: number }>;
  selectedType?: string | null;
}) {
  const nodePositions = useMemo(
    () =>
      nodes
        .map(n => {
          const p = positions.get(n.id);
          if (!p) return null;
          return { id: n.id, type: n.type, x: p.x, y: p.y };
        })
        .filter(Boolean) as Array<{ id: string; type: string; x: number; y: number }>,
    [nodes, positions],
  );

  const bounds = useMemo(() => getClusterBounds(nodePositions), [nodePositions]);

  if (bounds.size === 0) return null;

  return (
    <g className="cluster-contours" pointerEvents="none">
      {Array.from(bounds.entries()).map(([clusterId, b]) => {
        const cluster = CLUSTERS.find(c => c.id === clusterId);
        if (!cluster) return null;
        const isSelected = selectedType ? cluster.types.includes(selectedType) : false;
        return (
          <g key={clusterId} opacity={isSelected ? 1 : selectedType ? 0.15 : 0.6}>
            <ellipse
              cx={b.cx}
              cy={b.cy}
              rx={b.rx}
              ry={b.ry}
              fill="none"
              stroke={cluster.color}
              strokeWidth={isSelected ? 1.5 : 0.5}
              strokeDasharray={isSelected ? 'none' : '4 4'}
              opacity={isSelected ? 0.5 : 0.25}
            />
            <ellipse
              cx={b.cx}
              cy={b.cy}
              rx={b.rx - 8}
              ry={b.ry - 8}
              fill={cluster.bgColor}
              stroke="none"
            />
            <text
              x={b.cx}
              y={b.cy - b.ry - 8}
              textAnchor="middle"
              fill={cluster.color}
              fontSize={9}
              fontWeight={600}
              opacity={isSelected ? 0.9 : 0.45}
              className="select-none"
              style={{ letterSpacing: '0.12em', textTransform: 'uppercase' }}
            >
              {cluster.label}
            </text>
          </g>
        );
      })}
    </g>
  );
}
