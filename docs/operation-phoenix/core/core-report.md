# Core Report — RC-04 Project Core

**Data:** 28 Jun 2026  
**Arquiteto:** Principal Software Architect  

---

## Visão Geral

O Core do Project Jun Fan é o **núcleo arquitetural** que organiza todas as entidades, relacionamentos e consultas do ecossistema. Ele funciona como o "sistema operacional" — todo produto, dado e conhecimento flui através dele.

O Core não pertence ao QA Command Center.  
O QA Command Center pertence ao Core.  
O Core não pertence ao AI Dock.  
O AI Dock pertence ao Core.  
**O Core é a fonte única de verdade do Project Jun Fan.**

---

## Modelo de Domínio

| Entidade | Arquivo | Relacionamentos |
|---|---|---|
| Product | `core/entities/product.ts` | Project, Decision, Skill, Technology |
| Project | `core/entities/project.ts` | Product, Decision, Skill |
| Decision | `core/entities/decision.ts` | Product, Project |
| Doc | `core/entities/doc.ts` | Product, Project, Decision |
| TimelineEvent | `core/entities/timeline.ts` | Product, Project, Decision |
| Skill | `core/entities/skill.ts` | Product, Project |

Total: 12 entidades conceituais, 6 implementadas no scaffold.

---

## Relacionamentos

- 8 tipos de relação (references, contains, originates, impacts, generates, relates, uses, context)
- Matriz completa de 12x12 entidades
- Regra: relacionamentos são SEMPRE por ID, nunca por string solta

---

## Arquitetura

```
src/
  core/              ← Núcleo (tipos, entidades, loaders, queries)
    entities/        ← Definições de entidades
    loaders/         ← Acesso a dados
    queries/         ← Consultas (search, graph, metrics)
  content/           ← Dados JSON (fonte física)
  lib/               ← Wrapper thin (pode ser substituído por core/)
```

### Fluxo de Dados

```
content/*.json → core/loaders/ → core/queries/ → lib/ (ou direto) → components/
```

---

## Contratos

- 6 entidades com schemas TypeScript definidos em `src/core/entities/`
- Campos obrigatórios e opcionais documentados
- Versionamento semântico com deprecation window de 1 versão

---

## Governança

16 regras permanentes em `docs/operation-phoenix/core/core-governance.md`:

1. Fonte única de verdade
2. Sem duplicação
3. IDs únicos
4. Relacionamentos por ID
5. Dados sempre em JSON
6. Componentes recebem dados por props
7. Nenhum import direto de content/
8. Queries no Core, não nos componentes
9. Core não importa UI
10. Core não importa features
11. Features importam Core
12. UI importa Core
13. Add-only evolution
14. Deprecate antes de remover
15. Nova entidade = novo arquivo
16. Nova query = nova função no Core

---

## Preparação para Knowledge Graph

- Graph queries definidas em `core/queries/index.ts`
- Nós, arestas, filtros, zoom e painéis especificados em `docs/operation-phoenix/core/knowledge-graph-architecture.md`
- O Knowledge Graph consumirá exclusivamente `core.queries.graph.*`
- Toda inteligência está no Core — o grafo é apenas uma view

---

## Preparação para AI Dock

- Search queries definidas em `core/queries/index.ts`
- Fluxo de intenção, extração de entidades e formatação especificados em `docs/operation-phoenix/core/ai-dock-core.md`
- AI Dock consumirá exclusivamente `core.queries.search.*`

---

## Preparação para Produtos Futuros

Validado que o Core suporta:
- QA Command Center ✅
- WhatsApp AI ✅  
- Vigilante AI ✅
- Knowledge Graph ✅
- AI Dock ✅
- Mobile App ✅
- CLI ✅
- Produtos futuros ✅

---

## Riscos

| Risco | Probabilidade | Mitigação |
|---|---|---|
| Core ficar muito grande | Média | Separação por entidade + barrel export |
| Loaders acoplados a JSON | Baixa | Interface de loader permite trocar fonte |
| Queries duplicarem lógica de UI | Média | Governance impede UI de ter lógica de dados |
| Entidades novas quebrarem existentes | Baixa | Add-only evolution + campos opcionais |

---

## Benefícios

| Benefício | Descrição |
|---|---|
| **Desacoplamento** | UI não sabe de onde vêm os dados |
| **Consistência** | Todas as entidades seguem o mesmo padrão |
| **Evolução segura** | Adicionar entidades nunca quebra as existentes |
| **Single Source of Truth** | Nenhum dado duplicado |
| **Preparado para KG** | Graph queries já definidas |
| **Preparado para AI Dock** | Search queries já definidas |
| **Governança clara** | 16 regras para manter a qualidade |

---

## Scaffold Implementado

```
src/core/
  index.ts               ← Barrel export
  types.ts               ← EntityType, Status, SkillLevel
  entities/
    index.ts             ← Barrel
    product.ts           ← Product interface
    project.ts           ← Project interface
    decision.ts          ← Decision interface
    doc.ts               ← Doc + DocSection interfaces
    timeline.ts          ← TimelineEvent interface
    skill.ts             ← Skill interface
  loaders/
    index.ts             ← LoaderQueries interface
  queries/
    index.ts             ← FullQueries + GraphData interfaces
```

---

## Próxima Missão: Mission 05 — Knowledge Graph

O Core está definido, documentado e scaffold criado. A Mission 05 implementará o Knowledge Graph como representação visual dos dados do Core.
