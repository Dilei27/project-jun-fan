'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { motion as m } from '@/design-system/motion';

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
  duration?: number;
}

function StatCounter({ value, suffix = '', label, duration = 1400 }: StatCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      requestAnimationFrame(() => setCount(value));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const elapsed = now - start;
            const t = Math.min(1, elapsed / duration);
            const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
            setCount(Math.floor(eased * value));
            if (t < 1) requestAnimationFrame(step);
            else setCount(value);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <motion.div
      ref={ref}
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
        {label}
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
