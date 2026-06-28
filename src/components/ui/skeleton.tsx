export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`bg-surface-soft rounded-md animate-pulse ${className}`}
      aria-hidden="true"
    />
  );
}
