import { notFound } from 'next/navigation';
import { getDoc, getDocs } from '@/lib/content';
import { DocDetailClient } from './doc-client';

export function generateStaticParams() {
  return getDocs().map(d => ({ slug: d.id }));
}

export default async function DocDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getDoc(slug);
  const allDocs = getDocs();
  if (!doc) notFound();

  return <DocDetailClient doc={doc} allDocs={allDocs} />;
}
