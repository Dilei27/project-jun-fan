'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, ChevronDown, Layers, GitFork, Shield, Gauge, Home,
} from 'lucide-react';
import Link from 'next/link';
import { usePlatform } from './platform-context';

const moduleIcons: Record<string, typeof Home> = {
  home: Home,
  'knowledge-graph': GitFork,
  'command-center': Shield,
  docs: Brain,
  decisoes: Shield,
};

const moduleColors: Record<string, string> = {
  home: '#4F8CFF',
  'knowledge-graph': '#22C55E',
  'command-center': '#C084FC',
  docs: '#EAB308',
  decisoes: '#FB923C',
};

const moduleNames: Record<string, string> = {
  home: 'Home',
  'knowledge-graph': 'Knowledge Graph',
  'command-center': 'QA Command Center',
  docs: 'Documentação',
  decisoes: 'Decisões Técnicas',
};

const healthColor: Record<string, string> = {
  healthy: '#22C55E',
  degraded: '#F59E0B',
  critical: '#EF4444',
  unknown: '#687385',
};

export function ContextBar() {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { currentModule, breadcrumb, status } = usePlatform();

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

  const Icon = moduleIcons[currentModule] || Brain;
  const color = moduleColors[currentModule] || '#4F8CFF';
  const moduleName = moduleNames[currentModule] || currentModule;

  return (
    <div ref={ref} className="relative z-40">
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
        aria-label="Platform context bar"
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setExpanded(!expanded); } }}
      >
        <div className="flex items-center gap-3 text-[10px] min-w-0">
          {/* Module indicator */}
          <div className="flex items-center gap-1.5 font-medium shrink-0" style={{ color }}>
            <Icon size={11} />
            <span>{moduleName}</span>
          </div>

          {/* Breadcrumb */}
          {breadcrumb.length > 0 && (
            <>
              <span className="text-text-muted/20 shrink-0">·</span>
              <nav className="flex items-center gap-1.5 text-text-muted/60 truncate" aria-label="Breadcrumb">
                {breadcrumb.map((item, i) => (
                  <span key={i} className="flex items-center gap-1.5 truncate">
                    {i > 0 && <span className="text-text-muted/20">/</span>}
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="hover:text-text-primary transition-colors truncate"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span className="truncate">{item.label}</span>
                    )}
                  </span>
                ))}
              </nav>
            </>
          )}

          {/* Stats */}
          <span className="text-text-muted/20 shrink-0">·</span>
          <div className="flex items-center gap-1 text-text-muted/60 shrink-0">
            <Layers size={10} />
            <span className="tabular-nums">{status.totalNodes}</span>
          </div>
          <span className="text-text-muted/20 shrink-0">·</span>
          <div className="flex items-center gap-1 text-text-muted/60 shrink-0">
            <GitFork size={10} />
            <span className="tabular-nums">{status.totalEdges}</span>
          </div>
          <span className="text-text-muted/20 shrink-0">·</span>
          <div className="flex items-center gap-1 text-text-muted/60 shrink-0">
            <Gauge size={10} />
            <span className="tabular-nums">{status.healthyPercent}%</span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Overall health dot */}
          <div className="flex items-center gap-1 text-[9px] text-text-muted/40 font-mono">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: healthColor[status.overall.health] }}
            />
            <span className="hidden sm:inline">{status.overall.health}</span>
          </div>
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <ChevronDown size={10} className="text-text-muted/40" />
          </motion.span>
        </div>
      </motion.div>

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
            <div className="px-4 py-4">
              {/* Module health grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-4">
                {[status.knowledge, status.architecture, status.qa, status.documentation, status.overall].map((m) => (
                  <div key={m.id} className="flex flex-col items-center p-2 rounded-lg" style={{ background: 'rgba(244, 247, 250, 0.03)' }}>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ background: healthColor[m.health] }}
                      />
                      <span className="text-[10px] font-medium text-text-primary truncate">{m.name}</span>
                    </div>
                    <span
                      className="text-[9px] uppercase tracking-wider"
                      style={{ color: healthColor[m.health] }}
                    >
                      {m.health}
                    </span>
                  </div>
                ))}
              </div>

              {/* Detailed stats row */}
              <div className="flex items-start gap-6 flex-wrap">
                <div className="flex flex-col items-center min-w-[70px]">
                  <span className="text-lg font-bold text-text-primary tabular-nums tracking-tight">{status.totalNodes}</span>
                  <span className="text-[9px] text-text-muted/50 text-center mt-0.5 leading-tight">Entidades</span>
                </div>
                <div className="flex flex-col items-center min-w-[70px]">
                  <span className="text-lg font-bold text-text-primary tabular-nums tracking-tight">{status.totalEdges}</span>
                  <span className="text-[9px] text-text-muted/50 text-center mt-0.5 leading-tight">Conexões</span>
                </div>
                <div className="flex flex-col items-center min-w-[70px]">
                  <span className="text-lg font-bold text-text-primary tabular-nums tracking-tight">{status.totalDecisions}</span>
                  <span className="text-[9px] text-text-muted/50 text-center mt-0.5 leading-tight">Decisões</span>
                </div>
                <div className="flex flex-col items-center min-w-[70px]">
                  <span className="text-lg font-bold text-text-primary tabular-nums tracking-tight">{status.healthyPercent}%</span>
                  <span className="text-[9px] text-text-muted/50 text-center mt-0.5 leading-tight">Saúde</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
