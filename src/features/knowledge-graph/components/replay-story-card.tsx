'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import type { ReplayStage, ReplayEvent } from '../lib/replay-engine';

const clusterColors: Record<string, string> = {
  core: '#4F8CFF',
  knowledge: '#EAB308',
  products: '#22C55E',
  projects: '#C084FC',
  decisions: '#FB923C',
  skills: '#22D3EE',
};

interface ReplayStoryCardProps {
  stage: ReplayStage | null
  event: ReplayEvent | null
  visible: boolean
}

export function ReplayStoryCard({ stage, event, visible }: ReplayStoryCardProps) {
  if (!stage) return null

  const color = clusterColors[stage.clusterId] ?? '#687385'

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={stage.id}
          initial={{ opacity: 0, y: 12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.96 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-32 left-1/2 -translate-x-1/2 z-30 rounded-xl px-4 py-3 max-w-sm text-center"
          style={{
            background: 'rgba(10, 14, 22, 0.92)',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${color}20`,
            boxShadow: `0 0 0 1px ${color}08, 0 24px 48px -12px rgba(0,0,0,0.6)`,
          }}
        >
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <Sparkles size={10} style={{ color }} />
            <span className="text-[8px] font-medium uppercase tracking-[0.12em]" style={{ color }}>
              {stage.label}
            </span>
          </div>
          <p className="text-[10px] text-text-muted/80 leading-relaxed">
            {stage.description}
          </p>
          {event && (
            <motion.p
              key={event.message}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[9px] text-text-muted/50 mt-1.5 italic"
            >
              {event.message}
            </motion.p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
