'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { PageEntry } from '@/components/shared/page-entry';
import { motion as m } from '@/design-system/motion';
import type { Product } from '@/types';

const cardShadow =
  'inset 0 1px 0 0 rgba(244, 247, 250, 0.03), 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 4px 12px -4px rgba(0, 0, 0, 0.3)';

export function ProductClient({ product }: { product: Product }) {
  const statusVariant =
    product.status === 'online' ? 'success' : product.status === 'beta' ? 'warning' : 'default';

  return (
    <PageEntry className="max-w-[1440px] mx-auto px-6 py-10">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-text-primary mb-6 transition-colors duration-200"
      >
        <ArrowLeft size={14} /> Voltar
      </Link>

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
          <div>
            <h1 className="text-3xl font-extrabold text-text-primary mb-2 tracking-[-0.025em] text-balance">
              {product.name}
            </h1>
            <p className="text-text-secondary max-w-2xl">{product.shortDescription}</p>
          </div>
          <Badge
            variant={statusVariant as 'default' | 'success' | 'warning' | 'danger'}
            className="shrink-0 mt-1"
          >
            {product.status}
          </Badge>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { duration: m.duration.normal, ease: m.easing.out } },
            }}
            className="jf-lift p-4 bg-surface-default/80 border border-border-subtle/60 rounded-lg"
            style={{ boxShadow: cardShadow }}
          >
            <span className="text-xs font-semibold text-danger uppercase tracking-wider">Problema</span>
            <p className="text-sm text-text-secondary mt-2">{product.problem}</p>
          </motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { duration: m.duration.normal, ease: m.easing.out } },
            }}
            className="jf-lift p-4 bg-surface-default/80 border border-border-subtle/60 rounded-lg"
            style={{ boxShadow: cardShadow }}
          >
            <span className="text-xs font-semibold text-success uppercase tracking-wider">Solução</span>
            <p className="text-sm text-text-secondary mt-2">{product.solution}</p>
          </motion.div>
        </div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0, transition: { duration: m.duration.normal, ease: m.easing.out } },
          }}
          className="mb-10"
        >
          <h2 className="text-lg font-semibold text-text-primary mb-4 tracking-[-0.01em]">
            Arquitetura
          </h2>
          <div
            className="flex items-center flex-wrap gap-2 p-4 bg-surface-default/80 border border-border-subtle/60 rounded-lg"
            style={{ boxShadow: cardShadow }}
          >
            {product.architectureFlow.split(' -> ').map((step, i, arr) => (
              <span key={step} className="flex items-center">
                <span className="px-3 py-1.5 bg-surface-soft text-text-secondary text-sm rounded-md border border-border-subtle/60 transition-colors duration-200 hover:border-border-strong hover:text-text-primary">
                  {step}
                </span>
                {i < arr.length - 1 && <span className="text-text-muted mx-1">→</span>}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { duration: m.duration.normal, ease: m.easing.out } },
            }}
          >
            <h2 className="text-lg font-semibold text-text-primary mb-4 tracking-[-0.01em]">
              Métricas
            </h2>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: m.stagger.tight, delayChildren: 0.1 } },
              }}
              className="grid grid-cols-3 gap-3"
            >
              {Object.entries(product.metrics).map(([key, val]) => (
                <motion.div
                  key={key}
                  variants={{
                    hidden: { opacity: 0, y: 8 },
                    visible: { opacity: 1, y: 0, transition: { duration: m.duration.fast, ease: m.easing.out } },
                  }}
                  whileHover={{ y: -2, transition: { duration: m.duration.fast, ease: m.easing.out } }}
                  className="jf-lift p-4 bg-surface-default/80 border border-border-subtle/60 rounded-lg text-center"
                  style={{ boxShadow: cardShadow }}
                >
                  <div className="text-2xl font-bold text-text-primary tabular-nums">{val}</div>
                  <div className="text-xs text-text-muted mt-1 capitalize">
                    {key.replace('_', ' ')}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { duration: m.duration.normal, ease: m.easing.out } },
            }}
          >
            <h2 className="text-lg font-semibold text-text-primary mb-4 tracking-[-0.01em]">
              Roadmap
            </h2>
            <div className="space-y-2">
              {product.roadmap.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 bg-surface-default/80 border border-border-subtle/60 rounded-lg transition-colors duration-200 hover:border-border-strong"
                  style={{ boxShadow: cardShadow }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-qa shrink-0" />
                  <span className="text-sm text-text-secondary">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0, transition: { duration: m.duration.normal, ease: m.easing.out } },
          }}
          className="flex flex-wrap gap-4"
        >
          <Link
            href={`/produto/${product.id}/dashboard/`}
            className="group inline-flex items-center gap-1.5 px-4 py-2 bg-surface-elevated/60 backdrop-blur-sm border border-border-subtle/60 rounded-lg text-sm text-text-primary shadow-[inset_0_1px_0_0_rgba(244,247,250,0.04)] hover:bg-surface-soft hover:border-border-strong transition-all duration-200 hover:-translate-y-0.5"
          >
            Dashboard{' '}
            <ExternalLink
              size={14}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
          <Link
            href={`/produto/${product.id}/demo/`}
            className="group inline-flex items-center gap-1.5 px-4 py-2 bg-surface-elevated/60 backdrop-blur-sm border border-border-subtle/60 rounded-lg text-sm text-text-primary shadow-[inset_0_1px_0_0_rgba(244,247,250,0.04)] hover:bg-surface-soft hover:border-border-strong transition-all duration-200 hover:-translate-y-0.5"
          >
            Demo interativa{' '}
            <ExternalLink
              size={14}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </motion.div>
      </motion.div>
    </PageEntry>
  );
}
