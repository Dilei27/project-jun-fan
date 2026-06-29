import type { EngineeringScore, ReviewCategoryScore, ReviewCategory } from './types'
import { getDefaultWeight } from './types'

/* ─── Category deduction ─── */

export function computeCategoryScore(
  category: ReviewCategory,
  findingsCount: number,
  avgSeverity: number,
  totalNodes: number,
): number {
  // Score starts at 100 and is reduced by findings
  const severityPenalty = findingsCount * avgSeverity * 2
  const densityPenalty = totalNodes > 0 ? Math.max(0, (findingsCount / totalNodes) * 100) : 0
  return Math.max(0, Math.min(100, Math.round(100 - severityPenalty - densityPenalty)))
}

function severityWeight(severity: string): number {
  switch (severity) {
    case 'critical': return 5
    case 'high':     return 3
    case 'medium':   return 2
    case 'low':      return 1
    case 'info':     return 0.5
    default:         return 0
  }
}

/* ─── Score calculation ─── */

export interface ScoreInput {
  findings: Array<{ severity: string; category: string }>
  totalNodes: number
}

export function calculateScores(input: ScoreInput): EngineeringScore {
  const categories: ReviewCategory[] = [
    'architecture', 'documentation', 'knowledge', 'qa',
    'maintainability', 'security', 'performance',
  ]

  const categoryScores: Record<string, { count: number; totalWeight: number }> = {}
  for (const cat of categories) {
    categoryScores[cat] = { count: 0, totalWeight: 0 }
  }

  for (const finding of input.findings) {
    const cat = finding.category
    if (categoryScores[cat]) {
      categoryScores[cat].count++
      categoryScores[cat].totalWeight += severityWeight(finding.severity)
    }
  }

  const scores: Record<string, number> = {}
  for (const cat of categories) {
    const data = categoryScores[cat]
    const avgSeverity = data.count > 0 ? data.totalWeight / data.count : 0
    scores[cat] = computeCategoryScore(cat, data.count, avgSeverity, input.totalNodes)
  }

  const overall = Math.round(
    (scores.architecture * 0.30 +
     scores.documentation * 0.15 +
     scores.knowledge * 0.20 +
     scores.qa * 0.20 +
     scores.maintainability * 0.15)
  )

  return {
    overall,
    architecture:    scores.architecture,
    documentation:   scores.documentation,
    knowledge:       scores.knowledge,
    qa:              scores.qa,
    maintainability: scores.maintainability,
    security:        scores.security,
    performance:     scores.performance,
  }
}

export function buildCategoryScores(score: EngineeringScore): ReviewCategoryScore[] {
  const categories: ReviewCategory[] = [
    'architecture', 'documentation', 'knowledge', 'qa',
    'maintainability', 'security', 'performance',
  ]
  return categories.map(category => ({
    category,
    score: score[category],
    weight: getDefaultWeight(category),
  }))
}

/* ─── Mock scores (fallback / demo) ─── */

export const MOCK_ENGINEERING_SCORE: EngineeringScore = {
  overall: 64,
  architecture: 72,
  documentation: 58,
  knowledge: 81,
  qa: 45,
  maintainability: 63,
  security: 78,
  performance: 85,
}
