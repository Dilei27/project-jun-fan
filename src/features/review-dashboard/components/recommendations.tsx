'use client';

import { motion } from 'framer-motion';
import { Lightbulb, Clock, Target } from 'lucide-react';
import { motion as m } from '@/design-system/motion';
import type { ReviewRecommendation, RecommendationPriority } from '@/core/review';
import { REVIEW_CATEGORY_COLORS, REVIEW_CATEGORY_LABELS } from '@/core/review';

const priorityColors: Record<string, string> = {
  critical: '#EF4444',
  high:     '#FB923C',
  medium:   '#EAB308',
  low:      '#687385',
};

const priorityLabels: Record<string, string> = {
  critical: 'Crítico',
  high:     'Alta',
  medium:   'Média',
  low:      'Baixa',
};

interface RecommendationsProps {
  recommendations: ReviewRecommendation[]
}

export function Recommendations({ recommendations }: RecommendationsProps) {
  const sorted = [...recommendations].sort(
    (a, b) => priorityOrder(a.priority) - priorityOrder(b.priority),
  )

  return (
    <div className="rounded-xl p-4" style={{
      background: 'rgba(17, 24, 33, 0.6)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(244, 247, 250, 0.04)',
    }}>
      <div className="flex items-center gap-1.5 mb-3">
        <Lightbulb size={12} className="text-text-muted" />
        <h2 className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">Recomendações</h2>
        <span className="text-[9px] text-text-muted/40 ml-auto">{recommendations.length}</span>
      </div>

      <div className="space-y-1 max-h-[500px] overflow-y-auto pr-1 scrollbar-thin">
        {sorted.map((rec, i) => {
          const pColor = priorityColors[rec.priority] ?? '#687385'
          const catColor = REVIEW_CATEGORY_COLORS[rec.category]
          return (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: i * 0.008, ease: m.easing.out }}
              className="px-3 py-2 rounded-lg transition-all hover:bg-white/[0.02]"
              style={{ borderLeft: `2px solid ${pColor}` }}
            >
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-[9px] text-text-primary font-medium flex-1 truncate">{rec.title}</span>
                <span className="text-[6px] font-semibold uppercase tracking-wider px-1 py-0.5 rounded" style={{
                  background: `${pColor}15`,
                  color: pColor,
                }}>
                  {priorityLabels[rec.priority]}
                </span>
              </div>
              <p className="text-[8px] text-text-muted/60 leading-relaxed mb-1">{rec.description}</p>
              <div className="flex items-center gap-2 text-[7px] text-text-muted/40">
                <span className="flex items-center gap-0.5">
                  <Target size={6} /> {rec.estimatedImpact}
                </span>
                <span className="flex items-center gap-0.5">
                  <Clock size={6} /> {rec.effortDescription}
                </span>
                <span className="text-[6px] px-1 py-0.5 rounded uppercase" style={{
                  background: `${catColor}10`,
                  color: catColor,
                }}>
                  {REVIEW_CATEGORY_LABELS[rec.category]}
                </span>
              </div>
              {rec.affectedModules.length > 0 && (
                <div className="flex flex-wrap gap-0.5 mt-1">
                  {rec.affectedModules.slice(0, 4).map((mod) => (
                    <span key={mod} className="text-[6px] text-text-muted/30 px-1 py-0.5 rounded" style={{
                      background: 'rgba(244,247,250,0.03)',
                    }}>
                      {mod}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

function priorityOrder(p: RecommendationPriority): number {
  return ({ critical: 0, high: 1, medium: 2, low: 3 })[p] ?? 99
}
