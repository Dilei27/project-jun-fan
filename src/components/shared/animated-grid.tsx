'use client';

import { motion, type Variants } from 'framer-motion';
import { type ReactNode } from 'react';
import { motion as m } from '@/design-system/motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: m.stagger.default,
      delayChildren: 0.04,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: m.duration.normal, ease: [...m.easing.out] },
  },
};

interface AnimatedGridProps {
  children: ReactNode;
  className?: string;
  amount?: number;
  once?: boolean;
}

export function AnimatedGrid({
  children,
  className = '',
  amount = 0.15,
  once = true,
}: AnimatedGridProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface AnimatedItemProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedItem({ children, className = '' }: AnimatedItemProps) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

export { containerVariants, itemVariants };
