'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { motion as m } from '@/design-system/motion';
import { PROFILE } from '../data/profile';
import { Counter } from './counter';

export function ImpactMetrics() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <div
      ref={ref}
      className="rounded-xl p-5"
      style={{
        background: 'rgba(17, 24, 33, 0.6)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(244, 247, 250, 0.04)',
      }}
    >
      <div className="flex items-center gap-1.5 mb-4">
        <TrendingUp size={12} className="text-text-muted" />
        <h2 className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">Impacto</h2>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {PROFILE.impactMetrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.35, delay: i * 0.06, ease: m.easing.out }}
            className="flex flex-col items-center px-2 py-3 rounded-lg text-center"
            style={{
              background: `${metric.color}06`,
              border: `1px solid ${metric.color}10`,
            }}
          >
            <span className="text-lg font-bold tabular-nums" style={{ color: metric.color }}>
              {inView ? <Counter value={metric.value} suffix={metric.suffix} /> : `${metric.value}${metric.suffix}`}
            </span>
            <span className="text-[7px] uppercase tracking-wider text-text-muted/60 mt-1">{metric.label}</span>
            <span className="text-[7px] text-text-muted/30 mt-0.5">{metric.description}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
