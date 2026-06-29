'use client';

import { motion } from 'framer-motion';
import { GitBranch, Plus, Link2, RefreshCw, ArrowRight } from 'lucide-react';
import Link from 'next/link';

type ActivityType = 'node' | 'connection' | 'update';

const activities: { type: ActivityType; label: string; time: string; color: string }[] = [
  { type: 'node', label: 'Novo produto: Vigilante AI', time: '1h atrás', color: '#4F8CFF' },
  { type: 'connection', label: 'Nova conexão: QA CC → WhatsApp AI', time: '3h atrás', color: '#22C55E' },
  { type: 'update', label: 'Atualização: ADR-003 (Database)', time: '5h atrás', color: '#EAB308' },
  { type: 'node', label: 'Novo nó: Skill — Playwright', time: '8h atrás', color: '#4F8CFF' },
  { type: 'connection', label: 'Nova conexão: Docs → Architecture Flow', time: '12h atrás', color: '#22C55E' },
];

const activityIcons: Record<ActivityType, typeof Plus> = {
  node: Plus,
  connection: Link2,
  update: RefreshCw,
};

export function KnowledgeActivity() {
  return (
    <section className="mb-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-xl p-5"
        style={{
          background: 'rgba(10, 14, 22, 0.6)',
          border: '1px solid rgba(244, 247, 250, 0.06)',
          boxShadow: '0 4px 16px -8px rgba(0,0,0,0.4)',
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <GitBranch size={14} className="text-text-muted" />
            <h3 className="text-sm font-semibold text-text-primary">Knowledge Activity</h3>
          </div>
          <Link
            href="/knowledge-graph/"
            className="text-[11px] text-accent-qa hover:underline flex items-center gap-1"
          >
            Ver no grafo <ArrowRight size={10} />
          </Link>
        </div>

        <div className="space-y-1">
          {activities.map((act, i) => {
            const Icon = activityIcons[act.type];
            return (
              <motion.div
                key={act.time + act.label}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.55 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-3 py-2 px-2 rounded-lg hover:bg-white/[0.02] transition-colors duration-150"
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    background: `${act.color}10`,
                    border: `1px solid ${act.color}15`,
                  }}
                >
                  <Icon size={11} style={{ color: act.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[12px] text-text-secondary truncate block">
                    {act.label}
                  </span>
                </div>
                <span className="text-[9px] text-text-muted/30 font-mono shrink-0">{act.time}</span>
              </motion.div>
            );
          })}
        </div>

        {/* Summary bar */}
        <div
          className="flex items-center gap-4 mt-4 pt-3"
          style={{ borderTop: '1px solid rgba(244, 247, 250, 0.04)' }}
        >
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-medium text-text-muted">+3 novos nós</span>
          </div>
          <span className="text-text-muted/20">·</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-medium text-text-muted">+12 conexões</span>
          </div>
          <span className="text-text-muted/20">·</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-medium text-text-muted">2 atualizações</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
