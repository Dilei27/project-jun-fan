import type {
  ReviewFinding, ReviewRecommendation, ImprovementOpportunity,
  RecommendationPriority, RecommendationEffort, ReviewCategory,
} from './types'

/* ─── Improvement logic ─── */

const SEVERITY_PRIORITY: Record<string, RecommendationPriority> = {
  critical: 'critical',
  high:     'high',
  medium:   'medium',
  low:      'low',
  info:     'low',
}

const SEVERITY_EFFORT: Record<string, RecommendationEffort> = {
  critical: 'large',
  high:     'medium',
  medium:   'medium',
  low:      'small',
  info:     'small',
}

const SEVERITY_IMPACT: Record<string, string> = {
  critical: 'Crítico — pode causar falhas ou bloquear entregas.',
  high:     'Alto — impacto significativo na qualidade ou manutenibilidade.',
  medium:   'Médio — melhoria incremental com benefício moderado.',
  low:      'Baixo — refinamento ou dívida técnica de baixo risco.',
  info:     'Informativo — observação para referência futura.',
}

/* ─── Recommendation Engine ─── */

export class RecommendationEngine {
  generate(finding: ReviewFinding): ReviewRecommendation {
    const priority = SEVERITY_PRIORITY[finding.severity] ?? 'medium'
    const effort = SEVERITY_EFFORT[finding.severity] ?? 'medium'
    const impact = SEVERITY_IMPACT[finding.severity] ?? 'Impacto moderado.'

    return {
      id: `rec-${finding.id}`,
      findingId: finding.id,
      title: `Resolver: ${finding.title}`,
      description: finding.recommendation,
      estimatedImpact: finding.impact || impact,
      affectedModules: finding.relatedEntities.filter(Boolean),
      priority,
      effort,
      category: finding.category,
      effortDescription: this.effortDescription(effort),
    }
  }

  classifyImprovement(finding: ReviewFinding, rec: ReviewRecommendation): ImprovementOpportunity {
    const severityScore = this.severityScore(finding.severity)
    const effortScore = this.effortScore(rec.effort)

    const category = this.determineCategory(severityScore, effortScore)

    return { finding, recommendation: rec, impactScore: severityScore, effortScore, category }
  }

  sortImprovements(opportunities: ImprovementOpportunity[]): ImprovementOpportunity[] {
    const order: Record<string, number> = {
      high_impact:   0,
      quick_win:     1,
      medium_impact: 2,
      long_term:     3,
    }
    return [...opportunities].sort((a, b) => {
      const oa = order[a.category] ?? 99
      const ob = order[b.category] ?? 99
      if (oa !== ob) return oa - ob
      return b.impactScore - a.impactScore
    })
  }

  private severityScore(severity: string): number {
    switch (severity) {
      case 'critical': return 5
      case 'high':     return 4
      case 'medium':   return 3
      case 'low':      return 2
      case 'info':     return 1
      default:         return 0
    }
  }

  private effortScore(effort: RecommendationEffort): number {
    switch (effort) {
      case 'small':  return 1
      case 'medium': return 2
      case 'large':  return 3
    }
  }

  private determineCategory(impact: number, effort: number): ImprovementOpportunity['category'] {
    if (impact >= 4 && effort <= 1) return 'quick_win'
    if (impact >= 4) return 'high_impact'
    if (impact >= 2) return 'medium_impact'
    return 'long_term'
  }

  private effortDescription(effort: RecommendationEffort): string {
    switch (effort) {
      case 'small':  return 'Pequeno — horas a dias'
      case 'medium': return 'Médio — dias a semanas'
      case 'large':  return 'Grande — semanas a meses'
    }
  }
}

export const defaultRecommendationEngine = new RecommendationEngine()
