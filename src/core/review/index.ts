/* ─── Review domain barrel ─── */

export {
  type ReviewSeverity,
  type ReviewCategory,
  type FindingStatus,
  type RecommendationPriority,
  type RecommendationEffort,
  type ImprovementCategory,
  type EngineeringReview,
  type EngineeringScore,
  type ReviewCategoryScore,
  type ReviewFinding,
  type ReviewRecommendation,
  type ReviewEvidence,
  type ImprovementOpportunity,
  type ReviewSnapshot,
  REVIEW_CATEGORY_LABELS,
  REVIEW_CATEGORY_COLORS,
  SEVERITY_LABELS,
  SEVERITY_COLORS,
  getDefaultWeight,
} from './types'

export {
  type ReviewRule,
  type RuleContext,
  ruleRegistry,
  registerDefaultRules,
  duplicatedComponentsRule,
  duplicatedKeywordsRule,
  unusedFilesRule,
  missingDocumentationRule,
  circularDependenciesRule,
  largeModulesRule,
  lowCoverageRule,
  brokenRelationshipsRule,
  architectureSmellsRule,
  deadKnowledgeRule,
} from './rules'

export {
  RecommendationEngine,
  defaultRecommendationEngine,
} from './recommendation-engine'

export {
  type ScoreInput,
  calculateScores,
  buildCategoryScores,
  computeCategoryScore,
  MOCK_ENGINEERING_SCORE,
} from './scoring'

export {
  type ReviewEventCallback,
  type ReviewPipelineInput,
  ReviewPipeline,
  defaultReviewPipeline,
} from './pipeline'

export {
  reviewHistoryStore,
  MOCK_SNAPSHOTS,
} from './history'
