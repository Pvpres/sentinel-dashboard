import { useState } from 'react';
import { services, sentinelScopingStats } from '../data/mockData';

export default function SentinelScoping() {
  const [search, setSearch] = useState('');
  const [selectedGigs, setSelectedGigs] = useState<string[]>([]);

  const filteredServices = services.filter((s) =>
    s.repoName.toLowerCase().includes(search.toLowerCase())
  );

  const toggleGig = (id: string) => {
    setSelectedGigs((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-white mb-1">Sentinel Scoping</h2>
        <p className="text-sm text-slate-400">Configure Devin audit scope across the service fleet</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="bg-[#12141f] border border-[#1e2235] rounded-lg p-4 text-center">
          <div className="text-2xl font-semibold text-white">{sentinelScopingStats.totalGigs.toLocaleString()}</div>
          <div className="text-xs text-slate-400 mt-1">Total Gigs</div>
        </div>
        <div className="bg-[#12141f] border border-[#1e2235] rounded-lg p-4 text-center">
          <div className="text-2xl font-semibold text-amber-400">{sentinelScopingStats.queuedForAudit.toLocaleString()}</div>
          <div className="text-xs text-slate-400 mt-1">Queued for Audit</div>
        </div>
        <div className="bg-[#12141f] border border-[#1e2235] rounded-lg p-4 text-center">
          <div className="text-2xl font-semibold text-blue-400">{sentinelScopingStats.auditedThisWeek}</div>
          <div className="text-xs text-slate-400 mt-1">Audited This Week</div>
        </div>
        <div className="bg-[#12141f] border border-[#1e2235] rounded-lg p-4 text-center">
          <div className="text-2xl font-semibold text-emerald-400">{sentinelScopingStats.passingAudit.toLocaleString()}</div>
          <div className="text-xs text-slate-400 mt-1">Passing Audit</div>
        </div>
        <div className="bg-[#12141f] border border-[#1e2235] rounded-lg p-4 text-center">
          <div className="text-2xl font-semibold text-red-400">{sentinelScopingStats.failingAudit.toLocaleString()}</div>
          <div className="text-xs text-slate-400 mt-1">Failing Audit</div>
        </div>
      </div>

      <div className="bg-[#12141f] border border-[#1e2235] rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-slate-300">Service Selector</h3>
          <span className="text-xs text-slate-500">{selectedGigs.length} selected for audit</span>
        </div>
        <input
          type="text"
          placeholder="Filter from 10,284 Gigs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#0f1117] border border-[#1e2235] rounded-md px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 mb-3"
        />
        <div className="max-h-72 overflow-y-auto space-y-1">
          {filteredServices.slice(0, 30).map((svc) => (
            <label
              key={svc.id}
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#1a1d2e] cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                checked={selectedGigs.includes(svc.id)}
                onChange={() => toggleGig(svc.id)}
                className="rounded border-slate-600 bg-[#0f1117] text-blue-500 focus:ring-blue-500 focus:ring-offset-0"
              />
              <div className="flex-1 min-w-0">
                <span className="text-sm text-slate-300 font-mono">{svc.repoName}</span>
              </div>
              <span className="text-[10px] text-slate-500">{svc.ownerTeam}</span>
              <span className="text-[10px] text-slate-500">{svc.language}</span>
            </label>
          ))}
          {filteredServices.length > 30 && (
            <div className="text-xs text-slate-500 text-center py-2">
              Showing 30 of {filteredServices.length} services — refine search to see more
            </div>
          )}
        </div>
      </div>

      <div className="bg-[#12141f] border border-[#1e2235] rounded-lg p-4">
        <h3 className="text-sm font-medium text-slate-300 mb-3">Audit Queue Status</h3>
        <div className="h-2 bg-[#1a1d2e] rounded-full overflow-hidden">
          <div className="h-full flex">
            <div className="bg-emerald-500 h-full" style={{ width: '86.8%' }} />
            <div className="bg-amber-500 h-full" style={{ width: '9.9%' }} />
            <div className="bg-red-500 h-full" style={{ width: '3.3%' }} />
          </div>
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-[10px] text-emerald-400">8,921 Passing</span>
          <span className="text-[10px] text-amber-400">1,024 Pending</span>
          <span className="text-[10px] text-red-400">339 Failing</span>
        </div>
      </div>
    </div>
  );
}
