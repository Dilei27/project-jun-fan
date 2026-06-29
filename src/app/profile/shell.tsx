'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { motion as m } from '@/design-system/motion';
import { usePlatform } from '@/components/platform/platform-context';
import { EngineeringProfileShell } from '@/features/engineering-profile/shell';

export function ProfileShell() {
  const { setCurrentModule } = usePlatform()
  const mounted = useRef(false)

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      setCurrentModule('profile')
    }
  }, [setCurrentModule])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: m.duration.slow, ease: m.easing.out }}
    >
      <EngineeringProfileShell />
    </motion.div>
  )
}
