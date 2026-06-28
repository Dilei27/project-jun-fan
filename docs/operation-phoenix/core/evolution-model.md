# Evolution Model — Project Core

> Como o ecossistema evolui sem quebrar a arquitetura.

---

## Como Adicionar um Novo Produto

### Checklist
- [ ] Criar entry em `content/products.json` (ou arquivo separado `content/products/<id>.json`)
- [ ] Adicionar relacionamentos em `content/relationships.json`
- [ ] Criar página em `src/app/produto/[slug]/` (se houver UI específica)
- [ ] Adicionar entry em `src/config/navigation.ts` (se houver link na navegação)

**O que NÃO precisa ser alterado:**
- Core loaders (são genéricos)
- Core queries (são genéricas)
- Design System (já existe)
- Types (Product type já é flexível)

### Exemplo

```json
// content/products.json — adicionar entry
{
  "id": "novo-produto-x",
  "name": "Novo Produto X",
  "status": "dev",
  "shortDescription": "...",
  "accentColor": "#A855F7",
  "stack": ["Python", "FastAPI"],
  "architectureFlow": "Entrada -> Processamento -> Saída",
  "metrics": { "usuarios": 0 },
  "roadmap": ["V1", "V2"],
  "links": { "docs": "#", "repo": "#" }
}
```

---

## Como Adicionar um Novo Agente

### Checklist
- [ ] Criar diretório em `agents/<category>/<agent-name>/`
- [ ] Criar `agent.md`, `prompt.md`, `checklist.md`, `examples.md`
- [ ] Adicionar referência em `agents/manifest.json`

**O que NÃO precisa ser alterado:**
- Core (agentes são independentes)
- AI Workspace (já suporta novos agentes)

---

## Como Adicionar uma Nova Missão

### Checklist
- [ ] Definir ID (RC-XX) e nome
- [ ] Criar documento de missão em `docs/operation-phoenix/mission-log-rcXX.md`
- [ ] Se gerar documentação de identidade/arquitetura, salvar em `docs/operation-phoenix/`
- [ ] Se gerar dados, adicionar em `content/` ou `core/`

**O que NÃO precisa ser alterado:**
- Estrutura de diretórios (já suporta múltiplas missões)
- Core (missões são documentação, não dados)

---

## Como Adicionar uma Nova Tecnologia

### Checklist
- [ ] Adicionar entry em `content/technologies.json`

```json
{
  "name": "FastAPI",
  "category": "framework",
  "usedIn": ["novo-produto-x"],
  "relatedSkills": ["Python"]
}
```

**O que NÃO precisa ser alterado:**
- Core (loader é genérico)
- Types (Technology type é flexível)

---

## Como Adicionar um Novo Laboratório (Lab)

### Checklist
- [ ] Adicionar entry em `content/lab-ideas.json`
- [ ] Se aplicável, criar documento de pesquisa em `docs/operation-phoenix/labs/`

**O que NÃO precisa ser alterado:**
- Core (labs são metadados)
- UI (labs não têm interface)

---

## Como Remover uma Entidade

### Regras
1. **Nunca remover de `content/` diretamente** — marcar como `status: archived`
2. **Manter dados por pelo menos 1 versão** antes de remover
3. **Remover apenas se nenhuma query ou UI referencia**

---

## Regras de Evolução

1. **Adicionar é sempre seguro.** Remover requer análise de dependências.
2. **Nunca quebrar a interface do Core.** Loaders e queries são API pública.
3. **Relacionamentos são opcionais.** Entidades podem existir sem conexões.
4. **Versionamento por contrato.** Tipos TypeScript documentam o schema.
5. **Dados separados de apresentação.** JSON nunca acoplado a componentes.
6. **Feature Toggle via Core.** Novas entidades podem ser descobertas automaticamente ou via registro.

---

## Diagrama de Evolução

```
Estado Atual (v1.0)
       │
       ▼
Adicionar conteúdo JSON    ← 1. Criar/editar arquivo em content/
       │
       ▼
Core detecta automaticamente ← 2. Loaders leem JSON, queries disponibilizam
       │
       ▼
UI consome via props       ← 3. Componentes usam Core → dados
       │
       ▼
Novo produto vivo no ecossistema ← sem alterar core, queries, ou design system
```
