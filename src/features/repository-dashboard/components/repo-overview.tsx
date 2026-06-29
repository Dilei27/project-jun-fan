'use client';

import { motion } from 'framer-motion';
import { GitBranch, Clock, FolderOpen, FileCode, GitFork } from 'lucide-react';
import { motion as m } from '@/design-system/motion';
import type { Repository, PipelineResult } from '@/core/repository';
import { StatusBadge } from './status-badge';

interface RepoOverviewProps {
  repository: Repository
  result: PipelineResult
}

export function RepoOverview({ repository, result }: RepoOverviewProps) {
  const { metadata } = result
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: m.easing.out }}
      className="rounded-xl p-5"
      style={{
        background: 'rgba(17, 24, 33, 0.6)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(244, 247, 250, 0.04)',
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h1 className="text-lg font-semibold text-text-primary">{repository.name}</h1>
          <p className="text-xs text-text-muted mt-0.5 max-w-xl">{repository.description}</p>
        </div>
        <StatusBadge status={repository.analysisStatus} />
      </div>

      {/* Metadata badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Badge icon={<GitBranch size={10} />} label={metadata.framework} color="#4F8CFF" />
        <Badge icon={<FileCode size={10} />} label={metadata.language} color="#22C55E" />
        <Badge icon={<GitFork size={10} />} label={metadata.packageManager} color="#C084FC" />
        <Badge icon={<Clock size={10} />} label={metadata.ci} color="#FB923C" />
        <Badge icon={<FolderOpen size={10} />} label={metadata.architecturePattern} color="#22D3EE" />
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-5 gap-3">
        <StatCard value={result.scanResult.modules.length.toString()} label="Módulos" color="#4F8CFF" />
        <StatCard value={result.scanResult.folders.length.toString()} label="Pastas" color="#22C55E" />
        <StatCard value={result.scanResult.files.length.toString()} label="Arquivos" color="#EAB308" />
        <StatCard value={result.knowledgeNodes.length.toString()} label="Knowledge Nodes" color="#C084FC" />
        <StatCard value={result.relationships.length.toString()} label="Relações" color="#FB923C" />
      </div>
    </motion.div>
  )
}

function Badge({ icon, label, color }: { icon: React.ReactNode; label: string; color: string }) {
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[9px] font-medium uppercase tracking-wider"
      style={{
        background: `${color}10`,
        color,
        border: `1px solid ${color}20`,
      }}
    >
      {icon}
      {label}
    </span>
  )
}

function StatCard({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <div className="rounded-lg px-3 py-2.5 text-center" style={{ background: 'rgba(244,247,250,0.02)' }}>
      <p className="text-lg font-semibold tabular-nums" style={{ color }}>{value}</p>
      <p className="text-[8px] uppercase tracking-wider text-text-muted/60 mt-0.5">{label}</p>
    </div>
  )
}
