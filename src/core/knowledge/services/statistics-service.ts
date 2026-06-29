import type { KnowledgeRepository } from '../repositories/knowledge-repository'
import type { NodeStatistics } from '../types/metric'

export function getNodeStatistics(
  repo: KnowledgeRepository,
): NodeStatistics {
  const nodes = repo.getAllNodes()
  const edges = repo.getAllEdges()

  const byType: Record<string, number> = {}
  const byStatus: Record<string, number> = {}
  const byPriority: Record<string, number> = {}
  const byHealth: Record<string, number> = {}
  const byRisk: Record<string, number> = {}
  const byMaturity: Record<string, number> = {}

  for (const node of nodes) {
    byType[node.type] = (byType[node.type] || 0) + 1
    byStatus[node.status] = (byStatus[node.status] || 0) + 1
    byPriority[node.priority] = (byPriority[node.priority] || 0) + 1
    byHealth[node.health] = (byHealth[node.health] || 0) + 1
    byRisk[node.risk] = (byRisk[node.risk] || 0) + 1
    byMaturity[node.maturity] = (byMaturity[node.maturity] || 0) + 1
  }

  return {
    totalNodes: nodes.length,
    totalEdges: edges.length,
    byType,
    byStatus,
    byPriority,
    byHealth,
    byRisk,
    byMaturity,
  }
}

export function getEdgeStatistics(
  repo: KnowledgeRepository,
): { total: number; byType: Record<string, number> } {
  const edges = repo.getAllEdges()
  const byType: Record<string, number> = {}

  for (const edge of edges) {
    byType[edge.type] = (byType[edge.type] || 0) + 1
  }

  return { total: edges.length, byType }
}

export function getModuleStatistics(
  repo: KnowledgeRepository,
): { totalModules: number; healthyCount: number; degradedCount: number } {
  const modules = repo.getAllModules()
  const healthyCount = modules.filter(m => m.health === 'healthy').length
  const degradedCount = modules.filter(
    m => m.health === 'degraded' || m.health === 'critical',
  ).length

  return { totalModules: modules.length, healthyCount, degradedCount }
}
