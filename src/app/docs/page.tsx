import Link from 'next/link';
import { getDocs } from '@/lib/content';
import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export default function DocsIndexPage() {
  const docs = getDocs();

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-10">
      <h1 className="text-3xl font-extrabold text-text-primary mb-2">Documentação</h1>
      <p className="text-text-secondary mb-8 max-w-xl">Arquitetura, setup, produtos e decisões técnicas do ecossistema Jun Fan.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {docs.map(d => (
          <Link key={d.id} href={`/docs/${d.id}/`}>
            <Card hover className="h-full">
              <h3 className="text-base font-semibold text-text-primary mb-2">{d.title}</h3>
              <p className="text-sm text-text-secondary mb-4">{d.description}</p>
              <span className="inline-flex items-center gap-1 text-sm text-accent-qa group-hover:underline">
                Ler <ArrowRight size={14} />
              </span>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
