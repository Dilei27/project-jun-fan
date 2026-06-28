import productsData from '@/content/products.json';
import projectsData from '@/content/projects.json';
import timelineData from '@/content/timeline.json';
import decisionsData from '@/content/decisions.json';
import docsData from '@/content/docs.json';
import type { Product, Project, TimelineEntry, Decision, Doc } from '@/types';

export function getProducts(): Product[] {
  return productsData as unknown as Product[];
}

export function getProduct(id: string): Product | undefined {
  return getProducts().find(p => p.id === id);
}

export function getProjects(): Project[] {
  return projectsData as Project[];
}

export function getProject(id: string): Project | undefined {
  return getProjects().find(p => p.id === id);
}

export function getTimeline(): TimelineEntry[] {
  return timelineData as TimelineEntry[];
}

export function getDecisions(): Decision[] {
  return decisionsData as Decision[];
}

export function getDecision(id: string): Decision | undefined {
  return getDecisions().find(d => d.id === id);
}

export function getDocs(): Doc[] {
  return docsData as Doc[];
}

export function getDoc(id: string): Doc | undefined {
  return getDocs().find(d => d.id === id);
}
