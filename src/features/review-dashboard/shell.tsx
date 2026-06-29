'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, ClipboardCheck } from 'lucide-react';
import { motion as m } from '@/design-system/motion';
import { usePlatform } from '@/components/platform/platform-context';
import {
  ReviewPipeline,
  RecommendationEngine,
  defaultRecommendationEngine,
  defaultReviewPipeline,
  reviewHistoryStore,
  MOCK_SNAPSHOTS,
  type EngineeringReview,
  type ReviewEventCallback,
  type RecommendationEngine as RecommendationEngineType,
} from '@/core/review';
import { defaultKnowledgeBuilder, defaultScanner, defaultGraphBuilder, type Repository } from '@/core/repository';
import { ScoreRadar } from './components/score-radar';
import { ScoreCard } from './components/score-card';
import { FindingsList } from './components/findings-list';
import { Recommendations } from './components/recommendations';
import { ImprovementList } from './components/improvement-list';
import { Timeline } from './components/timeline';

const MOCK_REPOSITORY: Repository = {
  id: 'repo-junfan',
  name: 'Project Jun Fan',
  description: 'Plataforma de inteligência de engenharia.',
  url: '',
  defaultBranch: 'main',
  workspace: { id: 'ws-1', name: 'Jun Fan', description: '', organization: '' },
  projects: [],
  metadata: {
    framework: 'Next.js 16', language: 'typescript', packageManager: 'pnpm',
    ci: 'GitHub Actions', testingFramework: 'Jest', documentation: 'Markdown',
    architecturePattern: 'Feature modular', status: 'active', owner: 'Team',
    version: '2.0.0', license: 'MIT', tags: [],
  },
  scannedAt: null,
  analysisStatus: 'pending',
};

export function ReviewDashboardShell() {
  const { setCurrentModule } = usePlatform()

  useEffect(() => {
    setCurrentModule('engineering-review')
  }, [setCurrentModule])

  const [review, setReview] = useState<EngineeringReview | null>(null)
  const [running, setRunning] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [stageLog, setStageLog] = useState<string[]>([])

  const handleEvent: ReviewEventCallback = useCallback((stage, status, detail) => {
    setStageLog(prev => [...prev.slice(-99), `${stage}: ${status}${detail ? ` (${JSON.stringify(detail)})` : ''}`])
  }, [])

  const pipeline = new ReviewPipeline({
    recommendationEngine: defaultRecommendationEngine,
    onEvent: handleEvent,
  })

  const handleRun = useCallback(async () => {
    setRunning(true)
    setError(null)
    setStageLog([])
    try {
      // Build repository data to feed review pipeline
      const scanResult = await defaultScanner.scanRepository(MOCK_REPOSITORY)
      const knowledgeNodes = defaultKnowledgeBuilder.build(scanResult)
      const relationships = defaultGraphBuilder.buildRelationships(scanResult)

      const result = await pipeline.run({ knowledgeNodes, scanResult, relationships })

      // Record snapshot
      reviewHistoryStore.push(result.id, result.score, result.findings.length, result.summary)

      setReview(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
    } finally {
      setRunning(false)
    }
  }, [pipeline])

  const recEngine = defaultRecommendationEngine
  const opportunities = review
    ? recEngine.sortImprovements(
        review.findings.map(f => recEngine.classifyImprovement(f, recEngine.generate(f)))
      )
    : []

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
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{
            background: 'rgba(196, 132, 252, 0.12)',
            color: '#C084FC',
          }}>
            <ClipboardCheck size={16} />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-text-primary">Engineering Review</h1>
            <p className="text-[10px] text-text-muted/60">Avaliação técnica por regras</p>
          </div>
        </div>

        <motion.button
          whileTap={m.tap.soft}
          onClick={handleRun}
          disabled={running}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-medium transition-all"
          style={{
            background: running ? 'rgba(244,247,250,0.04)' : 'rgba(196, 132, 252, 0.12)',
            color: running ? '#687385' : '#C084FC',
            border: `1px solid ${running ? 'rgba(244,247,250,0.06)' : 'rgba(196, 132, 252, 0.2)'}`,
          }}
        >
          {running ? (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-accent-qa animate-pulse" />
              Avaliando
            </>
          ) : (
            <>
              {review ? <RotateCcw size={10} /> : <Play size={10} />}
              {review ? 'Re-avaliar' : 'Avaliar'}
            </>
          )}
        </motion.button>
      </motion.div>

      {/* Pipeline log */}
      {stageLog.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="rounded-lg px-3 py-2"
          style={{ background: 'rgba(17, 24, 33, 0.4)', border: '1px solid rgba(244,247,250,0.03)' }}
        >
          <div className="flex flex-wrap gap-1">
            {stageLog.map((log, i) => (
              <span key={i} className="text-[8px] font-mono text-text-muted/40">
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
      {review && (
        <div className="space-y-4">
          {/* Score header row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: m.easing.out }}
            className="rounded-xl p-5 flex items-start gap-6"
            style={{
              background: 'rgba(17, 24, 33, 0.6)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(244, 247, 250, 0.04)',
            }}
          >
            <ScoreRadar score={review.score} size={160} />

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-sm font-semibold text-text-primary">{review.title}</h2>
                <span className="text-[8px] text-text-muted/40">
                  {new Date(review.createdAt).toLocaleString('pt-BR')}
                </span>
              </div>
              <p className="text-[10px] text-text-muted/70 mb-3">{review.summary}</p>

              {/* Category score cards */}
              <div className="grid grid-cols-5 gap-2">
                {review.categories.filter(c => c.weight > 0).map(cat => (
                  <ScoreCard key={cat.category} category={cat} />
                ))}
              </div>

              <div className="flex items-center gap-4 mt-3 text-[7px] text-text-muted/30">
                <span>v{review.version}</span>
                <span>{review.findings.length} findings</span>
                <span>{review.recommendations.length} recomendações</span>
                <span>{opportunities.length} oportunidades</span>
              </div>
            </div>
          </motion.div>

          {/* Two-column: Findings + Recommendations */}
          <div className="grid grid-cols-2 gap-4">
            <FindingsList findings={review.findings} />
            <Recommendations recommendations={review.recommendations} />
          </div>

          {/* Improvement opportunities */}
          <div className="grid grid-cols-2 gap-4">
            <ImprovementList opportunities={opportunities} />

            {/* Timeline + history */}
            <div className="space-y-4">
              <Timeline snapshots={[...MOCK_SNAPSHOTS, {
                id: `snapshot-${Date.now()}`,
                reviewId: review.id,
                timestamp: review.createdAt,
                score: review.score,
                findingsCount: review.findings.length,
                summary: review.summary,
              }]} />
            </div>
          </div>

          {/* Footer note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center pb-4"
          >
            <span className="text-[8px] font-mono text-text-muted/20">
              Review Engine · Regras: {review.findings.length} · Score: {review.score.overall}/100
            </span>
          </motion.div>
        </div>
      )}

      {/* Empty state */}
      {!review && !running && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center justify-center py-24 text-center"
        >
          <ClipboardCheck size={28} className="text-text-muted/20 mb-3" />
          <p className="text-xs text-text-muted/50 max-w-xs">
            Pressione <span className="text-accent-qa font-medium">Avaliar</span> para executar o pipeline de review e gerar um diagnóstico técnico completo.
          </p>
          <p className="text-[9px] text-text-muted/30 mt-2 max-w-sm">
            Conhecimento → Regras → Findings → Recomendações → Score
          </p>
        </motion.div>
      )}
    </div>
  )
}
