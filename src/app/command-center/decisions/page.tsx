import Link from 'next/link';
import { getDecisions } from '@/lib/content';
import { ArrowLeft } from 'lucide-react';

export default function DecisionsPage() {
  const decisions = getDecisions();

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-10">
      <Link href="/command-center/" className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-text-primary mb-6 transition-colors">
        <ArrowLeft size={14} /> Command Center
      </Link>

      <h1 className="text-3xl font-extrabold text-text-primary mb-2">Decisões Técnicas</h1>
      <p className="text-text-secondary mb-8 max-w-xl">Registro de decisões arquiteturais, trade-offs e impactos do ecossistema.</p>

      <div className="max-w-2xl space-y-4">
        {decisions.map(d => (
          <div key={d.id} id={d.id} className="p-5 bg-surface-default border border-border-subtle rounded-lg hover:bg-surface-elevated transition-colors">
            <h2 className="text-base font-semibold text-text-primary mb-2">{d.decision}</h2>
            <p className="text-sm text-text-secondary mb-3">{d.context}</p>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Racional</span>
                <p className="text-text-secondary mt-0.5">{d.rationale}</p>
              </div>
              <div>
                <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Trade-offs</span>
                <p className="text-text-secondary mt-0.5">{d.tradeoffs}</p>
              </div>
              <div>
                <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Impacto</span>
                <p className="text-text-secondary mt-0.5">{d.impact}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
