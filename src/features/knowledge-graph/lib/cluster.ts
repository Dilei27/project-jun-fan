export interface ClusterDef {
  id: string
  label: string
  types: string[]
  color: string
  bgColor: string
}

export const CLUSTERS: ClusterDef[] = [
  {
    id: 'core',
    label: 'Core',
    types: ['mission', 'architecture'],
    color: '#4F8CFF',
    bgColor: 'rgba(79, 140, 255, 0.04)',
  },
  {
    id: 'products',
    label: 'Products',
    types: ['product', 'technology'],
    color: '#22C55E',
    bgColor: 'rgba(34, 197, 94, 0.04)',
  },
  {
    id: 'projects',
    label: 'Projects',
    types: ['project', 'agent', 'lab'],
    color: '#C084FC',
    bgColor: 'rgba(192, 132, 252, 0.04)',
  },
  {
    id: 'knowledge',
    label: 'Knowledge',
    types: ['doc', 'timeline'],
    color: '#EAB308',
    bgColor: 'rgba(234, 179, 8, 0.04)',
  },
  {
    id: 'decisions',
    label: 'Decisions',
    types: ['decision'],
    color: '#FB923C',
    bgColor: 'rgba(251, 146, 60, 0.04)',
  },
  {
    id: 'skills',
    label: 'Skills',
    types: ['skill', 'metric'],
    color: '#22D3EE',
    bgColor: 'rgba(34, 211, 238, 0.04)',
  },
]

export function getClusterForType(type: string): ClusterDef {
  return CLUSTERS.find(c => c.types.includes(type)) ?? CLUSTERS[0]
}

export function getClusterBounds(
  nodes: Array<{ id: string; type: string; x: number; y: number }>,
): Map<string, { cx: number; cy: number; rx: number; ry: number; nodeIds: string[] }> {
  const clusterMap = new Map<string, { cx: number; cy: number; rx: number; ry: number; nodeIds: string[] }>()

  for (const cluster of CLUSTERS) {
    const members = nodes.filter(n => cluster.types.includes(n.type))
    if (members.length < 2) continue

    const xs = members.map(n => n.x)
    const ys = members.map(n => n.y)
    const cx = (Math.min(...xs) + Math.max(...xs)) / 2
    const cy = (Math.min(...ys) + Math.max(...ys)) / 2
    const rx = (Math.max(...xs) - Math.min(...xs)) / 2 + 80
    const ry = (Math.max(...ys) - Math.min(...ys)) / 2 + 60

    clusterMap.set(cluster.id, {
      cx, cy,
      rx: Math.max(rx, 100),
      ry: Math.max(ry, 80),
      nodeIds: members.map(n => n.id),
    })
  }

  return clusterMap
}

export function getClusterLabel(clusterId: string): string {
  return CLUSTERS.find(c => c.id === clusterId)?.label ?? clusterId
}

export function getClusterColor(clusterId: string): string {
  return CLUSTERS.find(c => c.id === clusterId)?.color ?? '#687385'
}
