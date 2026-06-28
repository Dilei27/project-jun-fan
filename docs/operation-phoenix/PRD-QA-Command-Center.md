# PRD — QA Command Center

## Visão do produto

> O QA Command Center é o primeiro produto oficial do Project Jun Fan. Ele funciona como hub central, portfólio vivo e cockpit de navegação para projetos, decisões técnicas, documentação e métricas.

## Objetivo

> Transformar o QA Command Center em uma demonstração viva da fundação Jun Fan.

## O que é

Primeiro produto do ecossistema, construído sobre Horizon Design System, com conteúdo em JSON, componentes reutilizáveis e AI Dock integrado.

## O que não é

- Dashboard genérico
- Portfólio estático
- Landing page
- Template de IA com neon

## Público-alvo

Visitantes técnicos, recrutadores, desenvolvedores, equipes de produto.

## Jornadas

1. Explorar projetos → Ver detalhes → Decisões técnicas → Timeline → Stack
2. Navegar produtos → Ver status → Explorar documentação
3. Consultar métricas → Insights de IA → Acessar AI Dock
4. Navegação livre entre hub, projetos, decisões, docs e timeline

## RFs — Requisitos funcionais

| ID | Descrição |
|---|---|
| RF-01 | Hero do Command Center com identidade visual e chamada principal |
| RF-02 | Status strip mostrando status dos produtos do ecossistema |
| RF-03 | Product cards para gateway dos produtos Jun Fan |
| RF-04 | Project cards para listagem e destaque de projetos |
| RF-05 | Timeline interativa da trajetória profissional |
| RF-06 | Decision cards com contexto, racional e trade-offs |
| RF-07 | Architecture flow visual dos produtos |
| RF-08 | Métricas consolidadas do ecossistema |
| RF-09 | AI Insights com respostas mockadas do AI Dock |
| RF-10 | CTAs de navegação e ação (ver projeto, explorar docs, etc.) |

## RNFs — Requisitos não funcionais

- Responsivo (mobile-first)
- Acessível (WCAG 2.1 AA)
- Reduced motion suportado
- Horizon compliant (usa tokens, componentes e regras do design system)
- JSON-driven (todo conteúdo vem de arquivos JSON)
- Build sem erro (zero warnings no Next.js build)
- Sem dependência de backend

## Arquitetura de informação

```
Home → Projects → Project Detail → Decisions → Timeline → Stack → AI
  ├── Produtos
  ├── Documentação
  └── Métricas
```

## Relação com Project Jun Fan

> É o produto principal que demonstra a fundação.

## Relação com Horizon

> Usa tokens, componentes e regras do Horizon.

## Roadmap

| Sprint | Foco |
|---|---|
| Sprint 1 — Foundation | Estrutura do módulo, rotas, layout base, Hero, Status strip |
| Sprint 2 — Projects | Project cards, listagem, projeto detalhe, produtos |
| Sprint 3 — Timeline + Skills | Timeline component, skills section, integração com content JSON |
| Sprint 4 — Decisions + Architecture | Decision cards, architecture flow, grafos de stack |
| Sprint 5 — AI Dock | AI Insights, integração com AI Dock mockado, prompts |
| Sprint 6 — Polish | Responsivo, acessibilidade, reduced motion, build final |

## Critérios de aceite

- Horizon compliant (usa tokens e componentes do design system)
- Todo conteúdo vem de JSON (projects.json, decisions.json, timeline.json, etc.)
- Mobile ok (testado em 320px+)
- Build ok (`next build` sem erros nem warnings)
- No backend (estático, sem banco, sem API real)
