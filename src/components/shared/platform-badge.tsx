'use client';

import { motion } from 'framer-motion';
import { motion as m } from '@/design-system/motion';

export type BadgeKind =
  | 'healthy' | 'degraded' | 'critical'
  | 'online' | 'beta' | 'dev' | 'preview'
  | 'new' | 'changed' | 'recent'
  | 'experimental' | 'deprecated';

interface PlatformBadgeProps {
  kind: BadgeKind;
  label?: string;
  size?: 'sm' | 'md';
  pulse?: boolean;
}

const BADGE_STYLES: Record<BadgeKind, { bg: string; text: string; dot: string }> = {
  healthy: { bg: 'rgba(34, 197, 94, 0.1)', text: '#22C55E', dot: '#22C55E' },
  degraded: { bg: 'rgba(245, 158, 11, 0.1)', text: '#F59E0B', dot: '#F59E0B' },
  critical: { bg: 'rgba(239, 68, 68, 0.1)', text: '#EF4444', dot: '#EF4444' },
  online: { bg: 'rgba(34, 197, 94, 0.08)', text: '#22C55E', dot: '#22C55E' },
  beta: { bg: 'rgba(245, 158, 11, 0.08)', text: '#F59E0B', dot: '#F59E0B' },
  dev: { bg: 'rgba(154, 166, 184, 0.08)', text: '#9AA6B8', dot: '#9AA6B8' },
  preview: { bg: 'rgba(168, 85, 247, 0.08)', text: '#A855F7', dot: '#A855F7' },
  new: { bg: 'rgba(34, 197, 94, 0.1)', text: '#22C55E', dot: '#22C55E' },
  changed: { bg: 'rgba(245, 158, 11, 0.1)', text: '#F59E0B', dot: '#F59E0B' },
  recent: { bg: 'rgba(79, 140, 255, 0.1)', text: '#4F8CFF', dot: '#4F8CFF' },
  experimental: { bg: 'rgba(168, 85, 247, 0.1)', text: '#A855F7', dot: '#A855F7' },
  deprecated: { bg: 'rgba(100, 116, 139, 0.1)', text: '#64748B', dot: '#64748B' },
};

const BADGE_LABELS: Record<BadgeKind, string> = {
  healthy: 'Saudável',
  degraded: 'Degradado',
  critical: 'Crítico',
  online: 'Online',
  beta: 'Beta',
  dev: 'Dev',
  preview: 'Preview',
  new: 'Novo',
  changed: 'Alterado',
  recent: 'Recente',
  experimental: 'Experimental',
  deprecated: 'Obsoleto',
};

export function PlatformBadge({ kind, label, size = 'sm', pulse = false }: PlatformBadgeProps) {
  const style = BADGE_STYLES[kind];
  const text = label ?? BADGE_LABELS[kind];

  return (
    <motion.span
      className={`inline-flex items-center gap-1 rounded font-medium ${size === 'sm' ? 'px-1.5 py-0.5 text-[9px]' : 'px-2 py-1 text-[10px]'}`}
      style={{
        background: style.bg,
        color: style.text,
        border: `1px solid ${style.dot}15`,
      }}
    >
      <motion.span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: style.dot }}
        animate={pulse ? { opacity: [0.6, 1, 0.6], scale: [0.9, 1.1, 0.9] } : undefined}
        transition={pulse ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : undefined}
      />
      {text}
    </motion.span>
  );
}
