export type KnowledgeDriveState = 'idle' | 'ready' | 'compress' | 'drive' | 'transition' | 'compute';

export const knowledgeDriveTiming = {
  mobileReady: 220,
  desktopReady: 100,
  compress: 110,
  release: 560,
  transition: 300,
  reducedMotion: 180,
} as const;

export function getKnowledgeDriveDuration(duration: number) {
  const slowMotion = process.env.NODE_ENV === 'development' && typeof window !== 'undefined' && window.localStorage.getItem('jf-drive-slow') === 'true';
  return duration * (slowMotion ? 4 : 1);
}

export function signalKnowledgeDrive(state: KnowledgeDriveState) {
  window.dispatchEvent(new CustomEvent<KnowledgeDriveState>('jf-knowledge-drive', { detail: state }));
}
