# Data Contracts — Project Core

> Schemas, versionamento e estratégia de evolução para cada entidade.

---

## Product

```json
{
  "id": "qa-command-center",
  "name": "QA Command Center",
  "status": "online",
  "shortDescription": "Hub central do ecossistema.",
  "problem": "Projetos técnicos...",
  "solution": "Plataforma modular...",
  "accentColor": "#4F8CFF",
  "stack": ["Python", "Next.js"],
  "architectureFlow": "Entrada -> Hub -> Produtos",
  "metrics": { "projetos": 12 },
  "roadmap": ["Dashboard interno"],
  "relatedProjects": ["automacao-erp-uau"],
  "relatedDecisions": ["stack-django"],
  "relatedSkills": ["Python", "Next.js"],
  "links": { "docs": "/docs/produtos", "repo": "https://github.com/..." }
}
```

**Campos obrigatórios:** `id`, `name`, `status`, `shortDescription`, `problem`, `solution`, `accentColor`, `stack`, `architectureFlow`, `metrics`, `roadmap`, `links`
**Campos opcionais:** `fullDescription`, `relatedProjects`, `relatedDecisions`, `relatedSkills`, `relatedTimelineEvents`

---

## Project

```json
{
  "id": "automacao-erp-uau",
  "title": "Automação ERP UAU",
  "context": "ERP legado com interface desktop.",
  "problem": "Ciclos de regressão de 960 min.",
  "solution": "Robot Framework + Sikuli.",
  "stack": ["Robot Framework", "Python"],
  "impact": "960min -> 192min.",
  "status": "concluido",
  "decisions": ["Arquitetura de automação híbrida"],
  "relatedProducts": ["qa-command-center"],
  "relatedSkills": ["Robot Framework", "Sikuli"],
  "relatedTimelineEvents": ["2020"],
  "links": { "docs": "/projeto/automacao-erp-uau/", "repo": "#" }
}
```

**Campos obrigatórios:** `id`, `title`, `context`, `problem`, `solution`, `stack`, `impact`, `status`, `links`
**Campos opcionais:** `decisions`, `relatedProducts`, `relatedSkills`, `relatedTimelineEvents`

---

## Decision

```json
{
  "id": "stack-django",
  "context": "Escolha de stack para o ecossistema.",
  "decision": "Next.js + React + TypeScript (front-end first).",
  "rationale": "Simplicidade, deploy estático, SSR nativo.",
  "tradeoffs": "Dependência de serviços externos.",
  "impact": "Elimina banco de dados no MVP.",
  "relatedProjects": ["automacao-erp-uau"],
  "relatedProducts": ["qa-command-center"],
  "relatedTimelineEvents": ["2025"]
}
```

**Campos obrigatórios:** `id`, `context`, `decision`, `rationale`, `tradeoffs`, `impact`
**Campos opcionais:** `relatedProjects`, `relatedProducts`, `relatedTimelineEvents`

---

## Doc

```json
{
  "id": "overview",
  "title": "Visão Geral",
  "description": "Arquitetura, stack e filosofia.",
  "sections": [
    { "heading": "Jun Fan", "content": "O Project Jun Fan é..." }
  ],
  "relatedProducts": ["qa-command-center"],
  "relatedProjects": [],
  "relatedDecisions": ["stack-django", "horizon-tokens"]
}
```

**Campos obrigatórios:** `id`, `title`, `description`, `sections`
**Campos opcionais:** `relatedProducts`, `relatedProjects`, `relatedDecisions`

---

## TimelineEvent

```json
{
  "year": "2025",
  "milestone": "Jun Fan",
  "description": "Fundação do Project Jun Fan.",
  "relatedProjects": ["automacao-erp-uau"],
  "relatedProducts": ["qa-command-center", "whatsapp-ai", "vigilante-ai"],
  "relatedDecisions": ["stack-django", "horizon-tokens", "jun-fan-branding"]
}
```

**Campos obrigatórios:** `year`, `milestone`, `description`
**Campos opcionais:** `relatedProjects`, `relatedProducts`, `relatedDecisions`

---

## Skill

```json
{
  "name": "Robot Framework",
  "category": "Automação de Testes",
  "level": "avancado",
  "relatedProjects": ["automacao-erp-uau"],
  "relatedProducts": ["qa-command-center"]
}
```

**Campos obrigatórios:** `name`, `category`, `level`
**Campos opcionais:** `relatedProjects`, `relatedProducts`

---

## Technology

```json
{
  "name": "Next.js",
  "category": "framework",
  "usedIn": ["qa-command-center", "whatsapp-ai"],
  "relatedSkills": ["Next.js"]
}
```

**Campos obrigatórios:** `name`, `category`
**Campos opcionais:** `usedIn`, `relatedSkills`

---

## Metric

```json
{
  "id": "projetos-automacao",
  "label": "Projetos e automações estruturadas",
  "value": 50,
  "unit": "+",
  "source": "Baseado em projetos reais desde 2018",
  "year": "2025",
  "relatedProduct": null
}
```

**Campos obrigatórios:** `id`, `label`, `value`
**Campos opcionais:** `unit`, `source`, `year`, `relatedProduct`

---

## Versionamento

### Estratégia
- **Formato:** JSON Schema implícito (tipos TypeScript são a definição)
- **Versão:** Semântica (v1, v2) apenas quando houver breaking change
- **Compatibilidade:** Campos novos são sempre opcionais
- **Migração:** Arquivo `MIGRATION.md` no diretório `core/`

### Regras de Evolução
1. **Adicionar campo:** sempre opcional (nunca `required`)
2. **Remover campo:** mover para `deprecated` por 1 versão antes de remover
3. **Renomear campo:** manter alias por 1 versão
4. **Mudar tipo:** nova versão do contrato

---

## Schema por Tipo de Entidade

```typescript
// Core types (conceituais, não de implementação)
type EntityStatus = 'online' | 'beta' | 'dev' | 'concluido' | 'em_andamento'
type SkillLevel = 'avancado' | 'intermediario' | 'iniciante'
type EntityType = 'product' | 'project' | 'decision' | 'doc' | 'timeline' | 'skill' | 'technology' | 'mission' | 'agent' | 'metric' | 'lab' | 'architecture'
type RelationshipType = 'references' | 'contains' | 'originates' | 'impacts' | 'generates' | 'relates' | 'uses' | 'context'
```
