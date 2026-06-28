import Link from 'next/link';
import { getProducts, getProjects } from '@/lib/content';
import { ProductGateway } from '@/components/cards/product-card';
import { FeaturedProjects } from '@/components/cards/project-card';
import { AIInsightCards } from '@/components/cards/ai-insight-card';
import { AnimatedGrid } from '@/components/shared/animated-grid';
import { ArrowRight, Command } from 'lucide-react';

export default function HomePage() {
  const products = getProducts();
  const projects = getProjects();

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-10">
      {/* Hero */}
      <section className="mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-medium text-accent-qa bg-accent-qa/10 border border-accent-qa/20 rounded-full">
          <span className="w-2 h-2 rounded-full bg-success" />
          Product Operating System — online
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-text-primary mb-3 leading-[1.05] tracking-tight">
          Project Jun Fan
        </h1>
        <p className="text-lg text-text-secondary max-w-2xl leading-relaxed mb-3">
          Plataforma de produtos, documentação e experiências técnicas de automação, QA e IA aplicada.
        </p>
        <p className="text-base text-accent-qa font-medium mb-8 tracking-wide">
          Absorb. Refine. Build.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/command-center/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent-qa text-white rounded-lg text-sm font-medium hover:bg-accent-qa/90 transition-colors">
            <Command size={16} /> Explorar QA Command Center <ArrowRight size={16} />
          </Link>
          <Link href="/docs/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-surface-elevated border border-border-subtle text-text-primary rounded-lg text-sm font-medium hover:bg-surface-soft transition-colors">
            Documentação
          </Link>
        </div>
      </section>

      {/* Products */}
      <section className="mb-16" id="produtos">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-text-primary">Produtos</h2>
          <Link href="/command-center/" className="text-sm text-accent-qa hover:underline">
            Ver completo →
          </Link>
        </div>
        <AnimatedGrid>
          <ProductGateway products={products} />
        </AnimatedGrid>
      </section>

      {/* Projects */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-text-primary">Projetos</h2>
          <Link href="/command-center/projects" className="text-sm text-accent-qa hover:underline">
            Ver todos →
          </Link>
        </div>
        <AnimatedGrid>
          <FeaturedProjects projects={projects} />
        </AnimatedGrid>
      </section>

      {/* AI Insights */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-text-primary mb-6">Insights</h2>
        <AnimatedGrid>
          <AIInsightCards />
        </AnimatedGrid>
      </section>
    </div>
  );
}
