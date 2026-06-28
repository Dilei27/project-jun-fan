import { getProducts, getProjects, getTimeline } from '@/lib/content';
import { ProductGateway } from '@/components/cards/product-card';
import { StatusStrip } from '@/components/shared/status-strip';
import { Timeline } from '@/components/shared/timeline';
import { FeaturedProjects } from '@/components/cards/project-card';
import { AIInsightCards } from '@/components/cards/ai-insight-card';

export default function HomePage() {
  const products = getProducts();
  const projects = getProjects();
  const timeline = getTimeline();

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-10">
      {/* Hero */}
      <section className="mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary mb-4 leading-tight">
          QA Command Center
        </h1>
        <p className="text-lg text-text-secondary max-w-2xl leading-relaxed">
          Hub central, portfólio vivo e cockpit do ecossistema de automação, QA e IA aplicada do Project Jun Fan.
        </p>
      </section>

      {/* Status Strip */}
      <section className="mb-16">
        <h2 className="sr-only">Status dos Produtos</h2>
        <StatusStrip products={products} />
      </section>

      {/* Product Gateway */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold text-text-primary mb-6">Produtos</h2>
        <ProductGateway products={products} />
      </section>

      {/* Timeline */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold text-text-primary mb-6">Trajetória</h2>
        <Timeline entries={timeline} />
      </section>

      {/* Featured Projects */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold text-text-primary mb-6">Projetos em Destaque</h2>
        <FeaturedProjects projects={projects} />
      </section>

      {/* AI Insights */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-text-primary mb-6">Insights</h2>
        <AIInsightCards />
      </section>
    </div>
  );
}
