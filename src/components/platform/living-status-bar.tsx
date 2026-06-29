'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, GitFork, Shield, FileText, Gauge, Activity, Wifi,
} from 'lucide-react';
import { usePlatform } from './platform-context';
import { StatusDot } from '@/components/shared/status-dot';

const moduleIcons: Record<string, typeof Brain> = {
  home: Brain,
  'knowledge-graph': GitFork,
  'command-center': Shield,
  docs: FileText,
  decisoes: Shield,
  twin: Activity,
};

const moduleColors: Record<string, string> = {
  home: '#4F8CFF',
  'knowledge-graph': '#22C55E',
  'command-center': '#C084FC',
  docs: '#EAB308',
  decisoes: '#FB923C',
  twin: '#22D3EE',
};

const moduleNames: Record<string, string> = {
  home: 'Home',
  'knowledge-graph': 'Graph',
  'command-center': 'QA',
  docs: 'Docs',
  decisoes: 'Decisões',
  twin: 'Twin',
};

export function LivingStatusBar() {
  const { currentModule, status, selectedKnowledgeNodeLabel, syncStatus } = usePlatform();
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setPulse(p => !p), 3000);
    return () => clearInterval(interval);
  }, []);

  const color = moduleColors[currentModule] || '#4F8CFF';
  const Icon = moduleIcons[currentModule] || Brain;
  const moduleName = moduleNames[currentModule] || currentModule;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 h-7 flex items-center justify-between px-3"
      style={{
        background: 'rgba(7, 10, 18, 0.88)',
        borderTop: '1px solid rgba(244, 247, 250, 0.04)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Left: Active module */}
      <div className="flex items-center gap-2 min-w-0">
        <div className="flex items-center gap-1.5">
          <Icon size={10} style={{ color }} />
          <span className="text-[9px] font-medium text-text-muted/70">{moduleName}</span>
        </div>

        {/* Selected node indicator */}
        <AnimatePresence>
          {selectedKnowledgeNodeLabel && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="flex items-center gap-1 text-[9px] text-accent-qa/70 truncate max-w-[160px]"
            >
              <span className="text-text-muted/20">·</span>
              <span className="truncate">{selectedKnowledgeNodeLabel}</span>
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Right: Status indicators */}
      <div className="flex items-center gap-3">
        {/* Health percentage */}
        <div className="flex items-center gap-1">
          <Gauge size={8} className="text-text-muted/40" />
          <span
            className="text-[8px] font-medium tabular-nums"
            style={{ color: status.overall.health === 'healthy' ? '#22C55E' : status.overall.health === 'degraded' ? '#F59E0B' : '#EF4444' }}
          >
            {status.healthyPercent}%
          </span>
        </div>

        {/* Sync indicator */}
        <div className="flex items-center gap-1">
          <motion.div
            animate={syncStatus === 'syncing' ? { opacity: [0.4, 1, 0.4], rotate: [0, 360] } : {}}
            transition={syncStatus === 'syncing' ? { duration: 2, repeat: Infinity, ease: 'linear' } : {}}
          >
            <Wifi size={8} className={syncStatus === 'synced' ? 'text-success/60' : syncStatus === 'error' ? 'text-danger/60' : 'text-text-muted/40'} />
          </motion.div>
          <span className="text-[8px] text-text-muted/40 font-medium">
            {syncStatus === 'synced' ? 'Sincronizado' : syncStatus === 'syncing' ? 'Sincronizando' : 'Erro'}
          </span>
        </div>

        {/* Node/edge counts */}
        <div className="flex items-center gap-1.5 text-[8px] text-text-muted/40">
          <span className="tabular-nums">{status.totalNodes}</span>
          <span className="opacity-50">·</span>
          <span className="tabular-nums">{status.totalEdges}</span>
          <span className="opacity-50">·</span>
          <span className="tabular-nums">{status.totalDecisions}</span>
        </div>

        {/* Pulse dot — shows the platform is alive */}
        <motion.span
          className="w-1 h-1 rounded-full"
          style={{
            background: '#22C55E',
            opacity: pulse ? 0.4 : 0.8,
          }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        />
      </div>
    </div>
  );
}
