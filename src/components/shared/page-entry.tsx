'use client';

import { motion } from 'framer-motion';
import { type ReactNode } from 'react';
import { motion as m } from '@/design-system/motion';

interface PageEntryProps {
  children: ReactNode;
  className?: string;
}

export function PageEntry({ children, className = '' }: PageEntryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: m.duration.normal, ease: m.easing.out }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
