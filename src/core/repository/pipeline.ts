import type { Repository, ScanResult, ProjectMetadata, RepoRelationship } from './types'
import type { KnowledgeNode } from '../knowledge/types'
import type { RepositoryScanner } from './scanner'
import type { MetadataProvider } from './metadata'
import type { KnowledgeBuilder } from './knowledge-builder'
import type { GraphBuilder } from './graph-builder'
import { defaultScanner } from './scanner'
import { defaultMetadataProvider } from './metadata'
import { defaultKnowledgeBuilder } from './knowledge-builder'
import { defaultGraphBuilder } from './graph-builder'
import { pluginRegistry } from './plugin'
export type { AnalyzerPlugin } from './plugin'

/* ─── Pipeline result ─── */

export interface PipelineResult {
  repository: Repository
  scanResult: ScanResult
  metadata: ProjectMetadata
  knowledgeNodes: KnowledgeNode[]
  relationships: RepoRelationship[]
  duration: number
  stages: PipelineStageResult[]
}

export interface PipelineStageResult {
  name: string
  duration: number
  status: 'pending' | 'running' | 'complete' | 'error'
  error?: string
}

export type PipelineEventCallback = (stage: string, status: string, detail?: unknown) => void

/* ─── Pipeline ─── */

export class AnalysisPipeline {
  private scanner: RepositoryScanner
  private metadata: MetadataProvider
  private knowledgeBuilder: KnowledgeBuilder
  private graphBuilder: GraphBuilder
  private onEvent?: PipelineEventCallback

  constructor(opts?: {
    scanner?: RepositoryScanner
    metadata?: MetadataProvider
    knowledgeBuilder?: KnowledgeBuilder
    graphBuilder?: GraphBuilder
    onEvent?: PipelineEventCallback
  }) {
    this.scanner = opts?.scanner ?? defaultScanner
    this.metadata = opts?.metadata ?? defaultMetadataProvider
    this.knowledgeBuilder = opts?.knowledgeBuilder ?? defaultKnowledgeBuilder
    this.graphBuilder = opts?.graphBuilder ?? defaultGraphBuilder
    this.onEvent = opts?.onEvent
  }

  setEventCallback(cb: PipelineEventCallback): void {
    this.onEvent = cb
  }

  async run(repository: Repository): Promise<PipelineResult> {
    const stages: PipelineStageResult[] = []
    const startTime = performance.now()

    // Stage 1: Scan
    const scanStart = performance.now()
    this.emit('scan', 'running')
    const scanResult = await this.scanner.scanRepository(repository)
    stages.push({
      name: 'scan',
      duration: performance.now() - scanStart,
      status: 'complete',
    })
    this.emit('scan', 'complete', { modules: scanResult.modules.length, files: scanResult.files.length })

    // Stage 1b: Plugin hooks — enrich scan result
    const plugins = pluginRegistry.getAll()
    if (plugins.length > 0) {
      this.emit('plugins', 'running')
      const pluginStart = performance.now()
      for (const plugin of plugins) {
        if (plugin.analyzeModules) {
          scanResult.modules = await plugin.analyzeModules(scanResult.modules)
        }
        if (plugin.analyzeFolders) {
          // Folders are nested; apply recursively in real impl
        }
        if (plugin.analyzeFiles) {
          scanResult.files = await plugin.analyzeFiles(scanResult.files)
        }
      }
      stages.push({
        name: 'plugins',
        duration: performance.now() - pluginStart,
        status: 'complete',
      })
      this.emit('plugins', 'complete')
    }

    // Stage 2: Build metadata
    const metaStart = performance.now()
    this.emit('metadata', 'running')
    const projectMetadata = this.metadata.getMetadata()
    stages.push({
      name: 'metadata',
      duration: performance.now() - metaStart,
      status: 'complete',
    })
    this.emit('metadata', 'complete', projectMetadata)

    // Stage 3: Knowledge nodes
    const kbStart = performance.now()
    this.emit('knowledge', 'running')
    const knowledgeNodes = this.knowledgeBuilder.build(scanResult)

    // Plugin knowledge node hooks
    for (const plugin of plugins) {
      if (plugin.buildNodes) {
        const extra = await plugin.buildNodes(scanResult)
        knowledgeNodes.push(...extra)
      }
    }

    stages.push({
      name: 'knowledge',
      duration: performance.now() - kbStart,
      status: 'complete',
    })
    this.emit('knowledge', 'complete', { nodes: knowledgeNodes.length })

    // Stage 4: Relationships
    const relStart = performance.now()
    this.emit('relationships', 'running')
    const relationships = this.graphBuilder.buildRelationships(scanResult)

    // Plugin relationship hooks
    for (const plugin of plugins) {
      if (plugin.buildRelationships) {
        const extra = await plugin.buildRelationships(scanResult)
        relationships.push(...extra)
      }
    }

    stages.push({
      name: 'relationships',
      duration: performance.now() - relStart,
      status: 'complete',
    })
    this.emit('relationships', 'complete', { relationships: relationships.length })

    const totalDuration = performance.now() - startTime

    return {
      repository: scanResult.repository,
      scanResult,
      metadata: projectMetadata,
      knowledgeNodes,
      relationships,
      duration: totalDuration,
      stages,
    }
  }

  private emit(stage: string, status: string, detail?: unknown): void {
    this.onEvent?.(stage, status, detail)
  }
}

/** Default pipeline instance */
export const defaultPipeline = new AnalysisPipeline()
