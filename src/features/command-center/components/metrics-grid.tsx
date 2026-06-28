export function MetricsGrid() {
  const totalProjects = 3;
  const totalFronts = 3;

  const metrics = [
    { value: '95%', label: 'Foco em rastreabilidade e cobertura de regressão' },
    { value: `${totalProjects}+`, label: 'Projetos e automações estruturadas' },
    { value: '10x', label: 'Aceleração potencial com CI/CD e automação' },
    { value: totalFronts.toString(), label: 'Frentes modernas: QA, IA e DevOps' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {metrics.map(m => (
        <div key={m.label} className="p-5 bg-surface-default border border-border-subtle rounded-lg text-center">
          <div className="text-3xl font-bold text-accent-qa mb-1">{m.value}</div>
          <div className="text-sm text-text-muted leading-relaxed">{m.label}</div>
        </div>
      ))}
    </div>
  );
}
