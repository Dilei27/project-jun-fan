import type { Product } from '@/types';

export function StatusStrip({ products }: { products: Product[] }) {
  const statusMap: Record<string, string> = {
    online: 'text-success',
    beta: 'text-warning',
    dev: 'text-text-muted',
  };

  return (
    <div className="flex flex-wrap gap-6 py-4">
      {products.map(p => (
        <div key={p.id} className="flex items-center gap-2 text-sm">
          <span className={`w-2 h-2 rounded-full ${statusMap[p.status] || 'text-text-muted'} bg-current`} />
          <span className="text-text-primary font-medium">{p.name}</span>
          <span className="text-text-muted">— {p.status === 'online' ? 'Online' : p.status === 'beta' ? 'Beta' : 'Dev'}</span>
        </div>
      ))}
    </div>
  );
}
