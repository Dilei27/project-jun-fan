import type { TimelineEntry } from '@/types';

export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <div className="relative">
      <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-border-subtle" />
      <div className="space-y-8">
        {entries.map((entry, i) => (
          <div key={entry.year} className="relative pl-8">
            <div className={`absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-accent-qa bg-bg-base ${i === 0 ? 'ring-2 ring-accent-qa/30' : ''}`} />
            <div className="flex items-baseline gap-3 mb-1">
              <span className="text-xs font-mono text-accent-qa font-semibold">{entry.year}</span>
              <h3 className="text-sm font-semibold text-text-primary">{entry.milestone}</h3>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">{entry.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
