'use client';

import { motion } from 'framer-motion';
import { motion as m } from '@/design-system/motion';
import { StatusDot, type StatusKind } from '@/components/shared/status-dot';
import type { Product } from '@/types';

const statusKind: Record<string, StatusKind> = {
  online: 'online',
  beta: 'beta',
  dev: 'dev',
};

const statusLabel: Record<string, string> = {
  online: 'Online',
  beta: 'Beta',
  dev: 'Em desenvolvimento',
};

export function StatusStrip({ products }: { products: Product[] }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: m.stagger.tight } },
      }}
      className="flex flex-wrap gap-x-6 gap-y-2 py-4"
    >
      {products.map(p => (
        <motion.div
          key={p.id}
          variants={{
            hidden: { opacity: 0, y: 6 },
            visible: { opacity: 1, y: 0, transition: { duration: m.duration.normal, ease: m.easing.out } },
          }}
          className="flex items-center gap-2 text-sm"
        >
          <StatusDot status={statusKind[p.status] || 'idle'} size={7} />
          <span className="text-text-primary font-medium">{p.name}</span>
          <span className="text-text-muted">— {statusLabel[p.status] || p.status}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}
