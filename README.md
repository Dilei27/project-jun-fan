# Project Jun Fan

**Advancing Frontiers**

**Absorb. Refine. Build.**

Project Jun Fan é uma fundação **front-end first** para construir uma plataforma de produtos, documentação e experiências técnicas de automação, QA e IA aplicada.

```
          ╔══════════════════════════════╗
          ║       Project Jun Fan        ║
          ║    Advancing Frontiers       ║
          ║  Absorb. Refine. Build.      ║
          ╚══════════════════════════════╝
```

---

## O Que É

- Fundação front-end first para plataforma de produtos
- Ecossistema de documentação e narrativa técnica
- Base reutilizável para QA Command Center, WhatsApp AI e Vigilante AI
- Design System próprio (Horizon) com tokens e componentes

## O Que Não É

- ❌ SaaS, ERP ou sistema comercial
- ❌ Backend ou framework
- ❌ Landing page ou portfólio estático
- ❌ Dashboard genérico sem identidade
- ❌ Template de IA com neon e efeitos genéricos

## Arquitetura

```
Project Jun Fan
├── Jun Fan Hub              → Entrada do ecossistema
├── QA Command Center        → Hub central (Sprint 1)
├── Product Modules          → WhatsApp AI, Vigilante AI
├── Documentation Layer      → Docs, ADRs, handbooks
├── AI Layer                 → AI Dock (mockado)
└── Horizon Design System    → Tokens, componentes, regras
```

**Decisão arquitetural:** front-end first. Zero backend no MVP. Todo conteúdo servido estaticamente via Next.js + JSON.

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 16 (App Router) |
| Linguagem | TypeScript 5 |
| Estilização | Tailwind CSS 4 |
| Animação | Framer Motion 12 |
| Ícones | Lucide React |
| Conteúdo | JSON estático em `src/content/` |
| Container | Docker + Node 22 |

Zero Django. Zero banco de dados. Zero autenticação. Zero mensageria.

## Estrutura

```
src/
  app/                 # 25 páginas (Next.js App Router)
  components/
    ui/                # Primitivas: Button, Card, Badge, Skeleton
    layout/            # Shell: Header, Footer
    cards/             # Cards: ProductCard, ProjectCard, DecisionCard
    shared/            # Diversos: StatusStrip, Timeline
  features/
    ai-dock/           # AI Dock (mockado)
    command-palette/   # Command Palette (Ctrl+K)
    docs/              # Sidebar de documentação
  design-system/       # Tokens, colors, typography, spacing, radius, motion
  config/              # Navigation, constants, metadata
  content/             # JSON: products, projects, timeline, decisions, docs, manifesto, principles, philosophy, metrics, skills
  lib/                 # Content loaders, search
  types/               # TypeScript types (separados por domínio)
  hooks/               # Custom hooks
docs/                  # Architecture, Handbook, Product Language, Roadmap, ADRs
```

## Design System

O **Horizon Design System** define toda a identidade visual:

- Cores escuras premium com acentos por produto
- Tipografia Inter
- Escala de espaçamento e bordas consistentes
- Motion funcional e discreto
- Acessibilidade nativa (foco visível, reduced motion)

Documentação completa em [`docs/Horizon-Design-System.md`](docs/Horizon-Design-System.md).

## Como Rodar

```bash
npm install
npm run dev
# http://localhost:3000
```

## Docker

```bash
docker compose up --build
# http://localhost:3000
```

## Produtos

| Produto | Cor | Status |
|---|---|---|
| QA Command Center | `#4F8CFF` | Online |
| WhatsApp AI Assistant | `#2DD4BF` | Beta |
| Vigilante AI | `#F97316` | Beta |

## Roadmap

| Sprint | Foco |
|---|---|
| Sprint 1 | QA Command Center |
| Sprint 2 | AI Dock |
| Sprint 3 | WhatsApp AI |
| Sprint 4 | Vigilante AI |
| Sprint 5 | GitHub Sync |
| Sprint 6 | Architecture Pipeline |

## AI Workspace

O Project Jun Fan possui uma infraestrutura completa de **agentes especializados** para desenvolvimento assistido por IA.

```
agents/
  core/           Agentes fundamentais
  engineering/    Agentes de código
  product/        Agentes de produto
  design/         Agentes de design
  qa/             Agentes de qualidade
  devops/         Agentes de infraestrutura
  contexts/       Contexto permanente
  playbooks/      Guias passo a passo
  templates/      Templates reutilizáveis
```

Cada agente possui `agent.md`, `prompt.md`, `checklist.md` e `examples.md`.

Documentação completa em [`docs/AI-Workspace.md`](docs/AI-Workspace.md).

## Contribuição

Veja [`CONTRIBUTING.md`](CONTRIBUTING.md) para guia completo.

---

**License:** MIT  
**Autor:** Odirlei Alves
