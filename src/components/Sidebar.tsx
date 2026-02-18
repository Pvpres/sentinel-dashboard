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
    <aside className="w-60 bg-[#12141f] border-r border-[#1e2235] fixed top-14 left-0 bottom-0 overflow-y-auto z-40">
      <div className="py-4">
        {selectedServiceName && (
          <div className="px-4 mb-4">
            <button
              onClick={onBackToFleet}
              className="w-full flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300 bg-[#1a1d2e] rounded-md px-3 py-2 border border-[#2a2d45] transition-colors"
            >
              <span>←</span>
              <span>Back to Fleet View</span>
            </button>
            <div className="mt-2 px-1">
              <span className="text-[10px] uppercase tracking-wider text-slate-500">Viewing Service</span>
              <p className="text-sm text-white font-medium truncate">{selectedServiceName}</p>
            </div>
          </div>
        )}

        {sections.map((section) => (
          <div key={section.title} className="mb-1">
            <button
              onClick={() => toggleSection(section.title)}
              className="w-full flex items-center justify-between px-4 py-2 text-[10px] uppercase tracking-widest text-slate-500 hover:text-slate-400 transition-colors"
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
                          ? 'bg-blue-600/15 text-blue-400 border border-blue-500/20'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-[#1a1d2e] border border-transparent'
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

        <div className="mt-6 mx-4 p-3 rounded-lg bg-gradient-to-br from-[#1a1d2e] to-[#161830] border border-[#2a2d45]">
          <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-2">Fleet Summary</div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Services</span>
              <span className="text-white font-medium">10,284</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Clusters</span>
              <span className="text-white font-medium">512</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Migrations</span>
              <span className="text-white font-medium">47 active</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
