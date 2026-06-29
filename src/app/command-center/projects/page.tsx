'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ProjectGrid } from '@/features/command-center/components/project-grid';
import { PageEntry } from '@/components/shared/page-entry';

export default function ProjectsPage() {
  return (
    <PageEntry className="max-w-[1440px] mx-auto px-6 py-10">
      <Link
        href="/command-center/"
        className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-text-primary mb-6 transition-colors duration-200"
      >
        <ArrowLeft size={14} /> Command Center
      </Link>

      <h1 className="text-3xl font-extrabold text-text-primary mb-2">Projetos</h1>
      <p className="text-text-secondary mb-8 max-w-xl">Projetos de automação, QA e IA aplicada que construíram o ecossistema.</p>

      <ProjectGrid />
    </PageEntry>
  );
}
