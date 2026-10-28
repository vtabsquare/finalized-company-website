export type NavItem = {
  label: string;
  href: string;
};

export type FeatureCategory = 
  | 'Data Connectivity'
  | 'Data Transformation'
  | 'Semantic Modelling'
  | 'VTAB Measure Engine'
  | 'Interactive Dashboards'
  | 'Advanced Reporting';

export interface FeatureItem {
  id: string;
  category: FeatureCategory;
  shortTag: string;
  title: string;
  description: string;
  highlightPoints: string[];
  specs: { label: string; value: string }[];
  previewType: 'connectors' | 'transform' | 'model' | 'engine' | 'dashboard' | 'paginated';
}

export type DashboardCategory = 
  | 'Retail Performance Analysis'
  | 'Sales Analytics'
  | 'Financial Analytics'
  | 'Geographic Intelligence'
  | 'Healthcare Reporting';

export interface MetricCard {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  subtext: string;
}

export interface DashboardData {
  id: string;
  title: DashboardCategory;
  subtitle: string;
  timeframe: string;
  metrics: MetricCard[];
  keyDimensions: string[];
  reportType: string;
  embedUrl?: string;
  isLiveEmbed?: boolean;
  badge?: string;
}

export interface WorkflowStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  icon: string;
}

export interface EditionInfo {
  name: string;
  badge: string;
  description: string;
  targetAudience: string;
  highlights: string[];
  actionLabel: string;
}
