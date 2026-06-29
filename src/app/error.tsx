'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import { motion as m } from '@/design-system/motion';
import { EmptyState } from '@/components/shared/empty-state';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: m.duration.slow, ease: m.easing.out }}
      className="max-w-[1440px] mx-auto px-6 py-20"
    >
      <div className="max-w-md mx-auto">
        <EmptyState
          icon={<AlertTriangle size={22} className="text-danger" />}
          title="Algo deu errado"
          description="Encontramos um problema inesperado. Tente novamente — se persistir, volte ao início e reporte o problema."
          action={
            <motion.button
              whileHover={{ y: -1, transition: { duration: m.duration.fast, ease: m.easing.out } }}
              whileTap={m.tap.soft}
              onClick={reset}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent-qa text-white rounded-lg text-sm font-medium transition-[box-shadow,background-color,transform] duration-200 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_4px_16px_-4px_rgba(79,140,255,0.35)] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.16),0_8px_24px_-6px_rgba(79,140,255,0.5)] hover:bg-accent-qa/95 cursor-pointer"
            >
              <RotateCcw size={14} /> Tentar novamente
            </motion.button>
          }
        />
      </div>
    </motion.div>
  );
}
