interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'danger';
  children: string;
  className?: string;
  pulse?: boolean;
}

const variantClasses: Record<string, string> = {
  default: 'bg-surface-soft text-text-secondary',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  danger: 'bg-danger/10 text-danger',
};

export function Badge({ variant = 'default', children, className = '', pulse = false }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant]} ${className}`}>
      {pulse && (
        <span
          aria-hidden
          className="w-1.5 h-1.5 rounded-full bg-current jf-pulse-dot"
        />
      )}
      {children}
    </span>
  );
}
