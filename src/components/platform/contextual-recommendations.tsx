'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, GitFork, Shield, FileText, BookOpen, Siren } from 'lucide-react';

interface Recommendation {
  label: string
  href: string
  icon: typeof ArrowRight
  description: string
}

const MODULE_RECOMMENDATIONS: Record<string, Recommendation[]> = {
  home: [
    { label: 'Explorar Knowledge Graph', href: '/knowledge-graph/', icon: GitFork, description: 'Visualize conexões entre entidades' },
    { label: 'Ver Decisões Técnicas', href: '/decisoes/', icon: Shield, description: 'Histórico de ADRs e trade-offs' },
    { label: 'Abrir Documentação', href: '/docs/', icon: FileText, description: 'Guia de produtos e setup' },
  ],
  'knowledge-graph': [
    { label: 'Ver Decisões Relacionadas', href: '/decisoes/', icon: Shield, description: 'ADRs conectadas ao grafo' },
    { label: 'Abrir Documentação', href: '/docs/', icon: FileText, description: 'Documentação técnica' },
    { label: 'Inspecionar QA', href: '/command-center/', icon: Siren, description: 'Métricas e qualidade' },
  ],
  'command-center': [
    { label: 'Abrir Knowledge Graph', href: '/knowledge-graph/', icon: GitFork, description: 'Explore conexões' },
    { label: 'Ver Testes Relacionados', href: '/command-center/', icon: Shield, description: 'Suites de teste por módulo' },
    { label: 'Consultar Arquitetura', href: '/command-center/architecture/', icon: BookOpen, description: 'Diagramas e fluxos' },
  ],
  docs: [
    { label: 'Ver Decisões', href: '/decisoes/', icon: Shield, description: 'ADRs relacionadas' },
    { label: 'Explorar Graph', href: '/knowledge-graph/', icon: GitFork, description: 'Conexões entre docs' },
    { label: 'Ver Componentes', href: '/twin/', icon: Siren, description: 'Digital Twin da plataforma' },
  ],
  decisoes: [
    { label: 'Explorar Graph', href: '/knowledge-graph/', icon: GitFork, description: 'Visualize decisões no grafo' },
    { label: 'Ver Documentação', href: '/docs/', icon: FileText, description: 'Contexto técnico' },
    { label: 'Abrir QA', href: '/command-center/', icon: Shield, description: 'Impacto nas métricas' },
  ],
  twin: [
    { label: 'Ver no Graph', href: '/knowledge-graph/', icon: GitFork, description: 'Componentes no ecossistema' },
    { label: 'Documentação', href: '/docs/', icon: FileText, description: 'Detalhes dos componentes' },
    { label: 'Decisões', href: '/decisoes/', icon: Shield, description: 'ADRs que afetam o twin' },
  ],
};

const FALLBACK: Recommendation[] = [
  { label: 'Home', href: '/', icon: ArrowRight, description: 'Voltar ao início' },
  { label: 'Knowledge Graph', href: '/knowledge-graph/', icon: GitFork, description: 'Visualizar o ecossistema' },
  { label: 'Documentação', href: '/docs/', icon: FileText, description: 'Guias e referências' },
];

export function ContextualRecommendations({ module }: { module?: string }) {
  const recs = useMemo(() => {
    const key = module ?? '';
    return MODULE_RECOMMENDATIONS[key] || MODULE_RECOMMENDATIONS.home || FALLBACK;
  }, [module]);

  return (
    <div>
      <h4 className="text-[9px] font-medium uppercase tracking-[0.14em] text-text-muted/50 mb-2">
        Próximos passos
      </h4>
      <div className="space-y-1">
        {recs.slice(0, 3).map((rec, i) => (
          <motion.div
            key={rec.href}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.06 }}
          >
            <Link
              href={rec.href}
              className="group flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[10px] text-text-muted hover:text-text-primary hover:bg-white/5 transition-all"
            >
              <rec.icon size={10} className="text-text-muted/40 group-hover:text-accent-qa transition-colors" />
              <span className="font-medium">{rec.label}</span>
              <ArrowRight size={8} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-text-muted/30" />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
