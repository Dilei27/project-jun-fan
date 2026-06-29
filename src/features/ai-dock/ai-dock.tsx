'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { motion as m } from '@/design-system/motion';
import { CursorSpotlight } from '@/components/shared/cursor-spotlight';
import { ThinkingWave } from '@/components/shared/thinking-wave';

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
  'O que é o Command Center?',
  'Quais projetos existem?',
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
  'command center': { text: 'O QA Command Center é o primeiro produto oficial do Project Jun Fan. É o hub central que nuclea projetos, decisões, métricas e documentação.', link: { href: '/command-center/', label: 'Explorar →' } },
  projetos: { text: 'O ecossistema tem 3 projetos principais: Automação ERP UAU, WhatsApp AI Assistant e Vigilante AI.', link: { href: '/command-center/projects/', label: 'Ver projetos →' } },
  projeto: { text: 'O ecossistema tem 3 projetos principais: Automação ERP UAU, WhatsApp AI Assistant e Vigilante AI.', link: { href: '/command-center/projects/', label: 'Ver projetos →' } },
  decisoes: { text: 'O projeto registra decisões arquiteturais como ADRs, incluindo a migração para front-end first.', link: { href: '/command-center/decisions/', label: 'Ver decisões →' } },
  decisões: { text: 'O projeto registra decisões arquiteturais como ADRs, incluindo a migração para front-end first.', link: { href: '/command-center/decisions/', label: 'Ver decisões →' } },
  trajetória: { text: 'A trajetória começa em 2018 com QA manual e evolui até a fundação do Project Jun Fan em 2025.', link: { href: '/command-center/', label: 'Ver timeline →' } },
  trajetoria: { text: 'A trajetória começa em 2018 com QA manual e evolui até a fundação do Project Jun Fan em 2025.', link: { href: '/command-center/', label: 'Ver timeline →' } },
};

export function AIDock() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState<AIResponse | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const closeDock = useCallback(() => {
    setOpen(false);
    setResponse(null);
    // Return focus to trigger button
    setTimeout(() => triggerRef.current?.focus(), 100);
  }, []);

  function handleAsk(q?: string) {
    const text = q || question;
    if (!text.trim()) return;
    setHasInteracted(true);
    setResponse(null);
    setIsThinking(true);
    setQuestion('');
    // Simulate thinking time — feels more "intelligent"
    const lower = text.toLowerCase();
    let answer: AIResponse = { text: 'Posso ajudar com perguntas sobre produtos, projetos, stack, arquitetura e documentação.' };
    for (const [key, resp] of Object.entries(aiResponses)) {
      if (lower.includes(key)) {
        answer = resp;
        break;
      }
    }
    setTimeout(() => {
      setResponse(answer);
      setIsThinking(false);
    }, 650);
  }

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        closeDock();
      }
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, closeDock]);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: m.duration.normal, ease: m.easing.out }}
            className="jf-glass-modal fixed bottom-20 right-6 z-60 w-[360px] rounded-xl overflow-hidden origin-bottom-right"
            style={{
              boxShadow:
                'inset 0 1px 0 0 rgba(244, 247, 250, 0.06), 0 0 0 1px rgba(79, 140, 255, 0.06), 0 24px 64px -16px rgba(0, 0, 0, 0.6), 0 32px 80px -16px rgba(0, 0, 0, 0.5)',
            }}
            role="dialog"
            aria-label="AI Dock"
          >
            <CursorSpotlight
              size={280}
              intensity={0.12}
              className="rounded-xl"
              innerClassName="rounded-xl"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-border-subtle/40">
                <div className="flex items-center gap-2">
                  <span className="relative w-2 h-2 rounded-full bg-accent-qa jf-pulse-dot" />
                  <Bot size={16} className="text-accent-qa" />
                  <span className="text-sm font-medium text-text-primary tracking-[-0.01em]">
                    AI Dock
                  </span>
                  {!hasInteracted && <ThinkingWave className="ml-1" dotSize={2.5} />}
                </div>
                <motion.button
                  whileTap={m.tap.soft}
                  whileHover={{ rotate: 90, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }}
                  onClick={closeDock}
                  className="p-1 text-text-muted hover:text-text-primary rounded transition-colors cursor-pointer"
                  aria-label="Fechar"
                >
                  <X size={14} />
                </motion.button>
              </div>

              <div className="p-4">
                {!response && !isThinking && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: {},
                      visible: { transition: { staggerChildren: m.stagger.tight, delayChildren: 0.1 } },
                    }}
                    className="space-y-3 mb-4"
                  >
                    <div className="text-[10px] uppercase tracking-[0.14em] text-text-muted font-medium">
                      {hasInteracted ? 'Outras perguntas' : 'Sugestões'}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {suggestions.slice(0, hasInteracted ? 3 : 5).map(s => (
                        <motion.button
                          key={s}
                          variants={{
                            hidden: { opacity: 0, y: 6 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } },
                          }}
                          whileHover={{
                            y: -1,
                            transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
                          }}
                          whileTap={m.tap.soft}
                          onClick={() => handleAsk(s)}
                          className="px-3 py-1.5 text-xs text-text-secondary bg-surface-soft/60 hover:bg-surface-default/80 rounded-full transition-colors duration-200 border border-border-subtle/40 cursor-pointer"
                        >
                          {s}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                <AnimatePresence mode="wait">
                  {isThinking && (
                    <motion.div
                      key="thinking"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="mb-4 px-3 py-3 bg-surface-soft/40 rounded-lg border border-border-subtle/40 flex items-center gap-3"
                      aria-live="polite"
                    >
                      <Sparkles size={12} className="text-accent-qa" />
                      <ThinkingWave dotSize={3.5} gap={5} color="#9AA6B8" />
                      <span className="text-xs text-text-muted">Processando</span>
                    </motion.div>
                  )}

                  {response && !isThinking && (
                    <motion.div
                      key="response"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                      className="mb-4 p-3 bg-surface-soft/60 rounded-lg text-sm text-text-primary leading-relaxed border border-border-subtle/40"
                      aria-live="polite"
                    >
                      <strong className="text-accent-qa">Resposta:</strong> {response.text}
                      {response.link && (
                        <Link
                          href={response.link.href}
                          className="group block mt-2 text-accent-qa hover:underline transition-colors"
                        >
                          {response.link.label}
                          <span className="inline-block ml-1 transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                        </Link>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={question}
                    onChange={e => setQuestion(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleAsk()}
                    placeholder="Pergunte algo..."
                    className="flex-1 px-3 py-2 bg-surface-default/60 border border-border-subtle/40 rounded-lg text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-accent-qa/50 focus:shadow-[0_0_0_3px_rgba(79,140,255,0.08)] transition-all duration-200"
                    aria-label="Pergunta para AI"
                  />
                  <motion.button
                    whileHover={{ y: -1, scale: 1.04, transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] } }}
                    whileTap={m.tap.soft}
                    onClick={() => handleAsk()}
                    disabled={!question.trim()}
                    className="p-2 bg-accent-qa text-white rounded-lg shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_2px_8px_-2px_rgba(79,140,255,0.4)] hover:bg-accent-qa/95 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    aria-label="Enviar pergunta"
                  >
                    <Send size={14} />
                  </motion.button>
                </div>
              </div>
            </CursorSpotlight>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        ref={triggerRef}
        whileHover={{
          y: -2,
          scale: 1.06,
          transition: { duration: m.duration.snap, ease: m.easing.out },
        }}
        whileTap={m.tap.soft}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-60 w-12 h-12 bg-accent-qa text-white rounded-full flex items-center justify-center cursor-pointer group"
        style={{
          boxShadow:
            'inset 0 1px 0 0 rgba(255, 255, 255, 0.15), 0 0 0 1px rgba(79, 140, 255, 0.2), 0 8px 24px -6px rgba(79, 140, 255, 0.4), 0 16px 32px -8px rgba(0, 0, 0, 0.4)',
        }}
        aria-label={open ? 'Fechar AI Dock' : 'Abrir AI Dock'}
        aria-expanded={open}
      >
        {/* Halo breathing (suggesting "active intelligence") */}
        <span
          aria-hidden
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(79, 140, 255, 0.3), transparent 70%)',
            animation: 'glow 4s ease-in-out infinite',
          }}
        />
        {/* Outer breathing ring — only when closed */}
        <AnimatePresence>
          {!open && (
            <motion.span
              key="breath-ring"
              initial={{ opacity: 0, scale: 1 }}
              animate={{
                opacity: [0, 0.4, 0],
                scale: [1, 1.5, 1.8],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeOut',
              }}
              className="absolute inset-0 rounded-full border border-accent-qa/40 pointer-events-none"
              aria-hidden
            />
          )}
        </AnimatePresence>
        <motion.span
          animate={{ rotate: open ? 90 : 0, scale: open ? 0.9 : 1 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative inline-flex"
        >
          <Bot size={22} />
        </motion.span>
      </motion.button>
    </>
  );
}
