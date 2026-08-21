'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { getFullGraph } from '@/core';
import { getHomeCoreGraph } from './home-core-data';
import { usePlatform } from '@/components/platform/platform-context';

const KnowledgeScene = dynamic(() => import('./renderers/webgl/knowledge-scene').then(module => module.KnowledgeScene), { ssr: false });

export function LivingKnowledgeHero() {
  const { selectedNodeId, setSelectedNodeId, setSelectedKnowledgeNodeLabel, pushHistory } = usePlatform();
  const graph = useMemo(() => getFullGraph(), []);
  const homeGraph = useMemo(() => getHomeCoreGraph(), []);
  const handleSelect = (id: string) => {
    const node = graph.nodes.find(item => item.id === id);
    setSelectedNodeId(id);
    setSelectedKnowledgeNodeLabel(node?.label ?? null);
    if (node) pushHistory({ module: 'home', label: node.label, href: node.url || '/knowledge-graph/' });
  };
  return <KnowledgeScene className="absolute inset-0 opacity-90" onNodeSelect={handleSelect} focusId={selectedNodeId} selectedIds={selectedNodeId ? [selectedNodeId] : []} graphData={homeGraph} variant="home" />;
}
