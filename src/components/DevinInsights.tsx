import { devinMetrics, devinActivityFeed } from '../data/mockData';

const typeConfig = {
  test: { bg: 'bg-blue-500/15', text: 'text-blue-400', icon: '⧫' },
  security: { bg: 'bg-red-500/15', text: 'text-red-400', icon: '⛨' },
  refactor: { bg: 'bg-violet-500/15', text: 'text-violet-400', icon: '⟲' },
  review: { bg: 'bg-emerald-500/15', text: 'text-emerald-400', icon: '✓' },
  migration: { bg: 'bg-amber-500/15', text: 'text-amber-400', icon: '→' },
};

export default function DevinInsights() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-white mb-1">Devin Fleet Insights</h2>
        <p className="text-sm text-slate-400">Organization-wide AI engineering agent metrics</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        <div className="bg-[#12141f] border border-[#1e2235] rounded-lg p-4">
          <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">PRs Generated</div>
          <div className="text-2xl font-semibold text-blue-400">{devinMetrics.prsGenerated.toLocaleString()}</div>
          <div className="text-xs text-emerald-400 mt-1">↑ 2,847 this week</div>
        </div>
        <div className="bg-[#12141f] border border-[#1e2235] rounded-lg p-4">
          <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">Engineering Hours Saved</div>
          <div className="text-2xl font-semibold text-emerald-400">{devinMetrics.engineeringHoursSaved.toLocaleString()}</div>
          <div className="text-xs text-slate-400 mt-1">≈ 231 FTE-years</div>
        </div>
        <div className="bg-[#12141f] border border-[#1e2235] rounded-lg p-4">
          <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">Estimated Cost Saved</div>
          <div className="text-2xl font-semibold text-white">{devinMetrics.estimatedCostSaved}</div>
          <div className="text-xs text-emerald-400 mt-1">↑ $1.2M this quarter</div>
        </div>
        <div className="bg-[#12141f] border border-[#1e2235] rounded-lg p-4">
          <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">Vulnerabilities Patched</div>
          <div className="text-2xl font-semibold text-red-400">{devinMetrics.vulnerabilitiesPatched.toLocaleString()}</div>
          <div className="text-xs text-slate-400 mt-1">47 critical, 312 high</div>
        </div>
        <div className="bg-[#12141f] border border-[#1e2235] rounded-lg p-4">
          <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">Tests Generated</div>
          <div className="text-2xl font-semibold text-violet-400">{devinMetrics.testsGenerated.toLocaleString()}</div>
          <div className="text-xs text-slate-400 mt-1">+14.2% code coverage avg</div>
        </div>
        <div className="bg-[#12141f] border border-[#1e2235] rounded-lg p-4">
          <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">Code Reviews Completed</div>
          <div className="text-2xl font-semibold text-amber-400">{devinMetrics.codeReviewsCompleted.toLocaleString()}</div>
          <div className="text-xs text-slate-400 mt-1">Avg review time: 4.2 min</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#12141f] border border-[#1e2235] rounded-lg p-4">
          <h3 className="text-sm font-medium text-slate-300 mb-3">ROI Breakdown</h3>
          <div className="space-y-3">
            {[
              { label: 'Test Generation', value: '$14.8M', pct: 31, color: 'bg-blue-500' },
              { label: 'Security Patching', value: '$12.1M', pct: 25, color: 'bg-red-500' },
              { label: 'Code Migration', value: '$9.7M', pct: 20, color: 'bg-amber-500' },
              { label: 'Code Reviews', value: '$6.8M', pct: 14, color: 'bg-emerald-500' },
              { label: 'Refactoring', value: '$4.8M', pct: 10, color: 'bg-violet-500' },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">{item.label}</span>
                  <span className="text-slate-300">{item.value}</span>
                </div>
                <div className="h-1.5 bg-[#1a1d2e] rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#12141f] border border-[#1e2235] rounded-lg p-4">
          <h3 className="text-sm font-medium text-slate-300 mb-3">Recent Activity</h3>
          <div className="space-y-2">
            {devinActivityFeed.slice(0, 7).map((activity) => {
              const cfg = typeConfig[activity.type];
              return (
                <div key={activity.id} className="flex items-start gap-2 py-1.5 border-b border-[#1e2235]/50 last:border-0">
                  <span className={`mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded text-[10px] ${cfg.bg} ${cfg.text}`}>
                    {cfg.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-300 leading-relaxed">{activity.message}</p>
                    <span className="text-[10px] text-slate-500">{activity.timestamp}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
