'use client';

import { motion } from 'framer-motion';
import { motion as m } from '@/design-system/motion';
import type { TimelineEntry } from '@/types';

export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <div className="relative">
      <motion.div
        initial={{ scaleY: 0, originY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: m.duration.slow, ease: m.easing.out }}
        className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-border-subtle/60"
      />
      <div className="space-y-8">
        {entries.map((entry, i) => (
          <motion.div
            key={entry.year}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: m.duration.normal,
              ease: m.easing.out,
              delay: i * m.stagger.tight,
            }}
            className="relative pl-8"
          >
            <div
              className={`absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-accent-qa bg-bg-base jf-pulse-dot ${
                i === 0 ? 'shadow-[0_0_0_3px_rgba(79,140,255,0.15)]' : ''
              }`}
            />
            <div className="flex items-baseline gap-3 mb-1">
              <span className="text-xs font-mono text-accent-qa font-semibold">{entry.year}</span>
              <h3 className="text-sm font-semibold text-text-primary">{entry.milestone}</h3>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">{entry.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
