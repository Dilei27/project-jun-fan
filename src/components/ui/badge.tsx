interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'danger';
  children: string;
  className?: string;
}

const variantClasses: Record<string, string> = {
  default: 'bg-surface-soft text-text-secondary',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  danger: 'bg-danger/10 text-danger',
};

export function Badge({ variant = 'default', children, className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
}
