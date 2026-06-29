import { notFound } from 'next/navigation';
import { getProduct, getProducts } from '@/lib/content';
import { DashboardClient } from './dashboard-client';

export function generateStaticParams() {
  return getProducts().map(p => ({ slug: p.id }));
}

export default async function ProductDashboardPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  return <DashboardClient product={product} />;
}
