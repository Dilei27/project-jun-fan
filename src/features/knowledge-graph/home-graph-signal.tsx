'use client';

import { useEffect, useRef } from 'react';
import { usePlatform } from '@/components/platform/platform-context';

export function HomeGraphSignal({ nodeId, label }: { nodeId: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const { setSelectedNodeId, setSelectedKnowledgeNodeLabel } = usePlatform();

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setSelectedNodeId(nodeId);
      setSelectedKnowledgeNodeLabel(label);
    }, { threshold: 0.35 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [label, nodeId, setSelectedKnowledgeNodeLabel, setSelectedNodeId]);

  return <span ref={ref} aria-hidden className="absolute top-1 h-px w-px" />;
}
