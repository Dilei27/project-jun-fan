# Roadmap v3 — Project Jun Fan

> Reorganizado pela RC-01 Product Polish Review Board.
> Priorização baseada em: impacto na percepção do produto > esforço de implementação.

---

## Sprint 0 — Hot Fixes (Alta Prioridade, Baixo Esforço)

Foco: eliminar débitos que comprometem a percepção de qualidade.

| Item | Tipo | Esforço |
|---|---|---|
| Consolidar Timeline (components/shared) removendo TimelineSection duplicada | cleanup | 15min |
| Remover import duplicado da Inter (Google Fonts vs next/font) | perf | 5min |
| Adicionar loading.tsx, error.tsx, not-found.tsx | ux | 30min |
| Remover pastas vazias (hooks/, providers/, utils/, styles/, features/*/vazias) | cleanup | 10min |
| Aplicar ENABLE_AI_DOCK condicionalmente no layout | config | 10min |
| Mover dados do AIInsightCards e AI Dock para content JSON | content | 30min |
| Substituir links "#" por links reais ou ocultá-los | content | 15min |
| JetBrains Mono: importar ou remover de globals.css | cleanup | 5min |
| Remover prefers-color-scheme:dark redundante em theme.css | cleanup | 5min |

**Duração estimada:** 1-2 dias.

---

## Sprint 1 — Home & Narrative

Foco: transformar a Home de funcional para memorável.

| Item | Prioridade |
|---|---|
| Hero com identidade visual mais forte (gradiente sutil, glow tokenizado, motion de entrada) | Alta |
| Incluir "Absorb. Refine. Build." na home | Alta |
| Adicionar elementos visuais que contem a história (linha do tempo visual, marcos) | Alta |
| Reduzir a densidade de CTAs (3 CTAs no hero é excesso; destacar o principal) | Média |
| Adicionar bio/avatar ou elemento pessoal sutil | Média |
| Home com produto em destaque (alternância semanal ou fixa) | Baixa |

**Duração estimada:** 3-5 dias.

---

## Sprint 2 — QA Command Center Refinamento

Foco: hierarquia, respiro e eliminação de sobrecarga cognitiva.

| Item | Prioridade |
|---|---|
| Hierarquia visual entre seções (hero forte, métricas compactas, produtos em destaque) | Alta |
| Boot Loader: tornar opcional (localStorage: exibir apenas na primeira visita) | Alta |
| MetricsGrid: adicionar fonte/ano/referência às métricas | Média |
| SkillsCloud: não expor nível "iniciante" publicamente | Média |
| ArchitectureFlow: tornar dinâmico por página (não apenas defaultSteps) | Média |
| Decisões na home do CC: aumentar para 3-4 cards em grid melhor | Baixa |

**Duração estimada:** 3-5 dias.

---

## Sprint 3 — Motion & Design Tokens

Foco: transformar motion.ts em realidade.

| Item | Prioridade |
|---|---|
| Aplicar motion.variants (fadeIn, slideUp, scale) nos componentes de card | Alta |
| Aplicar motion.duration nos componentes que usam framer-motion | Alta |
| Adicionar AnimatePresence nos cards com stagger children | Média |
| Adicionar transição de página suave (layout animation) | Média |
| Tokenizar blur-3xl e shadow-2xl como tokens Horizon | Média |
| Adicionar transição no mobile menu (AnimatePresence com slideDown) | Média |

**Duração estimada:** 2-4 dias.

---

## Sprint 4 — Horizon Design System v0.2

Foco: evoluir o Horizon com base no uso real.

| Item | Prioridade |
|---|---|
| Revisar tokens: alinhar spacing.ts, tokens.ts e theme.css | Alta |
| Garantir que todos os componentes consomem tokens | Alta |
| Adicionar token de shadow (elevação) | Média |
| Adicionar token de blur | Média |
| Adicionar token de z-index | Baixa |
| Documentar tokens ausentes (breakpoints, transition) | Baixa |

**Duração estimada:** 2-3 dias.

---

## Sprint 5 — Nested Layouts & Navigation

Foco: melhorar arquitetura de navegação.

| Item | Prioridade |
|---|---|
| Criar layout para command-center (sidebar ou subnav local) | Média |
| Criar layout para docs (sidebar já existe, mas poderia ser layout) | Média |
| Adicionar breadcrumbs de navegação | Média |
| Adicionar Product Switcher (dropdown entre produtos) | Baixa |

**Duração estimada:** 3-5 dias.

---

## Sprint 6 — AI Dock v2 & Command Palette

Foco: evoluir a camada de IA.

| Item | Prioridade |
|---|---|
| Sugestões contextuais por página | Alta |
| Respostas com mais profundidade (múltiplas fontes) | Média |
| Histórico de conversa na sessão | Baixa |
| Feedback do usuário (útil/não útil) | Baixa |
| Command Palette com preview expandido | Média |
| Command Palette com keyboard shortcuts customizáveis | Baixa |

**Duração estimada:** 3-5 dias.

---

## Sprint 7 — Product Pages & Demos

Foco: melhorar páginas de produto.

| Item | Prioridade |
|---|---|
| ArchitectureFlow dinâmico por produto | Alta |
| Páginas de produto com seção de roadmap própria | Média |
| Demo interativa mais realista (não apenas steps fixos) | Média |
| Dashboard de produto com métricas reais ou mais contexto | Média |
| Adicionar screenshots/diagramas aos produtos | Baixa |

**Duração estimada:** 3-5 dias.

---

## Futuro (Pós-Sprint 7)

| Item | Prioridade |
|---|---|
| MDX para documentação avançada | Média |
| AI real (serverless function) | Média |
| Modo claro | Média |
| Multi-idioma (pt-BR + en) | Baixa |
| GitHub Sync + CI/CD | Baixa |
| ADR workflow automatizado | Baixa |
| Grafo de expertise interativo | Baixa |
| Architecture Pipeline | Baixa |
| PWA | Baixa |
| Voice commands | Labs |
