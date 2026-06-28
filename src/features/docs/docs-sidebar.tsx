import Link from 'next/link';
import type { Doc } from '@/types';

export function DocsSidebar({ docs, currentId }: { docs: Doc[]; currentId?: string }) {
  return (
    <aside className="w-full md:w-56 shrink-0">
      <nav className="md:sticky md:top-20 space-y-1" aria-label="Navegação da documentação">
        {docs.map(d => (
          <Link
            key={d.id}
            href={`/docs/${d.id}/`}
            className={`block px-3 py-2 text-sm rounded-md transition-colors ${
              d.id === currentId
                ? 'bg-accent-qa/10 text-accent-qa font-medium'
                : 'text-text-secondary hover:text-text-primary hover:bg-surface-soft'
            }`}
          >
            {d.title}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
