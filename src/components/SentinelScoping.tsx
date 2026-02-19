import { useState } from 'react';
import { services, sentinelScopingStats } from '../data/mockData';
import Card from './Card';
import PageHeader from './TopNav';

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
    <div>
      <PageHeader title="Sentinel Scoping" subtitle="Configure Devin audit scope across the service fleet" />

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-5 gap-4">
          <Card className="p-4 text-center">
            <div className="text-2xl font-semibold text-expedia-blue tabular-nums">{sentinelScopingStats.totalGigs.toLocaleString()}</div>
            <div className="text-xs text-expedia-muted mt-1">Total Gigs</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-semibold text-amber-600 tabular-nums">{sentinelScopingStats.queuedForAudit.toLocaleString()}</div>
            <div className="text-xs text-expedia-muted mt-1">Queued for Audit</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-semibold text-blue-600 tabular-nums">{sentinelScopingStats.auditedThisWeek}</div>
            <div className="text-xs text-expedia-muted mt-1">Audited This Week</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-semibold text-emerald-600 tabular-nums">{sentinelScopingStats.passingAudit.toLocaleString()}</div>
            <div className="text-xs text-expedia-muted mt-1">Passing Audit</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-semibold text-red-600 tabular-nums">{sentinelScopingStats.failingAudit.toLocaleString()}</div>
            <div className="text-xs text-expedia-muted mt-1">Failing Audit</div>
          </Card>
        </div>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-expedia-text">Service Selector</h3>
            <span className="text-xs text-expedia-muted">{selectedGigs.length} selected for audit</span>
          </div>
          <input
            type="text"
            placeholder="Filter from 10,284 Gigs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-expedia-bg border border-expedia-border rounded-md px-3 py-2 text-sm text-expedia-text placeholder-expedia-muted focus:outline-none focus:border-expedia-accent mb-3"
          />
          <div className="max-h-72 overflow-y-auto space-y-1">
            {filteredServices.slice(0, 30).map((svc) => (
              <label
                key={svc.id}
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-expedia-light cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selectedGigs.includes(svc.id)}
                  onChange={() => toggleGig(svc.id)}
                  className="rounded border-expedia-border bg-expedia-bg text-expedia-blue focus:ring-expedia-accent focus:ring-offset-0"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-sm text-expedia-text font-mono">{svc.repoName}</span>
                </div>
                <span className="text-[10px] text-expedia-muted">{svc.ownerTeam}</span>
                <span className="text-[10px] text-expedia-muted">{svc.language}</span>
              </label>
            ))}
            {filteredServices.length > 30 && (
              <div className="text-xs text-expedia-muted text-center py-2">
                Showing 30 of {filteredServices.length} services — refine search to see more
              </div>
            )}
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm font-medium text-expedia-text mb-3">Audit Queue Status</h3>
          <div className="h-2 bg-expedia-light rounded-full overflow-hidden">
            <div className="h-full flex">
              <div className="bg-emerald-500 h-full" style={{ width: '86.8%' }} />
              <div className="bg-amber-500 h-full" style={{ width: '9.9%' }} />
              <div className="bg-red-500 h-full" style={{ width: '3.3%' }} />
            </div>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-[10px] text-emerald-600">8,921 Passing</span>
            <span className="text-[10px] text-amber-600">1,024 Pending</span>
            <span className="text-[10px] text-red-600">339 Failing</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
