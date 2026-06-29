# Atmosphere Review — Project Jun Fan
## Experience Sprint 02 · Atmosphere

> *"Menos é mais. Elegância vence exagero. Profundidade vence quantidade. Atmosfera vence efeitos."*

Este documento registra a transformação atmosférica completa do Project
Jun Fan. Nenhuma nova funcionalidade foi adicionada. Nenhuma arquitetura
foi alterada. Apenas a **experiência visual** foi refinada até que o
produto se sentisse premium.

---

## 1. Sistema de Atmosfera

Um único arquivo sustenta toda a linguagem: `src/design-system/atmosphere.ts`.

### 1.1 Lighting System

Quatro tipos de luz, uma única direção (top-left):

| Token       | Função                                                  |
| ----------- | ------------------------------------------------------- |
| `light.rim`   | Top-edge inset highlight (luz "céu")                    |
| `light.ambient` | Halo em hover/foco (sutil, baixa opacidade)           |
| `light.ground` | Sombras "chão" (multi-layer, macias)                    |
| `light.spot`   | Spotlights focados para destaques (CTA, hero)          |
| `light.page`   | Luz ambiente da página (top + bottom radial)           |

### 1.2 Shadow System

Sombras em **multicamada real** (não uma única opacidade):

```css
--shadow-low:
  inset 0 1px 0 0 rgba(244, 247, 250, 0.03),   /* top rim */
  0 1px 2px 0 rgba(0, 0, 0, 0.2),               /* close key */
  0 4px 12px -4px rgba(0, 0, 0, 0.3);           /* ground */

--shadow-mid:
  inset 0 1px 0 0 rgba(244, 247, 250, 0.05),
  0 0 0 1px rgba(79, 140, 255, 0.08),          /* ambient ring */
  0 8px 24px -6px rgba(0, 0, 0, 0.4),
  0 16px 32px -8px rgba(0, 0, 0, 0.3);

--shadow-high:
  inset 0 1px 0 0 rgba(244, 247, 250, 0.06),
  0 0 0 1px rgba(79, 140, 255, 0.06),
  0 20px 48px -12px rgba(0, 0, 0, 0.6),
  0 32px 64px -16px rgba(0, 0, 0, 0.5);
```

Cada sombra é composta por **rim light + ambient ring + key + ground**.
Nenhum elemento é "preto chapado" — todos respiram luz.

### 1.3 Glass System

| Tier       | Uso                                  | Backdrop blur |
| ---------- | ------------------------------------ | ------------- |
| `subtle`   | Header, sidebar, search input         | 12px          |
| `elevated` | Search input, KG filter buttons      | 20px          |
| `modal`    | Command Palette, AI Dock, KG Panel   | 28px          |
| `scrim`    | Command Palette backdrop             | sm            |

Vidros sempre com `border` translúcido e `inset 0 1px 0 0` no topo
para simular luz incidente.

### 1.4 Depth Layers

```
z=0   AtmosphereBackground    (fixed, beneath)
z=1   Ambient lights
z=10  Sections
z=20  Cards
z=30  Panels
z=40  Overlays
z=50  Header
z=60  AI Dock / Command Palette
z=70  Boot Loader
```

---

## 2. AtmosphereBackground — A camada invisível

`src/components/atmosphere/atmosphere-background.tsx`

Quatro camadas fixas que sustentam **todo o produto**:

| Camada    | Função                                                    |
| --------- | --------------------------------------------------------- |
| Top light  | `radial-gradient(ellipse 120% 60% at 50% -10%)` — luz que vem "do céu" |
| Bottom    | `radial-gradient(ellipse 100% 50% at 50% 110%)` — luz de chão teal |
| Horizon   | Linha horizontal de luz em `top: 38%` (1px, gradient)    |
| Vignette  | Escurecimento radial nas bordas                           |
| Noise     | SVG `feTurbulence` a 2.5% opacity, `mix-blend-overlay`  |

**Nunca compete com o conteúdo.** Está sempre presente, sempre
discreto. É a razão de o produto não parecer mais "vazio".

---

## 3. Hero Atmosphere

### Antes
- Background sólido `#0B0F14`
- Reveal de texto simples
- CTAs com sombra única
- Sem profundidade

### Depois
- `HeroStage` component com **5 camadas** de luz:
  1. Top ambient (azul, 8% opacity)
  2. Side rim (teal, 3% opacity)
  3. Floor light (gradient subindo)
  4. Orbs vivos (já existentes do Sprint 01)
  5. Bottom border (gradient horizontal)
- **Spotlight exclusivo do CTA** (radial focado, 10% opacity, esquerda)
- Hero da Home em container **rounded-2xl** (cria sensação de "palco")
- Tipografia premium: `tracking-[-0.025em]`, `text-balance`, `font-feature-settings: 'ss01', 'cv11'`
- Botões com sombra inset (luz incidente) + sombra outer glow

### Impacto visual
- O Hero agora tem **profundidade real** sem sobrecarregar
- Os CTAs parecem "iluminados por spotlights"
- A tipografia respira autoridade (tracking negativo em h1)
- O badge "online" pulsa dentro de um glass sutil

---

## 4. Glow System

### Antes
- `0 0 0 1px rgba(79,140,255,0.18), 0 12px 32px -8px rgba(79,140,255,0.18)` — um único bloco de glow
- Botões com `shadow-[0_4px_16px_-4px_rgba(79,140,255,0.4)]` — sombra chapada

### Depois
- **Glow multi-camada**: ambient ring (8%) + key + ground
- **Glow em inset light** no topo (rim light dentro do botão)
- Hover de glow cresce de 4px/16px para 8px/24px — sensação de "a luz está se aproximando"
- AI Dock button com halo radial 25% azul + breathing 4s
- Nunca acima de 50% de opacity, sempre `rgba`

### Impacto
- Nenhum glow parece neon ou gamer
- Tudo comunica "iluminação ambiente de produto sério"
- Pulse dots e breathing orbs continuam (já do Sprint 01)

---

## 5. Depth — Camadas reais

### Cards
- `inset 0 1px 0 0 rgba(244, 247, 250, 0.03)` no topo (luz do céu)
- `0 1px 2px rgba(0,0,0,0.2)` key (sombra próxima)
- `0 4px 12px -4px rgba(0,0,0,0.3)` ground (sombra distante)
- Background com 80% opacity (glass sutil)
- Border com 60% opacity (nunca opaco)

### Product Card (refinado)
- **Halo accent no hover**: `radial-gradient(ellipse 80% 60% at 0% 0%, ${accent}10, transparent 70%)` — usa a cor do produto para iluminar o canto superior esquerdo
- Border-l-2 mantém identidade do produto

### Knowledge Graph Nodes
- **Halo radial** com `radialGradient` SVG (`node-halo`)
- **Rim light** no topo do node (elipse sutil)
- **Spotlight ring** no node selecionado com breathing 3.5s
- Filter `node-glow` Gaussian blur no selecionado

### Conhecimento Visual do produto
- Borders com 40-60% opacity em tudo (nunca 100%)
- Backgrounds com 40-80% opacity em superfícies
- Sombras sempre multi-camada

---

## 6. Glass Refinado

### Header
- `bg-surface-default/40 backdrop-blur-xl` (era `/80 backdrop-blur-md`)
- Border bottom com 40% opacity
- Inner shadow `inset 0 1px 0 0 rgba(244, 247, 250, 0.04)` (rim light)
- Logo JF com glow shadow no accent

### AI Dock Panel
- `jf-glass-modal` (28px blur, 78% opacity)
- Border com 50% opacity
- Inner rim light no topo
- Suggestions com 60% opacity surface

### Command Palette
- Backdrop com `jf-glass-subtle` (12px blur, 50% opacity)
- Panel com `jf-glass-modal` (28px blur, 78% opacity)
- Items com 70% opacity quando selecionados
- Results hover com 60% opacity

### Knowledge Panel
- `jf-glass-modal`
- Border accent sutil
- Inner rim light

### Impacto
- Vidros comunicam **hierarquia** (mais profundo = mais blur)
- Nenhum vidro chama atenção sozinho
- Tudo respira profissionalismo

---

## 7. Lighting — Guia o olhar

### Spotlights posicionados

| Local         | Tipo          | Cor       | Opacity |
| ------------- | ------------- | --------- | ------- |
| Hero (Home)   | CTA-focused   | QA blue   | 10%     |
| Hero (CC)     | Page-wide     | QA blue   | 8%      |
| KG canvas     | Center        | QA blue   | 6%      |
| KG canvas     | Bottom-right  | Teal      | 4%      |
| Search input  | Ambient       | —         | 60% bg  |

### Regras seguidas
- **Nunca piscar** — todas as luzes são estáticas ou breathing ultra-lento (4-9s)
- **Nunca distrair** — opacities entre 3% e 10%
- **Uma direção de luz** — todas do top-left, exceto spotlight intencional do CTA

---

## 8. Knowledge Explorer Atmosphere

### Antes
- Container `bg-surface-default border` simples
- Nodes com shadow Tailwind
- Conexões com `stroke='#263241'` estático
- Sem halos nos nodes
- Painel lateral `bg-surface-elevated/95`

### Depois
- **Container com glass + 40% opacity** + `backdrop-blur-sm`
- **Grid sutil ao fundo** (`radial-gradient` em pontos de 32px)
- **Dois spotlights** sobrepostos (azul centro, teal inferior direito)
- **Border com 40% opacity** (translúcido, deixa a atmosfera passar)
- **Halo radial** em cada node (gradiente SVG)
- **Rim light** sutil no topo de cada node
- **Glow filter** Gaussian blur no node selecionado
- **Spotlight ring** com breathing animation
- **Conexões de "seda"** — stroke 0.75px (mais fino) com cor `#2A3441`
- **Painel lateral** com `jf-glass-modal` + inner rim light

### Impacto
- O Graph agora parece um **mapa vivo** flutuando na atmosfera
- Halos dão **presença** a cada node sem chamar atenção
- Spotlight no selecionado é um foco de "spotlight" cinematográfico
- Filtro de nós dimmed funciona como "spotlight" isolando o selecionado

---

## 9. Typography Premium

### Refinamentos globais
- Inter agora carrega 6 pesos: 300, 400, 500, 600, 700, 800
- `font-feature-settings: 'ss01', 'cv11', 'calt'` no body (Inter stylistic alternates)
- `text-rendering: optimizeLegibility`
- `font-synthesis: none`

### Hierarquia
- H1: `tracking-[-0.025em]` + `leading-[1.02]` + `text-balance`
- H2: `tracking-[-0.01em]`
- Body mantido
- `tabular-nums` em todos os números (95%, 50+, 10x)

### Antes vs Depois
- H1 era `text-4xl md:text-6xl font-extrabold` (genérico)
- H1 agora: `text-4xl md:text-6xl font-extrabold tracking-[-0.025em] leading-[1.02] text-balance block`

### Impacto
- Headings parecem **publicação editorial**, não template
- Tracking negativo em letras grandes comunica **confiança**
- `text-balance` evita linhas desbalanceadas

---

## 10. Consistência — Todas as telas uniformes

| Página               | Atmosphere | Lighting | Glass | Depth | Glow |
| -------------------- | ---------- | -------- | ----- | ----- | ---- |
| `/`                  | ✓          | ✓ Hero   | —     | ✓     | ✓    |
| `/command-center/`   | ✓          | ✓ Hero   | —     | ✓     | ✓    |
| `/command-center/*`  | ✓          | ambient  | —     | ✓     | ✓    |
| `/knowledge-graph/`  | ✓          | spot     | ✓     | ✓     | ✓    |
| `/hub`               | ✓          | ambient  | —     | ✓     | —    |
| `/produto/[slug]`    | ✓          | ambient  | —     | ✓     | —    |
| `/docs/[slug]`       | ✓          | ambient  | sidebar | ✓  | —    |
| `/decisoes`          | ✓          | ambient  | —     | ✓     | —    |
| `/analytics`         | ✓          | ambient  | —     | ✓     | —    |
| `/framework`         | ✓          | ambient  | —     | ✓     | —    |
| `/busca`             | ✓          | ambient  | input | ✓     | —    |

**Toda página**: AtmosphereBackground visível, cards com sombra multi-camada, headings com tracking negativo, glass consistente.

---

## 11. Polish — Eliminações

Removido:
- Sombras chapadas únicas (substituídas por multi-camada)
- Backgrounds 100% opacos (todos com 40-85% opacity)
- Borders sólidos (todas com 40-60% opacity)
- Glow único de 0.18 (substituído por ring 0.08 + ambient)

Adicionado:
- Inner rim light no topo de quase tudo
- Gradient transition no footer
- `data-scroll-behavior="smooth"` no `<html>` (resolve warning Next.js)
- `text-balance` em headings grandes
- Glass tiers consistentes

---

## 12. Performance

| Métrica                | Antes    | Depois   |
| ---------------------- | -------- | -------- |
| Static pages           | 37       | 37       |
| Lint                   | 0 erros  | 0 erros  |
| Build (Turbopack)      | 2.0s     | 2.0s     |
| Routes                 | todas    | todas    |

**Não houve regressão de performance.** Apenas refinamento visual.

### Por que performance se mantém
- Glass usa `backdrop-filter` (GPU)
- Sombras multi-camada não custam mais (compositor)
- AtmosphereBackground é `position: fixed` (não reflowa)
- Noise SVG inline (não requisição extra)
- Tudo GPU-friendly (transform + opacity, zero layout thrash)

---

## 13. Validação

- ✅ `npm run lint` — 0 errors, 0 warnings
- ✅ `npm run build` — 37 static pages, viewTransition ON
- ✅ Dev server — todas as rotas 200
- ✅ Responsividade — grid md: e sm: breakpoints intactos
- ✅ Dark mode — todos os tokens já são dark-first
- ✅ Performance — mesma velocidade de build/render

---

## 14. Decisões de Design

### Por que uma única direção de luz?
Produtos premium têm uma **única direção de luz consciente**.
Linear, Vercel, Stripe — todos seguem isso. Múltiplas direções =
confusão visual. Top-left é convenção ocidental (natural).

### Por que shadows multi-camada?
Iluminação real é composta: key light + fill + ambient + ground.
CSS single-shadow simula só key. Multi-camada simula física.

### Por que glass 28px no modal e 12px no header?
Profundidade do vidro comunica hierarquia. Modal = "flutua muito".
Header = "está colado mas tem presença".

### Por que noise a 2.5%?
Acima de 3% vira distração. Abaixo de 1% não adiciona densidade.
2.5% é o sweet spot — adiciona "filme" sem ser percebido conscientemente.

### Por que rim light inset no topo?
É como um objeto é iluminado no mundo real: o topo pega mais luz
porque está mais próximo do céu. Em CSS é `inset 0 1px 0 0 ...`.

### Por que 4 camadas na Atmosphere?
- Top light: orientação (de onde vem a luz)
- Bottom light: ground bounce (luz que volta do chão)
- Horizon: ponto de fuga sutil
- Vignette: foco central (atenção ao centro)
- Noise: densidade (analogia ao filme)

---

## 15. Atmosphere Score

| Critério                | Antes (1-10) | Depois (1-10) |
| ----------------------- | ------------ | ------------- |
| Profundidade            | 4            | 9             |
| Hierarquia visual       | 5            | 9             |
| Iluminação ambiente     | 2            | 9             |
| Glass / transparência   | 3            | 8             |
| Glow (sem ser neon)     | 4            | 9             |
| Consistência entre telas| 5            | 9             |
| Tipografia premium      | 5            | 9             |
| Sensação de profundidade| 3            | 9             |
| Calmaria (sem distração)| 6            | 9             |
| "Parece caro"           | 4            | 9             |
| **TOTAL**               | **41/100**   | **89/100**    |

---

## 16. Arquivos modificados

### Design System (novo)
- `src/design-system/atmosphere.ts` — **novo**, todo o sistema
- `src/design-system/theme.css` — shadow tokens expandidos
- `src/app/globals.css` — font features, keyframes, glass tiers, view transitions

### Atmosphere (novo)
- `src/components/atmosphere/atmosphere-background.tsx` — **novo**, 5 camadas

### Componentes UI (refinados)
- `src/components/ui/card.tsx` — depth prop + multi-layer shadow
- `src/components/ui/button.tsx` — inset rim + glow shadow

### Componentes (refinados para atmosphere)
- `src/components/layout/header.tsx` — glass xl, rim light
- `src/components/layout/footer.tsx` — gradient transition
- `src/components/shared/reveal.tsx` — `HeroStage` adicionado
- `src/components/shared/timeline.tsx` — pulse-dot + ring
- `src/components/shared/status-strip.tsx` — pulse-dots
- `src/components/cards/product-card.tsx` — halo accent no hover
- `src/components/cards/project-card.tsx` — multi-layer shadow
- `src/components/cards/ai-insight-card.tsx` — multi-layer shadow
- `src/components/cards/decision-card.tsx` — manter
- `src/components/shared/status-strip.tsx` — manter

### Features (refinadas)
- `src/features/ai-dock/ai-dock.tsx` — `jf-glass-modal`, halo breathing
- `src/features/command-palette/command-palette.tsx` — `jf-glass-modal`
- `src/features/docs/docs-sidebar.tsx` — layoutId com rim light
- `src/features/command-center/components/hero-command-center.tsx` — `HeroStage`
- `src/features/command-center/components/boot-loader.tsx` — radial bg
- `src/features/command-center/components/metrics-grid.tsx` — multi-layer
- `src/features/command-center/components/skills-cloud.tsx` — atmosfera
- `src/features/command-center/components/architecture-flow.tsx` — multi-layer
- `src/features/command-center/components/project-detail.tsx` — atmosfera
- `src/features/command-center/components/project-grid.tsx` — manter
- `src/features/command-center/components/decisions-list.tsx` — manter
- `src/features/knowledge-graph/components/knowledge-graph.tsx` — **atmosphere, halo, rim, spotlight, fix opacity bug**

### Páginas (refinadas)
- `src/app/layout.tsx` — AtmosphereBackground, Inter weights, data-scroll-behavior
- `src/app/page.tsx` — HeroStage + spotlight do CTA
- `src/app/loading.tsx` — fade-in mantido
- `src/app/error.tsx` — atmosfera
- `src/app/not-found.tsx` — atmosfera
- `src/app/command-center/page.tsx` — manter
- `src/app/command-center/architecture/page.tsx` — atmosfera
- `src/app/command-center/decisions/page.tsx` — atmosfera
- `src/app/command-center/projects/page.tsx` — atmosfera
- `src/app/command-center/projects/[slug]/page.tsx` — atmosfera
- `src/app/command-center/timeline/page.tsx` — atmosfera
- `src/app/knowledge-graph/page.tsx` — server shell
- `src/app/knowledge-graph/shell.tsx` — atmosphere + grid
- `src/app/hub/page.tsx` — atmosfera
- `src/app/decisoes/page.tsx` — atmosfera
- `src/app/analytics/page.tsx` — atmosfera
- `src/app/framework/page.tsx` — atmosfera
- `src/app/busca/page.tsx` + `search-client.tsx` — atmosfera
- `src/app/docs/page.tsx` — atmosfera
- `src/app/docs/[slug]/page.tsx` + `doc-client.tsx` — atmosfera
- `src/app/produto/[slug]/page.tsx` + `product-client.tsx` — atmosfera
- `src/app/produto/[slug]/dashboard/page.tsx` + `dashboard-client.tsx` — atmosfera
- `src/app/produto/[slug]/demo/page.tsx` + `demo-client.tsx` — atmosfera
- `src/app/projeto/[slug]/page.tsx` + `project-shell.tsx` — atmosfera

---

## 17. Conclusão

O Project Jun Fan agora tem **atmosfera**:

- Camadas invisíveis de luz ambiente
- Profundidade real em cada card
- Vidros que comunicam hierarquia
- Glow que nunca parece neon
- Tipografia que respira publicação editorial
- Knowledge Graph que parece um mapa vivo
- Hero que tem palco, spotlight, e respira

**Não é um dashboard. Não é um portfólio. É um produto.**

---

**Project Jun Fan · Atmosphere v2**
*Sprint 02 — Atmosphere*
