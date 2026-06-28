# Visual Signature — Project Identity

> Os elementos que tornam o Project Jun Fan inconfundível.

---

## A Assinatura Visual

O Project Jun Fan será reconhecido em uma screenshot por esta combinação única:

```
┌─────────────────────────────────────────────────┐
│  [JF] Jun Fan                                   │  ← Header escuro com logo JF em azul
├─────────────────────────────────────────────────┤
│                                                 │
│  ● Product Operating System — online            │  ← Badge de status
│                                                 │
│  Project Jun Fan                                │  ← Título extrabold, tracking tight
│                                                 │
│  Absorb. Refine. Build.                         │  ← Mantra em azul
│                                                 │
│  [Explorar QA Command Center →]  [Documentação] │  ← 1 CTA primário + 1 secundário
│                                                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│  │ Product  │ │ Product  │ │ Product  │        │  ← 3 cards com border-l accent
│  │ Card     │ │ Card     │ │ Card     │        │     stack tags, hover lift
│  └──────────┘ └──────────┘ └──────────┘        │
│                                                 │
├─────────────────────────────────────────────────┤
│  Hub  ·  Docs  ·  Decisões  ·  Busca            │  ← Footer minimalista
│  Project Jun Fan — Build. Automate. Innovate.   │
└─────────────────────────────────────────────────┘
                                                    
                                                    ●  ← AI Dock flutuante (ícone Bot, azul)
```

---

## Elementos Exclusivos do Project Jun Fan

### 1. "JF" Badge no Header
Quadrado de 24px com fundo azul `#4F8CFF`, texto "JF" em branco, peso bold. Acompanhado do texto "Jun Fan".

### 2. Status Strip
Três indicadores lado a lado: QA azul (online), WhatsApp teal (beta), Vigilante laranja (beta). Cada um com dot colorido + nome + status.

### 3. Product Gateway com Border Accent
Três cards em grid, cada um com borda esquerda de 2px na cor do produto. Hover muda o título para a cor do produto. Stack tags com overflow "+N".

### 4. Timeline com Ring
Linha vertical fina, dots arredondados, o primeiro com ring (2px) na cor de acento. Anos em monospace azul.

### 5. Terminal Aesthetic
- ">" como prefixo em elementos de terminal
- Boot Loader com typing animation (controversial, mas memorável)
- Blocos de código com font mono

### 6. Glow por Produto
Heróis e seções principais têm halos sutis (bg-color/5, blur-3xl) na cor de acento do contexto. Máximo 2 por página.

### 7. AI Dock
Botão flutuante circular (48px) com fundo azul e ícone Bot. Painel de 360px com rounded-xl e shadow-2xl.

### 8. Badge "Quality ecosystem online" / "Product Operating System — online"
Badge no topo do hero, rounded-full, bg com 10% opacity da cor de acento, dot verde indicando online.

---

## O Que Fará Alguém Reconhecer Imediatamente

| Cenário | Elemento Reconhecível |
|---|---|
| Screenshot da home | Badge "Product Operating System" + "JF" no header + mantra |
| Screenshot do CC | Hero "QA Command Center" + glow azul + 3 product cards |
| Screenshot de produto | Card com border-l na cor do produto |
| Screenshot mobile | Header com JF + AI Dock flutuante |
| Screenshot de card | Border-l + hover lift + stack tags |
| Screenshot de timeline | Dots com ring + linha vertical + anos monospace |

---

## Gradientes e Glows (Regras)

### Glows (Apenas em Heróis)
```css
/* Regra: opacity 5%, blur-3xl, cor de acento */
background: radial-gradient(ellipse, color/accent/5, transparent);
```

### Gradientes
**NUNCA** usar gradientes como elemento decorativo. Se for absolutamente necessário, usar:
```css
/* Apenas para links ou badges de status */
background: linear-gradient(to right, accent/10, transparent);
```

---

## Microinterações de Assinatura

| Ação | Resposta |
|---|---|
| Hover em card | Lift -0.5rem (2px) + bg mais claro + border mais forte |
| Hover em product card | Título muda para cor do produto |
| Click em botão primário | Scale 0.98 momentâneo |
| Card aparece no viewport | slideUp 280ms com stagger 80ms |
| AI Dock abre | scale 0.95 → 1 + fade 200ms |
| Mobile menu abre | slideDown 160ms |

---

## O Que É Proibido

| Elemento | Motivo |
|---|---|
| Logo "JF" com cores diferentes | Sempre azul #4F8CFF, sempre no header |
| Grid de 2 colunas para produtos | Produtos SEMPRE em 3 colunas (md) |
| Cards sem border | Cards sempre têm border-border-subtle |
| CTA primário sem bg sólido | Primary é sempre bg-accent-qa sólido |
| Timelines horizontais | Timeline é SEMPRE vertical |
| AI Dock em posição diferente | SEMPRE bottom-6 right-6 |
| Fonte diferente de Inter | Inter é a única fonte da interface |

---

## A Evolução da Assinatura

Esta é a **versão 1.0** da assinatura visual do Project Jun Fan. Ela deve evoluir conforme novos produtos e módulos são adicionados, mas os elementos centrais (JF badge, status strip, glow system, terminal aesthetic, product gateway) devem permanecer como âncoras da marca.

**Próximas adições planejadas:**
- Knowledge Graph como assinatura de navegação (Mission 04)
- Product Switcher como elemento de marca
- Avatar/personal avatar como elemento de conexão pessoal
