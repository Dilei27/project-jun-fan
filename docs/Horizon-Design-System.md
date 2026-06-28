# Horizon Design System

## Visão Geral

Horizon é o Design System do Project Jun Fan. Ele define tokens, componentes e regras visuais que garantem consistência entre todos os produtos do ecossistema (QA Command Center, WhatsApp AI Assistant, Vigilante AI).

## Princípios

1. **Tokens como fonte de verdade** — nenhum valor visual solto em componentes.
2. **Escuro como padrão** — tema escuro premium com cores cuidadosamente selecionadas.
3. **Uma cor de acento por tela** — cada produto tem sua própria cor de destaque.
4. **Motion funcional e discreto** — animações comunicam estado, não distraem.
5. **Acessibilidade nativa** — contraste, foco visível, reduced motion.

## Tokens

### Cores

| Token | Valor | Uso |
|---|---|---|
| `--color-bg-base` | `#0B0F14` | Fundo principal |
| `--color-bg-deep` | `#070A0F` | Fundo mais profundo |
| `--color-surface-default` | `#111821` | Superfície padrão |
| `--color-surface-elevated` | `#151D27` | Superfície elevada (hover) |
| `--color-surface-soft` | `#1B2430` | Superfície suave (tags) |
| `--color-border-subtle` | `#263241` | Borda sutil |
| `--color-border-strong` | `#3A4658` | Borda forte |
| `--color-text-primary` | `#F4F7FA` | Texto principal |
| `--color-text-secondary` | `#9AA6B8` | Texto secundário |
| `--color-text-muted` | `#687385` | Texto suave |

### Cores de Acento

| Produto | Cor |
|---|---|
| QA Command Center | `#4F8CFF` |
| WhatsApp AI Assistant | `#2DD4BF` |
| Vigilante AI | `#F97316` |
| Analytics | `#A855F7` |
| Documentação | `#EAB308` |

### Cores Semânticas

| Token | Valor | Uso |
|---|---|---|
| `--color-success` | `#22C55E` | Sucesso |
| `--color-warning` | `#F59E0B` | Atenção |
| `--color-danger` | `#EF4444` | Erro |

### Tipografia

- Fonte principal: Inter (sans-serif)
- Fonte de código: JetBrains Mono / Fira Code (monospace)
- Escala: 0.75rem a 3rem

### Espaçamento

Escala baseada em 4px: 0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96.

### Bordas

| Token | Valor |
|---|---|
| `--radius-sm` | 8px |
| `--radius-md` | 12px |
| `--radius-lg` | 16px |
| `--radius-xl` | 24px |

### Motion

| Token | Duração |
|---|---|
| `--motion-fast` | 160ms |
| `--motion-normal` | 280ms |
| `--motion-slow` | 420ms |

## Implementação

O Horizon Design System está implementado em:

- `src/design-system/tokens.ts` — tokens consolidados
- `src/design-system/colors.ts` — paleta de cores
- `src/design-system/typography.ts` — tipografia
- `src/design-system/spacing.ts` — espaçamento
- `src/design-system/radius.ts` — bordas
- `src/design-system/motion.ts` — animações
- `src/design-system/theme.css` — variáveis CSS
- `src/app/globals.css` — integração com Tailwind via `@theme`

## Componentes

Os componentes do Horizon estão em `src/components/ui/`:

- `Button` — variantes: primary, secondary, ghost, danger
- `Card` — com suporte a hover e borda de acento
- `Badge` — variantes: default, success, warning, danger
- `Skeleton` — loading states
