import type { KnowledgeAdapterData } from '../adapters/types'
import type { KnowledgeNode } from '../types/node'
import type { KnowledgeEdge } from '../types/edge'
import type { KnowledgeDocument } from '../types/document'
import type { KnowledgeDecision } from '../types/decision'
import type { KnowledgeModule } from '../types/module'
import type { NodeType } from '../types/common'

export class KnowledgeIndex {
  byId: Map<string, KnowledgeNode> = new Map()
  byType: Map<string, KnowledgeNode[]> = new Map()
  byTag: Map<string, KnowledgeNode[]> = new Map()
  byCategory: Map<string, KnowledgeNode[]> = new Map()
  byStatus: Map<string, KnowledgeNode[]> = new Map()
  byHealth: Map<string, KnowledgeNode[]> = new Map()

  edgeIndex: Map<string, KnowledgeEdge[]> = new Map()
  outgoingEdges: Map<string, KnowledgeEdge[]> = new Map()
  incomingEdges: Map<string, KnowledgeEdge[]> = new Map()

  documentByNodeId: Map<string, KnowledgeDocument> = new Map()
  decisionByNodeId: Map<string, KnowledgeDecision> = new Map()
  moduleById: Map<string, KnowledgeModule> = new Map()

  allNodeIds: string[] = []

  constructor(data: KnowledgeAdapterData) {
    for (const node of data.nodes) {
      this.byId.set(node.id, node)

      const typeList = this.byType.get(node.type) || []
      typeList.push(node)
      this.byType.set(node.type, typeList)

      for (const tag of node.tags) {
        const tagList = this.byTag.get(tag) || []
        tagList.push(node)
        this.byTag.set(tag, tagList)
      }

      const catList = this.byCategory.get(node.category) || []
      catList.push(node)
      this.byCategory.set(node.category, catList)

      const statusList = this.byStatus.get(node.status) || []
      statusList.push(node)
      this.byStatus.set(node.status, statusList)

      const healthList = this.byHealth.get(node.health) || []
      healthList.push(node)
      this.byHealth.set(node.health, healthList)
    }

    for (const edge of data.edges) {
      const edgeList = this.edgeIndex.get(edge.source) || []
      edgeList.push(edge)
      this.edgeIndex.set(edge.source, edgeList)

      const outList = this.outgoingEdges.get(edge.source) || []
      outList.push(edge)
      this.outgoingEdges.set(edge.source, outList)

      const inList = this.incomingEdges.get(edge.target) || []
      inList.push(edge)
      this.incomingEdges.set(edge.target, inList)

      const targetEdgeList = this.edgeIndex.get(edge.target) || []
      targetEdgeList.push(edge)
      this.edgeIndex.set(edge.target, targetEdgeList)
    }

    for (const doc of data.documents) {
      this.documentByNodeId.set(doc.nodeId, doc)
    }

    for (const dec of data.decisions) {
      this.decisionByNodeId.set(dec.nodeId, dec)
    }

    for (const mod of data.modules) {
      this.moduleById.set(mod.id, mod)
    }

    this.allNodeIds = data.nodes.map(n => n.id)
  }

  getById(id: string): KnowledgeNode | undefined {
    return this.byId.get(id)
  }

  getByType(type: NodeType | string): KnowledgeNode[] {
    return this.byType.get(type) || []
  }

  getByTag(tag: string): KnowledgeNode[] {
    return this.byTag.get(tag) || []
  }

  getByCategory(category: string): KnowledgeNode[] {
    return this.byCategory.get(category) || []
  }

  getByStatus(status: string): KnowledgeNode[] {
    return this.byStatus.get(status) || []
  }

  getByHealth(health: string): KnowledgeNode[] {
    return this.byHealth.get(health) || []
  }

  getEdges(nodeId: string): KnowledgeEdge[] {
    return this.edgeIndex.get(nodeId) || []
  }

  getOutgoingEdges(nodeId: string): KnowledgeEdge[] {
    return this.outgoingEdges.get(nodeId) || []
  }

  getIncomingEdges(nodeId: string): KnowledgeEdge[] {
    return this.incomingEdges.get(nodeId) || []
  }

  getDocument(nodeId: string): KnowledgeDocument | undefined {
    return this.documentByNodeId.get(nodeId)
  }

  getDecision(nodeId: string): KnowledgeDecision | undefined {
    return this.decisionByNodeId.get(nodeId)
  }

  getModule(moduleId: string): KnowledgeModule | undefined {
    return this.moduleById.get(moduleId)
  }

  search(query: string): KnowledgeNode[] {
    const q = query.toLowerCase()
    const results: KnowledgeNode[] = []
    for (const node of this.byId.values()) {
      if (
        node.id.toLowerCase().includes(q) ||
        node.title.toLowerCase().includes(q) ||
        node.description.toLowerCase().includes(q) ||
        node.tags.some(t => t.toLowerCase().includes(q))
      ) {
        results.push(node)
      }
    }
    return results
  }

  getNeighbors(nodeId: string): KnowledgeNode[] {
    const edges = this.getEdges(nodeId)
    const neighborIds = new Set<string>()
    for (const edge of edges) {
      if (edge.source !== nodeId) neighborIds.add(edge.source)
      if (edge.target !== nodeId) neighborIds.add(edge.target)
    }
    return Array.from(neighborIds).map(id => this.byId.get(id)).filter(Boolean) as KnowledgeNode[]
  }
}
