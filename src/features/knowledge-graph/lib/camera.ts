/**
 * Camera System — cinematografia do Knowledge Explorer.
 *
 * Filosofia:
 *  - Nunca teletransportar, sempre viajar
 *  - Bezier easing (não linear)
 *  - Eixo-X e Y independentes para parallax sutil
 *  - Travel resolve promise ao completar
 */

import { useCallback } from 'react';
import { useMotionValue, useSpring, animate } from 'framer-motion';

export interface CameraTarget {
  x: number; // pan
  y: number;
  zoom: number; // 0.3 .. 3
}

export interface CameraState {
  x: number;
  y: number;
  zoom: number;
}

export interface UseCameraOptions {
  initial?: CameraTarget;
  zoomStiffness?: number;
  panStiffness?: number;
  zoomDamping?: number;
  panDamping?: number;
}

const DEFAULTS = {
  zoomStiffness: 140,
  panStiffness: 110,
  zoomDamping: 24,
  panDamping: 22,
};

export function useCamera(options: UseCameraOptions = {}) {
  const {
    initial = { x: 0, y: 0, zoom: 1 },
    zoomStiffness = DEFAULTS.zoomStiffness,
    panStiffness = DEFAULTS.panStiffness,
    zoomDamping = DEFAULTS.zoomDamping,
    panDamping = DEFAULTS.panDamping,
  } = options;

  const zoomMv = useMotionValue(initial.zoom);
  const panXMv = useMotionValue(initial.x);
  const panYMv = useMotionValue(initial.y);

  const zoom = useSpring(zoomMv, { stiffness: zoomStiffness, damping: zoomDamping, mass: 0.7 });
  const panX = useSpring(panXMv, { stiffness: panStiffness, damping: panDamping, mass: 0.8 });
  const panY = useSpring(panYMv, { stiffness: panStiffness, damping: panDamping, mass: 0.8 });

  const setImmediate = useCallback((target: CameraTarget) => {
    zoomMv.set(target.zoom);
    zoom.set(target.zoom);
    panXMv.set(target.x);
    panX.set(target.x);
    panYMv.set(target.y);
    panY.set(target.y);
  }, [zoomMv, zoom, panXMv, panX, panYMv, panY]);

  /**
   * Travel to a target with cinematic easing.
   * Resolves when the motion value reaches within tolerance of the target.
   */
  const travelTo = useCallback(
    (target: CameraTarget, duration = 1.4, easing?: (t: number) => number): Promise<void> => {
      return Promise.all([
        animate(zoomMv, target.zoom, { duration, ease: easing ?? cubicBezier }),
        animate(panXMv, target.x, { duration, ease: easing ?? cubicBezier }),
        animate(panYMv, target.y, { duration, ease: easing ?? cubicBezier }),
      ]).then(() => undefined);
    },
    [zoomMv, panXMv, panYMv],
  );

  const travelZoom = useCallback(
    (zoomTarget: number, duration = 0.8): Promise<void> => {
      return animate(zoomMv, zoomTarget, { duration, ease: cubicBezier }).then(() => undefined);
    },
    [zoomMv],
  );

  const travelPan = useCallback(
    (x: number, y: number, duration = 1.0): Promise<void> => {
      return Promise.all([
        animate(panXMv, x, { duration, ease: cubicBezier }),
        animate(panYMv, y, { duration, ease: cubicBezier }),
      ]).then(() => undefined);
    },
    [panXMv, panYMv],
  );

  return {
    zoom,
    panX,
    panY,
    setImmediate,
    travelTo,
    travelZoom,
    travelPan,
  };
}

// Smooth easeInOutCubic
function cubicBezier(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export { cubicBezier };

/**
 * Compute camera target to focus on a node.
 * Optionally applies a target zoom level.
 */
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

/**
 * Compute camera target to fit a set of nodes.
 * canvasSize is the **virtual canvas** size (e.g. 1400×900) since the
 * camera transform is applied in canvas coordinates.
 */
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

/**
 * Compute initial fit for a fresh graph based on its bounding box.
 * If bounding box is not yet available, returns a centered default.
 */
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
