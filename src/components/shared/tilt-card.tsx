'use client';

import { useRef, useCallback, useState, type ReactNode, type MouseEvent } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface TiltCardProps extends Omit<HTMLMotionProps<'div'>, 'children' | 'onMouseMove' | 'onMouseLeave'> {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees (default 2 — extremely subtle) */
  maxTilt?: number;
  /** Accent color (rgb) for cursor spotlight. Default = QA blue */
  accentRgb?: string;
  /** Spotlight intensity 0-1 (default 0.15) */
  spotlightIntensity?: number;
  /** When true, scales up on hover */
  liftOnHover?: boolean;
  innerClassName?: string;
  as?: 'div' | 'article' | 'section' | 'button' | 'a';
  href?: string;
  onMouseMove?: (e: MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (e: MouseEvent<HTMLDivElement>) => void;
}

/**
 * TiltCard — a card that responds to cursor position.
 *
 * - 3D tilt (max 2°) following mouse
 * - Spotlight follows cursor
 * - Lift on hover
 * - Subtle spring return on mouse leave
 *
 * Feels like the card is a physical object responding to attention.
 */
export function TiltCard({
  children,
  className = '',
  maxTilt = 2,
  accentRgb = '79, 140, 255',
  spotlightIntensity = 0.15,
  liftOnHover = true,
  innerClassName = '',
  as = 'div',
  onMouseMove,
  onMouseLeave,
  style,
  ...rest
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [spot, setSpot] = useState<{ x: number; y: number } | null>(null);
  const [hover, setHover] = useState(false);

  const handleMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const nx = dx / (rect.width / 2);
      const ny = dy / (rect.height / 2);
      setTilt({
        x: -ny * maxTilt,
        y: nx * maxTilt,
      });
      setSpot({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      onMouseMove?.(e);
    },
    [maxTilt, onMouseMove],
  );

  const handleLeave = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      setTilt({ x: 0, y: 0 });
      setSpot(null);
      setHover(false);
      onMouseLeave?.(e);
    },
    [onMouseLeave],
  );

  const Component = motion[as] as typeof motion.div;

  return (
    <Component
      ref={ref as never}
      onMouseMove={handleMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={handleLeave}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        y: hover && liftOnHover ? -2 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 220,
        damping: 18,
        mass: 0.5,
      }}
      style={{
        transformStyle: 'preserve-3d',
        transformPerspective: 1200,
        ...style,
      }}
      className={`relative ${className}`}
      {...rest}
    >
      {/* Cursor-following spotlight */}
      {spot && (
        <motion.div
          aria-hidden
          animate={{ opacity: hover ? spotlightIntensity : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            background: `radial-gradient(280px circle at ${spot.x}px ${spot.y}px, rgba(${accentRgb}, 0.6), transparent 60%)`,
          }}
        />
      )}
      <div className={`relative ${innerClassName}`} style={{ transform: 'translateZ(0)' }}>
        {children}
      </div>
    </Component>
  );
}
