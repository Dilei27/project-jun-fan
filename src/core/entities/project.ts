export interface Project {
  id: string
  title: string
  context: string
  problem: string
  solution: string
  stack: string[]
  impact: string
  status: 'concluido' | 'em_andamento'
  decisions: string[]
  relatedProducts?: string[]
  relatedSkills?: string[]
  links: { docs: string; repo: string }
}
