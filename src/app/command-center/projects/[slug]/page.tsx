import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProject, getProjects } from '@/lib/content';
import { ArrowLeft } from 'lucide-react';
import { ProjectDetail } from '@/features/command-center/components/project-detail';

export function generateStaticParams() {
  return getProjects().map(p => ({ slug: p.id }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-10">
      <Link href="/command-center/projects" className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-text-primary mb-6 transition-colors">
        <ArrowLeft size={14} /> Projetos
      </Link>
      <ProjectDetail project={project} />
    </div>
  );
}
