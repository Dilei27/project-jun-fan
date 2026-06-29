'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Lightbulb, Layers, Eye, BarChart3, Layout, Globe, Sparkles } from 'lucide-react';

interface ArchStep {
  id: string;
  label: string;
  description: string;
  icon: typeof Lightbulb;
  color: string;
}

const steps: ArchStep[] = [
  { id: 'DR-001', label: 'Core Architecture', description: 'Entidades, tipos e estrutura base', icon: Layers, color: '#4F8CFF' },
  { id: '', label: 'Knowledge Engine', description: 'Motor de conhecimento e queries', icon: Lightbulb, color: '#22C55E' },
  { id: 'DR-002', label: 'Layout Engine', description: 'Grafo com simulação por anéis', icon: Globe, color: '#C084FC' },
  { id: 'DR-003', label: 'Render Pipeline', description: 'Viewport e câmera ref-based', icon: Eye, color: '#22D3EE' },
  { id: '', label: 'Visual Graph', description: 'Nós, edges e identidade visual', icon: Layout, color: '#F59E0B' },
  { id: 'DR-004', label: 'QA Command Center', description: 'Dashboard operacional e métricas', icon: BarChart3, color: '#FB923C' },
  { id: 'DR-005', label: 'Visual Evolution', description: 'Home, Graph e plataforma coesa', icon: Sparkles, color: '#4F8CFF' },
];

export function ArchitectureTimeline() {
  return (
    <div
      className="rounded-xl p-6 md:p-8"
      style={{
        background: 'rgba(10, 14, 22, 0.6)',
        border: '1px solid rgba(244, 247, 250, 0.05)',
        boxShadow: '0 4px 24px -12px rgba(0,0,0,0.4)',
      }}
    >
      <div className="flex items-center gap-2 mb-8">
        <div className="w-2 h-2 rounded-full" style={{ background: '#4F8CFF' }} />
        <h2 className="text-base font-semibold text-text-primary tracking-[-0.01em]">
          Architecture Timeline
        </h2>
        <span className="text-[9px] text-text-muted/40 font-mono ml-auto">7 steps</span>
      </div>

      <div className="relative flex flex-col items-center">
        {/* Vertical line */}
        <div
          className="absolute top-3 bottom-3 w-px left-5 md:left-1/2 md:-translate-x-px"
          style={{
            background: 'linear-gradient(to bottom, rgba(79, 140, 255, 0.3), rgba(79, 140, 255, 0.05))',
          }}
        />

        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`relative flex items-start gap-4 md:gap-0 w-full pb-8 last:pb-0 ${
                i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Connector arrow */}
              {i < steps.length - 1 && (
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 bottom-1 z-10">
                  <ArrowDown size={10} className="text-text-muted/20" />
                </div>
              )}

              {/* Icon node */}
              <div className="relative z-10 shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: `${step.color}12`,
                    border: `1px solid ${step.color}25`,
                    boxShadow: `0 0 0 4px rgba(10, 14, 22, 0.9), 0 0 16px ${step.color}20`,
                  }}
                >
                  <Icon size={16} style={{ color: step.color }} />
                </div>
              </div>

              {/* Content card */}
              <div className={`flex-1 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'md:pr-10 md:text-right' : 'md:pl-10'}`}>
                <div
                  className="rounded-xl p-4 transition-all duration-300 hover:bg-white/[0.02]"
                  style={{
                    background: 'rgba(10, 14, 22, 0.5)',
                    border: '1px solid rgba(244, 247, 250, 0.04)',
                  }}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    {step.id && (
                      <span
                        className="px-1.5 py-0.5 rounded text-[8px] font-mono font-medium uppercase tracking-wider"
                        style={{
                          background: `${step.color}15`,
                          color: step.color,
                          border: `1px solid ${step.color}20`,
                        }}
                      >
                        {step.id}
                      </span>
                    )}
                    <span className="text-sm font-semibold text-text-primary">{step.label}</span>
                  </div>
                  <p className="text-[11px] text-text-muted leading-relaxed">{step.description}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
