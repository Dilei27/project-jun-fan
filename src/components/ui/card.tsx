'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { type ReactNode } from 'react';
import { motion as m } from '@/design-system/motion';

interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  accent?: string;
  onClick?: () => void;
  asButton?: boolean;
  /**
   * depth — 'flat' (sem sombra), 'low' (cards em repouso), 'mid' (hover/elevated), 'high' (panels)
   */
  depth?: 'flat' | 'low' | 'mid' | 'high';
}

export function Card({
  children,
  className = '',
  hover = false,
  accent,
  onClick,
  asButton,
  depth = 'low',
  ...props
}: CardProps) {
  const interactive = hover || !!onClick || !!asButton;

  const depthClass = {
    flat: '',
    low: 'shadow-[var(--shadow-low)]',
    mid: 'shadow-[var(--shadow-mid)]',
    high: 'shadow-[var(--shadow-high)]',
  }[depth];

  return (
    <motion.div
      onClick={onClick}
      whileHover={
        interactive
          ? { y: -2, transition: { duration: m.duration.fast, ease: m.easing.out } }
          : undefined
      }
      whileTap={interactive ? m.tap.soft : undefined}
      className={`
        relative
        bg-surface-default
        border border-border-subtle/60
        rounded-lg p-6
        ${depthClass}
        ${interactive ? 'jf-lift cursor-pointer transition-[box-shadow,border-color,background-color] duration-200' : ''}
        ${accent ? 'border-l-2' : ''}
        ${className}
      `}
      style={accent ? { borderLeftColor: accent } : undefined}
      {...props}
    >
      {children}
    </motion.div>
  );
}
