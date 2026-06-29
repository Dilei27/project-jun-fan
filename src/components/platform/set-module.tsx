'use client';

import { useEffect } from 'react';
import { usePlatform } from './platform-context';

export function SetModule({ module }: { module: string }) {
  const { setCurrentModule } = usePlatform();
  useEffect(() => { setCurrentModule(module); }, [module, setCurrentModule]);
  return null;
}
