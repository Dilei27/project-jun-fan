# Horizon Evolution — Project Identity

> Como o Horizon Design System deve evoluir para suportar a identidade do Project Jun Fan.

---

## O Que Permanece

### Princípios
1. ✅ Tokens como fonte de verdade
2. ✅ Escuro como padrão
3. ✅ Uma cor de acento por tela
4. ✅ Motion funcional e discreto
5. ✅ Acessibilidade nativa

### Tokens de Cor
✅ BG, surface, border, text, accent, semantic — **mantidos**

### Tipografia
✅ Inter como fonte principal — **mantida**

### Componentes Base
✅ Button, Card, Badge, Skeleton — **mantidos**, apenas refinamentos

---

## O Que Precisa Evoluir

### 1. Tokens de Motion — Uso Obrigatório

**Problema:** motion.ts define durations, easings e variants, mas componentes não os consomem.

**Solução:** Tornar obrigatório o uso de `motion.duration` e `motion.variants` em qualquer novo componente que use framer-motion.

**Como:**

```typescript
// Em vez de:
transition={{ duration: 0.2 }}

// Usar:
import { motion } from '@/design-system/motion';
transition={{ duration: motion.duration.fast / 1000 }}
```

### 2. Tokens de Elevação (Shadows)

**Adicionar:**

| Token | Valor | Uso |
|---|---|---|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.3)` | Cards em hover |
| `--shadow-md` | `0 4px 12px rgba(0,0,0,0.4)` | AI Dock, modais |
| `--shadow-lg` | `0 8px 24px rgba(0,0,0,0.5)` | Command Palette |

### 3. Tokens de Blur

**Adicionar:**

| Token | Valor | Uso |
|---|---|---|
| `--blur-sm` | `4px` | Hover sutil |
| `--blur-md` | `12px` | Header backdrop |
| `--blur-lg` | `24px` | Overlays |
| `--blur-xl` | `120px` | Glows |

### 4. Token de Z-Index

**Adicionar:**

| Token | Valor | Uso |
|---|---|---|
| `--z-header` | `40` | Header fixo |
| `--z-ai-dock` | `50` | AI Dock |
| `--z-command-palette` | `50` | Command Palette |
| `--z-boot-loader` | `60` | Boot Loader |
| `--z-overlay` | `40` | Overlays |

### 5. Alinhamento de Spacing

**Problema:** `spacing.ts` tem 13 valores; `tokens.ts` tem 8; `theme.css` tem 7.

**Solução:** Padronizar em 9 valores oficiais:

| Chave | px | CSS Var |
|---|---|---|
| 0 | 0 | — |
| 1 | 4 | `--space-1` |
| 2 | 8 | `--space-2` |
| 3 | 12 | `--space-3` |
| 4 | 16 | `--space-4` |
| 6 | 24 | `--space-6` |
| 8 | 32 | `--space-8` |
| 12 | 48 | `--space-12` |
| 16 | 64 | (novo) `--space-16` |

### 6. Typography Refinamento

| Token | Valor | Nota |
|---|---|---|
| `font.mono` | `'Fira Code', monospace` | JetBrains Mono removido (não carregado) |
| `size.display` | `3.75rem` (60px) | Novo — para hero display |
| `leading.display` | `1.05` | Novo — para hero display |

### 7. Componentes a Amadurecer

| Componente | O Que Falta |
|---|---|
| **Card** | Suporte a `variant` com estilos predefinidos (default, interactive, accent) |
| **Button** | Já é bom; adicionar `size` (sm, md, lg) |
| **Badge** | Adicionar variante com ícone |
| **Skeleton** | Adicionar variantes (card, text, circle) |
| **Input** | Componente de input não existe (usa HTML direto) — criar |

### 8. Novos Componentes Recomendados

| Componente | Prioridade | Uso |
|---|---|---|
| `Input` | Alta | Search, AI Dock input, formulários |
| `Separator` | Média | Divisor visual entre seções |
| `StatusDot` | Baixa | Indicador de status (já inline em alguns lugares) |
| `Avatar` | Baixa | Futuro perfil do autor |

---

## Plano de Evolução

### Sprint Atual (Identidade)
- [ ] Adicionar tokens de shadow/blur/z-index ao `theme.css`
- [ ] Alinhar `spacing.ts`, `tokens.ts` e `theme.css`
- [ ] Atualizar `font.mono` em `typography.ts`
- [ ] Adicionar `size.display` em `typography.ts`

### Sprint Seguinte
- [ ] Refatorar Card para usar tokens de shadow
- [ ] Criar componente Input oficial
- [ ] Adicionar variantes de Skeleton

### Futuro
- [ ] Publicar Horizon como pacote separado
- [ ] Documentação visual (Storybook ou similar)
- [ ] Modo claro como tema alternativo
