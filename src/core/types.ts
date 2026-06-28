export type EntityType =
  | 'product'
  | 'project'
  | 'decision'
  | 'doc'
  | 'timeline'
  | 'skill'
  | 'technology'
  | 'mission'
  | 'agent'
  | 'metric'
  | 'lab'
  | 'architecture'

export const entityColors: Record<string, string> = {
  product: '#4F8CFF',
  project: '#4F8CFF',
  decision: '#A855F7',
  doc: '#EAB308',
  timeline: '#22C55E',
  skill: '#9AA6B8',
  technology: '#EAB308',
  mission: '#22C55E',
  agent: '#F97316',
  metric: '#F59E0B',
  lab: '#687385',
  architecture: '#4F8CFF',
}

export const entityLabels: Record<string, string> = {
  product: 'Produto',
  project: 'Projeto',
  decision: 'Decisão',
  doc: 'Documentação',
  timeline: 'Marco',
  skill: 'Skill',
  technology: 'Tecnologia',
  mission: 'Missão',
  agent: 'Agente',
  metric: 'Métrica',
  lab: 'Laboratório',
  architecture: 'Arquitetura',
}

export type EntityStatus = 'online' | 'beta' | 'dev' | 'concluido' | 'em_andamento'
export type SkillLevel = 'avancado' | 'intermediario' | 'iniciante'
export type RelationshipType = 'references' | 'contains' | 'originates' | 'impacts' | 'generates' | 'relates' | 'uses' | 'context'
