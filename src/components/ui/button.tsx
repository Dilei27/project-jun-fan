'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { type ReactNode } from 'react';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  icon?: ReactNode;
  children?: ReactNode;
}

const variantClasses: Record<string, string> = {
  primary: 'bg-accent-qa text-white hover:bg-accent-qa/90',
  secondary: 'bg-surface-elevated text-text-primary border border-border-subtle hover:bg-surface-soft',
  ghost: 'text-text-secondary hover:text-text-primary hover:bg-surface-soft',
  danger: 'bg-danger text-white hover:bg-danger/90',
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
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-accent-qa cursor-pointer ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {icon && <span className="w-4 h-4">{icon}</span>}
      {children}
    </motion.button>
  );
}
