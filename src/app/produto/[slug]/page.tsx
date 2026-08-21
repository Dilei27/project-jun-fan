import { notFound } from 'next/navigation';
import { getProduct, getProducts } from '@/lib/content';
import { ProductClient } from './product-client';
import { LegacyProjectRedirect } from './legacy-project-redirect';
import { publicProjectIds } from '@/content/public-project-registry';

export function generateStaticParams() {
  return getProducts().map(p => ({ slug: p.id }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  if (slug !== 'qa-command-center' && publicProjectIds.includes(slug as typeof publicProjectIds[number])) {
    return <LegacyProjectRedirect projectId={slug} />;
  }
  return <ProductClient product={product} />;
}
