'use client';

import { useRef, useCallback, useEffect, useState } from 'react';
import { computeMagneticOffset, LIVING_HOVER } from '../lib/living-hover';

/**
 * Minimal hook for the Living Hover system.
 *
 * Tracks cursor position relative to the SVG canvas and exposes:
 * - cursorSVGRef — stable ref (no re-renders on move)
 * - magneticRef — current magnetic offset for hovered node (no re-renders)
 * - trailRef — array of trail points for direct SVG rendering
 *
 * The hook avoids setState on mouse move to prevent layout storms.
 * Trail is rendered via useLayoutEffect reading trailRef directly.
 */

const { maxPoints } = LIVING_HOVER.trail

export interface LivingHoverAPI {
  cursorSVGRef: React.MutableRefObject<{ x: number; y: number } | null>
  magneticRef: React.MutableRefObject<{ nodeId: string | null; dx: number; dy: number }>
  trailRef: React.MutableRefObject<Array<{ x: number; y: number }>>
  handleMouseMove: (clientX: number, clientY: number) => void
  setMagneticTarget: (nodeId: string, nodeX: number, nodeY: number, cursorX: number, cursorY: number) => void
  clearMagnetic: () => void
}

export function useLivingHover(
  svgRef: React.RefObject<SVGSVGElement | null>,
  canvasWidth: number,
  canvasHeight: number,
): LivingHoverAPI {
  const cursorSVGRef = useRef<{ x: number; y: number } | null>(null)
  const magneticRef = useRef<{ nodeId: string | null; dx: number; dy: number }>({
    nodeId: null, dx: 0, dy: 0,
  })
  const trailRef = useRef<Array<{ x: number; y: number }>>([])

  const clientToSVG = useCallback((clientX: number, clientY: number) => {
    const svg = svgRef.current
    if (!svg) return null
    const rect = svg.getBoundingClientRect()
    const scaleX = canvasWidth / rect.width
    const scaleY = canvasHeight / rect.height
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    }
  }, [svgRef, canvasWidth, canvasHeight])

  const handleMouseMove = useCallback((clientX: number, clientY: number) => {
    const svgPos = clientToSVG(clientX, clientY)
    if (!svgPos) return
    cursorSVGRef.current = svgPos

    // Update trail — skip tiny moves
    const trail = trailRef.current
    if (trail.length > 0) {
      const last = trail[trail.length - 1]
      const dist = Math.sqrt((svgPos.x - last.x) ** 2 + (svgPos.y - last.y) ** 2)
      if (dist < 10) return
    }
    trail.push(svgPos)
    if (trail.length > maxPoints) {
      trail.splice(0, trail.length - maxPoints)
    }
  }, [clientToSVG])

  const setMagneticTarget = useCallback(
    (nodeId: string, nodeX: number, nodeY: number, cursorX: number, cursorY: number) => {
      const svgPos = clientToSVG(cursorX, cursorY)
      if (!svgPos) return
      cursorSVGRef.current = svgPos
      const offset = computeMagneticOffset(nodeX, nodeY, svgPos.x, svgPos.y)
      magneticRef.current = { nodeId, dx: offset.dx, dy: offset.dy }
    },
    [clientToSVG],
  )

  const clearMagnetic = useCallback(() => {
    magneticRef.current = { nodeId: null, dx: 0, dy: 0 }
    trailRef.current = []
  }, [])

  return {
    cursorSVGRef,
    magneticRef,
    trailRef,
    handleMouseMove,
    setMagneticTarget,
    clearMagnetic,
  }
}
