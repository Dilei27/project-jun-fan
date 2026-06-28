import { getDecisions } from '@/lib/content';
import { DecisionCard } from '@/components/cards/decision-card';

export function DecisionsList() {
  const decisions = getDecisions();

  return (
    <div className="space-y-4">
      {decisions.map(d => (
        <div key={d.id} id={d.id}>
          <DecisionCard decision={d} />
        </div>
      ))}
    </div>
  );
}
