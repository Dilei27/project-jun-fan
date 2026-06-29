'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ArchitectureFlow } from '@/features/command-center/components/architecture-flow';
import { PageEntry } from '@/components/shared/page-entry';
import { motion as m } from '@/design-system/motion';

const cardShadow =
  'inset 0 1px 0 0 rgba(244, 247, 250, 0.03), 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 4px 12px -4px rgba(0, 0, 0, 0.3)';

export default function ArchitecturePage() {
  return (
    <PageEntry className="max-w-[1440px] mx-auto px-6 py-10">
      <Link
        href="/command-center/"
        className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-text-primary mb-6 transition-colors duration-200"
      >
        <ArrowLeft size={14} /> Command Center
      </Link>

      <h1 className="text-3xl font-extrabold text-text-primary mb-2 tracking-[-0.025em] text-balance">
        Arquitetura
      </h1>
      <p className="text-text-secondary mb-8 max-w-xl">
        Como os produtos do ecossistema se conectam — do QA Command Center ao AI Dock, passando por WhatsApp AI e Vigilante AI.
      </p>

      <div className="mb-10">
        <h2 className="text-lg font-semibold text-text-primary mb-4 tracking-[-0.01em]">
          Fluxo do Ecossistema
        </h2>
        <ArchitectureFlow />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: m.stagger.default, delayChildren: 0.1 } },
        }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0, transition: { duration: m.duration.normal, ease: m.easing.out } },
          }}
          whileHover={{ y: -3, transition: { duration: m.duration.fast, ease: m.easing.out } }}
          className="jf-lift p-5 bg-surface-default/80 border border-border-subtle/60 rounded-lg"
          style={{ boxShadow: cardShadow }}
        >
          <h3 className="text-sm font-semibold text-accent-qa mb-2">QA Command Center</h3>
          <p className="text-sm text-text-secondary">
            Hub central que nucleia projetos, decisões, métricas e documentação. Ponto de entrada único para o ecossistema.
          </p>
        </motion.div>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0, transition: { duration: m.duration.normal, ease: m.easing.out } },
          }}
          whileHover={{ y: -3, transition: { duration: m.duration.fast, ease: m.easing.out } }}
          className="jf-lift p-5 bg-surface-default/80 border border-border-subtle/60 rounded-lg"
          style={{ boxShadow: cardShadow }}
        >
          <h3 className="text-sm font-semibold text-accent-whatsapp mb-2">WhatsApp AI</h3>
          <p className="text-sm text-text-secondary">
            Módulo de atendimento inteligente. Consome dados do hub e alimenta o AI Dock com interações contextuais.
          </p>
        </motion.div>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0, transition: { duration: m.duration.normal, ease: m.easing.out } },
          }}
          whileHover={{ y: -3, transition: { duration: m.duration.fast, ease: m.easing.out } }}
          className="jf-lift p-5 bg-surface-default/80 border border-border-subtle/60 rounded-lg"
          style={{ boxShadow: cardShadow }}
        >
          <h3 className="text-sm font-semibold text-accent-vigilante mb-2">Vigilante AI</h3>
          <p className="text-sm text-text-secondary">
            Módulo de monitoramento com IA. Compartilha a mesma base de design, tokens e componentes do ecossistema.
          </p>
        </motion.div>
      </motion.div>
    </PageEntry>
  );
}
