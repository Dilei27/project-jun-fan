'use client';

import { useLanguage } from '@/i18n/language-context';
import type { Language } from '@/i18n/translations';

const options: Language[] = ['pt', 'en'];

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center rounded-full border border-border-subtle/70 bg-surface-elevated/70 p-0.5 shadow-[inset_0_1px_0_0_rgba(244,247,250,0.04)]" aria-label="Language selector">
      {options.map(option => {
        const active = option === language;
        return (
          <button
            key={option}
            type="button"
            onClick={() => setLanguage(option)}
            className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] transition-colors ${
              active ? 'bg-accent-qa text-white' : 'text-text-secondary hover:text-text-primary'
            }`}
            aria-pressed={active}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
