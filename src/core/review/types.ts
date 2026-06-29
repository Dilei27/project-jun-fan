/* ─── Enums ─── */

export type ReviewSeverity = 'critical' | 'high' | 'medium' | 'low' | 'info'

export type ReviewCategory =
  | 'architecture' | 'qa' | 'documentation' | 'knowledge'
  | 'maintainability' | 'security' | 'performance'

export type FindingStatus = 'open' | 'acknowledged' | 'resolved' | 'wontfix'

export type RecommendationPriority = 'critical' | 'high' | 'medium' | 'low'

export type RecommendationEffort = 'small' | 'medium' | 'large'

export type ImprovementCategory = 'high_impact' | 'medium_impact' | 'quick_win' | 'long_term'

/* ─── Constants ─── */

export const REVIEW_CATEGORY_LABELS: Record<ReviewCategory, string> = {
  architecture:    'Arquitetura',
  qa:              'Qualidade',
  documentation:   'Documentação',
  knowledge:       'Conhecimento',
  maintainability: 'Manutenibilidade',
  security:        'Segurança',
  performance:     'Performance',
}

export const REVIEW_CATEGORY_COLORS: Record<ReviewCategory, string> = {
  architecture:    '#4F8CFF',
  qa:              '#22C55E',
  documentation:   '#EAB308',
  knowledge:       '#C084FC',
  maintainability: '#FB923C',
  security:        '#EF4444',
  performance:     '#22D3EE',
}

export const SEVERITY_LABELS: Record<ReviewSeverity, string> = {
  critical: 'Crítico',
  high:     'Alto',
  medium:   'Médio',
  low:      'Baixo',
  info:     'Informativo',
}

export const SEVERITY_COLORS: Record<ReviewSeverity, string> = {
  critical: '#EF4444',
  high:     '#FB923C',
  medium:   '#EAB308',
  low:      '#687385',
  info:     '#4F8CFF',
}

const DEFAULT_WEIGHTS: Record<ReviewCategory, number> = {
  architecture:    0.30,
  documentation:   0.15,
  knowledge:       0.20,
  qa:              0.20,
  maintainability: 0.15,
  security:        0,
  performance:     0,
}

export function getDefaultWeight(category: ReviewCategory): number {
  return DEFAULT_WEIGHTS[category] ?? 0
}

/* ─── Core entities ─── */

export interface EngineeringReview {
  id: string
  title: string
  description: string
  createdAt: string
  score: EngineeringScore
  findings: ReviewFinding[]
  recommendations: ReviewRecommendation[]
  categories: ReviewCategoryScore[]
  summary: string
  version: string
}

export interface EngineeringScore {
  overall: number
  architecture: number
  documentation: number
  knowledge: number
  qa: number
  maintainability: number
  security: number
  performance: number
}

export interface ReviewCategoryScore {
  category: ReviewCategory
  score: number
  weight: number
}

export interface ReviewFinding {
  id: string
  title: string
  description: string
  severity: ReviewSeverity
  confidence: number
  impact: string
  category: ReviewCategory
  relatedEntities: string[]
  ruleId: string
  recommendation: string
  status: FindingStatus
  evidence: ReviewEvidence[]
}

export interface ReviewRecommendation {
  id: string
  findingId: string
  title: string
  description: string
  estimatedImpact: string
  affectedModules: string[]
  priority: RecommendationPriority
  effort: RecommendationEffort
  category: ReviewCategory
  effortDescription: string
}

export interface ReviewEvidence {
  entityId: string
  entityType: string
  entityName: string
  detail: string
}

export interface ImprovementOpportunity {
  finding: ReviewFinding
  recommendation: ReviewRecommendation
  impactScore: number
  effortScore: number
  category: ImprovementCategory
}

export interface ReviewSnapshot {
  id: string
  reviewId: string
  timestamp: string
  score: EngineeringScore
  findingsCount: number
  summary: string
}
