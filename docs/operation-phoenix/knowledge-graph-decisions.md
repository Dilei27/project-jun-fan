# Knowledge Graph Decisions

> Decisões arquiteturais e técnicas do Knowledge Graph.

---

## ADR-KG-001: SVG over Canvas

**Contexto:** Optamos por SVG em vez de Canvas para renderização do grafo.

**Decisão:** SVG com elementos `<circle>`, `<line>` e `<g>`.

**Rationale:** Para o número atual de nós (~30), SVG oferece interatividade nativa (eventos de mouse em cada elemento), fácil estilização com CSS, e integração natural com React.

**Trade-off:** Para 500+ nós, SVG pode perder performance. A migração para Canvas está documentada como evolução futura.

---

## ADR-KG-002: Custom Force Simulation over D3

**Contexto:** Precisávamos de um layout force-directed para os nós.

**Decisão:** Implementar simulação de força customizada em vez de adicionar D3.js.

**Rationale:** O número atual de nós (~30) não justifica a dependência adicional. A simulação customizada usa O(n²) com 100 iterações, o que é suficiente para o tamanho atual.

**Trade-off:** Para 500+ nós, precisaremos otimizar (Web Worker, quadtree).

---

## ADR-KG-003: Core como Fonte Única de Dados

**Contexto:** O Knowledge Graph precisa de dados de produtos, projetos, decisões, docs e skills.

**Decisão:** O Graph consome exclusivamente `core/queries/`. Nunca acessa `content/` diretamente.

**Rationale:** Consistência com a arquitetura do Core. Se os dados mudarem, o Graph reflete automaticamente.

---

## ADR-KG-004: IDs Prefixados por Tipo

**Contexto:** Nós de diferentes tipos podem ter IDs conflitantes (ex: "whatsapp-ai" existe como product e project).

**Decisão:** Prefixar IDs com o tipo: `product-qa-command-center`, `project-whatsapp-ai`, `decision-stack-django`.

**Rationale:** Evita colisão de IDs e permite identificar o tipo apenas pelo ID.

---

## ADR-KG-005: Painel Lateral ao Invés de Modal

**Contexto:** Ao clicar em um nó, precisamos mostrar detalhes.

**Decisão:** Painel lateral animado (slide-in da direita) em vez de modal central.

**Rationale:** O grafo permanece visível como contexto. O painel não obscurece a visualização.

---

## ADR-KG-006: useMemo para Dados Derivados

**Contexto:** Dados do grafo e posições precisam ser recalculados quando filtros mudam.

**Decisão:** `useMemo` em vez de `useEffect` + `setState`.

**Rationale:** Evita renderizações em cascata. Dados são derivados puramente de props/state.

---

## Limitações Conhecidas

| Limitação | Impacto | Solução Futura |
|---|---|---|
| Simulação O(n²) | Lento com 500+ nós | Web Worker + Quadtree |
| SVG sem virtualização | DOM grande com 500+ nós | Canvas |
| Sem lazy loading | Todo o grafo carrega de uma vez | Paginação por tipo |
| Sem persistência de posição | Posições resetam ao recarregar | localStorage |
