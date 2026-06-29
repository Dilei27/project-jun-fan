'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { getDecisions } from '@/lib/content';
import { ArrowLeft } from 'lucide-react';
import { PageEntry } from '@/components/shared/page-entry';
import { motion as m } from '@/design-system/motion';

const cardShadow =
  'inset 0 1px 0 0 rgba(244, 247, 250, 0.03), 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 4px 12px -4px rgba(0, 0, 0, 0.3)';

export default function DecisionsPage() {
  const decisions = getDecisions();

  return (
    <PageEntry className="max-w-[1440px] mx-auto px-6 py-10">
      <Link
        href="/command-center/"
        className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-text-primary mb-6 transition-colors duration-200"
      >
        <ArrowLeft size={14} /> Command Center
      </Link>

      <h1 className="text-3xl font-extrabold text-text-primary mb-2 tracking-[-0.025em] text-balance">
        Decisões Técnicas
      </h1>
      <p className="text-text-secondary mb-8 max-w-xl">
        Registro de decisões arquiteturais, trade-offs e impactos do ecossistema.
      </p>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: m.stagger.default, delayChildren: 0.1 } },
        }}
        className="max-w-2xl space-y-4"
      >
        {decisions.map(d => (
          <motion.div
            key={d.id}
            id={d.id}
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { duration: m.duration.normal, ease: m.easing.out } },
            }}
            whileHover={{ y: -2, transition: { duration: m.duration.fast, ease: m.easing.out } }}
            className="jf-lift p-5 bg-surface-default/80 border border-border-subtle/60 rounded-lg"
            style={{ boxShadow: cardShadow }}
          >
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
          </motion.div>
        ))}
      </motion.div>
    </PageEntry>
  );
}
