import type {
  KnowledgeNode, NodeType, NodeStatus, NodePriority,
  NodeRisk, NodeHealth, NodeMaturity, NodeMetadata,
} from '../types'

export function createNodeId(type: NodeType, slug: string): string {
  return `${type}-${slug}`
}

export function parseNodeId(nodeId: string): { type: string; slug: string } {
  const idx = nodeId.indexOf('-')
  if (idx === -1) return { type: 'unknown', slug: nodeId }
  return { type: nodeId.substring(0, idx), slug: nodeId.substring(idx + 1) }
}

export function createNode(params: {
  id: string
  title: string
  description?: string
  type: NodeType
  category?: string
  owner?: string
  status?: NodeStatus
  priority?: NodePriority
  risk?: NodeRisk
  health?: NodeHealth
  maturity?: NodeMaturity
  tags?: string[]
  relatedNodes?: string[]
  relatedComponents?: string[]
  relatedDocs?: string[]
  relatedDecisions?: string[]
  relatedTests?: string[]
  metadata?: NodeMetadata
}): KnowledgeNode {
  const now = new Date().toISOString()
  return {
    id: params.id,
    title: params.title,
    description: params.description ?? '',
    type: params.type,
    category: params.category ?? 'general',
    owner: params.owner ?? 'unknown',
    status: params.status ?? 'dev',
    priority: params.priority ?? 'medium',
    risk: params.risk ?? 'low',
    health: params.health ?? 'unknown',
    maturity: params.maturity ?? 'concept',
    createdAt: now,
    updatedAt: now,
    tags: params.tags ?? [],
    relatedNodes: params.relatedNodes ?? [],
    relatedComponents: params.relatedComponents ?? [],
    relatedDocs: params.relatedDocs ?? [],
    relatedDecisions: params.relatedDecisions ?? [],
    relatedTests: params.relatedTests ?? [],
    metadata: params.metadata ?? {},
  }
}
