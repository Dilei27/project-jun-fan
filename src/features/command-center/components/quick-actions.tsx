'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { GitBranch, FileText, Shield, PlayCircle, Brain, LayoutDashboard } from 'lucide-react';
import { motion as m } from '@/design-system/motion';

const actions = [
  { label: 'Knowledge Graph', href: '/knowledge-graph/', icon: GitBranch, color: '#4F8CFF' },
  { label: 'Live Docs', href: '/docs/', icon: FileText, color: '#EAB308' },
  { label: 'Architecture', href: '/command-center/architecture/', icon: Shield, color: '#22D3EE' },
  { label: 'Run Demo', href: '/produto/qa-command-center/demo/', icon: PlayCircle, color: '#22C55E' },
  { label: 'AI Dock', href: '/', icon: Brain, color: '#C084FC' },
  { label: 'Dashboard', href: '/command-center/projects/', icon: LayoutDashboard, color: '#FB923C' },
];

export function QuickActions() {
  return (
    <section className="mb-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full" style={{ background: '#22C55E' }} />
          <h3 className="text-sm font-semibold text-text-primary">Quick Actions</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {actions.map((action, i) => {
            const Icon = action.icon;
            return (
              <Link key={action.label} href={action.href} className="block group">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -2, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }}
                  className="rounded-xl p-4 text-center transition-all duration-200"
                  style={{
                    background: 'rgba(10, 14, 22, 0.6)',
                    border: '1px solid rgba(244, 247, 250, 0.06)',
                    boxShadow: '0 4px 16px -8px rgba(0,0,0,0.4)',
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center mx-auto mb-2 transition-all duration-200"
                    style={{
                      background: `${action.color}10`,
                      border: `1px solid ${action.color}18`,
                    }}
                  >
                    <Icon size={16} style={{ color: action.color }} />
                  </div>
                  <span className="text-[11px] font-medium text-text-muted group-hover:text-text-primary transition-colors duration-200">
                    {action.label}
                  </span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
