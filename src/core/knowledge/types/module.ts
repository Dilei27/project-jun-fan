export interface KnowledgeModule {
  id: string
  name: string
  description: string
  route: string
  icon: string
  health: 'healthy' | 'degraded' | 'critical' | 'unknown'
  color: string
  nodeIds: string[]
}
