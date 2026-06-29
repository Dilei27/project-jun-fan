export interface EngineeringRoute {
  path: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  moduleId: string
  componentId: string
  description: string
}
