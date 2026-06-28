export interface TimelineEvent {
  year: string
  milestone: string
  description: string
  relatedProjects?: string[]
  relatedProducts?: string[]
  relatedDecisions?: string[]
}
