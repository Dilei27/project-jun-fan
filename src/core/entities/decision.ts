export interface Decision {
  id: string
  context: string
  decision: string
  rationale: string
  tradeoffs: string
  impact: string
  relatedProjects?: string[]
  relatedProducts?: string[]
}
