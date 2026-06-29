'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { motion as m } from '@/design-system/motion';

const cardShadow =
  'inset 0 1px 0 0 rgba(244, 247, 250, 0.03), 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 4px 12px -4px rgba(0, 0, 0, 0.3)';

const metricsData = [
  { value: 95, suffix: '%', label: 'Foco em rastreabilidade e cobertura de regressão' },
  { value: 50, suffix: '+', label: 'Projetos e automações estruturadas' },
  { value: 10, suffix: 'x', label: 'Aceleração potencial com CI/CD e automação' },
  { value: 3, suffix: '', label: 'Frentes modernas: QA, IA e DevOps' },
];

function AnimatedMetric({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      const id = requestAnimationFrame(() => setCount(value));
      return () => cancelAnimationFrame(id);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const duration = 1100;
          const start = performance.now();
          const step = (now: number) => {
            const elapsed = now - start;
            const t = Math.min(1, elapsed / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setCount(Math.floor(eased * value));
            if (t < 1) requestAnimationFrame(step);
            else setCount(value);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <motion.div
      ref={ref}
      whileHover={{ y: -3, transition: { duration: m.duration.fast, ease: m.easing.out } }}
      className="jf-lift p-5 bg-surface-default/80 border border-border-subtle/60 rounded-lg text-center"
      style={{ boxShadow: cardShadow }}
    >
      <div className="text-3xl font-bold text-accent-qa mb-1 tabular-nums" aria-label={`${value}${suffix}`}>
        {count}{suffix}
      </div>
      <div className="text-sm text-text-muted leading-relaxed">{label}</div>
    </motion.div>
  );
}

export function MetricsGrid() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: m.stagger.default, delayChildren: 0.05 } },
      }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4"
    >
      {metricsData.map(metric => (
        <motion.div
          key={metric.label}
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: { opacity: 1, y: 0, transition: { duration: m.duration.normal, ease: m.easing.out } },
          }}
        >
          <AnimatedMetric value={metric.value} suffix={metric.suffix} label={metric.label} />
        </motion.div>
      ))}
    </motion.div>
  );
}
