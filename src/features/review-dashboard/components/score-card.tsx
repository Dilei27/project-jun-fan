'use client';

import type { ReviewCategoryScore } from '@/core/review';
import { REVIEW_CATEGORY_LABELS, REVIEW_CATEGORY_COLORS } from '@/core/review';

interface ScoreCardProps {
  category: ReviewCategoryScore
  onClick?: () => void
}

export function ScoreCard({ category, onClick }: ScoreCardProps) {
  const color = REVIEW_CATEGORY_COLORS[category.category]
  const label = REVIEW_CATEGORY_LABELS[category.category]
  const pct = category.score

  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center px-3 py-2.5 rounded-lg transition-all hover:bg-white/[0.02] text-center w-full"
      style={{ background: 'rgba(17, 24, 33, 0.4)' }}
    >
      <div className="relative w-12 h-12 mb-1">
        <svg width={48} height={48} viewBox="0 0 48 48">
          <circle cx={24} cy={24} r={20} fill="none" stroke="rgba(244,247,250,0.06)" strokeWidth={3} />
          <circle
            cx={24} cy={24} r={20}
            fill="none"
            stroke={color}
            strokeWidth={3}
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 20}`}
            strokeDashoffset={2 * Math.PI * 20 * (1 - pct / 100)}
            transform="rotate(-90 24 24)"
            style={{ transition: 'stroke-dashoffset 0.6s ease' }}
          />
          <text
            x={24} y={24}
            textAnchor="middle" dominantBaseline="central"
            fill="rgba(244,247,250,0.9)"
            fontSize={11} fontWeight={700}
            fontFamily="var(--font-sans)"
          >
            {pct}
          </text>
        </svg>
      </div>
      <span className="text-[8px] font-medium uppercase tracking-wider" style={{ color }}>
        {label}
      </span>
      <span className="text-[7px] text-text-muted/40 mt-0.5">{(category.weight * 100).toFixed(0)}% peso</span>
    </button>
  )
}
