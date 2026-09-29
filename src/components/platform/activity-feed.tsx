'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity, GitBranch, FileText, Shield, BarChart3, RefreshCw, CheckCircle2,
} from 'lucide-react';
import { MockAdapter } from '@/core/knowledge/adapters/mock-adapter';
import { KnowledgeRepository } from '@/core/knowledge/repositories/knowledge-repository';
import { getNodeStatistics, getEdgeStatistics } from '@/core/knowledge/services/statistics-service';

interface ActivityEvent {
  type: 'sync' | 'graph' | 'decision' | 'metrics' | 'docs' | 'pipeline';
  label: string;
  time: string;
}

const eventIcons: Record<ActivityEvent['type'], typeof Activity> = {
  sync: RefreshCw,
  graph: GitBranch,
  decision: Shield,
  metrics: BarChart3,
  docs: FileText,
  pipeline: CheckCircle2,
};

const eventColors: Record<ActivityEvent['type'], string> = {
  sync: '#4F8CFF',
  graph: '#22C55E',
  decision: '#C084FC',
  metrics: '#F59E0B',
  docs: '#EAB308',
  pipeline: '#22D3EE',
};

export function ActivityFeed({ compact = false }: { compact?: boolean }) {
  const [events] = useState<ActivityEvent[]>(() => {
    try {
      const repo = new KnowledgeRepository(new MockAdapter());
      repo.initialize();
      const nodeStats = getNodeStatistics(repo);
      const edgeStats = getEdgeStatistics(repo);
      const decisionCount = repo.getIndex().getByType('decision').length;
      const docCount = repo.getAllDocuments().length;
      const productCount = nodeStats.byType['product'] ?? 0;

      return [
        { type: 'sync', label: 'Knowledge snapshot loaded', time: 'static snapshot' },
        { type: 'graph', label: `Graph snapshot — ${edgeStats.total} connections across ${nodeStats.totalNodes} nodes`, time: 'static snapshot' },
        { type: 'decision', label: `${decisionCount} architecture decisions indexed`, time: 'static snapshot' },
        { type: 'metrics', label: `QA metrics snapshot — ${productCount} products`, time: 'static snapshot' },
        { type: 'docs', label: `Documentation snapshot — ${docCount} docs`, time: 'static snapshot' },
        { type: 'pipeline', label: 'Pipeline example — suite regressão', time: 'static snapshot' },
      ];
    } catch {
      return [
        { type: 'sync', label: 'Knowledge snapshot loaded', time: 'static snapshot' },
        { type: 'graph', label: 'Graph snapshot — 3 example connections', time: 'static snapshot' },
        { type: 'decision', label: 'Architecture decision example — ADR-004', time: 'static snapshot' },
        { type: 'metrics', label: 'QA metrics snapshot', time: 'static snapshot' },
        { type: 'docs', label: 'Documentation snapshot — 2 docs', time: 'static snapshot' },
        { type: 'pipeline', label: 'Pipeline example — suite regressão', time: 'static snapshot' },
      ];
    }
  });

  const display = compact ? events.slice(0, 3) : events;

  return (
    <div className="rounded-xl p-4" style={{
      background: 'rgba(10, 14, 22, 0.6)',
      border: '1px solid rgba(244, 247, 250, 0.05)',
    }}>
      <div className="flex items-center gap-2 mb-3">
        <Activity size={13} className="text-text-muted" />
        <h3 className="text-xs font-semibold text-text-primary">Activity Feed</h3>
        <span className="text-[9px] text-text-muted/50 ml-auto">Static snapshot</span>
      </div>

      <div className="space-y-2">
        {display.map((event, i) => {
          const Icon = eventIcons[event.type];
          const color = eventColors[event.type];
          return (
            <motion.div
              key={event.time + event.label}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2.5 py-1.5"
            >
              <div
                className="w-5 h-5 rounded flex items-center justify-center shrink-0"
                style={{ background: `${color}10` }}
              >
                <Icon size={9} style={{ color }} />
              </div>
              <span className="flex-1 text-[11px] text-text-secondary leading-tight min-w-0 truncate">
                {event.label}
              </span>
              <span className="text-[8px] text-text-muted/30 font-mono shrink-0">{event.time}</span>
            </motion.div>
          );
        })}
      </div>

      {compact && (
        <div className="mt-2 pt-2 text-center" style={{ borderTop: '1px solid rgba(244, 247, 250, 0.03)' }}>
          <span className="text-[9px] text-text-muted/40">+3 more events</span>
        </div>
      )}
    </div>
  );
}
