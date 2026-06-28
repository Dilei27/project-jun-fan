# AI Dock Core — Project Core

> Como o AI Dock utilizará o Core para responder perguntas.

---

## Princípios

1. **O AI Dock não sabe nada.** Ele apenas consulta o Core.
2. **Toda resposta é baseada em dados do Core.** Nada hardcoded.
3. **O AI Dock é uma interface de consulta, não um chatbot.**

---

## Arquitetura

```
User Question
    ↓
core.queries.search.intent()    ← Interpreta intenção
    ↓
core.queries.search()           ← Busca no conteúdo
    ↓
core.queries.formatResponse()   ← Formata resposta
    ↓
AI Dock UI                      ← Renderiza
```

---

## Como Responder Perguntas

### Fluxo de Intenção

```typescript
function handleQuestion(question: string) {
  // 1. Interpretar intenção
  const intent = interpretIntent(question);
  // intenções: 'describe' | 'list' | 'compare' | 'find' | 'explain' | 'unknown'

  // 2. Extrair entidades da pergunta
  const entities = extractEntities(question);
  // Ex: { type: 'product', name: 'QA Command Center' }

  // 3. Consultar Core
  const results = core.queries.search(question, { types: entities.types });

  // 4. Formatar resposta
  const response = formatResponse(intent, results);

  // 5. Sugerir próximos passos
  const suggestions = core.queries.relations.getRelated(results[0]?.id);

  return { response, suggestions };
}
```

---

## Como Localizar Documentos

```typescript
// Busca textual em toda documentação
const docs = core.queries.search('setup ambiente', { types: ['doc'] });

// Busca por seção específica
const sections = docs.flatMap(d => d.sections)
  .filter(s => s.heading.includes('Setup'));

// Retorna resultado com link para a doc completa
return {
  text: `O setup do ambiente está documentado em "${doc.title}": ${section.content}`,
  link: { href: `/docs/${doc.id}/`, label: 'Ver documentação completa →' }
};
```

---

## Como Navegar entre Produtos

```typescript
// "Quais produtos existem?"
const products = core.products.getAll();
return {
  text: `O ecossistema tem ${products.length} produtos: ${products.map(p => p.name).join(', ')}.`,
  suggestions: products.map(p => ({
    label: `Explorar ${p.name}`,
    href: `/produto/${p.id}/`
  }))
};

// "O que é o WhatsApp AI?"
const product = core.products.getById('whatsapp-ai');
return {
  text: `O ${product.name} é ${product.shortDescription}. Ele usa ${product.stack.join(', ')}.`,
  link: { href: `/produto/${product.id}/`, label: 'Ver produto →' }
};
```

---

## Como Explicar Arquitetura

```typescript
// "Explique a arquitetura do QA Command Center"
const product = core.products.getById('qa-command-center');
return {
  text: `A arquitetura do ${product.name} segue o fluxo: ${product.architectureFlow}. Stack: ${product.stack.join(', ')}.`,
  link: { href: `/produto/${product.id}/`, label: 'Ver arquitetura →' }
};
```

---

## Como Apresentar ADRs

```typescript
// "Quais decisões técnicas existem?"
const decisions = core.decisions.getAll();
return {
  text: `O ecossistema tem ${decisions.length} decisões arquiteturais registradas.`,
  suggestions: decisions.map(d => ({
    label: d.decision.substring(0, 60) + '...',
    href: `/decisoes/#${d.id}`
  }))
};

// "Explique a decisão front-end first"
const decision = core.decisions.getById('stack-django');
return {
  text: `${decision.context} Decidimos: ${decision.decision}. Racional: ${decision.rationale}.`,
  link: { href: `/decisoes/#${decision.id}`, label: 'Ver decisão completa →' }
};
```

---

## Como Responder sobre Tecnologias

```typescript
// "Quais tecnologias são usadas?"
const technologies = core.technologies.getAll();
return {
  text: `O ecossistema usa ${technologies.length} tecnologias principais em ${technologies.filter(t => t.category === 'language').length} linguagens, ${technologies.filter(t => t.category === 'framework').length} frameworks e ${technologies.filter(t => t.category === 'tool').length} ferramentas.`
};

// "Onde o Python é usado?"
const pythonUsages = core.queries.relations.getRelatedByTechnology('Python');
return {
  text: `Python é usado em: ${pythonUsages.map(u => u.label).join(', ')}.`,
};
```

---

## Estrutura de Resposta

```typescript
interface AIResponse {
  text: string;                        // Resposta principal (1-3 frases)
  link?: { href: string; label: string };  // Link para conteúdo completo
  suggestions?: {                      // Sugestões de acompanhamento
    label: string;
    href: string;
    type?: EntityType;
  }[];
  source?: string;                     // Fonte da informação
}
```

---

## Estados do AI Dock

| Estado | Comportamento |
|---|---|
| **Inicial** | Sugestões contextuais por página (do Core) |
| **Digitando** | Nenhum indicador (instantâneo em mock; spinner em real) |
| **Resposta** | Texto + link + sugestões |
| **Não encontrado** | "Não encontrei informação sobre [termo] no ecossistema. Tente perguntar sobre produtos, projetos ou tecnologias." |
| **Erro** | "Não foi possível processar sua pergunta. Tente novamente." |

---

## Sugestões Contextuais (do Core)

```typescript
// Sugestões baseadas na página atual
function getSuggestionsByPage(page: string, entityId?: string) {
  switch(page) {
    case '/':
      return [
        { label: 'O que é o Project Jun Fan?', query: 'o que é jun fan' },
        { label: 'Quais produtos existem?', query: 'produtos' },
      ];
    case '/command-center/':
      const products = core.products.getAll();
      return products.map(p => ({
        label: `O que é ${p.name}?`,
        query: `o que é ${p.name}`,
      }));
    case `/produto/${entityId}/`:
      const product = core.products.getById(entityId);
      return [
        { label: `Qual a stack do ${product.name}?`, query: `stack ${product.name}` },
        { label: `Como funciona o ${product.name}?`, query: `como funciona ${product.name}` },
      ];
    default:
      return [];
  }
}
```

---

## Integração com o Core

```typescript
// O AI Dock usa APENAS estas funções do Core:
import { core } from '@/core';

// Busca
core.queries.search(question, filters)

// Entidades específicas
core.products.getById(id)
core.projects.getByProduct(productId)
core.decisions.getByEntity(entityId)

// Relacionamentos
core.queries.relations.getRelated(entityId)
core.queries.relations.getRelatedByTechnology(techName)

// Sugestões
core.queries.search.getSuggestions(page, entityId)
```
