'use client';

import { motion } from 'framer-motion';
import { motion as m } from '@/design-system/motion';

interface LoadingSkeletonProps {
  variant?: 'page' | 'cards' | 'detail';
}

const cardShadow =
  'inset 0 1px 0 0 rgba(244, 247, 250, 0.03), 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 4px 12px -4px rgba(0, 0, 0, 0.3)';

function SkeletonBlock({ className = '', delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay, ease: m.easing.out }}
      className={`jf-shimmer rounded-md ${className}`}
      aria-hidden
    />
  );
}

function SkeletonCard({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: m.easing.out }}
      className="p-5 bg-surface-default/40 border border-border-subtle/40 rounded-lg"
      style={{ boxShadow: cardShadow }}
    >
      <div className="flex items-start justify-between mb-3">
        <SkeletonBlock className="h-5 w-32" delay={delay + 0.05} />
        <SkeletonBlock className="h-4 w-12 rounded-full" delay={delay + 0.1} />
      </div>
      <SkeletonBlock className="h-3 w-full mb-1.5" delay={delay + 0.15} />
      <SkeletonBlock className="h-3 w-4/5 mb-3" delay={delay + 0.2} />
      <div className="flex gap-1.5">
        <SkeletonBlock className="h-4 w-10 rounded" delay={delay + 0.25} />
        <SkeletonBlock className="h-4 w-14 rounded" delay={delay + 0.3} />
        <SkeletonBlock className="h-4 w-8 rounded" delay={delay + 0.35} />
      </div>
    </motion.div>
  );
}

export function LoadingSkeleton({ variant = 'page' }: LoadingSkeletonProps) {
  if (variant === 'cards') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SkeletonCard delay={0} />
        <SkeletonCard delay={0.1} />
        <SkeletonCard delay={0.2} />
      </div>
    );
  }
  if (variant === 'detail') {
    return (
      <div className="max-w-3xl space-y-6">
        <div>
          <SkeletonBlock className="h-3 w-24 mb-2" />
          <SkeletonBlock className="h-8 w-3/4 mb-3" />
          <SkeletonBlock className="h-4 w-full mb-1" />
          <SkeletonBlock className="h-4 w-5/6" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SkeletonCard delay={0.1} />
          <SkeletonCard delay={0.2} />
        </div>
      </div>
    );
  }
  return (
    <div
      className="max-w-[1440px] mx-auto px-6 py-10 space-y-8"
      style={{ animation: 'fade-in var(--motion-normal) var(--ease-out) both' }}
    >
      <div className="space-y-4">
        <SkeletonBlock className="h-4 w-48" delay={0} />
        <SkeletonBlock className="h-12 w-96" delay={0.08} />
        <SkeletonBlock className="h-5 w-72" delay={0.16} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SkeletonCard delay={0.24} />
        <SkeletonCard delay={0.32} />
        <SkeletonCard delay={0.4} />
      </div>
    </div>
  );
}
