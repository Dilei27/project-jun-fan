'use client';

import { motion } from 'framer-motion';
import { motion as m } from '@/design-system/motion';

export type StatusKind = 'online' | 'beta' | 'live' | 'dev' | 'preview' | 'idle' | 'busy' | 'error';

interface StatusDotProps {
  status: StatusKind;
  size?: number;
  showHalo?: boolean;
  className?: string;
}

const STATUS_COLORS: Record<StatusKind, string> = {
  online: '#22C55E',
  beta: '#F59E0B',
  live: '#4F8CFF',
  dev: '#9AA6B8',
  preview: '#A855F7',
  idle: '#687385',
  busy: '#F97316',
  error: '#EF4444',
};

const STATUS_LABELS: Record<StatusKind, string> = {
  online: 'Online',
  beta: 'Beta',
  live: 'Ao vivo',
  dev: 'Em desenvolvimento',
  preview: 'Preview',
  idle: 'Inativo',
  busy: 'Ocupado',
  error: 'Erro',
};

/**
 * Each status has its own breathing pattern.
 * - online: slow steady pulse
 * - beta: warning pulse
 * - live: heartbeat (slightly irregular)
 * - dev: barely-there blink
 * - preview: violet breathing
 * - idle: ghost (almost invisible)
 * - busy: faster
 * - error: alert (more attention)
 */
export function StatusDot({ status, size = 8, showHalo = true, className = '' }: StatusDotProps) {
  const color = STATUS_COLORS[status];

  // Status-specific animation
  const variants = getStatusVariants(status);

  return (
    <span
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
      role="status"
      aria-label={STATUS_LABELS[status]}
    >
      {showHalo && (
        <motion.span
          aria-hidden
          animate={variants.halo}
          transition={variants.transition}
          className="absolute inset-0 rounded-full"
          style={{
            background: color,
            opacity: 0.3,
            filter: 'blur(2px)',
          }}
        />
      )}
      <motion.span
        aria-hidden
        animate={variants.core}
        transition={variants.transition}
        className="relative block rounded-full"
        style={{
          width: size,
          height: size,
          background: color,
        }}
      />
    </span>
  );
}

function getStatusVariants(status: StatusKind) {
  switch (status) {
    case 'online':
      return {
        halo: { opacity: [0.3, 0.55, 0.3], scale: [1, 1.6, 1] },
        core: { opacity: [0.85, 1, 0.85] },
        transition: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' as const },
      };
    case 'beta':
      return {
        halo: { opacity: [0.3, 0.5, 0.3], scale: [1, 1.5, 1] },
        core: { opacity: [0.85, 1, 0.85] },
        transition: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' as const },
      };
    case 'live':
      // Heartbeat — slightly irregular
      return {
        halo: { opacity: [0.3, 0.6, 0.3, 0.3, 0.3], scale: [1, 1.5, 1, 1, 1] },
        core: { opacity: [0.85, 1, 0.85, 0.85, 0.85] },
        transition: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' as const },
      };
    case 'dev':
      // Barely there
      return {
        halo: { opacity: [0.1, 0.2, 0.1], scale: [1, 1.2, 1] },
        core: { opacity: [0.7, 0.85, 0.7] },
        transition: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' as const },
      };
    case 'preview':
      return {
        halo: { opacity: [0.25, 0.5, 0.25], scale: [1, 1.4, 1] },
        core: { opacity: [0.8, 1, 0.8] },
        transition: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' as const },
      };
    case 'idle':
      return {
        halo: { opacity: [0.05, 0.1, 0.05], scale: [1, 1.1, 1] },
        core: { opacity: [0.5, 0.7, 0.5] },
        transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' as const },
      };
    case 'busy':
      return {
        halo: { opacity: [0.4, 0.7, 0.4], scale: [1, 1.7, 1] },
        core: { opacity: [0.9, 1, 0.9] },
        transition: { duration: 1.2, repeat: Infinity, ease: 'easeInOut' as const },
      };
    case 'error':
      return {
        halo: { opacity: [0.3, 0.6, 0.3], scale: [1, 1.5, 1] },
        core: { opacity: [0.9, 1, 0.9] },
        transition: { duration: 0.9, repeat: Infinity, ease: 'easeInOut' as const },
      };
    default:
      return {
        halo: { opacity: 0.3 },
        core: { opacity: 0.85 },
        transition: { duration: m.duration.normal, ease: m.easing.out },
      };
  }
}
