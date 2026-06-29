'use client';

import { motion } from 'framer-motion';
import { getProjects } from '@/lib/content';
import { ProjectCard } from '@/components/cards/project-card';
import { motion as m } from '@/design-system/motion';

export function ProjectGrid() {
  const projects = getProjects();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
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
