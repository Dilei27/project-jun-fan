# Domain Model — Project Core

> Todas as entidades do ecossistema Project Jun Fan.

---

## Entidades

### 1. Product
| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `id` | string | sim | Identificador único (slug) |
| `name` | string | sim | Nome do produto |
| `status` | enum | sim | `online | beta | dev` |
| `shortDescription` | string | sim | Resumo de uma linha |
| `fullDescription` | string | não | Descrição completa |
| `problem` | string | sim | Problema que resolve |
| `solution` | string | sim | Como resolve |
| `accentColor` | string | sim | Cor de acento (hex) |
| `stack` | string[] | sim | Tecnologias |
| `architectureFlow` | string | sim | Fluxo textual |
| `metrics` | Record<string, number> | sim | Métricas do produto |
| `roadmap` | string[] | sim | Próximos passos |
| `relatedProjects` | string[] | não | IDs de projetos relacionados |
| `relatedDecisions` | string[] | não | IDs de decisões |
| `relatedSkills` | string[] | não | Skills |
| `links` | object | sim | docs e repo |

**Responsabilidade:** Um produto do ecossistema. Tem identidade visual própria (accentColor), stack, roadmap e métricas.

### 2. Project
| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `id` | string | sim | Identificador único |
| `title` | string | sim | Nome do projeto |
| `context` | string | sim | Contexto do problema |
| `problem` | string | sim | Problema detalhado |
| `solution` | string | sim | Solução implementada |
| `stack` | string[] | sim | Tecnologias usadas |
| `impact` | string | sim | Resultado/benefício |
| `status` | enum | sim | `concluido | em_andamento` |
| `decisions` | string[] | sim | IDs de decisões |
| `relatedProducts` | string[] | não | IDs de produtos originados |
| `relatedSkills` | string[] | não | Skills usadas |
| `links` | object | sim | docs e repo |

**Responsabilidade:** Um case real de engenharia. Gera decisões, usa skills, pode originar produtos.

### 3. Decision
| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `id` | string | sim | Identificador único |
| `context` | string | sim | Contexto da decisão |
| `decision` | string | sim | O que foi decidido |
| `rationale` | string | sim | Por que foi decidido |
| `tradeoffs` | string | sim | Prós e contras |
| `impact` | string | sim | Consequências |
| `relatedProjects` | string[] | não | Projetos impactados |
| `relatedProducts` | string[] | não | Produtos impactados |

**Responsabilidade:** Registro de decisão arquitetural. Tem contexto, decisão, rationale, trade-offs e impacto.

### 4. Doc
| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `id` | string | sim | Identificador único |
| `title` | string | sim | Título |
| `description` | string | sim | Resumo |
| `sections` | DocSection[] | sim | Seções de conteúdo |
| `relatedProducts` | string[] | não | Produtos relacionados |
| `relatedProjects` | string[] | não | Projetos relacionados |
| `relatedDecisions` | string[] | não | Decisões relacionadas |

**Responsabilidade:** Documentação estruturada do ecossistema.

### 5. TimelineEvent
| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `year` | string | sim | Ano |
| `milestone` | string | sim | Nome do marco |
| `description` | string | sim | Descrição |
| `relatedProjects` | string[] | não | Projetos do período |
| `relatedProducts` | string[] | não | Produtos lançados |
| `relatedDecisions` | string[] | não | Decisões do período |

**Responsabilidade:** Marco na trajetória profissional. Conecta a história do ecossistema.

### 6. Skill
| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `name` | string | sim | Nome da skill |
| `category` | string | sim | Área (Automação, Front-end, etc) |
| `level` | enum | sim | `avancado | intermediario | iniciante` |
| `relatedProjects` | string[] | não | Projetos que usam |
| `relatedProducts` | string[] | não | Produtos que usam |

**Responsabilidade:** Competência técnica. Pode estar associada a projetos e produtos.

### 7. Mission
| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `id` | string | sim | Código (RC-01, RC-02, etc) |
| `name` | string | sim | Nome da missão |
| `objective` | string | sim | Objetivo principal |
| `status` | enum | sim | `pending | in_progress | completed` |
| `board` | string[] | sim | Papéis envolvidos |
| `documents` | string[] | não | Documentos gerados |
| `decisions` | string[] | não | Decisões tomadas |
| `startDate` | string | sim | Data de início |
| `endDate` | string | não | Data de conclusão |

**Responsabilidade:** Uma missão de produto. Gera documentos e decisões.

### 8. Agent
| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `id` | string | sim | Nome do agente |
| `role` | string | sim | Papel no ecossistema |
| `type` | enum | sim | `core | engineering | product | design | qa | devops` |
| `files` | string[] | sim | Arquivos do agente |
| `contexts` | string[] | não | Contextos que utiliza |

**Responsabilidade:** Um agente de IA especializado no AI Workspace.

### 9. Technology
| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `name` | string | sim | Nome |
| `category` | string | sim | `language | framework | tool | platform` |
| `usedIn` | string[] | não | Projetos que usam |
| `relatedSkills` | string[] | não | Skills relacionadas |

**Responsabilidade:** Uma tecnologia usada no ecossistema.

### 10. Metric
| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `id` | string | sim | Identificador |
| `label` | string | sim | Nome da métrica |
| `value` | number | sim | Valor |
| `unit` | string | não | Unidade (%, x, +) |
| `source` | string | não | Fonte/referência |
| `year` | string | não | Ano de referência |
| `relatedProduct` | string | não | Produto relacionado |

**Responsabilidade:** Métrica com contexto, fonte e referência temporal.

### 11. LabIdea
| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `id` | string | sim | Identificador |
| `title` | string | sim | Nome da ideia |
| `description` | string | sim | Descrição |
| `area` | string | sim | Área de pesquisa |
| `status` | enum | sim | `research | prototype | abandoned | promoted` |
| `relatedMissions` | string[] | não | Missões relacionadas |

**Responsabilidade:** Ideia em estado de pesquisa/laboratório.

### 12. ArchitectureRecord
| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `id` | string | sim | ID da arquitetura |
| `name` | string | sim | Nome do componente |
| `type` | enum | sim | `layer | module | service | component` |
| `description` | string | sim | Descrição |
| `dependencies` | string[] | não | Dependências |
| `consumers` | string[] | não | Quem consome |
| `relatedDecisions` | string[] | não | Decisões relacionadas |

**Responsabilidade:** Um elemento arquitetural do ecossistema.

---

## Entidades Derivadas (Compiladas por queries)

| Entidade | Origem | Descrição |
|---|---|---|
| `SearchResult` | Compilada de Product, Project, Doc, Decision | Resultado de busca textual |
| `GraphNode` | Compilada de todas as entidades | Nó do Knowledge Graph |
| `GraphEdge` | Relacionamentos entre entidades | Aresta do Knowledge Graph |
| `MetricsSummary` | Compilada de Metrics | Agregação de métricas |
| `EcosystemStats` | Compilada de contagens | Estatísticas do ecossistema |
