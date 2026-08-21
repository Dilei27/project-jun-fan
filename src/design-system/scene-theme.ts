import { tokens } from './tokens';

export const horizonScene = {
  environment: {
    background: tokens.colors.bg.deep,
    fog: tokens.colors.bg.base,
    atmosphere: tokens.colors.surface.default,
  },
  core: {
    base: tokens.colors.text.primary,
    shell: tokens.colors.border.subtle,
    energy: tokens.colors.accent.qa,
    accent: tokens.colors.accent.whatsapp,
    hot: tokens.colors.text.primary,
  },
  node: {
    dormant: tokens.colors.text.muted,
    selected: tokens.colors.accent.qa,
    path: tokens.colors.accent.whatsapp,
  },
  edge: {
    dormant: '#6D7B90',
    architect: tokens.colors.border.strong,
    active: tokens.colors.accent.qa,
    path: tokens.colors.accent.whatsapp,
  },
  lighting: {
    key: '#D6E6FF',
    ambient: 0.25,
    keyIntensity: 1.1,
    coreIntensity: 1.8,
  },
  motion: {
    coreRotation: 0.0037,
    nodeRotation: 0.00075,
    nodePulse: 0.035,
  },
} as const;
