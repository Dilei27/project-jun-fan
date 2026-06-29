import type { TwinData } from './twin-engine'

export interface PlatformHealthReport {
  overall: number
  byModule: { id: string; name: string; health: number; risk: string; coverage: number }[]
  byType: { type: string; count: number; healthy: number; healthPercent: number }[]
  riskDistribution: { level: string; count: number }[]
  worstComponents: { id: string; name: string; health: number }[]
}

export class HealthEngine {
  private twin: TwinData

  constructor(twin: TwinData) {
    this.twin = twin
  }

  report(): PlatformHealthReport {
    const components = this.twin.components
    const modules = this.twin.modules

    const byModule = modules.map(m => {
      const modComponents = components.filter(c => m.componentIds.includes(c.id))
      const avgHealth = modComponents.length > 0
        ? Math.round(modComponents.reduce((sum, c) => sum + c.health.overall, 0) / modComponents.length)
        : 100
      const avgRisk = modComponents.length > 0
        ? modComponents.filter(c => c.health.risk === 'high' || c.health.risk === 'critical').length / modComponents.length
        : 0
      return {
        id: m.id,
        name: m.name,
        health: avgHealth,
        risk: avgRisk > 0.3 ? 'high' : avgRisk > 0.1 ? 'medium' : 'low',
        coverage: Math.round(modComponents.reduce((sum, c) => sum + c.health.coverage, 0) / Math.max(1, modComponents.length)),
      }
    })

    const byTypeMap = new Map<string, { count: number; healthy: number }>()
    for (const c of components) {
      const entry = byTypeMap.get(c.type) ?? { count: 0, healthy: 0 }
      entry.count++
      if (c.health.overall >= 70) entry.healthy++
      byTypeMap.set(c.type, entry)
    }
    const byType = Array.from(byTypeMap.entries()).map(([type, data]) => ({
      type,
      count: data.count,
      healthy: data.healthy,
      healthPercent: Math.round((data.healthy / data.count) * 100),
    }))

    const riskDistribution = [
      { level: 'low', count: components.filter(c => c.health.risk === 'low').length },
      { level: 'medium', count: components.filter(c => c.health.risk === 'medium').length },
      { level: 'high', count: components.filter(c => c.health.risk === 'high').length },
      { level: 'critical', count: components.filter(c => c.health.risk === 'critical').length },
    ]

    const worstComponents = components
      .sort((a, b) => a.health.overall - b.health.overall)
      .slice(0, 5)
      .map(c => ({ id: c.id, name: c.name, health: c.health.overall }))

    const overall = components.length > 0
      ? Math.round(components.reduce((sum, c) => sum + c.health.overall, 0) / components.length)
      : 100

    return { overall, byModule, byType, riskDistribution, worstComponents }
  }
}
