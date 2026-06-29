import type { KnowledgeRepository } from '../repositories/knowledge-repository'
import type { KnowledgeDocument } from '../types/document'

export function findRelatedDocuments(
  repo: KnowledgeRepository,
  nodeId: string,
): KnowledgeDocument[] {
  const node = repo.getIndex().getById(nodeId)
  if (!node) return []

  const results: KnowledgeDocument[] = []

  for (const docId of node.relatedDocs) {
    const doc = repo.getIndex().getDocument(docId)
    if (doc) results.push(doc)
  }

  const documents = repo.getAllDocuments()
  const nodeTypeDocIds = new Set(
    repo
      .getAllNodes()
      .filter(n => n.type === node.type && n.id !== node.id)
      .flatMap(n => n.relatedDocs),
  )

  for (const docId of nodeTypeDocIds) {
    const doc = repo.getIndex().getDocument(docId)
    if (doc && !results.find(r => r.nodeId === doc.nodeId)) {
      results.push(doc)
    }
  }

  return results
}

export function findDocumentsByNodeId(
  repo: KnowledgeRepository,
  nodeId: string,
): KnowledgeDocument | undefined {
  return repo.getIndex().getDocument(nodeId)
}
