import { MockAdapter } from '@/core/knowledge/adapters/mock-adapter';
import { KnowledgeRepository } from '@/core/knowledge/repositories/knowledge-repository';

export interface SearchResult {
  type: string;
  title: string;
  url: string;
  snippet: string;
}

let _repo: KnowledgeRepository | null = null;

function getRepo(): KnowledgeRepository {
  if (!_repo) {
    _repo = new KnowledgeRepository(new MockAdapter());
    _repo.initialize();
  }
  return _repo;
}

export function searchAll(query: string): SearchResult[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  const results: SearchResult[] = [];

  try {
    const repo = getRepo();
    const nodes = repo.getIndex().search(q);

    for (const node of nodes) {
      let url = '';
      switch (node.type) {
        case 'product':
          url = `/produto/${node.id.replace('product-', '')}/`;
          break;
        case 'project':
          url = `/projeto/${node.id.replace('project-', '')}/`;
          break;
        case 'document':
          url = `/docs/${node.id.replace('document-', '')}/`;
          break;
        case 'decision':
          url = `/decisoes/#${node.id.replace('decision-', '')}`;
          break;
        case 'event':
          url = '/command-center/timeline/';
          break;
        case 'skill':
          url = '/command-center/';
          break;
        case 'metric':
          url = '/command-center/';
          break;
        default:
          url = '/';
      }

      const typeLabel: Record<string, string> = {
        product: 'produto',
        project: 'projeto',
        decision: 'decisão técnica',
        document: 'documentação',
        event: 'marco',
        skill: 'skill',
        metric: 'métrica',
      };

      results.push({
        type: typeLabel[node.type] || node.type,
        title: node.title,
        url,
        snippet: node.description,
      });
    }

    return results;
  } catch {
    return results;
  }
}
