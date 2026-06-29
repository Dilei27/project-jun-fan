export interface KnowledgeDocumentSection {
  heading: string
  content: string
}

export interface KnowledgeDocument {
  nodeId: string
  sections: KnowledgeDocumentSection[]
}
