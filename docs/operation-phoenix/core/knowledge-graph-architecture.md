# Knowledge Graph Architecture — Project Core

> Projeto do grafo de conhecimento que consome exclusivamente o Core.

---

## Princípios

1. **O Knowledge Graph é uma VIEW do Core.** Ele não armazena dados — apenas os consulta e renderiza.
2. **Todo dado vem de `core.queries.graph.*`.** Nenhum dado hardcoded.
3. **O grafo é uma camada de navegação, não de armazenamento.**

---

## Nós

| Tipo | Cor | Tamanho | Origem dos Dados |
|---|---|---|---|
| `product` | `product.accentColor` | 20 | `core.products.getAll()` |
| `project` | `#4F8CFF` | 16 | `core.projects.getAll()` |
| `decision` | `#A855F7` | 14 | `core.decisions.getAll()` |
| `skill` | `#9AA6B8` | 10 | `core.skills.getAll()` |
| `technology` | `#EAB308` | 10 | `core.technologies.getAll()` |
| `timeline` | `#4F8CFF` | 12 | `core.timeline.getAll()` |
| `mission` | `#22C55E` | 12 | `core.missions.getAll()` |
| `doc` | `#687385` | 8 | `core.docs.getAll()` |

### Dados do Nó

```typescript
interface GraphNode {
  id: string                    // ID único (ex: "qa-command-center")
  type: 'product' | 'project' | 'decision' | 'skill' | 'technology' | 'timeline' | 'mission' | 'doc'
  label: string                 // Nome para exibição
  description: string           // Descrição curta (tooltip)
  color: string                 // Cor do nó
  size: number                  // Tamanho relativo
  url: string                   // Link para página detalhada
  group: string                 // Agrupamento (categoria)
  year: string | null           // Ano associado (para timeline)
}
```

---

## Arestas

| Tipo | Label | Cor | Largura |
|---|---|---|---|
| `originates` | "originou" | `#4F8CFF` | 2 |
| `uses` | "usa" | `#22C55E` | 1 |
| `impacts` | "impacta" | `#EF4444` | 1 |
| `references` | "referencia" | `#9AA6B8` | 1 |
| `generates` | "gera" | `#EAB308` | 1 |
| `relates` | "relaciona" | `#687385` | 0.5 |

### Dados da Aresta

```typescript
interface GraphEdge {
  source: string                // ID do nó origem
  target: string                // ID do nó destino
  type: RelationshipType        // Tipo de relação
  label: string                 // Label para exibição
  strength: number              // Força da relação (0-1)
}
```

---

## Conexões

### Produto → Projeto
- **Tipo:** `originates`
- **Label:** "Projeto originou este produto"
- **Exemplo:** `automacao-erp-uau → qa-command-center`

### Projeto → Skill
- **Tipo:** `uses`
- **Label:** "Usa a skill"
- **Exemplo:** `automacao-erp-uau → Robot Framework`

### Projeto → Decisão
- **Tipo:** `generates`
- **Label:** "Gerou a decisão"
- **Exemplo:** `automacao-erp-uau → stack-django`

### Produto → Tecnologia
- **Tipo:** `uses`
- **Label:** "Usa tecnologia"
- **Exemplo:** `qa-command-center → Next.js`

### Decisão → Produto
- **Tipo:** `impacts`
- **Label:** "Impacta o produto"
- **Exemplo:** `horizon-tokens → qa-command-center`

### Timeline → Entidade
- **Tipo:** `relates`
- **Label:** "Marco do período"
- **Exemplo:** `2025 → qa-command-center`

---

## Filtros

| Filtro | Tipo | Comportamento |
|---|---|---|
| `type` | EntityType[] | Mostra apenas nós do tipo selecionado |
| `year` | string | Mostra apenas nós do ano |
| `search` | string | Centraliza no nó que corresponde à busca |
| `center` | string | Centraliza o grafo em torno de um nó |
| `depth` | number | Profundidade de conexões (1 = diretas) |

---

## Zoom e Navegação

| Nível | Zoom | Mostra |
|---|---|---|
| **Visão Geral** | - | Todos os nós, sem labels detalhados |
| **Grupo** | médio | Nós com labels, arestas visíveis |
| **Detalhe** | + | Nó central com conexões diretas destacadas |
| **Foco** | máximo | Apenas o nó + preview de conteúdo |

---

## Agrupamentos

| Grupo | Membros |
|---|---|
| **Produtos** | product, project |
| **Conhecimento** | decision, doc, skill, technology |
| **Tempo** | timeline, mission |
| **Sistema** | Todos |

---

## Painéis

### Ao clicar em um nó:
```
┌──────────────────────────────┐
│  Nome do Nó                  │
│  Tipo: product               │
│  ─────────────────────────── │
│  Descrição curta             │
│                              │
│  Conexões:                   │
│  ● Projeto (3)               │
│  ● Decisão (2)               │
│  ● Skill (5)                 │
│                              │
│  [Abrir página →]            │
└──────────────────────────────┘
```

---

## Estados

| Estado | Aparência |
|---|---|
| **Carregando** | Skeleton com formato de grafo |
| **Vazio** | "Nenhum resultado para os filtros selecionados" |
| **Erro** | "Não foi possível carregar o grafo. Tente novamente." |
| **Foco** | Nó selecionado em destaque, demais com opacity 0.3 |
| **Hover** | Nó +0.2 scale, conexões diretas destacadas |

---

## Animações Conceituais

| Ação | Animação |
|---|---|
| Grafo carrega | Nós aparecem com scale (0 → 1) em cascata |
| Filtro aplicado | Nós não correspondentes desaparecem com fade |
| Nó selecionado | Escala 1.2 + glow na cor |
| Hover em nó | Escala 1.1 + conexões destacadas |
| Zoom | Suave, 280ms |

---

## Integração com o Core

```typescript
// O Knowledge Graph usa APENAS estas queries do Core:
import { core } from '@/core';

// 1. Obter grafo completo
const fullGraph = core.queries.graph.getFull();

// 2. Obter grafo filtrado
const filteredGraph = core.queries.graph.getFiltered({
  types: ['product', 'project'],
  year: '2025',
});

// 3. Obter conexões de um nó específico
const connections = core.queries.graph.getConnections('qa-command-center');

// 4. Obter detalhes de um nó
const nodeDetail = core.queries.graph.getNode('qa-command-center');
```

---

## Stack Técnica (Futura)

| Componente | Tecnologia |
|---|---|
| Renderização | D3.js force-graph ou vis-network |
| Container | Componente React client-side |
| Dados | Core queries (nunca dados diretos) |
| Performance | Canvas para > 50 nós; SVG para < 50 nós |
| Responsividade | Touch events, resize handler |

---

## ⚠️ Regra de Ouro

> O Knowledge Graph é uma **representação visual do Core**. Toda a inteligência está no Core. O grafo apenas desenha o que o Core já sabe.
