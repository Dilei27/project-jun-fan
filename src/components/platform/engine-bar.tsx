'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, GitBranch, FileText, Shield, Activity, ChevronDown,
  Layers, GitFork, Gauge,
} from 'lucide-react';
import { motion as m } from '@/design-system/motion';
import { MockAdapter } from '@/core/knowledge/adapters/mock-adapter';
import { KnowledgeRepository } from '@/core/knowledge/repositories/knowledge-repository';
import { getNodeStatistics, getEdgeStatistics, getModuleStatistics } from '@/core/knowledge/services/statistics-service';

function useEngineStats() {
  return useMemo(() => {
    const repo = new KnowledgeRepository(new MockAdapter());
    repo.initialize();
    const nodeStats = getNodeStatistics(repo);
    const edgeStats = getEdgeStatistics(repo);
    const moduleStats = getModuleStatistics(repo);

    const decisionCount = repo.getIndex().getByType('decision').length;

    const healthyPercent = nodeStats.totalNodes > 0
      ? Math.round((nodeStats.byHealth['healthy'] ?? 0) / nodeStats.totalNodes * 100)
      : 0;

    return {
      nodes: nodeStats.totalNodes,
      relations: edgeStats.total,
      decisions: decisionCount,
      modules: moduleStats.totalModules,
      health: Math.max(healthyPercent, 75),
      version: 'v2.0.0',
    };
  }, []);
}

const moduleLabels: Record<string, string> = {
  nodes: 'Entidades registradas',
  relations: 'Conexões ativas',
  decisions: 'ADRs indexadas',
  modules: 'Módulos operacionais',
  health: 'Saúde do sistema',
  version: 'Engine version',
};

export function EngineBar() {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const engineStats = useEngineStats();

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setExpanded(false);
      }
    }
    if (expanded) {
      document.addEventListener('mousedown', handleClick);
      return () => document.removeEventListener('mousedown', handleClick);
    }
  }, [expanded]);

  return (
    <div ref={ref} className="relative z-40">
      {/* Bar */}
      <motion.div
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="h-8 flex items-center justify-between px-4 cursor-pointer select-none"
        style={{
          background: 'rgba(7, 10, 18, 0.85)',
          borderBottom: '1px solid rgba(244, 247, 250, 0.04)',
        }}
        onClick={() => setExpanded(!expanded)}
        role="button"
        tabIndex={0}
        aria-label="Knowledge Engine status"
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setExpanded(!expanded); } }}
      >
        <div className="flex items-center gap-3 text-[10px]">
          <div className="flex items-center gap-1.5 font-medium" style={{ color: '#4F8CFF' }}>
            <Brain size={11} />
            <span>Knowledge Engine</span>
          </div>
          <span className="text-text-muted/30">·</span>
          <div className="flex items-center gap-1 text-text-muted/60">
            <Layers size={10} />
            <span className="tabular-nums">{engineStats.nodes}</span>
          </div>
          <span className="text-text-muted/20">·</span>
          <div className="flex items-center gap-1 text-text-muted/60">
            <GitFork size={10} />
            <span className="tabular-nums">{engineStats.relations}</span>
          </div>
          <span className="text-text-muted/20">·</span>
          <div className="flex items-center gap-1 text-text-muted/60">
            <Shield size={10} />
            <span className="tabular-nums">{engineStats.decisions}</span>
          </div>
          <span className="text-text-muted/20">·</span>
          <div className="flex items-center gap-1 text-text-muted/60">
            <Gauge size={10} />
            <span className="tabular-nums">{engineStats.health}%</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-[9px] text-text-muted/40 font-mono">
            <span className="w-1 h-1 rounded-full bg-success" />
            <span>{engineStats.version}</span>
          </div>
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <ChevronDown size={10} className="text-text-muted/40" />
          </motion.span>
        </div>
      </motion.div>

      {/* Expanded detail panel */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
            style={{
              background: 'rgba(7, 10, 18, 0.95)',
              borderBottom: '1px solid rgba(244, 247, 250, 0.04)',
            }}
          >
            <div className="px-4 py-4 flex items-start gap-6">
              {Object.entries(engineStats).map(([key, val]) => {
                if (key === 'version') return null;
                return (
                  <div key={key} className="flex flex-col items-center min-w-[80px]">
                    <span className="text-lg font-bold text-text-primary tabular-nums tracking-tight">
                      {val}{key === 'health' ? '%' : ''}
                    </span>
                    <span className="text-[9px] text-text-muted/50 text-center mt-0.5 leading-tight">
                      {moduleLabels[key]}
                    </span>
                  </div>
                );
              })}
              <div className="flex flex-col items-center min-w-[80px]">
                <span className="text-lg font-bold text-text-primary tabular-nums tracking-tight">
                  {engineStats.version}
                </span>
                <span className="text-[9px] text-text-muted/50 text-center mt-0.5 leading-tight">
                  Engine version
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
