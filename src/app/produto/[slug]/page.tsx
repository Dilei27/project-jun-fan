import { notFound } from 'next/navigation';
import { getProduct, getProducts } from '@/lib/content';
import { ProductClient } from './product-client';

export function generateStaticParams() {
  return getProducts().map(p => ({ slug: p.id }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  return <ProductClient product={product} />;
}
