import type { ReviewSnapshot, EngineeringScore } from './types'
import { MOCK_ENGINEERING_SCORE } from './scoring'

/* ─── In-memory history store (replaced by persistence in future) ─── */

class ReviewHistoryStore {
  private snapshots: ReviewSnapshot[] = []

  push(reviewId: string, score: EngineeringScore, findingsCount: number, summary: string): ReviewSnapshot {
    const snapshot: ReviewSnapshot = {
      id: `snapshot-${Date.now()}`,
      reviewId,
      timestamp: new Date().toISOString(),
      score: { ...score },
      findingsCount,
      summary,
    }
    this.snapshots.push(snapshot)
    return snapshot
  }

  getAll(): ReviewSnapshot[] {
    return [...this.snapshots]
  }

  getLatest(): ReviewSnapshot | undefined {
    return this.snapshots.length > 0
      ? this.snapshots[this.snapshots.length - 1]
      : undefined
  }

  getByReviewId(reviewId: string): ReviewSnapshot[] {
    return this.snapshots.filter(s => s.reviewId === reviewId)
  }

  clear(): void {
    this.snapshots = []
  }
}

export const reviewHistoryStore = new ReviewHistoryStore()

/* ─── Mock snapshots ─── */

export const MOCK_SNAPSHOTS: ReviewSnapshot[] = [
  {
    id: 'snapshot-v1',
    reviewId: 'review-v1',
    timestamp: '2026-05-15T10:00:00Z',
    score: {
      overall: 58, architecture: 65, documentation: 42, knowledge: 73,
      qa: 38, maintainability: 55, security: 70, performance: 80,
    },
    findingsCount: 18,
    summary: 'Primeira revisão estrutural — 18 problemas encontrados.',
  },
  {
    id: 'snapshot-v2',
    reviewId: 'review-v2',
    timestamp: '2026-06-01T10:00:00Z',
    score: {
      overall: 61, architecture: 68, documentation: 48, knowledge: 76,
      qa: 42, maintainability: 58, security: 74, performance: 82,
    },
    findingsCount: 15,
    summary: 'Segunda revisão — melhoria em documentação e qualidade.',
  },
  {
    id: 'snapshot-v3',
    reviewId: 'review-v3',
    timestamp: '2026-06-15T10:00:00Z',
    score: MOCK_ENGINEERING_SCORE,
    findingsCount: 12,
    summary: 'Terceira revisão — score atual 64/100.',
  },
]
