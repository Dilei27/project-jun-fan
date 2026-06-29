'use client';

import { motion } from 'framer-motion';
import { getDecisions } from '@/lib/content';
import { DecisionCard } from '@/components/cards/decision-card';
import { PageEntry } from '@/components/shared/page-entry';
import { motion as m } from '@/design-system/motion';

export default function DecisionsPage() {
  const decisions = getDecisions();

  return (
    <PageEntry className="max-w-[1440px] mx-auto px-6 py-10">
      <h1 className="text-3xl font-extrabold text-text-primary mb-2 tracking-[-0.025em] text-balance">
        Decisões Técnicas
      </h1>
      <p className="text-text-secondary mb-8 max-w-xl">
        Registro de decisões arquiteturais, trade-offs e impactos do ecossistema Jun Fan.
      </p>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: m.stagger.default, delayChildren: 0.1 } },
        }}
        className="max-w-2xl"
      >
        {decisions.map(d => (
          <motion.div
            key={d.id}
            id={d.id}
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { duration: m.duration.normal, ease: m.easing.out } },
            }}
          >
            <DecisionCard decision={d} />
          </motion.div>
        ))}
      </motion.div>
    </PageEntry>
  );
}
