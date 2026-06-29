'use client';

import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { motion as m } from '@/design-system/motion';
import type { ReactNode } from 'react';

export interface StatCardData {
  label: string;
  value: string;
  icon: ReactNode;
  trend: number;
  trendLabel: string;
  color: string;
  sparkline: number[];
}

interface StatCardProps {
  data: StatCardData;
  index: number;
}

function Sparkline({ points, color }: { points: number[]; color: string }) {
  const w = 64;
  const h = 24;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const stepX = w / (points.length - 1);
  const d = points
    .map((p, i) => {
      const x = i * stepX;
      const y = h - ((p - min) / range) * (h - 4) - 2;
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(' ');

  return (
    <svg width={w} height={h} className="overflow-visible" aria-hidden>
      <path d={d} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity={0.5} />
      <path
        d={`${d} V ${h} L 0 ${h} Z`}
        fill={`${color}10`}
      />
    </svg>
  );
}

export function StatCard({ data, index }: StatCardProps) {
  const TrendIcon = data.trend > 0 ? ArrowUp : data.trend < 0 ? ArrowDown : Minus;
  const trendColor = data.trend > 0 ? '#22C55E' : data.trend < 0 ? '#EF4444' : '#687385';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.08 + index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -2, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }}
      className="relative rounded-xl p-4 transition-all duration-300"
      style={{
        background: 'rgba(10, 14, 22, 0.6)',
        border: '1px solid rgba(244, 247, 250, 0.06)',
        boxShadow: '0 4px 16px -8px rgba(0,0,0,0.4)',
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${data.color}08, transparent 70%)`,
        }}
      />

      <div className="relative">
        <div className="flex items-start justify-between mb-3">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{
              background: `${data.color}12`,
              border: `1px solid ${data.color}18`,
            }}
          >
            <span style={{ color: data.color }} className="[&>svg]:w-[16px] [&>svg]:h-[16px]">
              {data.icon}
            </span>
          </div>
          <Sparkline points={data.sparkline} color={data.color} />
        </div>

        <div className="text-xl font-bold text-text-primary tabular-nums tracking-[-0.02em] mb-0.5">
          {data.value}
        </div>
        <div className="text-[11px] text-text-muted font-medium mb-2">{data.label}</div>

        <div className="flex items-center gap-1">
          <TrendIcon size={10} style={{ color: trendColor }} />
          <span className="text-[10px] tabular-nums" style={{ color: trendColor }}>
            {Math.abs(data.trend)}{data.trend !== 0 ? '%' : ''}
          </span>
          <span className="text-[9px] text-text-muted/50 ml-0.5">{data.trendLabel}</span>
        </div>
      </div>
    </motion.div>
  );
}
