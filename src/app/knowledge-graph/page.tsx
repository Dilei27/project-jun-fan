import { Metadata } from 'next'
import { KnowledgeGraph } from '@/features/knowledge-graph/components/knowledge-graph'

export const metadata: Metadata = {
  title: 'Knowledge Graph — Jun Fan',
  description: 'Explore o ecossistema Project Jun Fan através de um grafo de conhecimento interativo.',
}

export default function KnowledgeGraphPage() {
  return (
    <div className="h-[calc(100vh-3.5rem)] w-full flex flex-col">
      <div className="px-6 pt-6 pb-2">
        <h1 className="text-2xl font-extrabold text-text-primary">Knowledge Graph</h1>
        <p className="text-sm text-text-muted mt-1">
          Explore as conexões entre produtos, projetos, decisões e skills do ecossistema.
        </p>
      </div>
      <div className="flex-1 px-4 pb-4">
        <div className="w-full h-full bg-surface-default border border-border-subtle rounded-xl overflow-hidden relative">
          <KnowledgeGraph />
        </div>
      </div>
    </div>
  )
}
