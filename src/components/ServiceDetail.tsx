import { homeSearchDetail } from '../data/mockData';
import type { ServiceDetail as ServiceDetailType } from '../types';

interface ServiceDetailProps {
  serviceName: string;
}

const typeConfig = {
  test: { bg: 'bg-blue-500/15', text: 'text-blue-400', label: 'Test' },
  security: { bg: 'bg-red-500/15', text: 'text-red-400', label: 'Security' },
  refactor: { bg: 'bg-violet-500/15', text: 'text-violet-400', label: 'Refactor' },
  review: { bg: 'bg-emerald-500/15', text: 'text-emerald-400', label: 'Review' },
  migration: { bg: 'bg-amber-500/15', text: 'text-amber-400', label: 'Migration' },
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
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white mb-1 font-mono">{detail.repoName}</h2>
          <p className="text-sm text-slate-400">{detail.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium bg-blue-500/15 text-blue-400 border border-blue-500/20">
            Fully Unified: Expedia / Vrbo / Hotels.com
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-[#12141f] border border-[#1e2235] rounded-lg p-4">
          <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">Requests/sec</div>
          <div className="text-2xl font-semibold text-white">{detail.metrics.requestsPerSec.toLocaleString()}</div>
        </div>
        <div className="bg-[#12141f] border border-[#1e2235] rounded-lg p-4">
          <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">Error Rate</div>
          <div className="text-2xl font-semibold text-emerald-400">{detail.metrics.errorRate}%</div>
        </div>
        <div className="bg-[#12141f] border border-[#1e2235] rounded-lg p-4">
          <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">P99 Latency</div>
          <div className="text-2xl font-semibold text-amber-400">{detail.metrics.p99Latency}ms</div>
        </div>
        <div className="bg-[#12141f] border border-[#1e2235] rounded-lg p-4">
          <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">Uptime</div>
          <div className="text-2xl font-semibold text-emerald-400">{detail.metrics.uptime}%</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-[#12141f] border border-[#1e2235] rounded-lg p-4">
            <h3 className="text-sm font-medium text-slate-300 mb-3">Service Health</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Status</span>
                <span className="inline-flex items-center gap-1 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {detail.health}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Pipeline</span>
                <span className={detail.pipelineStatus === 'passing' ? 'text-emerald-400' : 'text-red-400'}>{detail.pipelineStatus}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Last Deployed</span>
                <span className="text-slate-300">{detail.lastDeployed}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Language</span>
                <span className="text-blue-400 font-mono">{detail.language}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Owner</span>
                <span className="text-slate-300">{detail.ownerTeam}</span>
              </div>
            </div>
          </div>

          <div className="bg-[#12141f] border border-[#1e2235] rounded-lg p-4">
            <h3 className="text-sm font-medium text-slate-300 mb-3">Kubernetes Cluster</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Cluster</span>
                <span className="text-slate-300 font-mono">{detail.cluster}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Region</span>
                <span className="text-slate-300">us-east-1</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Replicas</span>
                <span className="text-slate-300">24</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">CPU Request</span>
                <span className="text-slate-300">4 cores</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Memory</span>
                <span className="text-slate-300">8Gi</span>
              </div>
            </div>
          </div>

          <div className="bg-[#12141f] border border-[#1e2235] rounded-lg p-4">
            <h3 className="text-sm font-medium text-slate-300 mb-3">Dependencies</h3>
            <div className="flex flex-wrap gap-1.5">
              {detail.dependencies.map((dep) => (
                <span key={dep} className="px-2 py-1 bg-[#1a1d2e] rounded text-xs text-slate-400 font-mono border border-[#2a2d45]">
                  {dep}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-[#12141f] border border-[#1e2235] rounded-lg p-4">
            <h3 className="text-sm font-medium text-slate-300 mb-3">Brand Feature Usage</h3>
            <div className="space-y-4">
              {detail.brandFeatureUsage.map((brand) => (
                <div key={brand.brand}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-300 font-medium">{brand.brand}</span>
                    <span className="text-slate-400">{brand.usage}% adoption</span>
                  </div>
                  <div className="h-1.5 bg-[#1a1d2e] rounded-full overflow-hidden mb-2">
                    <div
                      className={`h-full rounded-full ${brand.usage > 90 ? 'bg-emerald-500' : brand.usage > 80 ? 'bg-blue-500' : 'bg-amber-500'}`}
                      style={{ width: `${brand.usage}%` }}
                    />
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {brand.features.map((f) => (
                      <span key={f} className="px-1.5 py-0.5 bg-[#1a1d2e] rounded text-[10px] text-slate-500">{f}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#12141f] border border-[#1e2235] rounded-lg p-4">
            <h3 className="text-sm font-medium text-slate-300 mb-3">Devin Activity Feed</h3>
            <div className="space-y-2">
              {detail.devinActivities.map((activity) => {
                const cfg = typeConfig[activity.type];
                return (
                  <div key={activity.id} className="flex items-start gap-2 py-2 border-b border-[#1e2235]/50 last:border-0">
                    <span className={`mt-0.5 shrink-0 inline-flex px-1.5 py-0.5 rounded text-[9px] font-medium ${cfg.bg} ${cfg.text}`}>
                      {cfg.label}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-300 leading-relaxed">{activity.message}</p>
                      <span className="text-[10px] text-slate-500">{activity.timestamp}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
