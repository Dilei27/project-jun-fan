'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/i18n/language-context';
import { usePlatform } from '@/components/platform/platform-context';

function Instrument({ side, primary, secondary, active }: { side: 'left' | 'right'; primary: string; secondary: string; active: boolean }) {
  const reduced = useReducedMotion();
  const ticks = Array.from({ length: 12 }, (_, index) => index);
  const color = active ? '#E8F4FF' : '#4F8CFF';

  return (
    <div className={`pointer-events-none absolute top-10 hidden w-24 text-center lg:block ${side === 'left' ? 'left-10' : 'right-10'}`}>
      <motion.svg viewBox="0 0 100 100" className="mx-auto h-24 w-24 overflow-visible" aria-hidden
        animate={reduced ? undefined : { rotate: side === 'left' ? 360 : -360 }}
        transition={{ duration: side === 'left' ? 28 : 34, repeat: Infinity, ease: 'linear' }}
      >
        <circle cx="50" cy="50" r="39" fill="none" stroke={color} strokeOpacity={active ? 0.58 : 0.24} strokeWidth="0.8" strokeDasharray="26 10 8 16" />
        <circle cx="50" cy="50" r="31" fill="none" stroke="#344154" strokeOpacity="0.65" strokeWidth="0.6" strokeDasharray="12 9" />
        {ticks.map(index => {
          const angle = (index / ticks.length) * Math.PI * 2;
          const outer = 44;
          const inner = index % 3 === 0 ? 38 : 41;
          return <line key={index} x1={50 + Math.cos(angle) * inner} y1={50 + Math.sin(angle) * inner} x2={50 + Math.cos(angle) * outer} y2={50 + Math.sin(angle) * outer} stroke={index % 3 === 0 ? color : '#344154'} strokeOpacity={index % 3 === 0 ? 0.7 : 0.45} strokeWidth={index % 3 === 0 ? 1 : 0.6} />;
        })}
        <path d="M50 7v10M43 50h14" stroke={color} strokeOpacity={active ? 0.8 : 0.32} strokeWidth="0.8" />
      </motion.svg>
      <div className="-mt-16 text-[8px] font-medium uppercase tracking-[0.16em] text-text-secondary">
        <div>{primary}</div>
        <div className={active ? 'mt-1 text-accent-qa' : 'mt-1 text-text-muted'}>{secondary}</div>
      </div>
    </div>
  );
}

export function AmbientInstruments({ anticipating }: { anticipating: boolean }) {
  const { language } = useLanguage();
  const { status } = usePlatform();
  const date = new Intl.DateTimeFormat(language === 'pt' ? 'pt-BR' : 'en-US', { day: '2-digit', month: 'short' }).format(new Date()).toUpperCase();

  return <>
    <Instrument side="left" primary="SESSION" secondary={anticipating ? 'READY' : `LOCAL ${date}`} active={anticipating} />
    <Instrument side="right" primary="JF-01 / CORE" secondary={anticipating ? 'READY' : `${status.totalNodes} ENTITIES · ${status.totalEdges} RELATIONS`} active={anticipating} />
  </>;
}
