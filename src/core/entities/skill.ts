export interface Skill {
  name: string
  category: string
  level: 'avancado' | 'intermediario' | 'iniciante'
  relatedProjects?: string[]
  relatedProducts?: string[]
}
