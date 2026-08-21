'use client';

import Link from 'next/link';
import { GitBranch } from 'lucide-react';

export function EnterSystemLink() {
  const signal = (active: boolean) => window.dispatchEvent(new CustomEvent('jf-enter-system', { detail: active }));

  return (
    <Link
      href="/knowledge-graph/"
      onMouseEnter={() => signal(true)}
      onMouseLeave={() => signal(false)}
      onFocus={() => signal(true)}
      onBlur={() => signal(false)}
      className="group inline-flex items-center gap-2 border-b border-accent-qa/60 pb-1 text-sm font-medium tracking-[0.08em] text-text-primary transition-colors hover:border-text-primary"
    >
      <GitBranch size={14} /> ENTER SYSTEM <span className="transition-transform group-hover:translate-x-1">→</span>
    </Link>
  );
}
