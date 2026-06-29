import type { IKnowledgeAdapter, KnowledgeAdapterData } from './types'
import type { KnowledgeNode, NodeType, NodeHealth } from '../types'
import type { KnowledgeEdge } from '../types/edge'
import type { KnowledgeDocument } from '../types/document'
import type { KnowledgeDecision } from '../types/decision'
import type { KnowledgeModule } from '../types/module'
import type { KnowledgeMetric } from '../types/metric'
import { createNodeId } from '../models'

import productsData from '@/content/products.json'
import projectsData from '@/content/projects.json'
import decisionsData from '@/content/decisions.json'
import docsData from '@/content/docs.json'
import timelineData from '@/content/timeline.json'
import skillsData from '@/content/skills.json'
import metricsData from '@/content/metrics.json'

type JsonRecord = Record<string, unknown>

export class MockAdapter implements IKnowledgeAdapter {
  load(): KnowledgeAdapterData {
    const nodes: KnowledgeNode[] = []
    const edges: KnowledgeEdge[] = []
    const documents: KnowledgeDocument[] = []
    const decisions: KnowledgeDecision[] = []
    const metrics: KnowledgeMetric[] = []

    const productNodes = this.loadProducts(nodes, edges, documents)
    this.loadProjects(nodes, edges)
    const decisionNodes = this.loadDecisions(nodes, decisions)
    this.loadDocuments(docsData as JsonRecord[], nodes, documents, decisionNodes)
    this.loadTimeline(nodes)
    this.loadSkills(nodes, edges)
    this.loadMetricNodes(nodes, metrics)

    const modules = this.buildModules(nodes)

    return { nodes, edges, documents, decisions, modules, metrics }
  }

  private loadProducts(
    nodes: KnowledgeNode[],
    edges: KnowledgeEdge[],
    documents: KnowledgeDocument[],
  ): string[] {
    const productIds: string[] = []
    for (const p of productsData as JsonRecord[]) {
      const id = p.id as string
      const nodeId = createNodeId('product', id)
      productIds.push(nodeId)

      const stack = (p.stack as string[]) || []
      const relatedSkills = stack.map(s => createNodeId('skill', s))

      nodes.push({
        id: nodeId,
        title: p.name as string,
        description: p.shortDescription as string,
        type: 'product',
        category: 'product',
        owner: 'Project Jun Fan',
        status: (p.status as string) as KnowledgeNode['status'],
        priority: 'high',
        risk: 'low',
        health: p.status === 'online' ? 'healthy' : 'degraded',
        maturity: p.status === 'online' ? 'stable' : 'beta',
        createdAt: '2025-01-01T00:00:00.000Z',
        updatedAt: '2025-06-01T00:00:00.000Z',
        tags: ['product', ...stack],
        relatedNodes: [...relatedSkills],
        relatedComponents: [],
        relatedDocs: [],
        relatedDecisions: [],
        relatedTests: [],
        metadata: {
          accentColor: p.accentColor as string,
          stack,
          architectureFlow: p.architectureFlow as string,
          roadmap: p.roadmap as string[],
          links: p.links as Record<string, string>,
          problem: p.problem as string,
          solution: p.solution as string,
        },
      })

      for (const skill of stack) {
        const skillId = createNodeId('skill', skill)
        edges.push({ source: nodeId, target: skillId, type: 'uses', label: 'usa', weight: 1 })
      }
    }
    return productIds
  }

  private loadProjects(nodes: KnowledgeNode[], edges: KnowledgeEdge[]): void {
    for (const proj of projectsData as JsonRecord[]) {
      const id = proj.id as string
      const nodeId = createNodeId('project', id)
      const stack = (proj.stack as string[]) || []
      const decisionIds = (proj.decisions as string[]) || []
      const relatedSkills = stack.map(s => createNodeId('skill', s))
      const relatedDecisions = decisionIds.map(d => createNodeId('decision', d))

      nodes.push({
        id: nodeId,
        title: proj.title as string,
        description: proj.context as string,
        type: 'project',
        category: 'project',
        owner: 'Project Jun Fan',
        status: (proj.status as string) as KnowledgeNode['status'],
        priority: 'high',
        risk: 'medium',
        health: proj.status === 'concluido' ? 'healthy' : 'degraded',
        maturity: proj.status === 'concluido' ? 'stable' : 'prototype',
        createdAt: '2025-01-01T00:00:00.000Z',
        updatedAt: '2025-06-01T00:00:00.000Z',
        tags: ['project', ...stack],
        relatedNodes: [...relatedSkills, ...relatedDecisions],
        relatedComponents: [],
        relatedDocs: [],
        relatedDecisions,
        relatedTests: [],
        metadata: {
          stack,
          impact: proj.impact as string,
          links: proj.links as Record<string, string>,
          problem: proj.problem as string,
          solution: proj.solution as string,
        },
      })

      for (const skill of stack) {
        const skillId = createNodeId('skill', skill)
        edges.push({ source: nodeId, target: skillId, type: 'uses', label: 'usa', weight: 1 })
      }
      for (const decId of decisionIds) {
        const decisionNodeId = createNodeId('decision', decId)
        edges.push({ source: nodeId, target: decisionNodeId, type: 'generates', label: 'gerou', weight: 1 })
      }
    }
  }

  private loadDecisions(
    nodes: KnowledgeNode[],
    decisions: KnowledgeDecision[],
  ): string[] {
    const decisionIds: string[] = []
    for (const d of decisionsData as JsonRecord[]) {
      const id = d.id as string
      const nodeId = createNodeId('decision', id)
      decisionIds.push(nodeId)

      nodes.push({
        id: nodeId,
        title: (d.decision as string).substring(0, 60),
        description: d.context as string,
        type: 'decision',
        category: 'decision',
        owner: 'Project Jun Fan',
        status: 'concluido',
        priority: 'medium',
        risk: 'low',
        health: 'healthy',
        maturity: 'stable',
        createdAt: '2025-01-01T00:00:00.000Z',
        updatedAt: '2025-06-01T00:00:00.000Z',
        tags: ['decision'],
        relatedNodes: [],
        relatedComponents: [],
        relatedDocs: [],
        relatedDecisions: [],
        relatedTests: [],
        metadata: {
          fullTitle: d.decision as string,
          rationale: d.rationale as string,
          tradeoffs: d.tradeoffs as string,
          impact: d.impact as string,
        },
      })

      decisions.push({
        nodeId,
        context: d.context as string,
        decision: d.decision as string,
        rationale: d.rationale as string,
        tradeoffs: d.tradeoffs as string,
        impact: d.impact as string,
      })
    }
    return decisionIds
  }

  private loadDocuments(
    docsArray: JsonRecord[],
    nodes: KnowledgeNode[],
    documents: KnowledgeDocument[],
    decisionNodes: string[],
  ): void {
    for (const doc of docsArray) {
      const id = doc.id as string
      const nodeId = createNodeId('document', id)

      nodes.push({
        id: nodeId,
        title: doc.title as string,
        description: doc.description as string,
        type: 'document',
        category: 'documentation',
        owner: 'Project Jun Fan',
        status: 'online',
        priority: 'medium',
        risk: 'low',
        health: 'healthy',
        maturity: 'stable',
        createdAt: '2025-01-01T00:00:00.000Z',
        updatedAt: '2025-06-01T00:00:00.000Z',
        tags: ['doc'],
        relatedNodes: [...decisionNodes],
        relatedComponents: [],
        relatedDocs: [],
        relatedDecisions: [],
        relatedTests: [],
        metadata: {},
      })

      documents.push({
        nodeId,
        sections: (doc.sections as Array<{ heading: string; content: string }>) || [],
      })
    }
  }

  private loadTimeline(nodes: KnowledgeNode[]): void {
    for (const t of timelineData as JsonRecord[]) {
      const year = t.year as string
      const nodeId = createNodeId('event', year)

      nodes.push({
        id: nodeId,
        title: `${year} — ${t.milestone as string}`,
        description: t.description as string,
        type: 'event',
        category: 'timeline',
        owner: 'Project Jun Fan',
        status: 'concluido',
        priority: 'low',
        risk: 'low',
        health: 'healthy',
        maturity: 'mature',
        createdAt: `${year}-01-01T00:00:00.000Z`,
        updatedAt: `${year}-12-31T00:00:00.000Z`,
        tags: ['timeline', `year-${year}`],
        relatedNodes: [],
        relatedComponents: [],
        relatedDocs: [],
        relatedDecisions: [],
        relatedTests: [],
        metadata: {
          year,
          milestone: t.milestone as string,
        },
      })
    }
  }

  private loadSkills(nodes: KnowledgeNode[], edges: KnowledgeEdge[]): void {
    const seen = new Set<string>()
    for (const cat of skillsData as JsonRecord[]) {
      const category = cat.area as string
      const level = cat.nivel as string
      const skillNames = cat.skills as string[]
      for (const name of skillNames) {
        if (seen.has(name)) continue
        seen.add(name)
        const nodeId = createNodeId('skill', name)
        nodes.push({
          id: nodeId,
          title: name,
          description: `${name} (${category})`,
          type: 'skill',
          category,
          owner: 'Project Jun Fan',
          status: 'online',
          priority: 'medium',
          risk: 'low',
          health: 'healthy',
          maturity: 'stable',
          createdAt: '2025-01-01T00:00:00.000Z',
          updatedAt: '2025-06-01T00:00:00.000Z',
          tags: ['skill', category, level],
          relatedNodes: [],
          relatedComponents: [],
          relatedDocs: [],
          relatedDecisions: [],
          relatedTests: [],
          metadata: { level, category },
        })
      }
    }
  }

  private loadMetricNodes(nodes: KnowledgeNode[], metrics: KnowledgeMetric[]): void {
    const raw = metricsData as JsonRecord
    const byProduct = raw.metricasPorProduto as Record<string, Record<string, number>>

    for (const [productId, productMetrics] of Object.entries(byProduct)) {
      for (const [name, value] of Object.entries(productMetrics)) {
        const nodeId = createNodeId('metric', `${productId}-${name}`)
        nodes.push({
          id: nodeId,
          title: name,
          description: `${name} for ${productId}`,
          type: 'metric',
          category: 'metric',
          owner: 'Project Jun Fan',
          status: 'online',
          priority: 'medium',
          risk: 'low',
          health: value > 0 ? 'healthy' : 'degraded',
          maturity: 'stable',
          createdAt: '2025-01-01T00:00:00.000Z',
          updatedAt: '2025-06-01T00:00:00.000Z',
          tags: ['metric', productId],
          relatedNodes: [createNodeId('product', productId)],
          relatedComponents: [],
          relatedDocs: [],
          relatedDecisions: [],
          relatedTests: [],
          metadata: { productId, metricName: name },
        })
        metrics.push({ nodeId, name, value, timestamp: '2025-06-01T00:00:00.000Z' })
      }
    }
  }

  private buildModules(nodes: KnowledgeNode[]): KnowledgeModule[] {
    const moduleHealth = (nodeIds: string[]): NodeHealth => {
      const unhealthy = nodeIds.filter(id => {
        const n = nodes.find(no => no.id === id)
        return n && n.health !== 'healthy'
      })
      if (unhealthy.length === 0) return 'healthy'
      if (unhealthy.length <= nodeIds.length * 0.3) return 'degraded'
      return 'critical'
    }

    const filterByType = (type: NodeType) => nodes.filter(n => n.type === type).map(n => n.id)

    return [
      {
        id: 'home',
        name: 'Home',
        description: 'Landing page e visão geral da plataforma',
        route: '/',
        icon: 'Home',
        health: 'healthy',
        color: '#4F8CFF',
        nodeIds: [],
      },
      {
        id: 'knowledge-graph',
        name: 'Knowledge Graph',
        description: 'Grafo de conhecimento unificado',
        route: '/knowledge-graph/',
        icon: 'GitBranch',
        health: moduleHealth(nodes.map(n => n.id)),
        color: '#22C55E',
        nodeIds: nodes.map(n => n.id),
      },
      {
        id: 'command-center',
        name: 'QA Command Center',
        description: 'Dashboard de QA e automação',
        route: '/command-center/',
        icon: 'Command',
        health: moduleHealth([
          ...filterByType('product'),
          ...filterByType('project'),
          ...filterByType('decision'),
        ]),
        color: '#C084FC',
        nodeIds: [
          ...filterByType('product'),
          ...filterByType('project'),
          ...filterByType('decision'),
          ...filterByType('metric'),
        ],
      },
      {
        id: 'docs',
        name: 'Documentação',
        description: 'Documentação viva da plataforma',
        route: '/docs/',
        icon: 'FileText',
        health: moduleHealth(filterByType('document')),
        color: '#EAB308',
        nodeIds: filterByType('document'),
      },
      {
        id: 'engine',
        name: 'Knowledge Engine',
        description: 'Motor de conhecimento da plataforma',
        route: '/',
        icon: 'Brain',
        health: moduleHealth(nodes.map(n => n.id)),
        color: '#22D3EE',
        nodeIds: nodes.map(n => n.id),
      },
      {
        id: 'decisions',
        name: 'Decisões',
        description: 'Registro de decisões técnicas',
        route: '/decisoes/',
        icon: 'Shield',
        health: moduleHealth(filterByType('decision')),
        color: '#FB923C',
        nodeIds: filterByType('decision'),
      },
      {
        id: 'timeline',
        name: 'Timeline',
        description: 'Linha do tempo da plataforma',
        route: '/command-center/timeline/',
        icon: 'BarChart3',
        health: moduleHealth(filterByType('event')),
        color: '#22C55E',
        nodeIds: filterByType('event'),
      },
    ]
  }
}
