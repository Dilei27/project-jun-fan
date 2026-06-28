import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getDoc, getDocs } from '@/lib/content';
import { DocsSidebar } from '@/features/docs/docs-sidebar';
import { ArrowLeft } from 'lucide-react';

export function generateStaticParams() {
  return getDocs().map(d => ({ slug: d.id }));
}

export default async function DocDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getDoc(slug);
  const allDocs = getDocs();
  if (!doc) notFound();

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-10">
      <Link href="/docs/" className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-text-primary mb-6 transition-colors">
        <ArrowLeft size={14} /> Documentação
      </Link>

      <div className="flex flex-col md:flex-row gap-8">
        <DocsSidebar docs={allDocs} currentId={doc.id} />

        <article className="flex-1 min-w-0">
          <h1 className="text-2xl font-extrabold text-text-primary mb-2">{doc.title}</h1>
          <p className="text-text-secondary mb-8">{doc.description}</p>

          <div className="space-y-8">
            {doc.sections.map((section, i) => (
              <section key={i}>
                <h2 className="text-lg font-semibold text-text-primary mb-3">{section.heading}</h2>
                <p className="text-sm text-text-secondary leading-relaxed">{section.content}</p>
              </section>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}
