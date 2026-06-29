'use client';

import { useEffect, useState, useRef, type RefObject } from 'react';

interface Size {
  width: number;
  height: number;
}

/**
 * Observe element size via ResizeObserver.
 * Falls back to getBoundingClientRect on mount, and to a safe default
 * (1280×720) if dimensions are still 0.
 */
export function useElementSize<T extends HTMLElement>(
  ref: RefObject<T | null>,
  fallback: Size = { width: 1280, height: 720 },
): Size {
  const [size, setSize] = useState<Size>(fallback);
  const lastReported = useRef<Size>(fallback);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;

    const report = () => {
      const rect = el.getBoundingClientRect();
      const next: Size = {
        width: Math.max(0, rect.width),
        height: Math.max(0, rect.height),
      };
      // Avoid redundant updates
      if (
        Math.abs(next.width - lastReported.current.width) > 0.5 ||
        Math.abs(next.height - lastReported.current.height) > 0.5
      ) {
        lastReported.current = next;
        // Defer to next frame to avoid setState-in-effect
        requestAnimationFrame(() => setSize(next));
      }
    };

    // Initial measure (deferred to next frame)
    requestAnimationFrame(report);

    // ResizeObserver
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => report());
      ro.observe(el);
    } else {
      // Fallback: window resize
      window.addEventListener('resize', report);
    }

    return () => {
      if (ro) ro.disconnect();
      else window.removeEventListener('resize', report);
    };
  }, [ref]);

  return size;
}
