'use client';

import { motion } from 'framer-motion';
import { motion as m } from '@/design-system/motion';

interface SectionDividerProps {
  className?: string;
  accent?: boolean;
}

/**
 * Section divider — barely visible hairline between major sections.
 * Adds rhythm to long pages without competing with content.
 */
export function SectionDivider({ className = '', accent = false }: SectionDividerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: m.duration.slow, ease: m.easing.out }}
      className={className}
      style={{ transformOrigin: 'center' }}
    >
      <div className={accent ? 'jf-divider-accent' : 'jf-divider'} />
    </motion.div>
  );
}
