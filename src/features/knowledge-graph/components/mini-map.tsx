'use client';

import { useMemo } from 'react';
import { getNodeColor } from '../lib/node-identity';
import { CLUSTERS } from '../lib/cluster';
import type { GraphNode } from '@/core';

interface MiniMapProps {
  nodes: GraphNode[];
  positions: Map<string, { x: number; y: number }>;
  camera: { x: number; y: number; zoom: number };
  canvasWidth: number;
  canvasHeight: number;
  onClick?: (viewportX: number, viewportY: number) => void;
}

const MAP_WIDTH = 120;
const MAP_HEIGHT = 80;

export function MiniMap({ nodes, positions, camera, canvasWidth, canvasHeight, onClick }: MiniMapProps) {
  const scale = useMemo(() => {
    const sx = MAP_WIDTH / canvasWidth;
    const sy = MAP_HEIGHT / canvasHeight;
    return Math.min(sx, sy) * 0.85;
  }, [canvasWidth, canvasHeight]);

  const offsetX = (MAP_WIDTH - canvasWidth * scale) / 2;
  const offsetY = (MAP_HEIGHT - canvasHeight * scale) / 2;

  const viewportRect = {
    x: -camera.x / camera.zoom * scale + offsetX,
    y: -camera.y / camera.zoom * scale + offsetY,
    w: (MAP_WIDTH - offsetX * 2) / camera.zoom,
    h: (MAP_HEIGHT - offsetY * 2) / camera.zoom,
  };

  return (
    <svg
      width={MAP_WIDTH}
      height={MAP_HEIGHT}
      className="rounded-md cursor-pointer"
      style={{
        background: 'rgba(7, 10, 18, 0.8)',
        border: '1px solid rgba(244, 247, 250, 0.06)',
      }}
      onClick={e => {
        if (!onClick) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const px = e.clientX - rect.left;
        const py = e.clientY - rect.top;
        const vx = (px - offsetX) / scale;
        const vy = (py - offsetY) / scale;
        onClick(vx, vy);
      }}
    >
      {/* Cluster zones */}
      {CLUSTERS.map(cluster => {
        const memberNodes = nodes.filter(n => cluster.types.includes(n.type));
        if (memberNodes.length === 0) return null;
        const xs = memberNodes.map(n => positions.get(n.id)?.x ?? 0);
        const ys = memberNodes.map(n => positions.get(n.id)?.y ?? 0);
        const cx = (Math.min(...xs) + Math.max(...xs)) / 2;
        const cy = (Math.min(...ys) + Math.max(...ys)) / 2;
        return (
          <circle
            key={cluster.id}
            cx={cx * scale + offsetX}
            cy={cy * scale + offsetY}
            r={3}
            fill={cluster.color}
            opacity={0.15}
          />
        );
      })}

      {/* Node dots */}
      {nodes.map(node => {
        const pos = positions.get(node.id);
        if (!pos) return null;
        return (
          <circle
            key={node.id}
            cx={pos.x * scale + offsetX}
            cy={pos.y * scale + offsetY}
            r={1}
            fill={getNodeColor(node.type)}
            opacity={0.5}
          />
        );
      })}

      {/* Viewport rect */}
      <rect
        x={viewportRect.x}
        y={viewportRect.y}
        width={viewportRect.w}
        height={viewportRect.h}
        fill="none"
        stroke="rgba(244, 247, 250, 0.4)"
        strokeWidth={0.8}
        rx={1}
      />
    </svg>
  );
}
