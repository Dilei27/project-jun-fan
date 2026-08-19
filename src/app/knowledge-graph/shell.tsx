'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { KnowledgeExplorer } from '@/features/knowledge-graph/knowledge-explorer';
import { motion as m } from '@/design-system/motion';
import { CrossNav } from '@/components/platform/cross-nav';
import { usePlatform } from '@/components/platform/platform-context';

export function KnowledgeGraphShell() {
  const { setCurrentModule } = usePlatform();
  useEffect(() => { setCurrentModule('knowledge-graph'); }, [setCurrentModule]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: m.duration.slow, ease: m.easing.out }}
      className="relative h-[calc(100vh-3.5rem)] min-h-[600px] w-full"
    >
      {/* Immersive graph — edge to edge */}
      <div className="absolute inset-0">
        <KnowledgeExplorer />
      </div>

      {/* Compact title overlay — top right, out of the graph's way */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: m.duration.normal, ease: m.easing.out, delay: 0.05 }}
        className="absolute top-4 right-6 z-30 pointer-events-auto"
      >
        <div className="kg-hud">
          <CrossNav module="kg" />
        </div>
      </motion.div>
    </motion.div>
  );
}
