'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { getNodeColor, getNodeIdentity } from '../lib/node-identity';
import { getClusterForType } from '../lib/cluster';
import type { GraphNode } from '@/core';
import { entityLabels } from '@/core/types';

interface HoverPreviewProps {
  node: GraphNode | null;
  screenPosition: { x: number; y: number } | null;
  connectionCount?: number;
  /** Health indicator (optional — not all nodes have it) */
  health?: string;
  /** Risk indicator */
  risk?: string;
  /** Maturity indicator */
  maturity?: string;
}

const healthColors: Record<string, string> = {
  healthy: '#22C55E',
  degraded: '#EAB308',
  critical: '#EF4444',
  unknown: '#687385',
};

const riskColors: Record<string, string> = {
  low: '#22C55E',
  medium: '#EAB308',
  high: '#FB923C',
};

const maturityColors: Record<string, string> = {
  concept: '#687385',
  prototype: '#FB923C',
  beta: '#EAB308',
  stable: '#22C55E',
  mature: '#4F8CFF',
};

export function HoverPreview({ node, screenPosition, connectionCount, health, risk, maturity }: HoverPreviewProps) {
  return (
    <AnimatePresence>
      {node && screenPosition && (
        <motion.div
          key={node.id}
          initial={{ opacity: 0, y: 6, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 3, scale: 0.97 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="fixed z-40 pointer-events-none rounded-lg px-3 py-2 max-w-[260px]"
          style={{
            left: screenPosition.x + 16,
            top: screenPosition.y + 16,
            background: 'rgba(10, 14, 22, 0.94)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: `1px solid ${getNodeColor(node.type)}25`,
            boxShadow: [
              `0 0 0 1px ${getNodeColor(node.type)}10`,
              `0 0 20px -4px ${getNodeColor(node.type)}15`,
              '0 12px 32px -8px rgba(0, 0, 0, 0.6)',
            ].join(', '),
          }}
        >
          {/* Header: type badge + cluster */}
          <div className="flex items-center gap-1.5 mb-1">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: getNodeColor(node.type) }}
            />
            <span className="text-[9px] font-medium uppercase tracking-[0.14em] text-text-muted">
              {entityLabels[node.type] || getNodeIdentity(node.type).label}
            </span>
            <span className="text-text-muted/20">·</span>
            <span
              className="text-[8px] uppercase tracking-wider"
              style={{ color: getClusterForType(node.type).color }}
            >
              {getClusterForType(node.type).label}
            </span>
          </div>

          {/* Title */}
          <div className="text-xs font-medium text-text-primary leading-tight mb-1.5">
            {node.label}
          </div>

          {/* Description */}
          {node.description && (
            <div className="text-[9px] text-text-muted/70 leading-relaxed mb-2 line-clamp-2">
              {node.description}
            </div>
          )}

          {/* Meta badges: health, risk, maturity */}
          {(health || risk || maturity) && (
            <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
              {health && healthColors[health] && (
                <span
                  className="inline-flex items-center gap-0.5 px-1 py-0.5 rounded text-[6px] font-medium uppercase tracking-wider"
                  style={{ background: `${healthColors[health]}12`, color: healthColors[health] }}
                >
                  <span className="w-1 h-1 rounded-full" style={{ background: healthColors[health] }} />
                  {health}
                </span>
              )}
              {risk && riskColors[risk] && (
                <span
                  className="inline-flex items-center gap-0.5 px-1 py-0.5 rounded text-[6px] font-medium uppercase tracking-wider"
                  style={{ background: `${riskColors[risk]}12`, color: riskColors[risk] }}
                >
                  {risk}
                </span>
              )}
              {maturity && maturityColors[maturity] && (
                <span
                  className="inline-flex items-center gap-0.5 px-1 py-0.5 rounded text-[6px] font-medium uppercase tracking-wider"
                  style={{ background: `${maturityColors[maturity]}12`, color: maturityColors[maturity] }}
                >
                  {maturity}
                </span>
              )}
            </div>
          )}

          {/* Meta row */}
          <div className="flex items-center gap-2 text-[8px] text-text-muted/50">
            {connectionCount !== undefined && (
              <span>{connectionCount} conexões</span>
            )}
            <span className="text-text-muted/20">·</span>
            <span className="text-[8px] text-accent-qa/60 font-medium">
              Click to inspect
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
