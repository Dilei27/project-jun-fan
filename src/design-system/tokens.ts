export const tokens = {
  colors: {
    bg: { base: '#0B0F14', deep: '#070A0F' },
    surface: { default: '#111821', elevated: '#151D27', soft: '#1B2430' },
    border: { subtle: '#263241', strong: '#3A4658' },
    text: { primary: '#F4F7FA', secondary: '#9AA6B8', muted: '#687385' },
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
  motion: { fast: 160, normal: 280, slow: 420 },
} as const;
