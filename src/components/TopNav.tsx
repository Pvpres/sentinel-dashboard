import type { Brand } from '../types';

interface TopNavProps {
  selectedBrand: Brand;
  onBrandChange: (brand: Brand) => void;
}

const brandLabels: Record<Brand, string> = {
  unified: 'Unified View',
  expedia: 'Expedia',
  hotels: 'Hotels.com',
  vrbo: 'Vrbo',
};

export default function TopNav({ selectedBrand, onBrandChange }: TopNavProps) {
  return (
    <header className="h-14 bg-[#12141f] border-b border-[#1e2235] flex items-center justify-between px-6 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">S</div>
          <span className="text-lg font-semibold text-white tracking-tight">Sentinel</span>
        </div>
        <span className="text-xs text-slate-500 border-l border-slate-700 pl-4 hidden sm:inline">Expedia Group Platform Console</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Brand:</span>
          <select
            value={selectedBrand}
            onChange={(e) => onBrandChange(e.target.value as Brand)}
            className="bg-[#1a1d2e] border border-[#2a2d45] rounded-md px-3 py-1.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            {(Object.keys(brandLabels) as Brand[]).map((brand) => (
              <option key={brand} value={brand}>{brandLabels[brand]}</option>
            ))}
          </select>
        </div>

        <div className="h-6 w-px bg-slate-700" />

        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-slate-400">All Systems Nominal</span>
        </div>

        <div className="h-6 w-px bg-slate-700" />

        <div className="w-8 h-8 rounded-full bg-[#1a1d2e] border border-[#2a2d45] flex items-center justify-center text-xs text-slate-300">
          PL
        </div>
      </div>
    </header>
  );
}
