'use client';

import { motion } from 'framer-motion';

interface RadarDimension {
  label: string;
  value: number;
  color: string;
}

const dimensions: RadarDimension[] = [
  { label: 'Architecture', value: 85, color: '#4F8CFF' },
  { label: 'Testing', value: 92, color: '#22C55E' },
  { label: 'Documentation', value: 70, color: '#EAB308' },
  { label: 'Knowledge', value: 78, color: '#C084FC' },
  { label: 'Automation', value: 88, color: '#22D3EE' },
  { label: 'Observability', value: 65, color: '#FB923C' },
];

export function QualityRadar() {
  const size = 220;
  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - 20;
  const levels = 5;
  const slices = dimensions.length;
  const angleStep = (2 * Math.PI) / slices;

  const getPoint = (i: number, value: number) => {
    const angle = angleStep * i - Math.PI / 2;
    const r = (value / 100) * radius;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  };

  const gridLevels = Array.from({ length: levels }, (_, l) => {
    const r = ((l + 1) / levels) * radius;
    const points = Array.from({ length: slices }, (_, i) => {
      const angle = angleStep * i - Math.PI / 2;
      return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
    });
    return points.join(' ');
  });

  const dataPoints = dimensions.map((d, i) => getPoint(i, d.value));
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
  const dataDots = dataPoints.map((p, i) => ({ ...p, color: dimensions[i].color, label: dimensions[i].label }));

  return (
    <section className="mb-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-xl p-5"
        style={{
          background: 'rgba(10, 14, 22, 0.6)',
          border: '1px solid rgba(244, 247, 250, 0.06)',
          boxShadow: '0 4px 16px -8px rgba(0,0,0,0.4)',
        }}
      >
        <div className="flex items-center gap-2 mb-5">
          <div className="w-2 h-2 rounded-full" style={{ background: '#C084FC' }} />
          <h3 className="text-sm font-semibold text-text-primary">Quality Radar</h3>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-6">
          <div className="shrink-0">
            <svg width={size} height={size} aria-label="Quality Radar" role="img">
              {/* Grid levels */}
              {gridLevels.map((points, l) => (
                <polygon
                  key={l}
                  points={points}
                  fill="none"
                  stroke="rgba(244, 247, 250, 0.06)"
                  strokeWidth="1"
                />
              ))}

              {/* Axis lines */}
              {dimensions.map((_, i) => {
                const angle = angleStep * i - Math.PI / 2;
                const x = cx + radius * Math.cos(angle);
                const y = cy + radius * Math.sin(angle);
                return (
                  <line
                    key={i}
                    x1={cx}
                    y1={cy}
                    x2={x}
                    y2={y}
                    stroke="rgba(244, 247, 250, 0.05)"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Data polygon */}
              <motion.path
                d={dataPath}
                fill="rgba(79, 140, 255, 0.08)"
                stroke="rgba(79, 140, 255, 0.4)"
                strokeWidth="1.5"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: `${cx}px ${cy}px` }}
              />

              {/* Data dots */}
              {dataDots.map((p, i) => (
                <motion.circle
                  key={dimensions[i].label}
                  cx={p.x}
                  cy={p.y}
                  r="3"
                  fill={p.color}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.55 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                />
              ))}
            </svg>
          </div>

          {/* Legend */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2.5">
            {dimensions.map((d) => (
              <div key={d.label} className="flex items-center gap-2.5">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                  <span className="text-[11px] text-text-muted whitespace-nowrap">{d.label}</span>
                </div>
                <div className="flex items-center gap-1.5 ml-auto">
                  <div
                    className="h-1 rounded-full w-12"
                    style={{ background: 'rgba(244, 247, 250, 0.06)' }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${d.value}%`,
                        background: `linear-gradient(to right, ${d.color}, ${d.color}80)`,
                      }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-text-muted/70 tabular-nums w-7 text-right">
                    {d.value}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
