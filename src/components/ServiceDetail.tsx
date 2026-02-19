import { homeSearchDetail } from '../data/mockData';
import type { ServiceDetail as ServiceDetailType } from '../types';
import Card from './Card';

interface ServiceDetailProps {
  serviceName: string;
}

const typeConfig = {
  test: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Test' },
  security: { bg: 'bg-red-100', text: 'text-red-700', label: 'Security' },
  refactor: { bg: 'bg-violet-100', text: 'text-violet-700', label: 'Refactor' },
  review: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Review' },
  migration: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Migration' },
};

function generateMockDetail(name: string): ServiceDetailType {
  return {
    ...homeSearchDetail,
    repoName: name,
    description: `Service ${name} — part of the unified Expedia Group platform.`,
  };
}

export default function ServiceDetail({ serviceName }: ServiceDetailProps) {
  const detail = serviceName === 'expedia-home-search' ? homeSearchDetail : generateMockDetail(serviceName);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-expedia-blue mb-1 font-mono">{detail.repoName}</h2>
          <p className="text-sm text-expedia-muted">{detail.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200">
            Fully Unified: Expedia / Vrbo / Hotels.com
          </span>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <Card className="col-span-3 p-4">
          <div className="text-[10px] uppercase tracking-wider text-expedia-muted mb-1">Requests/sec</div>
          <div className="text-2xl font-semibold text-expedia-blue tabular-nums">{detail.metrics.requestsPerSec.toLocaleString()}</div>
        </Card>
        <Card className="col-span-3 p-4">
          <div className="text-[10px] uppercase tracking-wider text-expedia-muted mb-1">Error Rate</div>
          <div className="text-2xl font-semibold text-emerald-600 tabular-nums">{detail.metrics.errorRate}%</div>
        </Card>
        <Card className="col-span-3 p-4">
          <div className="text-[10px] uppercase tracking-wider text-expedia-muted mb-1">P99 Latency</div>
          <div className="text-2xl font-semibold text-amber-600 tabular-nums">{detail.metrics.p99Latency}ms</div>
        </Card>
        <Card className="col-span-3 p-4">
          <div className="text-[10px] uppercase tracking-wider text-expedia-muted mb-1">Uptime</div>
          <div className="text-2xl font-semibold text-emerald-600 tabular-nums">{detail.metrics.uptime}%</div>
        </Card>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-5 space-y-4">
          <Card className="p-4">
            <h3 className="text-sm font-medium text-expedia-blue mb-3">Service Health</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-expedia-muted">Status</span>
                <span className="inline-flex items-center gap-1 text-emerald-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {detail.health}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-expedia-muted">Pipeline</span>
                <span className={detail.pipelineStatus === 'passing' ? 'text-emerald-600' : 'text-red-600'}>{detail.pipelineStatus}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-expedia-muted">Last Deployed</span>
                <span className="text-expedia-text">{detail.lastDeployed}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-expedia-muted">Language</span>
                <span className="text-blue-600 font-mono">{detail.language}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-expedia-muted">Owner</span>
                <span className="text-expedia-text">{detail.ownerTeam}</span>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="text-sm font-medium text-expedia-blue mb-3">Kubernetes Cluster</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-expedia-muted">Cluster</span>
                <span className="text-expedia-text font-mono">{detail.cluster}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-expedia-muted">Region</span>
                <span className="text-expedia-text">us-east-1</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-expedia-muted">Replicas</span>
                <span className="text-expedia-text tabular-nums">24</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-expedia-muted">CPU Request</span>
                <span className="text-expedia-text">4 cores</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-expedia-muted">Memory</span>
                <span className="text-expedia-text">8Gi</span>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="text-sm font-medium text-expedia-blue mb-3">Dependencies</h3>
            <div className="flex flex-wrap gap-1.5">
              {detail.dependencies.map((dep) => (
                <span key={dep} className="px-2 py-1 bg-expedia-light rounded text-xs text-expedia-muted font-mono border border-expedia-border">
                  {dep}
                </span>
              ))}
            </div>
          </Card>
        </div>

        <div className="col-span-7 space-y-4">
          <Card className="p-4">
            <h3 className="text-sm font-medium text-expedia-blue mb-3">Brand Feature Usage</h3>
            <div className="space-y-4">
              {detail.brandFeatureUsage.map((brand) => (
                <div key={brand.brand}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-expedia-text font-medium">{brand.brand}</span>
                    <span className="text-expedia-muted tabular-nums">{brand.usage}% adoption</span>
                  </div>
                  <div className="h-1.5 bg-expedia-light rounded-full overflow-hidden mb-2">
                    <div
                      className={`h-full rounded-full ${brand.usage > 90 ? 'bg-emerald-500' : brand.usage > 80 ? 'bg-blue-500' : 'bg-amber-500'}`}
                      style={{ width: `${brand.usage}%` }}
                    />
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {brand.features.map((f) => (
                      <span key={f} className="px-1.5 py-0.5 bg-expedia-light rounded text-[10px] text-expedia-muted">{f}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="text-sm font-medium text-expedia-blue mb-3">Devin Activity Feed</h3>
            <div className="space-y-2">
              {detail.devinActivities.map((activity) => {
                const cfg = typeConfig[activity.type];
                return (
                  <div key={activity.id} className="flex items-start gap-2 py-2 border-b border-expedia-border last:border-0">
                    <span className={`mt-0.5 shrink-0 inline-flex px-1.5 py-0.5 rounded text-[9px] font-medium ${cfg.bg} ${cfg.text}`}>
                      {cfg.label}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-expedia-text leading-relaxed">{activity.message}</p>
                      <span className="text-[10px] text-expedia-muted">{activity.timestamp}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
