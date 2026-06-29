import type { ImpactResult } from '../types/common'
import type { TwinData } from './twin-engine'

export class ImpactEngine {
  private twin: TwinData

  constructor(twin: TwinData) {
    this.twin = twin
  }

  analyze(componentId: string): ImpactResult {
    const component = this.twin.components.find(c => c.id === componentId)
    if (!component) {
      return {
        componentId,
        componentName: 'Unknown',
        affectedModules: [],
        affectedTests: [],
        affectedDocs: [],
        affectedDecisions: [],
        affectedComponents: [],
      }
    }

    const affectedComponents = component.dependents.map(depId => {
      const c = this.twin.components.find(cc => cc.id === depId)
      const severity = component.health.overall < 50 ? 'high' as const : component.health.overall < 75 ? 'medium' as const : 'low' as const
      return { id: depId, name: c?.name ?? depId, severity }
    })

    const affectedTests = this.twin.testSuites
      .filter(t => t.componentId === componentId || component.dependencies.includes(t.componentId) || component.dependents.includes(t.componentId))
      .map(t => ({
        id: t.id,
        name: t.name,
        severity: t.failed > 0 ? 'high' as const : 'medium' as const,
      }))

    const affectedDocs = this.twin.documents
      .filter(d => d.componentId === componentId)
      .map(d => ({
        id: d.id,
        name: d.title,
        severity: 'high' as const,
      }))

    const affectedDecisions = this.twin.decisions
      .filter(d => d.componentId === componentId || component.relatedDecisions.includes(d.id))
      .map(d => ({
        id: d.id,
        name: d.title,
        severity: 'medium' as const,
      }))

    const directDeps = component.dependencies.map(depId => {
      const c = this.twin.components.find(cc => cc.id === depId)
      return { id: depId, name: c?.name ?? depId, severity: 'medium' as const }
    })

    const affectedModules = this.twin.modules
      .filter(m => m.componentIds.includes(componentId))
      .map(m => ({
        id: m.id,
        name: m.name,
        severity: m.health === 'critical' ? 'high' as const : 'medium' as const,
      }))

    return {
      componentId,
      componentName: component.name,
      affectedModules,
      affectedTests,
      affectedDocs,
      affectedDecisions,
      affectedComponents: [...affectedComponents, ...directDeps],
    }
  }
}
