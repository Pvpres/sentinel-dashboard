import { useState } from 'react';
import type { Brand } from '../types';
import { services } from '../data/mockData';
import Card from './Card';
import PageHeader from './TopNav';

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
    <div>
      <PageHeader title="Service Catalog — Gigs" subtitle={`${filtered.length} services ${brand !== 'unified' ? `(filtered by ${brand})` : 'across all brands'}`} />

      <div className="p-6 space-y-4">
        <input
          type="text"
          placeholder="Search by repo name, team, or language..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-expedia-card border border-expedia-border rounded-md px-4 py-2.5 text-sm text-expedia-text placeholder-expedia-muted focus:outline-none focus:border-expedia-accent"
        />

        <Card className="overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-expedia-border bg-expedia-light">
                <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-expedia-muted font-medium">Name</th>
                <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-expedia-muted font-medium">Owner</th>
                <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-expedia-muted font-medium">Language</th>
                <th className="text-center px-4 py-3 text-[10px] uppercase tracking-wider text-expedia-muted font-medium">Health</th>
                <th className="text-center px-4 py-3 text-[10px] uppercase tracking-wider text-expedia-muted font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {pinned && (
                <tr
                  onClick={() => onServiceSelect(pinned.repoName)}
                  className="border-b border-expedia-border bg-expedia-accent/5 hover:bg-expedia-accent/10 cursor-pointer transition-colors"
                >
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] bg-expedia-accent/20 text-amber-700 px-1 py-0.5 rounded font-medium">PIN</span>
                      <span className="text-sm font-mono text-expedia-blue">{pinned.repoName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-sm text-expedia-muted">{pinned.ownerTeam}</td>
                  <td className="px-4 py-2.5"><span className={`text-sm font-mono ${langColors[pinned.language] || 'text-expedia-muted'}`}>{pinned.language}</span></td>
                  <td className="px-4 py-2.5 text-center">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium ${healthConfig[pinned.health].bg} ${healthConfig[pinned.health].text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${healthConfig[pinned.health].dot}`} />
                      {pinned.health}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-center">
                    <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-medium ${consolidationConfig[pinned.consolidationStatus].bg} ${consolidationConfig[pinned.consolidationStatus].text}`}>
                      {pinned.consolidationStatus}
                    </span>
                  </td>
                </tr>
              )}
              {rest.slice(0, 40).map((svc) => (
                <tr
                  key={svc.id}
                  onClick={() => onServiceSelect(svc.repoName)}
                  className="border-b border-expedia-border last:border-0 hover:bg-expedia-light/50 cursor-pointer transition-colors even:bg-expedia-bg/50"
                >
                  <td className="px-4 py-2.5 text-sm font-mono text-expedia-text">{svc.repoName}</td>
                  <td className="px-4 py-2.5 text-sm text-expedia-muted">{svc.ownerTeam}</td>
                  <td className="px-4 py-2.5"><span className={`text-sm font-mono ${langColors[svc.language] || 'text-expedia-muted'}`}>{svc.language}</span></td>
                  <td className="px-4 py-2.5 text-center">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium ${healthConfig[svc.health].bg} ${healthConfig[svc.health].text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${healthConfig[svc.health].dot}`} />
                      {svc.health}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-center">
                    <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-medium ${consolidationConfig[svc.consolidationStatus].bg} ${consolidationConfig[svc.consolidationStatus].text}`}>
                      {svc.consolidationStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {rest.length > 40 && (
            <div className="px-4 py-2 text-xs text-expedia-muted border-t border-expedia-border">
              Showing 40 of {rest.length} services — use search to filter
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
