import { type ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  accent?: string;
  onClick?: () => void;
}

export function Card({ children, className = '', hover = false, accent, onClick }: CardProps) {
  const Tag = onClick ? 'button' : 'div';
  return (
    <Tag
      onClick={onClick}
      className={`bg-surface-default border border-border-subtle rounded-lg p-6 ${
        hover ? 'transition-all hover:bg-surface-elevated hover:border-border-strong hover:-translate-y-0.5' : ''
      } ${accent ? `border-l-2` : ''} ${onClick ? 'cursor-pointer text-left w-full' : ''} ${className}`}
      style={accent ? { borderLeftColor: accent } : undefined}
    >
      {children}
    </Tag>
  );
}
