'use client';

import { motion } from 'framer-motion';
import { motion as m } from '@/design-system/motion';
import { type ReactNode } from 'react';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: m.easing.out }}
      className="flex flex-col items-center justify-center text-center py-12 px-6"
    >
      {icon && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.05, ease: m.easing.out }}
          className="mb-4 w-12 h-12 rounded-2xl bg-surface-elevated/60 border border-border-subtle/60 flex items-center justify-center text-text-muted"
          style={{ boxShadow: 'inset 0 1px 0 0 rgba(244, 247, 250, 0.04)' }}
        >
          {icon}
        </motion.div>
      )}
      <motion.h3
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: m.easing.out }}
        className="text-sm font-semibold text-text-primary tracking-[-0.01em] mb-1.5"
      >
        {title}
      </motion.h3>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15, ease: m.easing.out }}
          className="text-xs text-text-muted max-w-sm leading-relaxed mb-4"
        >
          {description}
        </motion.p>
      )}
      {action && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: m.easing.out }}
        >
          {action}
        </motion.div>
      )}
    </motion.div>
  );
}
