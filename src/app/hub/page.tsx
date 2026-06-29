'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { getProducts, getProjects } from '@/lib/content';
import { ArrowRight, Beaker, BookOpen, GitBranch, Shield } from 'lucide-react';
import { PageEntry } from '@/components/shared/page-entry';
import { motion as m } from '@/design-system/motion';
import { EmptyState } from '@/components/shared/empty-state';

const hubLinks = [
  { href: '/', icon: Shield, label: 'QA Command Center', desc: 'Cockpit principal do ecossistema' },
  { href: '/produto/whatsapp-ai/', icon: Beaker, label: 'WhatsApp AI', desc: 'Assistente comercial inteligente' },
  { href: '/produto/vigilante-ai/', icon: GitBranch, label: 'Vigilante AI', desc: 'Monitoramento com IA' },
  { href: '/docs/', icon: BookOpen, label: 'Documentação', desc: 'Guias, setup e arquitetura' },
];

const cardShadow =
  'inset 0 1px 0 0 rgba(244, 247, 250, 0.03), 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 4px 12px -4px rgba(0, 0, 0, 0.3)';

export default function HubPage() {
  const products = getProducts();
  const projects = getProjects();

  return (
    <PageEntry className="max-w-[1440px] mx-auto px-6 py-10">
      <h1 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-2 tracking-[-0.025em] text-balance">
        Jun Fan Hub
      </h1>
      <p className="text-text-secondary mb-10 max-w-xl">
        Explore o ecossistema de produtos, projetos e documentação.
      </p>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: m.stagger.default, delayChildren: 0.1 } },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
      >
        {hubLinks.map(link => {
          const Icon = link.icon;
          return (
            <motion.div
              key={link.href}
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0, transition: { duration: m.duration.normal, ease: m.easing.out } },
              }}
              whileHover={{ y: -3, transition: { duration: m.duration.fast, ease: m.easing.out } }}
            >
              <Link
                href={link.href}
                className="jf-lift flex flex-col gap-3 p-5 bg-surface-default/80 border border-border-subtle/60 rounded-lg group block h-full"
                style={{ boxShadow: cardShadow }}
              >
                <Icon size={24} className="text-accent-qa" />
                <div>
                  <h3 className="text-sm font-semibold text-text-primary group-hover:text-accent-qa transition-colors duration-200">
                    {link.label}
                  </h3>
                  <p className="text-xs text-text-muted mt-0.5">{link.desc}</p>
                </div>
                <ArrowRight
                  size={14}
                  className="text-text-muted group-hover:text-accent-qa group-hover:translate-x-0.5 mt-auto self-end transition-all duration-200"
                />
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-lg font-semibold text-text-primary mb-4 tracking-[-0.01em]">
            Produtos
          </h2>
          {products.length === 0 ? (
            <EmptyState
              icon={<Beaker size={20} />}
              title="Nenhum produto ainda"
              description="Quando os produtos forem cadastrados, eles aparecerão aqui."
            />
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: m.stagger.tight, delayChildren: 0.2 } },
              }}
              className="space-y-3"
            >
              {products.map(p => (
                <motion.div
                  key={p.id}
                  variants={{
                    hidden: { opacity: 0, x: -8 },
                    visible: { opacity: 1, x: 0, transition: { duration: m.duration.fast, ease: m.easing.out } },
                  }}
                >
                  <Link
                    href={`/produto/${p.id}/`}
                    className="jf-lift flex items-center justify-between p-3 bg-surface-default/80 border border-border-subtle/60 rounded-lg block"
                    style={{ boxShadow: cardShadow }}
                  >
                    <span className="text-sm font-medium text-text-primary">{p.name}</span>
                    <span className="text-xs text-text-muted">{p.status}</span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
        <div>
          <h2 className="text-lg font-semibold text-text-primary mb-4 tracking-[-0.01em]">
            Projetos
          </h2>
          {projects.length === 0 ? (
            <EmptyState
              icon={<GitBranch size={20} />}
              title="Nenhum projeto ainda"
              description="Quando os projetos forem cadastrados, eles aparecerão aqui."
            />
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: m.stagger.tight, delayChildren: 0.25 } },
              }}
              className="space-y-3"
            >
              {projects.map(p => (
                <motion.div
                  key={p.id}
                  variants={{
                    hidden: { opacity: 0, x: -8 },
                    visible: { opacity: 1, x: 0, transition: { duration: m.duration.fast, ease: m.easing.out } },
                  }}
                >
                  <Link
                    href={`/projeto/${p.id}/`}
                    className="jf-lift flex items-center justify-between p-3 bg-surface-default/80 border border-border-subtle/60 rounded-lg block"
                    style={{ boxShadow: cardShadow }}
                  >
                    <span className="text-sm font-medium text-text-primary">{p.title}</span>
                    <span className="text-xs text-text-muted">
                      {p.status === 'concluido' ? 'Concluído' : 'Em andamento'}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </PageEntry>
  );
}
