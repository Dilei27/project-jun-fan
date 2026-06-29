import type { KnowledgeNode, NodeType, NodeStatus, NodeHealth, NodeMaturity, NodePriority, NodeRisk } from '../knowledge/types'
import type { Module, Folder, File, ScanResult } from './types'

/* ─── Interface ─── */

export interface KnowledgeBuilder {
  build(result: ScanResult): KnowledgeNode[]
  moduleToNode(module: Module): KnowledgeNode
  folderToNode(folder: Folder): KnowledgeNode
  fileToNode(file: File): KnowledgeNode
}

/* ─── Mapper — Module → KnowledgeNode ─── */

function mapModuleTypeToNodeType(moduleType: string): NodeType {
  switch (moduleType) {
    case 'application': return 'module'
    case 'library':     return 'module'
    case 'service':     return 'module'
    case 'tool':        return 'lab'
    case 'documentation': return 'document'
    case 'configuration': return 'architecture'
    case 'test':        return 'test'
    default:            return 'module'
  }
}

function mapFileCategoryToNodeType(category: string): NodeType {
  switch (category) {
    case 'source':      return 'module'
    case 'test':        return 'test'
    case 'config':      return 'architecture'
    case 'documentation': return 'document'
    case 'pipeline':    return 'architecture'
    default:            return 'module'
  }
}

function generateId(prefix: string, name: string): string {
  return `${prefix}-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
}

const now = new Date().toISOString()

/* ─── Mock Builder ─── */

export class MockKnowledgeBuilder implements KnowledgeBuilder {
  build(result: ScanResult): KnowledgeNode[] {
    const nodes: KnowledgeNode[] = []

    // Repository node
    nodes.push(this.createNode(
      generateId('repo', result.repository.name),
      result.repository.name,
      result.repository.description,
      'architecture',
      'module',
    ))

    // Module nodes
    for (const mod of result.modules) {
      nodes.push(this.moduleToNode(mod))
    }

    // Folder nodes
    const seenFolders = new Set<string>()
    for (const folder of result.folders) {
      if (!seenFolders.has(folder.id)) {
        seenFolders.add(folder.id)
        nodes.push(this.folderToNode(folder))
      }
    }

    // File nodes
    for (const file of result.files) {
      nodes.push(this.fileToNode(file))
    }

    return nodes
  }

  moduleToNode(module: Module): KnowledgeNode {
    return this.createNode(
      generateId('mod', module.name),
      module.name,
      module.description,
      mapModuleTypeToNodeType(module.type),
      'module',
      { path: module.path, language: module.language, framework: module.framework },
    )
  }

  folderToNode(folder: Folder): KnowledgeNode {
    return this.createNode(
      generateId('dir', folder.path.replace(/\//g, '-')),
      folder.name,
      `Directory: ${folder.path}`,
      'architecture',
      'folder',
      { path: folder.path, depth: folder.depth },
    )
  }

  fileToNode(file: File): KnowledgeNode {
    return this.createNode(
      generateId('file', file.path.replace(/\//g, '-')),
      file.name,
      `File: ${file.path}`,
      mapFileCategoryToNodeType(file.category),
      file.category === 'test' ? 'test' : 'module',
      {
        path: file.path,
        extension: file.extension,
        language: file.language,
        lines: file.lines,
        imports: file.imports,
        exports: file.exports,
      },
    )
  }

  private createNode(
    id: string, title: string, description: string,
    type: NodeType, category: string,
    extraMetadata?: Record<string, unknown>,
  ): KnowledgeNode {
    return {
      id,
      title,
      description,
      type,
      category,
      owner: 'Engineering Team',
      status: 'online' as NodeStatus,
      priority: 'medium' as NodePriority,
      risk: 'low' as NodeRisk,
      health: 'healthy' as NodeHealth,
      maturity: 'stable' as NodeMaturity,
      createdAt: now,
      updatedAt: now,
      tags: [type, category],
      relatedNodes: [],
      relatedComponents: [],
      relatedDocs: [],
      relatedDecisions: [],
      relatedTests: [],
      metadata: extraMetadata ?? {},
    }
  }
}

export const defaultKnowledgeBuilder: KnowledgeBuilder = new MockKnowledgeBuilder()
