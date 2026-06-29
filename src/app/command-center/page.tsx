'use client';

import { useState, useEffect } from 'react';
import { getProducts, getProjects, getTimeline, getDecisions } from '@/lib/content';
import { ProductGateway } from '@/components/cards/product-card';
import { FeaturedProjects } from '@/components/cards/project-card';
import { AIInsightCards } from '@/components/cards/ai-insight-card';
import { BootLoader } from '@/features/command-center/components/boot-loader';
import { DashboardHeader } from '@/features/command-center/components/dashboard-header';
import { StatCardsGrid } from '@/features/command-center/components/stat-cards-grid';
import { PipelineTimeline } from '@/features/command-center/components/pipeline-timeline';
import { QualityRadar } from '@/features/command-center/components/quality-radar';
import { RecentDecisions } from '@/features/command-center/components/recent-decisions';
import { KnowledgeActivity } from '@/features/command-center/components/knowledge-activity';
import { QuickActions } from '@/features/command-center/components/quick-actions';
import { DashboardLoading } from '@/features/command-center/components/dashboard-loading';
import { DashboardError } from '@/features/command-center/components/dashboard-error';
import { SkillsCloud } from '@/features/command-center/components/skills-cloud';
import { ArchitectureFlow } from '@/features/command-center/components/architecture-flow';
import { StatusStrip } from '@/components/shared/status-strip';
import { SectionReveal } from '@/components/shared/section-reveal';
import { SectionDivider } from '@/components/shared/section-divider';
import { CrossNav } from '@/components/platform/cross-nav';
import { MiniKnowledgeGraph } from '@/components/platform/mini-knowledge-graph';
import { CrossReferences, getModuleReferences } from '@/components/platform/cross-references';
import { usePlatform } from '@/components/platform/platform-context';

export default function CommandCenterPage() {
  const { setCurrentModule } = usePlatform();
  useEffect(() => { setCurrentModule('command-center'); }, [setCurrentModule]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const products = getProducts();
  const projects = getProjects();
  const timeline = getTimeline();
  const decisions = getDecisions();

  if (error) {
    return (
      <div className="max-w-[1440px] mx-auto px-6 py-10">
        <DashboardError message={error} onRetry={() => setError(null)} />
      </div>
    );
  }

  return (
    <div>
      <BootLoader />

      {loading ? (
        <div className="max-w-[1440px] mx-auto px-6 py-10">
          <DashboardLoading />
        </div>
      ) : (
        <div className="max-w-[1440px] mx-auto px-6 py-10">
          {/* Dashboard Header */}
          <DashboardHeader />

          {/* Ambient glow */}
          <div
            aria-hidden
            className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 50% 60% at 50% 0%, rgba(79, 140, 255, 0.04), transparent 70%)',
            }}
          />

          {/* Stat Cards */}
          <StatCardsGrid />

          <SectionDivider className="mb-8 max-w-3xl mx-auto" />

          {/* Pipeline + Timeline */}
          <PipelineTimeline limit={4} />

          {/* Quality Radar */}
          <QualityRadar />

          {/* Recent Decisions */}
          <RecentDecisions />

          {/* Knowledge Activity */}
          <KnowledgeActivity />

          {/* Quick Actions */}
          <QuickActions />

          {/* Cross Navigation + Mini KG */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="md:col-span-2">
              <CrossNav module="qa" />
            </div>
            <div className="space-y-4">
              <MiniKnowledgeGraph />
              <CrossReferences references={getModuleReferences('command-center')} title="Navegação Rápida" />
            </div>
          </div>

          <SectionDivider className="mb-12 max-w-3xl mx-auto" />

          {/* === EXISTING SECTIONS === */}

          <SectionReveal>
            <section className="mb-12">
              <h2 className="sr-only">Status dos Produtos</h2>
              <StatusStrip products={products} />
            </section>
          </SectionReveal>

          <SectionReveal>
            <section className="mb-12" id="produtos">
              <h2 className="text-base font-semibold text-text-primary mb-5 tracking-[-0.01em] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-qa/60" />
                Produtos
              </h2>
              <ProductGateway products={products} />
            </section>
          </SectionReveal>

          <SectionDivider className="mb-12 max-w-3xl mx-auto" />

          <SectionReveal>
            <section className="mb-12">
              <h2 className="text-base font-semibold text-text-primary mb-5 tracking-[-0.01em] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#22D3EE' }} />
                Stack Técnica
              </h2>
              <SkillsCloud />
            </section>
          </SectionReveal>

          <SectionDivider className="mb-12 max-w-3xl mx-auto" />

          <SectionReveal>
            <section className="mb-12">
              <h2 className="text-base font-semibold text-text-primary mb-5 tracking-[-0.01em] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#C084FC' }} />
                Arquitetura
              </h2>
              <ArchitectureFlow />
            </section>
          </SectionReveal>

          <SectionDivider className="mb-12 max-w-3xl mx-auto" />

          <SectionReveal>
            <section className="mb-12">
              <h2 className="text-base font-semibold text-text-primary mb-5 tracking-[-0.01em] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#22C55E' }} />
                Projetos em Destaque
              </h2>
              <FeaturedProjects projects={projects} />
            </section>
          </SectionReveal>

          <SectionDivider className="mb-12 max-w-3xl mx-auto" />

          <SectionReveal>
            <section className="mb-10">
              <h2 className="text-base font-semibold text-text-primary mb-5 tracking-[-0.01em] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#F59E0B' }} />
                Insights
              </h2>
              <AIInsightCards />
            </section>
          </SectionReveal>
        </div>
      )}
    </div>
  );
}
