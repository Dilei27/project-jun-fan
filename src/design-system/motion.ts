/**
 * Jun Fan Motion Language
 *
 * Linguagem cinematográfica coesa. Todo movimento do produto
 * deve derivar destes tokens. Nada deve usar valores avulsos.
 *
 * Filosofia:
 *  - Curvas: ease-out para entradas (vivo), spring para posição
 *  - Durações: curtas no micro, longas no reveal
 *  - Stagger: sutil, nunca agressivo
 *  - Respiro: animações contínuas quase imperceptíveis
 */

export const easing = {
  out: [0.16, 1, 0.3, 1] as const,
  in: [0.4, 0, 1, 1] as const,
  inOut: [0.4, 0, 0.2, 1] as const,
  standard: [0.4, 0, 0.2, 1] as const,
} as const;

export const duration = {
  // Atomic primitives
  micro: 0.12,         // cursor blink, micro toggle
  microFast: 0.18,     // ultra-quick feedback (hover button)
  fast: 0.2,           // hover, focus, micro
  snap: 0.22,          // snappy UI (AI Dock button)
  snappy: 0.25,        // quick reveal (suggestions)
  quick: 0.3,          // quick reveal (skeleton, panels)
  normal: 0.36,        // standard entry
  reveal: 0.4,         // reveal transitions
  slow: 0.56,          // slow reveals
  atmospheric: 0.6,    // ambient transitions (vignette, page)
  cinematic: 0.8,      // cinematic
} as const;

export const spring = {
  gentle: { type: 'spring' as const, stiffness: 180, damping: 26, mass: 0.9 },
  snappy: { type: 'spring' as const, stiffness: 320, damping: 28, mass: 0.7 },
  soft: { type: 'spring' as const, stiffness: 120, damping: 22, mass: 1.1 },
  // For TiltCard-style cards
  tilt: { type: 'spring' as const, stiffness: 220, damping: 18, mass: 0.5 },
  // For camera (parallax)
  parallax: { type: 'spring' as const, stiffness: 60, damping: 20, mass: 0.6 },
} as const;

export const stagger = {
  tight: 0.04,
  default: 0.08,
  relaxed: 0.12,
  cinematic: 0.16,
} as const;

export const motion = {
  duration,
  easing,
  spring,
  stagger,

  variants: {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: duration.normal, ease: easing.out },
    },
    slideUp: {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -8 },
      transition: { duration: duration.normal, ease: easing.out },
    },
    slideDown: {
      initial: { opacity: 0, y: -8 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -8 },
      transition: { duration: duration.normal, ease: easing.out },
    },
    scaleIn: {
      initial: { opacity: 0, scale: 0.96 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.96 },
      transition: { duration: duration.normal, ease: easing.out },
    },
    panelRight: {
      initial: { opacity: 0, x: 24 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 24 },
      transition: { duration: duration.slow, ease: easing.out },
    },
    pop: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 },
      transition: spring.gentle,
    },
  },

  hover: {
    lift: { y: -2, transition: { duration: duration.fast, ease: easing.out } },
    glow: {
      boxShadow: '0 0 0 1px rgba(79,140,255,0.18), 0 12px 32px -8px rgba(79,140,255,0.18)',
      transition: { duration: duration.normal, ease: easing.out },
    },
    scale: { scale: 1.015, transition: { duration: duration.fast, ease: easing.out } },
    scaleStrong: { scale: 1.03, transition: { duration: duration.fast, ease: easing.out } },
  },

  tap: {
    soft: { scale: 0.98, transition: { duration: duration.micro, ease: easing.in } },
    strong: { scale: 0.95, transition: { duration: duration.micro, ease: easing.in } },
  },

  breathing: {
    slow: {
      scale: [1, 1.015, 1],
      opacity: [0.95, 1, 0.95],
      transition: { duration: 6, repeat: Infinity, ease: easing.inOut },
    },
    dot: {
      opacity: [0.6, 1, 0.6],
      transition: { duration: 2.4, repeat: Infinity, ease: easing.inOut },
    },
  },
} as const;

export type MotionDuration = keyof typeof duration;
export type MotionEasing = keyof typeof easing;
export type MotionSpring = keyof typeof spring;
export type MotionStagger = keyof typeof stagger;
