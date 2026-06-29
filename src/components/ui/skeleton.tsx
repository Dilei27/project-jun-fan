export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`jf-shimmer rounded-md ${className}`}
      aria-hidden="true"
    />
  );
}
