'use client';

import { motion, type Variants } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { TiltCard } from '@/components/shared/tilt-card';
import { motion as m } from '@/design-system/motion';
import type { Product } from '@/types';
import Link from 'next/link';

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: m.duration.normal, ease: [...m.easing.out] },
  },
};

function hexToRgb(hex: string): string {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

export function ProductCard({ product }: { product: Product }) {
  const statusVariant =
    product.status === 'online' ? 'success' : product.status === 'beta' ? 'warning' : 'default';
  const accentRgb = hexToRgb(product.accentColor);

  return (
    <motion.div variants={itemVariants} className="h-full">
      <Link href={`/produto/${product.id}/`} className="block h-full">
        <TiltCard
          maxTilt={2}
          accentRgb={accentRgb}
          spotlightIntensity={0.12}
          liftOnHover={false}
          className="h-full"
        >
          <article
            className="jf-lift relative h-full bg-surface-default/80 border border-border-subtle/60 rounded-lg p-6 border-l-2 transition-[box-shadow,border-color,background-color] duration-300"
            style={{
              borderLeftColor: product.accentColor,
              boxShadow:
                'inset 0 1px 0 0 rgba(244, 247, 250, 0.03), 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 4px 12px -4px rgba(0, 0, 0, 0.3)',
            }}
          >
            {/* Accent corner halo on hover */}
            <div
              aria-hidden
              className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 80% 60% at 0% 0%, ${product.accentColor}12, transparent 70%)`,
              }}
            />

            <div className="relative flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold text-text-primary group-hover:text-white transition-colors duration-200">
                {product.name}
              </h3>
              <Badge variant={statusVariant}>{product.status}</Badge>
            </div>

            <p className="relative text-sm text-text-secondary leading-relaxed mb-4">
              {product.shortDescription}
            </p>

            <div className="relative flex flex-wrap gap-1.5">
              {product.stack.slice(0, 4).map(s => (
                <span
                  key={s}
                  className="px-2 py-0.5 text-xs text-text-muted bg-surface-soft rounded transition-all duration-200 group-hover:bg-surface-default group-hover:text-text-secondary"
                >
                  {s}
                </span>
              ))}
              {product.stack.length > 4 && (
                <span className="px-2 py-0.5 text-xs text-text-muted bg-surface-soft rounded">
                  +{product.stack.length - 4}
                </span>
              )}
            </div>
          </article>
        </TiltCard>
      </Link>
    </motion.div>
  );
}

export function ProductGateway({ products }: { products: Product[] }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: m.stagger.default, delayChildren: 0.05 } },
      }}
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      {products.map(p => (
        <ProductCard key={p.id} product={p} />
      ))}
    </motion.div>
  );
}
