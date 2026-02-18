import { brandParityData } from '../data/mockData';

const parityColors = {
  green: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', label: 'Aligned' },
  yellow: { bg: 'bg-amber-500/20', text: 'text-amber-400', label: 'In Progress' },
  red: { bg: 'bg-red-500/20', text: 'text-red-400', label: 'Gap' },
};

function ParityBadge({ status }: { status: 'green' | 'yellow' | 'red' }) {
  const config = parityColors[status];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium ${config.bg} ${config.text}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {config.label}
    </span>
  );
}

export default function BrandParity() {
  const greenCount = brandParityData.reduce((a, f) => a + [f.expedia, f.hotels, f.vrbo].filter((s) => s === 'green').length, 0);
  const total = brandParityData.length * 3;
  const parityScore = Math.round((greenCount / total) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-white mb-1">Brand Parity Dashboard</h2>
        <p className="text-sm text-slate-400">Feature alignment across Expedia Group brands</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-[#12141f] border border-[#1e2235] rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-emerald-400">{parityScore}%</div>
          <div className="text-xs text-slate-400 mt-1">Overall Parity Score</div>
        </div>
        <div className="bg-[#12141f] border border-[#1e2235] rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-white">{brandParityData.length}</div>
          <div className="text-xs text-slate-400 mt-1">Features Tracked</div>
        </div>
        <div className="bg-[#12141f] border border-[#1e2235] rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-amber-400">{brandParityData.filter((f) => f.vrbo === 'red' || f.hotels === 'red').length}</div>
          <div className="text-xs text-slate-400 mt-1">Active Gaps</div>
        </div>
      </div>

      <div className="bg-[#12141f] border border-[#1e2235] rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#1e2235]">
              <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-medium">Feature</th>
              <th className="text-center px-4 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-medium">Expedia</th>
              <th className="text-center px-4 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-medium">Hotels.com</th>
              <th className="text-center px-4 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-medium">Vrbo</th>
            </tr>
          </thead>
          <tbody>
            {brandParityData.map((row, i) => (
              <tr key={i} className="border-b border-[#1e2235]/50 hover:bg-[#1a1d2e]/50 transition-colors">
                <td className="px-4 py-2.5 text-sm text-slate-300">{row.feature}</td>
                <td className="px-4 py-2.5 text-center"><ParityBadge status={row.expedia} /></td>
                <td className="px-4 py-2.5 text-center"><ParityBadge status={row.hotels} /></td>
                <td className="px-4 py-2.5 text-center"><ParityBadge status={row.vrbo} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
