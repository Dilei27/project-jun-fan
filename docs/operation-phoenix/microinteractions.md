# Microinteractions — Project Aura

> Revisão de hover, loading, empty states, transitions, feedback.

---

## Estado Atual

### Hover
| Componente | Estado Atual | Avaliação |
|---|---|---|
| Button (primary) | `hover:bg-accent-qa/90` | Ok, sutil |
| Button (secondary) | `hover:bg-surface-soft` | Ok |
| Card | `hover:bg-surface-elevated hover:border-border-strong hover:-translate-y-0.5` | **Bom** — lift sutil |
| Card (ProductCard) | `group-hover:text-[var(--accent)]` | **Excelente** — accent color dinâmico |
| Card (ProjectCard) | `group-hover:text-accent-qa` | Ok |
| AI Insight | `hover:bg-surface-elevated hover:border-border-strong` | Idem Card |
| Header nav link | `hover:bg-surface-soft` | Ok |
| AI Dock button | `hover:bg-accent-qa/90` + scale | Ok |
| Docs sidebar link | `hover:bg-surface-soft` | Ok |
| Footer links | `hover:text-text-secondary` (color only) | **Mínimo** — falta hover state mais perceptível |

### Loading States
| Componente | Estado Atual | Avaliação |
|---|---|---|
| Skeleton | Existe em `ui/skeleton.tsx` | **Não usado em lugar nenhum** |
| Pages | SSG — sem loading state | SSG é instantâneo, mas se JS demorar... |
| AI Dock | Sem loading ao buscar | **Missing** — resposta aparece instantaneamente (mock), mas sem indicador |
| Demo | `disabled:opacity-50` no botão | Ok |
| Boot Loader | Loading animado | Ok, mas controverso |

### Empty States
| Componente | Estado Atual | Avaliação |
|---|---|---|
| Search (busca) | "Nenhum resultado" | **Bom** |
| Demo log | "Nenhuma atividade ainda" | **Bom** |
| Product decisions | Só renderiza se `> 0` | **Bom** (não mostra se vazio) |
| Timeline | Sempre tem dados (hardcoded) | Ok |
| Skills | Sempre tem dados | Ok |
| **Global 404** | Next.js default | **Missing** — sem custom not-found |
| **Global error** | Next.js default | **Missing** — sem custom error |

### Transitions
| Elemento | Estado Atual | Avaliação |
|---|---|---|
| Page transitions | **Nenhuma** | Instantânea, mas sem sensação de navegação |
| AI Dock open/close | AnimatePresence + fade/scale | **Bom** |
| Command Palette open/close | Imediato (sem AnimatePresence) | **Poderia ter** fade+scale |
| Mobile menu | Imediato (sem AnimatePresence) | **Missing** — aparece sem transição |
| Boot Loader exit | AnimatePresence + fade | **Bom** |

### Feedback
| Ação | Feedback | Avaliação |
|---|---|---|
| Click CTA | Navegação (sem feedback) | Esperado |
| Click AI Dock suggestion | Resposta aparece imediatamente | **Bom** |
| Click "Executar Demo" | Steps animados com log | **Bom** |
| Click search | Resultados carregam (SSR) | Ok |
| Click "Resetar Demo" | Log limpo | Ok |
| Form submit search | Navega para /busca/?q= | Ok |

---

## O Que Precisa Melhorar (Quick Wins)

### 1. Skeleton — Usar em Páginas com Conteúdo Dinâmico
O componente `Skeleton` existe mas não é usado. Adicionar:
- `loading.tsx` global com Skeleton para fallback de páginas
- Skeleton para AI Dock resposta (simular processamento)

### 2. not-found.tsx Personalizado
Criar `src/app/not-found.tsx` com layout Horizon consistente.

### 3. error.tsx Personalizado
Criar `src/app/error.tsx` com botão de retry e mensagem amigável.

### 4. Mobile Menu com Animação
Adicionar `AnimatePresence` no mobile menu com `slideDown`.

### 5. Command Palette com Animação de Entrada
Adicionar `motion.div` com `scale` variant na abertura.

### 6. Footer Links com Hover State
Adicionar `hover:bg-surface-soft` nos links do footer (além de color).

---

## Score de Microinterações: 5.5/10

| Critério | Nota | Justificativa |
|---|---|---|
| Hover states | 7 | Cards ótimos, links do footer fracos |
| Loading states | 4 | Skeleton existe mas não é usado |
| Empty states | 6 | Bons na busca/demo, falta global |
| Transitions | 4 | AI Dock ok, mobile menu e CP faltam |
| Feedback | 6 | Funcional, sem surpresas |
| **Média** | **5.5** | Funcional, mas com lacunas claras |
