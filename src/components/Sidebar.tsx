import type { ViewType } from '../types';

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  selectedServiceName: string | null;
  onBackToFleet: () => void;
}

const navItems: { label: string; view: ViewType; icon: string }[] = [
  { label: 'Home', view: 'global-health', icon: '⌂' },
  { label: 'Brand Parity', view: 'brand-parity', icon: '⊞' },
  { label: 'Clusters', view: 'cluster-manager', icon: '⬡' },
  { label: 'Big Boulders', view: 'big-boulder', icon: '◆' },
  { label: 'Devin AI', view: 'devin-insights', icon: '⚡' },
  { label: 'Scoping', view: 'sentinel-scoping', icon: '◎' },
  { label: 'Catalog', view: 'service-catalog', icon: '▣' },
];

export default function Sidebar({ currentView, onViewChange, selectedServiceName, onBackToFleet }: SidebarProps) {
  return (
    <aside className="fixed top-0 left-0 bottom-0 w-28 bg-expedia-sidebar flex flex-col z-50">
      <div className="flex flex-col items-center pt-5 pb-4 border-b border-white/10">
        <span className="text-base font-bold text-expedia-accent tracking-tight">Sentinel</span>
      </div>

      <nav className="flex-1 flex flex-col items-center gap-1 py-4 px-2 overflow-y-auto">
        {selectedServiceName && (
          <button
            onClick={onBackToFleet}
            className="w-full flex flex-col items-center gap-1 px-2 py-2.5 rounded-lg text-expedia-accent hover:bg-expedia-sidebar-hover transition-colors mb-2"
          >
            <span className="text-base">←</span>
            <span className="text-[10px] leading-tight text-center">Back</span>
          </button>
        )}
        {navItems.map((item) => {
          const isActive = currentView === item.view || (item.view === 'service-catalog' && currentView === 'service-detail');
          return (
            <button
              key={item.view}
              onClick={() => onViewChange(item.view)}
              className={`w-full flex flex-col items-center gap-1 px-2 py-2.5 rounded-lg transition-colors ${
                isActive
                  ? 'bg-expedia-sidebar-active text-white'
                  : 'text-expedia-sidebar-text hover:bg-expedia-sidebar-hover hover:text-white'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-[10px] leading-tight text-center">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="flex flex-col items-center gap-1 px-2 py-4 border-t border-white/10">
        <div className="w-8 h-8 rounded-full bg-expedia-sidebar-active flex items-center justify-center text-xs text-white font-medium">
          PL
        </div>
      </div>
    </aside>
  );
}
