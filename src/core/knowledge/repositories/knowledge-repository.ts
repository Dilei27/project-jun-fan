import type { IKnowledgeAdapter, KnowledgeAdapterData } from '../adapters/types'
import type { KnowledgeNode } from '../types/node'
import type { KnowledgeEdge } from '../types/edge'
import type { KnowledgeDocument } from '../types/document'
import type { KnowledgeDecision } from '../types/decision'
import type { KnowledgeModule } from '../types/module'
import type { KnowledgeMetric } from '../types/metric'
import { KnowledgeIndex } from '../lookup/knowledge-index'

let _instance: KnowledgeRepository | null = null

export class KnowledgeRepository {
  private data: KnowledgeAdapterData | null = null
  private adapter: IKnowledgeAdapter
  private index: KnowledgeIndex | null = null

  constructor(adapter: IKnowledgeAdapter) {
    this.adapter = adapter
  }

  async initialize(): Promise<void> {
    if (this.data) return
    this.data = await this.adapter.load()
    this.index = new KnowledgeIndex(this.data)
  }

  private ensureLoaded(): void {
    if (!this.data) {
      const result = this.adapter.load()
      if (result instanceof Promise) {
        throw new Error(
          'KnowledgeRepository must be initialized with await initialize() for async adapters',
        )
      }
      this.data = result
      this.index = new KnowledgeIndex(this.data)
    }
  }

  getAllNodes(): KnowledgeNode[] {
    this.ensureLoaded()
    return this.data!.nodes
  }

  getAllEdges(): KnowledgeEdge[] {
    this.ensureLoaded()
    return this.data!.edges
  }

  getAllDocuments(): KnowledgeDocument[] {
    this.ensureLoaded()
    return this.data!.documents
  }

  getAllDecisions(): KnowledgeDecision[] {
    this.ensureLoaded()
    return this.data!.decisions
  }

  getAllModules(): KnowledgeModule[] {
    this.ensureLoaded()
    return this.data!.modules
  }

  getAllMetrics(): KnowledgeMetric[] {
    this.ensureLoaded()
    return this.data!.metrics
  }

  getAdapterData(): KnowledgeAdapterData {
    this.ensureLoaded()
    return this.data!
  }

  getIndex(): KnowledgeIndex {
    this.ensureLoaded()
    return this.index!
  }

  static getInstance(adapter?: IKnowledgeAdapter): KnowledgeRepository {
    if (!_instance && adapter) {
      _instance = new KnowledgeRepository(adapter)
    }
    if (!_instance) {
      throw new Error('KnowledgeRepository not initialized. Call with adapter first.')
    }
    return _instance
  }

  static resetInstance(): void {
    _instance = null
  }
}
