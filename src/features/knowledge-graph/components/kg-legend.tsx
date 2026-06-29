'use client';

import { getNodeColor, getNodeIdentity } from '../lib/node-identity';
import type { EntityType } from '@/core/types';

const TYPE_ORDER: EntityType[] = [
  'mission', 'product', 'project', 'agent', 'architecture',
  'decision', 'doc', 'timeline', 'metric', 'technology', 'lab', 'skill',
];

interface KGLegendProps {
  counts: Record<string, number>;
  activeFilters: string[];
  onToggle: (type: string) => void;
  visible: boolean;
}

export function KGLegend({ counts, activeFilters, onToggle, visible }: KGLegendProps) {
  if (!visible) return null;

  return (
    <div
      className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-2 rounded-xl"
      style={{
        background: 'rgba(10, 14, 22, 0.75)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(244, 247, 250, 0.06)',
        boxShadow: '0 8px 24px -8px rgba(0, 0, 0, 0.5)',
      }}
    >
      {TYPE_ORDER.map((type) => {
        const isActive = activeFilters.includes(type);
        const color = getNodeColor(type);
        const identity = getNodeIdentity(type);
        const count = counts[type] ?? 0;

        return (
          <button
            key={type}
            onClick={() => onToggle(type)}
            className="flex items-center gap-1.5 px-2 py-1 rounded-lg transition-all duration-200 cursor-pointer"
            style={{
              opacity: isActive ? 1 : 0.35,
              background: isActive ? `${color}12` : 'transparent',
            }}
            aria-pressed={isActive}
            aria-label={`${identity.label} (${count})`}
            title={`${identity.label} — ${count} nós`}
          >
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{
                backgroundColor: color,
                boxShadow: isActive ? `0 0 6px ${color}60` : 'none',
              }}
            />
            <span
              className="text-[9px] font-medium uppercase tracking-[0.1em]"
              style={{ color: isActive ? color : 'rgba(244, 247, 250, 0.5)' }}
            >
              {identity.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
