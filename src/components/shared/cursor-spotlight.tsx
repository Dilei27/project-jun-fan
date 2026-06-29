'use client';

import { useRef, useState, useCallback, type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CursorSpotlightProps {
  children: ReactNode;
  className?: string;
  color?: string;
  size?: number;
  intensity?: number;
  /** Inner content padding (so spotlight doesn't bleed) */
  innerClassName?: string;
}

/**
 * Cursor-following spotlight — adds a soft radial gradient that follows the
 * mouse within the container. Gives a sense of "the light responds to me".
 *
 * Use sparingly: cards, hero sections, panels.
 * Never combine with cursor-following tilt (overkill).
 */
export function CursorSpotlight({
  children,
  className = '',
  color = '79, 140, 255', // QA blue, rgb format
  size = 320,
  intensity = 0.18,
  innerClassName = '',
}: CursorSpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [active, setActive] = useState(false);

  const handleMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={`relative overflow-hidden ${className}`}
    >
      {pos && (
        <motion.div
          aria-hidden
          initial={false}
          animate={{
            opacity: active ? intensity : 0,
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(${size}px circle at ${pos.x}px ${pos.y}px, rgba(${color}, 1), transparent 60%)`,
          }}
        />
      )}
      <div className={innerClassName}>{children}</div>
    </div>
  );
}
