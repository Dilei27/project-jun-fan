'use client';

import { motion } from 'framer-motion';
import { StatusDot } from '@/components/shared/status-dot';

export function DashboardHeader() {
  return (
    <div className="relative mb-8">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl md:text-3xl font-bold text-text-primary tracking-[-0.02em]"
            >
              QA Command Center
            </motion.h1>
            <div className="flex items-center gap-1.5">
              <span
                className="px-1.5 py-0.5 rounded text-[9px] font-mono font-medium uppercase tracking-wider"
                style={{
                  background: 'rgba(79, 140, 255, 0.1)',
                  color: '#4F8CFF',
                  border: '1px solid rgba(79, 140, 255, 0.2)',
                }}
              >
                v1.0
              </span>
              <span
                className="px-1.5 py-0.5 rounded text-[9px] font-mono font-medium uppercase tracking-wider"
                style={{
                  background: 'rgba(34, 197, 94, 0.1)',
                  color: '#22C55E',
                  border: '1px solid rgba(34, 197, 94, 0.2)',
                }}
              >
                PROD
              </span>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm text-text-muted/80 max-w-xl leading-relaxed"
          >
            Operational intelligence for software quality — produtos, pipelines, decisões e conhecimento em um centro de comando.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2 shrink-0"
        >
          <StatusDot status="online" size={6} showHalo={false} />
          <span className="text-[10px] font-medium text-text-muted uppercase tracking-wider">
            All systems online
          </span>
        </motion.div>
      </div>

      {/* Separator */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="h-px mt-5"
        style={{
          background: 'linear-gradient(to right, rgba(79, 140, 255, 0.15), rgba(244, 247, 250, 0.04), transparent)',
          transformOrigin: 'left',
        }}
      />
    </div>
  );
}
