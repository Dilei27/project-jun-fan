'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { PageEntry } from '@/components/shared/page-entry';
import { motion as m } from '@/design-system/motion';
import type { Product } from '@/types';

const cardShadow =
  'inset 0 1px 0 0 rgba(244, 247, 250, 0.03), 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 4px 12px -4px rgba(0, 0, 0, 0.3)';

export function DashboardClient({ product }: { product: Product }) {
  return (
    <PageEntry className="max-w-[1440px] mx-auto px-6 py-10">
      <Link
        href={`/produto/${product.id}/`}
        className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-text-primary mb-6 transition-colors duration-200"
      >
        <ArrowLeft size={14} /> {product.name}
      </Link>

      <h1 className="text-2xl font-extrabold text-text-primary mb-2 tracking-[-0.02em] text-balance">
        Dashboard — {product.name}
      </h1>
      <p className="text-text-secondary mb-8">Métricas simuladas do produto.</p>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: m.stagger.default, delayChildren: 0.1 } },
        }}
        className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8"
      >
        {Object.entries(product.metrics).map(([key, val]) => (
          <motion.div
            key={key}
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { duration: m.duration.normal, ease: m.easing.out } },
            }}
            whileHover={{ y: -3, transition: { duration: m.duration.fast, ease: m.easing.out } }}
            className="jf-lift p-5 bg-surface-default/80 border border-border-subtle/60 rounded-lg text-center"
            style={{ boxShadow: cardShadow }}
          >
            <div className="text-3xl font-bold text-text-primary tabular-nums">{val}</div>
            <div className="text-sm text-text-muted mt-1 capitalize">
              {key.replace(/_/g, ' ')}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: m.duration.slow, ease: m.easing.out, delay: 0.2 }}
        className="p-6 bg-surface-default/80 border border-border-subtle/60 rounded-lg"
        style={{ boxShadow: cardShadow }}
      >
        <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-4">
          Atividades Recentes
        </h2>
        <div className="space-y-3">
          {['Deploy v2.1.0', 'Nova métrica de cobertura', 'Bugfix: validação de entrada', 'Atualização de dependências', 'Review de arquitetura'].map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: m.duration.fast, ease: m.easing.out, delay: 0.3 + i * 0.06 }}
              className="flex items-center gap-3 text-sm"
            >
              <div className="w-2 h-2 rounded-full bg-accent-qa shrink-0 jf-pulse-dot" />
              <span className="text-text-secondary">{a}</span>
              <span className="text-xs text-text-muted ml-auto">há {i + 1}h</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </PageEntry>
  );
}
