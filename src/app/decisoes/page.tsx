import { getDecisions } from '@/lib/content';
import { DecisionCard } from '@/components/cards/decision-card';

export default function DecisionsPage() {
  const decisions = getDecisions();

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-10">
      <h1 className="text-3xl font-extrabold text-text-primary mb-2">Decisões Técnicas</h1>
      <p className="text-text-secondary mb-8 max-w-xl">Registro de decisões arquiteturais, trade-offs e impactos do ecossistema Jun Fan.</p>

      <div className="max-w-2xl">
        {decisions.map(d => (
          <div key={d.id} id={d.id}>
            <DecisionCard decision={d} />
          </div>
        ))}
      </div>
    </div>
  );
}
