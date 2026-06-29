import Link from 'next/link';
import { getProducts, getProjects } from '@/lib/content';
import { ProductGateway } from '@/components/cards/product-card';
import { FeaturedProjects } from '@/components/cards/project-card';
import { AIInsightCards } from '@/components/cards/ai-insight-card';
import { ArrowRight, Command } from 'lucide-react';
import { RevealText, FadeIn, HeroStage } from '@/components/shared/reveal';
import { SectionReveal } from '@/components/shared/section-reveal';
import { SectionDivider } from '@/components/shared/section-divider';
import { StatRow } from '@/components/shared/stat-row';
import { HeroParallax } from '@/components/shared/hero-parallax';

export default function HomePage() {
  const products = getProducts();
  const projects = getProjects();

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-10">
      {/* Hero */}
      <HeroStage className="rounded-2xl -mt-2 mb-20">
        <HeroParallax intensity={0.25}>
          {/* Spotlight exclusivo no CTA — luz focada da esquerda */}
          <div
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              top: '40%',
              left: '10%',
              width: '50%',
              height: '60%',
              background:
                'radial-gradient(ellipse 60% 50% at 30% 50%, rgba(79, 140, 255, 0.10), transparent 70%)',
            }}
          />
        </HeroParallax>

        <div className="relative max-w-[1440px] mx-auto px-6 py-20 md:py-28">
          <div className="max-w-3xl">
            <FadeIn delay={0.05} y={6}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-medium text-accent-qa bg-accent-qa/8 border border-accent-qa/20 rounded-full shadow-[inset_0_1px_0_0_rgba(79,140,255,0.08)]">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-qa jf-pulse-dot" />
                Product Operating System — online
              </div>
            </FadeIn>

            <RevealText
              as="h1"
              delay={0.1}
              className="text-4xl md:text-6xl font-extrabold text-text-primary mb-4 leading-[1.02] tracking-[-0.025em] text-balance block"
            >
              Project Jun Fan
            </RevealText>

            <FadeIn delay={0.45} y={10}>
              <p className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed mb-3 text-balance">
                Plataforma de produtos, documentação e experiências técnicas
                de automação, QA e IA aplicada.
              </p>
            </FadeIn>

            <FadeIn delay={0.55}>
              <p className="text-base text-accent-qa/90 font-medium mb-10 tracking-wide">
                Absorb. Refine. Build.
              </p>
            </FadeIn>

            <FadeIn delay={0.65} y={6}>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/command-center/"
                  className="group inline-flex items-center gap-2 px-5 py-2.5 bg-accent-qa text-white rounded-lg text-sm font-medium transition-[box-shadow,background-color,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_4px_16px_-4px_rgba(79,140,255,0.35)] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.16),0_8px_24px_-6px_rgba(79,140,255,0.5)] hover:bg-accent-qa/95 hover:-translate-y-0.5"
                >
                  <Command size={16} /> Explorar QA Command Center{' '}
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5"
                  />
                </Link>
                <Link
                  href="/docs/"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-surface-elevated/60 backdrop-blur-sm border border-border-subtle/60 text-text-primary rounded-lg text-sm font-medium transition-[box-shadow,background-color,border-color,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[inset_0_1px_0_0_rgba(244,247,250,0.04)] hover:bg-surface-soft hover:border-border-strong hover:-translate-y-0.5"
                >
                  Documentação
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </HeroStage>

      {/* Stats Overview — subtle row creating rhythm */}
      <SectionReveal delay={0.1}>
        <StatRow
          className="mb-20"
          stats={[
            { value: products.length, suffix: '', label: 'Produtos' },
            { value: projects.length, suffix: '', label: 'Projetos' },
            { value: 12, suffix: '+', label: 'Agentes' },
            { value: 95, suffix: '%', label: 'Cobertura' },
          ]}
        />
      </SectionReveal>

      {/* Products */}
      <SectionReveal>
        <section className="mb-16" id="produtos">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-text-primary tracking-[-0.01em]">
              Produtos
            </h2>
            <Link
              href="/command-center/"
              className="text-sm text-accent-qa hover:underline transition-all duration-200"
            >
              Ver completo →
            </Link>
          </div>
          <ProductGateway products={products} />
        </section>
      </SectionReveal>

      <SectionDivider className="mb-16 max-w-3xl mx-auto" />

      {/* Projects */}
      <SectionReveal>
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-text-primary tracking-[-0.01em]">
              Projetos
            </h2>
            <Link
              href="/command-center/projects"
              className="text-sm text-accent-qa hover:underline transition-all duration-200"
            >
              Ver todos →
            </Link>
          </div>
          <FeaturedProjects projects={projects} />
        </section>
      </SectionReveal>

      <SectionDivider className="mb-16 max-w-3xl mx-auto" />

      {/* AI Insights */}
      <SectionReveal>
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-text-primary mb-6 tracking-[-0.01em]">
            Insights
          </h2>
          <AIInsightCards />
        </section>
      </SectionReveal>
    </div>
  );
}
