# Query Model — Project Core

> Como o ecossistema consulta informações.

---

## Interface de Consultas

```typescript
// core/queries/index.ts — Ponto de entrada único
export const queries = {
  // Busca textual em todas as entidades
  search: (query: string, filters?: SearchFilters) => SearchResult[],
  
  // Knowledge Graph
  graph: {
    getFull: () => GraphData,
    getFiltered: (filters: GraphFilters) => GraphData,
    getNode: (id: string) => GraphNode,
    getConnections: (id: string) => GraphEdge[],
    getTimeline: () => GraphData,
  },
  
  // Métricas
  metrics: {
    getSummary: () => MetricsSummary,
    getByProduct: (productId: string) => Metric[],
    getGlobal: () => GlobalMetrics,
  },
  
  // Relacionamentos
  relations: {
    getRelated: (entityId: string, type?: EntityType) => RelatedEntity[],
    getProductsByProject: (projectId: string) => Product[],
    getProjectsByProduct: (productId: string) => Project[],
    getDecisionsByEntity: (entityId: string) => Decision[],
    getTimelineByEntity: (entityId: string) => TimelineEvent[],
  },
  
  // Estatísticas
  stats: {
    getEcosystemStats: () => EcosystemStats,
    getProductivityMetrics: () => ProductivityMetrics,
  },
}
```

---

## Consultas Detalhadas

### Search

```typescript
interface SearchFilters {
  types?: EntityType[]       // Filtrar por tipo de entidade
  status?: EntityStatus[]    // Filtrar por status
  skills?: string[]          // Filtrar por skills
  year?: string              // Filtrar por ano
}

interface SearchResult {
  id: string
  type: EntityType
  title: string
  description: string
  url: string
  relevance: number          // Score de relevância
  matches: string[]          // Termos que matcharam
}
```

### Knowledge Graph

```typescript
interface GraphFilters {
  types?: EntityType[]
  center?: string            // Centralizar em torno de um nó
  depth?: number             // Profundidade (1 = conexões diretas)
  year?: string
}

interface GraphData {
  nodes: GraphNode[]
  edges: GraphEdge[]
}

interface GraphNode {
  id: string
  type: EntityType
  label: string
  description: string
  color: string
  size: number               // Tamanho visual (importância)
  url: string
  metadata: Record<string, any>
}

interface GraphEdge {
  source: string
  target: string
  type: RelationshipType
  label: string
}
```

### Metrics

```typescript
interface MetricsSummary {
  total: {
    products: number
    projects: number
    decisions: number
    docs: number
    skills: number
    technologies: number
    missions: number
  }
  byStatus: {
    products: Record<string, number>
    projects: Record<string, number>
  }
  byCategory: {
    skills: Record<string, number>
    technologies: Record<string, number>
  }
}
```

### Stats

```typescript
interface EcosystemStats {
  evolution: {
    year: string
    projects: number
    decisions: number
    skills: number
  }[]
  topSkills: {
    name: string
    count: number
  }[]
  recentActivity: {
    type: EntityType
    id: string
    title: string
    timestamp: string
  }[]
}
```

---

## Exemplos de Uso

```typescript
// Buscar todos os produtos com status online
const onlineProducts = core.queries.search('', { types: ['product'], status: 'online' });

// Buscar projetos que usam Python
const pythonProjects = core.queries.search('', { types: ['project'], skills: ['Python'] });

// Obter grafo completo para o Knowledge Graph
const fullGraph = core.queries.graph.getFull();

// Obter conexões de um produto específico
const connections = core.queries.graph.getConnections('qa-command-center');

// Obter métricas globais
const globalStats = core.queries.stats.getEcosystemStats();

// Obter decisões relacionadas a um projeto
const decisions = core.queries.relations.getDecisionsByEntity('automacao-erp-uau');

// Obter timeline de eventos relacionados a um produto
const timeline = core.queries.relations.getTimelineByEntity('qa-command-center');
```

---

## Estratégia de Implementação

1. **Fase 1 (MVP):** Loaders síncronos que leem JSON e retornam tipos
2. **Fase 2 (Search):** Search com índice em memória para busca textual
3. **Fase 3 (Graph):** Graph queries montam nós e arestas a partir dos relacionamentos
4. **Fase 4 (Metrics):** Métricas agregadas a partir dos dados
5. **Fase 5 (Cache):** Cache em memória para queries frequentes
