# Command Center — Architecture

## Módulo command-center

O módulo `command-center` vive em `src/features/command-center/` e contém toda a lógica específica do produto QA Command Center. Sua estrutura espelha a convenção do ecossistema:

```
src/features/command-center/
├── components/    # Componentes exclusivos do command-center
├── data/          # Hooks de acesso e transformação de dados
├── hooks/         # Hooks customizados
├── sections/      # Seções de página (combinações de componentes)
└── utils/         # Utilitários específicos
```

## Componentes exclusivos

Componentes que existem **apenas** no escopo do command-center, em `src/features/command-center/components/`:

- `HeroCommandCenter` — hero section com identidade visual do QA Command Center
- `ArchitectureFlow` — visualização do fluxo de arquitetura dos produtos
- `MetricsOverview` — consolidação de métricas do ecossistema
- `AIInsightsPanel` — painel de insights do AI Dock

## Seções

Em `src/features/command-center/sections/`, combinam componentes exclusivos e reutilizados em blocos de página:

- `CommandCenterHeroSection`
- `ProductsGatewaySection`
- `FeaturedProjectsSection`
- `TimelineSection`
- `DecisionsSection`
- `ArchitectureSection`
- `MetricsSection`
- `AIInsightsSection`
- `FooterCTA`

## Dados

Todo conteúdo é JSON-driven. Os dados vêm de `src/content/`:

| Arquivo | Uso |
|---|---|
| `projects.json` | Projetos do ecossistema |
| `products.json` | Produtos Jun Fan (inclui o próprio QA Command Center) |
| `decisions.json` | Decisões técnicas |
| `timeline.json` | Linha do tempo profissional |
| `metrics.json` | Métricas consolidadas |
| `docs.json` | Documentação |
| `skills.json` | Habilidades e stacks |
| `philosophy.json` | Filosofia Jun Fan |
| `principles.json` | Princípios |
| `manifesto.json` | Manifesto |

O acesso aos dados é feito via hooks em `src/features/command-center/data/` (ex.: `useProjects`, `useDecisions`, `useTimeline`), que importam diretamente os JSONs estáticos — sem chamadas de rede.

## Rotas

As rotas do command-center vivem em `src/app/command-center/`:

```
src/app/command-center/
├── page.tsx              # Home do Command Center
├── projetos/
│   └── [slug]/page.tsx   # Detalhe do projeto
├── decisoes/
│   └── page.tsx          # Painel de decisões
├── timeline/
│   └── page.tsx          # Timeline completa
├── stack/
│   └── page.tsx          # Stack e habilidades
└── ia/
    └── page.tsx          # AI Dock / AI Insights
```

## Relação com o resto do projeto

O command-center **não é uma ilha**. Ele se relaciona com:

| Área | Relação |
|---|---|
| `src/components/` | Reusa componentes existentes (ver abaixo) |
| `src/content/` | Consome todos os JSONs de conteúdo |
| `src/design-system/` | Usa tokens, cores, tipografia do Horizon |
| `src/features/ai-dock/` | Integra AI Insights mockados |
| `src/features/command-palette/` | Navegação rápida entre páginas |
| `src/providers/` | Provê tema, redução de movimento, etc. |
| `src/hooks/` | Hooks compartilhados (ex.: useReducedMotion) |

## Componentes reutilizados de `src/components/`

O command-center reaproveita estes componentes existentes em vez de recriá-los:

| Componente | Localização | Uso |
|---|---|---|
| `ProductCard` | `src/components/cards/product-card.tsx` | Gateway de produtos |
| `ProjectCard` | `src/components/cards/project-card.tsx` | Listagem de projetos |
| `DecisionCard` | `src/components/cards/decision-card.tsx` | Painel de decisões |
| `Timeline` | `src/components/shared/timeline.tsx` | Linha do tempo |
| `StatusStrip` | `src/components/shared/status-strip.tsx` | Status dos produtos |
| `Card` | `src/components/ui/card.tsx` | Container base |
| `Badge` | `src/components/ui/badge.tsx` | Tags de status |
| `Button` | `src/components/ui/button.tsx` | CTAs |
| `Skeleton` | `src/components/ui/skeleton.tsx` | Loading states |
| `Header` | `src/components/layout/header.tsx` | Navegação global |
| `Footer` | `src/components/layout/footer.tsx` | Rodapé global |

## Lista de componentes planejados

### Exclusivos do command-center

1. `HeroCommandCenter` — hero com identidade visual
2. `ArchitectureFlow` — visualização de arquitetura
3. `MetricsOverview` — métricas consolidadas
4. `AIInsightsPanel` — painel de IA

### Reutilizados de `src/components/`

5. `ProductCard` / `ProductGateway`
6. `ProjectCard` / `FeaturedProjects`
7. `DecisionCard`
8. `Timeline`
9. `StatusStrip`
10. `Card`, `Badge`, `Button`, `Skeleton`
11. `Header`, `Footer`

### Seções (composições)

12. `CommandCenterHeroSection`
13. `ProductsGatewaySection`
14. `FeaturedProjectsSection`
15. `TimelineSection`
16. `DecisionsSection`
17. `ArchitectureSection`
18. `MetricsSection`
19. `AIInsightsSection`
20. `FooterCTA`
