'use client';

import { motion } from 'framer-motion';
import { type ReactNode } from 'react';
import { motion as m } from '@/design-system/motion';

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function SectionReveal({ children, className = '', delay = 0 }: SectionRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: m.duration.slow, ease: m.easing.out, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
