import type { RelationshipType } from './common'

export interface KnowledgeEdge {
  source: string
  target: string
  type: RelationshipType
  label: string
  weight: number
}
