'use client';

import { motion } from 'framer-motion';
import { motion as m } from '@/design-system/motion';

interface FlowStep {
  label: string;
  description?: string;
}

const defaultSteps: FlowStep[] = [
  { label: 'Entrada', description: 'Home / Hub' },
  { label: 'Produtos', description: 'QA, WhatsApp, Vigilante' },
  { label: 'Projetos', description: 'Cases reais' },
  { label: 'Decisões', description: 'ADR e trade-offs' },
  { label: 'Documentação', description: 'Arquitetura e setup' },
  { label: 'AI', description: 'AI Dock contextual' },
];

const cardShadow =
  'inset 0 1px 0 0 rgba(244, 247, 250, 0.03), 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 4px 12px -4px rgba(0, 0, 0, 0.3)';

export function ArchitectureFlow({ steps }: { steps?: FlowStep[] }) {
  const items = steps || defaultSteps;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: m.stagger.default, delayChildren: 0.05 } },
      }}
      className="flex flex-wrap items-center gap-2 p-5 bg-surface-default/80 border border-border-subtle/60 rounded-lg"
      style={{ boxShadow: cardShadow }}
    >
      {items.map((step, i) => (
        <motion.span
          key={step.label}
          variants={{
            hidden: { opacity: 0, y: 8 },
            visible: { opacity: 1, y: 0, transition: { duration: m.duration.normal, ease: m.easing.out } },
          }}
          className="flex items-center gap-2"
        >
          <span
            className="flex flex-col px-3 py-2 bg-surface-soft/60 text-text-secondary text-sm rounded-md border border-border-subtle/60 transition-colors duration-200 hover:border-border-strong hover:text-text-primary"
            style={{ boxShadow: 'inset 0 1px 0 0 rgba(244, 247, 250, 0.03)' }}
          >
            <span className="font-medium">{step.label}</span>
            {step.description && (
              <span className="text-xs text-text-muted">{step.description}</span>
            )}
          </span>
          {i < items.length - 1 && (
            <motion.span
              aria-hidden
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: m.duration.fast, ease: m.easing.out, delay: i * 0.04 }}
              className="text-text-muted shrink-0"
            >
              →
            </motion.span>
          )}
        </motion.span>
      ))}
    </motion.div>
  );
}
