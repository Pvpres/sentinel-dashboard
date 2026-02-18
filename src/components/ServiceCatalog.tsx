import { useState } from 'react';
import type { Brand } from '../types';
import { services } from '../data/mockData';

interface ServiceCatalogProps {
  brand: Brand;
  onServiceSelect: (repoName: string) => void;
}

const healthConfig = {
  healthy: { bg: 'bg-emerald-500/15', text: 'text-emerald-400', dot: 'bg-emerald-400' },
  degraded: { bg: 'bg-amber-500/15', text: 'text-amber-400', dot: 'bg-amber-400' },
  critical: { bg: 'bg-red-500/15', text: 'text-red-400', dot: 'bg-red-400' },
};

const consolidationConfig = {
  unified: { bg: 'bg-blue-500/15', text: 'text-blue-400' },
  migrating: { bg: 'bg-amber-500/15', text: 'text-amber-400' },
  deprecated: { bg: 'bg-red-500/15', text: 'text-red-400' },
  legacy: { bg: 'bg-slate-500/15', text: 'text-slate-400' },
};

const langColors: Record<string, string> = {
  TypeScript: 'text-blue-400',
  Java: 'text-orange-400',
  Go: 'text-cyan-400',
  Python: 'text-yellow-400',
  Kotlin: 'text-violet-400',
  Rust: 'text-orange-300',
  Scala: 'text-red-400',
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
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-white mb-1">Service Catalog — Gigs</h2>
        <p className="text-sm text-slate-400">{filtered.length} services {brand !== 'unified' ? `(filtered by ${brand})` : 'across all brands'}</p>
      </div>

      <input
        type="text"
        placeholder="Search by repo name, team, or language..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-[#12141f] border border-[#1e2235] rounded-md px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
      />

      <div className="space-y-2">
        {pinned && (
          <div
            onClick={() => onServiceSelect(pinned.repoName)}
            className="bg-[#12141f] border border-blue-500/30 rounded-lg p-4 cursor-pointer hover:border-blue-500/50 transition-all group"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded font-medium">PINNED</span>
              <span className="text-sm font-mono text-white group-hover:text-blue-400 transition-colors">{pinned.repoName}</span>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-xs text-slate-400">{pinned.ownerTeam}</span>
              <span className={`text-xs font-mono ${langColors[pinned.language] || 'text-slate-400'}`}>{pinned.language}</span>
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium ${healthConfig[pinned.health].bg} ${healthConfig[pinned.health].text}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${healthConfig[pinned.health].dot}`} />
                {pinned.health}
              </span>
              <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-medium ${consolidationConfig[pinned.consolidationStatus].bg} ${consolidationConfig[pinned.consolidationStatus].text}`}>
                {pinned.consolidationStatus}
              </span>
              <span className="text-[10px] text-slate-500">Deployed {pinned.lastDeployed}</span>
            </div>
          </div>
        )}

        {rest.slice(0, 40).map((svc) => (
          <div
            key={svc.id}
            onClick={() => onServiceSelect(svc.repoName)}
            className="bg-[#12141f] border border-[#1e2235] rounded-lg p-3 cursor-pointer hover:border-[#2a2d45] transition-all group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-sm font-mono text-slate-300 group-hover:text-white transition-colors truncate">{svc.repoName}</span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs text-slate-500 hidden lg:inline">{svc.ownerTeam}</span>
                <span className={`text-xs font-mono ${langColors[svc.language] || 'text-slate-400'}`}>{svc.language}</span>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium ${healthConfig[svc.health].bg} ${healthConfig[svc.health].text}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${healthConfig[svc.health].dot}`} />
                  {svc.health}
                </span>
                <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-medium ${consolidationConfig[svc.consolidationStatus].bg} ${consolidationConfig[svc.consolidationStatus].text}`}>
                  {svc.consolidationStatus}
                </span>
              </div>
            </div>
          </div>
        ))}

        {rest.length > 40 && (
          <div className="text-xs text-slate-500 text-center py-3">
            Showing 40 of {rest.length} services — use search to filter
          </div>
        )}
      </div>
    </div>
  );
}
