'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { motion as m } from '@/design-system/motion';
import { usePlatform } from '@/components/platform/platform-context';
import { RepositoryDashboardShell } from '@/features/repository-dashboard/shell';

export function RepositoryShell() {
  const { setCurrentModule } = usePlatform()
  const mounted = useRef(false)

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      setCurrentModule('repository')
    }
  }, [setCurrentModule])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: m.duration.slow, ease: m.easing.out }}
    >
      <RepositoryDashboardShell />
    </motion.div>
  )
}
