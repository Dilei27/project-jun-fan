export type NodeType =
  | 'product'
  | 'project'
  | 'decision'
  | 'document'
  | 'module'
  | 'test'
  | 'skill'
  | 'technology'
  | 'agent'
  | 'metric'
  | 'event'
  | 'mission'
  | 'lab'
  | 'architecture'

export type NodeStatus = 'online' | 'beta' | 'dev' | 'concluido' | 'em_andamento'

export type NodePriority = 'critical' | 'high' | 'medium' | 'low'

export type NodeRisk = 'high' | 'medium' | 'low'

export type NodeHealth = 'healthy' | 'degraded' | 'critical' | 'unknown'

export type NodeMaturity = 'concept' | 'prototype' | 'beta' | 'stable' | 'mature'

export type RelationshipType =
  | 'references'
  | 'contains'
  | 'originates'
  | 'impacts'
  | 'generates'
  | 'relates'
  | 'uses'
  | 'context'

export interface NodeMetadata {
  [key: string]: unknown
}

export interface Timestamps {
  createdAt: string
  updatedAt: string
}
