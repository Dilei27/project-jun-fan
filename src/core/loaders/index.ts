import productsData from '@/content/products.json'
import projectsData from '@/content/projects.json'
import decisionsData from '@/content/decisions.json'
import docsData from '@/content/docs.json'
import timelineData from '@/content/timeline.json'
import skillsData from '@/content/skills.json'

type JsonRecord = Record<string, unknown>

export const loaders = {
  products: {
    getAll: (): JsonRecord[] => productsData as JsonRecord[],
    getById: (id: string): JsonRecord | undefined => (productsData as JsonRecord[]).find(p => p.id === id),
  },
  projects: {
    getAll: (): JsonRecord[] => projectsData as JsonRecord[],
    getById: (id: string): JsonRecord | undefined => (projectsData as JsonRecord[]).find(p => p.id === id),
  },
  decisions: {
    getAll: (): JsonRecord[] => decisionsData as JsonRecord[],
    getById: (id: string): JsonRecord | undefined => (decisionsData as JsonRecord[]).find(d => d.id === id),
  },
  docs: {
    getAll: (): JsonRecord[] => docsData as JsonRecord[],
    getById: (id: string): JsonRecord | undefined => (docsData as JsonRecord[]).find(d => d.id === id),
  },
  timeline: {
    getAll: (): JsonRecord[] => timelineData as JsonRecord[],
  },
  skills: {
    getAll: (): JsonRecord[] => skillsData as JsonRecord[],
  },
}
