'use client';

import { motion } from 'framer-motion';
import type { GraphEdge } from '@/core';

interface ConnectionPathProps {
  edge: GraphEdge;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  intensity: 'dim' | 'normal' | 'highlight' | 'path';
  sourceColor: string;
  targetColor: string;
  delay?: number;
  /** Stable unique key for gradient (edge.source+target) */
  gradientKey: string;
}

const INTENSITY_CONFIG = {
  dim: { strokeWidth: 0.5, opacity: 0.08, dash: undefined as string | undefined, duration: 800 },
  normal: { strokeWidth: 0.75, opacity: 0.25, dash: undefined, duration: 800 },
  highlight: { strokeWidth: 1.5, opacity: 0.75, dash: undefined, duration: 400 },
  path: { strokeWidth: 2, opacity: 0.9, dash: '6 4', duration: 400 },
} as const;

/**
 * Connection between two nodes.
 * - dim: almost invisible (default for non-related edges when something is selected)
 * - normal: subtle
 * - highlight: prominent (1-hop from selected)
 * - path: dashed, motion (multi-hop path between two selected)
 */
export function ConnectionPath({
  x1, y1, x2, y2,
  intensity,
  sourceColor,
  targetColor,
  delay = 0,
  gradientKey,
}: ConnectionPathProps) {
  const cfg = INTENSITY_CONFIG[intensity];

  // Stable gradient ID — never changes between renders
  const gradientId = `eg-${gradientKey}`;

  // Midpoint with perpendicular offset for organic curve
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const offset = Math.min(dist * 0.04, 12);
  const perpX = dist > 0.5 ? (-dy / dist) * offset : 0;
  const perpY = dist > 0.5 ? (dx / dist) * offset : 0;
  const cx = midX + perpX;
  const cy = midY + perpY;

  return (
    <g>
      <defs>
        <linearGradient
          id={gradientId}
          gradientUnits="userSpaceOnUse"
          x1={x1} y1={y1}
          x2={x2} y2={y2}
        >
          <stop offset="0%" stopColor={sourceColor} stopOpacity={cfg.opacity} />
          <stop offset="100%" stopColor={targetColor} stopOpacity={cfg.opacity} />
        </linearGradient>
      </defs>
      <motion.path
        d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
        stroke={intensity === 'path' ? '#4F8CFF' : `url(#${gradientId})`}
        strokeWidth={cfg.strokeWidth}
        strokeDasharray={cfg.dash}
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: 1,
          opacity: cfg.opacity,
        }}
        transition={{
          pathLength: { duration: cfg.duration / 1000, ease: [0.16, 1, 0.3, 1], delay },
          opacity: { duration: cfg.duration / 1000, ease: 'easeOut', delay },
        }}
      />
    </g>
  );
}

/**
 * Determine connection intensity based on selected node context.
 */
export function connectionIntensity(
  edge: GraphEdge,
  selectedNodeId: string | null,
  oneHopIds: Set<string>,
  pathEdgeIds: Set<string>,
): 'dim' | 'normal' | 'highlight' | 'path' {
  const keyFwd = `${edge.source}->${edge.target}`;
  const keyRev = `${edge.target}->${edge.source}`;
  if (pathEdgeIds.has(keyFwd) || pathEdgeIds.has(keyRev)) {
    return 'path';
  }
  if (!selectedNodeId) return 'normal';
  const isRelated =
    edge.source === selectedNodeId ||
    edge.target === selectedNodeId ||
    (oneHopIds.has(edge.source) && oneHopIds.has(edge.target));
  if (isRelated) return 'highlight';
  return 'dim';
}
