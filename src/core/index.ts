export { entityColors, entityLabels } from './types'
export type { EntityType, EntityStatus, SkillLevel, RelationshipType } from './types'
export { getGraphData, getFullGraph, getFilteredGraph, getNodeConnections, searchNodes } from './queries'
export type { GraphNode, GraphEdge, GraphData } from './queries'
export { MockAdapter, KnowledgeRepository, KnowledgeIndex, createNodeId, parseNodeId, createNode } from './knowledge'
export type { IKnowledgeAdapter, KnowledgeAdapterData } from './knowledge'
export {
  findNodeById, findNodesByType, findRelatedNodes,
  findOneHopConnections, findShortestPath, filterGraph,
  findRelatedDocuments, findDocumentsByNodeId,
  findRelatedDecisions, findDecisionsByType,
  getNodeStatistics, getEdgeStatistics, getModuleStatistics,
} from './knowledge/services'
export type {
  KnowledgeNode, KnowledgeEdge, KnowledgeDocumentSection, KnowledgeDocument,
  KnowledgeDecision, KnowledgeModule, KnowledgeMetric, NodeStatistics, KnowledgeGraphStats,
  NodeType, NodeStatus, NodePriority, NodeRisk, NodeHealth, NodeMaturity, NodeMetadata, Timestamps,
} from './knowledge/types'
