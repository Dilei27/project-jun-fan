import type { Metadata } from 'next'
import { TwinClient } from './twin-client'

export const metadata: Metadata = {
  title: 'Engineering Twin — Jun Fan',
  description: 'Digital twin da arquitetura do Project Jun Fan — componentes, módulos, serviços e relações.',
}

export default function TwinPage() {
  return <TwinClient />
}
