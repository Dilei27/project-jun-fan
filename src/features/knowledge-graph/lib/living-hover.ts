/**
 * Living Hover — animation tokens, helpers, and class names
 * for the Knowledge Graph hover interaction system.
 *
 * All animation values are centralized here so they can be
 * tuned without touching rendering code.
 */

/* ─── CSS class names ─── */

export const LH = {
  NODE_HOVERED: 'kg-lh-hovered',
  NODE_NEIGHBOR: 'kg-lh-neighbor',
  NODE_DIMMED: 'kg-lh-dimmed',
  NODE_AWAKENING: 'kg-lh-awakening',
  EDGE_FLOW: 'kg-lh-edge-flow',
  EDGE_HOVERED: 'kg-lh-edge-hovered',
  OUTER_RING: 'kg-lh-outer-ring',
  MAGNETIC: 'kg-lh-magnetic',
  TRAIL: 'kg-lh-trail',
} as const

/* ─── Animation tokens ─── */

export const LIVING_HOVER = {
  /** Overall pulse for the hovered node */
  pulse: {
    duration: 2.8,
    scaleAmplitude: 0.04,
  },
  /** Glow opacity for the halo */
  glow: {
    hoveredOpacity: 0.5,
    neighborOpacity: 0.2,
    nonRelatedOpacity: 0,
  },
  /** Outer ring around hovered node */
  outerRing: {
    strokeWidth: 1.5,
    offset: 8,
    opacity: 0.45,
    pulseDuration: 3.2,
  },
  /** Magnetic pull */
  magnetic: {
    maxPixels: 3,
    pullRadius: 50,
  },
  /** Neighbor cascade */
  cascade: {
    delayPerNeighbor: 0.035,
    maxDelay: 0.35,
  },
  /** Edge flow animation */
  flow: {
    dashArray: '3 8',
    animationDuration: 1.2,
  },
  /** Cursor trail (disabled by default) */
  trail: {
    maxPoints: 15,
    baseOpacity: 0.03,
    disabledByDefault: true,
  },
} as const

/* ─── Helpers ─── */

/**
 * Compute a magnetic pull offset toward the cursor.
 * Returns zero when cursor is outside pullRadius or at the node center.
 */
export function computeMagneticOffset(
  nodeX: number,
  nodeY: number,
  cursorSVGX: number,
  cursorSVGY: number,
): { dx: number; dy: number } {
  const dx = cursorSVGX - nodeX
  const dy = cursorSVGY - nodeY
  const dist = Math.sqrt(dx * dx + dy * dy)
  const { maxPixels, pullRadius } = LIVING_HOVER.magnetic

  if (dist > pullRadius || dist < 1) return { dx: 0, dy: 0 }

  const strength = Math.max(0, 1 - dist / pullRadius)
  return {
    dx: (dx / dist) * strength * maxPixels,
    dy: (dy / dist) * strength * maxPixels,
  }
}

/**
 * Compute the cascade animation delay for a neighbor node by its index.
 */
export function getCascadeDelay(neighborIndex: number): number {
  const { delayPerNeighbor, maxDelay } = LIVING_HOVER.cascade
  return Math.min(neighborIndex * delayPerNeighbor, maxDelay)
}

/**
 * Determine the living-hover CSS class for a node based on its hover state.
 */
export function getNodeHoverClass(
  isHovered: boolean,
  isNeighbor: boolean,
  isDimmed: boolean,
): string {
  if (isHovered) return LH.NODE_HOVERED
  if (isNeighbor) return LH.NODE_NEIGHBOR
  if (isDimmed) return LH.NODE_DIMMED
  return ''
}

/**
 * Determine whether an edge should show flow animation.
 */
export function shouldEdgeFlow(
  edgeSource: string,
  edgeTarget: string,
  hoveredNodeId: string | null,
  neighborIds: Set<string>,
): boolean {
  if (!hoveredNodeId) return false
  return (
    edgeSource === hoveredNodeId ||
    edgeTarget === hoveredNodeId ||
    (neighborIds.has(edgeSource) && neighborIds.has(edgeTarget))
  )
}
