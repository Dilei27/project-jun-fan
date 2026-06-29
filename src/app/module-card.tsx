'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight, GitBranch, Command, Brain, FileText,
  type LucideIcon,
} from 'lucide-react';
import { motion as m } from '@/design-system/motion';
import { StatusDot, type StatusKind } from '@/components/shared/status-dot';

const ICON_MAP: Record<string, LucideIcon> = {
  GitBranch, Command, Brain, FileText,
};

interface ModuleCardProps {
  title: string;
  description: string;
  href: string;
  icon: string;
  accentColor: string;
  status: StatusKind;
  primary?: boolean;
}

export function ModuleCard({
  title,
  description,
  href,
  icon: iconName,
  accentColor,
  status,
  primary = false,
}: ModuleCardProps) {
  const Icon = ICON_MAP[iconName] || GitBranch;

  return (
    <Link href={href} className="block group">
      <motion.div
        whileHover={{ y: -3, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
        className="relative rounded-xl p-5 h-full transition-all duration-300"
        style={{
          background: primary
            ? `linear-gradient(135deg, ${accentColor}08, ${accentColor}02)`
            : 'rgba(10, 14, 22, 0.6)',
          border: primary
            ? `1px solid ${accentColor}25`
            : '1px solid rgba(244, 247, 250, 0.06)',
          boxShadow: primary
            ? `0 0 0 1px ${accentColor}10, 0 8px 24px -8px rgba(0,0,0,0.5)`
            : '0 4px 16px -8px rgba(0,0,0,0.4)',
        }}
      >
        <div
          aria-hidden
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${accentColor}12, transparent 70%)`,
          }}
        />

        <div className="relative">
          <div className="flex items-start justify-between mb-4">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{
                background: `${accentColor}12`,
                border: `1px solid ${accentColor}20`,
              }}
            >
              <Icon size={18} style={{ color: accentColor }} />
            </div>
            <StatusDot status={status} size={7} />
          </div>

          <h3 className="text-sm font-semibold text-text-primary mb-1.5 tracking-[-0.01em]">
            {title}
          </h3>
          <p className="text-xs text-text-muted leading-relaxed mb-4">
            {description}
          </p>

          <div
            className="flex items-center gap-1 text-[11px] font-medium transition-all duration-200"
            style={{ color: accentColor }}
          >
            <span>Acessar</span>
            <ArrowRight
              size={12}
              className="transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5"
            />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
