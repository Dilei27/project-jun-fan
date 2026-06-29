'use client';

import { motion } from 'framer-motion';
import { motion as m } from '@/design-system/motion';
import { PROFILE } from '../data/profile';

export function EngineeringDNA() {
  return (
    <div className="rounded-xl p-5" style={{
      background: 'rgba(17, 24, 33, 0.6)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(244, 247, 250, 0.04)',
    }}>
      <h2 className="text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-4">
        Engineering DNA
      </h2>

      <div className="grid grid-cols-3 gap-2">
        {PROFILE.pillars.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.05, ease: m.easing.out }}
            className="rounded-lg p-3 transition-all hover:bg-white/[0.02]"
            style={{
              background: `${p.color}06`,
              border: `1px solid ${p.color}12`,
            }}
          >
            {/* Icon */}
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-[12px] font-bold mb-2"
              style={{
                background: `${p.color}15`,
                color: p.color,
              }}
            >
              {p.icon}
            </div>

            {/* Title */}
            <h3 className="text-[10px] font-semibold text-text-primary mb-1">{p.title}</h3>

            {/* Description */}
            <p className="text-[8px] text-text-muted/60 leading-relaxed">{p.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
