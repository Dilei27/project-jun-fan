/**
 * Jun Fan Atmosphere System
 *
 * Define a "iluminação" do produto. Tudo o que cria profundidade,
 * presença e elegância deriva desta fonte única de tokens.
 *
 * Filosofia:
 *  - Uma única direção de luz (top-left)
 *  - Sombras são multicamada (key + ambient + ground)
 *  - Glows são ambientes, nunca decorativos
 *  - Vidro é estrutural, não efeito
 *  - Espaço negativo é tão importante quanto conteúdo
 */

export const light = {
  // Top-edge rim light — luz "céu" que incide no topo dos elementos
  rim: {
    color: 'rgba(244, 247, 250, 0.04)',
    inset: 'inset 0 1px 0 0 rgba(244, 247, 250, 0.04)',
  },

  // Ambient glow — luz ambiente sutil que envolve elementos em hover/foco
  ambient: {
    color: 'rgba(79, 140, 255, 0.10)',
    spread: '0 0 0 1px rgba(79, 140, 255, 0.10), 0 12px 32px -12px rgba(79, 140, 255, 0.20)',
  },

  // Ground shadow — sombra "chão" abaixo do elemento
  ground: {
    soft: '0 8px 24px -8px rgba(0, 0, 0, 0.4)',
    diffuse: '0 24px 48px -16px rgba(0, 0, 0, 0.4)',
  },

  // Hero spotlight — luz focada que destaca a área do CTA
  spot: {
    qa: 'radial-gradient(ellipse 80% 60% at 30% 60%, rgba(79, 140, 255, 0.10), transparent 70%)',
    whatsapp: 'radial-gradient(ellipse 60% 50% at 80% 20%, rgba(45, 212, 191, 0.06), transparent 60%)',
    vigilante: 'radial-gradient(ellipse 50% 40% at 20% 90%, rgba(249, 115, 22, 0.05), transparent 60%)',
  },

  // Page ambient — gradiente sutil no fundo de toda página
  page: {
    top: 'radial-gradient(ellipse 120% 60% at 50% -10%, rgba(79, 140, 255, 0.05), transparent 60%)',
    bottom: 'radial-gradient(ellipse 100% 50% at 50% 110%, rgba(45, 212, 191, 0.03), transparent 60%)',
  },
} as const;

export const shadow = {
  // Elevação 0 — plano
  flat: 'none',

  // Elevação 1 — base (cards em repouso)
  low:
    'inset 0 1px 0 0 rgba(244, 247, 250, 0.03), 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 4px 12px -4px rgba(0, 0, 0, 0.3)',

  // Elevação 2 — hover (cards interativos)
  mid:
    'inset 0 1px 0 0 rgba(244, 247, 250, 0.05), 0 0 0 1px rgba(79, 140, 255, 0.08), 0 8px 24px -6px rgba(0, 0, 0, 0.4), 0 16px 32px -8px rgba(0, 0, 0, 0.3)',

  // Elevação 3 — painéis (modais, command palette)
  high:
    'inset 0 1px 0 0 rgba(244, 247, 250, 0.06), 0 0 0 1px rgba(79, 140, 255, 0.06), 0 20px 48px -12px rgba(0, 0, 0, 0.6), 0 32px 64px -16px rgba(0, 0, 0, 0.5)',

  // Elevação 4 — boot loader, takeover
  takeover:
    'inset 0 1px 0 0 rgba(244, 247, 250, 0.05), 0 40px 80px -16px rgba(0, 0, 0, 0.7)',

  // Glow — destaque de marca (botões primários, badges ativos)
  glow: '0 4px 16px -4px rgba(79, 140, 255, 0.35)',
  glowStrong: '0 8px 24px -6px rgba(79, 140, 255, 0.5)',
} as const;

export const glass = {
  // Sutil — header, sidebar
  subtle: 'bg-surface-default/60 backdrop-blur-md border-b border-border-subtle/60',

  // Elevado — painéis, command palette
  elevated:
    'bg-surface-elevated/70 backdrop-blur-xl border border-border-subtle/50 shadow-[0_24px_64px_-16px_rgba(0,0,0,0.6)]',

  // Modal — overlays importantes
  modal:
    'bg-surface-elevated/85 backdrop-blur-2xl border border-border-subtle/60 shadow-[0_32px_80px_-16px_rgba(0,0,0,0.7)]',

  // Scrim — fundo do command palette
  scrim: 'bg-black/40 backdrop-blur-sm',
} as const;

export const depth = {
  // z-indexes (não-utility)
  base: 0,
  ambient: 1,
  section: 10,
  card: 20,
  panel: 30,
  overlay: 40,
  header: 50,
  dock: 60,
  loader: 70,
} as const;

export const atmosphere = {
  light,
  shadow,
  glass,
  depth,
} as const;
