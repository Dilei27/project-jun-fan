import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProduct, getProducts } from '@/lib/content';
import { ArrowLeft } from 'lucide-react';

export function generateStaticParams() {
  return getProducts().map(p => ({ slug: p.id }));
}

export default async function ProductDashboardPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-10">
      <Link href={`/produto/${product.id}/`} className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-text-primary mb-6 transition-colors">
        <ArrowLeft size={14} /> {product.name}
      </Link>

      <h1 className="text-2xl font-extrabold text-text-primary mb-2">Dashboard — {product.name}</h1>
      <p className="text-text-secondary mb-8">Métricas simuladas do produto.</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {Object.entries(product.metrics).map(([key, val]) => (
          <div key={key} className="p-5 bg-surface-default border border-border-subtle rounded-lg text-center">
            <div className="text-3xl font-bold text-text-primary">{val}</div>
            <div className="text-sm text-text-muted mt-1 capitalize">{key.replace(/_/g, ' ')}</div>
          </div>
        ))}
      </div>

      <div className="p-6 bg-surface-default border border-border-subtle rounded-lg">
        <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-4">Atividades Recentes</h2>
        <div className="space-y-3">
          {['Deploy v2.1.0', 'Nova métrica de cobertura', 'Bugfix: validação de entrada', 'Atualização de dependências', 'Review de arquitetura'].map((a, i) => (
            <div key={i} className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 rounded-full bg-accent-qa shrink-0" />
              <span className="text-text-secondary">{a}</span>
              <span className="text-xs text-text-muted ml-auto">há {i + 1}h</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
