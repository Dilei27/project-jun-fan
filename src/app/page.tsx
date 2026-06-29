import Link from 'next/link';
import { getProducts, getProjects } from '@/lib/content';
import { ProductGateway } from '@/components/cards/product-card';
import { FeaturedProjects } from '@/components/cards/project-card';
import { AIInsightCards } from '@/components/cards/ai-insight-card';
import { ArrowRight, Command, FileText, GitBranch } from 'lucide-react';
import { RevealText, FadeIn, HeroStage } from '@/components/shared/reveal';
import { SectionReveal } from '@/components/shared/section-reveal';
import { SectionDivider } from '@/components/shared/section-divider';
import { StatRow } from '@/components/shared/stat-row';
import { AnimatedGrid, AnimatedItem } from '@/components/shared/animated-grid';
import { ModuleCard } from './module-card';
import { PhilosophyCard } from './philosophy-card';
import { ArchitectureTimeline } from '@/components/platform/architecture-timeline';
import { CrossNav } from '@/components/platform/cross-nav';
import { ActivityFeed } from '@/components/platform/activity-feed';
import { MiniKnowledgeGraph } from '@/components/platform/mini-knowledge-graph';
import { SetModule } from '@/components/platform/set-module';
import { PlatformStatus } from '@/components/platform/platform-status';

export default function HomePage() {
  const products = getProducts();
  const projects = getProjects();

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-10">
      {/* Ambient glow — top */}
      <div
        aria-hidden
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 60% at 50% 0%, rgba(79, 140, 255, 0.06), transparent 70%)',
        }}
      />

      {/* === HERO === */}
      <HeroStage className="rounded-2xl -mt-2 mb-20">
        <div className="relative max-w-[1440px] mx-auto px-6 py-20 md:py-28">
          <div className="max-w-4xl">
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
              <p className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed mb-6 text-balance">
                Um sistema operacional de produtos — onde decisões, documentação, QA
                e conhecimento vivo se encontram em um grafo navegável.
              </p>
              <p className="text-sm text-text-muted max-w-xl leading-relaxed mb-8">
                Cada entidade, decisão e conexão vive em um grafo de conhecimento.
                Explore, entenda e refine o produto como um sistema.
              </p>
            </FadeIn>

            <FadeIn delay={0.55}>
              <div className="flex items-center gap-3 mb-10 text-sm text-text-muted">
                <span className="font-medium text-accent-qa/90 tracking-wide">Absorb.</span>
                <span className="opacity-30">·</span>
                <span className="font-medium text-accent-teal/80 tracking-wide">Refine.</span>
                <span className="opacity-30">·</span>
                <span className="font-medium text-accent-qa/90 tracking-wide">Build.</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.65} y={6}>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/knowledge-graph/"
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-accent-qa text-white rounded-lg text-sm font-medium transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_4px_16px_-4px_rgba(79,140,255,0.35)] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.16),0_8px_24px_-6px_rgba(79,140,255,0.5)] hover:bg-accent-qa/95 hover:-translate-y-0.5"
                >
                  <GitBranch size={16} /> Explorar Knowledge Graph{' '}
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5"
                  />
                </Link>
                <Link
                  href="/command-center/"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-surface-elevated/60 backdrop-blur-sm border border-border-subtle/60 text-text-primary rounded-lg text-sm font-medium transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[inset_0_1px_0_0_rgba(244,247,250,0.04)] hover:bg-surface-soft hover:border-border-strong hover:-translate-y-0.5"
                >
                  <Command size={16} /> QA Command Center
                </Link>
                <Link
                  href="/docs/"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-surface-elevated/60 backdrop-blur-sm border border-border-subtle/60 text-text-primary rounded-lg text-sm font-medium transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[inset_0_1px_0_0_rgba(244,247,250,0.04)] hover:bg-surface-soft hover:border-border-strong hover:-translate-y-0.5"
                >
                  <FileText size={16} /> Documentação
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </HeroStage>

      {/* === MODULE CARDS === */}
      <SectionReveal delay={0.05}>
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <ModuleCard
              title="Knowledge Graph"
              description="Grafo navegável de entidades, decisões e conexões. O cérebro do sistema."
              href="/knowledge-graph/"
              icon="GitBranch"
              accentColor="#4F8CFF"
              status="online"
              primary
            />
            <ModuleCard
              title="QA Command Center"
              description="Dashboard de produtos, projetos, agentes e automações de QA."
              href="/command-center/"
              icon="Command"
              accentColor="#22C55E"
              status="online"
            />
            <ModuleCard
              title="Core & Knowledge Engine"
              description="Motor de dados central — entidades, tipos, relações e carregadores."
              href="/knowledge-graph/"
              icon="Brain"
              accentColor="#A855F7"
              status="online"
            />
            <ModuleCard
              title="Live Docs"
              description="Documentação viva do sistema — ADRs, arquitetura, guias e decisões."
              href="/docs/"
              icon="FileText"
              accentColor="#EAB308"
              status="live"
            />
          </div>
        </section>
      </SectionReveal>

      {/* === STATS === */}
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

      {/* === HOW JUN FAN THINKS === */}
      <SectionReveal delay={0.05}>
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-px h-5 bg-accent-qa/40" />
            <h2 className="text-lg font-semibold text-text-primary tracking-[-0.01em]">
              How Jun Fan thinks
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-border-subtle/40 to-transparent" />
          </div>

          <AnimatedGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatedItem>
              <PhilosophyCard
                title="Core"
                description="Entidades e tipos que estruturam todo o conhecimento do sistema."
                icon="Brain"
                accentColor="#4F8CFF"
                details={['Tipos: Product, Project, Agent', 'Relações tipadas', 'Carregadores modulares']}
              />
            </AnimatedItem>
            <AnimatedItem>
              <PhilosophyCard
                title="Knowledge Graph"
                description="Grafo navegável onde cada conexão revela o ecossistema do produto."
                icon="GitBranch"
                accentColor="#22C55E"
                details={['Layout orgânico por tipo', 'Busca semântica', 'Caminhos entre nós']}
              />
            </AnimatedItem>
            <AnimatedItem>
              <PhilosophyCard
                title="Decisions"
                description="ADRs e decisões de arquitetura registradas como nós do grafo."
                icon="Shield"
                accentColor="#C084FC"
                details={['ADR indexados', 'Rastreados por projeto', 'Impacto visível no grafo']}
              />
            </AnimatedItem>
            <AnimatedItem>
              <PhilosophyCard
                title="QA Automation"
                description="Agentes de QA, dashboards de cobertura e pipelines integrados."
                icon="BarChart3"
                accentColor="#FB923C"
                details={['Dashboards por produto', 'Agentes autônomos', 'Métricas em tempo real']}
              />
            </AnimatedItem>
            <AnimatedItem>
              <PhilosophyCard
                title="Live Docs"
                description="Documentação que evolui com o código — viva, não estática."
                icon="FileText"
                accentColor="#EAB308"
                details={['ADRs e arquitetura', 'Guias por produto', 'Docs geradas do grafo']}
              />
            </AnimatedItem>
            <AnimatedItem>
              <PhilosophyCard
                title="Workflow"
                description="Pipeline de absorver, refinar e construir — o ciclo do conhecimento."
                icon="Workflow"
                accentColor="#22D3EE"
                details={['Absorb: coleta de dados', 'Refine: estruturação', 'Build: produtos e agentes']}
              />
            </AnimatedItem>
          </AnimatedGrid>
        </section>
      </SectionReveal>

      {/* === PLATFORM SECTIONS === */}
      <SetModule module="home" />
      <SectionReveal delay={0.05}>
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ArchitectureTimeline />
            </div>
            <div className="space-y-6">
              <PlatformStatus />
              <CrossNav module="home" />
              <ActivityFeed compact />
              <MiniKnowledgeGraph />
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionDivider className="mb-16 max-w-3xl mx-auto" />

      {/* === PRODUCTS === */}
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

      {/* === PROJECTS === */}
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

      {/* === AI INSIGHTS === */}
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
