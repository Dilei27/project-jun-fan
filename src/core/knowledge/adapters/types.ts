import type { KnowledgeNode } from '../types/node'
import type { KnowledgeEdge } from '../types/edge'
import type { KnowledgeDocument } from '../types/document'
import type { KnowledgeDecision } from '../types/decision'
import type { KnowledgeModule } from '../types/module'
import type { KnowledgeMetric } from '../types/metric'

export interface KnowledgeAdapterData {
  nodes: KnowledgeNode[]
  edges: KnowledgeEdge[]
  documents: KnowledgeDocument[]
  decisions: KnowledgeDecision[]
  modules: KnowledgeModule[]
  metrics: KnowledgeMetric[]
}

export interface IKnowledgeAdapter {
  load(): KnowledgeAdapterData | Promise<KnowledgeAdapterData>
}
