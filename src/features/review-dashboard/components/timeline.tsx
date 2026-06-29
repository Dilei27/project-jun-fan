'use client';

import { motion } from 'framer-motion';
import { Clock, TrendingUp, TrendingDown } from 'lucide-react';
import { motion as m } from '@/design-system/motion';
import type { ReviewSnapshot } from '@/core/review';

interface TimelineProps {
  snapshots: ReviewSnapshot[]
}

export function Timeline({ snapshots }: TimelineProps) {
  const sorted = [...snapshots].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
  )

  return (
    <div className="rounded-xl p-4" style={{
      background: 'rgba(17, 24, 33, 0.6)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(244, 247, 250, 0.04)',
    }}>
      <div className="flex items-center gap-1.5 mb-3">
        <Clock size={12} className="text-text-muted" />
        <h2 className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">Histórico</h2>
      </div>

      <div className="space-y-2">
        {sorted.map((snap, i) => {
          const prevScore = i > 0 ? sorted[i - 1].score.overall : snap.score.overall
          const diff = snap.score.overall - prevScore
          const isUp = diff > 0
          const isDown = diff < 0

          return (
            <motion.div
              key={snap.id}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.08, ease: m.easing.out }}
              className="relative flex items-start gap-3 pl-4"
            >
              {/* Timeline line */}
              {i < sorted.length - 1 && (
                <div
                  className="absolute left-[5px] top-3 bottom-0 w-px"
                  style={{ background: 'rgba(244,247,250,0.06)' }}
                />
              )}

              {/* Dot */}
              <div
                className="w-2.5 h-2.5 rounded-full border-2 shrink-0 mt-0.5"
                style={{
                  borderColor: isUp ? '#22C55E' : isDown ? '#EF4444' : '#687385',
                  background: isUp ? '#22C55E15' : isDown ? '#EF444415' : 'transparent',
                }}
              />

              {/* Content */}
              <div className="flex-1 min-w-0 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-text-primary font-medium">
                    Score: {snap.score.overall}
                  </span>
                  {isUp && (
                    <span className="flex items-center gap-0.5 text-[7px] text-success">
                      <TrendingUp size={7} /> +{diff}
                    </span>
                  )}
                  {isDown && (
                    <span className="flex items-center gap-0.5 text-[7px] text-danger">
                      <TrendingDown size={7} /> {diff}
                    </span>
                  )}
                  <span className="text-[7px] text-text-muted/30 ml-auto">
                    {new Date(snap.timestamp).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })}
                  </span>
                </div>
                <p className="text-[8px] text-text-muted/50 mt-0.5">{snap.summary}</p>
                <div className="flex gap-1.5 mt-1">
                  {(['architecture', 'qa', 'documentation', 'knowledge', 'maintainability'] as const).map(cat => (
                    <span key={cat} className="text-[6px] text-text-muted/30 uppercase">
                      {cat.slice(0, 3)}: {snap.score[cat]}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
