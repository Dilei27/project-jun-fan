'use client';

import { useEffect } from 'react';
import { RotateCcw } from 'lucide-react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-20 text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-medium text-danger bg-danger/10 border border-danger/20 rounded-full">
        Error
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary mb-3">
        Algo deu errado
      </h1>
      <p className="text-text-secondary max-w-md mx-auto mb-8">
        Ocorreu um erro inesperado. Tente novamente ou volte ao início.
      </p>
      <button
        onClick={reset}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent-qa text-white rounded-lg text-sm font-medium hover:bg-accent-qa/90 transition-colors cursor-pointer"
      >
        <RotateCcw size={16} /> Tentar novamente
      </button>
    </div>
  );
}
