'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type IntroPhase = 'ambient' | 'camera' | 'waves' | 'connections' | 'hud' | 'done';

interface CinematicIntroProps {
  onPhaseChange?: (phase: IntroPhase) => void;
  onComplete?: () => void;
}

/**
 * Cinematic entry — 4.8s total
 * 0.0-0.6s  ambient    (vignette, dim letterbox)
 * 0.6-1.4s  camera     (zoom out)
 * 1.4-3.4s  waves      (nodes appear by group)
 * 3.4-4.4s  connections (draw)
 * 4.4-4.8s  hud        (search, filters, legend)
 */
export function CinematicIntro({
  onPhaseChange,
  onComplete,
}: CinematicIntroProps) {
  const [phase, setPhase] = useState<IntroPhase>('ambient');

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      // Defer to next frame to avoid setState-in-effect warning
      requestAnimationFrame(() => {
        setPhase(prev => (prev === 'done' ? prev : 'done'));
        onPhaseChange?.('done');
        onComplete?.();
      });
      return;
    }

    const timeline: Array<{ p: IntroPhase; at: number }> = [
      { p: 'ambient', at: 0 },
      { p: 'camera', at: 600 },
      { p: 'waves', at: 1400 },
      { p: 'connections', at: 3400 },
      { p: 'hud', at: 4400 },
      { p: 'done', at: 4800 },
    ];

    const timers: number[] = [];
    timeline.forEach(({ p, at }) => {
      const id = window.setTimeout(() => {
        setPhase(prev => (prev === p ? prev : p));
        onPhaseChange?.(p);
        if (p === 'done') onComplete?.();
      }, at);
      timers.push(id);
    });

    return () => {
      timers.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (phase === 'done') return null;

  return (
    <AnimatePresence>
      <motion.div
        key="intro-overlay"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
        className="absolute inset-0 z-40 pointer-events-none"
      >
        <motion.div
          aria-hidden
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 100% 70% at 50% 50%, transparent 40%, rgba(7, 10, 15, 0.7) 100%)',
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: phase === 'ambient' ? 1 : 0, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
        >
          <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-text-muted">
            Inicializando Knowledge Explorer
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
