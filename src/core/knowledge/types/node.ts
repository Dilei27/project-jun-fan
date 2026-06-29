import type { NodeType, NodeStatus, NodePriority, NodeRisk, NodeHealth, NodeMaturity, NodeMetadata } from './common'

export interface KnowledgeNode {
  id: string
  title: string
  description: string
  type: NodeType
  category: string
  owner: string
  status: NodeStatus
  priority: NodePriority
  risk: NodeRisk
  health: NodeHealth
  maturity: NodeMaturity
  createdAt: string
  updatedAt: string
  tags: string[]
  relatedNodes: string[]
  relatedComponents: string[]
  relatedDocs: string[]
  relatedDecisions: string[]
  relatedTests: string[]
  metadata: NodeMetadata
}
