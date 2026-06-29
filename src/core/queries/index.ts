import { MockAdapter } from '@/core/knowledge/adapters/mock-adapter'
import { KnowledgeRepository } from '@/core/knowledge/repositories/knowledge-repository'
import { filterGraph, searchNodes as serviceSearch, findNodeById } from '@/core/knowledge/services/node-service'
import { entityColors } from '@/core/types'
import type { KnowledgeNode, KnowledgeEdge } from '@/core/knowledge/types'

let _repo: KnowledgeRepository | null = null

function getRepo(): KnowledgeRepository {
  if (!_repo) {
    _repo = new KnowledgeRepository(new MockAdapter())
    _repo.initialize()
  }
  return _repo
}

export interface GraphNode {
  id: string
  type: string
  label: string
  description: string
  color: string
  size: number
  url: string
  group: string
}

export interface GraphEdge {
  source: string
  target: string
  type: string
  label: string
}

export interface GraphData {
  nodes: GraphNode[]
  edges: GraphEdge[]
}

function knowledgeNodeToGraphNode(node: KnowledgeNode): GraphNode {
  const sizeMap: Record<string, number> = {
    product: 20,
    project: 16,
    decision: 14,
    document: 12,
    event: 12,
    skill: 10,
    metric: 8,
  }

  const colorMap: Record<string, string> = {
    product: entityColors.product,
    project: entityColors.project,
    decision: entityColors.decision,
    document: entityColors.doc,
    event: entityColors.timeline,
    skill: entityColors.skill,
    metric: entityColors.metric,
  }

  let url = ''
  switch (node.type) {
    case 'product':
      url = `/produto/${node.id.replace('product-', '')}/`
      break
    case 'project':
      url = `/projeto/${node.id.replace('project-', '')}/`
      break
    case 'document':
      url = `/docs/${node.id.replace('document-', '')}/`
      break
    case 'event':
      url = '/command-center/timeline/'
      break
    default:
      url = ''
  }

  return {
    id: node.id,
    type: node.type,
    label: node.title,
    description: node.description,
    color: (node.metadata?.accentColor as string) || colorMap[node.type] || '#9AA6B8',
    size: sizeMap[node.type] || 10,
    url,
    group: node.type,
  }
}

function ksEdgeToGraphEdge(edge: KnowledgeEdge): GraphEdge {
  return {
    source: edge.source,
    target: edge.target,
    type: edge.type,
    label: edge.label,
  }
}

export function getGraphData(): GraphData {
  const repo = getRepo()
  const nodes = repo.getAllNodes().map(knowledgeNodeToGraphNode)
  const edges = repo.getAllEdges().map(ksEdgeToGraphEdge)
  return { nodes, edges }
}

export function getFullGraph(): GraphData {
  return getGraphData()
}

export function getFilteredGraph(types: string[]): GraphData {
  const repo = getRepo()
  const filtered = filterGraph(repo, types)
  return {
    nodes: filtered.nodes.map(knowledgeNodeToGraphNode),
    edges: filtered.edges.map(ksEdgeToGraphEdge),
  }
}

export function getNodeConnections(nodeId: string): GraphEdge[] {
  const repo = getRepo()
  const edges = repo.getIndex().getEdges(nodeId)
  return edges.map(ksEdgeToGraphEdge)
}

export function searchNodes(query: string): GraphNode[] {
  const repo = getRepo()
  const results = serviceSearch(repo, query)
  return results.map(knowledgeNodeToGraphNode)
}
