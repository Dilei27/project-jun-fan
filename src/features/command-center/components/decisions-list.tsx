'use client';

import { motion } from 'framer-motion';
import { getDecisions } from '@/lib/content';
import { DecisionCard } from '@/components/cards/decision-card';
import { motion as m } from '@/design-system/motion';

export function DecisionsList() {
  const decisions = getDecisions();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: m.stagger.default } },
      }}
      className="space-y-4"
    >
      {decisions.map(d => (
        <motion.div
          key={d.id}
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0, transition: { duration: m.duration.normal, ease: m.easing.out } },
          }}
          id={d.id}
        >
          <DecisionCard decision={d} />
        </motion.div>
      ))}
    </motion.div>
  );
}
