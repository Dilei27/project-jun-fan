'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getTimeline } from '@/lib/content';
import { Timeline } from '@/components/shared/timeline';
import { PageEntry } from '@/components/shared/page-entry';

export default function TimelinePage() {
  return (
    <PageEntry className="max-w-[1440px] mx-auto px-6 py-10">
      <Link
        href="/command-center/"
        className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-text-primary mb-6 transition-colors duration-200"
      >
        <ArrowLeft size={14} /> Command Center
      </Link>

      <h1 className="text-3xl font-extrabold text-text-primary mb-2">Trajetória</h1>
      <p className="text-text-secondary mb-8 max-w-xl">Evolução profissional de QA manual à fundação do Project Jun Fan.</p>

      <div className="max-w-xl">
        <Timeline entries={getTimeline()} />
      </div>
    </PageEntry>
  );
}
