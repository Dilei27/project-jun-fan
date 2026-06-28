# Knowledge Graph Guide

> Como usar e entender o Knowledge Graph do Project Jun Fan.

---

## O Que É

O Knowledge Graph é uma representação visual navegável de todo o conhecimento do ecossistema Project Jun Fan. Cada nó representa uma entidade real (produto, projeto, decisão, skill) e cada conexão representa uma relação real entre entidades.

## Como Usar

### Navegação
- **Panorama**: arraste o fundo do grafo para mover a visualização
- **Zoom**: use a roda do mouse para aproximar/afastar
- **Nós**: clique em um nó para ver detalhes e conexões
- **Hover**: passe o mouse sobre um nó para ver o nome completo

### Filtros
Use os botões no canto superior direito para filtrar por tipo de entidade:
- **Produto** — QA Command Center, WhatsApp AI, Vigilante AI
- **Projeto** — Automação ERP, WhatsApp AI, Vigilante AI
- **Decisão** — Decisões arquiteturais (ADRs)
- **Doc** — Documentação do ecossistema
- **Timeline** — Marcos da trajetória profissional
- **Skill** — Tecnologias e competências

### Busca
Digite no campo de busca para localizar uma entidade específica. O grafo centralizará no resultado e destacará suas conexões.

### Painel de Detalhes
Ao clicar em um nó, um painel lateral abre com:
- Tipo da entidade
- Descrição
- Lista de conexões com links
- Botão para abrir a página completa

---

## Arquitetura

```
src/
  core/                    ← Núcleo do ecossistema
    types.ts               ← Tipos e cores das entidades
    queries/index.ts       ← Graph queries (buildNodes, buildEdges)
    loaders/index.ts       ← Loaders de dados JSON
  
  features/
    knowledge-graph/       ← Componente do Graph
      components/
        knowledge-graph.tsx ← Visualização SVG + interações
  
  app/
    knowledge-graph/       ← Página /knowledge-graph/
      page.tsx
```

### Fluxo de Dados
```
content/*.json
    ↓
core/loaders/*.ts         ← Leitura dos dados
    ↓
core/queries/index.ts     ← Construção de nós e arestas
    ↓
knowledge-graph.tsx        ← Renderização SVG
```

---

## Performance

| Métrica | Atual | Alvo |
|---|---|---|
| Nós | ~30 | 500+ |
| Arestas | ~60 | 2000+ |
| Renderização | SVG | Canvas (futuro) |
| Simulação | force-directed JS | Web Worker (futuro) |

### Limitações Atuais
- Força bruta O(n²) para simulação de força
- SVG puro (sem virtualização)
- Síncrono (sem worker)

### Próximas Otimizações
- Web Worker para simulação
- Canvas para > 200 nós
- Quadtree para detecção de colisão
