# Changelog

## v2.0.0-knowledge-graph (2026-06-28) — The Living Ecosystem (RC-05)

### Added
- Knowledge Graph: grafo de conhecimento interativo em `/knowledge-graph/`
- Core implementation: `src/core/` with loaders, queries, and graph logic
- Force-directed layout with SVG rendering
- Node system: 6 tipos (product, project, decision, doc, timeline, skill) com cores e tamanhos
- Connection system: edges baseadas em relações reais do ecossistema
- Filter system: toggle por tipo de entidade
- Search: busca textual com centralização no grafo
- Side panel: detalhes do nó com conexões e links
- Pan/zoom navigation com mouse
- Navigation: "Graph" link no header e footer
- 3 documentation files: guide, API, decisions

### Changed
- `src/core/` — implementado com loaders e queries reais
- `src/config/navigation.ts` — Knowledge Graph substitui Hub no header
- `src/design-system/typography.ts` — JetBrains Mono removido

### Architecture
- Core agora é a fonte única de dados para o Knowledge Graph
- Dados fluem: content/*.json → core/loaders → core/queries → KnowledgeGraph component
- Nenhum dado hardcoded no componente
- Relacionamentos derivados automaticamente dos dados existentes

## v1.2.0-core (2026-06-28) — The Knowledge Engine (RC-04)

### Added
- Core architecture: `src/core/` with types, entities, loaders and queries scaffold
- Domain model: 12 entities (Product, Project, Decision, Doc, TimelineEvent, Skill, Technology, Mission, Agent, Metric, LabIdea, ArchitectureRecord)
- Relationship map: how all entities connect
- Content architecture: definitive directory structure
- Data contracts: schemas, versionamento e estratégia de evolução
- Knowledge Layer: how any screen finds any information
- Query model: search, graph, metrics, relations and stats interfaces
- Evolution model: how to add products, agents, missions without breaking architecture
- Knowledge Graph Architecture: nodes, edges, filters, zoom, panels, states
- AI Dock Core: how the AI Dock will use the Core to answer questions
- Future Products Validation: Core supports all current and future products
- Core Governance: 16 permanent rules

### Documentation
- 10 core documents in `docs/operation-phoenix/core/`
- `docs/Architecture.md`: updated to reference Core

## v1.1.0-identity (2026-06-28) — Brand Identity Definition (RC-03)

### Added
- Brand Discovery: identidade, posicionamento "Product Operating System", manifesto, arquétipo
- Product Personality: tom de voz, vocabulário, energia, emoção, ritmo
- Visual DNA: padrões obrigatórios, elementos proibidos, checklist de identidade
- Design Language: 15 categorias de regras permanentes (spacing, hierarchy, cards, containers, borders, radius, blur, glow, shadows, typography, grid, white space, dividers, panels, hero)
- Motion Language: ritmo, durations, easings, quando usar/não usar, padrões de entrada
- Emotion Map: sentimentos por etapa da jornada, por componente, por página
- Visual Signature: 8 elementos exclusivos que tornam o Jun Fan reconhecível
- Horizon Evolution: tokens de shadow/blur/z-index, alinhamento de spacing, novos componentes
- Knowledge Graph Preparation (Labs): nós, conexões, filtros, interações
- AI Dock Preparation (Labs): personalidade, tom, estrutura de resposta, integração

### Changed
- `src/content/philosophy.json`: enriquecido com positioning, motto, archetype, identidade estendida
- `src/design-system/typography.ts`: JetBrains Mono removido (alinhado com globals.css)

### Documentation
- 12 novos documentos de identidade em `docs/operation-phoenix/`

## v1.0.1-aura (2026-06-28) — Experience Refinement (RC-02)

### Added
- Home hero: status badge "Product Operating System — online", mantra "Absorb. Refine. Build.", CTAs reduzidos para 2
- loading.tsx global com Skeleton para fallback de páginas
- not-found.tsx personalizado (404 com layout Horizon)
- error.tsx customizado com botão "Tentar novamente"
- AnimatedGrid component com stagger animation (fadeIn + slideUp via motion tokens)
- AnimatedCard component com entry animation via framer-motion whileInView

### Changed
- Mobile header menu: adicionado AnimatePresence com slideDown animation
- Command Palette: adicionado AnimatePresence com scale + fade na abertura
- ProductGateway, FeaturedProjects, AIInsightCards: wrapped com AnimatedGrid para entrada animada
- Footer: links com hover state bg, removidos links "#" não funcionais
- Badge "Quality ecosystem online": removido animate-pulse (estático com dot verde)

### Removed
- TimelineSection duplicada (consolidada em components/shared/timeline.tsx)
- Google Fonts import duplicado em globals.css (mantido next/font em layout.tsx)
- JetBrains Mono de globals.css (fonte não carregada no projeto)
- prefers-color-scheme:dark redundante em theme.css
- Footer links GitHub e Contato com href="#"

## v1.0.0-foundation (2025-06-28) — Foundation Release (FR1)

### Added
- Publicação oficial no GitHub
- AI Workspace com 24 agentes especializados
- Agents core, engineering, product, design, qa, devops
- Contextos permanentes (6), playbooks (6), templates (6)
- docs/AI-Workspace.md
- Seção AI Workspace no README

### Changed
- v0.1.0 promovido para v1.0.0-foundation

---

## v0.1.0 (2025-06-28) — Foundation Release

### Added
- Next.js 16 + TypeScript + Tailwind CSS scaffold
- Horizon Design System tokens (colors, typography, spacing, radius, motion)
- Components: Button, Card, Badge, Skeleton, Header, Footer
- Features: AI Dock (mock), Command Palette, Docs Sidebar
- Pages: Home, Hub, Products (3), Projects (3), Docs (4+index), Decisions, Framework, Search, Analytics
- Content: products.json, projects.json, timeline.json, decisions.json, docs.json, manifesto.json, principles.json, philosophy.json
- Config: navigation.ts, constants.ts, metadata.ts
- Architecture: front-end first, zero backend, JSON-driven content
- Docker: Dockerfile + docker-compose.yml (single service, no database)
- ADR: 001-front-end-first, 002-horizon-design-system, 003-jun-fan-branding
- Documentation: Architecture.md, Engineering-Handbook.md, Product-Language.md, Roadmap.md, Horizon-Design-System.md
- Governance: LICENSE (MIT), CONTRIBUTING.md, CODE_OF_CONDUCT.md
- GitHub templates: ISSUE_TEMPLATE/bug_report.md, ISSUE_TEMPLATE/feature_request.md, PULL_REQUEST_TEMPLATE.md

### Changed
- Rebranded from Odirlei Labs to Jun Fan
- Reorganized components/ into ui/, layout/, cards/, shared/
- Created features/ structure (ai-dock, command-palette, docs)
- Removed all backend (Django) references from active stack

### Removed
- Django backend (archived to archive/backend-draft/)
- All references to Celery, RabbitMQ, Redis, PostgreSQL in active content
