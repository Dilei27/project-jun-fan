import type { RepoRelationship, RepoRelationshipType, Module, Folder, File, ScanResult } from './types'

/* ─── Interface ─── */

export interface GraphBuilder {
  buildRelationships(result: ScanResult): RepoRelationship[]
  folderContainsFile(folder: Folder, file: File): RepoRelationship
  folderContainsFolder(parent: Folder, child: Folder): RepoRelationship
  moduleContainsFolder(module: Module, folder: Folder): RepoRelationship
  fileImportsFile(source: File, target: string): RepoRelationship
  fileBelongsToModule(file: File, module: Module): RepoRelationship
}

function buildId(type: string, a: string, b: string): string {
  return `rel-${type}-${a}-${b}`
}

/* ─── Mock Graph Builder ─── */

export class MockGraphBuilder implements GraphBuilder {
  buildRelationships(result: ScanResult): RepoRelationship[] {
    const rels: RepoRelationship[] = []
    const modMap = new Map(result.modules.map(m => [m.name, m]))

    // Module → folder containment
    for (const mod of result.modules) {
      for (const folder of mod.folders) {
        rels.push(this.moduleContainsFolder(mod, folder))
      }
    }

    // Folder → file containment
    for (const folder of result.folders) {
      for (const file of folder.files) {
        rels.push(this.folderContainsFile(folder, file))
      }
      for (const child of folder.folders) {
        rels.push(this.folderContainsFolder(folder, child))
      }
    }

    // File → module belonging
    for (const file of result.files) {
      for (const [, mod] of modMap) {
        if (file.path.startsWith(mod.path) || (!mod.path.startsWith('src/') && mod.path === '/')) {
          rels.push(this.fileBelongsToModule(file, mod))
        }
      }
    }

    // File → file imports (mock: match known imports against files in result)
    const fileMap = new Map(result.files.map(f => [f.name, f]))
    for (const file of result.files) {
      for (const imp of file.imports) {
        const impName = imp.split('/').pop() ?? imp
        const matched = fileMap.get(impName + '.ts') ?? fileMap.get(impName + '.tsx')
        if (matched && matched.id !== file.id) {
          rels.push(this.fileImportsFile(file, matched.id))
        }
      }
    }

    return rels
  }

  folderContainsFile(folder: Folder, file: File): RepoRelationship {
    return {
      source: folder.id, target: file.id,
      type: 'contains' as RepoRelationshipType,
      label: 'Folder contains file',
      weight: 1,
      sourceType: 'folder', targetType: 'file',
    }
  }

  folderContainsFolder(parent: Folder, child: Folder): RepoRelationship {
    return {
      source: parent.id, target: child.id,
      type: 'contains' as RepoRelationshipType,
      label: 'Folder contains folder',
      weight: 1,
      sourceType: 'folder', targetType: 'folder',
    }
  }

  moduleContainsFolder(module: Module, folder: Folder): RepoRelationship {
    return {
      source: module.id, target: folder.id,
      type: 'contains' as RepoRelationshipType,
      label: 'Module contains folder',
      weight: 1,
      sourceType: 'module', targetType: 'folder',
    }
  }

  fileImportsFile(source: File, targetId: string): RepoRelationship {
    return {
      source: source.id, target: targetId,
      type: 'imports' as RepoRelationshipType,
      label: 'File imports file',
      weight: 0.8,
      sourceType: 'file', targetType: 'file',
    }
  }

  fileBelongsToModule(file: File, module: Module): RepoRelationship {
    return {
      source: file.id, target: module.id,
      type: 'belongs_to' as RepoRelationshipType,
      label: 'File belongs to module',
      weight: 1,
      sourceType: 'file', targetType: 'module',
    }
  }
}

export const defaultGraphBuilder: GraphBuilder = new MockGraphBuilder()
