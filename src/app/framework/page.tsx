import { Shield, Cpu, GitBranch, Cog, Layers, Target } from 'lucide-react';

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
    <div className="max-w-[1440px] mx-auto px-6 py-10">
      <h1 className="text-3xl font-extrabold text-text-primary mb-2">Robot/QA AI Framework</h1>
      <p className="text-text-secondary mb-10 max-w-2xl">
        Framework conceitual que unifica automação de testes, inteligência artificial e integração contínua em uma arquitetura modular e reutilizável.
      </p>

      {/* Concepts Grid */}
      <h2 className="text-xl font-semibold text-text-primary mb-6">Conceitos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
        {frameworkConcepts.map(concept => {
          const Icon = concept.icon;
          return (
            <div key={concept.title} className="p-5 bg-surface-default border border-border-subtle rounded-lg hover:bg-surface-elevated transition-colors">
              <Icon size={24} className="text-accent-qa mb-3" />
              <h3 className="text-sm font-semibold text-text-primary mb-1">{concept.title}</h3>
              <p className="text-xs text-text-secondary leading-relaxed">{concept.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Architecture Flow */}
      <h2 className="text-xl font-semibold text-text-primary mb-6">Fluxo da Arquitetura</h2>
      <div className="flex items-center flex-wrap gap-2 p-5 bg-surface-default border border-border-subtle rounded-lg mb-16">
        {flowSteps.map((step, i, arr) => (
          <span key={step} className="flex items-center">
            <span className="px-3 py-1.5 bg-surface-soft text-text-secondary text-sm rounded-md border border-border-subtle">{step}</span>
            {i < arr.length - 1 && <span className="text-text-muted mx-2">→</span>}
          </span>
        ))}
      </div>

      {/* Roadmap */}
      <h2 className="text-xl font-semibold text-text-primary mb-6">Roadmap do Framework</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {roadmapItems.map(phase => (
          <div key={phase.phase} className="p-5 bg-surface-default border border-border-subtle rounded-lg">
            <span className="text-xs font-semibold text-accent-qa uppercase tracking-wider">{phase.phase}</span>
            <h3 className="text-base font-semibold text-text-primary mt-1 mb-3">{phase.title}</h3>
            <ul className="space-y-2">
              {phase.items.map(item => (
                <li key={item} className="flex items-center gap-2 text-sm text-text-secondary">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-qa/50 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
