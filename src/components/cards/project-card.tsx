import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import type { Project } from '@/types';

export function ProjectCard({ project }: { project: Project }) {
  const statusLabel = project.status === 'concluido' ? 'Concluído' : 'Em andamento';
  const statusVariant = project.status === 'concluido' ? 'success' : 'warning';

  return (
    <Link href={`/projeto/${project.id}/`} className="block group">
      <Card hover>
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-base font-semibold text-text-primary group-hover:text-accent-qa transition-colors">{project.title}</h3>
          <Badge variant={statusVariant as 'success' | 'warning'}>{statusLabel}</Badge>
        </div>
        <p className="text-sm text-text-secondary mb-3">{project.context}</p>
        <p className="text-xs text-text-muted">{project.impact}</p>
      </Card>
    </Link>
  );
}

export function FeaturedProjects({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {projects.map(p => (
        <ProjectCard key={p.id} project={p} />
      ))}
    </div>
  );
}
