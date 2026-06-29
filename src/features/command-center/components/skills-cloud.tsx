'use client';

import { motion } from 'framer-motion';
import { motion as m } from '@/design-system/motion';
import { getSkills } from '@/lib/content';

export function SkillsCloud() {
  const skills = getSkills();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: m.stagger.default, delayChildren: 0.05 } },
      }}
      className="space-y-6"
    >
      {skills.map(category => (
        <motion.div
          key={category.area}
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0, transition: { duration: m.duration.normal, ease: m.easing.out } },
          }}
        >
          <h3 className="text-sm font-semibold text-text-primary mb-3 tracking-[-0.01em]">
            {category.area}
          </h3>
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: m.duration.fast, ease: m.easing.out, delay: i * 0.02 }}
                whileHover={{ y: -2, transition: { duration: m.duration.fast, ease: m.easing.out } }}
                className={`px-3 py-1.5 text-sm rounded-md border cursor-default transition-colors duration-200 ${
                  category.nivel === 'avancado'
                    ? 'bg-accent-qa/8 border-accent-qa/20 text-accent-qa shadow-[inset_0_1px_0_0_rgba(79,140,255,0.08)]'
                    : category.nivel === 'intermediario'
                    ? 'bg-surface-soft/60 border-border-subtle/60 text-text-secondary'
                    : 'bg-surface-default/80 border-border-subtle/60 text-text-muted'
                }`}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
