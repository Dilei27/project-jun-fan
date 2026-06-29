'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Doc } from '@/types';
import { motion as m } from '@/design-system/motion';

export function DocsSidebar({ docs, currentId }: { docs: Doc[]; currentId?: string }) {
  return (
    <aside className="w-full md:w-56 shrink-0">
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: m.stagger.tight, delayChildren: 0.1 } },
        }}
        className="md:sticky md:top-20 space-y-1"
        aria-label="Navegação da documentação"
      >
        {docs.map(d => {
          const isActive = d.id === currentId;
          return (
            <motion.div
              key={d.id}
              variants={{
                hidden: { opacity: 0, x: -8 },
                visible: { opacity: 1, x: 0, transition: { duration: m.duration.fast, ease: m.easing.out } },
              }}
            >
              <Link
                href={`/docs/${d.id}/`}
                className={`relative block px-3 py-2 text-sm rounded-md transition-colors duration-200 ${
                  isActive
                    ? 'text-accent-qa font-medium'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-soft'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="docs-sidebar-active"
                    className="absolute inset-0 bg-accent-qa/8 border border-accent-qa/20 rounded-md -z-0 shadow-[inset_0_1px_0_0_rgba(79,140,255,0.08)]"
                    transition={{ duration: m.duration.normal, ease: m.easing.out }}
                  />
                )}
                <span className="relative z-10">{d.title}</span>
              </Link>
            </motion.div>
          );
        })}
      </motion.nav>
    </aside>
  );
}
