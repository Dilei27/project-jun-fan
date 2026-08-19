'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FolderGit, Star, Lock, GitFork, CircleDot } from 'lucide-react';
import { motion as m } from '@/design-system/motion';

interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  pushed_at: string;
}

export interface PrivateRepoEntry {
  name: string;
  description: string;
  language: string;
}

const PRIVATE_REPOS: PrivateRepoEntry[] = [
  {
    name: 'vigilante-mvp',
    description: 'Sistema de vigilância residencial com IA local, alertas via WhatsApp e integração com sirene.',
    language: 'Python',
  },
];

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178C6',
  JavaScript: '#F7DF1E',
  Python: '#3776AB',
  HTML: '#E34F26',
  Java: '#B07219',
  'C#': '#178600',
  RobotFramework: '#00C0B5',
  CSS: '#563D7C',
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days < 1) return 'hoje';
  if (days === 1) return 'ontem';
  if (days < 30) return `${days} dias`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} ${months === 1 ? 'mês' : 'meses'}`;
  const years = Math.floor(months / 12);
  return `${years} ${years === 1 ? 'ano' : 'anos'}`;
}

export function GitHubRepos() {
  const [repos, setRepos] = useState<GitHubRepo[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch('https://api.github.com/users/Dilei27/repos?per_page=100&sort=updated')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<GitHubRepo[]>;
      })
      .then(data => {
        if (cancelled) return;
        const own = data
          .filter(r => !r.fork)
          .sort((a, b) => {
            const byStars = b.stargazers_count - a.stargazers_count;
            if (byStars !== 0) return byStars;
            return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
          })
          .slice(0, 8);
        setRepos(own);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="rounded-xl p-5" style={{
      background: 'rgba(17, 24, 33, 0.6)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(244, 247, 250, 0.04)',
    }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1.5">
          <FolderGit size={12} className="text-text-muted" />
          <h2 className="text-[12px] font-semibold uppercase tracking-wider text-text-muted">
            Repositórios GitHub
          </h2>
        </div>
        <a
          href="https://github.com/Dilei27?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[13px] text-accent-qa/80 hover:text-accent-qa transition-colors"
        >
          Ver todos →
        </a>
      </div>

      <div className="space-y-1.5">
        {/* Private repos — metadata only */}
        {PRIVATE_REPOS.map((repo, i) => (
          <motion.div
            key={repo.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.06, ease: m.easing.out }}
            className="flex items-start gap-2 px-3 py-2 rounded-lg"
            style={{ background: 'rgba(249, 115, 22, 0.03)' }}
          >
            <Lock size={10} className="text-accent-vigilante mt-1 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[12px] font-medium text-text-primary">{repo.name}</span>
                <span
                  className="text-[12px] font-medium uppercase tracking-wider px-1 py-0.5 rounded"
                  style={{ background: 'rgba(249, 115, 22, 0.12)', color: '#F97316' }}
                >
                  Privado
                </span>
              </div>
              <p className="text-[13px] text-text-muted/60 mt-0.5 line-clamp-1">{repo.description}</p>
              <div className="flex items-center gap-1.5 mt-1">
                <CircleDot size={9} style={{ color: LANG_COLORS[repo.language] ?? '#687385' }} />
                <span className="text-[12px] text-text-muted/50">{repo.language}</span>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Public repos — live from GitHub API */}
        {error && (
          <div className="px-3 py-4 text-center">
            <p className="text-[13px] text-text-muted/50">
              Não foi possível carregar os repositórios públicos agora.
            </p>
            <a
              href="https://github.com/Dilei27?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-accent-qa/80 hover:text-accent-qa transition-colors"
            >
              Ver no GitHub →
            </a>
          </div>
        )}
        {!error && repos === null && (
          <div className="px-3 py-4">
            <div className="space-y-2">
              {[0, 1, 2].map(i => (
                <div key={i} className="h-10 rounded-lg jf-shimmer" />
              ))}
            </div>
          </div>
        )}
        {repos?.map((repo, i) => (
          <motion.div
            key={repo.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: (i + PRIVATE_REPOS.length) * 0.06, ease: m.easing.out }}
          >
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2 px-3 py-2 rounded-lg transition-all hover:bg-white/[0.02] group"
            >
              <GitFork size={10} className="text-text-muted/40 mt-1 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[12px] font-medium text-text-primary group-hover:text-accent-qa transition-colors">
                    {repo.name}
                  </span>
                  {repo.stargazers_count > 0 && (
                    <span className="flex items-center gap-0.5 text-[12px] text-text-muted/50">
                      <Star size={9} className="fill-current" />
                      {repo.stargazers_count}
                    </span>
                  )}
                </div>
                <p className="text-[13px] text-text-muted/60 mt-0.5 line-clamp-1">
                  {repo.description ?? 'Sem descrição'}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  {repo.language && (
                    <span className="flex items-center gap-1">
                      <CircleDot size={9} style={{ color: LANG_COLORS[repo.language] ?? '#687385' }} />
                      <span className="text-[12px] text-text-muted/50">{repo.language}</span>
                    </span>
                  )}
                  <span className="text-[12px] text-text-muted/30">
                    atualizado {timeAgo(repo.pushed_at)}
                  </span>
                </div>
              </div>
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
