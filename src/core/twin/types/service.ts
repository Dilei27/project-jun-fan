import type { TwinEntityStatus } from './common'

export interface EngineeringService {
  id: string
  name: string
  description: string
  type: 'api' | 'worker' | 'ui' | 'library' | 'tool'
  technology: string
  owner: string
  status: TwinEntityStatus
  componentIds: string[]
}
