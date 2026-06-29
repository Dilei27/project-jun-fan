'use client';

import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { searchAll } from '@/lib/search';
import { PageEntry } from '@/components/shared/page-entry';
import { motion as m } from '@/design-system/motion';
import { useMemo } from 'react';

const cardShadow =
  'inset 0 1px 0 0 rgba(244, 247, 250, 0.03), 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 4px 12px -4px rgba(0, 0, 0, 0.3)';

export function SearchClient({ initialQuery }: { initialQuery: string }) {
  const results = useMemo(
    () => (initialQuery ? searchAll(initialQuery) : []),
    [initialQuery],
  );

  return (
    <PageEntry className="max-w-[1440px] mx-auto px-6 py-10">
      <h1 className="text-3xl font-extrabold text-text-primary mb-6 tracking-[-0.025em] text-balance">
        Busca
      </h1>

      <form action="/busca/" method="GET" className="mb-8">
        <div className="flex gap-3 max-w-xl">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              name="q"
              defaultValue={initialQuery}
              placeholder="Pesquisar produtos, projetos, documentação..."
              className="w-full pl-10 pr-4 py-3 bg-surface-default/80 border border-border-subtle/60 rounded-lg text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-accent-qa/50 transition-colors duration-200 backdrop-blur-sm"
              style={{ boxShadow: 'inset 0 1px 0 0 rgba(244, 247, 250, 0.03)' }}
              aria-label="Pesquisar"
            />
          </div>
          <motion.button
            whileHover={{ y: -1, transition: { duration: m.duration.fast, ease: m.easing.out } }}
            whileTap={m.tap.soft}
            type="submit"
            className="px-5 py-3 bg-accent-qa text-white rounded-lg text-sm font-medium hover:bg-accent-qa/95 transition-all duration-200 cursor-pointer shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_4px_16px_-4px_rgba(79,140,255,0.35)]"
          >
            Buscar
          </motion.button>
        </div>
      </form>

      {initialQuery && (
        <p className="text-sm text-text-muted mb-6">
          {results.length} resultado{results.length !== 1 ? 's' : ''} para &ldquo;{initialQuery}&rdquo;
        </p>
      )}

      {results.length > 0 && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: m.stagger.tight } },
          }}
          className="space-y-3 max-w-2xl"
        >
          {results.map((r, i) => (
            <motion.a
              key={`${r.type}-${r.title}-${i}`}
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: { opacity: 1, y: 0, transition: { duration: m.duration.fast, ease: m.easing.out } },
              }}
              whileHover={{ y: -2, transition: { duration: m.duration.fast, ease: m.easing.out } }}
              href={r.url}
              className="jf-lift block p-4 bg-surface-default/80 border border-border-subtle/60 rounded-lg"
              style={{ boxShadow: cardShadow }}
            >
              <div className="flex items-center gap-3 mb-1">
                <span className="text-xs uppercase tracking-wider text-accent-qa font-medium">
                  {r.type}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-text-primary">{r.title}</h3>
              <p className="text-xs text-text-muted mt-1">{r.snippet}</p>
            </motion.a>
          ))}
        </motion.div>
      )}

      {initialQuery && results.length === 0 && (
        <p className="text-text-muted text-sm">
          Nenhum resultado encontrado para &ldquo;{initialQuery}&rdquo;.
        </p>
      )}
    </PageEntry>
  );
}
