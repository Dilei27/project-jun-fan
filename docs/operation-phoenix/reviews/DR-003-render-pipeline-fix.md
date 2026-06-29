# DR-003 — Knowledge Graph Render Pipeline Fix

## Diagnóstico

O DR-002 corrigiu o algoritmo de simulação (anéis por tipo + golden angle), mas o grafo continuava deslocado. A causa real estava na **camada de câmera/transform**, não na física.

### Causa real: mistura de sistemas de coordenadas

`computeFitTarget` em `camera.ts` calcula:

```
panX = -centerX × zoom + canvasSize.width / 2
```

Onde:
- `centerX` está em **coordenadas viewBox** (ex: 700)
- `zoom` é adimensional
- `canvasSize.width / 2` deve estar no **mesmo sistema de coordenadas** que `centerX`

O bug introduzido em DR-001B: `canvasSize` foi trocado de `CANVAS_WIDTH/HEIGHT` (viewBox: 1400×900) para `viewportSize` (dimensões CSS do container, ex: 1280×720).

Com container de 1280px de largura:
```
panX = -700 × 1.0 + 640  =  -60
```

O transform resultante `translate(-60, …)` desloca todo o grafo 60 unidades viewBox para a esquerda do centro verdadeiro (700).

O centro do viewport em coordenadas viewBox é **sempre 700** (CANVAS_WIDTH/2), independente do tamanho do container. O SVG `preserveAspectRatio="xMidYMid meet"` garante que o viewBox seja mapeado corretamente para qualquer container.

### Pipeline auditado

```
DATA ──→ SIMULATION ──→ POSITIONS ──→ BOUNDING BOX ──→ FIT ──→ TRANSFORM ──→ RENDER
   ✔           ✔            ✔              ✔              ✘         ✘           ✘
```

O erro estava em FIT → TRANSFORM → RENDER: o fit produzia pan incorreto (coordenada errada), o transform aplicava esse pan incorreto, e o render exibia o grafo deslocado.

### Logs da instrumentação

Com `DEBUG_GRAPH = true`:

```
[KG] nodes in 47
[KG] nodes out 47
[KG] first 5 positions after sim: [
  { id: "propósito-jun-fan", x: "710.5", y: "435.2" },
  { id: "qa-command-center", x: "780.3", y: "380.1" },
  ...
]
[KG] bbox: {
  minX: "280.0", maxX: "1120.0",
  minY: "130.0", maxY: "780.0",
  w: "840.0", h: "650.0"
}
[KG] initialFit: {
  x: "0.0", y: "5.3", zoom: "1.000"
}
```

Confirmado:
- Simulação produz nós distribuídos ocupando ~70% do viewBox.
- BBox cobre ~840×650 viewBox units.
- Com `canvasSize = {1400, 900}`, o fit resulta em zoom 1.0 e pan ≈ (0, 0) — **transform identity**.
- O grafo em coordenadas viewBox (280–1120, 130–780) com viewBox "0 0 1400 900" aparece naturalmente centralizado no viewport.

## Correções

### `knowledge-explorer.tsx`

1. **Removido `viewportSize`** — derivado de `containerSize` com fallback, causava coordenada mista.
2. **Restaurado `canvasSize` fixo** — `{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }` = {1400, 900}.
3. **`computeInitialFit` e `fitToView` usam `canvasSize`** — o transform opera em viewBox space.
4. **`computeFocusTarget` usa `canvasSize`** — foco em nós (clique, painel, busca) também usa viewBox space.
5. **Removido `useEffect` de refit por resize** — container resize não altera viewBox space.
6. **Removido `containerSize`** — não usado após remoção do refit.
7. **Removido `useElementSize`** — hook não mais necessário.
8. **`DEBUG_GRAPH`** — instrumentação opcional (false em produção).

### `camera.ts`

Sem alterações (já tinha a documentação correta: "canvasSize is the virtual canvas size (e.g. 1400×900) since the camera transform is applied in canvas coordinates").

## Arquivos alterados

| Arquivo | Alterações |
|---|---|
| `src/features/knowledge-graph/knowledge-explorer.tsx` | `viewportSize` → `canvasSize`; removido `useElementSize`; removido refit useEffect; adicionado `DEBUG_GRAPH` |

## Comparação antes/depois

| Aspecto | Antes (DR-001B) | Depois (DR-003) |
|---------|-----------------|-----------------|
| canvasSize para fit | `viewportSize` (container CSS px) | `canvasSize` (viewBox 1400×900) |
| Transform space | Mistura viewBox + CSS px | ViewBox puro |
| panX com container 1280px | `-700 + 640 = -60` (deslocado) | `-700 + 700 = 0` (centralizado) |
| Refit em resize | Sim, com dimensão errada | Não necessário (viewBox fixo) |
| Dependência de useElementSize | Sim | Não |

## Validação

```bash
npm run lint  # ✅ sem erros
npm run build # ✅ sem erros
```

## Pendências

Nenhuma. O pipeline está matematicamente correto:

1. Simulação produz posições distribuídas (DR-002)
2. BBox é computada sobre posições válidas
3. Fit usa viewBox dimensions (1400×900) — coordenada correta
4. Transform `translate(panX, panY) scale(zoom)` opera em viewBox space
5. SVG viewBox + preserveAspectRatio mapeia para qualquer container
6. Reset e focus targets usam o mesmo sistema de coordenadas

Próximo: DR-004 — Cinematic Graph Experience (Motion, Physics e Atmosfera).
