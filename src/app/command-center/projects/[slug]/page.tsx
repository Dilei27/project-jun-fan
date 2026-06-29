import { notFound } from 'next/navigation';
import { getProject, getProjects } from '@/lib/content';
import { ProjectDetail } from '@/features/command-center/components/project-detail';
import { ProjectSlugClient } from './project-slug-client';

export function generateStaticParams() {
  return getProjects().map(p => ({ slug: p.id }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return (
    <ProjectSlugClient>
      <ProjectDetail project={project} />
    </ProjectSlugClient>
  );
}
