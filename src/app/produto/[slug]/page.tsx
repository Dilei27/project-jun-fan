import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProduct, getProducts } from '@/lib/content';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ExternalLink } from 'lucide-react';

export function generateStaticParams() {
  return getProducts().map(p => ({ slug: p.id }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const statusVariant = product.status === 'online' ? 'success' : product.status === 'beta' ? 'warning' : 'default';

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-10">
      <Link href="/" className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-text-primary mb-6 transition-colors">
        <ArrowLeft size={14} /> Voltar
      </Link>

      <div className="flex items-start gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-text-primary mb-2">{product.name}</h1>
          <p className="text-text-secondary max-w-2xl">{product.shortDescription}</p>
        </div>
        <Badge variant={statusVariant as 'default' | 'success' | 'warning' | 'danger'} className="shrink-0 mt-1">{product.status}</Badge>
      </div>

      {/* Problem / Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <div className="p-4 bg-surface-default border border-border-subtle rounded-lg">
          <span className="text-xs font-semibold text-danger uppercase tracking-wider">Problema</span>
          <p className="text-sm text-text-secondary mt-2">{product.problem}</p>
        </div>
        <div className="p-4 bg-surface-default border border-border-subtle rounded-lg">
          <span className="text-xs font-semibold text-success uppercase tracking-wider">Solução</span>
          <p className="text-sm text-text-secondary mt-2">{product.solution}</p>
        </div>
      </div>

      {/* Architecture Flow */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Arquitetura</h2>
        <div className="flex items-center flex-wrap gap-2 p-4 bg-surface-default border border-border-subtle rounded-lg">
          {product.architectureFlow.split(' -> ').map((step, i, arr) => (
            <span key={step}>
              <span className="px-3 py-1.5 bg-surface-soft text-text-secondary text-sm rounded-md border border-border-subtle">{step}</span>
              {i < arr.length - 1 && <span className="text-text-muted mx-1">→</span>}
            </span>
          ))}
        </div>
      </div>

      {/* Metrics & Roadmap */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div>
          <h2 className="text-lg font-semibold text-text-primary mb-4">Métricas</h2>
          <div className="grid grid-cols-3 gap-3">
            {Object.entries(product.metrics).map(([key, val]) => (
              <div key={key} className="p-4 bg-surface-default border border-border-subtle rounded-lg text-center">
                <div className="text-2xl font-bold text-text-primary">{val}</div>
                <div className="text-xs text-text-muted mt-1 capitalize">{key.replace('_', ' ')}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-text-primary mb-4">Roadmap</h2>
          <div className="space-y-2">
            {product.roadmap.map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-surface-default border border-border-subtle rounded-lg">
                <div className="w-1.5 h-1.5 rounded-full bg-accent-qa shrink-0" />
                <span className="text-sm text-text-secondary">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-4">
        <Link href={`/produto/${product.id}/dashboard/`} className="inline-flex items-center gap-1.5 px-4 py-2 bg-surface-elevated border border-border-subtle rounded-lg text-sm text-text-primary hover:bg-surface-soft transition-colors">
          Dashboard <ExternalLink size={14} />
        </Link>
        <Link href={`/produto/${product.id}/demo/`} className="inline-flex items-center gap-1.5 px-4 py-2 bg-surface-elevated border border-border-subtle rounded-lg text-sm text-text-primary hover:bg-surface-soft transition-colors">
          Demo interativa <ExternalLink size={14} />
        </Link>
      </div>
    </div>
  );
}
