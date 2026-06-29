'use client';

import Link from 'next/link';
import { ArrowRight, GitBranch, FileText, Shield, Command, ExternalLink } from 'lucide-react';

interface CrossReference {
  label: string
  href: string
  type: 'graph' | 'docs' | 'decision' | 'qa'
}

const typeConfig: Record<CrossReference['type'], { icon: typeof GitBranch; color: string }> = {
  graph: { icon: GitBranch, color: '#22C55E' },
  docs: { icon: FileText, color: '#EAB308' },
  decision: { icon: Shield, color: '#C084FC' },
  qa: { icon: Command, color: '#4F8CFF' },
};

export function CrossReferences({ references, title = 'Cross References' }: {
  references: CrossReference[]
  title?: string
}) {
  if (references.length === 0) return null;

  return (
    <div
      className="rounded-xl p-4"
      style={{
        background: 'rgba(10, 14, 22, 0.6)',
        border: '1px solid rgba(244, 247, 250, 0.05)',
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <ExternalLink size={12} className="text-text-muted" />
        <h3 className="text-xs font-semibold text-text-primary">{title}</h3>
      </div>

      <div className="space-y-1.5">
        {references.map((ref, i) => {
          const { icon: Icon, color } = typeConfig[ref.type];
          return (
            <Link
              key={`${ref.type}-${ref.label}-${i}`}
              href={ref.href}
              className="group flex items-center gap-2.5 py-1.5 px-2 rounded-lg transition-colors hover:bg-white/[0.03]"
            >
              <div
                className="w-5 h-5 rounded flex items-center justify-center shrink-0"
                style={{ background: `${color}12` }}
              >
                <Icon size={10} style={{ color }} />
              </div>
              <span className="flex-1 text-[11px] text-text-secondary group-hover:text-text-primary transition-colors truncate">
                {ref.label}
              </span>
              <ArrowRight size={10} className="text-text-muted/20 group-hover:text-text-muted/60 transition-colors shrink-0" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function getModuleReferences(moduleId: string): CrossReference[] {
  const all: Record<string, CrossReference[]> = {
    home: [
      { label: 'Explorar Knowledge Graph', href: '/knowledge-graph/', type: 'graph' },
      { label: 'Abrir Command Center', href: '/command-center/', type: 'qa' },
      { label: 'Ver Decisões Técnicas', href: '/decisoes/', type: 'decision' },
      { label: 'Ler Documentação', href: '/docs/', type: 'docs' },
    ],
    'knowledge-graph': [
      { label: 'Ver métricas no Command Center', href: '/command-center/', type: 'qa' },
      { label: 'Decisões de arquitetura relacionadas', href: '/decisoes/', type: 'decision' },
      { label: 'Documentação da plataforma', href: '/docs/', type: 'docs' },
      { label: 'Voltar para Home', href: '/', type: 'qa' },
    ],
    'command-center': [
      { label: 'Explorar nodes no Knowledge Graph', href: '/knowledge-graph/', type: 'graph' },
      { label: 'Decisões que impactam QA', href: '/decisoes/', type: 'decision' },
      { label: 'Documentação dos produtos', href: '/docs/', type: 'docs' },
      { label: 'Voltar para Home', href: '/', type: 'qa' },
    ],
    docs: [
      { label: 'Ver no Knowledge Graph', href: '/knowledge-graph/', type: 'graph' },
      { label: 'Decisões de arquitetura', href: '/decisoes/', type: 'decision' },
      { label: 'QA Command Center', href: '/command-center/', type: 'qa' },
      { label: 'Voltar para Home', href: '/', type: 'qa' },
    ],
    decisoes: [
      { label: 'Explorar no Knowledge Graph', href: '/knowledge-graph/', type: 'graph' },
      { label: 'Impacto no Command Center', href: '/command-center/', type: 'qa' },
      { label: 'Documentação relacionada', href: '/docs/', type: 'docs' },
      { label: 'Engineering Twin', href: '/twin/', type: 'graph' },
      { label: 'Voltar para Home', href: '/', type: 'qa' },
    ],
    twin: [
      { label: 'Explorar Knowledge Graph', href: '/knowledge-graph/', type: 'graph' },
      { label: 'Decision Center', href: '/decisoes/', type: 'decision' },
      { label: 'QA Command Center', href: '/command-center/', type: 'qa' },
      { label: 'Voltar para Home', href: '/', type: 'qa' },
    ],
  };

  return all[moduleId] || all.home;
}
