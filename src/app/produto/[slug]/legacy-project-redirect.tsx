'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function LegacyProjectRedirect({ projectId }: { projectId: string }) {
  const router = useRouter();
  useEffect(() => {
    router.replace(`/projeto/${projectId}/`);
  }, [projectId, router]);

  return <p className="px-6 py-10 text-sm text-text-muted">Abrindo projeto...</p>;
}
