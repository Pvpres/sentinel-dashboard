import { useState } from 'react';
import type { ViewType } from '../types';

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  selectedServiceName: string | null;
  onBackToFleet: () => void;
}

interface NavSection {
  title: string;
  items: { label: string; view: ViewType; icon: string }[];
}

const sections: NavSection[] = [
  {
    title: 'Fleet Overview',
    items: [
      { label: 'Global Health', view: 'global-health', icon: '◈' },
      { label: 'Brand Parity', view: 'brand-parity', icon: '⊞' },
    ],
  },
  {
    title: 'Infrastructure',
    items: [
      { label: 'Cluster Manager', view: 'cluster-manager', icon: '⬡' },
      { label: 'Big Boulder Tracking', view: 'big-boulder', icon: '◆' },
    ],
  },
  {
    title: 'Autonomous Engineering',
    items: [
      { label: 'Devin Fleet Insights', view: 'devin-insights', icon: '⚡' },
      { label: 'Sentinel Scoping', view: 'sentinel-scoping', icon: '◎' },
    ],
  },
  {
    title: 'Service Catalog',
    items: [
      { label: 'Gigs Registry', view: 'service-catalog', icon: '▣' },
    ],
  },
];

export default function Sidebar({ currentView, onViewChange, selectedServiceName, onBackToFleet }: SidebarProps) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggleSection = (title: string) => {
    setCollapsed((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <aside className="min-h-screen border-r border-expedia-border bg-expedia-card overflow-y-auto">
      <div className="py-4">
        {selectedServiceName && (
          <div className="px-4 mb-4">
            <button
              onClick={onBackToFleet}
              className="w-full flex items-center gap-2 text-xs text-expedia-blue hover:text-expedia-accent bg-expedia-light rounded-md px-3 py-2 border border-expedia-border transition-colors"
            >
              <span>←</span>
              <span>Back to Fleet View</span>
            </button>
            <div className="mt-2 px-1">
              <span className="text-[10px] uppercase tracking-wider text-expedia-muted">Viewing Service</span>
              <p className="text-sm text-expedia-blue font-medium truncate">{selectedServiceName}</p>
            </div>
          </div>
        )}

        {sections.map((section) => (
          <div key={section.title} className="mb-1">
            <button
              onClick={() => toggleSection(section.title)}
              className="w-full flex items-center justify-between px-4 py-2 text-[10px] uppercase tracking-widest text-expedia-muted hover:text-expedia-blue transition-colors"
            >
              <span>{section.title}</span>
              <span className="text-[8px]">{collapsed[section.title] ? '▶' : '▼'}</span>
            </button>

            {!collapsed[section.title] && (
              <div className="space-y-0.5 px-2">
                {section.items.map((item) => {
                  const isActive = currentView === item.view;
                  return (
                    <button
                      key={item.view}
                      onClick={() => onViewChange(item.view)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-all ${
                        isActive
                          ? 'bg-expedia-blue text-white'
                          : 'text-expedia-muted hover:text-expedia-blue hover:bg-expedia-light border border-transparent'
                      }`}
                    >
                      <span className="text-xs opacity-70">{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}

        <div className="mt-6 mx-4 p-3 rounded-xl bg-expedia-light border border-expedia-border">
          <div className="text-[10px] uppercase tracking-wider text-expedia-muted mb-2">Fleet Summary</div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-expedia-muted">Services</span>
              <span className="text-expedia-blue font-medium">10,284</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-expedia-muted">Clusters</span>
              <span className="text-expedia-blue font-medium">512</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-expedia-muted">Migrations</span>
              <span className="text-expedia-blue font-medium">47 active</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
