# Content Architecture — Project Core

> Estrutura definitiva de conteúdo do ecossistema.

---

## Estrutura de Diretórios

```
src/
  core/                          ← Núcleo do ecossistema (NOVO)
    index.ts                     ← Barrel export
    registry.ts                  ← Registro central de entidades
    types.ts                     ← Tipos do Core
    
    entities/                    ← Definições de entidades
      product.ts
      project.ts
      decision.ts
      doc.ts
      timeline.ts
      skill.ts
      technology.ts
      mission.ts
      agent.ts
      metric.ts
      lab.ts
      architecture.ts
    
    loaders/                     ← Loaders centralizados
      index.ts                   ← Loader unificado
      product-loader.ts
      project-loader.ts
      decision-loader.ts
      doc-loader.ts
      timeline-loader.ts
      skill-loader.ts
      technology-loader.ts
      metric-loader.ts
    
    queries/                     ← Consultas do ecossistema
      search.ts                  ← Busca textual
      graph.ts                   ← Consultas para Knowledge Graph
      metrics.ts                 ← Agregações de métricas
      relations.ts               ← Consultas de relacionamento
    
    relationships/               ← Definições de relacionamentos
      registry.ts                ← Registro de relacionamentos
      types.ts                   ← Tipos de relacionamento

  content/                       ← Dados JSON (mantido, mas padronizado)
    products.json
    projects.json
    decisions.json
    docs.json
    timeline.json
    skills.json
    metrics.json
    manifesto.json
    philosophy.json
    principles.json
    technologies.json             ← NOVO (extraído de stacks)
    missions.json                 ← NOVO (histórico de missões)
    lab-ideas.json                ← NOVO (ideias em laboratório)
    architecture.json             ← NOVO (registro arquitetural)
    relationships.json            ← NOVO (relacionamentos explícitos)

  design-system/                ← Mantido
  components/                   ← Mantido
  features/                     ← Mantido
  app/                          ← Mantido
  lib/                          ← Mantido (pode evoluir para usar core/)
  types/                        ← Mantido (pode evoluir para usar core/)
```

---

## Princípios da Arquitetura

1. **Core é a única fonte de verdade.** Nenhum componente acessa `content/` diretamente.
2. **Loaders centralizados.** `core/loaders/index.ts` exporta todas as funções de acesso a dados.
3. **Queries desacopladas.** `core/queries/` contém lógica de consulta, não de apresentação.
4. **Relacionamentos explícitos.** `core/relationships/` define como entidades se conectam.
5. **Content JSON permanece.** Os arquivos JSON em `src/content/` continuam sendo a fonte de dados, mas são acessados apenas via Core.

---

## Fluxo de Dados

```
content/*.json
      ↓
core/loaders/*.ts    ← Lê JSON, valida tipos, aplica transformações
      ↓
core/queries/*.ts    ← Consultas, filtros, agregações, relacionamentos
      ↓
lib/content.ts       ← Interface pública (wrapper thin)
      ↓
components/*         ← Consomem dados por props
```

---

## Camadas

```
┌─────────────────────────────────────────────┐
│                  UI Layer                   │
│  components/ app/ features/                 │
├─────────────────────────────────────────────┤
│              Query Layer                    │
│  core/queries/ lib/                         │
├─────────────────────────────────────────────┤
│              Loader Layer                   │
│  core/loaders/                              │
├─────────────────────────────────────────────┤
│              Content Layer                  │
│  content/*.json                             │
├─────────────────────────────────────────────┤
│           Design System                     │
│  design-system/                             │
└─────────────────────────────────────────────┘
```
