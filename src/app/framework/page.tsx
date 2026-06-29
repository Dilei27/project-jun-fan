'use client';

import { motion } from 'framer-motion';
import { Shield, Cpu, GitBranch, Cog, Layers, Target } from 'lucide-react';
import { PageEntry } from '@/components/shared/page-entry';
import { motion as m } from '@/design-system/motion';

const cardShadow =
  'inset 0 1px 0 0 rgba(244, 247, 250, 0.03), 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 4px 12px -4px rgba(0, 0, 0, 0.3)';

const frameworkConcepts = [
  { icon: Shield, title: 'Automação Robusta', desc: 'Testes com Robot Framework, Playwright e fallback visual para componentes instáveis.' },
  { icon: Cpu, title: 'IA Aplicada', desc: 'Classificação de eventos, agentes inteligentes e análise preditiva para QA.' },
  { icon: GitBranch, title: 'Integração Contínua', desc: 'Pipeline automatizado com Jenkins, validação em cada commit e deploy seguro.' },
  { icon: Cog, title: 'Arquitetura Modular', desc: 'Camadas independentes para detecção, classificação, regras e notificação.' },
  { icon: Layers, title: 'Multicamadas', desc: 'Suporte a múltiplos projetos com reutilização de componentes e isolamento lógico.' },
  { icon: Target, title: 'Métricas e Relatórios', desc: 'Dashboard unificado com cobertura, performance e alertas inteligentes.' },
];

const flowSteps = [
  'Planejamento', 'Automação', 'Execução', 'Análise IA', 'Relatório', 'Iteração',
];

const roadmapItems = [
  { phase: 'Fase 1', title: 'Fundação', items: ['Horizon Design System', 'Robot Framework core', 'Playwright integration'] },
  { phase: 'Fase 2', title: 'Inteligência', items: ['Classificação IA de falhas', 'Agentes de automação', 'Análise preditiva'] },
  { phase: 'Fase 3', title: 'Escala', items: ['Suporte multi-projeto', 'Dashboard global', 'AI Dock contextual'] },
];

export default function FrameworkPage() {
  return (
    <PageEntry className="max-w-[1440px] mx-auto px-6 py-10">
      <h1 className="text-3xl font-extrabold text-text-primary mb-2 tracking-[-0.025em] text-balance">
        Robot/QA AI Framework
      </h1>
      <p className="text-text-secondary mb-10 max-w-2xl">
        Framework conceitual que unifica automação de testes, inteligência artificial e integração contínua em uma arquitetura modular e reutilizável.
      </p>

      <h2 className="text-xl font-semibold text-text-primary mb-6 tracking-[-0.01em]">
        Conceitos
      </h2>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: m.stagger.default, delayChildren: 0.1 } },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16"
      >
        {frameworkConcepts.map(concept => {
          const Icon = concept.icon;
          return (
            <motion.div
              key={concept.title}
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0, transition: { duration: m.duration.normal, ease: m.easing.out } },
              }}
              whileHover={{ y: -3, transition: { duration: m.duration.fast, ease: m.easing.out } }}
              className="jf-lift p-5 bg-surface-default/80 border border-border-subtle/60 rounded-lg"
              style={{ boxShadow: cardShadow }}
            >
              <Icon size={24} className="text-accent-qa mb-3" />
              <h3 className="text-sm font-semibold text-text-primary mb-1">{concept.title}</h3>
              <p className="text-xs text-text-secondary leading-relaxed">{concept.desc}</p>
            </motion.div>
          );
        })}
      </motion.div>

      <h2 className="text-xl font-semibold text-text-primary mb-6 tracking-[-0.01em]">
        Fluxo da Arquitetura
      </h2>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: m.stagger.tight } },
        }}
        className="flex items-center flex-wrap gap-2 p-5 bg-surface-default/80 border border-border-subtle/60 rounded-lg mb-16"
        style={{ boxShadow: cardShadow }}
      >
        {flowSteps.map((step, i, arr) => (
          <motion.span
            key={step}
            variants={{
              hidden: { opacity: 0, y: 6 },
              visible: { opacity: 1, y: 0, transition: { duration: m.duration.fast, ease: m.easing.out } },
            }}
            className="flex items-center"
          >
            <span className="px-3 py-1.5 bg-surface-soft text-text-secondary text-sm rounded-md border border-border-subtle/60 transition-colors duration-200 hover:border-border-strong hover:text-text-primary">
              {step}
            </span>
            {i < arr.length - 1 && <span className="text-text-muted mx-2">→</span>}
          </motion.span>
        ))}
      </motion.div>

      <h2 className="text-xl font-semibold text-text-primary mb-6 tracking-[-0.01em]">
        Roadmap do Framework
      </h2>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: m.stagger.default, delayChildren: 0.1 } },
        }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {roadmapItems.map(phase => (
          <motion.div
            key={phase.phase}
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { duration: m.duration.normal, ease: m.easing.out } },
            }}
            whileHover={{ y: -3, transition: { duration: m.duration.fast, ease: m.easing.out } }}
            className="jf-lift p-5 bg-surface-default/80 border border-border-subtle/60 rounded-lg"
            style={{ boxShadow: cardShadow }}
          >
            <span className="text-xs font-semibold text-accent-qa uppercase tracking-wider">
              {phase.phase}
            </span>
            <h3 className="text-base font-semibold text-text-primary mt-1 mb-3">
              {phase.title}
            </h3>
            <ul className="space-y-2">
              {phase.items.map(item => (
                <li key={item} className="flex items-center gap-2 text-sm text-text-secondary">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-qa/50 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </PageEntry>
  );
}
