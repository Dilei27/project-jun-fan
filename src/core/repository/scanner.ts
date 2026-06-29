import type { Repository, Module, Folder, File, ScanResult, FileLanguage, FileCategory, ModuleType } from './types'

/* ─── Interface ─── */

export interface RepositoryScanner {
  scanRepository(repo: Repository): Promise<ScanResult>
  scanModules(repo: Repository): Promise<Module[]>
  scanFolders(module: Module): Promise<Folder[]>
  scanFiles(folder: Folder): Promise<File[]>
}

/* ─── Mock data ─── */

const MOCK_FILES: File[] = [
  { id: 'file-1', name: 'layout.tsx', path: 'src/app/layout.tsx', extension: '.tsx', language: 'typescript', category: 'source', size: 2400, lines: 85, imports: ['next/font/google', 'framer-motion', 'lucide-react'], exports: ['default'] },
  { id: 'file-2', name: 'page.tsx', path: 'src/app/page.tsx', extension: '.tsx', language: 'typescript', category: 'source', size: 1800, lines: 62, imports: ['next/link', '@/components/platform/platform-context'], exports: ['default'] },
  { id: 'file-3', name: 'globals.css', path: 'src/app/globals.css', extension: '.css', language: 'css', category: 'style', size: 8500, lines: 398, imports: [], exports: [] },
  { id: 'file-4', name: 'platform-context.tsx', path: 'src/components/platform/platform-context.tsx', extension: '.tsx', language: 'typescript', category: 'source', size: 5200, lines: 178, imports: ['react', 'lucide-react'], exports: ['PlatformProvider', 'usePlatform'] },
  { id: 'file-5', name: 'living-status-bar.tsx', path: 'src/components/platform/living-status-bar.tsx', extension: '.tsx', language: 'typescript', category: 'source', size: 4800, lines: 165, imports: ['react', 'framer-motion', 'lucide-react', '@/design-system/motion'], exports: ['LivingStatusBar'] },
  { id: 'file-6', name: 'exploration-engine.ts', path: 'src/features/knowledge-graph/lib/exploration-engine.ts', extension: '.ts', language: 'typescript', category: 'source', size: 12000, lines: 459, imports: [], exports: ['ExplorationEngine'] },
  { id: 'file-7', name: 'replay-engine.ts', path: 'src/features/knowledge-graph/lib/replay-engine.ts', extension: '.ts', language: 'typescript', category: 'source', size: 7200, lines: 245, imports: [], exports: ['ReplayEngine'] },
  { id: 'file-8', name: 'index.ts', path: 'src/core/index.ts', extension: '.ts', language: 'typescript', category: 'source', size: 1600, lines: 52, imports: ['@/core/types', '@/core/queries', '@/core/knowledge'], exports: ['getGraphData', 'getFilteredGraph', 'searchNodes'] },
  { id: 'file-9', name: 'package.json', path: 'package.json', extension: '.json', language: 'json', category: 'config', size: 3200, lines: 128, imports: [], exports: [] },
  { id: 'file-10', name: 'tsconfig.json', path: 'tsconfig.json', extension: '.json', language: 'json', category: 'config', size: 900, lines: 34, imports: [], exports: [] },
  { id: 'file-11', name: 'next.config.ts', path: 'next.config.ts', extension: '.ts', language: 'typescript', category: 'config', size: 600, lines: 18, imports: ['next'], exports: ['default'] },
  { id: 'file-12', name: 'tailwind.config.ts', path: 'tailwind.config.ts', extension: '.ts', language: 'typescript', category: 'config', size: 1400, lines: 48, imports: ['tailwindcss'], exports: ['default'] },
  { id: 'file-13', name: 'Dockerfile', path: 'Dockerfile', extension: '', language: 'dockerfile', category: 'pipeline', size: 800, lines: 22, imports: [], exports: [] },
  { id: 'file-14', name: 'README.md', path: 'README.md', extension: '.md', language: 'markdown', category: 'documentation', size: 3500, lines: 120, imports: [], exports: [] },
  { id: 'file-15', name: 'motion.ts', path: 'src/design-system/motion.ts', extension: '.ts', language: 'typescript', category: 'source', size: 4100, lines: 145, imports: [], exports: ['motion', 'easing', 'duration', 'spring', 'stagger'] },
  { id: 'file-16', name: 'twin-client.tsx', path: 'src/app/twin/twin-client.tsx', extension: '.tsx', language: 'typescript', category: 'source', size: 6800, lines: 230, imports: ['react', 'framer-motion', '@/design-system/motion', '@/core/twin'], exports: ['TwinClient'] },
  { id: 'file-17', name: 'cluster.ts', path: 'src/features/knowledge-graph/lib/cluster.ts', extension: '.ts', language: 'typescript', category: 'source', size: 3200, lines: 91, imports: [], exports: ['CLUSTERS', 'getClusterForType', 'getClusterBounds'] },
  { id: 'file-18', name: 'knowledge-explorer.tsx', path: 'src/features/knowledge-graph/knowledge-explorer.tsx', extension: '.tsx', language: 'typescript', category: 'source', size: 32000, lines: 1100, imports: ['react', 'framer-motion', 'lucide-react', '@/core', '@/design-system/motion'], exports: ['KnowledgeExplorer'] },
  { id: 'file-19', name: 'jest.config.ts', path: 'jest.config.ts', extension: '.ts', language: 'typescript', category: 'config', size: 500, lines: 16, imports: [], exports: ['default'] },
  { id: 'file-20', name: '.eslintrc.json', path: '.eslintrc.json', extension: '.json', language: 'json', category: 'config', size: 800, lines: 25, imports: [], exports: [] },
]

const MOCK_FOLDERS: Folder[] = [
  {
    id: 'folder-1', name: 'src', path: 'src/', depth: 0,
    folders: [
      {
        id: 'folder-2', name: 'app', path: 'src/app/', depth: 1,
        folders: [
          { id: 'folder-3', name: 'twin', path: 'src/app/twin/', depth: 2, folders: [], files: [MOCK_FILES[15]] },
          { id: 'folder-4', name: 'knowledge-graph', path: 'src/app/knowledge-graph/', depth: 2, folders: [], files: [] },
        ],
        files: [MOCK_FILES[0], MOCK_FILES[1], MOCK_FILES[2]],
      },
      {
        id: 'folder-5', name: 'components', path: 'src/components/', depth: 1,
        folders: [
          { id: 'folder-6', name: 'platform', path: 'src/components/platform/', depth: 2, folders: [], files: [MOCK_FILES[3], MOCK_FILES[4]] },
        ],
        files: [],
      },
      {
        id: 'folder-7', name: 'core', path: 'src/core/', depth: 1,
        folders: [
          { id: 'folder-8', name: 'repository', path: 'src/core/repository/', depth: 2, folders: [], files: [] },
        ],
        files: [MOCK_FILES[7]],
      },
      {
        id: 'folder-9', name: 'features', path: 'src/features/', depth: 1,
        folders: [
          {
            id: 'folder-10', name: 'knowledge-graph', path: 'src/features/knowledge-graph/', depth: 2,
            folders: [
              { id: 'folder-11', name: 'lib', path: 'src/features/knowledge-graph/lib/', depth: 3, folders: [], files: [MOCK_FILES[5], MOCK_FILES[6], MOCK_FILES[16]] },
              { id: 'folder-12', name: 'hooks', path: 'src/features/knowledge-graph/hooks/', depth: 3, folders: [], files: [] },
              { id: 'folder-13', name: 'components', path: 'src/features/knowledge-graph/components/', depth: 3, folders: [], files: [] },
            ],
            files: [MOCK_FILES[17]],
          },
        ],
        files: [],
      },
      {
        id: 'folder-14', name: 'design-system', path: 'src/design-system/', depth: 1,
        folders: [], files: [MOCK_FILES[14]],
      },
    ],
    files: [],
  },
  {
    id: 'folder-15', name: 'root', path: '/', depth: 0, folders: [], files: [
      MOCK_FILES[8], MOCK_FILES[9], MOCK_FILES[10], MOCK_FILES[11],
      MOCK_FILES[12], MOCK_FILES[13], MOCK_FILES[18], MOCK_FILES[19],
    ],
  },
]

const allFiles = [...MOCK_FILES]
function collectAllFiles(folders: Folder[]): File[] {
  const result: File[] = []
  for (const f of folders) {
    result.push(...f.files)
    result.push(...collectAllFiles(f.folders))
  }
  return result
}
MOCK_FOLDERS.forEach(f => allFiles.push(...collectAllFiles(f.folders)))

const MOCK_MODULES: Module[] = [
  {
    id: 'mod-1', name: 'Application', description: 'Next.js application shell', type: 'application',
    path: 'src/app/', language: 'typescript', framework: 'Next.js',
    folders: MOCK_FOLDERS.filter(f => f.path.startsWith('src/app/')),
    files: [MOCK_FILES[0], MOCK_FILES[1], MOCK_FILES[2]],
  },
  {
    id: 'mod-2', name: 'Components', description: 'Shared UI components', type: 'library',
    path: 'src/components/', language: 'typescript', framework: 'React',
    folders: MOCK_FOLDERS.filter(f => f.path.startsWith('src/components/')),
    files: [MOCK_FILES[3], MOCK_FILES[4]],
  },
  {
    id: 'mod-3', name: 'Core', description: 'Domain layer and knowledge model', type: 'library',
    path: 'src/core/', language: 'typescript', framework: 'Node',
    folders: MOCK_FOLDERS.filter(f => f.path.startsWith('src/core/')),
    files: [MOCK_FILES[7]],
  },
  {
    id: 'mod-4', name: 'Features', description: 'Feature modules', type: 'application',
    path: 'src/features/', language: 'typescript', framework: 'React',
    folders: MOCK_FOLDERS.filter(f => f.path.startsWith('src/features/')),
    files: [MOCK_FILES[5], MOCK_FILES[6], MOCK_FILES[16], MOCK_FILES[17]],
  },
  {
    id: 'mod-5', name: 'Design System', description: 'Design tokens and motion primitives', type: 'library',
    path: 'src/design-system/', language: 'typescript', framework: 'React',
    folders: [], files: [MOCK_FILES[14]],
  },
  {
    id: 'mod-6', name: 'Configuration', description: 'Project configuration files', type: 'configuration',
    path: '/', language: 'typescript', framework: 'Node',
    folders: [], files: [MOCK_FILES[8], MOCK_FILES[9], MOCK_FILES[10], MOCK_FILES[11], MOCK_FILES[12], MOCK_FILES[18], MOCK_FILES[19]],
  },
  {
    id: 'mod-7', name: 'Pipeline', description: 'CI/CD and containerization', type: 'tool',
    path: '/', language: 'dockerfile', framework: 'Docker',
    folders: [], files: [MOCK_FILES[12]],
  },
  {
    id: 'mod-8', name: 'Documentation', description: 'Project documentation', type: 'documentation',
    path: '/', language: 'markdown', framework: 'Markdown',
    folders: [], files: [MOCK_FILES[13]],
  },
]

/* ─── Mock Scanner ─── */

export class MockScanner implements RepositoryScanner {
  private delayMs = 200

  async scanRepository(repo: Repository): Promise<ScanResult> {
    await this.simulateDelay()
    const modules = await this.scanModules(repo)
    const allFolders: Folder[] = []
    const allFiles: File[] = []
    for (const mod of modules) {
      const folders = await this.scanFolders(mod)
      allFolders.push(...folders)
      for (const f of folders) {
        allFiles.push(...f.files)
        allFiles.push(...this.collectDeepFiles(f))
      }
    }
    return {
      repository: { ...repo, scannedAt: new Date().toISOString(), analysisStatus: 'complete' },
      modules,
      folders: allFolders,
      files: allFiles,
      duration: this.delayMs,
      timestamp: new Date().toISOString(),
    }
  }

  async scanModules(_repo: Repository): Promise<Module[]> {
    await this.simulateDelay()
    return MOCK_MODULES.map(m => ({ ...m }))
  }

  async scanFolders(_module: Module): Promise<Folder[]> {
    await this.simulateDelay()
    return MOCK_FOLDERS.map(f => this.cloneFolder(f))
  }

  async scanFiles(_folder: Folder): Promise<File[]> {
    await this.simulateDelay()
    return [...allFiles]
  }

  private async simulateDelay(): Promise<void> {
    return new Promise(r => setTimeout(r, this.delayMs))
  }

  private cloneFolder(f: Folder): Folder {
    return {
      ...f,
      files: [...f.files],
      folders: f.folders.map(child => this.cloneFolder(child)),
    }
  }

  private collectDeepFiles(folder: Folder): File[] {
    const result: File[] = [...folder.files]
    for (const child of folder.folders) {
      result.push(...this.collectDeepFiles(child))
    }
    return result
  }
}

export const defaultScanner: RepositoryScanner = new MockScanner()
