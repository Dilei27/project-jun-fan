'use client';

import { motion, type Variants } from 'framer-motion';
import { Lightbulb } from 'lucide-react';
import { TiltCard } from '@/components/shared/tilt-card';
import { motion as m } from '@/design-system/motion';
import Link from 'next/link';

const insights = [
  { title: 'Automação ERP', href: '/projeto/automacao-erp-uau/', desc: '960 min → 192 min' },
  { title: 'WhatsApp AI', href: '/produto/whatsapp-ai/', desc: 'LangChain + GPT' },
  { title: 'Vigilante AI', href: '/produto/vigilante-ai/', desc: 'Classificação IA' },
];

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: m.duration.normal, ease: [...m.easing.out] },
  },
};

export function AIInsightCards() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: m.stagger.tight, delayChildren: 0.05 } },
      }}
      className="grid grid-cols-1 sm:grid-cols-3 gap-4"
    >
      {insights.map(item => (
        <motion.div key={item.title} variants={itemVariants}>
          <Link href={item.href} className="block h-full">
            <TiltCard
              maxTilt={2}
              accentRgb="79, 140, 255"
              spotlightIntensity={0.1}
              liftOnHover={false}
              className="h-full"
            >
              <div
                className="jf-lift flex items-start gap-3 p-4 bg-surface-default/80 border border-border-subtle/60 rounded-lg h-full"
                style={{
                  boxShadow:
                    'inset 0 1px 0 0 rgba(244, 247, 250, 0.03), 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 4px 12px -4px rgba(0, 0, 0, 0.3)',
                }}
              >
                <Lightbulb size={18} className="text-accent-qa shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-text-primary group-hover:text-accent-qa transition-colors duration-200">
                    {item.title}
                  </h4>
                  <p className="text-xs text-text-muted mt-0.5">{item.desc}</p>
                </div>
              </div>
            </TiltCard>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
