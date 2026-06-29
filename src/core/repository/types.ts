import type { RelationshipType, NodeType } from '../knowledge/types'

/* ─── Enums ─── */

export type FileLanguage =
  | 'typescript' | 'javascript' | 'python' | 'java' | 'ruby'
  | 'go' | 'rust' | 'csharp' | 'cpp' | 'kotlin'
  | 'yaml' | 'json' | 'markdown' | 'css' | 'scss'
  | 'html' | 'shell' | 'dockerfile' | 'unknown'

export type FileCategory =
  | 'source' | 'test' | 'config' | 'documentation'
  | 'script' | 'style' | 'data' | 'template'
  | 'pipeline' | 'unknown'

export type ModuleType =
  | 'application' | 'library' | 'service' | 'tool'
  | 'documentation' | 'configuration' | 'test'

export type RepoRelationshipType =
  | RelationshipType
  | 'belongs_to' | 'depends_on' | 'implements'
  | 'deploys' | 'imports' | 'configures'

export type AnalysisStatus = 'pending' | 'scanning' | 'building' | 'complete' | 'error'

export const REPO_RELATIONSHIP_LABELS: Record<RepoRelationshipType, string> = {
  references: 'Referencia',
  contains: 'Contém',
  originates: 'Origina',
  impacts: 'Impacta',
  generates: 'Gera',
  relates: 'Relaciona',
  uses: 'Usa',
  context: 'Contexto',
  belongs_to: 'Pertence a',
  depends_on: 'Depende de',
  implements: 'Implementa',
  deploys: 'Implanta',
  imports: 'Importa',
  configures: 'Configura',
}

/* ─── Core entities ─── */

export interface Repository {
  id: string
  name: string
  description: string
  url: string
  defaultBranch: string
  workspace: Workspace
  projects: Project[]
  metadata: ProjectMetadata
  scannedAt: string | null
  analysisStatus: AnalysisStatus
}

export interface Project {
  id: string
  name: string
  description: string
  type: ModuleType
  modules: Module[]
  rootFolder: Folder
}

export interface Workspace {
  id: string
  name: string
  description: string
  organization: string
}

export interface Branch {
  id: string
  name: string
  isDefault: boolean
  lastCommit: string
  lastCommitDate: string
}

export interface Module {
  id: string
  name: string
  description: string
  type: ModuleType
  path: string
  language: FileLanguage
  framework: string
  folders: Folder[]
  files: File[]
}

export interface Folder {
  id: string
  name: string
  path: string
  depth: number
  folders: Folder[]
  files: File[]
}

export interface File {
  id: string
  name: string
  path: string
  extension: string
  language: FileLanguage
  category: FileCategory
  size: number
  lines: number
  imports: string[]
  exports: string[]
}

/* ─── Metadata ─── */

export interface ProjectMetadata {
  framework: string
  language: FileLanguage
  packageManager: string
  ci: string
  testingFramework: string
  documentation: string
  architecturePattern: string
  status: string
  owner: string
  version: string
  license: string
  tags: string[]
}

/* ─── Scan result ─── */

export interface ScanResult {
  repository: Repository
  modules: Module[]
  folders: Folder[]
  files: File[]
  duration: number
  timestamp: string
}

/* ─── Relationship (extended for repo graph) ─── */

export interface RepoRelationship {
  source: string
  target: string
  type: RepoRelationshipType
  label: string
  weight: number
  sourceType: 'module' | 'folder' | 'file'
  targetType: 'module' | 'folder' | 'file'
}
