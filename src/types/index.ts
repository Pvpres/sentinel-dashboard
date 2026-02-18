export type Brand = 'unified' | 'expedia' | 'hotels' | 'vrbo';

export type HealthStatus = 'healthy' | 'degraded' | 'critical';
export type ClusterStatus = 'healthy' | 'degraded' | 'migrating';
export type ConsolidationStatus = 'unified' | 'migrating' | 'deprecated' | 'legacy';
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';
export type MigrationStatus = 'in-progress' | 'planning' | 'blocked' | 'completed' | 'at-risk';

export interface DORAMetrics {
  deploymentFrequency: string;
  mttr: string;
  changeFailureRate: string;
  leadTime: string;
}

export interface BrandParity {
  feature: string;
  expedia: 'green' | 'yellow' | 'red';
  hotels: 'green' | 'yellow' | 'red';
  vrbo: 'green' | 'yellow' | 'red';
}

export interface KubernetesCluster {
  id: string;
  name: string;
  region: string;
  status: ClusterStatus;
  nodes: number;
  pods: number;
  cpuUtil: number;
  memUtil: number;
  brand: Brand;
}

export interface BigBoulder {
  id: string;
  programName: string;
  status: MigrationStatus;
  percentComplete: number;
  riskLevel: RiskLevel;
  owner: string;
  startDate: string;
  targetDate: string;
  servicesAffected: number;
}

export interface DevinMetrics {
  prsGenerated: number;
  engineeringHoursSaved: number;
  estimatedCostSaved: string;
  vulnerabilitiesPatched: number;
  testsGenerated: number;
  codeReviewsCompleted: number;
}

export interface Service {
  id: string;
  repoName: string;
  ownerTeam: string;
  language: string;
  health: HealthStatus;
  consolidationStatus: ConsolidationStatus;
  cluster: string;
  brands: Brand[];
  lastDeployed: string;
  pipelineStatus: 'passing' | 'failing' | 'pending';
}

export interface DevinActivity {
  id: string;
  message: string;
  timestamp: string;
  type: 'test' | 'security' | 'refactor' | 'review' | 'migration';
}

export interface ServiceDetail extends Service {
  description: string;
  brandFeatureUsage: { brand: string; features: string[]; usage: number }[];
  devinActivities: DevinActivity[];
  dependencies: string[];
  metrics: {
    requestsPerSec: number;
    errorRate: number;
    p99Latency: number;
    uptime: number;
  };
}

export type ViewType =
  | 'global-health'
  | 'brand-parity'
  | 'cluster-manager'
  | 'big-boulder'
  | 'devin-insights'
  | 'sentinel-scoping'
  | 'service-catalog'
  | 'service-detail';
