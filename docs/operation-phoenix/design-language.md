# Design Language — Project Identity

> Regras permanentes de design para o Project Jun Fan.

---

## 1. Espaçamentos

### Regra Base
Escala de 4px. Todo espaçamento deve ser múltiplo de 4.

### Hierarquia de Espaçamento

| Contexto | Token | px | Uso |
|---|---|---|---|
| Micro | `space-1` | 4 | Entre ícone e texto em botões |
| Compacto | `space-2` | 8 | Entre tags, badges |
| Confortável | `space-3` | 12 | Entre label e conteúdo em cards |
| Padrão | `space-4` | 16 | Padding de cards, entre elementos |
| Seção | `space-6` | 24 | Entre blocos de conteúdo |
| Respiração | `space-8` | 32 | Entre seções principais |
| Hero | `space-12` | 48 | Padding de hero sections |

### Regras
- **Padding de card**: sempre `p-5` (20px) ou `p-4` (16px)
- **Entre seções**: `mb-16` (64px) padrão; íntimo `mb-10`
- **Grid gap**: `gap-4` (16px) padrão
- **White space generoso**: preferir mais espaço a menos

---

## 2. Hierarquia

### Headings

| Nível | Tamanho | Peso | Tracking | Uso |
|---|---|---|---|---|
| Display | 6xl (3.75rem) | extrabold (800) | tight (-0.02em) | Hero, páginas principais |
| H1 | 4xl (2.25rem) | extrabold (800) | tight | Título de página |
| H2 | 2xl (1.5rem) | semibold (600) | normal | Título de seção |
| H3 | lg (1.125rem) | semibold (600) | normal | Título de card |
| H4 | base (1rem) | semibold (600) | normal | Subtítulo de card |

### Regras de Heading
- H1 aparece UMA vez por página
- H2 heading de seção deve ter `mb-6` (24px)
- Subtítulos devem estar em `text-text-secondary`
- **Nunca** usar all-caps em headings (exceto labels)

---

## 3. Cards

### Estrutura Padrão
```
┌──────────────────────────────┐
│  padding: 20px (p-5)         │
│  bg: surface-default         │
│  border: border-subtle       │
│  radius: rounded-lg (12px)   │
│                              │
│  [icon] [title]    [badge]   │
│  description text            │
│  [tag] [tag] [tag]           │
└──────────────────────────────┘
```

### Variações

| Tipo | Hover | Accent | Uso |
|---|---|---|---|
| Default | `hover:bg-surface-elevated` | Não | Cards informativos |
| Product | `hover:bg-surface-elevated` | Sim (border-l-2) | ProductGateway |
| Interactive | `hover:bg-surface-elevated hover:-translate-y-0.5` | Opcional | Links, CTAs |
| Decision | Padrão + conteúdo detalhado | Não | Decision cards |

---

## 4. Containers

### Page Container
```css
max-width: 1440px;
padding: 0 24px (px-6);
margin: 0 auto;
```

### Section Container
```css
margin-bottom: 64px (mb-16);
```

### Hero Container
```css
padding: 80px 0 (py-20) a 112px 0 (py-28);
```

---

## 5. Bordas

| Tipo | Token | Cor | Uso |
|---|---|---|---|
| Sutil | `border` | `border-subtle` | Cards, containers |
| Forte | `border` | `border-strong` | Hover state, destaque |
| Acento | `border-l-2` | Cor do produto | ProductCards |
| Seção | `border-t` | `border-subtle` | Divisor entre seções |

---

## 6. Radius

| Token | Valor | Uso |
|---|---|---|
| `rounded-sm` | 8px | Inputs, botões pequenos |
| `rounded-md` | 12px | **PADRÃO** — cards, containers |
| `rounded-lg` | 16px | Cards grandes, modais |
| `rounded-xl` | 24px | AI Dock, Command Palette |
| `rounded-full` | 9999px | Badges, dots de status |

---

## 7. Blur & Glow

### Glow (Background)
```css
/* Apenas em hero sections */
absolute w-80 h-80 rounded-full bg-[accent-color]/5 blur-3xl
```

### Regras de Glow
- Máximo de 2 glows por página
- Opacidade máxima 5%
- Sempre use `blur-3xl` (120px)
- Glow deve estar atrás do conteúdo (z-index baixo)
- Cores: usar cor de acento da página

### Backdrop Blur
```css
/* Header fixo */
backdrop-blur-md (12px)
bg-bg-base/80
```

---

## 8. Shadows

| Uso | Classe |
|---|---|
| Header | Nenhuma (usa backdrop-blur) |
| Cards | Nenhuma (usa border) |
| AI Dock | `shadow-2xl` |
| Command Palette | `shadow-2xl` |
| Botão flutuante | `shadow-lg` |

**Princípio:** Preferir borda a sombra. Sombra apenas para elementos sobrepostos.

---

## 9. Typography

### Fonte
- **Principal**: Inter (via next/font)
- **Mono**: Fira Code (para código e terminais)
- **Fallback**: system-ui, sans-serif

### Tamanhos de Texto

| Uso | Tamanho | Cor |
|---|---|---|
| Body | `text-sm` (0.875rem) | `text-text-secondary` |
| Descrição curta | `text-sm` | `text-text-muted` |
| Label de seção | `text-xs` uppercase | `text-text-muted` |
| Tags / badges | `text-xs` | `text-text-muted` |
| Ano na timeline | `text-xs` font-mono | `text-accent-qa` |
| Footer | `text-xs` | `text-text-muted` |

---

## 10. Grid

### Padrões

| Grid | Breakpoints | Uso |
|---|---|---|
| 3 colunas | `grid-cols-1 md:grid-cols-3` | Product/Project cards |
| 2 colunas | `grid-cols-1 md:grid-cols-2` | Decisões, conteúdo duplo |
| 4 colunas | `grid-cols-2 md:grid-cols-4` | Métricas, analytics |
| 1 coluna | Padrão | Leituras, docs |

---

## 11. White Space

| Elemento | Espaço |
|---|---|
| Entre seções | 64px (`mb-16`) |
| Entre heading e conteúdo | 24px (`mb-6`) |
| Entre cards no grid | 16px (`gap-4`) |
| Padding lateral da página | 24px (`px-6`) |
| Padding de card | 20px (`p-5`) |
| Entre elementos em card | 12px (`gap-3` / `space-y-3`) |

---

## 12. Divisores

| Tipo | Implementação | Uso |
|---|---|---|
| Horizontal sutil | `border-b border-border-subtle` | Entre hero e conteúdo |
| Horizontal completo | `border-t border-border-subtle` | Footer |
| Visual entre seções | `mb-16` (espaço) | Entre seções (preferido) |
| Visual alternado | Alternar `bg-bg-base` e `bg-bg-deep` | Seções muito longas |

---

## 13. Painéis

### AI Dock
- Largura fixa: 360px
- Fixed: bottom-20 right-6
- z-index: 50
- Shadow: 2xl
- Border: border-subtle
- Radius: rounded-xl

### Command Palette
- Max-width: 560px
- Overlay: bg-black/60 backdrop-blur-sm
- z-index: 50
- Content: rounded-xl + shadow-2xl

---

## 14. Hero

### Estrutura
```
[badge de status opcional]
[heading principal — 4xl a 6xl]
[descrição — text-lg]
[mantra "Absorb. Refine. Build." — opcional]
[1 CTA primário + 1 CTA secundário]
[glow sutil no fundo]
```

### Regras
- Glow: no máximo 2, opacity 5%, blur-3xl
- CTA primário: bg-accent-qa (sólido)
- CTA secundário: bg-surface-elevated + border
- Badge: bg-accent-qa/10, border-accent-qa/20

---

## 15. Botões

| Variante | Fundo | Texto | Hover |
|---|---|---|---|
| Primary | `bg-accent-qa` | `text-white` | `hover:bg-accent-qa/90` |
| Secondary | `bg-surface-elevated` | `text-text-primary` | `hover:bg-surface-soft` |
| Ghost | transparente | `text-text-secondary` | `hover:bg-surface-soft` |
| Danger | `bg-danger` | `text-white` | `hover:bg-danger/90` |

---

## Regras Finais

1. **Nunca** usar valores soltos — sempre tokens
2. **Nunca** usar gradientes para decoração
3. **Preferir** `rounded-md` (12px) como padrão
4. **Preferir** border a shadow para profundidade
5. **Preferir** space a elementos visuais para separação
6. **Manter** no máximo 2 glows por página
7. **Manter** no máximo 1 CTA primário por seção
8. **Sempre** usar hover states em elementos interativos
