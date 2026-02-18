import { useState } from 'react';
import type { Brand } from '../types';
import { clusters } from '../data/mockData';

interface ClusterManagerProps {
  brand: Brand;
}

const statusConfig = {
  healthy: { bg: 'bg-emerald-500/15', text: 'text-emerald-400', dot: 'bg-emerald-400' },
  degraded: { bg: 'bg-red-500/15', text: 'text-red-400', dot: 'bg-red-400' },
  migrating: { bg: 'bg-amber-500/15', text: 'text-amber-400', dot: 'bg-amber-400' },
};

export default function ClusterManager({ brand }: ClusterManagerProps) {
  const [filter, setFilter] = useState<'all' | 'healthy' | 'degraded' | 'migrating'>('all');
  const [search, setSearch] = useState('');

  const filtered = clusters
    .filter((c) => brand === 'unified' || c.brand === brand)
    .filter((c) => filter === 'all' || c.status === filter)
    .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  const displayed = filtered.slice(0, 50);

  const healthyCount = clusters.filter((c) => brand === 'unified' || c.brand === brand).filter((c) => c.status === 'healthy').length;
  const degradedCount = clusters.filter((c) => brand === 'unified' || c.brand === brand).filter((c) => c.status === 'degraded').length;
  const migratingCount = clusters.filter((c) => brand === 'unified' || c.brand === brand).filter((c) => c.status === 'migrating').length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-white mb-1">Cluster Manager</h2>
        <p className="text-sm text-slate-400">Kubernetes fleet status across {clusters.filter((c) => brand === 'unified' || c.brand === brand).length} clusters</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-[#12141f] border border-[#1e2235] rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-emerald-400">{healthyCount}</div>
          <div className="text-xs text-slate-400 mt-1">Healthy</div>
        </div>
        <div className="bg-[#12141f] border border-[#1e2235] rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-amber-400">{migratingCount}</div>
          <div className="text-xs text-slate-400 mt-1">Migrating</div>
        </div>
        <div className="bg-[#12141f] border border-[#1e2235] rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-red-400">{degradedCount}</div>
          <div className="text-xs text-slate-400 mt-1">Degraded</div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Search clusters..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-[#12141f] border border-[#1e2235] rounded-md px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
        />
        <div className="flex gap-1">
          {(['all', 'healthy', 'degraded', 'migrating'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-md text-xs capitalize transition-colors ${
                filter === f ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'bg-[#12141f] border border-[#1e2235] text-slate-400 hover:text-slate-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[#12141f] border border-[#1e2235] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1e2235]">
                <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-medium">Cluster</th>
                <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-medium">Region</th>
                <th className="text-center px-4 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-medium">Status</th>
                <th className="text-right px-4 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-medium">Nodes</th>
                <th className="text-right px-4 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-medium">Pods</th>
                <th className="text-right px-4 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-medium">CPU %</th>
                <th className="text-right px-4 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-medium">Mem %</th>
              </tr>
            </thead>
            <tbody>
              {displayed.map((cluster) => {
                const cfg = statusConfig[cluster.status];
                return (
                  <tr key={cluster.id} className="border-b border-[#1e2235]/50 hover:bg-[#1a1d2e]/50 transition-colors">
                    <td className="px-4 py-2 text-sm text-slate-300 font-mono">{cluster.name}</td>
                    <td className="px-4 py-2 text-sm text-slate-400">{cluster.region}</td>
                    <td className="px-4 py-2 text-center">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium ${cfg.bg} ${cfg.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                        {cluster.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-sm text-slate-300 text-right">{cluster.nodes}</td>
                    <td className="px-4 py-2 text-sm text-slate-300 text-right">{cluster.pods.toLocaleString()}</td>
                    <td className="px-4 py-2 text-right">
                      <span className={`text-sm ${cluster.cpuUtil > 60 ? 'text-amber-400' : 'text-slate-300'}`}>{cluster.cpuUtil}%</span>
                    </td>
                    <td className="px-4 py-2 text-right">
                      <span className={`text-sm ${cluster.memUtil > 70 ? 'text-amber-400' : 'text-slate-300'}`}>{cluster.memUtil}%</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length > 50 && (
          <div className="px-4 py-2 text-xs text-slate-500 border-t border-[#1e2235]">
            Showing 50 of {filtered.length} clusters
          </div>
        )}
      </div>
    </div>
  );
}
