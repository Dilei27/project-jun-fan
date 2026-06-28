# Knowledge Graph API

> Interface pública do Core para o Knowledge Graph.

---

## Core Functions

### `getGraphData()`
Retorna todos os nós e arestas do grafo.

```typescript
const { nodes, edges } = getGraphData()
```

### `getFilteredGraph(types: string[])`
Retorna nós e arestas filtrados por tipo.

```typescript
const { nodes, edges } = getFilteredGraph(['product', 'project'])
```

### `getNodeConnections(nodeId: string)`
Retorna as arestas conectadas a um nó específico.

```typescript
const connections = getNodeConnections('product-qa-command-center')
```

### `searchNodes(query: string)`
Busca nós por texto.

```typescript
const results = searchNodes('WhatsApp')
```

---

## Types

```typescript
interface GraphNode {
  id: string          // ID único (ex: "product-qa-command-center")
  type: string        // Tipo da entidade (product, project, decision, doc, timeline, skill)
  label: string       // Nome para exibição
  description: string // Descrição curta
  color: string       // Cor do nó (hex)
  size: number        // Tamanho (10-28)
  url: string         // Link para página detalhada
  group: string       // Agrupamento
}

interface GraphEdge {
  source: string      // ID do nó origem
  target: string      // ID do nó destino
  type: string        // Tipo de relação (uses, generates)
  label: string       // Label ("usa", "gerou")
}

interface GraphData {
  nodes: GraphNode[]
  edges: GraphEdge[]
}
```

---

## Node Types

| Type | Cor | Tamanho | Label |
|---|---|---|---|
| product | `#4F8CFF` | 28 | Nome do produto |
| project | `#4F8CFF` | 24 | Título do projeto |
| decision | `#A855F7` | 20 | Decisão (truncado) |
| doc | `#EAB308` | 18 | Título do doc |
| timeline | `#22C55E` | 18 | Ano — Marco |
| skill | `#9AA6B8` | 14 | Nome da skill |

---

## Edge Types

| Type | Label | Origem → Destino |
|---|---|---|
| uses | "usa" | Product/Project → Skill |
| generates | "gerou" | Project → Decision |

---

## Integração

### AI Dock
```typescript
// Exemplo: AI Dock consultando o Core
const results = searchNodes('arquitetura')
const graph = getFilteredGraph(['product', 'decision'])
```

### Command Palette
```typescript
// Exemplo: Command Palette mostrando resultados do grafo
const results = searchNodes(query)
```
