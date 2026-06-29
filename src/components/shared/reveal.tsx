'use client';

import { motion } from 'framer-motion';
import { type ReactNode } from 'react';
import { motion as m } from '@/design-system/motion';

interface RevealTextProps {
  children: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export function RevealText({ children, className = '', delay = 0, as = 'h1' }: RevealTextProps) {
  const words = children.split(' ');
  const Tag = motion[as] as typeof motion.h1;

  return (
    <Tag
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: m.stagger.tight, delayChildren: delay } },
      }}
      className={className}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-baseline">
          <motion.span
            variants={{
              hidden: { y: '110%', opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: { duration: m.duration.slow, ease: m.easing.out },
              },
            }}
            className="inline-block"
          >
            {word}
            {i < words.length - 1 && '\u00A0'}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
}

export function FadeIn({ children, className = '', delay = 0, duration, y = 12 }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: duration ?? m.duration.normal, ease: m.easing.out, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface HeroStageProps {
  className?: string;
  children: ReactNode;
}

export function HeroStage({ className = '', children }: HeroStageProps) {
  return (
    <section
      className={`relative overflow-hidden ${className}`}
      style={{ background: 'var(--color-bg-base)' }}
    >
      {/* Camada 1: Top ambient — luz "céu" */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 100% 60% at 50% 0%, rgba(79, 140, 255, 0.08), transparent 60%)',
        }}
      />

      {/* Camada 2: Side rim — luz lateral discreta */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 80% at 0% 50%, rgba(45, 212, 191, 0.03), transparent 60%)',
        }}
      />

      {/* Camada 3: Floor light — luz de "chão" que sobe */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(79, 140, 255, 0.04), transparent)',
        }}
      />

      {/* Camada 4: Orbs vivos (atmosfera) */}
      <HeroOrbs />

      {/* Camada 5: Borda inferior sutil (separador de seção) */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, transparent 0%, rgba(79, 140, 255, 0.10) 50%, transparent 100%)',
        }}
      />

      <div className="relative">{children}</div>
    </section>
  );
}

interface HeroOrbsProps {
  className?: string;
}

export function HeroOrbs({ className = '' }: HeroOrbsProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: m.duration.cinematic, ease: m.easing.out }}
        className="jf-glow-orb -top-40 -right-40 w-[28rem] h-[28rem] bg-accent-qa/8"
        style={{ animation: 'breathing 8s ease-in-out infinite' }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: m.duration.cinematic, ease: m.easing.out, delay: 0.2 }}
        className="jf-glow-orb -bottom-32 -left-32 w-[24rem] h-[24rem] bg-accent-whatsapp/6"
        style={{ animation: 'breathing 9s ease-in-out infinite 1s' }}
      />
    </div>
  );
}
