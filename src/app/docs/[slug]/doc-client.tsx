'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { DocsSidebar } from '@/features/docs/docs-sidebar';
import { ArrowLeft } from 'lucide-react';
import { PageEntry } from '@/components/shared/page-entry';
import { motion as m } from '@/design-system/motion';
import { CrossReferences, getModuleReferences } from '@/components/platform/cross-references';
import { usePlatform } from '@/components/platform/platform-context';
import type { Doc } from '@/types';

export function DocDetailClient({ doc, allDocs }: { doc: Doc; allDocs: Doc[] }) {
  const { setCurrentModule } = usePlatform();
  useEffect(() => { setCurrentModule('docs'); }, [setCurrentModule]);

  return (
    <PageEntry className="max-w-[1440px] mx-auto px-6 py-10">
      <Link
        href="/docs/"
        className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-text-primary mb-6 transition-colors duration-200"
      >
        <ArrowLeft size={14} /> Documentação
      </Link>

      <div className="flex flex-col md:flex-row gap-8">
        <DocsSidebar docs={allDocs} currentId={doc.id} />

        <article className="flex-1 min-w-0">
          <h1 className="text-2xl font-extrabold text-text-primary mb-2 tracking-[-0.02em] text-balance">
            {doc.title}
          </h1>
          <p className="text-text-secondary mb-8">{doc.description}</p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: m.stagger.default, delayChildren: 0.15 } },
            }}
            className="space-y-8"
          >
            {doc.sections.map((section, i) => (
              <motion.section
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0, transition: { duration: m.duration.normal, ease: m.easing.out } },
                }}
              >
                <h2 className="text-lg font-semibold text-text-primary mb-3 tracking-[-0.01em]">
                  {section.heading}
                </h2>
                <p className="text-sm text-text-secondary leading-relaxed">{section.content}</p>
              </motion.section>
            ))}
          </motion.div>
        </article>

        <div className="w-full md:w-48 shrink-0">
          <CrossReferences references={getModuleReferences('docs')} title="Navegação Rápida" />
        </div>
      </div>
    </PageEntry>
  );
}
