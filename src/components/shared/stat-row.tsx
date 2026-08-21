'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { motion as m } from '@/design-system/motion';
import { useLanguage } from '@/i18n/language-context';
import { translations, type TranslationKey } from '@/i18n/translations';

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
}

function StatCounter({ value, suffix = '', label }: StatCounterProps) {
  const [count] = useState(value);
  const { t } = useLanguage();
  const translatedLabel = label in translations.pt ? t(label as TranslationKey) : label;


  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: m.duration.normal, ease: m.easing.out }}
      className="text-center"
    >
      <div className="text-2xl md:text-3xl font-bold text-text-primary tabular-nums tracking-[-0.02em]">
        {count}{suffix}
      </div>
      <div className="text-[10px] uppercase tracking-[0.14em] text-text-muted mt-1.5 font-medium">
        {translatedLabel}
      </div>
    </motion.div>
  );
}

interface StatRowProps {
  stats: Array<{ value: number; suffix?: string; label: string }>;
  className?: string;
}

export function StatRow({ stats, className = '' }: StatRowProps) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 ${className}`}>
      {stats.map(stat => (
        <StatCounter
          key={stat.label}
          value={stat.value}
          suffix={stat.suffix}
          label={stat.label}
        />
      ))}
    </div>
  );
}
