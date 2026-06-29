'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, GitFork, Shield, FileText, BookOpen, Compass } from 'lucide-react';
import { motion as m } from '@/design-system/motion';

interface Suggestion {
  label: string
  href: string
  description: string
}

interface ContextHintProps {
  icon?: typeof Compass
  title: string
  description: string
  suggestions: Suggestion[]
}

const ICON_MAP = {
  Compass, GitFork, Shield, FileText, BookOpen, ArrowRight,
};

export function ContextHint({ icon: Icon = Compass, title, description, suggestions }: ContextHintProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: m.easing.out }}
      className="flex flex-col items-center text-center py-12 px-6"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.05, ease: m.easing.out }}
        className="mb-4 w-12 h-12 rounded-2xl flex items-center justify-center"
        style={{
          background: 'rgba(79, 140, 255, 0.06)',
          border: '1px solid rgba(79, 140, 255, 0.1)',
        }}
      >
        <Icon size={20} className="text-accent-qa/60" />
      </motion.div>
      <motion.h3
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: m.easing.out }}
        className="text-sm font-semibold text-text-primary tracking-[-0.01em] mb-2"
      >
        {title}
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15, ease: m.easing.out }}
        className="text-xs text-text-muted max-w-sm leading-relaxed mb-6"
      >
        {description}
      </motion.p>
      <div className="space-y-1.5">
        {suggestions.map((s, i) => (
          <motion.div
            key={s.href}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 + i * 0.06, ease: m.easing.out }}
          >
            <Link
              href={s.href}
              className="group flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] transition-all"
              style={{
                background: 'rgba(79, 140, 255, 0.04)',
                border: '1px solid rgba(79, 140, 255, 0.08)',
              }}
            >
              <span className="text-accent-qa/60 font-medium">{s.label}</span>
              <span className="text-text-muted/50">{s.description}</span>
              <ArrowRight size={10} className="ml-auto text-accent-qa/40 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
