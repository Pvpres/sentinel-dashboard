import { useState } from 'react';
import { bigBoulders } from '../data/mockData';
import Card from './Card';
import PageHeader from './TopNav';

const statusConfig = {
  'in-progress': { bg: 'bg-blue-100', text: 'text-blue-700' },
  'planning': { bg: 'bg-slate-100', text: 'text-slate-700' },
  'blocked': { bg: 'bg-red-100', text: 'text-red-700' },
  'completed': { bg: 'bg-emerald-100', text: 'text-emerald-700' },
  'at-risk': { bg: 'bg-amber-100', text: 'text-amber-700' },
};

const riskConfig = {
  low: { bg: 'bg-emerald-100', text: 'text-emerald-700' },
  medium: { bg: 'bg-amber-100', text: 'text-amber-700' },
  high: { bg: 'bg-orange-100', text: 'text-orange-700' },
  critical: { bg: 'bg-red-100', text: 'text-red-700' },
};

export default function BigBoulderTracking() {
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filtered = statusFilter === 'all' ? bigBoulders : bigBoulders.filter((b) => b.status === statusFilter);
  const active = bigBoulders.filter((b) => b.status !== 'completed').length;
  const blocked = bigBoulders.filter((b) => b.status === 'blocked').length;
  const avgCompletion = Math.round(bigBoulders.reduce((a, b) => a + b.percentComplete, 0) / bigBoulders.length);

  return (
    <div>
      <PageHeader title="Big Boulder Tracking" subtitle="Migration programs across the unified platform" />

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-4 gap-4">
          <Card className="p-4 text-center">
            <div className="text-3xl font-bold text-expedia-blue tabular-nums">{bigBoulders.length}</div>
            <div className="text-xs text-expedia-muted mt-1">Total Programs</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-3xl font-bold text-blue-600 tabular-nums">{active}</div>
            <div className="text-xs text-expedia-muted mt-1">Active</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-3xl font-bold text-red-600 tabular-nums">{blocked}</div>
            <div className="text-xs text-expedia-muted mt-1">Blocked</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-3xl font-bold text-emerald-600 tabular-nums">{avgCompletion}%</div>
            <div className="text-xs text-expedia-muted mt-1">Avg Completion</div>
          </Card>
        </div>

        <div className="flex gap-1">
          {['all', 'in-progress', 'planning', 'at-risk', 'blocked', 'completed'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-md text-xs capitalize transition-colors ${
                statusFilter === s ? 'bg-expedia-blue text-white' : 'bg-expedia-card border border-expedia-border text-expedia-muted hover:text-expedia-blue'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-expedia-border bg-expedia-light">
                  <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-expedia-muted font-medium">Program Name</th>
                  <th className="text-center px-4 py-3 text-[10px] uppercase tracking-wider text-expedia-muted font-medium">Status</th>
                  <th className="text-center px-4 py-3 text-[10px] uppercase tracking-wider text-expedia-muted font-medium">% Complete</th>
                  <th className="text-center px-4 py-3 text-[10px] uppercase tracking-wider text-expedia-muted font-medium">Risk Level</th>
                  <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-expedia-muted font-medium">Owner</th>
                  <th className="text-right px-4 py-3 text-[10px] uppercase tracking-wider text-expedia-muted font-medium">Services</th>
                  <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-expedia-muted font-medium">Target</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((boulder) => {
                  const sCfg = statusConfig[boulder.status];
                  const rCfg = riskConfig[boulder.riskLevel];
                  return (
                    <tr key={boulder.id} className="border-b border-expedia-border last:border-0 hover:bg-expedia-light/50 transition-colors even:bg-expedia-bg/50">
                      <td className="px-4 py-2.5 text-sm text-expedia-text">{boulder.programName}</td>
                      <td className="px-4 py-2.5 text-center">
                        <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-medium ${sCfg.bg} ${sCfg.text}`}>
                          {boulder.status}
                        </span>
                      </td>
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-expedia-light rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${boulder.percentComplete === 100 ? 'bg-emerald-500' : boulder.percentComplete > 60 ? 'bg-blue-500' : 'bg-amber-500'}`}
                              style={{ width: `${boulder.percentComplete}%` }}
                            />
                          </div>
                          <span className="text-xs text-expedia-muted w-8 text-right tabular-nums">{boulder.percentComplete}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-medium ${rCfg.bg} ${rCfg.text}`}>
                          {boulder.riskLevel}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-sm text-expedia-muted">{boulder.owner}</td>
                      <td className="px-4 py-2.5 text-sm text-expedia-text text-right tabular-nums">{boulder.servicesAffected}</td>
                      <td className="px-4 py-2.5 text-sm text-expedia-muted tabular-nums">{boulder.targetDate}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
