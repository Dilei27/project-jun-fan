'use client';

import { motion, type Variants } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { TiltCard } from '@/components/shared/tilt-card';
import { motion as m } from '@/design-system/motion';
import type { Project } from '@/types';
import Link from 'next/link';

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: m.duration.normal, ease: [...m.easing.out] },
  },
};

export function ProjectCard({ project }: { project: Project }) {
  const statusLabel = project.status === 'concluido' ? 'Concluído' : 'Em andamento';
  const statusVariant = project.status === 'concluido' ? 'success' : 'warning';

  return (
    <motion.div variants={itemVariants} className="h-full">
      <Link href={`/projeto/${project.id}/`} className="block h-full">
        <TiltCard
          maxTilt={2}
          accentRgb="96, 165, 250" // project blue
          spotlightIntensity={0.12}
          liftOnHover={false}
          className="h-full"
        >
          <article
            className="jf-lift h-full bg-surface-default/80 border border-border-subtle/60 rounded-lg p-6 transition-[box-shadow,border-color,background-color] duration-300"
            style={{
              boxShadow:
                'inset 0 1px 0 0 rgba(244, 247, 250, 0.03), 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 4px 12px -4px rgba(0, 0, 0, 0.3)',
            }}
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-base font-semibold text-text-primary group-hover:text-accent-qa transition-colors duration-200">
                {project.title}
              </h3>
              <Badge variant={statusVariant}>{statusLabel}</Badge>
            </div>
            <p className="text-sm text-text-secondary mb-3">{project.context}</p>
            <p className="text-xs text-text-muted">{project.impact}</p>
          </article>
        </TiltCard>
      </Link>
    </motion.div>
  );
}

export function FeaturedProjects({ projects }: { projects: Project[] }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: m.stagger.default, delayChildren: 0.05 } },
      }}
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      {projects.map(p => (
        <ProjectCard key={p.id} project={p} />
      ))}
    </motion.div>
  );
}
