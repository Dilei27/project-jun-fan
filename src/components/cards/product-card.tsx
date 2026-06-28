import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import type { Product } from '@/types';

export function ProductCard({ product }: { product: Product }) {
  const statusVariant = product.status === 'online' ? 'success' : product.status === 'beta' ? 'warning' : 'default';

  return (
    <Link href={`/produto/${product.id}/`} className="block group">
      <Card hover className="h-full border-l-2" accent={product.accentColor}>
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-text-primary group-hover:text-[var(--accent)] transition-colors"
            style={{ '--accent': product.accentColor } as React.CSSProperties}>
            {product.name}
          </h3>
          <Badge variant={statusVariant}>{product.status}</Badge>
        </div>
        <p className="text-sm text-text-secondary leading-relaxed mb-4">{product.shortDescription}</p>
        <div className="flex flex-wrap gap-1.5">
          {product.stack.slice(0, 4).map(s => (
            <span key={s} className="px-2 py-0.5 text-xs text-text-muted bg-surface-soft rounded">{s}</span>
          ))}
          {product.stack.length > 4 && (
            <span className="px-2 py-0.5 text-xs text-text-muted bg-surface-soft rounded">+{product.stack.length - 4}</span>
          )}
        </div>
      </Card>
    </Link>
  );
}

export function ProductGateway({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map(p => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
