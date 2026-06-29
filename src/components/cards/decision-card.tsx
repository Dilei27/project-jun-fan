'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { motion as m } from '@/design-system/motion';
import type { Decision } from '@/types';

export function DecisionCard({ decision }: { decision: Decision }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: m.duration.normal, ease: m.easing.out }}
    >
      <Card hover className="mb-4">
        <h3 className="text-base font-semibold text-text-primary mb-2 tracking-[-0.01em]">
          {decision.decision}
        </h3>
        <p className="text-sm text-text-secondary mb-3 leading-relaxed">{decision.context}</p>
        <div className="space-y-2 text-sm">
          <div>
            <span className="text-[10px] font-semibold text-text-muted uppercase tracking-[0.14em]">
              Racional
            </span>
            <p className="text-text-secondary mt-0.5">{decision.rationale}</p>
          </div>
          <div>
            <span className="text-[10px] font-semibold text-text-muted uppercase tracking-[0.14em]">
              Trade-offs
            </span>
            <p className="text-text-secondary mt-0.5">{decision.tradeoffs}</p>
          </div>
          <div>
            <span className="text-[10px] font-semibold text-text-muted uppercase tracking-[0.14em]">
              Impacto
            </span>
            <p className="text-text-secondary mt-0.5">{decision.impact}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
