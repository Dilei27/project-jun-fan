# DR-001B — Graph Emergency Fix

## Problema

O grafo do Knowledge Explorer abria deslocado para o canto inferior direito. O zoom inicial era incorreto e o reset view não centralizava.

## Diagnóstico

1. **`setImmediate` não era imediato** — O `useCamera` expunha `panX`/`panY`/`zoom` como `useSpring` wrappers. `setImmediate` setava apenas o `MotionValue` fonte (`panXMv.set()`), mas a spring continuava animando do valor anterior até o novo alvo. Isso fazia o primeiro paint renderizar com `translate(700, 450)` — que coloca o centro do grafo em viewBox (1400, 900), i.e., fora da área visível.

2. **Gancho inicial hardcoded** — `useCamera` recebia `initial: { x: 700, y: 450, zoom: 1 }` (linha 62), antes de `positions` ser computado. O fit real só era aplicado em `useEffect` pós-pintura → flash visível do grafo no canto.

3. **`fitToView` usava `CANVAS_WIDTH`/`CANVAS_HEIGHT` fixos** — Ignorava o tamanho real do container medido por `useElementSize`, causando zoom/pan incorretos quando o viewport tinha proporção diferente de 1400×900.

4. **`computeFocusTarget` também usava canvas virtual** — Foco em nós usava `CANVAS_WIDTH`/`CANVAS_HEIGHT` em vez do viewport real.

## Correções

### `src/features/knowledge-graph/lib/camera.ts`

**`setImmediate` agora bypassa a spring** — seta tanto o `MotionValue` fonte quanto a saída da spring (`zoom.set()`, `panX.set()`, `panY.set()`), fazendo o salto ser verdadeiramente instantâneo.

```ts
// Antes: só setava o fonte → spring animava até o alvo
zoomMv.set(target.zoom);
panXMv.set(target.x);
panYMv.set(target.y);

// Depois: seta fonte + spring → salto imediato
zoomMv.set(target.zoom);
zoom.set(target.zoom);
panXMv.set(target.x);
panX.set(target.x);
panYMv.set(target.y);
panY.set(target.y);
```

### `src/features/knowledge-graph/knowledge-explorer.tsx`

**Reordenação de hooks** — `data` → `positions` → `initialFit` → `camera`. O `initialFit` é calculado sincronamente em `useMemo` e passado como `initial` da câmera. O primeiro paint já usa o fit correto, eliminando o flash.

**`viewportSize` derivado do `containerSize`** — Usa `useElementSize` para medir o container real. Quando a medição ainda é 0, usa `CANVAS_WIDTH`/`CANVAS_HEIGHT` como fallback.

```ts
const viewportSize = useMemo(() => ({
  width: containerSize.width > 100 ? containerSize.width : CANVAS_WIDTH,
  height: containerSize.height > 100 ? containerSize.height : CANVAS_HEIGHT,
}), [containerSize]);
```

**`fitToView` usa `viewportSize`** — O zoom e o pan são calculados contra o tamanho real do container, não mais contra 1400×900 fixo.

**`computeFocusTarget` usa `viewportSize`** — Foco em nós (clique, painel, busca) também respeita o viewport real.

**`canvasSize` removido** — Substituído por `viewportSize` em todos os pontos de uso. A variável `canvasSize` foi eliminada.

**`useEffect` de fit inicial removido** — Não é mais necessário pois `initialFit` já é calculado sincronamente e passado para `useCamera`. O `hasInitialFit` ref também foi removido.

**Resize handler simplificado** — Usa `setImmediate` (agora verdadeiramente imediato) em vez de `setTimeout` + `computeInitialFit` redundante.

## Arquivos alterados

| Arquivo | Alteração |
|---|---|
| `src/features/knowledge-graph/lib/camera.ts` | `setImmediate` bypassa spring |
| `src/features/knowledge-graph/knowledge-explorer.tsx` | Reordena hooks, `viewportSize` dinâmico, `initialFit` síncrono, `canvasSize` removido |

## Validação

```bash
npm run lint  # ✅ sem erros
npm run build # ✅ sem erros
```

## Resultado esperado

- Graph abre centralizado no primeiro frame
- Nós aparecem no meio da tela, sem flash no canto
- Zoom inicial é confortável (calculado contra viewport real)
- Reset view recoloca o grafo no centro
- Foco em nós (clique, painel, busca) centraliza corretamente
- Nada fica preso no canto
- Nenhuma funcionalidade nova criada
