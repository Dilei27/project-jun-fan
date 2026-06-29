import { notFound } from 'next/navigation';
import { getProject, getProjects } from '@/lib/content';
import { ProjectDetail } from '@/features/command-center/components/project-detail';
import { ProjectPageShell } from './project-shell';

export function generateStaticParams() {
  return getProjects().map(p => ({ slug: p.id }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return (
    <ProjectPageShell>
      <ProjectDetail project={project} />
    </ProjectPageShell>
  );
}
