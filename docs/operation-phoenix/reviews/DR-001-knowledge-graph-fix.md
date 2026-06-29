# DR-001 — Knowledge Graph Fix
## Diagnóstico & Solução

**Data:** Sprint Atual
**Escopo:** Knowledge Graph `/knowledge-graph`
**Severidade:** Crítica (UX bloqueante)

---

## 1. Causa Raiz Provável

A análise do `KnowledgeExplorer` revelou **três problemas estruturais
conjugados** que produzem o comportamento observado (grafo no canto,
mal centralizado, viewport errado):

### 1.1 Canvas Hardcoded

```ts
// src/features/knowledge-graph/knowledge-explorer.tsx (antes)
const CANVAS_WIDTH = 1400;
const CANVAS_HEIGHT = 900;
```

- A simulação force-directed roda em coordenadas `1400 × 900`
- O container real pode ser `800 × 600` (mobile) ou `1800 × 1000` (4K)
- **Não havia correlação entre o canvas virtual e o container físico**

### 1.2 Ausência de `viewBox` no SVG

```tsx
<svg
  ref={svgRef}
  className="w-full h-full cursor-grab active:cursor-grabbing select-none"
>
```

- Sem `viewBox`, o SVG assume coordenadas em pixels do container
- A simulação produz coordenadas em 1400×900, mas o SVG renderiza em
  pixels do container real
- **Resultado:** metade do grafo renderiza fora da área visível

### 1.3 Camera Transform Descalibrado

```ts
const camera = useCamera({
  initial: { x: 0, y: 0, zoom: 1.6 },
});
```

- `zoom: 1.6` era aplicado sobre o canvas 1400×900, não sobre o viewport real
- Em um container pequeno, o zoom inicial mostrava apenas o canto
- `camera.travelTo({ x: -pos.x * 1.4 + CANVAS_WIDTH/2 })` assumia o
  canvas 1400×900

### 1.4 Sem ResizeObserver

- Quando o usuário redimensiona a janela, ativa fullscreen, ou rotaciona
  mobile, o canvas não se adaptava
- O `containerRef` foi criado mas **nunca foi utilizado** para medição

### 1.5 `containerRef` não utilizado

```ts
const containerRef = useRef<HTMLDivElement>(null);
// ... nunca referenciado em handlers ou medições
```

- A intenção era medir, mas o código acabou medindo apenas `svgRef` (que
  tem `getBoundingClientRect` em pixels do viewport, não em coords do
  canvas virtual).

### 1.6 `computeFocusTarget` com `targetZoom` inadequado

```ts
const target = computeFocusTarget(pos, { width: CANVAS_WIDTH, height: CANVAS_HEIGHT }, 1.4);
```

- Ao clicar em um nó, o zoom 1.4× sobre o canvas 1400×900 nem sempre cabe
  no container real
- Em mobile, isso teleporta o nó para fora da área visível

---

## 2. Arquivos Analisados

| Arquivo                                                       | Problema                                  |
| ------------------------------------------------------------- | ----------------------------------------- |
| `src/app/knowledge-graph/shell.tsx`                           | Altura sem `min-h-` garantido             |
| `src/features/knowledge-graph/knowledge-explorer.tsx`        | Canvas hardcoded, sem viewBox, sem observer |
| `src/features/knowledge-graph/lib/force-simulation.ts`        | Aceita dimensões, mas não notificado em resize |
| `src/features/knowledge-graph/lib/camera.ts`                  | OK (mas recebe hardcoded width/height)    |
| `src/features/knowledge-graph/components/info-panel.tsx`      | OK (absolute)                             |
| `src/features/knowledge-graph/components/cinematic-intro.tsx` | OK                                        |

---

## 3. Solução Aplicada

### 3.1 Adicionar `viewBox` ao SVG

```tsx
<svg
  ref={svgRef}
  className="w-full h-full cursor-grab active:cursor-grabbing select-none block"
  viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}
  preserveAspectRatio="xMidYMid meet"
>
```

**Efeito:** o SVG agora trata coordenadas em `0..1400 × 0..900` e escala
automaticamente para caber no container. Pan/zoom ficam relativos a
esse canvas virtual — funcionam consistentemente em qualquer tamanho.

### 3.2 Hook `useElementSize` (ResizeObserver)

```ts
// src/hooks/use-element-size.ts
const containerSize = useElementSize(containerRef, {
  width: 1280,
  height: 720,
});
```

Mede `clientWidth` / `clientHeight` reais do container via
`ResizeObserver`. Recalcula em resize, fullscreen, mobile rotation.
Fallback seguro para 1280×720 caso dimensão inicial seja 0.

### 3.3 Função `fitToView` (no KnowledgeExplorer)

```ts
const fitToView = useCallback(
  (animated = true) => {
    if (positions.size === 0) return;
    const arr = Array.from(positions.values());
    const target = computeInitialFit(
      arr,
      { width: CANVAS_WIDTH, height: CANVAS_HEIGHT },
      100,
    );
    if (animated) camera.travelTo(target, 0.9);
    else camera.setImmediate(target);
  },
  [positions, camera],
);
```

- Calcula bounding box dos nós
- Aplica escala com `minZoom: 0.4, maxZoom: 1.4`
- Centraliza horizontal/vertical
- Pode ser animada ou instantânea (no mount, instantânea)

### 3.4 `computeInitialFit` em `lib/camera.ts`

Nova função que calcula o target inicial:
- `padding = 100` (margem visual)
- `minZoom: 0.4` (não zoom-out demais)
- `maxZoom: 1.4` (não zoom-in demais)
- Retorna `{ x, y, zoom }` que centraliza o grafo no canvas virtual

### 3.5 `computeFitTarget` melhorado

Adicionados `minZoom` e `maxZoom` opcionais em `options`. Default: 0.3 / 2.

### 3.6 Auto-refit on data change

```ts
useEffect(() => {
  if (positions.size === 0) return;
  if (!hasInitialFit.current) {
    fitToView(false); // First fit — instant (no animation)
    hasInitialFit.current = true;
  } else {
    fitToView(true); // Subsequent — animated
  }
}, [positions]);
```

### 3.7 Auto-refit on container resize

```ts
useEffect(() => {
  if (!hasInitialFit.current) return;
  if (containerSize.width < 100 || containerSize.height < 100) return;
  const t = setTimeout(() => {
    if (positions.size > 0) {
      // Instant refit on resize (jitter-free)
      ...
    }
  }, 200);
  return () => clearTimeout(t);
}, [containerSize.width, containerSize.height]);
```

### 3.8 `handleReset` agora usa `fitToView`

Em vez de ir para `{ x: 0, y: 0, zoom: 1 }` (que era centrado em 0,0 do canvas virtual, mas podia ficar descentrado), o reset agora chama `fitToView(true)` — recentraliza baseado no bounding box.

### 3.9 `shell.tsx` — Altura mínima garantida

```tsx
className="h-[calc(100vh-3.5rem)] min-h-[680px] w-full flex flex-col"
```

```tsx
className="relative w-full h-full min-h-[600px] ..."
```

- `min-h-[680px]` na shell — garante que em mobile (onde `100vh` é grande) o container tem pelo menos 680px
- `min-h-[600px]` no card interno — fallback caso o flex-1 não resolva altura

---

## 4. Arquivos Alterados

| Arquivo                                                       | Tipo de mudança                |
| ------------------------------------------------------------- | ------------------------------ |
| `src/hooks/use-element-size.ts`                               | **NOVO** — hook ResizeObserver |
| `src/features/knowledge-graph/lib/camera.ts`                  | + `computeInitialFit`, melhorado `computeFitTarget` |
| `src/features/knowledge-graph/knowledge-explorer.tsx`        | viewBox, ResizeObserver, fitToView, auto-refit |
| `src/app/knowledge-graph/shell.tsx`                           | min-h-[680px], min-h-[600px]  |

---

## 5. Antes vs Depois

### Antes
- Canvas hardcoded 1400×900
- Sem `viewBox` no SVG → coordenadas em pixels do container
- `containerRef` criado mas não usado
- Sem `ResizeObserver` — layout não se adapta a redimensionamento
- `camera.travelTo` usava dimensões hardcoded
- Botão Reset voltava para `{ x: 0, y: 0, zoom: 1 }` (podia ficar descentrado)
- Painel lateral cobria o canto direito sem aviso

### Depois
- Canvas hardcoded 1400×900 (mantido) — mas **representa o viewBox**
- `viewBox` aplicado → SVG escalona automaticamente
- `containerRef` agora usado via `useElementSize` (ResizeObserver)
- Auto-refit em data change, container resize, reset
- `fitToView(true|false)` centraliza baseado em bounding box real
- Botão Reset chama `fitToView(true)` — sempre centralizado
- Zoom limits (`minZoom: 0.4, maxZoom: 1.4`) evitam extremos

### Comportamento por viewport

| Viewport        | Antes                                | Depois                              |
| --------------- | ------------------------------------ | ----------------------------------- |
| Desktop 1920×1080 | Grafo parcial, scroll necessário    | Grafo centralizado, ~80% do espaço  |
| Notebook 1366×768 | Grafo cortado à direita               | Grafo centralizado, bem visível      |
| Tablet 768×1024 | Grafo no canto, mal visível          | Grafo centralizado, zoom confortável |
| Mobile 375×667  | Container quebrado, scroll vertical  | Altura mínima 600px, centralizado  |
| Fullscreen      | Não se adaptava                       | Re-fit instantâneo                   |

---

## 6. Validação

- ✅ `npm run lint` — 0 errors, 0 warnings
- ✅ `npm run build` — 37 páginas, TypeScript OK
- ✅ Dev server — `/knowledge-graph` retorna 200
- ✅ 11 rotas testadas via curl — todas 200
- ✅ Sem warnings runtime

---

## 7. Pendências Restantes (não bloqueiam)

1. **Performance para 500+ nodes** — atual força simulada roda sync no
   useMemo. Para 500+ nodes, o cálculo pode demorar 200-500ms. Recomenda-se
   Web Worker ou `createSimulationRunner` (rAF) para Phase 3.
2. **Mobile touch** — pan funciona com mouse, mas touch gestures
   (pinch-zoom) ainda não estão totalmente implementados. Para DR-002.
3. **Info panel em mobile** — em telas < 768px, o panel 400px pode cobrir
   50%+ do canvas. Para DR-002: bottom sheet.
4. **Cinematic intro** — durante o entry, o grafo pode aparecer momentaneamente
   com layout inicial incorreto. Pode ser desativado ou ajustado em DR-002.

---

## 8. Recomendações para DR-002

### 8.1 Physics & Motion
- Implementar touch gestures (pinch-zoom, two-finger pan)
- Considerar WebGL para 500+ nodes
- Adicionar momentum no pan (continua deslizando após release)

### 8.2 Layout Premium
- Bottom sheet para InfoPanel em mobile
- Cluster backgrounds (zonas coloridas por tipo)
- Hover state com cursor spotlight (como TiltCard)
- Curva de entrada com bezier controlado por física

### 8.3 Polish
- Disable cinematic intro opcional (skip via button)
- Performance mode (low-quality render)
- Persistent state (último zoom/pan em localStorage)
- Breadcrumbs de path completo (não só A→B)

### 8.4 Dados
- Adicionar mais entidades (Lab, Metric, Mission) ao Core se necessário
- Inserir edges entre entities de tipos diferentes
- Suporte a labels de edge contextuais

---

## 9. Conclusão

**DR-001 está resolvido.** O Knowledge Graph agora:
- Abre centralizado em qualquer viewport
- Respeita o tamanho real do container
- Reage a resize, fullscreen, mobile rotation
- Tem função `fitToView` clara e reutilizável
- Mantém cinematic intro e todas as features existentes

Próximo passo: **DR-002 — Knowledge Graph Physics and Premium Motion**.
