export interface KnowledgeMetric {
  nodeId: string
  name: string
  value: number
  unit?: string
  change?: number
  target?: number
  timestamp: string
}

export interface NodeStatistics {
  totalNodes: number
  totalEdges: number
  byType: Record<string, number>
  byStatus: Record<string, number>
  byPriority: Record<string, number>
  byHealth: Record<string, number>
  byRisk: Record<string, number>
  byMaturity: Record<string, number>
}

export interface KnowledgeGraphStats {
  nodes: NodeStatistics
  edges: {
    total: number
    byType: Record<string, number>
  }
}
