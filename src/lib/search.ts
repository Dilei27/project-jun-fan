import { getProducts, getProjects, getDocs, getDecisions } from './content';

interface SearchResult {
  type: string;
  title: string;
  url: string;
  snippet: string;
}

export function searchAll(query: string): SearchResult[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  const results: SearchResult[] = [];

  const products = getProducts();
  for (const p of products) {
    if (
      p.name.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q) ||
      p.stack.some(s => s.toLowerCase().includes(q))
    ) {
      results.push({
        type: 'produto',
        title: p.name,
        url: `/produto/${p.id}/`,
        snippet: p.shortDescription,
      });
    }
  }

  const projects = getProjects();
  for (const p of projects) {
    if (
      p.title.toLowerCase().includes(q) ||
      p.context.toLowerCase().includes(q) ||
      p.stack.some(s => s.toLowerCase().includes(q))
    ) {
      results.push({
        type: 'projeto',
        title: p.title,
        url: `/projeto/${p.id}/`,
        snippet: p.context,
      });
    }
  }

  const docs = getDocs();
  for (const d of docs) {
    if (
      d.title.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q) ||
      d.sections.some(s => s.heading.toLowerCase().includes(q) || s.content.toLowerCase().includes(q))
    ) {
      results.push({
        type: 'documentação',
        title: d.title,
        url: `/docs/${d.id}/`,
        snippet: d.description,
      });
    }
  }

  const decisions = getDecisions();
  for (const d of decisions) {
    if (
      d.decision.toLowerCase().includes(q) ||
      d.context.toLowerCase().includes(q) ||
      d.rationale.toLowerCase().includes(q)
    ) {
      results.push({
        type: 'decisão técnica',
        title: d.decision,
        url: `/decisoes/#${d.id}`,
        snippet: d.context,
      });
    }
  }

  return results;
}
