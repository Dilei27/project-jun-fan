# Visual DNA — Project Identity

> O que torna o Project Jun Fan único visualmente.

---

## O DNA

O Project Jun Fan é construído sobre **três camadas visuais** que devem aparecer em TODAS as páginas:

### 1. Dark Tech Premium
Fundo grafite profundo (`#0B0F14`), superfícies em camadas, bordas sutis. A escuridão não é ausência de cor — é um palco para o conteúdo.

### 2. One Accent Per Screen
Cada produto ou seção tem sua própria cor de destaque. A cor dominante muda conforme o contexto, mas o sistema permanece o mesmo.

### 3. Engineering Transparency
Nada é escondido. Architecture flows, decisões técnicas, stack tags — a engenharia está visível em cada card, cada seção, cada página.

---

## Padrões Visuais Obrigatórios

| Padrão | Onde | Regra |
|---|---|---|
| Grid de 3 colunas | Cards de produto, projeto, insight | `grid-cols-1 md:grid-cols-3` |
| Hero com glow | Home, Command Center, Product pages | Glow sutil na cor de acento (opacity 5%) |
| Cards com border-l-accent | ProductCards, seções com identidade própria | Borda esquerda 2px na cor do produto |
| Badge de status | Topo de seções importantes | Rounded-full, bg com 10% opacity da cor |
| Stack tags | Cards de produto e projeto | Pequenos, border, sem destaque excessivo |
| "Ver mais" links | Fim de seções com conteúdo adicional | Apenas texto com seta, sem botão |
| Separadores visuais | Entre seções no Command Center | Border sutil ou bg alternado sutil |

---

## Elementos Que Nunca Devem Existir

| ❌ | Motivo |
|---|---|
| Gradientes chamativos green-roxo | Estética IA genérica |
| Neon glow (cores berrantes) | Quebra o tom premium escuro |
| Partículas / estrelas / confete | Distração sem função |
| Ilustrações cartoon | Incompatível com o tom técnico |
| Fotos de stock | Falso, impessoal |
| Animações que giram/piscam sem parar | Ruído visual |
| Fontes display decorativas | Quebram a seriedade |
| Som / áudio automático | Invasivo |
| Popups/modal agressivos | Experiência de baixa qualidade |

---

## Assinatura Visual (O que é "só Jun Fan")

1. **O "JF" badge** — quadrado azul com letras brancas no header
2. **Status Strip** — três pontos coloridos (azul, teal, laranja) lado a lado
3. **Terminal aesthetic** — ">" como prefixo, font monospace sutil
4. **Glow por produto** — halos sutis na cor de acento em heróis e cards
5. **Timeline vertical** — linha fina com dots, ring no primeiro item
6. **"Absorb. Refine. Build."** — mantra presente na home

---

## Cores que Definem a Marca

| Elemento | Cor | Hex |
|---|---|---|
| Cor primária da marca | Azul QA | `#4F8CFF` |
| Fundo base | Grafite | `#0B0F14` |
| Fundo profundo | Preto azulado | `#070A0F` |
| Superfície padrão | Cinza escuro | `#111821` |
| Texto primário | Branco suave | `#F4F7FA` |
| Acento WhatsApp | Teal | `#2DD4BF` |
| Acento Vigilante | Laranja | `#F97316` |

---

## Personalidade Visual em Palavras

| Palavra | Como aparece |
|---|---|
| **Premium** | Dark theme, espaço, bordas sutis |
| **Técnico** | Architecture flows, stack tags, code blocks |
| **Futurista** | Terminal, AI Dock, motion |
| **Calmo** | Sem excesso de informação, ritmo de leitura |
| **Confiança** | Consistência entre páginas |
| **Identidade** | Cores de acento por produto, mas mesma família |

---

## Checklist de DNA Visual

Para cada nova tela, perguntar:

- [ ] Usa tokens do Horizon (não valores soltos)?
- [ ] Tem uma cor de acento dominante?
- [ ] Segue o grid de 3 colunas (se aplicável)?
- [ ] Tem pelo menos um elemento de "engenharia visível"?
- [ ] Os cards têm hover state?
- [ ] A página respira (espaçamento adequado)?
- [ ] Não tem neon, gradiente chamativo ou partículas?
- [ ] Seria reconhecida como Jun Fan em uma screenshot?
