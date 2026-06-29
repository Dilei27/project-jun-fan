import type { KnowledgeRepository } from '../repositories/knowledge-repository'
import type { KnowledgeNode } from '../types/node'
import type { KnowledgeEdge } from '../types/edge'
import type { NodeType } from '../types/common'

export function findNodeById(
  repo: KnowledgeRepository,
  id: string,
): KnowledgeNode | undefined {
  return repo.getIndex().getById(id)
}

export function findNodesByType(
  repo: KnowledgeRepository,
  type: NodeType | string,
): KnowledgeNode[] {
  return repo.getIndex().getByType(type)
}

export function findRelatedNodes(
  repo: KnowledgeRepository,
  nodeId: string,
): KnowledgeNode[] {
  return repo.getIndex().getNeighbors(nodeId)
}

export function findOneHopConnections(
  repo: KnowledgeRepository,
  nodeId: string,
): { node: KnowledgeNode; edges: KnowledgeEdge[] }[] {
  const edges = repo.getIndex().getEdges(nodeId)
  const seen = new Set<string>()
  const result: { node: KnowledgeNode; edges: KnowledgeEdge[] }[] = []

  for (const edge of edges) {
    const neighborId = edge.source === nodeId ? edge.target : edge.source
    if (seen.has(neighborId)) continue
    seen.add(neighborId)
    const neighbor = repo.getIndex().getById(neighborId)
    if (neighbor) {
      const connEdges = repo.getIndex()
        .getEdges(neighborId)
        .filter(e => e.source === nodeId || e.target === nodeId)
      result.push({ node: neighbor, edges: connEdges })
    }
  }

  return result
}

export function findShortestPath(
  repo: KnowledgeRepository,
  fromId: string,
  toId: string,
): string[] {
  const visited = new Set<string>()
  const parent = new Map<string, string | null>()
  const queue: string[] = [fromId]
  visited.add(fromId)
  parent.set(fromId, null)

  while (queue.length > 0) {
    const current = queue.shift()!
    if (current === toId) {
      const path: string[] = []
      let node: string | null = toId
      while (node !== null) {
        path.unshift(node)
        node = parent.get(node) ?? null
      }
      return path
    }
    const edges = repo.getIndex().getEdges(current)
    for (const edge of edges) {
      const neighbor = edge.source === current ? edge.target : edge.source
      if (!visited.has(neighbor)) {
        visited.add(neighbor)
        parent.set(neighbor, current)
        queue.push(neighbor)
      }
    }
  }

  return []
}

export function filterGraph(
  repo: KnowledgeRepository,
  types: string[],
): { nodes: KnowledgeNode[]; edges: KnowledgeEdge[] } {
  const allNodes = repo.getAllNodes()
  const allEdges = repo.getAllEdges()

  const activeIds = new Set(allNodes.filter(n => types.includes(n.type)).map(n => n.id))
  const connectedIds = new Set(activeIds)

  for (const edge of allEdges) {
    if (activeIds.has(edge.source) && !activeIds.has(edge.target)) {
      connectedIds.add(edge.target)
    }
    if (activeIds.has(edge.target) && !activeIds.has(edge.source)) {
      connectedIds.add(edge.source)
    }
  }

  return {
    nodes: allNodes.filter(n => connectedIds.has(n.id)),
    edges: allEdges.filter(e => connectedIds.has(e.source) && connectedIds.has(e.target)),
  }
}

export function searchNodes(
  repo: KnowledgeRepository,
  query: string,
): KnowledgeNode[] {
  return repo.getIndex().search(query)
}
