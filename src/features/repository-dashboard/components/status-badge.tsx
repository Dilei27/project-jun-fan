'use client';

import type { AnalysisStatus } from '@/core/repository';

const statusConfig: Record<AnalysisStatus, { label: string; color: string; pulse: boolean }> = {
  pending:   { label: 'Pendente',    color: '#687385', pulse: false },
  scanning:  { label: 'Escaneando',  color: '#EAB308', pulse: true },
  building:  { label: 'Construindo', color: '#4F8CFF', pulse: true },
  complete:  { label: 'Completo',    color: '#22C55E', pulse: false },
  error:     { label: 'Erro',        color: '#EF4444', pulse: false },
};

interface StatusBadgeProps {
  status: AnalysisStatus
  pulse?: boolean
  label?: string
}

export function StatusBadge({ status, pulse, label }: StatusBadgeProps) {
  const config = statusConfig[status]
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-medium uppercase tracking-wider"
      style={{
        background: `${config.color}12`,
        color: config.color,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{
          background: config.color,
          animation: (pulse ?? config.pulse) ? 'sync-pulse 2.4s ease-in-out infinite' : 'none',
        }}
      />
      {label ?? config.label}
    </span>
  )
}
