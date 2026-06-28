export interface DashboardMetric {
  label: string;
  value: number;
  change?: number;
  target?: number;
}

export interface DashboardData {
  metrics: DashboardMetric[];
  activities: ActivityEntry[];
}

export interface ActivityEntry {
  label: string;
  time: string;
}
