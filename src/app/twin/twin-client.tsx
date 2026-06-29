'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Box, GitBranch, Shield, FileText, Beaker, ArrowRight, Search, AlertTriangle, Activity } from 'lucide-react';
import { MockAdapter } from '@/core/knowledge/adapters/mock-adapter';
import { KnowledgeRepository } from '@/core/knowledge/repositories/knowledge-repository';
import { TwinEngine, ImpactEngine, HealthEngine } from '@/core/twin/engine';
import type { TwinData } from '@/core/twin/engine';
import type { EngineeringComponent } from '@/core/twin/types/component';
import { CrossReferences, getModuleReferences } from '@/components/platform/cross-references';
import { usePlatform } from '@/components/platform/platform-context';
import { motion as m } from '@/design-system/motion';

const healthColor: Record<string, string> = {
  excellent: '#22C55E',
  good: '#4F8CFF',
  fair: '#F59E0B',
  poor: '#FB923C',
  critical: '#EF4444',
};

const riskColor: Record<string, string> = {
  low: '#22C55E',
  medium: '#F59E0B',
  high: '#FB923C',
  critical: '#EF4444',
};

const typeIcons: Record<string, typeof Box> = {
  product: Box,
  project: GitBranch,
  decision: Shield,
  document: FileText,
  skill: Beaker,
};

export function TwinClient() {
  const { setCurrentModule } = usePlatform();
  useEffect(() => { setCurrentModule('twin'); }, [setCurrentModule]);

  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const twin = useMemo(() => {
    const repo = new KnowledgeRepository(new MockAdapter());
    repo.initialize();
    const engine = new TwinEngine(repo);
    return engine.build();
  }, []);

  const healthReport = useMemo(() => {
    const engine = new HealthEngine(twin);
    return engine.report();
  }, [twin]);

  const filtered = useMemo(() => {
    if (!query.trim()) return twin.components;
    const q = query.toLowerCase();
    return twin.components.filter(
      c => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q) || c.type.toLowerCase().includes(q),
    );
  }, [twin, query]);

  const selected = selectedComponent
    ? twin.components.find(c => c.id === selectedComponent) ?? null
    : null;

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-text-primary mb-2 tracking-[-0.025em]">
            Engineering Twin
          </h1>
          <p className="text-text-secondary max-w-xl text-sm">
            Digital twin da arquitetura — componentes, módulos, serviços, testes e
            relacionamentos do ecossistema Jun Fan.
          </p>
        </div>
        <div className="hidden md:flex items-center gap-3 text-[10px] text-text-muted/60">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full" style={{ background: healthColor[healthReport.overall >= 80 ? 'excellent' : healthReport.overall >= 60 ? 'fair' : 'critical'] }} />
            <span className="tabular-nums font-medium text-text-primary">{healthReport.overall}%</span>
            <span>health</span>
          </span>
          <span className="text-text-muted/20">·</span>
          <span>{twin.components.length} components</span>
          <span className="text-text-muted/20">·</span>
          <span>{twin.relationships.length} relationships</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Component list */}
        <div className="lg:col-span-2 space-y-4">
          {/* Search */}
          <div
            className="flex items-center gap-3 px-3 py-2 rounded-lg"
            style={{
              background: 'rgba(10, 14, 22, 0.6)',
              border: '1px solid rgba(244, 247, 250, 0.05)',
            }}
          >
            <Search size={14} className="text-text-muted" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search components by name, type, or description..."
              className="flex-1 bg-transparent text-xs text-text-primary placeholder:text-text-muted/50 outline-none"
            />
            <span className="text-[9px] text-text-muted/30">{filtered.length} of {twin.components.length}</span>
          </div>

          {/* Health summary bar */}
          <div className="grid grid-cols-5 gap-1 h-1.5 rounded-full overflow-hidden">
            {(['excellent', 'good', 'fair', 'poor', 'critical'] as const).map(level => {
              const count = twin.components.filter(c => c.health.health === level).length
              const pct = twin.components.length > 0 ? (count / twin.components.length) * 100 : 0
              return (
                <div
                  key={level}
                  style={{ width: `${pct}%`, background: healthColor[level], opacity: 0.6 }}
                  className="h-full transition-all"
                  title={`${level}: ${count}`}
                />
              )
            })}
          </div>

          {/* Component cards */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.02 } } }}
            className="space-y-2"
          >
            {filtered.map((component) => (
              <motion.div
                key={component.id}
                variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
                onClick={() => setSelectedComponent(component.id)}
                className="rounded-lg p-3 cursor-pointer transition-all duration-200"
                style={{
                  background: selectedComponent === component.id
                    ? 'rgba(79, 140, 255, 0.06)'
                    : 'rgba(10, 14, 22, 0.4)',
                  border: selectedComponent === component.id
                    ? '1px solid rgba(79, 140, 255, 0.15)'
                    : '1px solid rgba(244, 247, 250, 0.03)',
                }}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <div
                      className="w-6 h-6 rounded flex items-center justify-center shrink-0"
                      style={{ background: `${healthColor[component.health.health]}12` }}
                    >
                      {(() => {
                        const Icon = typeIcons[component.type] || Box
                        return <Icon size={11} style={{ color: healthColor[component.health.health] }} />
                      })()}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-medium text-text-primary truncate">{component.name}</div>
                      <div className="text-[9px] text-text-muted/50 truncate">{component.type} · {component.owner}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className="text-[9px] font-medium tabular-nums"
                      style={{ color: healthColor[component.health.health] }}
                    >
                      {component.health.overall}%
                    </span>
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: riskColor[component.health.risk] }}
                    />
                    <ArrowRight size={10} className="text-text-muted/20" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-10 text-text-muted/50 text-xs">
              No components match your search.
            </div>
          )}
        </div>

        {/* Detail panel */}
        <div className="space-y-4">
          {selected ? (
            <ComponentDetail component={selected} twin={twin} />
          ) : (
            <div
              className="rounded-xl p-6 text-center"
              style={{
                background: 'rgba(10, 14, 22, 0.6)',
                border: '1px solid rgba(244, 247, 250, 0.05)',
              }}
            >
              <Box size={24} className="text-text-muted/20 mx-auto mb-3" />
              <p className="text-xs text-text-muted/50">Select a component to view details</p>
            </div>
          )}

          <CrossReferences references={getModuleReferences('home')} title="Navegação Rápida" />
        </div>
      </div>
    </div>
  );
}

function ComponentDetail({ component, twin }: { component: EngineeringComponent; twin: TwinData }) {
  const impact = useMemo(() => {
    const engine = new ImpactEngine(twin);
    return engine.analyze(component.id);
  }, [component.id, twin]);

  const dependencies = component.dependencies
    .map(id => twin.components.find(c => c.id === id))
    .filter(Boolean) as EngineeringComponent[]

  const dependents = component.dependents
    .map(id => twin.components.find(c => c.id === id))
    .filter(Boolean) as EngineeringComponent[]

  const relatedDocs = twin.documents.filter(d => component.relatedDocs.includes(d.id))
  const relatedDecisions = twin.decisions.filter(d => component.relatedDecisions.includes(d.id))
  const relatedTests = twin.testSuites.filter(t => t.componentId === component.id)

  return (
    <motion.div
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-xl p-5"
      style={{
        background: 'rgba(10, 14, 22, 0.6)',
        border: '1px solid rgba(244, 247, 250, 0.05)',
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2 h-2 rounded-full" style={{ background: healthColor[component.health.health] }} />
        <h2 className="text-sm font-semibold text-text-primary truncate">{component.name}</h2>
      </div>

      {/* Health scores */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <Score label="Health" value={component.health.overall} color={healthColor[component.health.health]} />
        <Score label="Coverage" value={component.health.coverage} color="#4F8CFF" />
        <Score label="Knowledge" value={component.health.knowledge} color="#C084FC" />
        <Score label="Risk" value={riskLabel(component.health.risk)} color={riskColor[component.health.risk]} isText />
      </div>

      {/* Impact analysis */}
      <div className="mb-4 p-3 rounded-lg" style={{ background: 'rgba(244, 247, 250, 0.03)' }}>
        <div className="flex items-center gap-1.5 mb-2">
          <AlertTriangle size={10} className="text-text-muted" />
          <span className="text-[9px] font-medium text-text-muted uppercase tracking-wider">Impact Analysis</span>
        </div>
        <div className="space-y-1 text-[10px] text-text-secondary">
          <div className="flex justify-between">
            <span>Affected modules</span>
            <span className="tabular-nums text-text-primary">{impact.affectedModules.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Affected components</span>
            <span className="tabular-nums text-text-primary">{impact.affectedComponents.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Affected tests</span>
            <span className="tabular-nums text-text-primary">{impact.affectedTests.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Affected docs</span>
            <span className="tabular-nums text-text-primary">{impact.affectedDocs.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Affected decisions</span>
            <span className="tabular-nums text-text-primary">{impact.affectedDecisions.length}</span>
          </div>
        </div>
      </div>

      {/* Metadata */}
      <div className="space-y-2 text-[10px]">
        <InfoRow label="Type" value={component.type} />
        <InfoRow label="Owner" value={component.owner} />
        <InfoRow label="Status" value={component.status} />
        <InfoRow label="Maturity" value={component.maturity} />
        <InfoRow label="Dependencies" value={dependencies.map(d => d.name).join(', ') || 'none'} />
        <InfoRow label="Dependents" value={dependents.map(d => d.name).join(', ') || 'none'} />
        {relatedDocs.length > 0 && (
          <InfoRow label="Docs" value={relatedDocs.map(d => d.title).join(', ')} />
        )}
        {relatedDecisions.length > 0 && (
          <InfoRow label="Decisions" value={relatedDecisions.map(d => d.title.substring(0, 30)).join(', ')} />
        )}
        {relatedTests.length > 0 && (
          <InfoRow label="Tests" value={`${relatedTests.length} suites · ${relatedTests.reduce((s, t) => s + t.passed, 0)}/${relatedTests.reduce((s, t) => s + t.totalTests, 0)} passed`} />
        )}
      </div>
    </motion.div>
  );
}

function Score({ label, value, color, isText }: { label: string; value: number | string; color: string; isText?: boolean }) {
  return (
    <div className="p-2 rounded-lg" style={{ background: 'rgba(244, 247, 250, 0.03)' }}>
      <div className="text-[8px] uppercase tracking-wider text-text-muted/50">{label}</div>
      <div className="text-sm font-bold tabular-nums" style={{ color }}>{isText ? value : `${value}%`}</div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className="text-text-muted/50 w-20 shrink-0">{label}</span>
      <span className="text-text-secondary truncate">{value}</span>
    </div>
  );
}

function riskLabel(risk: string): string {
  return risk === 'critical' ? 'CRITICAL' : risk === 'high' ? 'HIGH' : risk === 'medium' ? 'MEDIUM' : 'LOW';
}
