'use client';

import { useEffect, useRef, useState } from 'react';

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
          requestAnimationFrame(() => {
            const duration = 420;
            const steps = 30;
            const increment = value / steps;
            let current = 0;
            const timer = setInterval(() => {
              current += increment;
              if (current >= value) {
                setCount(value);
                clearInterval(timer);
              } else {
                setCount(Math.floor(current));
              }
            }, duration / steps);
          });
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="p-5 bg-surface-default border border-border-subtle rounded-lg text-center">
      <div className="text-3xl font-bold text-accent-qa mb-1" aria-label={`${value}${suffix}`}>
        {count}{suffix}
      </div>
      <div className="text-sm text-text-muted leading-relaxed">{label}</div>
    </div>
  );
}

export function MetricsGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {metricsData.map(m => (
        <AnimatedMetric key={m.label} value={m.value} suffix={m.suffix} label={m.label} />
      ))}
    </div>
  );
}
