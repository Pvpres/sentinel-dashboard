import { useState } from 'react';
import type { Brand } from '../types';
import { clusters } from '../data/mockData';
import Card from './Card';

interface ClusterManagerProps {
  brand: Brand;
}

const statusConfig = {
  healthy: { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  degraded: { bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500' },
  migrating: { bg: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-500' },
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
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-expedia-blue mb-1">Cluster Manager</h2>
        <p className="text-sm text-expedia-muted">Kubernetes fleet status across {clusters.filter((c) => brand === 'unified' || c.brand === brand).length} clusters</p>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <Card className="col-span-4 p-4 text-center">
          <div className="text-3xl font-bold text-emerald-600 tabular-nums">{healthyCount}</div>
          <div className="text-xs text-expedia-muted mt-1">Healthy</div>
        </Card>
        <Card className="col-span-4 p-4 text-center">
          <div className="text-3xl font-bold text-amber-600 tabular-nums">{migratingCount}</div>
          <div className="text-xs text-expedia-muted mt-1">Migrating</div>
        </Card>
        <Card className="col-span-4 p-4 text-center">
          <div className="text-3xl font-bold text-red-600 tabular-nums">{degradedCount}</div>
          <div className="text-xs text-expedia-muted mt-1">Degraded</div>
        </Card>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Search clusters..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-expedia-card border border-expedia-border rounded-md px-3 py-2 text-sm text-expedia-text placeholder-expedia-muted focus:outline-none focus:border-expedia-accent"
        />
        <div className="flex gap-1">
          {(['all', 'healthy', 'degraded', 'migrating'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-md text-xs capitalize transition-colors ${
                filter === f ? 'bg-expedia-blue text-white' : 'bg-expedia-card border border-expedia-border text-expedia-muted hover:text-expedia-blue'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-expedia-border bg-expedia-light">
                <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-expedia-muted font-medium">Cluster</th>
                <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-expedia-muted font-medium">Region</th>
                <th className="text-center px-4 py-3 text-[10px] uppercase tracking-wider text-expedia-muted font-medium">Status</th>
                <th className="text-right px-4 py-3 text-[10px] uppercase tracking-wider text-expedia-muted font-medium">Nodes</th>
                <th className="text-right px-4 py-3 text-[10px] uppercase tracking-wider text-expedia-muted font-medium">Pods</th>
                <th className="text-right px-4 py-3 text-[10px] uppercase tracking-wider text-expedia-muted font-medium">CPU %</th>
                <th className="text-right px-4 py-3 text-[10px] uppercase tracking-wider text-expedia-muted font-medium">Mem %</th>
              </tr>
            </thead>
            <tbody>
              {displayed.map((cluster) => {
                const cfg = statusConfig[cluster.status];
                return (
                  <tr key={cluster.id} className="border-b border-expedia-border last:border-0 hover:bg-expedia-light/50 transition-colors even:bg-expedia-bg/50">
                    <td className="px-4 py-2 text-sm text-expedia-text font-mono">{cluster.name}</td>
                    <td className="px-4 py-2 text-sm text-expedia-muted">{cluster.region}</td>
                    <td className="px-4 py-2 text-center">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium ${cfg.bg} ${cfg.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                        {cluster.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-sm text-expedia-text text-right tabular-nums">{cluster.nodes}</td>
                    <td className="px-4 py-2 text-sm text-expedia-text text-right tabular-nums">{cluster.pods.toLocaleString()}</td>
                    <td className="px-4 py-2 text-right">
                      <span className={`text-sm tabular-nums ${cluster.cpuUtil > 60 ? 'text-amber-600' : 'text-expedia-text'}`}>{cluster.cpuUtil}%</span>
                    </td>
                    <td className="px-4 py-2 text-right">
                      <span className={`text-sm tabular-nums ${cluster.memUtil > 70 ? 'text-amber-600' : 'text-expedia-text'}`}>{cluster.memUtil}%</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length > 50 && (
          <div className="px-4 py-2 text-xs text-expedia-muted border-t border-expedia-border">
            Showing 50 of {filtered.length} clusters
          </div>
        )}
      </Card>
    </div>
  );
}
