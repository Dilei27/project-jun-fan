'use client';

import { useState, useEffect, startTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bootLines = [
  '[BOOT] Inicializando QA Command Center...',
  '[CORE] Carregando módulos do ecossistema...',
  '[DATA] Conectando camada de conteúdo...',
  '[AI] AI Dock pronto para consultas.',
  '[OK] Sistema operacional — todos os módulos online.',
];

export function BootLoader() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      startTransition(() => { setVisibleLines(bootLines.length); });
      const tid = setTimeout(() => startTransition(() => setDone(true)), 300);
      return () => clearTimeout(tid);
    }

    let i = 0;
    const interval = setInterval(() => {
      i++;
      startTransition(() => setVisibleLines(i));
      if (i >= bootLines.length) {
        clearInterval(interval);
        startTransition(() => setDone(true));
      }
    }, 280);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.16 } }}
          className="fixed inset-0 z-[60] bg-bg-base flex items-center justify-center"
          aria-live="polite"
          role="status"
        >
          <div className="font-mono text-sm space-y-1.5 max-w-md">
            {bootLines.slice(0, visibleLines).map((line, i) => (
              <motion.div
                key={line}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.16 }}
                className="text-text-secondary"
              >
                <span className="text-accent-qa mr-2">&gt;</span>
                {line}
                {i === visibleLines - 1 && i < bootLines.length && (
                  <span className="inline-block w-2 h-4 bg-accent-qa ml-1 animate-pulse" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
