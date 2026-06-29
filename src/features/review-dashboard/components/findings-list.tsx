'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, ChevronDown, ExternalLink } from 'lucide-react';
import { motion as m } from '@/design-system/motion';
import type { ReviewFinding, ReviewSeverity } from '@/core/review';
import { SEVERITY_LABELS, SEVERITY_COLORS, REVIEW_CATEGORY_COLORS, REVIEW_CATEGORY_LABELS } from '@/core/review';

interface FindingsListProps {
  findings: ReviewFinding[]
}

const severityOrder: ReviewSeverity[] = ['critical', 'high', 'medium', 'low', 'info'];

export function FindingsList({ findings }: FindingsListProps) {
  const sorted = [...findings].sort(
    (a, b) => severityOrder.indexOf(a.severity) - severityOrder.indexOf(b.severity),
  )

  const grouped = groupBy(sorted, 'severity') as Record<string, ReviewFinding[]>

  return (
    <div className="rounded-xl p-4" style={{
      background: 'rgba(17, 24, 33, 0.6)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(244, 247, 250, 0.04)',
    }}>
      <div className="flex items-center gap-1.5 mb-3">
        <AlertTriangle size={12} className="text-text-muted" />
        <h2 className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">Findings</h2>
        <span className="text-[9px] text-text-muted/40 ml-auto">{findings.length} problemas</span>
      </div>

      {/* Severity summary */}
      <div className="flex gap-2 mb-3">
        {severityOrder.map(sev => {
          const items = grouped[sev]
          if (!items) return null
          return (
            <div
              key={sev}
              className="flex-1 flex flex-col items-center px-2 py-1.5 rounded-lg"
              style={{ background: `${SEVERITY_COLORS[sev]}08` }}
            >
              <span className="text-xs font-semibold" style={{ color: SEVERITY_COLORS[sev] }}>
                {items.length}
              </span>
              <span className="text-[6px] uppercase tracking-wider text-text-muted/50">{SEVERITY_LABELS[sev]}</span>
            </div>
          )
        })}
      </div>

      <div className="space-y-1 max-h-[400px] overflow-y-auto pr-1 scrollbar-thin">
        {sorted.map((finding, i) => (
          <FindingRow key={finding.id} finding={finding} index={i} />
        ))}
      </div>
    </div>
  )
}

function FindingRow({ finding, index }: { finding: ReviewFinding; index: number }) {
  const [open, setOpen] = useState(false)
  const color = SEVERITY_COLORS[finding.severity]
  const catColor = REVIEW_CATEGORY_COLORS[finding.category]

  return (
    <motion.div
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, delay: index * 0.01, ease: m.easing.out }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 w-full px-2 py-1.5 rounded-lg text-left transition-all hover:bg-white/[0.02]"
      >
        <span
          className="w-1.5 h-1.5 rounded-full shrink-0"
          style={{ background: color }}
        />
        <span className="text-[9px] text-text-primary flex-1 truncate">{finding.title}</span>
        <span
          className="text-[7px] px-1 py-0.5 rounded uppercase tracking-wider shrink-0"
          style={{ background: `${catColor}12`, color: catColor }}
        >
          {REVIEW_CATEGORY_LABELS[finding.category]}
        </span>
        <ChevronRightIcon open={open} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15, ease: m.easing.out }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-2 space-y-1">
              <p className="text-[8px] text-text-muted/70 leading-relaxed">{finding.description}</p>
              <p className="text-[8px]" style={{ color }}>
                <span className="text-text-muted/40">Impacto: </span>
                {finding.impact}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-[7px] text-text-muted/30">{SEVERITY_LABELS[finding.severity]}</span>
                <span className="text-text-muted/20">·</span>
                <span className="text-[7px] text-text-muted/30">{(finding.confidence * 100).toFixed(0)}% confiança</span>
              </div>
              {finding.evidence.length > 0 && (
                <div className="space-y-0.5 mt-1">
                  {finding.evidence.map((ev, i) => (
                    <div key={i} className="flex items-center gap-1 text-[7px] text-text-muted/40">
                      <ExternalLink size={6} />
                      <span>{ev.entityName}</span>
                      <span className="text-text-muted/20">—</span>
                      <span className="truncate max-w-[200px]">{ev.detail}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function ChevronRightIcon({ open }: { open: boolean }) {
  return (
    <ChevronDown
      size={8}
      className="text-text-muted/30 transition-transform shrink-0"
      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
    />
  )
}

function groupBy<T>(arr: T[], key: keyof T): Record<string, T[]> {
  return arr.reduce((acc, item) => {
    const k = String(item[key])
    ;(acc[k] ??= []).push(item)
    return acc
  }, {} as Record<string, T[]>)
}
