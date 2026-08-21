import { MockAdapter } from '@/core/knowledge/adapters/mock-adapter';
import { KnowledgeRepository } from '@/core/knowledge/repositories/knowledge-repository';

export interface SearchResult {
  id: string;
  type: string;
  title: string;
  url: string;
  snippet: string;
  score: number;
  source: 'repository';
}

let _repo: KnowledgeRepository | null = null;

function getRepo(): KnowledgeRepository {
  if (!_repo) {
    _repo = new KnowledgeRepository(new MockAdapter());
    _repo.initialize();
  }
  return _repo;
}

export function normalizeSearchText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLocaleLowerCase('pt-BR')
    .trim()
    .replace(/\s+/g, ' ');
}

function toSearchableText(value: unknown): string {
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return value.map(toSearchableText).join(' ');
  if (value && typeof value === 'object') return Object.values(value).map(toSearchableText).join(' ');
  return '';
}

function getUrl(node: { id: string; type: string }): string {
  switch (node.type) {
    case 'product': return `/produto/${node.id.replace('product-', '')}/`;
    case 'project': return `/projeto/${node.id.replace('project-', '')}/`;
    case 'document': return `/docs/${node.id.replace('document-', '')}/`;
    case 'decision': return `/decisoes/#${node.id.replace('decision-', '')}`;
    case 'event': return '/command-center/timeline/';
    case 'skill':
    case 'metric': return '/command-center/';
    default: return '/';
  }
}

function getSnippet(text: string, query: string, fallback: string): string {
  const normalizedText = normalizeSearchText(text);
  const position = normalizedText.indexOf(query);
  if (position < 0) return fallback;
  const start = Math.max(0, position - 72);
  const end = Math.min(text.length, start + 180);
  return `${start > 0 ? '...' : ''}${text.slice(start, end)}${end < text.length ? '...' : ''}`;
}

export function searchAll(query: string): SearchResult[] {
  const q = normalizeSearchText(query);
  if (!q) return [];
  const tokens = q.split(' ');
  const results: SearchResult[] = [];

  try {
    const repo = getRepo();
    const index = repo.getIndex();
    const typeLabel: Record<string, string> = {
      product: 'produto', project: 'projeto', decision: 'decisão técnica', document: 'documentação',
      event: 'marco', skill: 'skill', metric: 'métrica',
    };

    for (const node of index.byId.values()) {
      const document = index.getDocument(node.id);
      const decision = index.getDecision(node.id);
      const title = normalizeSearchText(node.title);
      const tags = normalizeSearchText(node.tags.join(' '));
      const content = normalizeSearchText([
        node.description,
        toSearchableText(node.metadata),
        document?.sections.map(section => `${section.heading} ${section.content}`),
        decision && [decision.context, decision.decision, decision.rationale, decision.tradeoffs, decision.impact],
      ].filter(Boolean).join(' '));
      const id = normalizeSearchText(node.id);
      const matchedTokens = tokens.filter(token => title.includes(token) || tags.includes(token) || content.includes(token) || id.includes(token));
      if (matchedTokens.length === 0) continue;

      let score = 0;
      if (title.includes(q)) score += 100;
      if (tokens.every(token => title.includes(token))) score += 60;
      score += tokens.filter(token => title.includes(token)).length * 20;
      if (tags.includes(q)) score += 40;
      score += tokens.filter(token => tags.includes(token)).length * 12;
      if (content.includes(q)) score += 20;
      score += tokens.filter(token => content.includes(token)).length * 4;
      score += tokens.filter(token => id.includes(token)).length * 8;

      results.push({
        id: node.id,
        type: typeLabel[node.type] || node.type,
        title: node.title,
        url: getUrl(node),
        snippet: getSnippet(`${node.description} ${toSearchableText(node.metadata)} ${document?.sections.map(section => section.content).join(' ') ?? ''}`, q, node.description),
        score,
        source: 'repository',
      });
    }

    return results.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title, 'pt-BR') || a.id.localeCompare(b.id));
  } catch {
    return results;
  }
}

export function answerFromLocalKnowledge(question: string) {
  const sources = searchAll(question).slice(0, 3);
  if (sources.length === 0) {
    return { text: 'Não encontrei informação suficiente nas fontes locais para responder a essa pergunta.', sources };
  }
  return { text: sources[0].snippet, sources };
}
