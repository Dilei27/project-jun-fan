import { NextRequest, NextResponse } from 'next/server';

const responses: Record<string, { text: string; link?: { href: string; label: string } }> = {
  robot: { text: 'O projeto Automação ERP UAU usou Robot Framework para automatizar regressões em ERP legado.', link: { href: '/projeto/automacao-erp-uau/', label: 'Ver detalhes →' } },
  vigilante: { text: 'O Vigilante AI é um sistema de monitoramento com classificação de eventos por IA.', link: { href: '/produto/vigilante-ai/', label: 'Ver produto →' } },
  whatsapp: { text: 'O WhatsApp AI Assistant automatiza atendimento no WhatsApp com LangChain e GPT.', link: { href: '/produto/whatsapp-ai/', label: 'Ver produto →' } },
  arquitetura: { text: 'Stack moderna front-end first com Next.js + TypeScript.', link: { href: '/decisoes/', label: 'Decisões Técnicas →' } },
  tecnolog: { text: 'Python, Robot Framework, Playwright, LangChain, OpenCV e mais.', link: { href: '/produto/qa-command-center/', label: 'Ver produtos →' } },
  stack: { text: 'Python, Robot Framework, Playwright, LangChain, OpenCV e mais.', link: { href: '/produto/qa-command-center/', label: 'Ver produtos →' } },
  começar: { text: 'Ambiente configurado com Next.js, sem backend ou banco de dados.', link: { href: '/docs/setup/', label: 'Setup →' } },
  framework: { text: 'O Robot/QA AI Framework unifica automação de testes com IA.', link: { href: '/framework/', label: 'Saiba mais →' } },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const question = (body.question || '').toLowerCase().trim();

    let answer = { text: 'Posso ajudar com perguntas sobre produtos, projetos, stack, arquitetura e documentação.' };
    for (const [key, resp] of Object.entries(responses)) {
      if (question.includes(key)) {
        answer = resp;
        break;
      }
    }

    return NextResponse.json({ answer });
  } catch {
    return NextResponse.json({ error: 'Requisição inválida' }, { status: 400 });
  }
}
