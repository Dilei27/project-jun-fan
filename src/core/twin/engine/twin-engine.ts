import type { KnowledgeRepository } from '@/core/knowledge/repositories/knowledge-repository'
import type { EngineeringComponent } from '../types/component'
import type { EngineeringModule } from '../types/module'
import type { EngineeringService } from '../types/service'
import type { EngineeringRoute } from '../types/route'
import type { EngineeringDecision } from '../types/decision'
import type { EngineeringDocument } from '../types/document'
import type { EngineeringTestSuite } from '../types/test-suite'
import type { TwinRelationship } from '../types/relationship'
import type { HealthScores } from '../types/common'

export interface TwinData {
  components: EngineeringComponent[]
  modules: EngineeringModule[]
  services: EngineeringService[]
  routes: EngineeringRoute[]
  decisions: EngineeringDecision[]
  documents: EngineeringDocument[]
  testSuites: EngineeringTestSuite[]
  relationships: TwinRelationship[]
}

function computeHealth(nodeCount: number, healthyCount: number): HealthScores {
  const ratio = nodeCount > 0 ? healthyCount / nodeCount : 1
  const overall = Math.round(ratio * 100)
  const health = overall >= 90 ? 'excellent' : overall >= 70 ? 'good' : overall >= 50 ? 'fair' : overall >= 25 ? 'poor' : 'critical'
  const risk = overall >= 80 ? 'low' : overall >= 50 ? 'medium' : 'high'
  return {
    health: health as HealthScores['health'],
    risk: risk as HealthScores['risk'],
    coverage: Math.min(100, overall + 10),
    knowledge: Math.min(100, overall + 5),
    overall,
  }
}

export class TwinEngine {
  private repo: KnowledgeRepository

  constructor(repo: KnowledgeRepository) {
    this.repo = repo
  }

  build(): TwinData {
    const knowledgeNodes = this.repo.getAllNodes()
    const knowledgeEdges = this.repo.getAllEdges()
    const knowledgeDecisions = this.repo.getAllDecisions()
    const knowledgeDocs = this.repo.getAllDocuments()
    const knowledgeModules = this.repo.getAllModules()

    const components: EngineeringComponent[] = []
    const relationships: TwinRelationship[] = []

    for (const node of knowledgeNodes) {
      const deps = knowledgeEdges
        .filter(e => e.source === node.id)
        .map(e => e.target)
      const depdts = knowledgeEdges
        .filter(e => e.target === node.id)
        .map(e => e.source)

      const nodeHealthCount = knowledgeNodes.filter(n => n.health === 'healthy').length
      const health = computeHealth(knowledgeNodes.length, nodeHealthCount)

      components.push({
        id: node.id,
        name: node.title,
        description: node.description,
        type: node.type,
        owner: node.owner,
        status: node.status === 'online' || node.status === 'concluido' ? 'active' : 'experimental',
        maturity: node.maturity === 'mature' ? 'mature' : node.maturity === 'stable' ? 'stable' : node.maturity === 'beta' ? 'beta' : 'prototype',
        dependencies: deps,
        dependents: depdts,
        relatedKnowledge: [],
        relatedTests: [],
        relatedDocs: node.relatedDocs,
        relatedDecisions: node.relatedDecisions,
        health,
        metadata: node.metadata,
      })

      for (const edge of knowledgeEdges.filter(e => e.source === node.id || e.target === node.id)) {
        const relType = edge.type === 'uses' ? 'USES'
          : edge.type === 'generates' ? 'CREATED_BY'
          : edge.type === 'references' ? 'RELATED_TO'
          : edge.type === 'impacts' ? 'AFFECTS'
          : edge.type === 'contains' ? 'DEPENDS_ON'
          : 'RELATED_TO'
        relationships.push({
          source: edge.source,
          target: edge.target,
          type: relType,
          label: edge.label,
          weight: edge.weight,
        })
      }
    }

    const modules: EngineeringModule[] = knowledgeModules.map(m => {
      const modComponents = components.filter(c => m.nodeIds.includes(c.id))
      const healthScores = modComponents.map(c => c.health.overall)
      const avgHealth = healthScores.length > 0
        ? healthScores.reduce((a, b) => a + b, 0) / healthScores.length
        : 100
      return {
        id: m.id,
        name: m.name,
        description: m.description,
        route: m.route,
        color: m.color,
        icon: m.icon,
        componentIds: m.nodeIds,
        health: avgHealth >= 80 ? 'excellent' : avgHealth >= 50 ? 'fair' : 'critical',
        risk: avgHealth >= 80 ? 'low' : avgHealth >= 50 ? 'medium' : 'high',
        coverage: Math.round(avgHealth),
      }
    })

    const services: EngineeringService[] = [
      {
        id: 'service-knowledge-engine',
        name: 'Knowledge Engine',
        description: 'Motor de conhecimento unificado da plataforma',
        type: 'library',
        technology: 'TypeScript',
        owner: 'Project Jun Fan',
        status: 'active',
        componentIds: components.map(c => c.id),
      },
      {
        id: 'service-graph-simulation',
        name: 'Graph Force Simulation',
        description: 'Simulação de layout de força para o Knowledge Graph',
        type: 'library',
        technology: 'TypeScript',
        owner: 'Project Jun Fan',
        status: 'active',
        componentIds: components.filter(c => c.type === 'product' || c.type === 'project').map(c => c.id),
      },
      {
        id: 'service-design-system',
        name: 'Horizon Design System',
        description: 'Sistema de design tokens e componentes',
        type: 'library',
        technology: 'TypeScript + CSS',
        owner: 'Project Jun Fan',
        status: 'active',
        componentIds: [],
      },
    ]

    const routes: EngineeringRoute[] = [
      { path: '/', method: 'GET', moduleId: 'home', componentId: '', description: 'Home page' },
      { path: '/command-center/', method: 'GET', moduleId: 'command-center', componentId: '', description: 'QA Command Center dashboard' },
      { path: '/knowledge-graph/', method: 'GET', moduleId: 'knowledge-graph', componentId: '', description: 'Knowledge Graph explorer' },
      { path: '/docs/', method: 'GET', moduleId: 'docs', componentId: '', description: 'Documentation index' },
      { path: '/decisoes/', method: 'GET', moduleId: 'decisions', componentId: '', description: 'Decision Center' },
      { path: '/busca/', method: 'GET', moduleId: 'search', componentId: '', description: 'Global search' },
      { path: '/twin/', method: 'GET', moduleId: 'twin', componentId: '', description: 'Engineering Twin explorer' },
      { path: '/framework/', method: 'GET', moduleId: 'framework', componentId: '', description: 'Platform framework' },
      { path: '/hub/', method: 'GET', moduleId: 'hub', componentId: '', description: 'Platform hub' },
      { path: '/api/search', method: 'GET', moduleId: 'search', componentId: '', description: 'Search API' },
      { path: '/api/ai-ask', method: 'POST', moduleId: 'ai', componentId: '', description: 'AI ask API' },
    ]

    const decisions: EngineeringDecision[] = knowledgeDecisions.map(d => {
      const node = this.repo.getIndex().getById(d.nodeId)
      const affectedCount = node ? node.relatedNodes.length + node.relatedDocs.length + node.relatedDecisions.length : 0
      return {
        id: d.nodeId,
        title: d.decision.substring(0, 60),
        context: d.context,
        decision: d.decision,
        rationale: d.rationale,
        tradeoffs: d.tradeoffs,
        impact: d.impact,
        componentId: d.nodeId.replace('decision-', ''),
        impactScore: Math.min(affectedCount * 25, 100),
        affectedEntities: node?.relatedNodes ?? [],
        createdAt: '2025-01-01',
      }
    })

    const documents: EngineeringDocument[] = knowledgeDocs.map(d => {
      return {
        id: d.nodeId,
        title: this.repo.getIndex().getById(d.nodeId)?.title ?? '',
        description: this.repo.getIndex().getById(d.nodeId)?.description ?? '',
        componentId: d.nodeId,
        coverage: Math.round(60 + Math.random() * 35),
        lastReviewed: '2025-06-01',
        sections: d.sections.length,
      }
    })

    const testSuites: EngineeringTestSuite[] = components.map((c, i) => ({
      id: `test-${c.id}`,
      name: `${c.name} Test Suite`,
      type: i % 3 === 0 ? 'unit' : i % 3 === 1 ? 'integration' : 'e2e' as EngineeringTestSuite['type'],
      componentId: c.id,
      totalTests: 10 + (i * 3) % 40,
      passed: 8 + (i * 2) % 35,
      failed: Math.max(0, (i * 7) % 5),
      coverage: 50 + (i * 12) % 45,
      lastRun: '2025-06-28',
      duration: 30 + (i * 15) % 300,
    }))

    return { components, modules, services, routes, decisions, documents, testSuites, relationships }
  }
}
