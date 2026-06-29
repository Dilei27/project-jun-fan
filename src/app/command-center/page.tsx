'use client';

import { getProducts, getProjects, getTimeline, getDecisions } from '@/lib/content';
import { ProductGateway } from '@/components/cards/product-card';
import { FeaturedProjects } from '@/components/cards/project-card';
import { Timeline } from '@/components/shared/timeline';
import { AIInsightCards } from '@/components/cards/ai-insight-card';
import { HeroCommandCenter } from '@/features/command-center/components/hero-command-center';
import { MetricsGrid } from '@/features/command-center/components/metrics-grid';
import { SkillsCloud } from '@/features/command-center/components/skills-cloud';
import { ArchitectureFlow } from '@/features/command-center/components/architecture-flow';
import { BootLoader } from '@/features/command-center/components/boot-loader';
import { StatusStrip } from '@/components/shared/status-strip';
import { SectionReveal } from '@/components/shared/section-reveal';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { motion as m } from '@/design-system/motion';

export default function CommandCenterPage() {
  const products = getProducts();
  const projects = getProjects();
  const timeline = getTimeline();
  const decisions = getDecisions();

  return (
    <div>
      <BootLoader />
      <HeroCommandCenter />

      <div className="max-w-[1440px] mx-auto px-6">
        <SectionReveal>
          <section className="mb-16">
            <h2 className="sr-only">Status dos Produtos</h2>
            <StatusStrip products={products} />
          </section>
        </SectionReveal>

        <SectionReveal>
          <section className="mb-16">
            <h2 className="text-xl font-semibold text-text-primary mb-6 tracking-[-0.01em]">
              Impacto Gerado
            </h2>
            <MetricsGrid />
          </section>
        </SectionReveal>

        <SectionReveal>
          <section className="mb-16" id="produtos">
            <h2 className="text-xl font-semibold text-text-primary mb-6 tracking-[-0.01em]">
              Produtos
            </h2>
            <ProductGateway products={products} />
          </section>
        </SectionReveal>

        <SectionReveal>
          <section className="mb-16">
            <h2 className="text-xl font-semibold text-text-primary mb-6 tracking-[-0.01em]">
              Trajetória
            </h2>
            <Timeline entries={timeline} />
          </section>
        </SectionReveal>

        <SectionReveal>
          <section className="mb-16">
            <h2 className="text-xl font-semibold text-text-primary mb-6 tracking-[-0.01em]">
              Stack Técnica
            </h2>
            <SkillsCloud />
          </section>
        </SectionReveal>

        <SectionReveal>
          <section className="mb-16">
            <h2 className="text-xl font-semibold text-text-primary mb-6 tracking-[-0.01em]">
              Arquitetura
            </h2>
            <ArchitectureFlow />
          </section>
        </SectionReveal>

        <SectionReveal>
          <section className="mb-16">
            <h2 className="text-xl font-semibold text-text-primary mb-6 tracking-[-0.01em]">
              Projetos em Destaque
            </h2>
            <FeaturedProjects projects={projects} />
          </section>
        </SectionReveal>

        <SectionReveal>
          <section className="mb-16">
            <h2 className="text-xl font-semibold text-text-primary mb-6 tracking-[-0.01em]">
              Decisões Técnicas
            </h2>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: m.stagger.tight, delayChildren: 0.1 } },
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {decisions.slice(0, 2).map(d => (
                <motion.div
                  key={d.id}
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    visible: { opacity: 1, y: 0, transition: { duration: m.duration.normal, ease: m.easing.out } },
                  }}
                  whileHover={{ y: -3, transition: { duration: m.duration.fast, ease: m.easing.out } }}
                >
                  <Link
                    href={`/decisoes/#${d.id}`}
                    className="jf-lift block p-4 bg-surface-default/80 border border-border-subtle/60 rounded-lg"
                    style={{
                      boxShadow:
                        'inset 0 1px 0 0 rgba(244, 247, 250, 0.03), 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 4px 12px -4px rgba(0, 0, 0, 0.3)',
                    }}
                  >
                    <h3 className="text-sm font-semibold text-text-primary mb-1">{d.decision}</h3>
                    <p className="text-xs text-text-muted">{d.context}</p>
                  </Link>
                </motion.div>
              ))}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0, transition: { duration: m.duration.normal, ease: m.easing.out } },
                }}
                whileHover={{ y: -3, transition: { duration: m.duration.fast, ease: m.easing.out } }}
              >
                <Link
                  href="/decisoes/"
                  className="jf-lift p-4 bg-surface-default/80 border border-border-subtle/60 rounded-lg flex items-center justify-center text-sm text-accent-qa h-full"
                  style={{
                    boxShadow:
                      'inset 0 1px 0 0 rgba(244, 247, 250, 0.03), 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 4px 12px -4px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  Ver todas as decisões →
                </Link>
              </motion.div>
            </motion.div>
          </section>
        </SectionReveal>

        <SectionReveal>
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-text-primary mb-6 tracking-[-0.01em]">
              Insights
            </h2>
            <AIInsightCards />
          </section>
        </SectionReveal>
      </div>
    </div>
  );
}
