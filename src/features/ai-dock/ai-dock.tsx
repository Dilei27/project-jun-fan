'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send } from 'lucide-react';
import Link from 'next/link';

interface AIResponse {
  text: string;
  link?: { href: string; label: string };
}

const suggestions = [
  'O que é Robot Framework?',
  'O que é Vigilante AI?',
  'O que é WhatsApp AI?',
  'Qual a stack usada?',
  'Como começar?',
];

const aiResponses: Record<string, AIResponse> = {
  robot: { text: 'O projeto Automação ERP UAU usou Robot Framework para automatizar regressões em ERP legado.', link: { href: '/projeto/automacao-erp-uau/', label: 'Ver detalhes →' } },
  vigilante: { text: 'O Vigilante AI é um sistema de monitoramento com classificação de eventos por IA.', link: { href: '/produto/vigilante-ai/', label: 'Ver produto →' } },
  whatsapp: { text: 'O WhatsApp AI Assistant automatiza atendimento no WhatsApp com LangChain e GPT.', link: { href: '/produto/whatsapp-ai/', label: 'Ver produto →' } },
  stack: { text: 'Python, Robot Framework, Playwright, LangChain, OpenCV e mais.', link: { href: '/produto/qa-command-center/', label: 'Ver produtos →' } },
  tecnolog: { text: 'Python, Robot Framework, Playwright, LangChain, OpenCV e mais.', link: { href: '/produto/qa-command-center/', label: 'Ver produtos →' } },
  arquitetura: { text: 'Stack moderna front-end first com Next.js + TypeScript.', link: { href: '/decisoes/', label: 'Decisões Técnicas →' } },
  começar: { text: 'Ambiente configurado com Next.js, sem backend ou banco de dados.', link: { href: '/docs/setup/', label: 'Setup →' } },
  framework: { text: 'O Robot/QA AI Framework unifica automação de testes com IA.', link: { href: '/framework/', label: 'Saiba mais →' } },
};

export function AIDock() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState<AIResponse | null>(null);

  function handleAsk(q?: string) {
    const text = q || question;
    if (!text.trim()) return;
    const lower = text.toLowerCase();
    let answer: AIResponse = { text: 'Posso ajudar com perguntas sobre produtos, projetos, stack, arquitetura e documentação.' };
    for (const [key, resp] of Object.entries(aiResponses)) {
      if (lower.includes(key)) {
        answer = resp;
        break;
      }
    }
    setResponse(answer);
    setQuestion('');
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-6 z-50 w-[360px] bg-surface-elevated border border-border-subtle rounded-xl shadow-2xl overflow-hidden"
            role="dialog"
            aria-label="AI Dock"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border-subtle">
              <div className="flex items-center gap-2">
                <Bot size={18} className="text-accent-qa" />
                <span className="text-sm font-medium text-text-primary">AI Dock</span>
              </div>
              <button onClick={() => { setOpen(false); setResponse(null); }} className="p-1 text-text-muted hover:text-text-primary rounded" aria-label="Fechar">
                <X size={16} />
              </button>
            </div>

            <div className="p-4">
              {!response && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {suggestions.map(s => (
                    <button
                      key={s}
                      onClick={() => handleAsk(s)}
                      className="px-3 py-1.5 text-xs text-text-secondary bg-surface-soft hover:bg-surface-default rounded-full transition-colors border border-border-subtle cursor-pointer"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {response && (
                <div className="mb-4 p-3 bg-surface-soft rounded-lg text-sm text-text-primary leading-relaxed" aria-live="polite">
                  <strong>Resposta:</strong> {response.text}
                  {response.link && (
                    <Link href={response.link.href} className="block mt-2 text-accent-qa hover:underline">
                      {response.link.label}
                    </Link>
                  )}
                </div>
              )}

              <div className="flex gap-2">
                <input
                  type="text"
                  value={question}
                  onChange={e => setQuestion(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAsk()}
                  placeholder="Pergunte algo..."
                  className="flex-1 px-3 py-2 bg-surface-default border border-border-subtle rounded-lg text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-accent-qa transition-colors"
                  aria-label="Pergunta para AI"
                />
                <button
                  onClick={() => handleAsk()}
                  className="p-2 bg-accent-qa text-white rounded-lg hover:bg-accent-qa/90 transition-colors cursor-pointer"
                  aria-label="Enviar pergunta"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-accent-qa text-white rounded-full shadow-lg flex items-center justify-center hover:bg-accent-qa/90 transition-colors cursor-pointer"
        aria-label={open ? 'Fechar AI Dock' : 'Abrir AI Dock'}
      >
        <Bot size={22} />
      </motion.button>
    </>
  );
}
