'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { motion as m } from '@/design-system/motion';
import { PROFILE } from '../data/profile';

export function EngineeringPhilosophy() {
  return (
    <div className="rounded-xl p-5" style={{
      background: 'rgba(17, 24, 33, 0.6)',
      backdropFilter: 'blur(14px)',
      border: '1px solid rgba(244, 247, 250, 0.04)',
    }}>
      <div className="flex items-center gap-1.5 mb-4">
        <Quote size={12} className="text-text-muted" />
        <h2 className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">Filosofia de Engenharia</h2>
      </div>

      <div className="space-y-3">
        {PROFILE.philosophy.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08, ease: m.easing.out }}
            className="relative pl-4 py-2 rounded-lg"
            style={{
              borderLeft: `2px solid ${p.color}40`,
              background: `${p.color}04`,
            }}
          >
            <div
              className="text-sm font-semibold mb-0.5"
              style={{ color: p.color }}
            >
              {p.statement}
            </div>
            <p className="text-[9px] text-text-muted/60 leading-relaxed">
              {p.explanation}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
