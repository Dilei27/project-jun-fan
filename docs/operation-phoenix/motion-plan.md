# Motion Plan — Project Aura

> Aplicar motion tokens existentes. Sem criar novas animações.

---

## Motion Tokens Disponíveis (de `src/design-system/motion.ts`)

### Durations
| Token | ms | Uso |
|---|---|---|
| `motion.duration.fast` | 160 | Microinterações, hover |
| `motion.duration.normal` | 280 | Transições de card, entrada |
| `motion.duration.slow` | 420 | Transições de página |

### Easing
| Token | Curva |
|---|---|
| `easing.default` | `[0.4, 0, 0.2, 1]` |
| `easing.in` | `[0.4, 0, 1, 1]` |
| `easing.out` | `[0, 0, 0.2, 1]` |
| `easing.spring` | `{ stiffness: 300, damping: 30 }` |

### Variants
| Variant | Initial | Animate | Exit |
|---|---|---|---|
| `fadeIn` | `{ opacity: 0 }` | `{ opacity: 1 }` | `{ opacity: 0 }` |
| `slideUp` | `{ opacity: 0, y: 20 }` | `{ opacity: 1, y: 0 }` | `{ opacity: 0, y: -20 }` |
| `scale` | `{ opacity: 0, scale: 0.95 }` | `{ opacity: 1, scale: 1 }` | `{ opacity: 0, scale: 0.95 }` |

---

## Onde Cada Variant Funciona

### FadeIn
| Componente | Local | Justificativa |
|---|---|---|
| Boot Loader exit | command-center | Já usa fade (opacity 1 → 0, 0.16s) — ok |
| AI Dock | fixed bottom-right | Já usa opacity + y + scale — poderia ser só fadeIn |
| Command Palette | modal | Já usa backdrop-blur — poderia ter fadeIn no backdrop |

### SlideUp
| Componente | Local | Justificativa |
|---|---|---|
| Product Cards | Home, CC, Hub | Cards aparecem sem animação — slideUp daria entrada suave |
| Project Cards | Home, CC | Idem |
| ProductGateway grid | Home, CC | Stagger children com slideUp |
| FeaturedProjects grid | Home, CC | Stagger children com slideUp |
| Metric items | CC MetricsGrid | Números já animam, mas cards poderiam entrar com slideUp |

### Scale
| Componente | Local | Justificativa |
|---|---|---|
| AI Dock panel | Botão flutuante | Já usa scale 0.95 → 1 — ok |
| Command Palette | Modal | Scale 0.98 → 1 combinado com fadeIn |
| Decision cards | Command Center | Entrada sutil com scale |
| Badge de status | Vários | Scale sutil no hover |

---

## Onde Motion Deve Desaparecer

| Local | Motivo |
|---|---|
| Boot Loader typing animation (repetido) | Deve ser opcional (já visto) ou mais rápido |
| Button whileTap scale 0.98 | Sutil demais para ser percebido — manter mas usar 160ms |
| Hover em links no footer | transition-colors é suficiente, não precisa de animation |

---

## Onde Motion Reforça Narrativa

| Local | Motion | Efeito |
|---|---|---|
| Home hero título | fadeIn + slideUp | Entrada do produto causa impacto |
| ProductGateway cards | Stagger slideUp | Sensação de grid vivo |
| Timeline entries | slideUp com stagger | Progressão temporal narrativa |
| Hero do CC | fadeIn com glow | Impacto de entrada |

---

## Onde Motion Distrai

| Local | Problema | Solução |
|---|---|---|
| Boot Loader | 1.4s obrigatório toda visita | Opcional (localStorage) |
| animate-pulse no badge "Quality ecosystem online" | Pisca sem necessidade | Remover pulse ou deixar estático |

---

## Plano de Implementação (Quick Wins)

1. **Criar wrapper `motion.div` com `motion.variants.fadeIn`** para componentes de card
2. **Adicionar `whileInView`** com slideUp nos grids (ProductGateway, FeaturedProjects)
3. **Aplicar stagger children** nos grids (0.08s entre cada card)
4. **Manter AI Dock e Command Palette** como estão (já usam motion corretamente)
5. **Boot Loader**: adicionar verificação de localStorage para não repetir
6. **Button**: manter whileHover/whileTap, mas usar duração de 160ms do token fast

> NENHUMA nova animação será criada. Apenas aplicar os tokens existentes.
