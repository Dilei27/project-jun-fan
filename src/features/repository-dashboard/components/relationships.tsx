'use client';

import { motion } from 'framer-motion';
import { Share2 } from 'lucide-react';
import { motion as m } from '@/design-system/motion';
import { REPO_RELATIONSHIP_LABELS } from '@/core/repository';
import type { RepoRelationship, RepoRelationshipType } from '@/core/repository';

const relationColors: Record<string, string> = {
  contains:    '#4F8CFF',
  imports:     '#22C55E',
  belongs_to:  '#C084FC',
  references:  '#EAB308',
  uses:        '#FB923C',
  depends_on:  '#EF4444',
};

interface RelationshipsProps {
  relationships: RepoRelationship[]
}

export function Relationships({ relationships }: RelationshipsProps) {
  const byType = groupBy(relationships, 'type') as Record<string, RepoRelationship[]>
  const typeEntries = Object.entries(byType).sort(([, a], [, b]) => b.length - a.length)

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25, ease: m.easing.out }}
      className="rounded-xl p-4"
      style={{
        background: 'rgba(17, 24, 33, 0.6)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(244, 247, 250, 0.04)',
      }}
    >
      <div className="flex items-center gap-1.5 mb-3">
        <Share2 size={12} className="text-text-muted" />
        <h2 className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">Relações</h2>
        <span className="text-[9px] text-text-muted/40 ml-auto">{relationships.length} relações</span>
      </div>

      <div className="space-y-2">
        {typeEntries.map(([type, rels]) => {
          const color = relationColors[type] ?? '#687385'
          const label = REPO_RELATIONSHIP_LABELS[type as RepoRelationshipType] ?? type
          return (
            <div key={type}>
              <div className="flex items-center gap-1.5 mb-1">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: color }}
                />
                <span className="text-[8px] font-medium uppercase tracking-wider" style={{ color }}>
                  {label}
                </span>
                <span className="text-[8px] text-text-muted/30 ml-auto">{rels.length}</span>
              </div>
              <div className="space-y-0.5">
                {rels.slice(0, 8).map((rel, i) => (
                  <motion.div
                    key={`${rel.source}-${rel.target}-${i}`}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15, delay: i * 0.02, ease: m.easing.out }}
                    className="flex items-center gap-1.5 px-2 py-0.5 rounded hover:bg-white/[0.02] text-[8px] text-text-muted/70"
                  >
                    <span className="truncate max-w-[100px]">{rel.source.split('-').slice(1).join('-')}</span>
                    <span className="text-text-muted/20 shrink-0">→</span>
                    <span className="truncate max-w-[100px]">{rel.target.split('-').slice(1).join('-')}</span>
                  </motion.div>
                ))}
                {rels.length > 8 && (
                  <p className="text-[7px] text-text-muted/20 pl-2">+{rels.length - 8} relações</p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}

function groupBy<T>(arr: T[], key: keyof T): Record<string, T[]> {
  return arr.reduce((acc, item) => {
    const k = String(item[key])
    ;(acc[k] ??= []).push(item)
    return acc
  }, {} as Record<string, T[]>)
}
