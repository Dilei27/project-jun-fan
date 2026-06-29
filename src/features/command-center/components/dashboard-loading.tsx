'use client';

import { motion } from 'framer-motion';

function SkeletonBlock({ className = '' }: { className?: string }) {
  return (
    <div
      className={`rounded-xl animate-pulse ${className}`}
      style={{ background: 'rgba(244, 247, 250, 0.04)' }}
    />
  );
}

export function DashboardLoading() {
  return (
    <div className="space-y-8">
      {/* Header skeleton */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <SkeletonBlock className="h-8 w-64" />
          <SkeletonBlock className="h-5 w-16" />
          <SkeletonBlock className="h-5 w-20" />
        </div>
        <SkeletonBlock className="h-4 w-96" />
      </div>

      {/* Stat cards skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl p-4" style={{ background: 'rgba(10, 14, 22, 0.6)', border: '1px solid rgba(244, 247, 250, 0.06)' }}>
            <div className="flex items-start justify-between mb-3">
              <SkeletonBlock className="w-9 h-9 rounded-lg" />
              <SkeletonBlock className="w-16 h-6 rounded" />
            </div>
            <SkeletonBlock className="h-6 w-16 mb-1" />
            <SkeletonBlock className="h-3 w-20 mb-2" />
            <SkeletonBlock className="h-3 w-24" />
          </div>
        ))}
      </div>

      {/* Pipeline skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="rounded-xl p-5" style={{ background: 'rgba(10, 14, 22, 0.6)', border: '1px solid rgba(244, 247, 250, 0.06)' }}>
            <SkeletonBlock className="h-4 w-32 mb-4" />
            <SkeletonBlock className="h-8 w-48 mb-3" />
            {Array.from({ length: 3 }).map((_, j) => (
              <SkeletonBlock key={j} className="h-5 w-full mb-2" />
            ))}
          </div>
        ))}
      </div>

      {/* Radar skeleton */}
      <div className="rounded-xl p-5" style={{ background: 'rgba(10, 14, 22, 0.6)', border: '1px solid rgba(244, 247, 250, 0.06)' }}>
        <SkeletonBlock className="h-4 w-32 mb-5" />
        <div className="flex items-center gap-6">
          <SkeletonBlock className="w-[220px] h-[220px] rounded-full shrink-0" />
          <div className="flex-1 space-y-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonBlock key={i} className="h-4 w-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
