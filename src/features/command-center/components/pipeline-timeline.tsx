'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Clock, GitPullRequest, ArrowUp } from 'lucide-react';
import { motion as m } from '@/design-system/motion';
import type { TimelineEntry } from '@/types';
import { getTimeline } from '@/lib/content';

interface PipelineTimelineProps {
  limit?: number;
}

const pipelineStatus = {
  success: 97,
  failed: 3,
  running: true,
  lastRun: '2 min atrás',
  commits: 284,
};

const recentExecutions = [
  { status: 'success', label: 'Deploy v2.4.1 — produção', time: '2h atrás', actor: 'CI/CD' },
  { status: 'success', label: 'Execução #482 — suite regressão', time: '4h atrás', actor: 'QA Bot' },
  { status: 'failed', label: 'Edge test — timeout em busca CNPJ', time: '6h atrás', actor: 'Vigilante AI' },
  { status: 'success', label: 'Deploy v2.4.0 — staging', time: '8h atrás', actor: 'CI/CD' },
  { status: 'success', label: 'Execução #481 — smoke tests', time: '10h atrás', actor: 'QA Bot' },
] as const;

export function PipelineTimeline({ limit = 4 }: PipelineTimelineProps) {
  const timeline = getTimeline();

  return (
    <section className="mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Pipeline Health */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-xl p-5"
          style={{
            background: 'rgba(10, 14, 22, 0.6)',
            border: '1px solid rgba(244, 247, 250, 0.06)',
            boxShadow: '0 4px 16px -8px rgba(0,0,0,0.4)',
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <GitPullRequest size={14} className="text-text-muted" />
              <h3 className="text-sm font-semibold text-text-primary">Pipeline Health</h3>
            </div>
            <span className="text-[10px] text-text-muted/60 font-mono">{pipelineStatus.lastRun}</span>
          </div>

          <div className="flex items-end gap-4 mb-4">
            <div>
              <div className="text-2xl font-bold text-text-primary tabular-nums tracking-tight">
                {pipelineStatus.success}%<span className="text-xs font-normal text-text-muted ml-1">success</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <div
                  className="h-1.5 rounded-full flex-1 max-w-[120px]"
                  style={{ background: 'rgba(244, 247, 250, 0.06)' }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${pipelineStatus.success}%`,
                      background: 'linear-gradient(to right, #22C55E, #4ADE80)',
                    }}
                  />
                </div>
                <span className="text-[10px] text-text-muted/60">{pipelineStatus.failed}% failed</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-text-muted">
              <ArrowUp size={10} className="text-success" />
              <span className="tabular-nums">{pipelineStatus.commits}</span>
              <span className="text-text-muted/50">commits</span>
            </div>
          </div>

          {pipelineStatus.running && (
            <div className="flex items-center gap-2 py-2 px-3 rounded-lg mb-3" style={{ background: 'rgba(79, 140, 255, 0.06)', border: '1px solid rgba(79, 140, 255, 0.12)' }}>
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1.5 h-1.5 rounded-full bg-accent-qa"
              />
              <span className="text-[11px] text-accent-qa font-medium">Pipeline em execução — suite de regressão</span>
            </div>
          )}

          <div className="space-y-2">
            {recentExecutions.slice(0, limit).map((exec, i) => (
              <motion.div
                key={exec.time + exec.label}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.35 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-2.5 py-1.5"
              >
                {exec.status === 'success' ? (
                  <CheckCircle2 size={12} className="text-success shrink-0" />
                ) : (
                  <XCircle size={12} className="text-error shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <span className="text-[12px] text-text-secondary truncate block">{exec.label}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[9px] text-text-muted/50 font-mono">{exec.actor}</span>
                  <span className="text-[9px] text-text-muted/50">{exec.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-xl p-5"
          style={{
            background: 'rgba(10, 14, 22, 0.6)',
            border: '1px solid rgba(244, 247, 250, 0.06)',
            boxShadow: '0 4px 16px -8px rgba(0,0,0,0.4)',
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Clock size={14} className="text-text-muted" />
            <h3 className="text-sm font-semibold text-text-primary">Timeline</h3>
          </div>

          <div className="space-y-0">
            {timeline.slice(0, 5).map((entry, i) => (
              <motion.div
                key={entry.year}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-start gap-3 py-2.5 relative"
              >
                <div className="flex flex-col items-center shrink-0">
                  <div
                    className="w-2 h-2 rounded-full mt-1.5"
                    style={{ backgroundColor: i === 0 ? '#4F8CFF' : 'rgba(244, 247, 250, 0.15)' }}
                  />
                  {i < Math.min(timeline.length, 5) - 1 && (
                    <div className="w-px flex-1 my-0.5" style={{ background: 'rgba(244, 247, 250, 0.05)' }} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-text-muted/50 tabular-nums">{entry.year}</span>
                    {i === 0 && (
                      <span className="px-1 py-0.5 rounded text-[8px] font-medium uppercase tracking-wider" style={{ background: 'rgba(79, 140, 255, 0.1)', color: '#4F8CFF' }}>
                        Latest
                      </span>
                    )}
                  </div>
                  <span className="text-[12px] text-text-secondary block mt-0.5 leading-snug">
                    {entry.milestone}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
