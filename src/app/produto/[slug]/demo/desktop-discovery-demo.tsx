'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowLeft,
  Check,
  FileJson,
  MousePointer2,
  Play,
  RotateCcw,
  ScanLine,
  ShieldCheck,
} from 'lucide-react';
import { PageEntry } from '@/components/shared/page-entry';
import { motion as m } from '@/design-system/motion';
import type { Product } from '@/types';

const steps = [
  { title: 'Capture', detail: 'Interaction recorded in a private session', icon: MousePointer2 },
  { title: 'Discover', detail: 'Specific desktop control identified', icon: ScanLine },
  { title: 'Enrich', detail: 'Process, hierarchy and framework attached', icon: ShieldCheck },
  { title: 'Structure', detail: 'Evidence written to the session model', icon: FileJson },
];

const artifacts = ['actions.json', 'analysis.json', 'execution_model.json', 'review.html'];

export function DesktopDiscoveryDemo({ product }: { product: Product }) {
  const [activeStep, setActiveStep] = useState(-1);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running || activeStep >= steps.length - 1) {
      if (running && activeStep === steps.length - 1) {
        const timeout = window.setTimeout(() => setRunning(false), 500);
        return () => window.clearTimeout(timeout);
      }
      return;
    }

    const timeout = window.setTimeout(() => setActiveStep(step => step + 1), 700);
    return () => window.clearTimeout(timeout);
  }, [activeStep, running]);

  const runDemo = () => {
    setActiveStep(0);
    setRunning(true);
  };

  const resetDemo = () => {
    setActiveStep(-1);
    setRunning(false);
  };

  const complete = activeStep === steps.length - 1 && !running;
  const inspected = activeStep >= 1;

  return (
    <PageEntry className="max-w-[1440px] mx-auto px-6 py-10">
      <Link
        href={`/produto/${product.id}/`}
        className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-text-primary mb-6 transition-colors duration-200"
      >
        <ArrowLeft size={14} /> {product.name}
      </Link>

      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-accent-qa/20 bg-accent-qa/8 px-3 py-1 text-xs font-medium text-accent-qa mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-qa jf-pulse-dot" />
          Demonstracao guiada
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-text-primary tracking-[-0.03em] text-balance">
          Observe the interface. Keep the evidence.
        </h1>
        <p className="mt-3 text-text-secondary leading-relaxed max-w-2xl">
          Uma leitura navegavel de fatos anonimizados de uma sessao real: interacoes, descoberta de controles e artefatos revisaveis.
        </p>
        <p className="mt-3 text-xs text-text-muted">
          A imagem da interface foi recriada para esta demonstracao. Nenhum nome de empresa, aplicacao, usuario, caminho, screenshot ou dado privado e exibido.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.85fr)] gap-5">
        <section className="rounded-xl border border-border-subtle/70 bg-surface-default/80 overflow-hidden shadow-[inset_0_1px_0_0_rgba(244,247,250,0.03),0_10px_30px_-18px_rgba(0,0,0,0.55)]">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border-subtle/60 bg-surface-soft/50">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success" />
              <span className="text-xs font-semibold text-text-secondary">Sanitized desktop session</span>
            </div>
            <span className="font-mono text-[11px] text-text-muted">PRIVATE ENVIRONMENT / ANONYMIZED</span>
          </div>

          <div className="p-4 md:p-6 bg-[#0d121c]">
            <div className="rounded-lg border border-white/10 bg-[#151d2a] overflow-hidden">
              <div className="h-9 px-3 flex items-center gap-2 bg-[#1b2635] border-b border-white/8">
                <span className="w-2 h-2 rounded-full bg-[#f97316]" />
                <span className="w-2 h-2 rounded-full bg-[#eab308]" />
                <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
                <span className="ml-2 text-[11px] text-slate-300">Legacy desktop workspace</span>
              </div>
              <div className="p-4 md:p-5">
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div>
                    <p className="text-sm font-semibold text-slate-100">Session interaction</p>
                    <p className="text-xs text-slate-400 mt-1">Anonymized evidence view</p>
                  </div>
                  <div className="relative">
                    <button
                      type="button"
                      className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                        inspected
                          ? 'border-accent-qa bg-accent-qa/20 text-white shadow-[0_0_0_3px_rgba(79,140,255,0.12)]'
                          : 'border-slate-600 bg-slate-700 text-slate-200'
                      }`}
                    >
                      Inspect control
                    </button>
                    {inspected && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent-qa text-white"
                      >
                        <MousePointer2 size={11} />
                      </motion.span>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-[1.2fr_0.8fr_0.7fr] border border-slate-700 rounded-md overflow-hidden text-[11px]">
                  {['UI region', 'Discovery', 'Evidence', 'Workspace', 'Available', 'Captured', 'Toolbar', 'Observed', 'Structured'].map((value, index) => (
                    <div
                      key={`${value}-${index}`}
                      className={`px-3 py-2 border-b border-r border-slate-700/80 ${
                        index < 3 ? 'bg-slate-800/80 text-slate-400 font-medium' : 'text-slate-300'
                      } ${index >= 6 ? 'border-b-0' : ''}`}
                    >
                      {value}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 border-t border-border-subtle/60">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const reached = index <= activeStep;
              return (
                <div key={step.title} className="p-3 border-r last:border-r-0 border-border-subtle/60">
                  <div className={`flex items-center gap-2 text-xs font-semibold ${reached ? 'text-text-primary' : 'text-text-muted'}`}>
                    <Icon size={14} className={reached ? 'text-accent-qa' : ''} /> {step.title}
                  </div>
                  <p className="mt-1 text-[11px] leading-relaxed text-text-muted">{step.detail}</p>
                </div>
              );
            })}
          </div>
        </section>

        <aside className="rounded-xl border border-border-subtle/70 bg-surface-default/80 p-5 shadow-[inset_0_1px_0_0_rgba(244,247,250,0.03),0_10px_30px_-18px_rgba(0,0,0,0.55)]">
          <div className="flex items-start justify-between gap-3 mb-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">Discovery ledger</p>
              <h2 className="mt-1 text-lg font-semibold text-text-primary">Evidence snapshot</h2>
            </div>
            {complete && <span className="inline-flex items-center gap-1 text-xs text-success"><Check size={14} /> ready</span>}
          </div>

          <div className="space-y-3">
            <LedgerRow label="Element" value={inspected ? 'Toolbar interaction' : 'Awaiting interaction'} active={inspected} />
            <LedgerRow label="Framework" value={inspected ? 'Legacy desktop / UIA' : '--'} active={inspected} />
            <LedgerRow label="Locator" value={inspected ? 'Class + bounds candidate' : '--'} active={inspected} />
            <LedgerRow label="Evidence" value={inspected ? '43 actions / 100% UI coverage' : '--'} active={inspected} />
          </div>

          <div className="mt-6 pt-5 border-t border-border-subtle/60">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-muted mb-3">Session artifacts</p>
            <div className="grid grid-cols-2 gap-2">
              {artifacts.map((artifact, index) => {
                const available = activeStep >= index;
                return (
                  <div key={artifact} className={`rounded-md border px-2.5 py-2 text-[11px] font-mono transition-colors ${available ? 'border-accent-qa/25 bg-accent-qa/8 text-text-secondary' : 'border-border-subtle/60 text-text-muted'}`}>
                    {available ? <Check size={12} className="inline mr-1 text-accent-qa" /> : <span className="inline-block w-3 mr-1" />}
                    {artifact}
                  </div>
                );
              })}
            </div>
          </div>
        </aside>
      </div>

      <div className="flex flex-wrap items-center gap-3 mt-6">
        <motion.button
          whileHover={{ y: -1, transition: { duration: m.duration.fast, ease: m.easing.out } }}
          whileTap={m.tap.soft}
          type="button"
          onClick={runDemo}
          disabled={running}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent-qa text-white rounded-lg text-sm font-medium disabled:opacity-50 transition-[box-shadow,background-color,transform] duration-200 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_4px_16px_-4px_rgba(79,140,255,0.35)] hover:bg-accent-qa/95 hover:-translate-y-0.5 cursor-pointer"
        >
          <Play size={16} /> {complete ? 'Run again' : 'Run guided demo'}
        </motion.button>
        <button
          type="button"
          onClick={resetDemo}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border-subtle/60 text-sm text-text-secondary hover:text-text-primary hover:bg-surface-soft hover:border-border-strong transition-colors"
        >
          <RotateCcw size={15} /> Reset
        </button>
        <AnimatePresence>
          {complete && (
            <motion.p initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} className="text-sm text-text-secondary">
              A review package is ready for a human or automation consumer.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </PageEntry>
  );
}

function LedgerRow({ label, value, active }: { label: string; value: string; active: boolean }) {
  return (
    <div className={`rounded-lg border px-3 py-2.5 transition-colors ${active ? 'border-border-strong bg-surface-soft/70' : 'border-border-subtle/60 bg-surface-default/40'}`}>
      <p className="text-[11px] uppercase tracking-[0.12em] text-text-muted">{label}</p>
      <p className={`mt-1 font-mono text-xs truncate ${active ? 'text-text-primary' : 'text-text-muted'}`}>{value}</p>
    </div>
  );
}
