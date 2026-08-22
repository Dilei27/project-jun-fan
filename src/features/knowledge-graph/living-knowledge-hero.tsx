'use client';

import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { getFullGraph } from '@/core';
import { getHomeCoreGraph } from './home-core-data';
import { usePlatform } from '@/components/platform/platform-context';
import { AmbientInstruments } from './ambient-instruments';
import { AmbientLightField } from '@/components/atmosphere/atmosphere-background';
import type { KnowledgeDriveState } from './knowledge-drive';
import { getKnowledgeDriveDuration, knowledgeDriveTiming } from './knowledge-drive';

const KnowledgeScene = dynamic(() => import('./renderers/webgl/knowledge-scene').then(module => module.KnowledgeScene), { ssr: false });

export function LivingKnowledgeHero() {
  const [unavailable, setUnavailable] = useState(false);
  const [driveState, setDriveState] = useState<KnowledgeDriveState>('idle');
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
    let transitionTimer = 0;
    const handler = (event: Event) => {
      const state = (event as CustomEvent<KnowledgeDriveState>).detail;
      window.clearTimeout(transitionTimer);
      setDriveState(state);
      if (state === 'ready' || state === 'compress' || state === 'drive') return;
      if (state === 'transition') transitionTimer = window.setTimeout(() => setDriveState('idle'), getKnowledgeDriveDuration(knowledgeDriveTiming.transition));
    };
    window.addEventListener('jf-knowledge-drive', handler);
    return () => { window.clearTimeout(transitionTimer); window.removeEventListener('jf-knowledge-drive', handler); };
  }, []);
  return <>
    <AmbientLightField className="md:hidden" />
    {!unavailable && <KnowledgeScene className="absolute inset-0 opacity-90 md:inset-0" onUnavailable={() => setUnavailable(true)} onNodeSelect={handleSelect} focusId={selectedNodeId} selectedIds={selectedNodeId ? [selectedNodeId] : []} graphData={homeGraph} variant="home" driveState={driveState} />}
    <div aria-hidden className={`pointer-events-none absolute inset-0 bg-bg-deep transition-opacity duration-300 ${driveState === 'ready' ? 'opacity-10' : driveState === 'compress' ? 'opacity-30' : driveState === 'drive' ? 'opacity-15' : driveState === 'transition' ? 'opacity-40' : 'opacity-0'}`} />
    <div aria-hidden className={`pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(210,244,255,0.24),rgba(79,140,255,0.10)_34%,transparent_70%)] transition-opacity duration-200 ${driveState === 'drive' || driveState === 'compress' ? 'opacity-100' : 'opacity-0'}`} />
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block"><AmbientInstruments driveState={driveState} /></div>
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
      <aside className="absolute bottom-[calc(1rem+env(safe-area-inset-bottom))] left-4 right-4 z-10 w-auto rounded-xl border border-border-subtle/60 bg-surface-elevated/85 p-4 shadow-[var(--shadow-high)] backdrop-blur-xl md:bottom-8 md:left-auto md:right-6 md:w-[min(20rem,calc(100vw-3rem))]">
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
