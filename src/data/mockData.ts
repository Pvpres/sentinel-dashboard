import type {
  DORAMetrics,
  BrandParity,
  KubernetesCluster,
  BigBoulder,
  DevinMetrics,
  Service,
  ServiceDetail,
  DevinActivity,
  Brand,
} from '../types';

export const doraMetrics: Record<string, DORAMetrics> = {
  unified: {
    deploymentFrequency: '847/day',
    mttr: '14.2 min',
    changeFailureRate: '2.1%',
    leadTime: '3.8 hrs',
  },
  expedia: {
    deploymentFrequency: '412/day',
    mttr: '12.8 min',
    changeFailureRate: '1.8%',
    leadTime: '3.2 hrs',
  },
  hotels: {
    deploymentFrequency: '238/day',
    mttr: '16.1 min',
    changeFailureRate: '2.4%',
    leadTime: '4.1 hrs',
  },
  vrbo: {
    deploymentFrequency: '197/day',
    mttr: '15.3 min',
    changeFailureRate: '2.7%',
    leadTime: '4.6 hrs',
  },
};

export const fleetStats = {
  unified: { totalServices: 10284, healthyServices: 9847, degradedServices: 389, criticalServices: 48, totalClusters: 512, activeDeployments: 847, incidents: 3 },
  expedia: { totalServices: 4821, healthyServices: 4632, degradedServices: 168, criticalServices: 21, totalClusters: 241, activeDeployments: 412, incidents: 1 },
  hotels: { totalServices: 3102, healthyServices: 2971, degradedServices: 118, criticalServices: 13, totalClusters: 156, activeDeployments: 238, incidents: 1 },
  vrbo: { totalServices: 2361, healthyServices: 2244, degradedServices: 103, criticalServices: 14, totalClusters: 115, activeDeployments: 197, incidents: 1 },
};

export const brandParityData: BrandParity[] = [
  { feature: 'Unified Search', expedia: 'green', hotels: 'green', vrbo: 'yellow' },
  { feature: 'Dynamic Pricing Engine', expedia: 'green', hotels: 'green', vrbo: 'green' },
  { feature: 'Loyalty Integration', expedia: 'green', hotels: 'yellow', vrbo: 'red' },
  { feature: 'Checkout Flow v3', expedia: 'green', hotels: 'green', vrbo: 'yellow' },
  { feature: 'mTLS Auth Gateway', expedia: 'green', hotels: 'green', vrbo: 'green' },
  { feature: 'Real-time Inventory', expedia: 'green', hotels: 'yellow', vrbo: 'yellow' },
  { feature: 'A/B Testing Framework', expedia: 'green', hotels: 'green', vrbo: 'green' },
  { feature: 'Push Notifications', expedia: 'green', hotels: 'green', vrbo: 'red' },
  { feature: 'Trip Planner', expedia: 'green', hotels: 'yellow', vrbo: 'yellow' },
  { feature: 'Review Aggregation', expedia: 'green', hotels: 'green', vrbo: 'green' },
  { feature: 'Payment Gateway v2', expedia: 'green', hotels: 'green', vrbo: 'yellow' },
  { feature: 'CDN Edge Caching', expedia: 'green', hotels: 'green', vrbo: 'green' },
  { feature: 'Fraud Detection ML', expedia: 'green', hotels: 'yellow', vrbo: 'red' },
  { feature: 'Guest Messaging', expedia: 'green', hotels: 'green', vrbo: 'yellow' },
  { feature: 'Property Management API', expedia: 'yellow', hotels: 'yellow', vrbo: 'green' },
];

const regions = ['us-east-1', 'us-west-2', 'eu-west-1', 'eu-central-1', 'ap-southeast-1', 'ap-northeast-1'];
const clusterPrefixes = ['prod', 'staging', 'edge', 'data', 'ml', 'batch'];

function generateClusters(): KubernetesCluster[] {
  const clusters: KubernetesCluster[] = [];
  const brands: Brand[] = ['unified', 'expedia', 'hotels', 'vrbo'];
  for (let i = 0; i < 512; i++) {
    const status: KubernetesCluster['status'] =
      i < 467 ? 'healthy' : i < 498 ? 'migrating' : 'degraded';
    clusters.push({
      id: `cluster-${String(i).padStart(4, '0')}`,
      name: `${clusterPrefixes[i % clusterPrefixes.length]}-${regions[i % regions.length]}-${String(i).padStart(3, '0')}`,
      region: regions[i % regions.length],
      status,
      nodes: Math.floor(Math.random() * 200) + 20,
      pods: Math.floor(Math.random() * 5000) + 500,
      cpuUtil: Math.floor(Math.random() * 40) + 30,
      memUtil: Math.floor(Math.random() * 35) + 40,
      brand: brands[i % brands.length],
    });
  }
  return clusters;
}

export const clusters = generateClusters();

const migrationPrograms = [
  'Auth Gateway Unification', 'Search Index Consolidation', 'Payment Processing v3',
  'Checkout Flow Merge', 'Inventory Service Rewrite', 'Pricing Engine Migration',
  'CDN Edge Rollout', 'mTLS Certificate Rotation', 'Database Sharding Phase 2',
  'GraphQL Federation', 'Event Streaming Kafka Migration', 'Container Runtime Upgrade',
  'Service Mesh Istio Rollout', 'Observability Stack Upgrade', 'CI/CD Pipeline Unification',
  'Feature Flag Consolidation', 'A/B Testing Framework v2', 'Mobile BFF Unification',
  'Loyalty Points Integration', 'Review System Merge', 'Notification Hub Migration',
  'Property Listing API v3', 'Guest Profile Unification', 'Trip Planning Consolidation',
  'Fraud Detection ML Upgrade', 'Rate Limiter Deployment', 'API Gateway v4 Rollout',
  'Logging Infrastructure Update', 'Secret Management Migration', 'DNS Failover Enhancement',
  'Load Balancer Optimization', 'Cache Layer Modernization', 'Image Processing Pipeline',
  'Video Transcoding Service', 'Email Template Unification', 'SMS Gateway Migration',
  'Push Notification Consolidation', 'Analytics Pipeline v2', 'Data Lake Migration',
  'ML Model Serving Platform', 'Kubernetes 1.29 Upgrade', 'Terraform State Migration',
  'Vault Secret Rotation', 'Prometheus Federation', 'Grafana Dashboard Consolidation',
  'PagerDuty Integration Update', 'Slack Bot Unification', 'JIRA Workflow Migration',
  'Backstage Plugin Migration', 'Documentation Portal Merge',
];

const owners = [
  'Platform Core', 'Search Team', 'Payments', 'Checkout', 'Inventory',
  'Pricing', 'Infrastructure', 'Security', 'DevOps', 'Data Engineering',
  'Mobile', 'Loyalty', 'Reviews', 'Notifications', 'Property Tech',
  'Guest Experience', 'Trip Planning', 'Fraud Prevention', 'API Platform', 'SRE',
];

function generateBigBoulders(): BigBoulder[] {
  const boulders: BigBoulder[] = [];
  const statuses: BigBoulder['status'][] = ['in-progress', 'planning', 'blocked', 'completed', 'at-risk'];
  const risks: BigBoulder['riskLevel'][] = ['low', 'medium', 'high', 'critical'];

  for (let i = 0; i < 50; i++) {
    const status = i < 5 ? 'completed' : statuses[i % statuses.length];
    const pct = status === 'completed' ? 100 : Math.floor(Math.random() * 85) + 5;
    boulders.push({
      id: `boulder-${String(i).padStart(3, '0')}`,
      programName: migrationPrograms[i],
      status,
      percentComplete: pct,
      riskLevel: risks[i % risks.length],
      owner: owners[i % owners.length],
      startDate: `2025-${String((i % 12) + 1).padStart(2, '0')}-01`,
      targetDate: `2026-${String((i % 12) + 1).padStart(2, '0')}-01`,
      servicesAffected: Math.floor(Math.random() * 500) + 20,
    });
  }
  return boulders;
}

export const bigBoulders = generateBigBoulders();

export const devinMetrics: DevinMetrics = {
  prsGenerated: 128392,
  engineeringHoursSaved: 482100,
  estimatedCostSaved: '$48.2M',
  vulnerabilitiesPatched: 14283,
  testsGenerated: 892471,
  codeReviewsCompleted: 67841,
};

const languages = ['TypeScript', 'Java', 'Go', 'Python', 'Kotlin', 'Rust', 'Scala'];
const teams = [
  'Search Platform', 'Checkout Core', 'Pricing Engine', 'Inventory Services',
  'Auth & Identity', 'Payment Processing', 'Guest Experience', 'Property Tech',
  'Mobile Platform', 'Data Pipeline', 'ML Platform', 'Infrastructure',
  'Loyalty Program', 'Reviews & Ratings', 'Notification Hub', 'Trip Planning',
  'Fraud Detection', 'API Gateway', 'DevOps Tooling', 'SRE Core',
];

function generateServices(): Service[] {
  const services: Service[] = [];
  const healthOptions: Service['health'][] = ['healthy', 'degraded', 'critical'];
  const consolOptions: Service['consolidationStatus'][] = ['unified', 'migrating', 'deprecated', 'legacy'];
  const brandOptions: Brand[] = ['expedia', 'hotels', 'vrbo'];
  const pipelineOptions: Service['pipelineStatus'][] = ['passing', 'failing', 'pending'];

  services.push({
    id: 'svc-0000',
    repoName: 'expedia-home-search',
    ownerTeam: 'Search Platform',
    language: 'TypeScript',
    health: 'healthy',
    consolidationStatus: 'unified',
    cluster: 'prod-us-east-1-001',
    brands: ['expedia', 'hotels', 'vrbo'],
    lastDeployed: '2 hours ago',
    pipelineStatus: 'passing',
  });

  const repoNames = [
    'pricing-engine-core', 'checkout-flow-service', 'inventory-aggregator', 'auth-gateway-v3',
    'payment-processor', 'guest-profile-service', 'property-listing-api', 'mobile-bff-layer',
    'data-pipeline-orchestrator', 'ml-recommendation-engine', 'loyalty-points-tracker',
    'review-aggregation-service', 'notification-dispatcher', 'trip-planner-backend',
    'fraud-detection-ml', 'api-gateway-proxy', 'devops-automation-tools', 'sre-incident-manager',
    'cdn-edge-worker', 'rate-limiter-service', 'search-indexer', 'booking-confirmation-svc',
    'cancellation-handler', 'refund-processor', 'currency-converter', 'geo-location-service',
    'image-resizer-lambda', 'video-transcoder', 'email-template-engine', 'sms-gateway-proxy',
    'push-notification-hub', 'analytics-collector', 'data-lake-ingester', 'model-serving-platform',
    'k8s-operator-custom', 'terraform-module-registry', 'vault-secret-sync', 'prometheus-adapter',
    'grafana-plugin-custom', 'pagerduty-integration', 'slack-bot-sentinel', 'jira-sync-agent',
    'backstage-plugin-gigs', 'docs-portal-builder', 'feature-flag-service', 'ab-test-framework',
    'session-management', 'websocket-gateway', 'graphql-federation-gw',
  ];

  for (let i = 0; i < repoNames.length; i++) {
    const brandCount = (i % 3) + 1;
    const serviceBrands = brandOptions.slice(0, brandCount);
    services.push({
      id: `svc-${String(i + 1).padStart(4, '0')}`,
      repoName: repoNames[i],
      ownerTeam: teams[i % teams.length],
      language: languages[i % languages.length],
      health: healthOptions[i % 15 === 14 ? 2 : i % 7 === 6 ? 1 : 0],
      consolidationStatus: consolOptions[i % 8 === 0 ? 3 : i % 5 === 0 ? 2 : i % 3 === 0 ? 1 : 0],
      cluster: `prod-${regions[i % regions.length]}-${String(i % 50).padStart(3, '0')}`,
      brands: serviceBrands as Brand[],
      lastDeployed: `${Math.floor(Math.random() * 24) + 1} hours ago`,
      pipelineStatus: pipelineOptions[i % 10 === 9 ? 1 : i % 8 === 7 ? 2 : 0],
    });
  }
  return services;
}

export const services = generateServices();

export const devinActivityFeed: DevinActivity[] = [
  { id: 'da-001', message: 'Generated 12 unit tests for PriceCalculator.ts', timestamp: '2 min ago', type: 'test' },
  { id: 'da-002', message: 'Patched mTLS vulnerability in Auth-Gig', timestamp: '8 min ago', type: 'security' },
  { id: 'da-003', message: 'Refactored CheckoutFlow for brand parity', timestamp: '14 min ago', type: 'refactor' },
  { id: 'da-004', message: 'Completed code review for search-indexer PR #4821', timestamp: '22 min ago', type: 'review' },
  { id: 'da-005', message: 'Migrated legacy Hotels.com auth tokens to unified format', timestamp: '31 min ago', type: 'migration' },
  { id: 'da-006', message: 'Generated integration tests for PaymentProcessor', timestamp: '45 min ago', type: 'test' },
  { id: 'da-007', message: 'Patched CVE-2026-1847 in dependency tree', timestamp: '1 hr ago', type: 'security' },
  { id: 'da-008', message: 'Refactored inventory-aggregator to support Vrbo listings', timestamp: '1.5 hrs ago', type: 'refactor' },
  { id: 'da-009', message: 'Auto-merged 47 dependency update PRs across fleet', timestamp: '2 hrs ago', type: 'review' },
  { id: 'da-010', message: 'Migrated 128 services to new logging format', timestamp: '3 hrs ago', type: 'migration' },
];

export const homeSearchDetail: ServiceDetail = {
  id: 'svc-0000',
  repoName: 'expedia-home-search',
  ownerTeam: 'Search Platform',
  language: 'TypeScript',
  health: 'healthy',
  consolidationStatus: 'unified',
  cluster: 'prod-us-east-1-001',
  brands: ['expedia', 'hotels', 'vrbo'],
  lastDeployed: '2 hours ago',
  pipelineStatus: 'passing',
  description: 'Core search service powering unified home page search across all Expedia Group brands. Handles 2.4M requests/min at peak.',
  brandFeatureUsage: [
    { brand: 'Expedia', features: ['Hotel Search', 'Flight Search', 'Package Deals', 'Car Rental'], usage: 94 },
    { brand: 'Hotels.com', features: ['Hotel Search', 'Rewards Integration', 'Price Match'], usage: 87 },
    { brand: 'Vrbo', features: ['Vacation Rental Search', 'Property Filtering', 'Map View'], usage: 78 },
  ],
  devinActivities: [
    { id: 'da-s1', message: 'Generated 12 unit tests for PriceCalculator.ts', timestamp: '2 min ago', type: 'test' },
    { id: 'da-s2', message: 'Patched mTLS vulnerability in Auth-Gig', timestamp: '8 min ago', type: 'security' },
    { id: 'da-s3', message: 'Refactored CheckoutFlow for brand parity', timestamp: '14 min ago', type: 'refactor' },
    { id: 'da-s4', message: 'Optimized search query parsing — 23% latency reduction', timestamp: '1 hr ago', type: 'refactor' },
    { id: 'da-s5', message: 'Added Vrbo property type filters to unified search', timestamp: '2 hrs ago', type: 'migration' },
    { id: 'da-s6', message: 'Generated snapshot tests for SearchResultCard component', timestamp: '3 hrs ago', type: 'test' },
    { id: 'da-s7', message: 'Reviewed and approved PR #2847 — brand parity fixes', timestamp: '4 hrs ago', type: 'review' },
    { id: 'da-s8', message: 'Patched XSS vulnerability in search suggestion renderer', timestamp: '5 hrs ago', type: 'security' },
  ],
  dependencies: ['pricing-engine-core', 'inventory-aggregator', 'auth-gateway-v3', 'geo-location-service', 'cdn-edge-worker'],
  metrics: {
    requestsPerSec: 41200,
    errorRate: 0.02,
    p99Latency: 142,
    uptime: 99.998,
  },
};

export const sentinelScopingStats = {
  totalGigs: 10284,
  queuedForAudit: 3847,
  auditedThisWeek: 412,
  passingAudit: 8921,
  failingAudit: 1363,
};
