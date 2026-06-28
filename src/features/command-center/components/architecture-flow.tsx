interface FlowStep {
  label: string;
  description?: string;
}

const defaultSteps: FlowStep[] = [
  { label: 'Entrada', description: 'Home / Hub' },
  { label: 'Produtos', description: 'QA, WhatsApp, Vigilante' },
  { label: 'Projetos', description: 'Cases reais' },
  { label: 'Decisões', description: 'ADR e trade-offs' },
  { label: 'Documentação', description: 'Arquitetura e setup' },
  { label: 'AI', description: 'AI Dock contextual' },
];

export function ArchitectureFlow({ steps }: { steps?: FlowStep[] }) {
  const items = steps || defaultSteps;

  return (
    <div className="flex flex-wrap items-center gap-2 p-5 bg-surface-default border border-border-subtle rounded-lg">
      {items.map((step, i) => (
        <span key={step.label} className="flex items-center gap-2">
          <span className="flex flex-col px-3 py-2 bg-surface-soft text-text-secondary text-sm rounded-md border border-border-subtle">
            <span className="font-medium">{step.label}</span>
            {step.description && <span className="text-xs text-text-muted">{step.description}</span>}
          </span>
          {i < items.length - 1 && <span className="text-text-muted shrink-0">→</span>}
        </span>
      ))}
    </div>
  );
}
