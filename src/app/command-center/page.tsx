import { getProducts, getProjects, getTimeline, getDecisions } from '@/lib/content';
import { StatusStrip } from '@/components/shared/status-strip';
import { ProductGateway } from '@/components/cards/product-card';
import { FeaturedProjects } from '@/components/cards/project-card';
import { Timeline } from '@/components/shared/timeline';
import { AIInsightCards } from '@/components/cards/ai-insight-card';
import { HeroCommandCenter } from '@/features/command-center/components/hero-command-center';
import { MetricsGrid } from '@/features/command-center/components/metrics-grid';


export default function CommandCenterPage() {
  const products = getProducts();
  const projects = getProjects();
  const timeline = getTimeline();
  const decisions = getDecisions();

  return (
    <div>
      <HeroCommandCenter />

      <div className="max-w-[1440px] mx-auto px-6">
        {/* Status Strip */}
        <section className="mb-16">
          <h2 className="sr-only">Status dos Produtos</h2>
          <StatusStrip products={products} />
        </section>

        {/* Impact Metrics */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold text-text-primary mb-6">Impacto Gerado</h2>
          <MetricsGrid />
        </section>

        {/* Products */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold text-text-primary mb-6">Produtos</h2>
          <ProductGateway products={products} />
        </section>

        {/* Timeline */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold text-text-primary mb-6">Trajetória</h2>
          <Timeline entries={timeline} />
        </section>

        {/* Projects */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold text-text-primary mb-6">Projetos em Destaque</h2>
          <FeaturedProjects projects={projects} />
        </section>

        {/* Decisions */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold text-text-primary mb-6">Decisões Técnicas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {decisions.slice(0, 2).map(d => (
              <a key={d.id} href={`/decisoes/#${d.id}`}
                className="p-4 bg-surface-default border border-border-subtle rounded-lg hover:bg-surface-elevated transition-colors">
                <h3 className="text-sm font-semibold text-text-primary mb-1">{d.decision}</h3>
                <p className="text-xs text-text-muted">{d.context}</p>
              </a>
            ))}
            <a href="/decisoes/"
              className="p-4 bg-surface-default border border-border-subtle rounded-lg hover:bg-surface-elevated transition-colors flex items-center justify-center text-sm text-accent-qa">
              Ver todas as decisões →
            </a>
          </div>
        </section>

        {/* AI Insights */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold text-text-primary mb-6">Insights</h2>
          <AIInsightCards />
        </section>
      </div>
    </div>
  );
}
