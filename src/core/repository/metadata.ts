import type { ProjectMetadata, FileLanguage } from './types'

/* ─── Interface ─── */

export interface MetadataProvider {
  getMetadata(): ProjectMetadata
  detectFramework(): string
  detectLanguage(): FileLanguage
  detectPackageManager(): string
  detectCI(): string
  detectTestingFramework(): string
}

/* ─── Mock metadata ─── */

const MOCK_METADATA: ProjectMetadata = {
  framework: 'Next.js 16',
  language: 'typescript',
  packageManager: 'pnpm',
  ci: 'GitHub Actions',
  testingFramework: 'Jest + React Testing Library',
  documentation: 'Markdown + Storybook',
  architecturePattern: 'Feature-based modular monolith',
  status: 'active',
  owner: 'Engineering Team',
  version: '2.0.0',
  license: 'MIT',
  tags: ['next.js', 'react', 'typescript', 'tailwind', 'knowledge-graph', 'digital-twin'],
}

/* ─── Mock Provider ─── */

export class MockMetadataProvider implements MetadataProvider {
  getMetadata(): ProjectMetadata {
    return { ...MOCK_METADATA }
  }

  detectFramework(): string {
    return MOCK_METADATA.framework
  }

  detectLanguage(): FileLanguage {
    return MOCK_METADATA.language
  }

  detectPackageManager(): string {
    return MOCK_METADATA.packageManager
  }

  detectCI(): string {
    return MOCK_METADATA.ci
  }

  detectTestingFramework(): string {
    return MOCK_METADATA.testingFramework
  }
}

export const defaultMetadataProvider: MetadataProvider = new MockMetadataProvider()
