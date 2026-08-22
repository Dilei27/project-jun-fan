'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, type MouseEvent } from 'react';
import { GitBranch } from 'lucide-react';
import { getKnowledgeDriveDuration, knowledgeDriveTiming, signalKnowledgeDrive } from './knowledge-drive';

export function EnterSystemLink() {
  const router = useRouter();
  const locked = useRef(false);
  const signalReady = () => { if (!locked.current) signalKnowledgeDrive('ready'); };
  const signalIdle = () => { if (!locked.current) signalKnowledgeDrive('idle'); };
  const activate = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (locked.current) return;
    locked.current = true;
    const mobile = window.matchMedia('(max-width: 767px)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    signalKnowledgeDrive('ready');
    const readyDuration = reducedMotion ? 0 : getKnowledgeDriveDuration(mobile ? knowledgeDriveTiming.mobileReady : knowledgeDriveTiming.desktopReady);
    window.setTimeout(() => {
      signalKnowledgeDrive('drive');
      window.setTimeout(() => signalKnowledgeDrive('transition'), reducedMotion ? knowledgeDriveTiming.reducedMotion : getKnowledgeDriveDuration(knowledgeDriveTiming.release));
    }, readyDuration);
    window.setTimeout(() => router.push('/knowledge-graph/'), reducedMotion ? knowledgeDriveTiming.reducedMotion : readyDuration + getKnowledgeDriveDuration(knowledgeDriveTiming.release + knowledgeDriveTiming.transition));
  };

  return (
    <Link
      href="/knowledge-graph/"
      onMouseEnter={signalReady}
      onMouseLeave={signalIdle}
      onFocus={signalReady}
      onBlur={signalIdle}
      onClick={activate}
      className="group inline-flex items-center gap-2 border-b border-accent-qa/60 pb-1 text-sm font-medium tracking-[0.08em] text-text-primary transition-colors hover:border-text-primary"
    >
      <GitBranch size={14} /> ENTER SYSTEM <span className="transition-transform group-hover:translate-x-1">→</span>
    </Link>
  );
}
