import type { TwinHealthScore } from './common'

export interface EngineeringModule {
  id: string
  name: string
  description: string
  route: string
  color: string
  icon: string
  componentIds: string[]
  health: TwinHealthScore
  risk: 'low' | 'medium' | 'high'
  coverage: number
}
