import type { ScanResult, Module, Folder, File } from './types'
import type { KnowledgeNode } from '../knowledge/types'
import type { RepoRelationship } from './types'

/* ─── Analyzer plugin interface ─── */

export interface AnalyzerPlugin {
  id: string
  name: string
  description: string
  supportedLanguages: string[]
  supportedFrameworks: string[]

  /** Hook called after initial scan — can enrich modules */
  analyzeModules?(modules: Module[]): Promise<Module[]>

  /** Hook called after folder scan — can enrich folders */
  analyzeFolders?(folders: Folder[]): Promise<Folder[]>

  /** Hook called after file scan — can enrich files */
  analyzeFiles?(files: File[]): Promise<File[]>

  /** Hook to generate additional knowledge nodes */
  buildNodes?(result: ScanResult): Promise<KnowledgeNode[]>

  /** Hook to generate additional relationships */
  buildRelationships?(result: ScanResult): Promise<RepoRelationship[]>
}

/* ─── Plugin registry ─── */

class PluginRegistry {
  private plugins = new Map<string, AnalyzerPlugin>()

  register(plugin: AnalyzerPlugin): void {
    if (this.plugins.has(plugin.id)) {
      console.warn(`[PluginRegistry] Plugin "${plugin.id}" already registered — overwriting.`)
    }
    this.plugins.set(plugin.id, plugin)
  }

  unregister(id: string): void {
    this.plugins.delete(id)
  }

  get(id: string): AnalyzerPlugin | undefined {
    return this.plugins.get(id)
  }

  getAll(): AnalyzerPlugin[] {
    return Array.from(this.plugins.values())
  }

  getForLanguage(lang: string): AnalyzerPlugin[] {
    return this.getAll().filter(p => p.supportedLanguages.includes(lang))
  }

  getForFramework(framework: string): AnalyzerPlugin[] {
    return this.getAll().filter(p => p.supportedFrameworks.includes(framework))
  }

  clear(): void {
    this.plugins.clear()
  }
}

export const pluginRegistry = new PluginRegistry()

/* ─── Future plugin stubs (not yet implemented) ─── */

/*
export class ReactAnalyzerPlugin implements AnalyzerPlugin { ... }
export class MarkdownAnalyzerPlugin implements AnalyzerPlugin { ... }
export class RobotAnalyzerPlugin implements AnalyzerPlugin { ... }
export class PlaywrightAnalyzerPlugin implements AnalyzerPlugin { ... }
export class NextJsAnalyzerPlugin implements AnalyzerPlugin { ... }
*/
