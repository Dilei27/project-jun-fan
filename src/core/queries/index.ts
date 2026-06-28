import { loaders } from '@/core/loaders'
import { entityColors } from '@/core/types'

export interface GraphNode {
  id: string
  type: string
  label: string
  description: string
  color: string
  size: number
  url: string
  group: string
}

export interface GraphEdge {
  source: string
  target: string
  type: string
  label: string
}

export interface GraphData {
  nodes: GraphNode[]
  edges: GraphEdge[]
}

function buildNodes(): GraphNode[] {
  const nodes: GraphNode[] = []

  for (const p of loaders.products.getAll()) {
    nodes.push({
      id: `product-${p.id}`,
      type: 'product',
      label: p.name as string,
      description: p.shortDescription as string,
      color: (p.accentColor as string) || entityColors.product,
      size: 20,
      url: `/produto/${p.id}/`,
      group: 'product',
    })
    for (const skill of (p.stack as string[]) || []) {
      if (!nodes.find(n => n.id === `skill-${skill}`)) {
        nodes.push({
          id: `skill-${skill}`,
          type: 'skill',
          label: skill,
          description: `Tecnologia usada em ${p.name as string}`,
          color: entityColors.skill,
          size: 10,
          url: '',
          group: 'skill',
        })
      }
    }
  }

  for (const p of loaders.projects.getAll()) {
    nodes.push({
      id: `project-${p.id}`,
      type: 'project',
      label: p.title as string,
      description: p.context as string,
      color: entityColors.project,
      size: 16,
      url: `/projeto/${p.id}/`,
      group: 'project',
    })
    for (const skill of (p.stack as string[]) || []) {
      if (!nodes.find(n => n.id === `skill-${skill}`)) {
        nodes.push({
          id: `skill-${skill}`,
          type: 'skill',
          label: skill,
          description: 'Skill',
          color: entityColors.skill,
          size: 10,
          url: '',
          group: 'skill',
        })
      }
    }
  }

  for (const d of loaders.decisions.getAll()) {
    const label = d.decision as string
    nodes.push({
      id: `decision-${d.id}`,
      type: 'decision',
      label: label.length > 40 ? label.substring(0, 40) + '…' : label,
      description: d.context as string,
      color: entityColors.decision,
      size: 14,
      url: `/decisoes/#${d.id}`,
      group: 'decision',
    })
  }

  for (const doc of loaders.docs.getAll()) {
    nodes.push({
      id: `doc-${doc.id}`,
      type: 'doc',
      label: doc.title as string,
      description: doc.description as string,
      color: entityColors.doc,
      size: 12,
      url: `/docs/${doc.id}/`,
      group: 'doc',
    })
  }

  for (const t of loaders.timeline.getAll()) {
    nodes.push({
      id: `timeline-${t.year}`,
      type: 'timeline',
      label: `${t.year} — ${t.milestone as string}`,
      description: t.description as string,
      color: entityColors.timeline,
      size: 12,
      url: '/command-center/timeline/',
      group: 'timeline',
    })
  }

  return nodes
}

function buildEdges(nodes: GraphNode[]): GraphEdge[] {
  const edges: GraphEdge[] = []

  for (const p of loaders.products.getAll()) {
    const productNode = nodes.find(n => n.id === `product-${p.id}`)
    if (!productNode) continue
    for (const skill of (p.stack as string[]) || []) {
      const skillNode = nodes.find(n => n.id === `skill-${skill}`)
      if (skillNode) {
        edges.push({ source: productNode.id, target: skillNode.id, type: 'uses', label: 'usa' })
      }
    }
  }

  for (const proj of loaders.projects.getAll()) {
    const projectNode = nodes.find(n => n.id === `project-${proj.id}`)
    if (!projectNode) continue
    for (const skill of (proj.stack as string[]) || []) {
      const skillNode = nodes.find(n => n.id === `skill-${skill}`)
      if (skillNode) {
        edges.push({ source: projectNode.id, target: skillNode.id, type: 'uses', label: 'usa' })
      }
    }
    for (const decId of (proj.decisions as string[]) || []) {
      const decisionNode = nodes.find(n => n.id === `decision-${decId}`)
      if (decisionNode) {
        edges.push({ source: projectNode.id, target: decisionNode.id, type: 'generates', label: 'gerou' })
      }
    }
  }

  const deduped = edges.filter(
    (e, i, arr) => i === arr.findIndex(e2 => e2.source === e.source && e2.target === e.target)
  )

  return deduped
}

export function getGraphData(): GraphData {
  const nodes = buildNodes()
  const edges = buildEdges(nodes)
  return { nodes, edges }
}

export function getFullGraph(): GraphData {
  return getGraphData()
}

export function getFilteredGraph(types: string[]): GraphData {
  const all = getGraphData()
  const activeIds = new Set(all.nodes.filter(n => types.includes(n.type)).map(n => n.id))

  const connectedIds = new Set(activeIds)
  for (const edge of all.edges) {
    if (activeIds.has(edge.source) && !activeIds.has(edge.target)) connectedIds.add(edge.target)
    if (activeIds.has(edge.target) && !activeIds.has(edge.source)) connectedIds.add(edge.source)
  }

  return {
    nodes: all.nodes.filter(n => connectedIds.has(n.id)),
    edges: all.edges.filter(e => connectedIds.has(e.source) && connectedIds.has(e.target)),
  }
}

export function getNodeConnections(nodeId: string): GraphEdge[] {
  const all = getGraphData()
  return all.edges.filter(e => e.source === nodeId || e.target === nodeId)
}

export function searchNodes(query: string): GraphNode[] {
  const all = getGraphData()
  const q = query.toLowerCase()
  return all.nodes.filter(
    n => n.label.toLowerCase().includes(q) || n.description.toLowerCase().includes(q)
  )
}
