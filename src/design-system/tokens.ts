export const tokens = {
  colors: {
    bg: { base: '#0C1118', deep: '#080C12' },
    surface: { default: '#121B26', elevated: '#182333', soft: '#202C3B' },
    border: { subtle: '#344154', strong: '#4C5A70' },
    text: { primary: '#F4F7FA', secondary: '#B8C4D4', muted: '#8C98AA' },
    accent: {
      qa: '#4F8CFF',
      whatsapp: '#2DD4BF',
      vigilante: '#F97316',
      analytics: '#A855F7',
      docs: '#EAB308',
    },
    semantic: { success: '#22C55E', warning: '#F59E0B', danger: '#EF4444' },
  },
  radius: { sm: 8, md: 12, lg: 16, xl: 24 },
  spacing: { 1: 4, 2: 8, 3: 12, 4: 16, 6: 24, 8: 32, 12: 48 },
  motion: { fast: 200, normal: 360, slow: 560 },
} as const;
