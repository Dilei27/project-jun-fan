'use client';

import { motion } from 'framer-motion';
import { motion as m } from '@/design-system/motion';
import { HeroExperience } from './components/hero-experience';
import { CareerTimeline } from './components/career-timeline';
import { EngineeringDNA } from './components/engineering-dna';
import { SkillsGraph } from './components/skills-graph';
import { ImpactMetrics } from './components/impact-metrics';
import { FeaturedProjects } from './components/featured-projects';
import { EngineeringPhilosophy } from './components/engineering-philosophy';
import { KnowledgeConnections } from './components/knowledge-connections';
import { CareerKnowledgeGraph } from './components/career-knowledge-graph';
import { PublicPresence } from './components/public-presence';

export function EngineeringProfileShell() {
  return (
    <div className="min-h-screen px-6 py-8 max-w-5xl mx-auto space-y-5">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: m.easing.out }}
      >
        <HeroExperience />

        <div className="grid grid-cols-2 gap-4">
          <CareerTimeline />
          <EngineeringDNA />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <SkillsGraph />
          <ImpactMetrics />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <FeaturedProjects />
          <EngineeringPhilosophy />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <KnowledgeConnections />
          <CareerKnowledgeGraph />
        </div>

        <div className="mt-4">
          <PublicPresence />
        </div>
      </motion.div>
    </div>
  )
}
