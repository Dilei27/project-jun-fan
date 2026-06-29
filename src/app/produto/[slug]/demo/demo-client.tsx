'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Play, RotateCcw } from 'lucide-react';
import { PageEntry } from '@/components/shared/page-entry';
import { motion as m } from '@/design-system/motion';
import type { Product } from '@/types';

const cardShadow =
  'inset 0 1px 0 0 rgba(244, 247, 250, 0.03), 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 4px 12px -4px rgba(0, 0, 0, 0.3)';

const demoSteps = [
  { label: 'Iniciar simulação', icon: '🚀' },
  { label: 'Carregar dados de entrada', icon: '📥' },
  { label: 'Processar módulo principal', icon: '⚙️' },
  { label: 'Executar validações', icon: '✅' },
  { label: 'Gerar relatório', icon: '📊' },
  { label: 'Simulação concluída', icon: '🎯' },
];

export function DemoClient({ product }: { product: Product }) {
  const [currentStep, setCurrentStep] = useState(-1);
  const [log, setLog] = useState<string[]>([]);
  const [running, setRunning] = useState(false);

  const runDemo = useCallback(() => {
    setRunning(true);
    setCurrentStep(0);
    setLog([]);
    let i = 0;
    const interval = setInterval(() => {
      if (i < demoSteps.length) {
        setCurrentStep(i);
        setLog(prev => [...prev, `${new Date().toLocaleTimeString()} — ${demoSteps[i].label}`]);
        i++;
      } else {
        clearInterval(interval);
        setRunning(false);
      }
    }, 800);
  }, []);

  const resetDemo = () => {
    setCurrentStep(-1);
    setLog([]);
    setRunning(false);
  };

  return (
    <PageEntry className="max-w-[1440px] mx-auto px-6 py-10">
      <Link
        href={`/produto/${product.id}/`}
        className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-text-primary mb-6 transition-colors duration-200"
      >
        <ArrowLeft size={14} /> {product.name}
      </Link>

      <h1 className="text-2xl font-extrabold text-text-primary mb-2 tracking-[-0.02em] text-balance">
        Demo — {product.name}
      </h1>
      <p className="text-text-secondary mb-8">Simulação interativa do fluxo do produto.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: m.stagger.tight, delayChildren: 0.1 } },
          }}
          className="space-y-3"
        >
          {demoSteps.map((step, i) => {
            const active = i === currentStep;
            const done = i < currentStep;
            return (
              <motion.div
                key={step.label}
                variants={{
                  hidden: { opacity: 0, x: -8 },
                  visible: { opacity: 1, x: 0, transition: { duration: m.duration.fast, ease: m.easing.out } },
                }}
                animate={{
                  borderColor: active ? 'rgba(79,140,255,0.3)' : undefined,
                }}
                transition={{ duration: m.duration.fast, ease: m.easing.out }}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-colors duration-200 ${
                  active
                    ? 'bg-accent-qa/8 border-accent-qa/30'
                    : done
                    ? 'bg-surface-soft/60 border-border-subtle/60 text-text-muted'
                    : 'bg-surface-default/80 border-border-subtle/60 text-text-muted'
                }`}
                style={
                  !active && !done
                    ? { boxShadow: 'inset 0 1px 0 0 rgba(244, 247, 250, 0.03)' }
                    : undefined
                }
              >
                <span className={active ? 'jf-pulse-dot' : ''}>{step.icon}</span>
                <span className={`text-sm ${i <= currentStep ? 'text-text-primary' : 'text-text-muted'}`}>
                  {step.label}
                </span>
                {done && <span className="ml-auto text-xs text-success">✓</span>}
              </motion.div>
            );
          })}
        </motion.div>

        <div className="p-4 bg-surface-default/80 border border-border-subtle/60 rounded-lg" style={{ boxShadow: cardShadow }}>
          <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">
            Log de Atividades
          </h3>
          <div className="h-64 overflow-y-auto space-y-1.5 font-mono text-xs">
            <AnimatePresence mode="popLayout">
              {log.length === 0 ? (
                <p className="text-text-muted italic">
                  Nenhuma atividade ainda. Clique em &ldquo;Executar Demo&rdquo;.
                </p>
              ) : (
                log.map((entry, i) => (
                  <motion.div
                    key={`${entry}-${i}`}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: m.duration.fast, ease: m.easing.out }}
                    className="text-text-secondary"
                  >
                    {entry}
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <motion.button
          whileHover={{ y: -1, transition: { duration: m.duration.fast, ease: m.easing.out } }}
          whileTap={m.tap.soft}
          onClick={runDemo}
          disabled={running}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent-qa text-white rounded-lg text-sm font-medium disabled:opacity-50 transition-[box-shadow,background-color,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_4px_16px_-4px_rgba(79,140,255,0.35)] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.16),0_8px_24px_-6px_rgba(79,140,255,0.5)] hover:bg-accent-qa/95 hover:-translate-y-0.5 cursor-pointer"
        >
          <Play size={16} /> Executar Demo
        </motion.button>
        <motion.button
          whileHover={{ y: -1, transition: { duration: m.duration.fast, ease: m.easing.out } }}
          whileTap={m.tap.soft}
          onClick={resetDemo}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-surface-elevated/60 backdrop-blur-sm border border-border-subtle/60 text-text-primary rounded-lg text-sm font-medium transition-[box-shadow,background-color,border-color,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[inset_0_1px_0_0_rgba(244,247,250,0.04)] hover:bg-surface-soft hover:border-border-strong hover:-translate-y-0.5 cursor-pointer"
        >
          <RotateCcw size={16} /> Resetar
        </motion.button>
      </div>
    </PageEntry>
  );
}
