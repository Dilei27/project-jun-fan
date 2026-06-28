'use client';

import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useCallback } from 'react';
import { getProduct } from '@/lib/content';
import { ArrowLeft, Play, RotateCcw } from 'lucide-react';

const demoSteps = [
  { label: 'Iniciar simulação', icon: '🚀' },
  { label: 'Carregar dados de entrada', icon: '📥' },
  { label: 'Processar módulo principal', icon: '⚙️' },
  { label: 'Executar validações', icon: '✅' },
  { label: 'Gerar relatório', icon: '📊' },
  { label: 'Simulação concluída', icon: '🎯' },
];

export default function ProductDemoPage() {
  const params = useParams();
  const slug = params.slug as string || '';
  const product = getProduct(slug);
  if (!product) notFound();

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
    <div className="max-w-[1440px] mx-auto px-6 py-10">
      <Link href={`/produto/${product.id}/`} className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-text-primary mb-6 transition-colors">
        <ArrowLeft size={14} /> {product.name}
      </Link>

      <h1 className="text-2xl font-extrabold text-text-primary mb-2">Demo — {product.name}</h1>
      <p className="text-text-secondary mb-8">Simulação interativa do fluxo do produto.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Steps */}
        <div className="space-y-3">
          {demoSteps.map((step, i) => (
            <div
              key={step.label}
              className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                i === currentStep
                  ? 'bg-accent-qa/10 border-accent-qa/30'
                  : i < currentStep
                  ? 'bg-surface-soft border-border-subtle text-text-muted'
                  : 'bg-surface-default border-border-subtle text-text-muted'
              }`}
            >
              <span>{step.icon}</span>
              <span className={`text-sm ${i <= currentStep ? 'text-text-primary' : 'text-text-muted'}`}>
                {step.label}
              </span>
              {i < currentStep && <span className="ml-auto text-xs text-success">✓</span>}
            </div>
          ))}
        </div>

        {/* Activity Log */}
        <div className="p-4 bg-surface-default border border-border-subtle rounded-lg">
          <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">Log de Atividades</h3>
          <div className="h-64 overflow-y-auto space-y-1.5 font-mono text-xs">
            {log.length === 0 ? (
              <p className="text-text-muted italic">Nenhuma atividade ainda. Clique em &ldquo;Executar Demo&rdquo;.</p>
            ) : (
              log.map((entry, i) => (
                <div key={i} className="text-text-secondary">{entry}</div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={runDemo}
          disabled={running}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent-qa text-white rounded-lg text-sm font-medium hover:bg-accent-qa/90 transition-colors disabled:opacity-50 cursor-pointer"
        >
          <Play size={16} /> Executar Demo
        </button>
        <button
          onClick={resetDemo}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-surface-elevated border border-border-subtle text-text-primary rounded-lg text-sm font-medium hover:bg-surface-soft transition-colors cursor-pointer"
        >
          <RotateCcw size={16} /> Resetar
        </button>
      </div>
    </div>
  );
}
