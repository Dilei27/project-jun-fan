'use client';

import { AlertTriangle, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface DashboardErrorProps {
  message?: string;
  onRetry?: () => void;
}

export function DashboardError({
  message = 'Falha ao carregar dados do Command Center.',
  onRetry,
}: DashboardErrorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center justify-center min-h-[400px]"
    >
      <div
        className="flex flex-col items-center gap-4 px-8 py-10 rounded-2xl max-w-sm text-center"
        style={{
          background: 'rgba(10, 14, 22, 0.8)',
          border: '1px solid rgba(244, 87, 87, 0.15)',
          boxShadow: '0 16px 48px -12px rgba(0, 0, 0, 0.6)',
        }}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(244, 87, 87, 0.12)' }}
        >
          <AlertTriangle size={20} className="text-error" />
        </div>
        <div>
          <p className="text-sm font-medium text-text-primary mb-1">Erro no Dashboard</p>
          <p className="text-xs text-text-muted leading-relaxed">{message}</p>
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer"
            style={{
              background: 'rgba(79, 140, 255, 0.12)',
              color: '#4F8CFF',
              border: '1px solid rgba(79, 140, 255, 0.2)',
            }}
          >
            <RefreshCw size={12} />
            Tentar novamente
          </button>
        )}
      </div>
    </motion.div>
  );
}
