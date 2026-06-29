import { Metadata } from 'next';
import { KnowledgeGraphShell } from './shell';

export const metadata: Metadata = {
  title: 'Knowledge Explorer — Jun Fan',
  description:
    'Descubra o ecossistema Project Jun Fan: produtos, projetos, decisões, agentes, skills e suas conexões — uma experiência cinematográfica de exploração de conhecimento.',
};

export default function KnowledgeGraphPage() {
  return <KnowledgeGraphShell />;
}
