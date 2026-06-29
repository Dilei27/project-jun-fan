'use client';

import { motion } from 'framer-motion';
import { Shield, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion as m } from '@/design-system/motion';
import { getDecisions } from '@/lib/content';

const decisionTypes = [
  { label: 'Stack', color: '#4F8CFF' },
  { label: 'Architecture', color: '#22D3EE' },
  { label: 'Infra', color: '#F59E0B' },
  { label: 'Process', color: '#C084FC' },
  { label: 'Security', color: '#FB923C' },
];

function getTypeColor(_id: string): { label: string; color: string } {
  return decisionTypes[Math.abs(_id.split('').reduce((a, c) => a + c.charCodeAt(0), 0)) % decisionTypes.length];
}

const mockResponsibles = ['João', 'Maria', 'Pedro', 'Ana', 'Lucas'];

function getResponsible(id: string): string {
  return mockResponsibles[Math.abs(id.split('').reduce((a, c) => a + c.charCodeAt(0), 0)) % mockResponsibles.length];
}

function getImpact(id: string): string {
  const impacts = ['Alto', 'Médio', 'Crítico', 'Baixo'];
  return impacts[Math.abs(id.split('').reduce((a, c) => a + c.charCodeAt(0), 0)) % impacts.length];
}

function getDate(index: number): string {
  const days = [2, 5, 7, 10, 14];
  return `há ${days[index % days.length]} dias`;
}

export function RecentDecisions() {
  const decisions = getDecisions();

  if (decisions.length === 0) {
    return (
      <section className="mb-8">
        <div className="rounded-xl p-8 text-center" style={{ background: 'rgba(10, 14, 22, 0.6)', border: '1px solid rgba(244, 247, 250, 0.06)' }}>
          <Shield size={20} className="text-text-muted/30 mx-auto mb-2" />
          <p className="text-sm text-text-muted">Nenhuma decisão registrada ainda.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-xl"
        style={{
          background: 'rgba(10, 14, 22, 0.6)',
          border: '1px solid rgba(244, 247, 250, 0.06)',
          boxShadow: '0 4px 16px -8px rgba(0,0,0,0.4)',
        }}
      >
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <div className="flex items-center gap-2">
            <Shield size={14} className="text-text-muted" />
            <h3 className="text-sm font-semibold text-text-primary">Recent Decisions</h3>
            <span className="text-[10px] text-text-muted/50">· {decisions.length} ADRs</span>
          </div>
          <Link
            href="/decisoes/"
            className="text-[11px] text-accent-qa hover:underline transition-all"
          >
            Ver todas →
          </Link>
        </div>

        <div className="divide-y" style={{ borderColor: 'rgba(244, 247, 250, 0.04)' }}>
          {decisions.slice(0, 5).map((d, i) => {
            const typeInfo = getTypeColor(d.id);
            return (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={`/decisoes/#${d.id}`}
                  className="flex items-center gap-3 px-5 py-3 hover:bg-white/[0.02] transition-colors duration-150 group"
                >
                  <span
                    className="px-1.5 py-0.5 rounded text-[8px] font-medium uppercase tracking-wider shrink-0"
                    style={{
                      background: `${typeInfo.color}12`,
                      color: typeInfo.color,
                      border: `1px solid ${typeInfo.color}20`,
                    }}
                  >
                    {typeInfo.label}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="text-[12px] text-text-secondary truncate block group-hover:text-text-primary transition-colors">
                      {d.decision.length > 60 ? d.decision.slice(0, 60) + '…' : d.decision}
                    </span>
                  </div>
                  <span className="text-[9px] text-text-muted/50 font-mono hidden sm:block">{getResponsible(d.id)}</span>
                  <span
                    className={`text-[9px] font-mono hidden md:block ${
                      getImpact(d.id) === 'Crítico' ? 'text-error' : getImpact(d.id) === 'Alto' ? 'text-warning' : 'text-text-muted/50'
                    }`}
                  >
                    {getImpact(d.id)}
                  </span>
                  <span className="text-[9px] text-text-muted/30 font-mono">{getDate(i)}</span>
                  <ArrowRight size={12} className="text-text-muted/20 group-hover:text-accent-qa transition-colors duration-200 shrink-0" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
