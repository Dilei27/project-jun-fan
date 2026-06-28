export interface DocSection {
  heading: string
  content: string
}

export interface Doc {
  id: string
  title: string
  description: string
  sections: DocSection[]
  relatedProducts?: string[]
  relatedProjects?: string[]
  relatedDecisions?: string[]
}
