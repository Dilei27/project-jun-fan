'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Shield, GitBranch, FileText, ArrowRight, Calendar, Tag } from 'lucide-react';
import Link from 'next/link';
import { MockAdapter } from '@/core/knowledge/adapters/mock-adapter';
import { KnowledgeRepository } from '@/core/knowledge/repositories/knowledge-repository';
import { findNodeById } from '@/core/knowledge/services/node-service';
import { motion as m } from '@/design-system/motion';
import { PageEntry } from '@/components/shared/page-entry';
import { CrossReferences, getModuleReferences } from '@/components/platform/cross-references';

const decisionTypes = [
  { label: 'Stack', color: '#4F8CFF' },
  { label: 'Arquitetura', color: '#C084FC' },
  { label: 'Infra', color: '#22D3EE' },
  { label: 'Processo', color: '#F59E0B' },
];

export default function DecisionsPage() {
  const { decisions, stats } = useMemo(() => {
    const repo = new KnowledgeRepository(new MockAdapter());
    repo.initialize();
    const rawDecisions = repo.getAllDecisions();
    const decisionNodes = repo.getIndex().getByType('decision');

    const stats = {
      total: rawDecisions.length,
      modules: new Set(decisionNodes.flatMap(n => n.tags)).size,
      relatedNodes: decisionNodes.reduce((sum, n) => sum + n.relatedNodes.length, 0),
    };

    const decisions = rawDecisions.map((d, i) => {
      const node = findNodeById(repo, d.nodeId);
      const relatedEdges = node ? repo.getIndex().getEdges(node.id) : [];
      return {
        id: d.nodeId.replace('decision-', ''),
        ...d,
        type: decisionTypes[i % decisionTypes.length],
        status: node?.status ?? 'concluido',
        createdAt: node?.createdAt ?? '',
        relatedCount: relatedEdges.length,
        relatedModules: [...new Set(relatedEdges.map(e => {
          const target = findNodeById(repo, e.source === node?.id ? e.target : e.source);
          return target?.type;
        }).filter(Boolean))] as string[],
      };
    });

    return { decisions, stats };
  }, []);

  return (
    <PageEntry className="max-w-[1440px] mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-text-primary mb-2 tracking-[-0.025em]">
            Decision Center
          </h1>
          <p className="text-text-secondary max-w-xl text-sm">
            Central de decisões arquiteturais — registro de trade-offs, impactos e
            relacionamentos entre módulos da plataforma.
          </p>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-1.5 text-[10px] text-text-muted/60">
            <Shield size={12} className="text-accent-qa" />
            <span className="tabular-nums font-medium text-text-primary">{stats.total}</span>
            <span>decisões</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-text-muted/60">
            <GitBranch size={12} style={{ color: '#22C55E' }} />
            <span className="tabular-nums font-medium text-text-primary">{stats.modules}</span>
            <span>módulos</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-text-muted/60">
            <FileText size={12} style={{ color: '#EAB308' }} />
            <span className="tabular-nums font-medium text-text-primary">{stats.relatedNodes}</span>
            <span>relações</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Decision list */}
        <div className="lg:col-span-3">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: m.stagger.default, delayChildren: 0.05 } },
            }}
            className="space-y-4"
          >
            {decisions.map((d, i) => (
              <motion.div
                key={d.id}
                id={d.id}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0, transition: { duration: m.duration.normal, ease: m.easing.out } },
                }}
                className="rounded-xl p-5 transition-all duration-200"
                style={{
                  background: 'rgba(10, 14, 22, 0.6)',
                  border: '1px solid rgba(244, 247, 250, 0.05)',
                }}
              >
                {/* Header row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span
                        className="text-[9px] font-medium px-1.5 py-0.5 rounded uppercase tracking-wider"
                        style={{
                          background: `${d.type.color}15`,
                          color: d.type.color,
                        }}
                      >
                        {d.type.label}
                      </span>
                      <span
                        className="text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider"
                        style={{
                          background: d.status === 'concluido' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                          color: d.status === 'concluido' ? '#22C55E' : '#F59E0B',
                        }}
                      >
                        {d.status}
                      </span>
                    </div>
                    <h2 className="text-sm font-semibold text-text-primary leading-snug">
                      {d.decision}
                    </h2>
                  </div>
                  <div className="flex items-center gap-1.5 text-[9px] text-text-muted/40 shrink-0">
                    <Calendar size={9} />
                    <span>{d.createdAt.substring(0, 10)}</span>
                  </div>
                </div>

                {/* Context */}
                <p className="text-[11px] text-text-secondary leading-relaxed mb-3">
                  {d.context}
                </p>

                {/* Rationale + Tradeoffs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <div className="p-2.5 rounded-lg" style={{ background: 'rgba(244, 247, 250, 0.03)' }}>
                    <span className="text-[8px] uppercase tracking-wider text-text-muted/50 font-medium">Rationale</span>
                    <p className="text-[10px] text-text-secondary mt-1 leading-relaxed">{d.rationale}</p>
                  </div>
                  <div className="p-2.5 rounded-lg" style={{ background: 'rgba(244, 247, 250, 0.03)' }}>
                    <span className="text-[8px] uppercase tracking-wider text-text-muted/50 font-medium">Trade-offs</span>
                    <p className="text-[10px] text-text-secondary mt-1 leading-relaxed">{d.tradeoffs}</p>
                  </div>
                </div>

                {/* Impact */}
                <div className="mb-3">
                  <span className="text-[8px] uppercase tracking-wider text-text-muted/50 font-medium">Impacto</span>
                  <p className="text-[10px] text-text-secondary mt-0.5 leading-relaxed">{d.impact}</p>
                </div>

                {/* Footer: related modules + actions */}
                <div className="flex items-center justify-between pt-2" style={{ borderTop: '1px solid rgba(244, 247, 250, 0.03)' }}>
                  <div className="flex items-center gap-2 flex-wrap">
                    {d.relatedModules.slice(0, 3).map((mod) => (
                      <span
                        key={mod}
                        className="flex items-center gap-1 text-[9px] text-text-muted/50"
                      >
                        <Tag size={8} />
                        {mod}
                      </span>
                    ))}
                    <span className="text-[9px] text-text-muted/30">{d.relatedCount} conexões</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/knowledge-graph/`}
                      className="flex items-center gap-1 text-[9px] text-text-muted/40 hover:text-accent-qa transition-colors"
                    >
                      <GitBranch size={9} />
                      Graph
                    </Link>
                    <Link
                      href={`/docs/`}
                      className="flex items-center gap-1 text-[9px] text-text-muted/40 hover:text-accent-qa transition-colors"
                    >
                      <FileText size={9} />
                      Docs
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <CrossReferences references={getModuleReferences('decisoes')} title="Navegação Rápida" />
        </div>
      </div>
    </PageEntry>
  );
}
