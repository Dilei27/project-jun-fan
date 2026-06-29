'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { motion as m } from '@/design-system/motion';
import { usePlatform } from '@/components/platform/platform-context';
import { ReviewDashboardShell } from '@/features/review-dashboard/shell';

export function ReviewShell() {
  const { setCurrentModule } = usePlatform()
  const mounted = useRef(false)

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      setCurrentModule('engineering-review')
    }
  }, [setCurrentModule])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: m.duration.slow, ease: m.easing.out }}
    >
      <ReviewDashboardShell />
    </motion.div>
  )
}
