/* ─── Repository domain barrel ─── */

export {
  REPO_RELATIONSHIP_LABELS,
  type RepoRelationshipType,
  type FileLanguage,
  type FileCategory,
  type ModuleType,
  type AnalysisStatus,
  type Repository,
  type Project,
  type Workspace,
  type Branch,
  type Module,
  type Folder,
  type File,
  type ProjectMetadata,
  type ScanResult,
  type RepoRelationship,
} from './types'

export {
  type RepositoryScanner,
  defaultScanner,
  MockScanner,
} from './scanner'

export {
  type MetadataProvider,
  defaultMetadataProvider,
  MockMetadataProvider,
} from './metadata'

export {
  type KnowledgeBuilder,
  defaultKnowledgeBuilder,
  MockKnowledgeBuilder,
} from './knowledge-builder'

export {
  type GraphBuilder,
  defaultGraphBuilder,
  MockGraphBuilder,
} from './graph-builder'

export {
  type PipelineResult,
  type PipelineStageResult,
  type PipelineEventCallback,
  AnalysisPipeline,
  defaultPipeline,
} from './pipeline'

export {
  type AnalyzerPlugin,
  pluginRegistry,
} from './plugin'
