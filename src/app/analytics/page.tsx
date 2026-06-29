'use client';

import { motion } from 'framer-motion';
import { getProducts, getProjects, getDocs, getDecisions } from '@/lib/content';
import { FileText, GitBranch, Lightbulb, Layers } from 'lucide-react';
import { PageEntry } from '@/components/shared/page-entry';
import { motion as m } from '@/design-system/motion';

const cardShadow =
  'inset 0 1px 0 0 rgba(244, 247, 250, 0.03), 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 4px 12px -4px rgba(0, 0, 0, 0.3)';

export default function AnalyticsPage() {
  const products = getProducts();
  const projects = getProjects();
  const docs = getDocs();
  const decisions = getDecisions();

  const stats = [
    { label: 'Produtos', value: products.length, icon: Layers },
    { label: 'Projetos', value: projects.length, icon: GitBranch },
    { label: 'Documentos', value: docs.length, icon: FileText },
    { label: 'Decisões', value: decisions.length, icon: Lightbulb },
  ];

  return (
    <PageEntry className="max-w-[1440px] mx-auto px-6 py-10">
      <h1 className="text-3xl font-extrabold text-text-primary mb-2 tracking-[-0.025em] text-balance">
        Analytics
      </h1>
      <p className="text-text-secondary mb-8 max-w-xl">
        Visão geral do ecossistema Jun Fan.
      </p>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: m.stagger.default, delayChildren: 0.1 } },
        }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
      >
        {stats.map(stat => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0, transition: { duration: m.duration.normal, ease: m.easing.out } },
              }}
              whileHover={{ y: -3, transition: { duration: m.duration.fast, ease: m.easing.out } }}
              className="jf-lift p-5 bg-surface-default/80 border border-border-subtle/60 rounded-lg text-center"
              style={{ boxShadow: cardShadow }}
            >
              <Icon size={20} className="text-accent-qa mx-auto mb-2" />
              <div className="text-3xl font-bold text-text-primary tabular-nums">{stat.value}</div>
              <div className="text-sm text-text-muted mt-1">{stat.label}</div>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-5 bg-surface-default/80 border border-border-subtle/60 rounded-lg" style={{ boxShadow: cardShadow }}>
          <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-4">
            Produtos
          </h2>
          <div className="space-y-3">
            {products.map(p => (
              <div key={p.id} className="flex items-center justify-between text-sm">
                <span className="text-text-primary">{p.name}</span>
                <span className={`text-xs ${p.status === 'online' ? 'text-success' : 'text-warning'}`}>
                  {p.status}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="p-5 bg-surface-default/80 border border-border-subtle/60 rounded-lg" style={{ boxShadow: cardShadow }}>
          <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-4">
            Projetos
          </h2>
          <div className="space-y-3">
            {projects.map(p => (
              <div key={p.id} className="flex items-center justify-between text-sm">
                <span className="text-text-primary">{p.title}</span>
                <span className={`text-xs ${p.status === 'concluido' ? 'text-success' : 'text-warning'}`}>
                  {p.status === 'concluido' ? 'Concluído' : 'Em andamento'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageEntry>
  );
}
