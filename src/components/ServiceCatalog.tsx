import { useState } from 'react';
import type { Brand } from '../types';
import { services } from '../data/mockData';
import Card from './Card';

interface ServiceCatalogProps {
  brand: Brand;
  onServiceSelect: (repoName: string) => void;
}

const healthConfig = {
  healthy: { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  degraded: { bg: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-500' },
  critical: { bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500' },
};

const consolidationConfig = {
  unified: { bg: 'bg-blue-100', text: 'text-blue-700' },
  migrating: { bg: 'bg-amber-100', text: 'text-amber-700' },
  deprecated: { bg: 'bg-red-100', text: 'text-red-700' },
  legacy: { bg: 'bg-slate-100', text: 'text-slate-700' },
};

const langColors: Record<string, string> = {
  TypeScript: 'text-blue-600',
  Java: 'text-orange-600',
  Go: 'text-cyan-600',
  Python: 'text-yellow-600',
  Kotlin: 'text-violet-600',
  Rust: 'text-orange-500',
  Scala: 'text-red-600',
};

export default function ServiceCatalog({ brand, onServiceSelect }: ServiceCatalogProps) {
  const [search, setSearch] = useState('');

  const filtered = services
    .filter((s) => brand === 'unified' || s.brands.includes(brand))
    .filter((s) =>
      s.repoName.toLowerCase().includes(search.toLowerCase()) ||
      s.ownerTeam.toLowerCase().includes(search.toLowerCase()) ||
      s.language.toLowerCase().includes(search.toLowerCase())
    );

  const pinned = filtered.find((s) => s.repoName === 'expedia-home-search');
  const rest = filtered.filter((s) => s.repoName !== 'expedia-home-search');

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-expedia-blue mb-1">Service Catalog — Gigs</h2>
        <p className="text-sm text-expedia-muted">{filtered.length} services {brand !== 'unified' ? `(filtered by ${brand})` : 'across all brands'}</p>
      </div>

      <input
        type="text"
        placeholder="Search by repo name, team, or language..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-expedia-card border border-expedia-border rounded-md px-4 py-2.5 text-sm text-expedia-text placeholder-expedia-muted focus:outline-none focus:border-expedia-accent"
      />

      <div className="space-y-2">
        {pinned && (
          <Card
            className="p-4 cursor-pointer border-expedia-accent/50 hover:border-expedia-accent transition-all group"
          >
            <div onClick={() => onServiceSelect(pinned.repoName)}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] bg-expedia-accent/20 text-amber-700 px-1.5 py-0.5 rounded font-medium">PINNED</span>
                <span className="text-sm font-mono text-expedia-blue group-hover:text-expedia-accent transition-colors">{pinned.repoName}</span>
              </div>
              <div className="flex items-center gap-4 flex-wrap">
                <span className="text-xs text-expedia-muted">{pinned.ownerTeam}</span>
                <span className={`text-xs font-mono ${langColors[pinned.language] || 'text-expedia-muted'}`}>{pinned.language}</span>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium ${healthConfig[pinned.health].bg} ${healthConfig[pinned.health].text}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${healthConfig[pinned.health].dot}`} />
                  {pinned.health}
                </span>
                <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-medium ${consolidationConfig[pinned.consolidationStatus].bg} ${consolidationConfig[pinned.consolidationStatus].text}`}>
                  {pinned.consolidationStatus}
                </span>
                <span className="text-[10px] text-expedia-muted">Deployed {pinned.lastDeployed}</span>
              </div>
            </div>
          </Card>
        )}

        {rest.slice(0, 40).map((svc) => (
          <Card
            key={svc.id}
            className="p-3 cursor-pointer hover:border-expedia-accent/50 transition-all group"
          >
            <div onClick={() => onServiceSelect(svc.repoName)} className="flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-sm font-mono text-expedia-text group-hover:text-expedia-blue transition-colors truncate">{svc.repoName}</span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs text-expedia-muted hidden lg:inline">{svc.ownerTeam}</span>
                <span className={`text-xs font-mono ${langColors[svc.language] || 'text-expedia-muted'}`}>{svc.language}</span>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium ${healthConfig[svc.health].bg} ${healthConfig[svc.health].text}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${healthConfig[svc.health].dot}`} />
                  {svc.health}
                </span>
                <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-medium ${consolidationConfig[svc.consolidationStatus].bg} ${consolidationConfig[svc.consolidationStatus].text}`}>
                  {svc.consolidationStatus}
                </span>
              </div>
            </div>
          </Card>
        ))}

        {rest.length > 40 && (
          <div className="text-xs text-expedia-muted text-center py-3">
            Showing 40 of {rest.length} services — use search to filter
          </div>
        )}
      </div>
    </div>
  );
}
