import Link from 'next/link';
import { getProjects } from '@/lib/content';
import { getFullGraph } from '@/core';
import { FeaturedProjects } from '@/components/cards/project-card';
import { AIInsightCards } from '@/components/cards/ai-insight-card';
import { FadeIn, HeroStage } from '@/components/shared/reveal';
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
import { TranslatedText } from '@/i18n/language-context';
import { LivingKnowledgeHero } from '@/features/knowledge-graph/living-knowledge-hero';
import { HomeGraphSignal } from '@/features/knowledge-graph/home-graph-signal';
import { EnterSystemLink } from '@/features/knowledge-graph/enter-system-link';
import { AmbientLightField } from '@/components/atmosphere/atmosphere-background';

function MobileCoreStage() {
  return (
    <div
      className="relative mx-auto mt-8 h-[clamp(360px,70vw,520px)] min-h-[360px] w-full max-w-[520px] shrink-0 overflow-hidden"
      data-jf-hero-core-stage
      aria-label="Knowledge Core"
    >
      <LivingKnowledgeHero />
    </div>
  );
}

function MobileHero() {
  return (
    <div className="relative flex flex-col px-5 pt-[calc(env(safe-area-inset-top)+0.75rem)] pb-[calc(1.75rem+env(safe-area-inset-bottom)+1rem)] md:hidden" data-jf-mobile-hero>
      <div className="flex justify-center" data-jf-hero-status>
        <FadeIn delay={0.05} y={6}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-accent-qa bg-accent-qa/8 border border-accent-qa/20 rounded-full shadow-[inset_0_1px_0_0_rgba(79,140,255,0.08)]">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-qa jf-pulse-dot" />
            SYSTEM ONLINE
          </div>
        </FadeIn>
      </div>
      <div className="mx-auto mt-4 w-full max-w-md text-center" data-jf-hero-identity>
        <h1 className="text-[2rem] font-extrabold text-text-primary mb-2 leading-[0.94] tracking-[-0.025em]">
          <span className="inline">Project&nbsp;</span>
          <span className="inline">Jun Fan</span>
        </h1>
        <FadeIn delay={0.45} y={10}>
          <p className="text-base text-text-secondary leading-relaxed">Product Operating System</p>
        </FadeIn>
        <FadeIn delay={0.55}>
          <div className="mt-3 mb-5 flex items-center justify-center gap-3 text-sm text-text-muted">
            <span className="font-medium text-accent-qa/90 tracking-wide">Absorb.</span>
            <span className="opacity-30">·</span>
            <span className="font-medium text-accent-teal/80 tracking-wide">Refine.</span>
            <span className="opacity-30">·</span>
            <span className="font-medium text-accent-qa/90 tracking-wide">Build.</span>
          </div>
        </FadeIn>
        <div data-jf-hero-cta>
          <FadeIn delay={0.65} y={6}>
            <div className="flex flex-wrap justify-center gap-3">
              <EnterSystemLink />
            </div>
          </FadeIn>
        </div>
      </div>
      <MobileCoreStage />
    </div>
  );
}

export default function HomePage() {
  const projects = getProjects();
  const graph = getFullGraph();

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-6 md:px-6 md:py-10">

      {/* === HERO === */}
      <HeroStage className="relative left-1/2 mb-14 w-screen -translate-x-1/2 overflow-hidden bg-bg-deep md:mb-20 md:h-[calc(100svh-3.5rem)] md:min-h-[620px]">
        {/* Mobile: explicit document flow — STATUS → IDENTITY → CTA → CORE */}
        <MobileHero />
        {/* Desktop: original approved layered composition */}
        <div className="relative hidden h-full md:block md:h-[calc(100svh-3.5rem)] md:min-h-[620px]">
          <AmbientLightField />
          <div className="pointer-events-auto absolute inset-0">
            <LivingKnowledgeHero />
          </div>
          <div className="pointer-events-none relative z-10 mx-auto flex h-full max-w-[1440px] items-end px-6 pt-20 pb-36">
          <div className="pointer-events-auto max-w-md text-left">
            <FadeIn delay={0.05} y={6}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 text-xs font-medium text-accent-qa bg-accent-qa/8 border border-accent-qa/20 rounded-full shadow-[inset_0_1px_0_0_rgba(79,140,255,0.08)]">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-qa jf-pulse-dot" />
                SYSTEM ONLINE
              </div>
            </FadeIn>

            <h1 className="md:text-5xl text-4xl font-extrabold text-text-primary mb-3 leading-[0.94] tracking-[-0.025em]">
              <span className="block">Project</span>
              <span className="block">Jun Fan</span>
            </h1>

            <FadeIn delay={0.45} y={10}>
              <p className="text-base text-text-secondary leading-relaxed">Product Operating System</p>
            </FadeIn>

            <FadeIn delay={0.55}>
              <div className="flex items-center justify-start gap-3 mt-3 mb-7 text-sm text-text-muted">
                <span className="font-medium text-accent-qa/90 tracking-wide">Absorb.</span>
                <span className="opacity-30">·</span>
                <span className="font-medium text-accent-teal/80 tracking-wide">Refine.</span>
                <span className="opacity-30">·</span>
                <span className="font-medium text-accent-qa/90 tracking-wide">Build.</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.65} y={6}>
              <div className="flex flex-wrap justify-start gap-3">
                <EnterSystemLink />
              </div>
            </FadeIn>
          </div>
          </div>
        </div>
      </HeroStage>

      {/* === MODULE CARDS === */}
      <SectionReveal delay={0.05}>
        <section className="relative mb-20">
          <HomeGraphSignal nodeId="architecture-core" label="Arquitetura" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <ModuleCard
              title="Knowledge Graph"
              descriptionKey="home.modules.graph.description"
              href="/knowledge-graph/"
              icon="GitBranch"
              accentColor="#4F8CFF"
              status="online"
              primary
            />
            <ModuleCard
              title="QA Command Center"
              descriptionKey="home.modules.qa.description"
              href="/command-center/"
              icon="Command"
              accentColor="#22C55E"
              status="online"
            />
            <ModuleCard
              title="Core & Knowledge Engine"
              descriptionKey="home.modules.engine.description"
              href="/knowledge-graph/"
              icon="Brain"
              accentColor="#A855F7"
              status="online"
            />
            <ModuleCard
              title="Live Docs"
              descriptionKey="home.modules.docs.description"
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
            { value: projects.length, suffix: '', label: 'home.stats.projects' },
            { value: graph.nodes.length, suffix: '', label: 'Entidades' },
            { value: graph.edges.length, suffix: '', label: 'Relações' },
            { value: graph.nodes.filter(node => node.type === 'decision').length, suffix: '', label: 'Decisões' },
          ]}
        />
      </SectionReveal>

      {/* === HOW JUN FAN THINKS === */}
      <SectionReveal delay={0.05}>
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-px h-5 bg-accent-qa/40" />
            <h2 className="text-lg font-semibold text-text-primary tracking-[-0.01em]">
              <TranslatedText k="home.thinks" />
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

      {/* === PROJECTS === */}
      <SectionReveal>
        <section className="relative mb-16" id="projetos">
          <HomeGraphSignal nodeId="project-automacao-erp-uau" label="Projetos" />
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-text-primary tracking-[-0.01em]">
              <TranslatedText k="home.projects" />
            </h2>
            <Link
              href="/command-center/projects"
              className="text-sm text-accent-qa hover:underline transition-all duration-200"
            >
              <TranslatedText k="home.view.all" /> →
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
            <TranslatedText k="home.insights" />
          </h2>
          <AIInsightCards />
        </section>
      </SectionReveal>
    </div>
  );
}
