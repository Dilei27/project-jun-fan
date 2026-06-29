import type { Metadata } from 'next';
import { DebugGraph } from '@/features/knowledge-graph/debug-graph';

export const metadata: Metadata = {
  title: 'Graph Debug — Jun Fan',
  description: 'Debug page for Knowledge Graph rendering diagnostics.',
};

export default function DebugGraphPage() {
  return <DebugGraph />;
}
