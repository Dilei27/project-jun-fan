import Link from 'next/link';
import { getProducts, getProjects } from '@/lib/content';
import { ProductGateway } from '@/components/cards/product-card';
import { FeaturedProjects } from '@/components/cards/project-card';
import { AIInsightCards } from '@/components/cards/ai-insight-card';
import { ArrowRight, Command, Bot, BookOpen } from 'lucide-react';

export default function HomePage() {
  const products = getProducts();
  const projects = getProjects();

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-10">
      {/* Hero */}
      <section className="mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary mb-3 leading-tight">
          Project Jun Fan
        </h1>
        <p className="text-lg text-text-secondary max-w-2xl leading-relaxed mb-8">
          Fundação front-end first para uma plataforma de produtos, documentação e experiências técnicas de automação, QA e IA aplicada.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/command-center/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent-qa text-white rounded-lg text-sm font-medium hover:bg-accent-qa/90 transition-colors">
            <Command size={16} /> QA Command Center <ArrowRight size={16} />
          </Link>
          <Link href="/docs/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-surface-elevated border border-border-subtle text-text-primary rounded-lg text-sm font-medium hover:bg-surface-soft transition-colors">
            <BookOpen size={16} /> Documentação
          </Link>
          <Link href="/hub/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-surface-elevated border border-border-subtle text-text-primary rounded-lg text-sm font-medium hover:bg-surface-soft transition-colors">
            <Bot size={16} /> Hub
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
        <ProductGateway products={products} />
      </section>

      {/* Projects */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-text-primary">Projetos</h2>
          <Link href="/command-center/projects" className="text-sm text-accent-qa hover:underline">
            Ver todos →
          </Link>
        </div>
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
