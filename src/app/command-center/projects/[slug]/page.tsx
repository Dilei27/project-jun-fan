import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProject, getProjects } from '@/lib/content';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';

export function generateStaticParams() {
  return getProjects().map(p => ({ slug: p.id }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const statusLabel = project.status === 'concluido' ? 'Concluído' : 'Em andamento';
  const statusVariant = project.status === 'concluido' ? 'success' : 'warning' as const;

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-10">
      <Link href="/command-center/projects" className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-text-primary mb-6 transition-colors">
        <ArrowLeft size={14} /> Projetos
      </Link>

      <div className="flex items-start gap-4 mb-8">
        <h1 className="text-3xl font-extrabold text-text-primary">{project.title}</h1>
        <Badge variant={statusVariant as 'default' | 'success' | 'warning' | 'danger'} className="shrink-0 mt-1">{statusLabel}</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="p-5 bg-surface-default border border-border-subtle rounded-lg">
          <h3 className="text-xs font-semibold text-danger uppercase tracking-wider mb-2">Problema</h3>
          <p className="text-sm text-text-secondary">{project.problem}</p>
        </div>
        <div className="p-5 bg-surface-default border border-border-subtle rounded-lg">
          <h3 className="text-xs font-semibold text-success uppercase tracking-wider mb-2">Solução</h3>
          <p className="text-sm text-text-secondary">{project.solution}</p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold text-text-primary mb-3">Stack</h2>
        <div className="flex flex-wrap gap-2">
          {project.stack.map(s => (
            <span key={s} className="px-3 py-1.5 text-sm text-text-secondary bg-surface-soft border border-border-subtle rounded-md">{s}</span>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold text-text-primary mb-3">Impacto</h2>
        <p className="text-sm text-text-secondary bg-surface-default border border-border-subtle rounded-lg p-4">{project.impact}</p>
      </div>

      {project.decisions.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-text-primary mb-3">Decisões Técnicas</h2>
          <div className="space-y-2">
            {project.decisions.map(d => (
              <div key={d} className="flex items-center gap-2 p-3 bg-surface-default border border-border-subtle rounded-lg text-sm text-text-secondary">
                <div className="w-1.5 h-1.5 rounded-full bg-accent-qa shrink-0" />
                {d}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
