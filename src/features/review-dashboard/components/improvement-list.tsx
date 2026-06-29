'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Zap, Clock, Target } from 'lucide-react';
import { motion as m } from '@/design-system/motion';
import type { ImprovementOpportunity, ImprovementCategory, ReviewCategory } from '@/core/review';
import { REVIEW_CATEGORY_COLORS, REVIEW_CATEGORY_LABELS, SEVERITY_COLORS, SEVERITY_LABELS } from '@/core/review';

const categoryConfig: Record<ImprovementCategory, { label: string; icon: React.ReactNode; color: string; description: string }> = {
  high_impact:   { label: 'Alto Impacto',  icon: <TrendingUp size={10} />, color: '#EF4444', description: 'Problemas críticos que afetam toda a plataforma' },
  medium_impact: { label: 'Impacto Médio', icon: <Target size={10} />,     color: '#FB923C', description: 'Melhorias significativas com benefício moderado' },
  quick_win:     { label: 'Quick Wins',    icon: <Zap size={10} />,        color: '#22C55E', description: 'Alto impacto com baixo esforço' },
  long_term:     { label: 'Longo Prazo',   icon: <Clock size={10} />,     color: '#4F8CFF', description: 'Melhorias estruturais para evolução contínua' },
};

interface ImprovementListProps {
  opportunities: ImprovementOpportunity[]
}

export function ImprovementList({ opportunities }: ImprovementListProps) {
  const grouped = groupBy(opportunities, 'category') as Record<string, ImprovementOpportunity[]>

  const categoryOrder: ImprovementCategory[] = ['quick_win', 'high_impact', 'medium_impact', 'long_term']

  return (
    <div className="rounded-xl p-4" style={{
      background: 'rgba(17, 24, 33, 0.6)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(244, 247, 250, 0.04)',
    }}>
      <div className="flex items-center gap-1.5 mb-3">
        <TrendingUp size={12} className="text-text-muted" />
        <h2 className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">Oportunidades de Melhoria</h2>
        <span className="text-[9px] text-text-muted/40 ml-auto">{opportunities.length}</span>
      </div>

      <div className="space-y-3">
        {categoryOrder.map(cat => {
          const items = grouped[cat]
          if (!items || items.length === 0) return null
          const config = categoryConfig[cat]
          return (
            <div key={cat}>
              <div className="flex items-center gap-1.5 mb-1.5">
                <span style={{ color: config.color }}>{config.icon}</span>
                <span className="text-[8px] font-semibold uppercase tracking-wider" style={{ color: config.color }}>
                  {config.label}
                </span>
                <span className="text-[7px] text-text-muted/30">{items.length}</span>
              </div>
              <div className="space-y-1">
                {items.map((opp, i) => {
                  const finding = opp.finding
                  const sevColor = SEVERITY_COLORS[finding.severity]
                  const catColor = REVIEW_CATEGORY_COLORS[finding.category]
                  return (
                    <motion.div
                      key={opp.finding.id}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: i * 0.03, ease: m.easing.out }}
                      className="px-3 py-1.5 rounded-lg transition-all hover:bg-white/[0.02]"
                      style={{ borderLeft: `2px solid ${config.color}40` }}
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full shrink-0" style={{ background: sevColor }} />
                        <span className="text-[9px] text-text-primary flex-1 truncate">{finding.title}</span>
                        <span className="text-[6px] uppercase tracking-wider px-1 py-0.5 rounded" style={{
                          background: `${catColor}10`,
                          color: catColor,
                        }}>
                          {REVIEW_CATEGORY_LABELS[finding.category]}
                        </span>
                      </div>
                      <p className="text-[7px] text-text-muted/50 mt-0.5 pl-3.5">{opp.recommendation.description}</p>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function groupBy<T>(arr: T[], key: keyof T): Record<string, T[]> {
  return arr.reduce((acc, item) => {
    const k = String(item[key])
    ;(acc[k] ??= []).push(item)
    return acc
  }, {} as Record<string, T[]>)
}
