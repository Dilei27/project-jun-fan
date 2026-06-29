'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { getNodeColor, getNodeIdentity } from '../lib/node-identity';
import type { GraphNode } from '@/core';
import { entityLabels } from '@/core/types';

interface HoverPreviewProps {
  node: GraphNode | null;
  screenPosition: { x: number; y: number } | null;
}

export function HoverPreview({ node, screenPosition }: HoverPreviewProps) {
  return (
    <AnimatePresence>
      {node && screenPosition && (
        <motion.div
          key={node.id}
          initial={{ opacity: 0, y: 4, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 2, scale: 0.98 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="jf-glass-modal fixed z-40 pointer-events-none rounded-lg px-3 py-2 max-w-[240px]"
          style={{
            left: screenPosition.x + 16,
            top: screenPosition.y + 16,
            boxShadow:
              'inset 0 1px 0 0 rgba(244, 247, 250, 0.06), 0 12px 32px -8px rgba(0, 0, 0, 0.5)',
          }}
        >
          <div className="flex items-center gap-1.5 mb-1">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: getNodeColor(node.type) }}
            />
            <span className="text-[9px] font-medium uppercase tracking-[0.14em] text-text-muted">
              {entityLabels[node.type] || getNodeIdentity(node.type).label}
            </span>
          </div>
          <div className="text-xs font-medium text-text-primary leading-tight">
            {node.label}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
