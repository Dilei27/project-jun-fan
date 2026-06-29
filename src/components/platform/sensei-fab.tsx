'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';

export function SenseiFab() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* FAB button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-20 z-45 w-11 h-11 rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-shadow duration-200"
        style={{
          background: 'linear-gradient(135deg, rgba(79, 140, 255, 0.2), rgba(192, 132, 252, 0.2))',
          border: '1px solid rgba(244, 247, 250, 0.1)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: '0 4px 20px -4px rgba(79, 140, 255, 0.2), 0 0 0 1px rgba(79, 140, 255, 0.1)',
        }}
        aria-label="Sensei AI Assistant (coming soon)"
      >
        <motion.span
          animate={{ rotate: open ? 90 : 0, scale: open ? 0.8 : 1 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {open ? <X size={16} className="text-text-muted" /> : <Sparkles size={16} style={{ color: '#C084FC' }} />}
        </motion.span>
      </motion.button>

      {/* Tooltip / Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-20 right-20 z-45 w-72 rounded-xl p-5"
            style={{
              background: 'rgba(10, 14, 22, 0.95)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(244, 247, 250, 0.08)',
              boxShadow: '0 16px 48px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(192, 132, 252, 0.08)',
            }}
          >
            <div className="flex items-center gap-2.5 mb-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(79, 140, 255, 0.15), rgba(192, 132, 252, 0.15))',
                  border: '1px solid rgba(244, 247, 250, 0.06)',
                }}
              >
                <Sparkles size={14} style={{ color: '#C084FC' }} />
              </div>
              <div>
                <span className="text-sm font-semibold text-text-primary">Sensei</span>
                <span className="block text-[9px] text-text-muted/50 font-mono">AI Assistant</span>
              </div>
            </div>
            <p className="text-xs text-text-muted leading-relaxed mb-3">
              Sensei will be available soon. Ele será seu assistente pessoal para
              navegar pelo ecossistema Jun Fan.
            </p>
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-lg"
              style={{
                background: 'rgba(79, 140, 255, 0.06)',
                border: '1px solid rgba(79, 140, 255, 0.1)',
              }}
            >
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1.5 h-1.5 rounded-full bg-accent-qa"
              />
              <span className="text-[10px] text-accent-qa/70 font-medium">Training in progress</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
