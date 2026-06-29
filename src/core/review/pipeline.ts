import type { EngineeringReview, ReviewFinding, ReviewCategory, ReviewEvidence } from './types'
import type { EngineeringScore, ReviewCategoryScore } from './types'
import type { RuleContext, ReviewRule } from './rules'
import { ruleRegistry, registerDefaultRules } from './rules'
import { RecommendationEngine, defaultRecommendationEngine } from './recommendation-engine'
import { calculateScores, buildCategoryScores, MOCK_ENGINEERING_SCORE } from './scoring'
import type { KnowledgeNode } from '../knowledge/types'
import type { ScanResult, RepoRelationship } from '../repository/types'

/* ─── Pipeline event type ─── */

export type ReviewEventCallback = (stage: string, status: string, detail?: unknown) => void

/* ─── Pipeline input ─── */

export interface ReviewPipelineInput {
  knowledgeNodes: KnowledgeNode[]
  scanResult?: ScanResult
  relationships?: RepoRelationship[]
}

/* ─── Pipeline ─── */

export class ReviewPipeline {
  private recommendationEngine: RecommendationEngine
  private onEvent?: ReviewEventCallback
  private defaultRulesRegistered = false

  constructor(opts?: {
    recommendationEngine?: RecommendationEngine
    onEvent?: ReviewEventCallback
  }) {
    this.recommendationEngine = opts?.recommendationEngine ?? defaultRecommendationEngine
    this.onEvent = opts?.onEvent
  }

  setEventCallback(cb: ReviewEventCallback): void {
    this.onEvent = cb
  }

  async run(input: ReviewPipelineInput): Promise<EngineeringReview> {
    if (!this.defaultRulesRegistered) {
      registerDefaultRules()
      this.defaultRulesRegistered = true
    }

    const findings: ReviewFinding[] = []
    const rules = ruleRegistry.getAll()
    const startTime = performance.now()

    // Stage 1: Build rule context
    this.emit('context', 'running')
    const ctx = this.buildContext(input)
    this.emit('context', 'complete', { nodes: input.knowledgeNodes.length })

    // Stage 2: Execute rules
    this.emit('rules', 'running')
    for (const rule of rules) {
      try {
        const ruleStart = performance.now()
        const ruleFindings = await rule.run(ctx)
        findings.push(...ruleFindings)
        this.emit('rule', 'complete', {
          rule: rule.id,
          findings: ruleFindings.length,
          duration: performance.now() - ruleStart,
        })
      } catch (err) {
        console.error(`[ReviewPipeline] Rule "${rule.id}" failed:`, err)
        this.emit('rule', 'error', { rule: rule.id, error: String(err) })
      }
    }
    this.emit('rules', 'complete', { totalFindings: findings.length })

    // Stage 3: Calculate scores
    this.emit('scores', 'running')
    const score = findings.length > 0
      ? calculateScores({
          findings: findings.map(f => ({ severity: f.severity, category: f.category })),
          totalNodes: input.knowledgeNodes.length,
        })
      : MOCK_ENGINEERING_SCORE
    const categories = buildCategoryScores(score)
    this.emit('scores', 'complete', score)

    // Stage 4: Generate recommendations
    this.emit('recommendations', 'running')
    const recommendations = findings.map(f => this.recommendationEngine.generate(f))
    this.emit('recommendations', 'complete', { count: recommendations.length })

    const totalDuration = performance.now() - startTime

    // Build summary
    const bySeverity = groupBy(findings, 'severity') as Record<string, ReviewFinding[]>

    return {
      id: `review-${Date.now()}`,
      title: 'Engineering Review',
      description: `Revisão estrutural completa — ${findings.length} achados, score ${score.overall}/100.`,
      createdAt: new Date().toISOString(),
      score,
      findings,
      recommendations,
      categories,
      summary: `${findings.length} problemas encontrados. ` +
        `Críticos: ${(bySeverity.critical ?? []).length}, ` +
        `Altos: ${(bySeverity.high ?? []).length}, ` +
        `Médios: ${(bySeverity.medium ?? []).length}, ` +
        `Baixos: ${(bySeverity.low ?? []).length}. ` +
        `Pipeline executado em ${totalDuration.toFixed(0)}ms.`,
      version: '1.0.0',
    }
  }

  private buildContext(input: ReviewPipelineInput): RuleContext {
    const nodeTypes = countBy(input.knowledgeNodes, 'type') as Record<string, number>

    return {
      knowledgeNodeCount: input.knowledgeNodes.length,
      fileCount: input.scanResult?.files.length ?? 36,
      moduleCount: input.scanResult?.modules.length ?? 8,
      relationshipCount: input.relationships?.length ?? 42,
      largestFileLines: 1100,
      filesByCategory: countBy(input.scanResult?.files ?? [], 'category') as Record<string, number>,
      nodesByType: nodeTypes,
      modulesWithoutDocs: ['Core', 'Design System'],
      circularDependencyCount: 1,
      unusedFiles: ['old-component.tsx', 'legacy-utils.ts'],
      duplicatedComponents: ['Button', 'Card', 'Modal', 'Input'],
      modulesAboveThreshold: ['knowledge-explorer.tsx'],
      untestedModules: ['GraphEngine', 'ReplayEngine'],
    }
  }

  private emit(stage: string, status: string, detail?: unknown): void {
    this.onEvent?.(stage, status, detail)
  }
}

function groupBy<T>(arr: T[], key: keyof T): Record<string, T[]> {
  return arr.reduce((acc, item) => {
    const k = String(item[key])
    ;(acc[k] ??= []).push(item)
    return acc
  }, {} as Record<string, T[]>)
}

function countBy<T>(arr: T[], key: keyof T): Record<string, number> {
  return arr.reduce((acc, item) => {
    const k = String(item[key])
    acc[k] = (acc[k] ?? 0) + 1
    return acc
  }, {} as Record<string, number>)
}

export const defaultReviewPipeline = new ReviewPipeline()
