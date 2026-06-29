import type { Metadata } from 'next'
import { ProfileShell } from './shell'

export const metadata: Metadata = {
  title: 'Engineering Profile — Jun Fan',
  description:
    'Living Engineering Profile — trajetória, skills, projetos e filosofia de engenharia de Odirlei Alves.',
}

export default function ProfilePage() {
  return <ProfileShell />
}
