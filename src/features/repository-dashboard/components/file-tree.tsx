'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, FolderOpen, File, ChevronRight } from 'lucide-react';
import { motion as m } from '@/design-system/motion';
import type { Folder as RepoFolder, File as RepoFile } from '@/core/repository';

interface FileTreeProps {
  folders: RepoFolder[]
}

export function FileTree({ folders }: FileTreeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15, ease: m.easing.out }}
      className="rounded-xl p-4"
      style={{
        background: 'rgba(17, 24, 33, 0.6)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(244, 247, 250, 0.04)',
      }}
    >
      <div className="flex items-center gap-1.5 mb-3">
        <Folder size={12} className="text-text-muted" />
        <h2 className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">Estrutura de Pastas</h2>
      </div>

      <div className="space-y-0.5 max-h-[400px] overflow-y-auto pr-1 scrollbar-thin">
        {folders.map((folder) => (
          <FolderNode key={folder.id} folder={folder} depth={0} />
        ))}
      </div>
    </motion.div>
  )
}

function FolderNode({ folder, depth }: { folder: RepoFolder; depth: number }) {
  const [open, setOpen] = useState(depth < 1)
  const hasChildren = folder.folders.length > 0 || folder.files.length > 0

  return (
    <div>
      <button
        onClick={() => hasChildren && setOpen(!open)}
        className="flex items-center gap-1.5 w-full px-1 py-0.5 rounded text-left transition-all hover:bg-white/[0.02] group"
        style={{ paddingLeft: `${depth * 12 + 4}px` }}
      >
        <ChevronRight
          size={8}
          className="text-text-muted/30 transition-transform shrink-0"
          style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }}
        />
        {open ? (
          <FolderOpen size={10} className="text-accent-qa shrink-0" />
        ) : (
          <Folder size={10} className="text-accent-qa/70 shrink-0" />
        )}
        <span className="text-[9px] text-text-primary truncate">{folder.name}</span>
        {folder.files.length > 0 && (
          <span className="text-[7px] text-text-muted/30 ml-auto">{folder.files.length}</span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15, ease: m.easing.out }}
            className="overflow-hidden"
          >
            {folder.folders.map((child) => (
              <FolderNode key={child.id} folder={child} depth={depth + 1} />
            ))}
            {folder.files.map((file) => (
              <FileNode key={file.id} file={file} depth={depth + 1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const languageColors: Record<string, string> = {
  typescript: '#4F8CFF',
  javascript: '#EAB308',
  css:        '#22D3EE',
  json:       '#687385',
  markdown:   '#22C55E',
  dockerfile: '#FB923C',
};

function FileNode({ file, depth }: { file: RepoFile; depth: number }) {
  const color = languageColors[file.language] ?? '#687385'
  return (
    <div
      className="flex items-center gap-1.5 px-1 py-0.5 rounded hover:bg-white/[0.02] group"
      style={{ paddingLeft: `${depth * 12 + 4}px` }}
    >
      <File size={9} className="text-text-muted/40 shrink-0" />
      <span className="text-[9px] text-text-muted/80 truncate">{file.name}</span>
      <span className="text-[7px] text-text-muted/20 ml-auto">{file.lines} lines</span>
      {file.language !== 'unknown' && (
        <span
          className="w-1.5 h-1.5 rounded-full shrink-0"
          style={{ background: color }}
          title={file.language}
        />
      )}
    </div>
  )
}
