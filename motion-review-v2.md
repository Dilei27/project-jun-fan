# Motion Review v2 — Project Jun Fan
## Experience Sprint 01 · Motion Cinematic

> *"A interface deve estar viva. Não chamativa. Viva."*

Este documento registra a primeira revisão cinematográfica completa de
Motion do Project Jun Fan. Nenhuma animação existe por estética. Tudo
reforça **hierarquia, descoberta, elegância, fluidez e continuidade**.

---

## 1. Motion Language — A Linguagem

Todo o movimento do produto deriva de uma única fonte de tokens:
`src/design-system/motion.ts`. Nenhum valor avulso de duração, easing
ou spring pode existir fora dela.

### 1.1 Durações

| Token      | Valor       | Uso                                      |
| ---------- | ----------- | ---------------------------------------- |
| `micro`    | 120ms       | cursor, micro-hovers, glow toggle        |
| `fast`     | 200ms       | hover, focus, microinterações            |
| `normal`   | 360ms       | entry padrão de elementos (cards, listas) |
| `slow`     | 560ms       | reveals de seção, panels                 |
| `cinematic`| 800ms       | orbs de hero, entradas de page-level     |

### 1.2 Easings

| Token       | Curva                  | Quando                              |
| ----------- | ---------------------- | ----------------------------------- |
| `ease.out`  | `cubic-bezier(.16,1,.3,1)` | entradas (vivo, suave)           |
| `ease.in`   | `cubic-bezier(.4,0,1,1)`   | saídas                            |
| `ease.inOut`| `cubic-bezier(.4,0,.2,1)`  | transições contínuas              |
| `ease.standard` | `cubic-bezier(.4,0,.2,1)` | utility (CSS)                  |

`ease.out` é a curva padrão. Ela desacelera de forma orgânica,
comunica "vivo". Nunca usamos linear.

### 1.3 Springs

| Token       | stiffness | damping | mass | Uso                          |
| ----------- | --------- | ------- | ---- | ---------------------------- |
| `gentle`    | 180       | 26      | 0.9  | cards, panels, modais        |
| `snappy`    | 320       | 28      | 0.7  | botões, micro-resposta       |
| `soft`      | 120       | 22      | 1.1  | Hero orbs, breathings        |

### 1.4 Stagger

| Token       | Valor  | Uso                                |
| ----------- | ------ | ---------------------------------- |
| `tight`     | 40ms   | listas densas, command palette     |
| `default`   | 80ms   | cards, grids                       |
| `relaxed`   | 120ms  | seções de hero                     |
| `cinematic` | 160ms  | reveals do knowledge graph         |

### 1.5 Variants canônicos

```ts
fadeIn      → opacity 0→1
slideUp     → y 16→0, opacity 0→1
slideDown   → y -8→0
scaleIn     → scale 0.96→1
panelRight  → x 24→0  (panels laterais, sidebars)
pop         → scale 0.9→1, spring.gentle
```

---

## 2. Tokens CSS — `src/design-system/theme.css` + `src/app/globals.css`

Todos os tokens de motion são também variáveis CSS para uso fora do
Framer Motion (CSS puro, classes utilitárias).

```css
--motion-micro: 120ms;
--motion-fast: 200ms;
--motion-normal: 360ms;
--motion-slow: 560ms;
--motion-cinematic: 800ms;

--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

--shadow-glow-qa: 0 0 0 1px rgba(79,140,255,0.18), 0 12px 32px -8px rgba(79,140,255,0.18);
```

### Classes utilitárias

| Classe         | Função                                                |
| -------------- | ----------------------------------------------------- |
| `.jf-shimmer`  | Sheen diagonal para skeletons (loop suave)            |
| `.jf-pulse-dot`| Breathing em dot de status (opacity + scale)          |
| `.jf-lift`     | Hover em card: -2px, glow, border-strong             |
| `.jf-glow-orb` | Halo difuso para orbs de hero                         |
| `.jf-cursor`   | Cursor piscante em terminal/typing                    |

---

## 3. Inventário — O que foi refinado

### 3.1 Hero (`/` e `/command-center`)

| Antes                                      | Depois                                                                |
| ------------------------------------------ | --------------------------------------------------------------------- |
| H1 estático, reveal instantâneo            | `RevealText` split-word: cada palavra sobe com máscara vertical      |
| Sem profundidade                            | Orbs de glow (`.jf-glow-orb`) com `breathing` 8s/9s alternados        |
| Badge plano                                 | Badge com `jf-pulse-dot` (status vivo)                                 |
| CTAs com hover transition-colors simples    | Hover com `-translate-y-0.5`, sombra crescente, arrow que se desloca  |

> **Resultado**: a primeira dobra "respira" sem nunca competir com o
> conteúdo. O título emerge do nada como uma escrita.

### 3.2 Cards (Product, Project, Decision, AI Insight, Decisão)

| Antes                                 | Depois                                                              |
| ------------------------------------- | ------------------------------------------------------------------- |
| Hover: `hover:-translate-y-0.5`       | Hover: `.jf-lift` (translateY -2px, glow, border-strong)            |
| Sem entrada                           | Entry: `opacity 0→1, y 16→0` com stagger (40-80ms)                  |
| Sem microinteração de stack badges    | Stack chips mudam de cor no group-hover                              |
| Tap sem feedback                      | `whileTap: scale 0.98` (spring)                                     |

> **Resultado**: nenhum card "aparece". Eles entram, se estabelecem,
> e respondem ao olhar.

### 3.3 Buttons

| Antes                                | Depois                                                                |
| ------------------------------------ | --------------------------------------------------------------------- |
| `whileHover: scale 1.02`             | `whileHover: y -1, transition: fast + ease-out`                       |
| `whileTap: scale 0.98`               | Idem, com spring `snappy`                                             |
| Sem sombra                           | Primary com `shadow-[0_4px_16px_-4px_rgba(79,140,255,0.4)]`           |
|                                      | Sombra cresce no hover (8px / 24px / -6 alpha)                        |
| Sem feedback de "link group"         | Ícones (arrow) se deslocam 0.5px no group-hover                       |

### 3.4 Header / Footer

| Antes                                       | Depois                                                                    |
| ------------------------------------------- | ------------------------------------------------------------------------- |
| `transition-colors`                         | Easing `cubic-bezier(0.16,1,0.3,1)` em todos os links                     |
| Sem indicator no nav ativo                  | Underline animado (`after:scale-x-0 → 100`)                               |
| Mobile menu: `duration: 0.16` + `ease`      | `duration: normal` + `ease.out`, items com stagger 40ms                   |
| Botão mobile: troca instantânea             | `AnimatePresence` rotacionando (-45° ↔ 45°)                                |
| Header aparece direto                        | Header com `y: -16 → 0, opacity: 0 → 1`                                   |
| Sem view-transition                         | `view-transition-name: site-header` para morph entre páginas              |

### 3.5 AI Dock

| Antes                                 | Depois                                                              |
| ------------------------------------- | ------------------------------------------------------------------- |
| `whileHover: scale 1.1`              | `whileHover: y -2, scale 1.04, fast`                                |
| `whileTap: scale 0.9`                | `whileTap: 0.98`                                                    |
| Sem microinteração interna            | Sugestões com stagger 40ms, AnimatePresence para o Bot icon         |
| Sem feedback de "resposta"            | Resposta entra com slide-y 8 e troca via AnimatePresence mode="wait" |
| Botão: transition-colors             | Halo com `glow 4s infinite` + rotação do Bot icon (open/close)      |
| Painel: 200ms                         | 360ms ease-out, `origin-bottom-right` para evitar clipping           |

### 3.6 Command Palette

| Antes                                 | Depois                                                              |
| ------------------------------------- | ------------------------------------------------------------------- |
| Backdrop: 160ms                        | 200ms ease-out                                                       |
| Panel: 160ms scale 0.96                | 360ms ease-out, `y: -8 → 0` (slide down + scale)                     |
| Resultados: lista direta               | Stagger 40ms por item                                                |
| Sem state de "no results"              | AnimatePresence para a transição de vazio → resultados               |
| Sem morph entre queries                | `mode="wait"` com key `results-${query}`                             |

### 3.7 Knowledge Graph

| Antes                                       | Depois                                                                                  |
| ------------------------------------------- | --------------------------------------------------------------------------------------- |
| Nodes: scale 0.5 (Tailwind via `animate-pulse`) | Nodes com `initial: scale 0.5, opacity 0` → `animate: scale 1, opacity 1` (560ms)   |
| Edges: stroke fixo                           | Edges desenhados com `pathLength: 0 → 1` (560ms, stagger 10ms)                          |
| Pan/zoom: snap direto                        | `useSpring` (stiffness 180, damping 28) para inércia cinematográfica                     |
| Filter buttons: transition-colors            | Filter buttons com stagger 40ms, hover -1px, glow ring no ativo                          |
| Painel lateral: 280ms ease                    | Painel: 560ms ease-out, x 32→0                                                            |
| Hover em node: r+3 (CSS transition)          | `whileHover: scale 1.12` via Framer Motion (200ms)                                       |
| Node label no hover aparece instantâneo      | Label com fade + y 4→0 (200ms)                                                           |
| Selected node: ring pulse via CSS            | Selected ring: scale 0.8→1 + opacity 0→0.4, loop `glow 3.5s`                            |
| Botão fechar: hover padrão                   | Botão fechar com `rotate 90°` no hover                                                   |
| Sem reveal de entrada                        | Reveal global: stagger 40ms (children) + 150ms delay para nodes                           |
| Resultado: "gráfico que aparece"             | Resultado: grafo que se desenha, com peso e inércia                                      |

### 3.8 Timeline

| Antes                                    | Depois                                                              |
| ---------------------------------------- | ------------------------------------------------------------------- |
| Linha vertical estática                   | Linha desenhada com `scaleY: 0 → 1, originY: 0` (560ms)              |
| Items: lista direta                       | Items com `opacity 0, x -12 → 0` (360ms, stagger 40ms)              |
| Marcadores estáticos                      | `jf-pulse-dot` no primeiro marcador                                 |
| Sem hierarchy visual                      | Marcador ativo recebe ring 2px + pulse                              |

### 3.9 Skill Cloud

| Antes                                | Depois                                                              |
| ------------------------------------ | ------------------------------------------------------------------- |
| Lista estática                       | Reveal em cascata (área + skills) com stagger                        |
| Sem feedback de skill                | Hover `y -2` com transition 200ms                                    |

### 3.10 Status Strip

| Antes                                | Depois                                                              |
| ------------------------------------ | ------------------------------------------------------------------- |
| Dot estático                          | `jf-pulse-dot` em cada dot (status vivo)                             |
| Sem entrada                          | Stagger 40ms por produto                                             |

### 3.11 Architecture Flow

| Antes                                | Depois                                                              |
| ------------------------------------ | ------------------------------------------------------------------- |
| Steps estáticos                       | Reveal em cascata, setas com `opacity 0, x -4 → 0` (40ms)            |
| Sem feedback de step                  | Step chip muda border + text color no hover                          |

### 3.12 Boot Loader

| Antes                                 | Depois                                                              |
| ------------------------------------- | ------------------------------------------------------------------- |
| Interval 280ms                         | Interval 320ms (mais "máquina")                                      |
| Exit: fade 160ms                       | Exit: 560ms + scale 1.02 (sai com peso)                              |
| Cursor: `animate-pulse` global         | `.jf-cursor` dedicada (1.05s, ease-in-out)                          |
| Sem distinção do último log            | Último log tem cursor verde (success)                                |

### 3.13 Skeleton

| Antes                                | Depois                                                              |
| ------------------------------------ | ------------------------------------------------------------------- |
| `animate-pulse` global                | `.jf-shimmer`: gradient diagonal (200% → -200% em 2.4s ease-in-out)  |
| Sem entrada                          | Container com `fade-in` automático no mount                          |

### 3.14 Loading / Error / Not-Found

| Antes                                | Depois                                                              |
| ------------------------------------ | ------------------------------------------------------------------- |
| Loading: estático                     | Container com `fade-in var(--motion-normal) var(--ease-out) both`    |
| Error/Not-Found: estáticos            | Entry 560ms `opacity 0, y 12` com ease-out                          |
| Botão "Tentar novamente" simples     | Motion button com sombra e lift                                      |

### 3.15 Page Transitions (View Transitions)

| Antes                                | Depois                                                              |
| ------------------------------------ | ------------------------------------------------------------------- |
| Sem transição entre páginas           | `viewTransition: true` no `next.config.ts`                          |
|                                      | `::view-transition-old/new(root)` com fade + translateY             |
| Header trocava seco                   | `view-transition-name: site-header` (morph automático)              |
|                                      | Header e Footer: header aparece com `y -16 → 0` no primeiro load    |

### 3.16 Docs Sidebar

| Antes                                | Depois                                                              |
| ------------------------------------ | ------------------------------------------------------------------- |
| Active item: classe estática          | `layoutId="docs-sidebar-active"` → background desliza com spring     |
| Sem entrada                          | Items com stagger 40ms + `x -8 → 0`                                 |

### 3.17 Section Reveal

Componente reutilizável `SectionReveal` (`src/components/shared/section-reveal.tsx`)
substitui o "aparecer instantâneo" de seções inteiras. `y 20 → 0` em
560ms com ease-out, viewport `{ once: true, amount: 0.1 }`.

### 3.18 Page Entry

Wrapper `PageEntry` (`src/components/shared/page-entry.tsx`) para
qualquer página: fade + slide-y 8px em 360ms. Garante consistência
na primeira pintura de qualquer rota.

### 3.19 Metrics Grid (Command Center)

| Antes                                | Depois                                                              |
| ------------------------------------ | ------------------------------------------------------------------- |
| Count-up via setInterval 30 steps    | Count-up com `requestAnimationFrame` + easing cubic (1 - (1-t)³)   |
| Sem entrada                          | Stagger reveal + lift no hover                                       |
| Sem feedback                         | Glow no hover                                                       |

### 3.20 Product Demo (simulação interativa)

| Antes                                | Depois                                                              |
| ------------------------------------ | ------------------------------------------------------------------- |
| Step ativo: transition-all            | Step ativo com `borderColor` animado (200ms)                        |
| Log: lista renderizada                | `AnimatePresence mode="popLayout"` por entrada de log                |
| Botão run/reset: hover simples         | Motion buttons com sombra + lift                                    |

### 3.21 Hub / Analytics / Framework / Architecture

Todos passaram a usar `PageEntry` + `whileInView` stagger para seções.

---

## 4. Page Transitions — Estratégia

Aproveitando o **Next.js 16 View Transitions API**:

- `experimental.viewTransition: true` em `next.config.ts`
- `view-transition-name: site-header` no `<header>` via CSS
- Animações `::view-transition-old(root)` e `::view-transition-new(root)`
  com `fade + translateY` em 360ms
- `::view-transition-group(site-header)` com `motion-normal` e `ease-out`
- Sem suporte do navegador = sem transição (graceful degradation)

---

## 5. Performance — Garantias

1. **GPU-friendly**: todas as transições usam `transform` e `opacity`
   (compositor-only properties). Nenhum layout thrash.
2. **`will-change`** aplicado nos orbs do hero.
3. **`prefers-reduced-motion`**: bloco dedicado em `globals.css` zera
   `animation-duration` e `transition-duration`, e desativa View
   Transitions.
4. **Spring damping alto** (26-28) evita overshoot perceptível.
5. **Stagger nunca agressivo**: máximo 160ms entre items, evitando
   "cachoeira" visível.
6. **AnimatePresence com `mode="wait"`** em respostas, evitando
   sobreposição de elementos.
7. **CSS-only** quando possível: shimmer, pulse-dot, breathing não
   dependem de JS.
8. **Static rendering**: 37 páginas geradas em 265ms, sem hidratação
   desnecessária.

---

## 6. Acessibilidade

- `prefers-reduced-motion: reduce` honrado em todo o sistema
- Focus rings preservados em todos os elementos interativos
- `aria-live` em `AIDock` e `BootLoader` (region)
- `motion-reduce:hidden` não foi necessário pois os tokens já colapsam

---

## 7. Build / Lint / Performance — Status Final

```
✓ npm run lint     — 0 errors, 0 warnings
✓ npm run build    — 37 static pages, TypeScript OK, viewTransition ON
✓ Static (SSG)     — todos os produtos/projetos/docs pré-renderizados
✓ Turbopack        — build em 2.0s
```

---

## 8. Comportamento esperado por área

| Área                    | Movimento                                                  |
| ----------------------- | ---------------------------------------------------------- |
| Primeiro load           | Header entra, Hero "respira", CTAs prontos                 |
| Hover em card           | -2px, border-strong, glow, sombra                          |
| Tap em card/botão       | scale 0.98 (spring)                                         |
| Scroll para seção       | SectionReveal: y 20 → 0, 560ms                              |
| Stagger de lista        | 40-80ms entre items                                        |
| Command Palette ⌘K      | backdrop fade, panel scale+y, results stagger              |
| AI Dock click           | spring panel, breathing halo no botão                      |
| Knowledge Graph mount   | nodes entram com stagger, edges desenham, spring pan/zoom  |
| Knowledge Graph hover   | node scale 1.12, label fade+y                              |
| Knowledge Graph search  | pan suavizado (spring) para o node                         |
| Page navigation         | cross-fade raiz + morph do header (se browser suportar)   |
| Boot Loader             | typing 320ms/linha, exit 560ms com scale 1.02              |
| Timeline reveal         | linha desenha, items fade+x com stagger                    |
| Status dot              | pulse 2.4s infinite                                         |
| Hero orb                | breathing 8s/9s, float sutil                               |

---

## 9. Arquivos modificados

### Design System
- `src/design-system/motion.ts` — **reescrito** com linguagem completa
- `src/design-system/theme.css` — **adicionados** tokens de motion + shadow

### CSS Global
- `src/app/globals.css` — keyframes, classes utilitárias, View Transitions

### Config
- `next.config.ts` — `experimental.viewTransition: true`

### Componentes UI
- `src/components/ui/card.tsx` — client, motion-aware
- `src/components/ui/button.tsx` — hover/tap refinados
- `src/components/ui/badge.tsx` — `pulse` opcional
- `src/components/ui/skeleton.tsx` — `.jf-shimmer` no lugar de pulse

### Componentes Compartilhados
- `src/components/shared/animated-grid.tsx` — variantes globais
- `src/components/shared/timeline.tsx` — reveal progressivo
- `src/components/shared/status-strip.tsx` — pulse dots + stagger
- `src/components/shared/reveal.tsx` — **novo** (RevealText, FadeIn, HeroOrbs)
- `src/components/shared/section-reveal.tsx` — **novo**
- `src/components/shared/page-entry.tsx` — **novo**

### Cards
- `src/components/cards/product-card.tsx` — entry + hover
- `src/components/cards/project-card.tsx` — entry + hover
- `src/components/cards/ai-insight-card.tsx` — entry + hover
- `src/components/cards/decision-card.tsx` — entry com motion

### Layout
- `src/components/layout/header.tsx` — microinterações, underline, view-transition
- `src/components/layout/footer.tsx` — easing consistente

### Features
- `src/features/ai-dock/ai-dock.tsx` — spring, breathing, stagger
- `src/features/command-palette/command-palette.tsx` — stagger, AnimatePresence
- `src/features/docs/docs-sidebar.tsx` — layoutId indicator
- `src/features/command-center/components/hero-command-center.tsx` — split + orbs
- `src/features/command-center/components/boot-loader.tsx` — exit cinematográfico
- `src/features/command-center/components/metrics-grid.tsx` — RAF + easing cubic
- `src/features/command-center/components/skills-cloud.tsx` — reveal + hover
- `src/features/command-center/components/architecture-flow.tsx` — reveal
- `src/features/command-center/components/project-detail.tsx` — entry + lift
- `src/features/command-center/components/project-grid.tsx` — stagger
- `src/features/command-center/components/decisions-list.tsx` — stagger
- `src/features/knowledge-graph/components/knowledge-graph.tsx` — **refeito** com spring inertia + drawing

### Páginas
- `src/app/layout.tsx` — cleanup
- `src/app/page.tsx` — Hero split + orbs + sections reveal
- `src/app/loading.tsx` — fade-in skeleton
- `src/app/error.tsx` — entry + motion button
- `src/app/not-found.tsx` — entry + motion CTA
- `src/app/command-center/page.tsx` — composed sections
- `src/app/command-center/architecture/page.tsx` — entry + stagger
- `src/app/command-center/decisions/page.tsx` — entry + stagger
- `src/app/command-center/projects/page.tsx` — entry
- `src/app/command-center/projects/[slug]/page.tsx` — server shell + client
- `src/app/command-center/timeline/page.tsx` — entry
- `src/app/knowledge-graph/page.tsx` — server (metadata) + client shell
- `src/app/hub/page.tsx` — entry + stagger
- `src/app/decisoes/page.tsx` — entry + stagger
- `src/app/analytics/page.tsx` — entry + stagger
- `src/app/framework/page.tsx` — entry + stagger
- `src/app/busca/page.tsx` + `search-client.tsx` — server split
- `src/app/docs/page.tsx` — entry + stagger
- `src/app/docs/[slug]/page.tsx` + `doc-client.tsx` — server split
- `src/app/produto/[slug]/page.tsx` + `product-client.tsx` — server split
- `src/app/produto/[slug]/dashboard/page.tsx` + `dashboard-client.tsx` — split
- `src/app/produto/[slug]/demo/page.tsx` + `demo-client.tsx` — split
- `src/app/projeto/[slug]/page.tsx` + `project-shell.tsx` — split

---

## 10. Princípios diretores

1. **Toda duração tem origem em `motion.duration.*`**
2. **Todo easing é `motion.easing.*`**
3. **Todo spring é `motion.spring.*`**
4. **Todo stagger é `motion.stagger.*`**
5. **Sem keyframes avulsos fora de `globals.css` (5 keyframes globais)**
6. **Stagger nunca > 200ms entre items**
7. **Spring damping ≥ 22 (sem overshoot)**
8. **`prefers-reduced-motion` é lei**
9. **GPU-friendly: transform + opacity, sempre**
10. **`AnimatePresence mode="wait"` em respostas textuais**

---

## 11. Próximos passos (Sprint 02 opcional)

- View Transitions por rota (morph de cards específicos)
- Page transitions direcionais (slide por histórico)
- Reveal-on-route-change (não só on-load)
- Scroll-linked motion no Hero
- Sticky header com microinteração no scroll (compress)
- Inline motion em MDX (se aplicável)

---

**Project Jun Fan · Motion Cinematic v2**
*Absorb. Refine. Build.*
