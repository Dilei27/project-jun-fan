'use client';

import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { getFullGraph } from '@/core';
import { getHomeCoreGraph } from './home-core-data';
import { usePlatform } from '@/components/platform/platform-context';

const KnowledgeScene = dynamic(() => import('./renderers/webgl/knowledge-scene').then(module => module.KnowledgeScene), { ssr: false });

export function LivingKnowledgeHero() {
  const [unavailable, setUnavailable] = useState(false);
  const [anticipating, setAnticipating] = useState(false);
  const { selectedNodeId, setSelectedNodeId, setSelectedKnowledgeNodeLabel, pushHistory } = usePlatform();
  const graph = useMemo(() => getFullGraph(), []);
  const homeGraph = useMemo(() => getHomeCoreGraph(), []);
  const selected = graph.nodes.find(item => item.id === selectedNodeId) ?? null;
  const handleSelect = (id: string) => {
    const node = graph.nodes.find(item => item.id === id);
    setSelectedNodeId(id);
    setSelectedKnowledgeNodeLabel(node?.label ?? null);
    if (node) pushHistory({ module: 'home', label: node.label, href: node.url || '/knowledge-graph/' });
  };
  useEffect(() => {
    const handler = (event: Event) => setAnticipating(Boolean((event as CustomEvent<boolean>).detail));
    window.addEventListener('jf-enter-system', handler);
    return () => window.removeEventListener('jf-enter-system', handler);
  }, []);
  return <>
    {!unavailable && <KnowledgeScene className="absolute inset-0 translate-y-14 opacity-90 sm:translate-y-0" onUnavailable={() => setUnavailable(true)} onNodeSelect={handleSelect} focusId={selectedNodeId} selectedIds={selectedNodeId ? [selectedNodeId] : []} graphData={homeGraph} variant="home" anticipating={anticipating} />}
    {unavailable && <div className="absolute inset-0 flex items-center justify-center bg-bg-deep">
      <div className="text-center text-sm text-text-secondary">Knowledge Core indisponível neste dispositivo. <Link href="/knowledge-graph/" className="text-accent-qa hover:underline">Abrir Explorer em SVG</Link></div>
    </div>}
    <nav className="sr-only" aria-label="Entidades do Knowledge Core">
      <ul>
        {homeGraph.nodes.map(node => (
          <li key={node.id}>
            <button type="button" onClick={() => handleSelect(node.id)} aria-pressed={selectedNodeId === node.id}>
              Explorar {node.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
    {selected && (
      <aside className="absolute bottom-8 right-6 z-10 w-[min(20rem,calc(100vw-3rem))] rounded-xl border border-border-subtle/60 bg-surface-elevated/85 p-4 shadow-[var(--shadow-high)] backdrop-blur-xl">
        <p className="text-[10px] uppercase tracking-[0.14em] text-accent-qa">{selected.type}</p>
        <h2 className="mt-1 text-base font-semibold text-text-primary">{selected.label}</h2>
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">{selected.description}</p>
        <div className="mt-3 flex gap-3 text-sm">
          {selected.url && <Link href={selected.url} className="text-accent-qa hover:underline">Abrir entidade</Link>}
          <Link href={`/knowledge-graph/?q=${encodeURIComponent(selected.label)}`} className="text-text-secondary hover:text-text-primary hover:underline">Explorar relações</Link>
        </div>
      </aside>
    )}
  </>;
}
