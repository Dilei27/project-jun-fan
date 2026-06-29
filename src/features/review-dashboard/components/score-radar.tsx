'use client';

import type { EngineeringScore, ReviewCategory } from '@/core/review';
import { REVIEW_CATEGORY_LABELS, REVIEW_CATEGORY_COLORS } from '@/core/review';

interface ScoreRadarProps {
  score: EngineeringScore
  size?: number
}

const CATEGORIES: ReviewCategory[] = [
  'architecture', 'qa', 'documentation', 'knowledge', 'maintainability', 'security', 'performance',
];

export function ScoreRadar({ score, size = 180 }: ScoreRadarProps) {
  const cx = size / 2
  const cy = size / 2
  const radius = size * 0.38
  const levels = [20, 40, 60, 80, 100]
  const angleStep = (Math.PI * 2) / CATEGORIES.length

  const points = CATEGORIES.map((cat, i) => {
    const value = score[cat] / 100
    const angle = angleStep * i - Math.PI / 2
    const r = radius * value
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle), color: REVIEW_CATEGORY_COLORS[cat] }
  })

  const polygonPath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + 'Z'

  return (
    <svg width={size} height={size} className="shrink-0">
      {/* Grid rings */}
      {levels.map((level) => {
        const r = radius * (level / 100)
        const pts = CATEGORIES.map((_, i) => {
          const angle = angleStep * i - Math.PI / 2
          return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`
        }).join(' ')
        return (
          <polygon
            key={level}
            points={pts}
            fill="none"
            stroke="rgba(244,247,250,0.06)"
            strokeWidth={0.5}
          />
        )
      })}

      {/* Axes */}
      {CATEGORIES.map((cat, i) => {
        const angle = angleStep * i - Math.PI / 2
        return (
          <line
            key={cat}
            x1={cx} y1={cy}
            x2={cx + radius * Math.cos(angle)}
            y2={cy + radius * Math.sin(angle)}
            stroke="rgba(244,247,250,0.06)"
            strokeWidth={0.5}
          />
        )
      })}

      {/* Data polygon */}
      <polygon
        points={polygonPath}
        fill="rgba(79, 140, 255, 0.08)"
        stroke="rgba(79, 140, 255, 0.4)"
        strokeWidth={1}
      />

      {/* Data points */}
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={2.5} fill={p.color} />
      ))}

      {/* Labels around the outside */}
      {CATEGORIES.map((cat, i) => {
        const angle = angleStep * i - Math.PI / 2
        const labelR = radius + 16
        const lx = cx + labelR * Math.cos(angle)
        const ly = cy + labelR * Math.sin(angle)
        const value = score[cat]
        return (
          <text
            key={cat}
            x={lx} y={ly}
            textAnchor="middle"
            dominantBaseline="central"
            fill={REVIEW_CATEGORY_COLORS[cat]}
            fontSize={6}
            fontWeight={600}
            fontFamily="var(--font-sans)"
          >
            {value}
          </text>
        )
      })}

      {/* Center label */}
      <text
        x={cx} y={cy}
        textAnchor="middle"
        dominantBaseline="central"
        fill="rgba(244,247,250,0.9)"
        fontSize={14}
        fontWeight={700}
        fontFamily="var(--font-sans)"
      >
        {score.overall}
      </text>
      <text
        x={cx} y={cy + 12}
        textAnchor="middle"
        dominantBaseline="central"
        fill="rgba(244,247,250,0.3)"
        fontSize={5}
        fontFamily="var(--font-sans)"
      >
        OVERALL
      </text>
    </svg>
  )
}
