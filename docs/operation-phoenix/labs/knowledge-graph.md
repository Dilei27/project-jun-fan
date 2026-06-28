# Knowledge Graph Preparation — Project Identity (Labs)

> Como o Knowledge Graph se comportará no ecossistema Jun Fan.
> NÃO IMPLEMENTAR. Apenas definição conceitual.

---

## Comportamento

O Knowledge Graph do Project Jun Fan será uma **camada de navegação exploratória** que conecta todos os elementos do ecossistema visualmente.

Diferente de um grafo genérico, ele contará a **história do ecossistema** mostrando como produtos, projetos, decisões, skills e timeline se relacionam.

### Estados

| Estado | Comportamento |
|---|---|
| **Vazio** | "Nenhum nó disponível" — não deve acontecer (dados estáticos) |
| **Padrão** | Grafo completo com todos os nós e arestas visíveis |
| **Filtrado** | Apenas nós que correspondem ao filtro (produto, skill, ano) |
| **Foco** | Nó selecionado em destaque, conexões visíveis, demais semi-transparentes |
| **Mobile** | Layout simplificado, nós maiores, touch-friendly |

### Interações

| Ação | Resultado |
|---|---|
| Clique em nó | Abre slide com preview do conteúdo + link para página |
| Hover em nó | Destaca o nó e suas conexões diretas |
| Clique em aresta | Mostra "Projeto X usou Skill Y" ou similar |
| Filtro por produto | Mostra apenas nós relacionados ao produto |
| Filtro por ano | Mostra apenas nós daquele período |
| Pesquisa | Centraliza no nó correspondente |
| Zoom | Aproxima/afasta para explorar subgrafos |
| Arrastar | Reorganiza nós (layout força-gravitacional) |

---

## Nós

| Tipo | Nó | Origem dos Dados | Cor |
|---|---|---|---|
| **Produto** | QA Command Center | `products.json` | `#4F8CFF` |
| **Produto** | WhatsApp AI | `products.json` | `#2DD4BF` |
| **Produto** | Vigilante AI | `products.json` | `#F97316` |
| **Projeto** | Automação ERP UAU | `projects.json` | `accent-qa` |
| **Projeto** | WhatsApp AI Project | `projects.json` | `accent-whatsapp` |
| **Projeto** | Vigilante AI Project | `projects.json` | `accent-vigilante` |
| **Decisão** | Front-end First | `decisions.json` | `analytics` |
| **Decisão** | Horizon Design System | `decisions.json` | `analytics` |
| **Decisão** | Jun Fan Branding | `decisions.json` | `analytics` |
| **Decisão** | IA Assíncrona | `decisions.json` | `analytics` |
| **Skill** | Robot Framework | `skills.json` | `text-muted` |
| **Skill** | Playwright | `skills.json` | `text-muted` |
| **Skill** | Next.js | `skills.json` | `text-muted` |
| **Skill** | TypeScript | `skills.json` | `text-muted` |
| ... | (mais skills) | `skills.json` | `text-muted` |
| **Marco** | 2018 — QA Manual | `timeline.json` | `accent-qa` |
| **Marco** | 2019 — Automação | `timeline.json` | `accent-qa` |
| ... | (mais anos) | `timeline.json` | `accent-qa` |

---

## Conexões

| Origem | Destino | Tipo de Relação |
|---|---|---|
| Produto | Projeto | "Produto X originou do Projeto Y" |
| Projeto | Skill | "Projeto X usou Skill Y" |
| Projeto | Decisão | "Projeto X gerou Decisão Y" |
| Decisão | Skill | "Decisão X foi baseada em Skill Y" |
| Produto | Decisão | "Produto X foi impactado por Decisão Y" |
| Marco (timeline) | Projeto | "No ano X, o Projeto Y começou" |
| Marco (timeline) | Produto | "No ano X, o Produto Y foi lançado" |
| Skill | Skill | "Skill X é pré-requisito para Skill Y" |

---

## Filtros

| Filtro | Efeito |
|---|---|
| **Todos** | Grafo completo |
| **Produtos** | Apenas nós de produto |
| **Projetos** | Apenas nós de projeto |
| **Skills** | Apenas nós de skill |
| **Timeline** | Apenas nós de ano |
| **Decisões** | Apenas nós de decisão |
| **Ano** | Selecionar ano específico (2018-2025) |
| **Busca** | Centralizar em nó correspondente |

---

## Como Ele Contará a História do Ecossistema

1. **Entrada**: Visitante vê o grafo completo — uma constelação de nós conectados
2. **Exploração**: Ao passar o mouse, conexões se destacam, revelando relações
3. **Descoberta**: "Então o Projeto ERP UAU usou Robot Framework, que gerou a decisão de adotar front-end first..."
4. **Navegação**: Clique em um nó → preview do conteúdo → link para a página completa
5. **Conexão**: O AI Dock pode responder perguntas baseadas no grafo

---

## Requisitos de Dados

Para implementar, os arquivos JSON atuais precisam ser enriquecidos com:

```json
// Em products.json, adicionar:
"relatedProjects": ["automacao-erp-uau"],
"relatedDecisions": ["stack-django"],
"relatedSkills": ["Next.js", "TypeScript"],
"timelineYear": "2025"

// Em projects.json, adicionar:
"relatedSkills": ["Robot Framework", "Sikuli"],
"relatedDecisions": ["stack-django"],
"timelineYear": "2020"

// Novo arquivo: edges.json (conexões explícitas)
```

---

## Stack Técnica (Futura)

| Tecnologia | Função |
|---|---|
| D3.js force-graph | Layout força-gravitacional |
| Canvas vs SVG | Canvas para >50 nós, SVG para <50 |
| Custom renderer | Nós com cores do ecossistema |

---

## Roadmap para Knowledge Graph

| Fase | Quando | Nós |
|---|---|---|
| **Estudo** | Agora (Mission 03) | — |
| **Prototype UI** | Mission 04 | ~20 nós |
| **Integração com AI Dock** | Pós KG v1 | — |
| **Grafo completo** | Futuro | 50+ nós |

---

## ⚠️ Decisão

O Knowledge Graph está aprovado como **próxima missão (Mission 04)**. Requer:
1. Enriquecimento dos dados JSON com IDs de relação
2. Criação do componente de grafo
3. Integração com AI Dock
4. Testes de usabilidade
