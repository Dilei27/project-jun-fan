'use client';

import { motion } from 'framer-motion';

interface ThinkingWaveProps {
  className?: string;
  dotSize?: number;
  gap?: number;
  color?: string;
}

/**
 * Thinking wave — three dots that pulse in a wave.
 * Suggests intelligence without text. Used by AI Dock idle state.
 */
export function ThinkingWave({
  className = '',
  dotSize = 3,
  gap = 4,
  color = '#F4F7FA',
}: ThinkingWaveProps) {
  return (
    <span
      className={`inline-flex items-center ${className}`}
      style={{ gap }}
      aria-hidden
    >
      {[0, 1, 2].map(i => (
        <motion.span
          key={i}
          animate={{
            opacity: [0.3, 1, 0.3],
            y: [0, -2, 0],
          }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.18,
          }}
          className="block rounded-full"
          style={{
            width: dotSize,
            height: dotSize,
            background: color,
          }}
        />
      ))}
    </span>
  );
}
