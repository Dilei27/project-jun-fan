'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface KGLoadingProps {
  visible: boolean;
}

export function KGLoading({ visible }: KGLoadingProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
          className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(10, 14, 22, 0.3), rgba(10, 14, 22, 0.8))',
          }}
        >
          <motion.div
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-3"
          >
            <div className="relative w-8 h-8">
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-transparent"
                style={{
                  borderTopColor: '#4F8CFF',
                  borderRightColor: '#4F8CFF',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-1 rounded-full border-2 border-transparent"
                style={{
                  borderBottomColor: '#22C55E',
                  borderLeftColor: '#22C55E',
                }}
                animate={{ rotate: -360 }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
              />
            </div>
            <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-text-muted">
              Carregando Knowledge Graph
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface KGErrorProps {
  message: string;
  onRetry?: () => void;
}

export function KGError({ message, onRetry }: KGErrorProps) {
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 px-6 py-8 rounded-2xl max-w-sm text-center"
        style={{
          background: 'rgba(10, 14, 22, 0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(244, 87, 87, 0.15)',
          boxShadow: '0 16px 48px -12px rgba(0, 0, 0, 0.6)',
        }}
      >
        <div className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(244, 87, 87, 0.12)' }}
        >
          <AlertTriangle size={18} className="text-red-400" />
        </div>
        <div>
          <p className="text-sm font-medium text-text-primary mb-1">Erro ao carregar o grafo</p>
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
    </div>
  );
}
