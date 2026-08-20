'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowLeft,
  BellRing,
  Eye,
  Play,
  RotateCcw,
  ScanFace,
  ShieldCheck,
} from 'lucide-react';
import { PageEntry } from '@/components/shared/page-entry';
import { motion as m } from '@/design-system/motion';
import type { Product } from '@/types';

const steps = [
  { title: 'Motion signal', detail: 'Camera 01 reports activity', icon: Eye },
  { title: 'Person check', detail: 'Local model reviews the frame', icon: ScanFace },
  { title: 'Decision', detail: 'Human presence confirmed', icon: ShieldCheck },
  { title: 'Alert packet', detail: 'Useful alert prepared for delivery', icon: BellRing },
];

export function VigilanteDemo({ product }: { product: Product }) {
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

    const timeout = window.setTimeout(() => setActiveStep(step => step + 1), 760);
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

  const personDetected = activeStep >= 1;
  const confirmed = activeStep >= 2;
  const delivered = activeStep === steps.length - 1 && !running;

  return (
    <PageEntry className="max-w-[1440px] mx-auto px-6 py-10">
      <Link
        href={`/produto/${product.id}/`}
        className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-text-primary mb-6 transition-colors duration-200"
      >
        <ArrowLeft size={14} /> {product.name}
      </Link>

      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#f97316]/25 bg-[#f97316]/10 px-3 py-1 text-xs font-medium text-[#fb923c] mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-[#f97316] jf-pulse-dot" />
          Demonstracao guiada
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-text-primary tracking-[-0.03em] text-balance">
          Signal first. Alert only when it matters.
        </h1>
        <p className="mt-3 text-text-secondary leading-relaxed max-w-2xl">
          Uma simulacao do fluxo local do Vigilante AI: atividade, verificacao de pessoa, decisao e alerta contextualizado.
        </p>
        <p className="mt-3 text-xs text-text-muted">
          Dados sinteticos para demonstracao. Esta pagina nao se conecta a cameras, modelos, WhatsApp ou infraestrutura privada.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.85fr)] gap-5">
        <section className="rounded-xl border border-border-subtle/70 bg-surface-default/80 overflow-hidden shadow-[inset_0_1px_0_0_rgba(244,247,250,0.03),0_10px_30px_-18px_rgba(0,0,0,0.55)]">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border-subtle/60 bg-surface-soft/50">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${activeStep >= 0 ? 'bg-[#f97316] jf-pulse-dot' : 'bg-text-muted'}`} />
              <span className="text-xs font-semibold text-text-secondary">Camera 01 / front gate</span>
            </div>
            <span className="font-mono text-[11px] text-text-muted">LOCAL INFERENCE</span>
          </div>

          <div className="relative min-h-[330px] p-5 md:p-7 overflow-hidden bg-[#12100f]">
            <div aria-hidden className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="relative h-[260px] rounded-lg border border-white/10 bg-gradient-to-br from-[#29221e] via-[#171514] to-[#0e0d0c] overflow-hidden">
              <div className="absolute left-[13%] bottom-[12%] w-[58%] h-[26%] rounded-t-[80%] bg-[#44352a] opacity-75" />
              <div className="absolute right-[10%] top-[15%] w-20 h-20 rounded-full bg-[#614938]/30 blur-2xl" />
              <div className="absolute left-4 top-4 font-mono text-[10px] tracking-[0.14em] text-white/55">CAM-01 / 20:14:08</div>
              {personDetected && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute left-[53%] top-[26%] h-[52%] w-[18%] border-2 border-[#f97316]"
                >
                  <span className="absolute -top-6 left-0 whitespace-nowrap rounded bg-[#f97316] px-2 py-1 text-[10px] font-semibold text-white">person 0.93</span>
                </motion.div>
              )}
              {confirmed && <div className="absolute right-4 bottom-4 rounded-md border border-[#22c55e]/30 bg-[#22c55e]/15 px-2.5 py-1.5 text-xs font-medium text-[#86efac]">verified locally</div>}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 border-t border-border-subtle/60">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const reached = index <= activeStep;
              return (
                <div key={step.title} className="p-3 border-r last:border-r-0 border-border-subtle/60">
                  <div className={`flex items-center gap-2 text-xs font-semibold ${reached ? 'text-text-primary' : 'text-text-muted'}`}>
                    <Icon size={14} className={reached ? 'text-[#fb923c]' : ''} /> {step.title}
                  </div>
                  <p className="mt-1 text-[11px] leading-relaxed text-text-muted">{step.detail}</p>
                </div>
              );
            })}
          </div>
        </section>

        <aside className="rounded-xl border border-border-subtle/70 bg-surface-default/80 p-5 shadow-[inset_0_1px_0_0_rgba(244,247,250,0.03),0_10px_30px_-18px_rgba(0,0,0,0.55)]">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">Event decision</p>
          <h2 className="mt-1 text-lg font-semibold text-text-primary">What the operator receives</h2>

          <div className="mt-5 space-y-3">
            <SignalRow label="Motion" value={activeStep >= 0 ? 'Detected / camera 01' : 'Awaiting signal'} active={activeStep >= 0} />
            <SignalRow label="Classification" value={personDetected ? 'Person / 0.93 confidence' : '--'} active={personDetected} />
            <SignalRow label="Policy" value={confirmed ? 'Alert criteria satisfied' : '--'} active={confirmed} />
            <SignalRow label="Delivery" value={delivered ? 'Alert package ready' : '--'} active={delivered} />
          </div>

          <div className={`mt-6 rounded-lg border p-3.5 transition-colors ${delivered ? 'border-[#22c55e]/30 bg-[#22c55e]/8' : 'border-border-subtle/60 bg-surface-soft/30'}`}>
            <div className="flex items-center gap-2 text-xs font-semibold text-text-primary">
              <BellRing size={14} className={delivered ? 'text-success' : 'text-text-muted'} /> Alert preview
            </div>
            <p className="mt-2 text-xs leading-relaxed text-text-secondary">
              {delivered ? 'Person detected at front gate. Confidence 93%. Snapshot and event context attached.' : 'The alert remains suppressed until the event is verified.'}
            </p>
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
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#ea580c] text-white rounded-lg text-sm font-medium disabled:opacity-50 transition-[box-shadow,background-color,transform] duration-200 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_4px_16px_-4px_rgba(234,88,12,0.35)] hover:bg-[#f97316] hover:-translate-y-0.5 cursor-pointer"
        >
          <Play size={16} /> {delivered ? 'Run again' : 'Run guided demo'}
        </motion.button>
        <button type="button" onClick={resetDemo} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border-subtle/60 text-sm text-text-secondary hover:text-text-primary hover:bg-surface-soft hover:border-border-strong transition-colors">
          <RotateCcw size={15} /> Reset
        </button>
        <AnimatePresence>
          {delivered && <motion.p initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} className="text-sm text-text-secondary">Only a verified event becomes an operator alert.</motion.p>}
        </AnimatePresence>
      </div>
    </PageEntry>
  );
}

function SignalRow({ label, value, active }: { label: string; value: string; active: boolean }) {
  return (
    <div className={`rounded-lg border px-3 py-2.5 transition-colors ${active ? 'border-border-strong bg-surface-soft/70' : 'border-border-subtle/60 bg-surface-default/40'}`}>
      <p className="text-[11px] uppercase tracking-[0.12em] text-text-muted">{label}</p>
      <p className={`mt-1 font-mono text-xs truncate ${active ? 'text-text-primary' : 'text-text-muted'}`}>{value}</p>
    </div>
  );
}
