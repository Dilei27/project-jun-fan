import type { TwinEntityStatus, TwinMaturityLevel, HealthScores } from './common'

export interface EngineeringComponent {
  id: string
  name: string
  description: string
  type: string
  owner: string
  status: TwinEntityStatus
  maturity: TwinMaturityLevel
  dependencies: string[]
  dependents: string[]
  relatedKnowledge: string[]
  relatedTests: string[]
  relatedDocs: string[]
  relatedDecisions: string[]
  health: HealthScores
  metadata: Record<string, unknown>
}
