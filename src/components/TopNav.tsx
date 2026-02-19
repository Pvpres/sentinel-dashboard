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
    <header className="h-14 bg-expedia-blue flex items-center justify-between px-6 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center gap-3">
        <span className="text-lg font-bold text-white tracking-tight">Expedia</span>
        <span className="text-xs text-expedia-accent font-medium">Sentinel</span>
        <span className="text-xs text-slate-400 border-l border-slate-600 pl-3 hidden sm:inline">Platform Console</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Brand:</span>
          <select
            value={selectedBrand}
            onChange={(e) => onBrandChange(e.target.value as Brand)}
            className="bg-white/10 border border-white/20 rounded-md px-3 py-1.5 text-sm text-white focus:outline-none focus:border-expedia-accent cursor-pointer"
          >
            {(Object.keys(brandLabels) as Brand[]).map((brand) => (
              <option key={brand} value={brand} className="text-expedia-blue">{brandLabels[brand]}</option>
            ))}
          </select>
        </div>

        <div className="h-6 w-px bg-white/20" />

        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-slate-300">All Systems Nominal</span>
        </div>

        <div className="h-6 w-px bg-white/20" />

        <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-xs text-white">
          PL
        </div>
      </div>
    </header>
  );
}
