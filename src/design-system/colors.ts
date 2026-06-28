export const colors = {
  bg: { base: '#0B0F14', deep: '#070A0F' } as const,
  surface: { default: '#111821', elevated: '#151D27', soft: '#1B2430' } as const,
  border: { subtle: '#263241', strong: '#3A4658' } as const,
  text: { primary: '#F4F7FA', secondary: '#9AA6B8', muted: '#687385' } as const,
  accent: {
    qa: '#4F8CFF',
    whatsapp: '#2DD4BF',
    vigilante: '#F97316',
    analytics: '#A855F7',
    docs: '#EAB308',
  } as const,
  semantic: { success: '#22C55E', warning: '#F59E0B', danger: '#EF4444' } as const,
} as const;

export type ColorKey = keyof typeof colors;
export type AccentColor = keyof typeof colors.accent;
