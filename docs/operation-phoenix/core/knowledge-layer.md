# Knowledge Layer — Project Core

> Como qualquer tela encontra qualquer informação.

---

## Princípios

1. **Toda informação tem uma única fonte de verdade.**
2. **Toda informação é acessível por ID.**
3. **Toda informação é navegável por relacionamentos.**
4. **Nenhum componente consulta dados diretamente — sempre via Core.**

---

## Como Qualquer Tela Encontra Qualquer Informação

### Fluxo

```
Tela/Componente
    ↓
core/loaders/index.ts    ← Ponto de entrada único
    ↓
Entidade específica      ← ProductLoader, ProjectLoader, etc.
    ↓
content/*.json           ← Fonte de dados
```

### Exemplo

```typescript
// Antes (atual):
import { getProducts } from '@/lib/content';
const products = getProducts();

// Depois (Core):
import { core } from '@/core';
const products = core.products.getAll();
const product = core.products.getById('qa-command-center');
const related = core.products.getRelated('qa-command-center');
```

---

## Como os Produtos Compartilham Dados

Os produtos NÃO compartilham dados diretamente. Eles compartilham através do Core:

```
Product A
    ↓
core.relationships.getRelated(productA.id)
    ↓
[Project X, Project Y, Decision Z, Skill W]
    ↓
Product B (acessa mesmas entidades via Core)
```

---

## Como o AI Dock Acessará Conhecimento

### Antes (hardcoded)
```typescript
const aiResponses = {
  robot: { text: '...' },
  vigilante: { text: '...' },
};
```

### Depois (Core)
```typescript
// AI Dock consulta o Core
function handleAsk(question: string) {
  const intent = core.queries.interpretIntent(question);
  const results = core.queries.search(intent.keywords);
  return core.queries.formatResponse(results);
}
```

---

## Como o Knowledge Graph Consumirá Informações

```typescript
// Knowledge Graph consulta o Core para obter nós e arestas
const graphData = core.queries.graph.getFullGraph();
// Retorno:
{
  nodes: [
    { id: 'qa-command-center', type: 'product', label: 'QA Command Center', color: '#4F8CFF' },
    { id: 'automacao-erp-uau', type: 'project', label: 'Automação ERP UAU', color: '#4F8CFF' },
  ],
  edges: [
    { source: 'qa-command-center', target: 'automacao-erp-uau', type: 'originates' },
  ]
}

// Filtros
const filtered = core.queries.graph.getFiltered({ type: 'product', year: '2025' });
```

---

## Como Novos Produtos Entram Automaticamente

### Passos para adicionar um novo produto:
1. Criar entry em `content/products.json` (ou futuramente em arquivo separado)
2. Adicionar relacionamentos em `content/relationships.json`
3. **Nada mais.** O Core detecta automaticamente.

O Core não precisa ser alterado porque:
- Loaders iteram sobre todos os itens do arquivo
- Queries são genéricas (não específicas por produto)
- UI components recebem dados por props

---

## Knowledge Layer — Diagrama de Fluxo

```
┌────────────────────────────────────────────────────────────┐
│                       UI Layer                             │
│  ProductCard  ProjectCard  DecisionCard  AIDock  KG       │
└──────────────────────────┬─────────────────────────────────┘
                           │ props
┌──────────────────────────▼─────────────────────────────────┐
│                    Query Layer (core/queries/)              │
│  search  graph  metrics  relations  intent                  │
└──────────────────────────┬─────────────────────────────────┘
                           │
┌──────────────────────────▼─────────────────────────────────┐
│                   Loader Layer (core/loaders/)              │
│  product  project  decision  doc  timeline  skill  tech    │
└──────────────────────────┬─────────────────────────────────┘
                           │
┌──────────────────────────▼─────────────────────────────────┐
│                   Content Layer (content/*.json)            │
│  products.json  projects.json  decisions.json  ...          │
└────────────────────────────────────────────────────────────┘
```
