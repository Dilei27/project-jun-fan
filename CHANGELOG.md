# Changelog

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
