# Motion Language — Project Identity

> O ritmo do Project Jun Fan.

---

## O Ritmo do Jun Fan

O Project Jun Fan se move como **um instrumento de precisão**:

- **Calmo** — nada apressado, nada brusco
- **Preciso** — cada animação tem duração fixa, sem variação aleatória
- **Elegante** — easing suave (cubic-bezier [0.4, 0, 0.2, 1])
- **Funcional** — se não comunica estado, não existe

---

## Durations

| Token | ms | Percepção | Uso |
|---|---|---|---|
| `fast` | 160 | Instantâneo | Hover, microinterações, feedback |
| `normal` | 280 | Natural | Entrada de cards, transições de painel |
| `slow` | 420 | Perceptível | Transições de página, contadores |

---

## Easings

| Token | Curva | Sensação | Uso |
|---|---|---|---|
| `default` | `[0.4, 0, 0.2, 1]` | Suave, natural | Entradas, aparecimentos |
| `in` | `[0.4, 0, 1, 1]` | Aceleração | Saídas, desaparecimentos |
| `out` | `[0, 0, 0.2, 1]` | Desaceleração | Aparecimentos |
| `spring` | stiffness 300, damping 30 | Orgânico | Botões, interações |

---

## Quando Usar Motion

| Situação | Motion | Tokens |
|---|---|---|
| Card aparece no viewport | slideUp | normal, default |
| Grid de cards carrega | Stagger (0.08s) + slideUp | normal, default |
| Painel abre (AI Dock, CP) | scale + fadeIn | fast, default |
| Overlay de modal | fadeIn | fast |
| Botão hover | scale (1.02) | spring |
| Botão click | scale (0.98) | spring |
| Contador numérico incrementa | counting animation | slow |
| Mobile menu abre | slideDown (height) | fast |
| Menu fecha | slideUp (opacity) | fast |
| Página carrega | fadeIn no conteúdo | normal |

---

## Quando NÃO Usar Motion

| Situação | Motivo |
|---|---|
| Hover em link de texto | Distração desnecessária |
| Badge de status | Elemento informativo, não interativo |
| Tags / stack tags | Quantidade grande, animação seria ruído |
| Footer | Área de baixa atenção |
| Navegação entre páginas | SSR/SSG não permite transições suaves sem client-side router |
| Elementos repetitivos | Animar o mesmo padrão em toda lista satura |

---

## Como as Páginas Entram

As páginas do Jun Fan são servidas estaticamente (SSG/SSR). A transição entre páginas é instantânea. O motion de entrada acontece **dentro** da página, não entre páginas.

**Fluxo de entrada:**
1. Página renderiza estática (instantânea)
2. Hero aparece (já visível — sem motion)
3. Conteúdo abaixo do fold entra com `whileInView` + slideUp
4. Cards no grid entram com stagger

---

## Como os Cards Aparecem

Os cards usam o padrão `AnimatedGrid` + `AnimatedCard`:

```
Container (AnimatedGrid):
  initial: { opacity: 0 }
  whileInView: { opacity: 1 }
  staggerChildren: 0.08s

Card (AnimatedCard):
  initial: { opacity: 0, y: 16 }
  whileInView: { opacity: 1, y: 0 }
  duration: 0.28s
  ease: [0.4, 0, 0.2, 1]
```

**Efeito:** os cards sobem em cascata, como um baralho sendo aberto.

---

## Como o Usuário Percebe Continuidade

1. **Header fixo** — sempre presente, dá sensação de estrutura estável
2. **AI Dock** — sempre no mesmo lugar (bottom-right)
3. **Command Palette** — mesma animação sempre (scale + fade)
4. **Cards entrando** — mesmo padrão em todas as páginas
5. **Hover states** — mesmo comportamento em todos os cards

A continuidade não vem de transições de página, mas de **comportamentos consistentes** entre componentes.

---

## Regras de Ouro

1. **280ms é o padrão.** Use 160ms para feedback, 420ms para destaque.
2. **Nunca anime borda, sombra ou cor** (exceto via CSS transition).
3. **Stagger máximo de 0.1s** entre itens — mais que isso parece lento.
4. **Sempre respeite `prefers-reduced-motion`** — zero animações se ativado.
5. **Uma animação por vez.** Não anime hero + cards + sidebar simultaneamente.
6. **Se não melhora a compreensão, remova.**

---

## O Estilo de Motion do Jun Fan

| Qualidade | Descrição |
|---|---|
| **Discreto** | O usuário percebe o resultado, não a animação |
| **Rápido** | Nada dura mais que 420ms |
| **Previsível** | Mesmo padrão sempre, sem surpresas |
| **Funcional** | Comunica hierarquia, não decora |
| **Consistente** | Mesmos easing e duração em todo o ecossistema |
