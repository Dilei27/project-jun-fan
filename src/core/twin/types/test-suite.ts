export type TestSuiteType = 'unit' | 'integration' | 'e2e' | 'visual' | 'performance'

export interface EngineeringTestSuite {
  id: string
  name: string
  type: TestSuiteType
  componentId: string
  totalTests: number
  passed: number
  failed: number
  coverage: number
  lastRun: string
  duration: number
}
