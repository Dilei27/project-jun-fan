'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { PageEntry } from '@/components/shared/page-entry';

export function ProjectPageShell({ children }: { children: React.ReactNode }) {
  return (
    <PageEntry className="max-w-[1440px] mx-auto px-6 py-10">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-text-primary mb-6 transition-colors duration-200"
      >
        <ArrowLeft size={14} /> Voltar
      </Link>
      {children}
    </PageEntry>
  );
}
