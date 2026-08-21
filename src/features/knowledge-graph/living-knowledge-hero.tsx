'use client';

import dynamic from 'next/dynamic';

const KnowledgeScene = dynamic(() => import('./renderers/webgl/knowledge-scene').then(module => module.KnowledgeScene), { ssr: false });

export function LivingKnowledgeHero() {
  return <KnowledgeScene className="absolute inset-0 opacity-90" />;
}
