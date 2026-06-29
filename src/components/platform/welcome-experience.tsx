'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitFork, Shield, FileText, BookOpen, Brain, ArrowRight, X } from 'lucide-react';
import Link from 'next/link';
import { motion as m } from '@/design-system/motion';

const STORAGE_KEY = 'jf-welcome-dismissed';

interface Step {
  icon: typeof Brain
  title: string
  description: string
  href: string
  color: string
}

const STEPS: Step[] = [
  {
    icon: Brain,
    title: 'Knowledge Engine',
    description: 'O cérebro da plataforma. Todas as entidades, decisões e conexões vivem aqui.',
    href: '/knowledge-graph/',
    color: '#22D3EE',
  },
  {
    icon: GitFork,
    title: 'Knowledge Graph',
    description: 'Visualize o ecossistema. Cada nó é um produto, projeto, decisão ou documento.',
    href: '/knowledge-graph/',
    color: '#22C55E',
  },
  {
    icon: Shield,
    title: 'QA Command Center',
    description: 'Métricas, testes e qualidade. Monitore a saúde de cada componente.',
    href: '/command-center/',
    color: '#4F8CFF',
  },
  {
    icon: FileText,
    title: 'Documentação',
    description: 'Guias, setup, arquitetura e referências técnicas.',
    href: '/docs/',
    color: '#EAB308',
  },
  {
    icon: BookOpen,
    title: 'Decision Center',
    description: 'Todas as ADRs e trade-offs documentados com contexto e impacto.',
    href: '/decisoes/',
    color: '#C084FC',
  },
];

export function WelcomeExperience() {
  const [visible, setVisible] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setDismissed(false);
      setTimeout(() => setVisible(true), 800);
    }
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
    localStorage.setItem(STORAGE_KEY, 'true');
  };

  const handleNext = () => {
    if (stepIndex < STEPS.length - 1) {
      setStepIndex(i => i + 1);
    } else {
      handleDismiss();
    }
  };

  if (dismissed) return null;

  const step = STEPS[stepIndex];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(7, 10, 18, 0.85)', backdropFilter: 'blur(8px)' }}
        >
          <motion.div
            key={stepIndex}
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.4, ease: m.easing.out }}
            className="relative w-full max-w-sm rounded-2xl overflow-hidden p-6 text-center"
            style={{
              background: 'rgba(17, 24, 33, 0.95)',
              border: `1px solid ${step.color}20`,
              boxShadow: `0 0 0 1px ${step.color}08, 0 32px 64px -16px rgba(0,0,0,0.7)`,
            }}
          >
            <button
              onClick={handleDismiss}
              className="absolute top-3 right-3 p-1 rounded-md text-text-muted/40 hover:text-text-muted hover:bg-white/5 transition-colors"
              aria-label="Pular tour"
            >
              <X size={14} />
            </button>

            <motion.div
              className="mx-auto mb-4 w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{
                background: `${step.color}10`,
                border: `1px solid ${step.color}20`,
              }}
            >
              <step.icon size={24} style={{ color: step.color }} />
            </motion.div>

            <h2 className="text-base font-semibold text-text-primary mb-2">{step.title}</h2>
            <p className="text-xs text-text-muted leading-relaxed mb-6">{step.description}</p>

            {/* Dot indicators */}
            <div className="flex items-center justify-center gap-1.5 mb-4">
              {STEPS.map((_, i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                  style={{
                    background: i === stepIndex ? step.color : 'rgba(244,247,250,0.1)',
                    width: i === stepIndex ? 6 : 4,
                    height: i === stepIndex ? 6 : 4,
                  }}
                />
              ))}
            </div>

            <div className="flex items-center gap-2 justify-center">
              <button
                onClick={handleDismiss}
                className="px-3 py-1.5 rounded-lg text-[10px] text-text-muted hover:text-text-primary transition-colors"
                style={{ background: 'rgba(244,247,250,0.04)' }}
              >
                Pular
              </button>
              {stepIndex < STEPS.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="px-4 py-1.5 rounded-lg text-[10px] font-medium text-white transition-all flex items-center gap-1"
                  style={{ background: step.color }}
                >
                  Próximo
                  <ArrowRight size={10} />
                </button>
              ) : (
                <Link
                  href={step.href}
                  onClick={handleDismiss}
                  className="px-4 py-1.5 rounded-lg text-[10px] font-medium text-white transition-all flex items-center gap-1"
                  style={{ background: step.color }}
                >
                  Explorar
                  <ArrowRight size={10} />
                </Link>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
