import type { Metadata } from 'next'
import { RepositoryShell } from './shell'

export const metadata: Metadata = {
  title: 'Repository Intelligence — Jun Fan',
  description:
    'Pipeline de análise estrutural do Project Jun Fan — scanner, knowledge builder, graph builder e modelo de conhecimento.',
}

export default function RepositoryPage() {
  return <RepositoryShell />
}
