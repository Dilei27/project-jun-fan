'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Database } from 'lucide-react';
import { motion as m } from '@/design-system/motion';
import { usePlatform } from '@/components/platform/platform-context';
import {
  AnalysisPipeline,
  defaultScanner,
  defaultMetadataProvider,
  defaultKnowledgeBuilder,
  defaultGraphBuilder,
  defaultPipeline,
  type Repository,
  type Workspace,
  type Project,
  type PipelineResult,
  type PipelineEventCallback,
} from '@/core/repository';
import { StatusBadge } from './components/status-badge';
import { RepoOverview } from './components/repo-overview';
import { ModuleList } from './components/module-list';
import { FileTree } from './components/file-tree';
import { KnowledgeNodes } from './components/knowledge-nodes';
import { Relationships } from './components/relationships';

const MOCK_REPOSITORY: Repository = {
  id: 'repo-junfan',
  name: 'Project Jun Fan',
  description: 'Plataforma de inteligência de engenharia — conhecimento, twin digital, exploração e replay.',
  url: 'https://github.com/anomalyco/junfan',
  defaultBranch: 'main',
  workspace: {
    id: 'ws-1',
    name: 'Jun Fan Workspace',
    description: 'Workspace principal do Project Jun Fan',
    organization: 'Anomaly Co',
  },
  projects: [
    {
      id: 'proj-1',
      name: 'Jun Fan',
      description: 'Platform principal',
      type: 'application',
      modules: [],
      rootFolder: { id: 'root', name: '/', path: '/', depth: 0, folders: [], files: [] },
    },
  ],
  metadata: {
    framework: 'Next.js 16',
    language: 'typescript',
    packageManager: 'pnpm',
    ci: 'GitHub Actions',
    testingFramework: 'Jest',
    documentation: 'Markdown',
    architecturePattern: 'Feature modular',
    status: 'active',
    owner: 'Engineering Team',
    version: '2.0.0',
    license: 'MIT',
    tags: ['next.js', 'react', 'typescript'],
  },
  scannedAt: null,
  analysisStatus: 'pending',
};

export function RepositoryDashboardShell() {
  const { setCurrentModule } = usePlatform()

  useEffect(() => {
    setCurrentModule('repository')
  }, [setCurrentModule])

  const [result, setResult] = useState<PipelineResult | null>(null)
  const [running, setRunning] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [stageLog, setStageLog] = useState<string[]>([])

  const handleEvent: PipelineEventCallback = useCallback((stage, status) => {
    setStageLog(prev => [...prev.slice(-99), `${stage}: ${status}`])
  }, [])

  const pipeline = new AnalysisPipeline({
    scanner: defaultScanner,
    metadata: defaultMetadataProvider,
    knowledgeBuilder: defaultKnowledgeBuilder,
    graphBuilder: defaultGraphBuilder,
    onEvent: handleEvent,
  })

  const handleRun = useCallback(async () => {
    setRunning(true)
    setError(null)
    setStageLog([])
    try {
      const pipelineResult = await pipeline.run({ ...MOCK_REPOSITORY })
      setResult(pipelineResult)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error'
      setError(msg)
    } finally {
      setRunning(false)
    }
  }, [pipeline])

  return (
    <div className="min-h-screen px-6 py-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: m.easing.out }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background: 'rgba(79, 140, 255, 0.12)',
              color: '#4F8CFF',
            }}
          >
            <Database size={16} />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-text-primary">Repository Intelligence</h1>
            <p className="text-[10px] text-text-muted/60">Pipeline de análise de repositório</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <StatusBadge
            status={result?.repository.analysisStatus ?? 'pending'}
            pulse={running}
          />
          <motion.button
            whileTap={m.tap.soft}
            onClick={handleRun}
            disabled={running}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-medium transition-all"
            style={{
              background: running ? 'rgba(244,247,250,0.04)' : 'rgba(79, 140, 255, 0.12)',
              color: running ? '#687385' : '#4F8CFF',
              border: `1px solid ${running ? 'rgba(244,247,250,0.06)' : 'rgba(79, 140, 255, 0.2)'}`,
            }}
          >
            {running ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-accent-qa animate-pulse" />
                Analisando
              </>
            ) : (
              <>
                {result ? <RotateCcw size={10} /> : <Play size={10} />}
                {result ? 'Re-analisar' : 'Analisar'}
              </>
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* Pipeline stages log */}
      {stageLog.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="rounded-lg px-3 py-2"
          style={{
            background: 'rgba(17, 24, 33, 0.4)',
            border: '1px solid rgba(244, 247, 250, 0.03)',
          }}
        >
          <div className="flex flex-wrap gap-1">
            {stageLog.map((log, i) => (
              <span
                key={i}
                className="text-[8px] font-mono text-text-muted/40"
              >
                {log}
                {i < stageLog.length - 1 && ' → '}
              </span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-lg px-4 py-2 text-[10px] text-danger"
            style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.15)' }}
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      {result && (
        <div className="space-y-4">
          <RepoOverview repository={result.repository} result={result} />

          <div className="grid grid-cols-2 gap-4">
            <ModuleList modules={result.scanResult.modules} />
            <FileTree folders={result.scanResult.folders} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <KnowledgeNodes nodes={result.knowledgeNodes} />
            <Relationships relationships={result.relationships} />
          </div>

          {/* Pipeline duration */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <span className="text-[8px] font-mono text-text-muted/30">
              Pipeline concluído em {result.duration.toFixed(0)}ms · {result.knowledgeNodes.length} nodes · {result.relationships.length} relações
            </span>
          </motion.div>
        </div>
      )}

      {/* Empty state */}
      {!result && !running && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center justify-center py-24 text-center"
        >
          <Database size={28} className="text-text-muted/20 mb-3" />
          <p className="text-xs text-text-muted/50 max-w-xs">
            Pressione <span className="text-accent-qa font-medium">Analisar</span> para executar o pipeline e transformar este repositório em conhecimento estruturado.
          </p>
          <p className="text-[9px] text-text-muted/30 mt-2 max-w-sm">
            Scanner → Knowledge Builder → Graph Builder → Modelo de Conhecimento
          </p>
        </motion.div>
      )}
    </div>
  )
}
