export interface EngineeringDecision {
  id: string
  title: string
  context: string
  decision: string
  rationale: string
  tradeoffs: string
  impact: string
  componentId: string
  impactScore: number
  affectedEntities: string[]
  createdAt: string
}
