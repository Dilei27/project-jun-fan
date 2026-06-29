'use client';

import { motion } from 'framer-motion';
import { FolderOpen, ArrowUpRight } from 'lucide-react';
import { motion as m } from '@/design-system/motion';
import { PROFILE } from '../data/profile';
import Link from 'next/link';

const statusConfig: Record<string, { label: string; color: string }> = {
  active:    { label: 'Ativo',   color: '#22C55E' },
  concluded: { label: 'Concluído', color: '#687385' },
  maintained: { label: 'Mantido',  color: '#4F8CFF' },
};

export function FeaturedProjects() {
  return (
    <div className="rounded-xl p-5" style={{
      background: 'rgba(17, 24, 33, 0.6)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(244, 247, 250, 0.04)',
    }}>
      <div className="flex items-center gap-1.5 mb-4">
        <FolderOpen size={12} className="text-text-muted" />
        <h2 className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">Projetos</h2>
      </div>

      <div className="space-y-1.5">
        {PROFILE.featuredProjects.map((proj, i) => {
          const status = statusConfig[proj.status] ?? { label: proj.status, color: '#687385' }
          return (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.06, ease: m.easing.out }}
            >
              <Link
                href={proj.link}
                className="flex items-start gap-2 px-3 py-2 rounded-lg transition-all hover:bg-white/[0.02] group"
              >
                <div
                  className="w-2 h-2 rounded-full mt-1 shrink-0"
                  style={{ background: proj.color }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-medium text-text-primary group-hover:text-accent-qa transition-colors">
                      {proj.title}
                    </span>
                    <ArrowUpRight size={8} className="text-text-muted/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-[8px] text-text-muted/60 mt-0.5 line-clamp-1">{proj.summary}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span
                      className="text-[6px] font-medium uppercase tracking-wider px-1 py-0.5 rounded"
                      style={{ background: `${status.color}12`, color: status.color }}
                    >
                      {status.label}
                    </span>
                    <div className="flex gap-0.5 flex-wrap">
                      {proj.technologies.slice(0, 3).map(t => (
                        <span key={t} className="text-[6px] text-text-muted/30">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
