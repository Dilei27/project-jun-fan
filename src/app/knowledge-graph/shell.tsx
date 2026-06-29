'use client';

import { motion } from 'framer-motion';
import { KnowledgeExplorer } from '@/features/knowledge-graph/knowledge-explorer';
import { motion as m } from '@/design-system/motion';

export function KnowledgeGraphShell() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: m.duration.slow, ease: m.easing.out }}
      className="h-[calc(100vh-3.5rem)] min-h-[680px] w-full flex flex-col"
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: m.duration.normal, ease: m.easing.out, delay: 0.05 }}
        className="px-6 pt-6 pb-3 flex items-baseline justify-between shrink-0"
      >
        <div>
          <h1 className="text-2xl font-extrabold text-text-primary tracking-[-0.025em] text-balance">
            Knowledge Explorer
          </h1>
          <p className="text-sm text-text-muted mt-1">
            Explore o ecossistema Project Jun Fan — produtos, projetos, decisões,
            agentes, skills e suas conexões.
          </p>
        </div>
      </motion.div>
      <div className="flex-1 min-h-0 px-4 pb-4">
        <div
          className="relative w-full h-full min-h-[600px] bg-surface-default/40 backdrop-blur-sm border border-border-subtle/40 rounded-2xl overflow-hidden"
          style={{
            boxShadow:
              'inset 0 1px 0 0 rgba(244, 247, 250, 0.04), 0 16px 48px -12px rgba(0, 0, 0, 0.5), 0 32px 80px -16px rgba(0, 0, 0, 0.4)',
          }}
        >
          <KnowledgeExplorer />
        </div>
      </div>
    </motion.div>
  );
}
