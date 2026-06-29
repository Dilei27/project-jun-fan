'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { type ReactNode } from 'react';
import { motion as m } from '@/design-system/motion';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  icon?: ReactNode;
  children?: ReactNode;
}

const variantClasses: Record<string, string> = {
  primary:
    'bg-accent-qa text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_4px_16px_-4px_rgba(79,140,255,0.35)] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.16),0_8px_24px_-6px_rgba(79,140,255,0.5)] hover:bg-accent-qa/95',
  secondary:
    'bg-surface-elevated text-text-primary border border-border-subtle/60 shadow-[inset_0_1px_0_0_rgba(244,247,250,0.04)] hover:border-border-strong hover:bg-surface-soft',
  ghost:
    'text-text-secondary hover:text-text-primary hover:bg-surface-soft',
  danger:
    'bg-danger text-white shadow-[0_4px_16px_-4px_rgba(239,68,68,0.4)] hover:bg-danger/95',
};

export function Button({
  variant = 'primary',
  icon,
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{
        y: -1,
        transition: { duration: m.duration.fast, ease: m.easing.out },
      }}
      whileTap={m.tap.soft}
      className={`
        relative inline-flex items-center gap-2
        px-4 py-2 rounded-md
        text-sm font-medium
        transition-[box-shadow,background-color,border-color,color] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]
        focus-visible:outline-2 focus-visible:outline-accent-qa focus-visible:outline-offset-2
        cursor-pointer
        ${variantClasses[variant]}
        ${className}
      `}
      {...props}
    >
      {icon && (
        <span className="w-4 h-4 inline-flex items-center justify-center">
          {icon}
        </span>
      )}
      {children}
    </motion.button>
  );
}
