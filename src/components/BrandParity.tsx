import { brandParityData } from '../data/mockData';
import Card from './Card';
import PageHeader from './TopNav';

const parityColors = {
  green: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Aligned' },
  yellow: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'In Progress' },
  red: { bg: 'bg-red-100', text: 'text-red-700', label: 'Gap' },
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
    <div>
      <PageHeader title="Brand Parity" subtitle="Feature alignment across Expedia Group brands" />

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 text-center">
            <div className="text-3xl font-bold text-emerald-600">{parityScore}%</div>
            <div className="text-xs text-expedia-muted mt-1">Overall Parity Score</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-3xl font-bold text-expedia-blue">{brandParityData.length}</div>
            <div className="text-xs text-expedia-muted mt-1">Features Tracked</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-3xl font-bold text-amber-600">{brandParityData.filter((f) => f.vrbo === 'red' || f.hotels === 'red').length}</div>
            <div className="text-xs text-expedia-muted mt-1">Active Gaps</div>
          </Card>
        </div>

        <Card className="overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-expedia-border bg-expedia-light">
                <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-expedia-muted font-medium">Feature</th>
                <th className="text-center px-4 py-3 text-[10px] uppercase tracking-wider text-expedia-muted font-medium">Expedia</th>
                <th className="text-center px-4 py-3 text-[10px] uppercase tracking-wider text-expedia-muted font-medium">Hotels.com</th>
                <th className="text-center px-4 py-3 text-[10px] uppercase tracking-wider text-expedia-muted font-medium">Vrbo</th>
              </tr>
            </thead>
            <tbody>
              {brandParityData.map((row, i) => (
                <tr key={i} className="border-b border-expedia-border last:border-0 hover:bg-expedia-light/50 transition-colors even:bg-expedia-bg/50">
                  <td className="px-4 py-2.5 text-sm text-expedia-text">{row.feature}</td>
                  <td className="px-4 py-2.5 text-center"><ParityBadge status={row.expedia} /></td>
                  <td className="px-4 py-2.5 text-center"><ParityBadge status={row.hotels} /></td>
                  <td className="px-4 py-2.5 text-center"><ParityBadge status={row.vrbo} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}
