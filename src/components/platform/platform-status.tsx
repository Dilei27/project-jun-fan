'use client';

import { motion } from 'framer-motion';
import { usePlatform } from './platform-context';
import { motion as m } from '@/design-system/motion';

const healthColor: Record<string, string> = {
  healthy: '#22C55E',
  degraded: '#F59E0B',
  critical: '#EF4444',
  unknown: '#687385',
};

const healthLabel: Record<string, string> = {
  healthy: 'Saudável',
  degraded: 'Degradado',
  critical: 'Crítico',
  unknown: 'Desconhecido',
};

export function PlatformStatus() {
  const { status } = usePlatform();
  const modules = [
    { ...status.knowledge, subtitle: `${status.totalNodes} nodes` },
    { ...status.architecture, subtitle: `${status.totalDecisions} decisões` },
    { ...status.qa, subtitle: 'Produtos + Projetos' },
    { ...status.documentation, subtitle: 'Documentação viva' },
  ];

  return (
    <div
      className="rounded-xl p-5"
      style={{
        background: 'rgba(10, 14, 22, 0.6)',
        border: '1px solid rgba(244, 247, 250, 0.05)',
      }}
    >
      <div className="flex items-center gap-2 mb-5">
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#22C55E' }} />
        <h2 className="text-sm font-semibold text-text-primary">Platform Status</h2>
      </div>

      {/* Overall indicator */}
      <div className="flex items-center gap-3 mb-5 p-3 rounded-lg" style={{ background: 'rgba(244, 247, 250, 0.03)' }}>
        <div className="relative w-12 h-12 flex items-center justify-center">
          <svg width="48" height="48" viewBox="0 0 48 48" className="absolute inset-0">
            <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(244, 247, 250, 0.05)" strokeWidth="3" />
            <motion.circle
              cx="24" cy="24" r="20" fill="none"
              stroke={healthColor[status.overall.health]}
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${status.healthyPercent * 1.256} 125.6`}
              transform="rotate(-90 24 24)"
              initial={{ strokeDasharray: '0 125.6' }}
              animate={{ strokeDasharray: `${status.healthyPercent * 1.256} 125.6` }}
              transition={{ duration: 0.8, ease: m.easing.out }}
            />
          </svg>
          <span
            className="text-xs font-bold tabular-nums"
            style={{ color: healthColor[status.overall.health] }}
          >
            {status.healthyPercent}%
          </span>
        </div>
        <div>
          <div className="text-sm font-semibold text-text-primary">Overall Platform Health</div>
          <div className="text-[10px]" style={{ color: healthColor[status.overall.health] }}>
            {healthLabel[status.overall.health]}
          </div>
        </div>
      </div>

      {/* Module rows */}
      <div className="space-y-2">
        {modules.map((mod, i) => (
          <motion.div
            key={mod.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.05 + i * 0.03, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-between py-2 px-2 rounded-lg hover:bg-white/[0.02] transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full" style={{ background: healthColor[mod.health] }} />
              <div>
                <div className="text-xs font-medium text-text-primary">{mod.name}</div>
                <div className="text-[9px] text-text-muted/50">{mod.subtitle}</div>
              </div>
            </div>
            <span
              className="text-[9px] uppercase tracking-wider font-medium"
              style={{ color: healthColor[mod.health] }}
            >
              {healthLabel[mod.health]}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
