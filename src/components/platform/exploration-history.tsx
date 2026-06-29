'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePlatform } from './platform-context';
import { motion as m } from '@/design-system/motion';

const moduleColors: Record<string, string> = {
  home: '#4F8CFF',
  'knowledge-graph': '#22C55E',
  'command-center': '#C084FC',
  docs: '#EAB308',
  decisoes: '#FB923C',
  twin: '#22D3EE',
};

export function ExplorationHistory() {
  const { navigationHistory } = usePlatform();
  const [open, setOpen] = useState(false);

  if (navigationHistory.length === 0) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] text-text-muted hover:text-text-primary hover:bg-white/5 transition-colors"
      >
        <History size={10} />
        <span className="hidden sm:inline">Histórico</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="inline-flex"
        >
          <ChevronDown size={8} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.96 }}
            transition={{ duration: 0.2, ease: m.easing.out }}
            className="absolute bottom-full right-0 mb-1 w-64 rounded-lg overflow-hidden"
            style={{
              background: 'rgba(17, 24, 33, 0.95)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(244,247,250,0.06)',
              boxShadow: '0 12px 32px -8px rgba(0,0,0,0.5)',
            }}
          >
            <div className="px-3 py-2 border-b border-white/5">
              <span className="text-[9px] font-medium uppercase tracking-wider text-text-muted/50">
                Histórico de navegação
              </span>
            </div>
            <div className="max-h-48 overflow-y-auto py-1">
              {navigationHistory.slice(-20).reverse().map((entry, i) => (
                <Link
                  key={`${entry.href}-${entry.timestamp}`}
                  href={entry.href}
                  className="flex items-center gap-2 px-3 py-1.5 text-[10px] text-text-muted hover:text-text-primary hover:bg-white/5 transition-colors"
                >
                  <span
                    className="w-1 h-1 rounded-full shrink-0"
                    style={{ background: moduleColors[entry.module] || '#687385' }}
                  />
                  <span className="truncate">{entry.label}</span>
                  <span className="ml-auto text-[8px] text-text-muted/30 shrink-0 tabular-nums">
                    {formatTime(entry.timestamp)}
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function formatTime(ts: number): string {
  const diff = Date.now() - ts;
  if (diff < 60000) return 'agora';
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h`;
  return `${Math.floor(diff / 86400000)}d`;
}
