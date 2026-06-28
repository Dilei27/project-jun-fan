import { Search } from 'lucide-react';
import { searchAll } from '@/lib/search';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const q = (await searchParams).q || '';
  const results = q ? searchAll(q) : [];

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-10">
      <h1 className="text-3xl font-extrabold text-text-primary mb-6">Busca</h1>

      <form action="/busca/" method="GET" className="mb-8">
        <div className="flex gap-3 max-w-xl">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Pesquisar produtos, projetos, documentação..."
              className="w-full pl-10 pr-4 py-3 bg-surface-default border border-border-subtle rounded-lg text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-accent-qa transition-colors"
              aria-label="Pesquisar"
            />
          </div>
          <button type="submit" className="px-5 py-3 bg-accent-qa text-white rounded-lg text-sm font-medium hover:bg-accent-qa/90 transition-colors cursor-pointer">
            Buscar
          </button>
        </div>
      </form>

      {q && (
        <p className="text-sm text-text-muted mb-6">
          {results.length} resultado{results.length !== 1 ? 's' : ''} para &ldquo;{q}&rdquo;
        </p>
      )}

      {results.length > 0 && (
        <div className="space-y-3 max-w-2xl">
          {results.map((r, i) => (
            <a
              key={`${r.type}-${r.title}-${i}`}
              href={r.url}
              className="block p-4 bg-surface-default border border-border-subtle rounded-lg hover:bg-surface-elevated hover:border-border-strong transition-all"
            >
              <div className="flex items-center gap-3 mb-1">
                <span className="text-xs uppercase tracking-wider text-accent-qa font-medium">{r.type}</span>
              </div>
              <h3 className="text-sm font-semibold text-text-primary">{r.title}</h3>
              <p className="text-xs text-text-muted mt-1">{r.snippet}</p>
            </a>
          ))}
        </div>
      )}

      {q && results.length === 0 && (
        <p className="text-text-muted text-sm">Nenhum resultado encontrado para &ldquo;{q}&rdquo;.</p>
      )}
    </div>
  );
}
