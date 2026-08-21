'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { DocsSidebar } from '@/features/docs/docs-sidebar';
import { PageEntry } from '@/components/shared/page-entry';
import { motion as m } from '@/design-system/motion';
import { CrossReferences, getModuleReferences } from '@/components/platform/cross-references';
import { usePlatform } from '@/components/platform/platform-context';
import type { Doc } from '@/types';
import { DocsBreadcrumb } from '@/features/docs/docs-breadcrumb';
import { useLanguage } from '@/i18n/language-context';

export function DocDetailClient({ doc, allDocs }: { doc: Doc; allDocs: Doc[] }) {
  const { setCurrentModule } = usePlatform();
  const { td } = useLanguage();
  useEffect(() => { setCurrentModule('docs'); }, [setCurrentModule]);

  return (
    <PageEntry className="max-w-[1440px] mx-auto px-6 py-10">
      <DocsBreadcrumb current={doc.title} />

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
            {doc.sections.map((section, i) => {
              const isOverview = doc.id === 'overview';
              const heading = isOverview ? td(`docs.overview.section.${i}.heading`, section.heading) : section.heading;
              const content = isOverview ? td(`docs.overview.section.${i}.content`, section.content) : section.content;
              const isPhilosophy = isOverview && i === 2;
              return (
              <motion.section
                key={i}
                id={isPhilosophy ? 'filosofia' : isOverview && i === 1 ? 'por-que-jun-fan' : undefined}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0, transition: { duration: m.duration.normal, ease: m.easing.out } },
                }}
              >
                <h2 className="text-lg font-semibold text-text-primary mb-3 tracking-[-0.01em]">
                  {heading}{isOverview && i === 1 && <span className="ml-2 text-sm font-normal text-text-muted">振藩</span>}
                </h2>
                {isPhilosophy ? (
                  <div className="rounded-xl border border-border-subtle/60 bg-surface-default/60 p-4">
                    <div className="grid gap-4 md:grid-cols-3">
                      {(['absorb', 'refine', 'build'] as const).map(key => (
                        <div key={key}>
                          <h3 className="text-xs font-semibold tracking-[0.14em] text-accent-qa">{td(`docs.overview.philosophy.${key}.title`, key)}</h3>
                          <p className="mt-2 text-sm leading-relaxed text-text-secondary">{td(`docs.overview.philosophy.${key}.content`, '')}</p>
                        </div>
                      ))}
                    </div>
                    <p className="mt-5 border-t border-border-subtle/50 pt-4 text-sm italic text-text-primary">{td('docs.overview.philosophy.statement', content)}</p>
                  </div>
                ) : <p className="text-sm text-text-secondary leading-relaxed">{content}</p>}
              </motion.section>
              );
            })}
          </motion.div>
        </article>

        <div className="w-full md:w-48 shrink-0">
          <CrossReferences references={getModuleReferences('docs')} title="Navegação Rápida" />
        </div>
      </div>
    </PageEntry>
  );
}
