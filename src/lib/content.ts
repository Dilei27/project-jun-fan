import type { Product, Project, TimelineEntry, Decision, Doc, SkillCategory } from '@/types';
import { MockAdapter } from '@/core/knowledge/adapters/mock-adapter';
import { KnowledgeRepository } from '@/core/knowledge/repositories/knowledge-repository';

const _repo = new KnowledgeRepository(new MockAdapter());

function repo() {
  _repo.initialize();
  return _repo;
}

export function getProducts(): Product[] {
  return repo()
    .getAllNodes()
    .filter(n => n.type === 'product')
    .map(n => {
      const m = n.metadata;
      return {
        id: n.id.replace('product-', ''),
        name: n.title,
        status: n.status as Product['status'],
        shortDescription: n.description,
        problem: (m.problem as string) ?? '',
        solution: (m.solution as string) ?? '',
        accentColor: (m.accentColor as string) ?? '#4F8CFF',
        stack: (m.stack as string[]) ?? [],
        architectureFlow: (m.architectureFlow as string) ?? '',
        metrics: (m.metrics as Record<string, number>) ?? {},
        roadmap: (m.roadmap as string[]) ?? [],
        links: (m.links as { docs: string; repo: string }) ?? { docs: '#', repo: '#' },
      } as Product;
    });
}

export function getProduct(id: string): Product | undefined {
  return getProducts().find(p => p.id === id);
}

export function getProjects(): Project[] {
  return repo()
    .getAllNodes()
    .filter(n => n.type === 'project')
    .map(n => {
      const m = n.metadata;
      return {
        id: n.id.replace('project-', ''),
        title: n.title,
        context: n.description,
        problem: (m.problem as string) ?? '',
        solution: (m.solution as string) ?? '',
        stack: (m.stack as string[]) ?? [],
        impact: (m.impact as string) ?? '',
        status: n.status as Project['status'],
        decisions: n.relatedDecisions.map(d => d.replace('decision-', '')),
        links: (m.links as { docs: string; repo: string }) ?? { docs: '#', repo: '#' },
      } as Project;
    });
}

export function getProject(id: string): Project | undefined {
  return getProjects().find(p => p.id === id);
}

export function getTimeline(): TimelineEntry[] {
  return repo()
    .getAllNodes()
    .filter(n => n.type === 'event')
    .map(n => ({
      year: (n.metadata.year as string) ?? '',
      milestone: (n.metadata.milestone as string) ?? n.title.replace(/^\d{4} — /, ''),
      description: n.description,
    }));
}

export function getDecisions(): Decision[] {
  return repo()
    .getAllDecisions()
    .map(d => ({
      id: d.nodeId.replace('decision-', ''),
      context: d.context,
      decision: d.decision,
      rationale: d.rationale,
      tradeoffs: d.tradeoffs,
      impact: d.impact,
    }));
}

export function getDecision(id: string): Decision | undefined {
  return getDecisions().find(d => d.id === id);
}

export function getDocs(): Doc[] {
  return repo()
    .getAllDocuments()
    .map(d => {
      const node = repo().getIndex().getById(d.nodeId);
      return {
        id: d.nodeId.replace('document-', ''),
        title: node?.title ?? '',
        description: node?.description ?? '',
        sections: d.sections,
      };
    });
}

export function getDoc(id: string): Doc | undefined {
  return getDocs().find(d => d.id === id);
}

export function getSkills(): SkillCategory[] {
  const skills = repo()
    .getAllNodes()
    .filter(n => n.type === 'skill');

  const categories = new Map<string, { area: string; skills: string[]; nivel: SkillCategory['nivel'] }>();
  for (const skill of skills) {
    const cat = skill.category;
    if (!categories.has(cat)) {
      categories.set(cat, {
        area: cat,
        skills: [],
        nivel: (skill.metadata.level as SkillCategory['nivel']) ?? 'iniciante',
      });
    }
    categories.get(cat)!.skills.push(skill.title);
  }
  return Array.from(categories.values());
}
