# Relationship Map — Project Core

> Como cada entidade se conecta no ecossistema.

---

## Quem Depende de Quem

```
Product
  ├── depende de: nada (entidade raiz)
  ├── consome: Skill[], Project[], Decision[]
  └── é consumido por: Doc, TimelineEvent, Metric

Project
  ├── depende de: nada (entidade raiz)
  ├── consome: Skill[], Decision[]
  └── é consumido por: Product, Doc, TimelineEvent

Decision
  ├── depende de: nada (entidade raiz)
  ├── consome: nada
  └── é consumido por: Project, Product, Doc, ArchitectureRecord

Doc
  ├── depende de: nada (entidade raiz)
  ├── referencia: Product[], Project[], Decision[]
  └── é consumido por: Search

TimelineEvent
  ├── depende de: nada (entidade raiz)
  ├── referencia: Product[], Project[], Decision[]
  └── é consumido por: Knowledge Graph

Skill
  ├── depende de: Technology (fraca)
  ├── consome: nada
  └── é consumido por: Product, Project

Technology
  ├── depende de: nada
  ├── referencia: Skill[]
  └── é consumido por: Product, Project

Mission
  ├── depende de: nada
  ├── gera: Doc[], Decision[]
  └── referencia: LabIdea[]

Agent
  ├── depende de: nada
  ├── consome: Doc[] (contextos)
  └── referenciado por: AI Workspace

Metric
  ├── depende de: Product (fraca)
  ├── consome: nada
  └── é consumido por: Dashboard, Analytics

LabIdea
  ├── depende de: nada
  ├── referenciado por: Mission
  └── gera: Doc[] (quando promovido)

ArchitectureRecord
  ├── depende de: nada
  ├── referencia: Decision[], Technology[]
  └── é consumido por: Knowledge Graph
```

---

## Quem Nunca Deve Depender Diretamente

| Regra | Motivo |
|---|---|
| **UI nunca depende de entidades** | Componentes recebem dados por props |
| **Entidades nunca dependem de UI** | Domínio puro, sem import de componentes |
| **Feature nunca depende de outra feature** | Features se comunicam apenas via Core |
| **Mission não depende de Agent** | Missoes e Agentes são independentes |
| **Skill não depende de Product** | Skill existe independente de produto |
| **TimelineEvent não depende de nada** | É um fato histórico independente |

---

## Matriz de Relacionamentos

| | Product | Project | Decision | Doc | Timeline | Skill | Tech | Mission | Agent | Metric | Lab | Arch |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **Product** | — | ref | ref | ref | ref | has | has | — | — | has | — | — |
| **Project** | org | — | has | ref | ref | has | has | — | — | — | — | — |
| **Decision** | imp | imp | — | ref | ref | — | — | — | — | — | — | ref |
| **Doc** | ref | ref | ref | — | — | — | — | — | — | — | — | — |
| **Timeline** | ref | ref | ref | — | — | — | — | — | — | — | — | — |
| **Skill** | has | has | — | — | — | — | rel | — | — | — | — | — |
| **Tech** | has | has | — | — | — | rel | — | — | — | — | — | ref |
| **Mission** | — | — | gen | gen | — | — | — | — | — | — | ref | — |
| **Agent** | — | — | — | ctx | — | — | — | — | — | — | — | — |
| **Metric** | has | — | — | — | — | — | — | — | — | — | — | — |
| **Lab** | — | — | — | gen | — | — | — | ref | — | — | — | — |
| **Arch** | — | — | ref | — | — | — | ref | — | — | — | — | — |

**Legenda:** ref=referencia, has=contém, org=origina, imp=impacta, gen=gera, rel=relaciona, ctx=contexto
