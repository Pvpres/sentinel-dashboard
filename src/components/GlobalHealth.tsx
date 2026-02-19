import type { Brand } from '../types';
import { doraMetrics, fleetStats, devinActivityFeed } from '../data/mockData';
import Card from './Card';
import PageHeader from './TopNav';

interface GlobalHealthProps {
  brand: Brand;
  onBrandChange: (brand: Brand) => void;
}

const brandLabels: Record<Brand, string> = {
  unified: 'Unified View',
  expedia: 'Expedia',
  hotels: 'Hotels.com',
  vrbo: 'Vrbo',
};

const typeConfig: Record<string, { bg: string; text: string }> = {
  test: { bg: 'bg-blue-100', text: 'text-blue-700' },
  security: { bg: 'bg-red-100', text: 'text-red-700' },
  refactor: { bg: 'bg-violet-100', text: 'text-violet-700' },
  review: { bg: 'bg-emerald-100', text: 'text-emerald-700' },
  migration: { bg: 'bg-amber-100', text: 'text-amber-700' },
};

export default function GlobalHealth({ brand, onBrandChange }: GlobalHealthProps) {
  const dora = doraMetrics[brand];
  const stats = fleetStats[brand];

  return (
    <div>
      <PageHeader title="Sentinel — Global Health" subtitle={`Real-time fleet health across ${stats.totalServices.toLocaleString()} services`}>
        <select
          value={brand}
          onChange={(e) => onBrandChange(e.target.value as Brand)}
          className="bg-white/10 border border-white/20 rounded-md px-3 py-1.5 text-sm text-white focus:outline-none cursor-pointer"
        >
          {(Object.keys(brandLabels) as Brand[]).map((b) => (
            <option key={b} value={b} className="text-expedia-blue">{brandLabels[b]}</option>
          ))}
        </select>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-white/70">All Systems Nominal</span>
        </div>
      </PageHeader>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="text-[10px] uppercase tracking-wider text-expedia-muted mb-1">Total Services</div>
            <div className="text-2xl font-semibold text-expedia-blue tabular-nums">{stats.totalServices.toLocaleString()}</div>
            <div className="text-xs text-emerald-600 mt-1">↑ 142 this week</div>
          </Card>
          <Card className="p-4">
            <div className="text-[10px] uppercase tracking-wider text-expedia-muted mb-1">Healthy</div>
            <div className="text-2xl font-semibold text-emerald-600 tabular-nums">{stats.healthyServices.toLocaleString()}</div>
          </Card>
          <Card className="p-4">
            <div className="text-[10px] uppercase tracking-wider text-expedia-muted mb-1">Degraded</div>
            <div className="text-2xl font-semibold text-amber-600 tabular-nums">{stats.degradedServices.toLocaleString()}</div>
          </Card>
          <Card className="p-4">
            <div className="text-[10px] uppercase tracking-wider text-expedia-muted mb-1">Critical</div>
            <div className="text-2xl font-semibold text-red-600 tabular-nums">{stats.criticalServices.toLocaleString()}</div>
          </Card>
        </div>

        <div>
          <h3 className="text-sm font-medium text-expedia-text mb-3">DORA Metrics</h3>
          <div className="grid grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="text-[10px] uppercase tracking-wider text-expedia-muted mb-1">Deployment Frequency</div>
              <div className="text-xl font-semibold text-blue-600">{dora.deploymentFrequency}</div>
              <div className="mt-2 h-1.5 bg-expedia-light rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '82%' }} />
              </div>
              <div className="text-[10px] text-expedia-muted mt-1">Elite threshold: 500+/day</div>
            </Card>
            <Card className="p-4">
              <div className="text-[10px] uppercase tracking-wider text-expedia-muted mb-1">Mean Time to Recovery</div>
              <div className="text-xl font-semibold text-emerald-600">{dora.mttr}</div>
              <div className="mt-2 h-1.5 bg-expedia-light rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '91%' }} />
              </div>
              <div className="text-[10px] text-expedia-muted mt-1">Elite threshold: &lt;15 min</div>
            </Card>
            <Card className="p-4">
              <div className="text-[10px] uppercase tracking-wider text-expedia-muted mb-1">Change Failure Rate</div>
              <div className="text-xl font-semibold text-amber-600">{dora.changeFailureRate}</div>
              <div className="mt-2 h-1.5 bg-expedia-light rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '78%' }} />
              </div>
              <div className="text-[10px] text-expedia-muted mt-1">Elite threshold: &lt;5%</div>
            </Card>
            <Card className="p-4">
              <div className="text-[10px] uppercase tracking-wider text-expedia-muted mb-1">Lead Time for Changes</div>
              <div className="text-xl font-semibold text-violet-600">{dora.leadTime}</div>
              <div className="mt-2 h-1.5 bg-expedia-light rounded-full overflow-hidden">
                <div className="h-full bg-violet-500 rounded-full" style={{ width: '85%' }} />
              </div>
              <div className="text-[10px] text-expedia-muted mt-1">Elite threshold: &lt;1 day</div>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <Card className="col-span-7 p-4">
            <h3 className="text-sm font-medium text-expedia-text mb-3">Deployment Activity (Last 7 Days)</h3>
            <div className="flex items-end gap-1 h-24">
              {[72, 85, 64, 91, 78, 95, 88].map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full bg-gradient-to-t from-expedia-blue to-blue-500 rounded-sm opacity-80 hover:opacity-100 transition-opacity"
                    style={{ height: `${val}%` }}
                  />
                  <span className="text-[9px] text-expedia-muted">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-4 gap-3 pt-3 border-t border-expedia-border">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-expedia-muted">Clusters</div>
                <div className="text-lg font-semibold text-expedia-blue tabular-nums">{stats.totalClusters}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-expedia-muted">Deployments</div>
                <div className="text-lg font-semibold text-expedia-blue tabular-nums">{stats.activeDeployments}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-expedia-muted">Incidents</div>
                <div className={`text-lg font-semibold tabular-nums ${stats.incidents > 2 ? 'text-amber-600' : 'text-emerald-600'}`}>{stats.incidents}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-expedia-muted">Uptime</div>
                <div className="text-lg font-semibold text-emerald-600">99.97%</div>
              </div>
            </div>
          </Card>

          <Card className="col-span-5 p-4">
            <h3 className="text-sm font-medium text-expedia-text mb-3">Recent Devin Activity</h3>
            <div className="space-y-2">
              {devinActivityFeed.slice(0, 7).map((activity) => {
                const cfg = typeConfig[activity.type];
                return (
                  <div key={activity.id} className="flex items-start gap-2 py-1.5 border-b border-expedia-border last:border-0">
                    <span className={`mt-0.5 shrink-0 inline-flex px-1.5 py-0.5 rounded text-[9px] font-medium ${cfg.bg} ${cfg.text}`}>
                      {activity.type}
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
