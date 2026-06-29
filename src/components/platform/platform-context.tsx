'use client';

import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from 'react';
import { MockAdapter } from '@/core/knowledge/adapters/mock-adapter';
import { KnowledgeRepository } from '@/core/knowledge/repositories/knowledge-repository';
import { getNodeStatistics, getEdgeStatistics, getModuleStatistics } from '@/core/knowledge/services/statistics-service';

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface ModuleHealth {
  id: string
  name: string
  health: 'healthy' | 'degraded' | 'critical' | 'unknown'
  color: string
}

export interface PlatformStatus {
  knowledge: ModuleHealth
  architecture: ModuleHealth
  qa: ModuleHealth
  documentation: ModuleHealth
  overall: ModuleHealth
  totalNodes: number
  totalEdges: number
  totalDecisions: number
  healthyPercent: number
}

export interface HistoryEntry {
  module: string
  label: string
  href: string
  timestamp: number
}

export interface PlatformContextValue {
  currentModule: string
  setCurrentModule: (module: string) => void
  breadcrumb: BreadcrumbItem[]
  setBreadcrumb: (items: BreadcrumbItem[]) => void
  selectedNodeId: string | null
  setSelectedNodeId: (id: string | null) => void
  status: PlatformStatus
  selectedKnowledgeNodeLabel: string | null
  setSelectedKnowledgeNodeLabel: (label: string | null) => void
  navigationHistory: HistoryEntry[]
  pushHistory: (entry: Omit<HistoryEntry, 'timestamp'>) => void
  environment: string
  version: string
  syncStatus: 'synced' | 'syncing' | 'error'
}

const defaultStatus: PlatformStatus = {
  knowledge: { id: 'knowledge', name: 'Knowledge Engine', health: 'healthy', color: '#22D3EE' },
  architecture: { id: 'architecture', name: 'Architecture', health: 'healthy', color: '#C084FC' },
  qa: { id: 'qa', name: 'QA', health: 'healthy', color: '#4F8CFF' },
  documentation: { id: 'documentation', name: 'Docs', health: 'healthy', color: '#EAB308' },
  overall: { id: 'overall', name: 'Platform', health: 'healthy', color: '#22C55E' },
  totalNodes: 0,
  totalEdges: 0,
  totalDecisions: 0,
  healthyPercent: 100,
};

function computeStatus(): PlatformStatus {
  try {
    const repo = new KnowledgeRepository(new MockAdapter());
    repo.initialize();
    const nodeStats = getNodeStatistics(repo);
    const edgeStats = getEdgeStatistics(repo);
    const moduleStats = getModuleStatistics(repo);
    const decisionCount = repo.getIndex().getByType('decision').length;
    const totalNodes = nodeStats.totalNodes;
    const healthyCount = nodeStats.byHealth['healthy'] ?? 0;
    const healthyPercent = totalNodes > 0 ? Math.round((healthyCount / totalNodes) * 100) : 100;

    const toHealth = (ratio: number): ModuleHealth['health'] => {
      if (ratio >= 0.9) return 'healthy';
      if (ratio >= 0.6) return 'degraded';
      return 'critical';
    };

    const documentNodes = repo.getIndex().getByType('document').length;
    const docHealthy = repo.getIndex().getByType('document').filter(n => n.health === 'healthy').length;

    const productNodes = repo.getIndex().getByType('product').length;
    const projectNodes = repo.getIndex().getByType('project').length;
    const qaTotal = productNodes + projectNodes;
    const qaHealthy = [
      ...repo.getIndex().getByType('product'),
      ...repo.getIndex().getByType('project'),
    ].filter(n => n.health === 'healthy').length;

    const decisionTotal = decisionCount;
    const decisionHealthy = repo.getIndex().getByType('decision').filter(n => n.health === 'healthy').length;

    const overallRatio = healthyPercent / 100;

    return {
      knowledge: { id: 'knowledge', name: 'Knowledge Engine', health: toHealth(healthyPercent / 100), color: '#22D3EE' },
      architecture: { id: 'architecture', name: 'Architecture', health: toHealth(decisionTotal > 0 ? decisionHealthy / decisionTotal : 1), color: '#C084FC' },
      qa: { id: 'qa', name: 'QA', health: toHealth(qaTotal > 0 ? qaHealthy / qaTotal : 1), color: '#4F8CFF' },
      documentation: { id: 'documentation', name: 'Docs', health: toHealth(documentNodes > 0 ? docHealthy / documentNodes : 1), color: '#EAB308' },
      overall: { id: 'overall', name: 'Platform', health: toHealth(overallRatio), color: '#22C55E' },
      totalNodes,
      totalEdges: edgeStats.total,
      totalDecisions: decisionCount,
      healthyPercent,
    };
  } catch {
    return { ...defaultStatus };
  }
}

const PlatformContext = createContext<PlatformContextValue | null>(null);

export function PlatformProvider({ children }: { children: ReactNode }) {
  const [currentModule, setCurrentModule] = useState('home');
  const [breadcrumb, setBreadcrumb] = useState<BreadcrumbItem[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [selectedKnowledgeNodeLabel, setSelectedKnowledgeNodeLabel] = useState<string | null>(null);
  const [navigationHistory, setNavigationHistory] = useState<HistoryEntry[]>([]);
  const [status] = useState<PlatformStatus>(computeStatus);

  const handleSetModule = useCallback((m: string) => setCurrentModule(m), []);
  const handleSetBreadcrumb = useCallback((items: BreadcrumbItem[]) => setBreadcrumb(items), []);
  const handleSetSelected = useCallback((id: string | null) => setSelectedNodeId(id), []);
  const handleSetSelectedNodeLabel = useCallback((label: string | null) => setSelectedKnowledgeNodeLabel(label), []);

  const pushHistory = useCallback((entry: Omit<HistoryEntry, 'timestamp'>) => {
    setNavigationHistory(prev => {
      const next = [...prev, { ...entry, timestamp: Date.now() }];
      return next.length > 50 ? next.slice(-50) : next;
    });
  }, []);

  const value = useMemo<PlatformContextValue>(
    () => ({
      currentModule,
      setCurrentModule: handleSetModule,
      breadcrumb,
      setBreadcrumb: handleSetBreadcrumb,
      selectedNodeId,
      setSelectedNodeId: handleSetSelected,
      status,
      selectedKnowledgeNodeLabel,
      setSelectedKnowledgeNodeLabel: handleSetSelectedNodeLabel,
      navigationHistory,
      pushHistory,
      environment: 'production',
      version: '0.1.0',
      syncStatus: 'synced',
    }),
    [
      currentModule, breadcrumb, selectedNodeId, status,
      selectedKnowledgeNodeLabel, navigationHistory,
      handleSetModule, handleSetBreadcrumb, handleSetSelected, handleSetSelectedNodeLabel, pushHistory,
    ],
  );

  return (
    <PlatformContext.Provider value={value}>
      {children}
    </PlatformContext.Provider>
  );
}

export function usePlatform(): PlatformContextValue {
  const ctx = useContext(PlatformContext);
  if (!ctx) throw new Error('usePlatform must be used within PlatformProvider');
  return ctx;
}
