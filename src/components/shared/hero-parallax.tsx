'use client';

import { useRef, useState, useCallback, useEffect, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { motion as m } from '@/design-system/motion';

interface HeroParallaxProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener('change', handler);
    // Sync state on next frame to avoid setState-in-effect
    requestAnimationFrame(() => setMatches(mq.matches));
    return () => mq.removeEventListener('change', handler);
  }, [query]);
  return matches;
}

function useIsMobile(): boolean {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () => {
      // Defer to next frame
      requestAnimationFrame(() => setMobile(window.innerWidth < 768));
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return mobile;
}

export function HeroParallax({ children, className = '', intensity = 0.3 }: HeroParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const mobile = useIsMobile();

  const handleMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current || reduced || mobile) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      setOffset({
        x: (dx / rect.width) * intensity * 30,
        y: (dy / rect.height) * intensity * 30,
      });
    },
    [intensity, reduced, mobile],
  );

  const handleLeave = useCallback(() => setOffset({ x: 0, y: 0 }), []);

  return (
    <div
      ref={ref}
      data-jf-parallax
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`relative ${className}`}
    >
      <motion.div
        aria-hidden
        animate={{
          x: reduced || mobile ? 0 : -offset.x,
          y: reduced || mobile ? 0 : -offset.y,
        }}
        transition={m.spring.parallax}
        className="pointer-events-none absolute inset-0"
      >
        {children}
      </motion.div>
    </div>
  );
}
