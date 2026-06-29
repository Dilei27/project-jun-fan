'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { getDocs } from '@/lib/content';
import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { PageEntry } from '@/components/shared/page-entry';
import { motion as m } from '@/design-system/motion';

export default function DocsIndexPage() {
  const docs = getDocs();

  return (
    <PageEntry className="max-w-[1440px] mx-auto px-6 py-10">
      <h1 className="text-3xl font-extrabold text-text-primary mb-2 tracking-[-0.025em] text-balance">
        Documentação
      </h1>
      <p className="text-text-secondary mb-8 max-w-xl">
        Arquitetura, setup, produtos e decisões técnicas do ecossistema Jun Fan.
      </p>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: m.stagger.default, delayChildren: 0.1 } },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {docs.map(d => (
          <motion.div
            key={d.id}
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { duration: m.duration.normal, ease: m.easing.out } },
            }}
            whileHover={{ y: -3, transition: { duration: m.duration.fast, ease: m.easing.out } }}
          >
            <Link href={`/docs/${d.id}/`} className="block group h-full">
              <Card hover className="h-full">
                <h3 className="text-base font-semibold text-text-primary mb-2">{d.title}</h3>
                <p className="text-sm text-text-secondary mb-4">{d.description}</p>
                <span className="inline-flex items-center gap-1 text-sm text-accent-qa group-hover:gap-2 transition-all duration-200">
                  Ler <ArrowRight size={14} />
                </span>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </PageEntry>
  );
}
