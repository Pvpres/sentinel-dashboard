import { useState } from 'react';
import { bigBoulders } from '../data/mockData';

const statusConfig = {
  'in-progress': { bg: 'bg-blue-500/15', text: 'text-blue-400' },
  'planning': { bg: 'bg-slate-500/15', text: 'text-slate-400' },
  'blocked': { bg: 'bg-red-500/15', text: 'text-red-400' },
  'completed': { bg: 'bg-emerald-500/15', text: 'text-emerald-400' },
  'at-risk': { bg: 'bg-amber-500/15', text: 'text-amber-400' },
};

const riskConfig = {
  low: { bg: 'bg-emerald-500/15', text: 'text-emerald-400' },
  medium: { bg: 'bg-amber-500/15', text: 'text-amber-400' },
  high: { bg: 'bg-orange-500/15', text: 'text-orange-400' },
  critical: { bg: 'bg-red-500/15', text: 'text-red-400' },
};

export default function BigBoulderTracking() {
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filtered = statusFilter === 'all' ? bigBoulders : bigBoulders.filter((b) => b.status === statusFilter);
  const active = bigBoulders.filter((b) => b.status !== 'completed').length;
  const blocked = bigBoulders.filter((b) => b.status === 'blocked').length;
  const avgCompletion = Math.round(bigBoulders.reduce((a, b) => a + b.percentComplete, 0) / bigBoulders.length);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-white mb-1">Big Boulder Tracking</h2>
        <p className="text-sm text-slate-400">Migration programs across the unified platform</p>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <div className="bg-[#12141f] border border-[#1e2235] rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-white">{bigBoulders.length}</div>
          <div className="text-xs text-slate-400 mt-1">Total Programs</div>
        </div>
        <div className="bg-[#12141f] border border-[#1e2235] rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-blue-400">{active}</div>
          <div className="text-xs text-slate-400 mt-1">Active</div>
        </div>
        <div className="bg-[#12141f] border border-[#1e2235] rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-red-400">{blocked}</div>
          <div className="text-xs text-slate-400 mt-1">Blocked</div>
        </div>
        <div className="bg-[#12141f] border border-[#1e2235] rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-emerald-400">{avgCompletion}%</div>
          <div className="text-xs text-slate-400 mt-1">Avg Completion</div>
        </div>
      </div>

      <div className="flex gap-1">
        {['all', 'in-progress', 'planning', 'at-risk', 'blocked', 'completed'].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-3 py-1.5 rounded-md text-xs capitalize transition-colors ${
              statusFilter === s ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'bg-[#12141f] border border-[#1e2235] text-slate-400 hover:text-slate-200'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="bg-[#12141f] border border-[#1e2235] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1e2235]">
                <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-medium">Program Name</th>
                <th className="text-center px-4 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-medium">Status</th>
                <th className="text-center px-4 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-medium">% Complete</th>
                <th className="text-center px-4 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-medium">Risk Level</th>
                <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-medium">Owner</th>
                <th className="text-right px-4 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-medium">Services</th>
                <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-medium">Target</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((boulder) => {
                const sCfg = statusConfig[boulder.status];
                const rCfg = riskConfig[boulder.riskLevel];
                return (
                  <tr key={boulder.id} className="border-b border-[#1e2235]/50 hover:bg-[#1a1d2e]/50 transition-colors">
                    <td className="px-4 py-2.5 text-sm text-slate-300">{boulder.programName}</td>
                    <td className="px-4 py-2.5 text-center">
                      <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-medium ${sCfg.bg} ${sCfg.text}`}>
                        {boulder.status}
                      </span>
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-[#1a1d2e] rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${boulder.percentComplete === 100 ? 'bg-emerald-500' : boulder.percentComplete > 60 ? 'bg-blue-500' : 'bg-amber-500'}`}
                            style={{ width: `${boulder.percentComplete}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-400 w-8 text-right">{boulder.percentComplete}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-medium ${rCfg.bg} ${rCfg.text}`}>
                        {boulder.riskLevel}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-sm text-slate-400">{boulder.owner}</td>
                    <td className="px-4 py-2.5 text-sm text-slate-300 text-right">{boulder.servicesAffected}</td>
                    <td className="px-4 py-2.5 text-sm text-slate-400">{boulder.targetDate}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
