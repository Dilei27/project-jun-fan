import { getProjects } from '@/lib/content';
import { ProjectCard } from '@/components/cards/project-card';

export function ProjectGrid() {
  const projects = getProjects();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {projects.map(p => (
        <ProjectCard key={p.id} project={p} />
      ))}
    </div>
  );
}
