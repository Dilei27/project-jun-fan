'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { motion as m } from '@/design-system/motion';
import type { ReplayStage } from '../lib/replay-engine';

const clusterColors: Record<string, string> = {
  core: '#4F8CFF',
  knowledge: '#EAB308',
  products: '#22C55E',
  projects: '#C084FC',
  decisions: '#FB923C',
  skills: '#22D3EE',
};

interface ReplayTimelineProps {
  stages: ReplayStage[]
  currentIndex: number
  isActive: boolean
  onJump: (index: number) => void
}

export function ReplayTimeline({ stages, currentIndex, isActive, onJump }: ReplayTimelineProps) {
  return (
    <div className="flex items-center gap-0">
      {stages.map((stage, i) => {
        const isPast = i < currentIndex
        const isCurrent = i === currentIndex
        const color = clusterColors[stage.clusterId] ?? '#687385'
        return (
          <div key={stage.id} className="flex items-center">
            {/* Dot */}
            <motion.button
              whileTap={m.tap.soft}
              onClick={() => onJump(i)}
              className="relative flex items-center justify-center shrink-0 transition-all"
              style={{
                width: isCurrent ? 28 : 16,
                height: isCurrent ? 28 : 16,
              }}
              disabled={!isActive}
              aria-label={`Ir para ${stage.label}`}
            >
              <motion.span
                className="absolute inset-0 rounded-full"
                animate={isCurrent ? {
                  scale: [1, 1.15, 1],
                  opacity: [0.2, 0.4, 0.2],
                } : {}}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  background: color,
                  opacity: isCurrent ? 0.2 : 0,
                }}
              />
              <span
                className="relative rounded-full transition-all"
                style={{
                  width: isCurrent ? 10 : isPast ? 8 : 6,
                  height: isCurrent ? 10 : isPast ? 8 : 6,
                  background: isPast || isCurrent ? color : 'rgba(244,247,250,0.12)',
                  boxShadow: isCurrent ? `0 0 0 2px ${color}40` : 'none',
                }}
              >
                {isPast && (
                  <Check size={6} className="absolute inset-0 m-auto text-white" />
                )}
              </span>
              {/* Label */}
              <span
                className={`absolute top-full mt-1.5 text-[7px] font-medium whitespace-nowrap transition-opacity ${
                  isCurrent ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
                }`}
                style={{ color: isCurrent ? color : 'rgba(244,247,250,0.4)' }}
              >
                {stage.label}
              </span>
            </motion.button>

            {/* Connector line */}
            {i < stages.length - 1 && (
              <div
                className="h-px flex-1 min-w-[12px] mx-1"
                style={{
                  background: i < currentIndex
                    ? color
                    : 'rgba(244,247,250,0.06)',
                }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
