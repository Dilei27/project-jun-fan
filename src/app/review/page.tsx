import type { Metadata } from 'next'
import { ReviewShell } from './shell'

export const metadata: Metadata = {
  title: 'Engineering Review — Jun Fan',
  description:
    'Avaliação técnica por regras — score, findings, recomendações e oportunidades de melhoria para o Project Jun Fan.',
}

export default function ReviewPage() {
  return <ReviewShell />
}
