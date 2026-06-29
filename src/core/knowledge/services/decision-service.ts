import type { KnowledgeRepository } from '../repositories/knowledge-repository'
import type { KnowledgeDecision } from '../types/decision'

export function findRelatedDecisions(
  repo: KnowledgeRepository,
  nodeId: string,
): KnowledgeDecision[] {
  const node = repo.getIndex().getById(nodeId)
  if (!node) return []

  const results: KnowledgeDecision[] = []

  for (const decId of node.relatedDecisions) {
    const dec = repo.getIndex().getDecision(decId)
    if (dec) results.push(dec)
  }

  const edges = repo.getIndex().getEdges(nodeId)
  for (const edge of edges) {
    if (edge.type === 'generates' || edge.type === 'originates' || edge.type === 'impacts') {
      const targetId = edge.source === nodeId ? edge.target : edge.source
      const dec = repo.getIndex().getDecision(targetId)
      if (dec && !results.find(r => r.nodeId === dec.nodeId)) {
        results.push(dec)
      }
    }
  }

  return results
}

export function findDecisionsByType(
  repo: KnowledgeRepository,
  decisionType: string,
): KnowledgeDecision[] {
  const nodes = repo.getIndex().getByTag(decisionType)
  return nodes
    .map(n => repo.getIndex().getDecision(n.id))
    .filter(Boolean) as KnowledgeDecision[]
}
