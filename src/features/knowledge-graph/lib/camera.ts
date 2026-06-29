export interface CameraTarget {
  x: number;
  y: number;
  zoom: number;
}

export interface CameraState {
  x: number;
  y: number;
  zoom: number;
}

export function cubicBezier(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function computeFocusTarget(
  nodePosition: { x: number; y: number },
  canvasSize: { width: number; height: number },
  targetZoom = 1.6,
): CameraTarget {
  return {
    x: -nodePosition.x * targetZoom + canvasSize.width / 2,
    y: -nodePosition.y * targetZoom + canvasSize.height / 2,
    zoom: targetZoom,
  };
}

export function computeFitTarget(
  positions: Array<{ x: number; y: number }>,
  canvasSize: { width: number; height: number },
  padding = 120,
  options: { minZoom?: number; maxZoom?: number } = {},
): CameraTarget {
  if (positions.length === 0) {
    return { x: 0, y: 0, zoom: 1 };
  }
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const p of positions) {
    if (p.x < minX) minX = p.x;
    if (p.x > maxX) maxX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.y > maxY) maxY = p.y;
  }
  const w = maxX - minX + padding * 2;
  const h = maxY - minY + padding * 2;
  if (w <= 0 || h <= 0) return { x: 0, y: 0, zoom: 1 };
  const rawZoom = Math.min(canvasSize.width / w, canvasSize.height / h);
  const { minZoom = 0.3, maxZoom = 2 } = options;
  const zoom = Math.max(minZoom, Math.min(maxZoom, rawZoom));
  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;
  return {
    x: -centerX * zoom + canvasSize.width / 2,
    y: -centerY * zoom + canvasSize.height / 2,
    zoom,
  };
}

export function computeInitialFit(
  positions: Array<{ x: number; y: number }>,
  canvasSize: { width: number; height: number },
  padding = 100,
): CameraTarget {
  if (positions.length === 0) {
    return { x: canvasSize.width / 2, y: canvasSize.height / 2, zoom: 1 };
  }
  return computeFitTarget(positions, canvasSize, padding, { minZoom: 0.4, maxZoom: 1.4 });
}
