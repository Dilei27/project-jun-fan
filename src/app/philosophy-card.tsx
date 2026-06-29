'use client';

import {
  Brain, GitBranch, Shield, BarChart3, FileText, Workflow,
  type LucideIcon,
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  Brain, GitBranch, Shield, BarChart3, FileText, Workflow,
};

interface PhilosophyCardProps {
  title: string;
  description: string;
  icon: string;
  accentColor: string;
  details: string[];
}

export function PhilosophyCard({
  title,
  description,
  icon: iconName,
  accentColor,
  details,
}: PhilosophyCardProps) {
  const Icon = ICON_MAP[iconName] || Brain;

  return (
    <div
      className="relative rounded-xl p-5 h-full transition-all duration-300 group"
      style={{
        background: 'rgba(10, 14, 22, 0.5)',
        border: '1px solid rgba(244, 247, 250, 0.05)',
        boxShadow: '0 4px 16px -8px rgba(0,0,0,0.3)',
      }}
    >
      <div
        aria-hidden
        className="absolute top-0 left-4 right-4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(to right, transparent, ${accentColor}50, transparent)` }}
      />

      <div className="flex items-start gap-3 mb-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{
            background: `${accentColor}10`,
            border: `1px solid ${accentColor}18`,
          }}
        >
          <Icon size={15} style={{ color: accentColor }} />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-text-primary tracking-[-0.01em]">
            {title}
          </h3>
          <p className="text-xs text-text-muted leading-relaxed mt-1">
            {description}
          </p>
        </div>
      </div>

      <ul className="space-y-1 ml-11">
        {details.map((detail, i) => (
          <li key={i} className="flex items-center gap-2 text-[11px] text-text-muted/70">
            <span
              className="w-1 h-1 rounded-full shrink-0"
              style={{ backgroundColor: accentColor, opacity: 0.5 }}
            />
            {detail}
          </li>
        ))}
      </ul>
    </div>
  );
}
