'use client';

import {
  Bug,
  Workflow,
  PlayCircle,
  Heart,
  Brain,
  AlertTriangle,
} from 'lucide-react';
import { StatCard, type StatCardData } from './stat-card';

const cardsData: StatCardData[] = [
  {
    label: 'Coverage',
    value: '94.7%',
    icon: <Bug />,
    trend: 2.3,
    trendLabel: 'vs mês passado',
    color: '#4F8CFF',
    sparkline: [78, 82, 79, 85, 88, 83, 87, 91, 89, 93, 92, 95],
  },
  {
    label: 'Automation',
    value: '50+',
    icon: <Workflow />,
    trend: 12,
    trendLabel: 'novos testes',
    color: '#22C55E',
    sparkline: [12, 15, 18, 22, 25, 28, 32, 35, 38, 42, 46, 50],
  },
  {
    label: 'Executions',
    value: '1,247',
    icon: <PlayCircle />,
    trend: -3.1,
    trendLabel: 'vs mês passado',
    color: '#C084FC',
    sparkline: [180, 195, 210, 190, 205, 220, 200, 215, 230, 210, 225, 195],
  },
  {
    label: 'Health',
    value: '97.8%',
    icon: <Heart />,
    trend: 0,
    trendLabel: 'estável',
    color: '#F59E0B',
    sparkline: [95, 96, 97, 96, 97, 98, 97, 97, 98, 97, 98, 98],
  },
  {
    label: 'Knowledge',
    value: '87.2%',
    icon: <Brain />,
    trend: 4.1,
    trendLabel: 'novos vínculos',
    color: '#22D3EE',
    sparkline: [60, 63, 65, 68, 72, 74, 77, 80, 82, 84, 86, 87],
  },
  {
    label: 'Risk',
    value: '12',
    icon: <AlertTriangle />,
    trend: -2,
    trendLabel: 'itens abertos',
    color: '#FB923C',
    sparkline: [18, 17, 16, 16, 15, 14, 14, 13, 13, 12, 12, 12],
  },
];

export function StatCardsGrid() {
  return (
    <section className="mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        {cardsData.map((card, i) => (
          <StatCard key={card.label} data={card} index={i} />
        ))}
      </div>
    </section>
  );
}
