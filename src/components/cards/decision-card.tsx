import { Card } from '@/components/ui/card';
import type { Decision } from '@/types';

export function DecisionCard({ decision }: { decision: Decision }) {
  return (
    <Card hover className="mb-4">
      <h3 className="text-base font-semibold text-text-primary mb-2">{decision.decision}</h3>
      <p className="text-sm text-text-secondary mb-3">{decision.context}</p>
      <div className="space-y-2 text-sm">
        <div>
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Racional</span>
          <p className="text-text-secondary mt-0.5">{decision.rationale}</p>
        </div>
        <div>
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Trade-offs</span>
          <p className="text-text-secondary mt-0.5">{decision.tradeoffs}</p>
        </div>
        <div>
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Impacto</span>
          <p className="text-text-secondary mt-0.5">{decision.impact}</p>
        </div>
      </div>
    </Card>
  );
}
