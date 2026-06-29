export type TwinEntityStatus = 'active' | 'deprecated' | 'experimental' | 'planned'

export type TwinHealthScore = 'critical' | 'poor' | 'fair' | 'good' | 'excellent'

export type TwinRiskScore = 'low' | 'medium' | 'high' | 'critical'

export type TwinMaturityLevel = 'concept' | 'prototype' | 'beta' | 'stable' | 'mature'

export interface HealthScores {
  health: TwinHealthScore
  risk: TwinRiskScore
  coverage: number
  knowledge: number
  overall: number
}

export interface ImpactResult {
  componentId: string
  componentName: string
  affectedModules: { id: string; name: string; severity: 'high' | 'medium' | 'low' }[]
  affectedTests: { id: string; name: string; severity: 'high' | 'medium' | 'low' }[]
  affectedDocs: { id: string; name: string; severity: 'high' | 'medium' | 'low' }[]
  affectedDecisions: { id: string; name: string; severity: 'high' | 'medium' | 'low' }[]
  affectedComponents: { id: string; name: string; severity: 'high' | 'medium' | 'low' }[]
}
