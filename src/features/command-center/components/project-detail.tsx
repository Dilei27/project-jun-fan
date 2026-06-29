'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { motion as m } from '@/design-system/motion';
import type { Project } from '@/types';

const cardShadow =
  'inset 0 1px 0 0 rgba(244, 247, 250, 0.03), 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 4px 12px -4px rgba(0, 0, 0, 0.3)';

export function ProjectDetail({ project }: { project: Project }) {
  const statusLabel = project.status === 'concluido' ? 'Concluído' : 'Em andamento';
  const statusVariant =
    project.status === 'concluido' ? 'success' : ('warning' as const);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: m.stagger.default, delayChildren: 0.05 } },
      }}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 12 },
          visible: { opacity: 1, y: 0, transition: { duration: m.duration.normal, ease: m.easing.out } },
        }}
        className="flex items-start gap-4 mb-8"
      >
        <h1 className="text-3xl font-extrabold text-text-primary tracking-[-0.025em] text-balance">
          {project.title}
        </h1>
        <Badge variant={statusVariant} className="shrink-0 mt-1">{statusLabel}</Badge>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0, transition: { duration: m.duration.normal, ease: m.easing.out } },
          }}
          className="jf-lift p-5 bg-surface-default/80 border border-border-subtle/60 rounded-lg"
          style={{ boxShadow: cardShadow }}
        >
          <h2 className="text-xs font-semibold text-danger uppercase tracking-wider mb-2">
            Problema
          </h2>
          <p className="text-sm text-text-secondary">{project.problem}</p>
        </motion.div>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0, transition: { duration: m.duration.normal, ease: m.easing.out } },
          }}
          className="jf-lift p-5 bg-surface-default/80 border border-border-subtle/60 rounded-lg"
          style={{ boxShadow: cardShadow }}
        >
          <h2 className="text-xs font-semibold text-success uppercase tracking-wider mb-2">
            Solução
          </h2>
          <p className="text-sm text-text-secondary">{project.solution}</p>
        </motion.div>
      </div>

      <motion.div
        variants={{
          hidden: { opacity: 0, y: 12 },
          visible: { opacity: 1, y: 0, transition: { duration: m.duration.normal, ease: m.easing.out } },
        }}
        className="mb-8"
      >
        <h2 className="text-lg font-semibold text-text-primary mb-3 tracking-[-0.01em]">
          Stack
        </h2>
        <div className="flex flex-wrap gap-2">
          {project.stack.map(s => (
            <span
              key={s}
              className="px-3 py-1.5 text-sm text-text-secondary bg-surface-soft border border-border-subtle/60 rounded-md transition-colors duration-200 hover:border-border-strong hover:text-text-primary"
            >
              {s}
            </span>
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={{
          hidden: { opacity: 0, y: 12 },
          visible: { opacity: 1, y: 0, transition: { duration: m.duration.normal, ease: m.easing.out } },
        }}
        className="mb-8"
      >
        <h2 className="text-lg font-semibold text-text-primary mb-3 tracking-[-0.01em]">
          Impacto
        </h2>
        <p className="text-sm text-text-secondary bg-surface-default/80 border border-border-subtle/60 rounded-lg p-4" style={{ boxShadow: cardShadow }}>
          {project.impact}
        </p>
      </motion.div>

      {project.decisions.length > 0 && (
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0, transition: { duration: m.duration.normal, ease: m.easing.out } },
          }}
        >
          <h2 className="text-lg font-semibold text-text-primary mb-3 tracking-[-0.01em]">
            Decisões Técnicas
          </h2>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: m.stagger.tight } },
            }}
            className="space-y-2"
          >
            {project.decisions.map(d => (
              <motion.div
                key={d}
                variants={{
                  hidden: { opacity: 0, x: -8 },
                  visible: { opacity: 1, x: 0, transition: { duration: m.duration.fast, ease: m.easing.out } },
                }}
                className="flex items-center gap-2 p-3 bg-surface-default/80 border border-border-subtle/60 rounded-lg text-sm text-text-secondary jf-lift"
                style={{ boxShadow: cardShadow }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-accent-qa shrink-0" />
                {d}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
