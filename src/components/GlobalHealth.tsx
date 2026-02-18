import type { Brand } from '../types';
import { doraMetrics, fleetStats } from '../data/mockData';

interface GlobalHealthProps {
  brand: Brand;
}

function MetricCard({ label, value, trend, color }: { label: string; value: string | number; trend?: string; color?: string }) {
  return (
    <div className="bg-[#12141f] border border-[#1e2235] rounded-lg p-4">
      <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">{label}</div>
      <div className={`text-2xl font-semibold ${color || 'text-white'}`}>{typeof value === 'number' ? value.toLocaleString() : value}</div>
      {trend && <div className="text-xs text-emerald-400 mt-1">{trend}</div>}
    </div>
  );
}

export default function GlobalHealth({ brand }: GlobalHealthProps) {
  const dora = doraMetrics[brand];
  const stats = fleetStats[brand];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-white mb-1">Global Health Overview</h2>
        <p className="text-sm text-slate-400">Real-time fleet health across {stats.totalServices.toLocaleString()} services</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <MetricCard label="Total Services" value={stats.totalServices} trend="↑ 142 this week" />
        <MetricCard label="Healthy" value={stats.healthyServices} color="text-emerald-400" />
        <MetricCard label="Degraded" value={stats.degradedServices} color="text-amber-400" />
        <MetricCard label="Critical" value={stats.criticalServices} color="text-red-400" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <MetricCard label="Clusters" value={stats.totalClusters} />
        <MetricCard label="Active Deployments" value={stats.activeDeployments} trend="Last 24h" />
        <MetricCard label="Active Incidents" value={stats.incidents} color={stats.incidents > 2 ? 'text-amber-400' : 'text-emerald-400'} />
        <MetricCard label="Fleet Uptime" value="99.97%" color="text-emerald-400" />
      </div>

      <div>
        <h3 className="text-sm font-medium text-slate-300 mb-3">DORA Metrics</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-[#12141f] border border-[#1e2235] rounded-lg p-4">
            <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">Deployment Frequency</div>
            <div className="text-xl font-semibold text-blue-400">{dora.deploymentFrequency}</div>
            <div className="mt-2 h-1.5 bg-[#1a1d2e] rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: '82%' }} />
            </div>
            <div className="text-[10px] text-slate-500 mt-1">Elite threshold: 500+/day</div>
          </div>
          <div className="bg-[#12141f] border border-[#1e2235] rounded-lg p-4">
            <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">Mean Time to Recovery</div>
            <div className="text-xl font-semibold text-emerald-400">{dora.mttr}</div>
            <div className="mt-2 h-1.5 bg-[#1a1d2e] rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '91%' }} />
            </div>
            <div className="text-[10px] text-slate-500 mt-1">Elite threshold: &lt;15 min</div>
          </div>
          <div className="bg-[#12141f] border border-[#1e2235] rounded-lg p-4">
            <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">Change Failure Rate</div>
            <div className="text-xl font-semibold text-amber-400">{dora.changeFailureRate}</div>
            <div className="mt-2 h-1.5 bg-[#1a1d2e] rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: '78%' }} />
            </div>
            <div className="text-[10px] text-slate-500 mt-1">Elite threshold: &lt;5%</div>
          </div>
          <div className="bg-[#12141f] border border-[#1e2235] rounded-lg p-4">
            <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">Lead Time for Changes</div>
            <div className="text-xl font-semibold text-violet-400">{dora.leadTime}</div>
            <div className="mt-2 h-1.5 bg-[#1a1d2e] rounded-full overflow-hidden">
              <div className="h-full bg-violet-500 rounded-full" style={{ width: '85%' }} />
            </div>
            <div className="text-[10px] text-slate-500 mt-1">Elite threshold: &lt;1 day</div>
          </div>
        </div>
      </div>

      <div className="bg-[#12141f] border border-[#1e2235] rounded-lg p-4">
        <h3 className="text-sm font-medium text-slate-300 mb-3">Deployment Activity (Last 7 Days)</h3>
        <div className="flex items-end gap-1 h-24">
          {[72, 85, 64, 91, 78, 95, 88].map((val, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-sm opacity-80 hover:opacity-100 transition-opacity"
                style={{ height: `${val}%` }}
              />
              <span className="text-[9px] text-slate-500">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
