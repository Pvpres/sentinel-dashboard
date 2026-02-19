import { devinMetrics, devinActivityFeed } from '../data/mockData';
import Card from './Card';

const typeConfig = {
  test: { bg: 'bg-blue-100', text: 'text-blue-700', icon: '⧫' },
  security: { bg: 'bg-red-100', text: 'text-red-700', icon: '⛨' },
  refactor: { bg: 'bg-violet-100', text: 'text-violet-700', icon: '⟲' },
  review: { bg: 'bg-emerald-100', text: 'text-emerald-700', icon: '✓' },
  migration: { bg: 'bg-amber-100', text: 'text-amber-700', icon: '→' },
};

export default function DevinInsights() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-expedia-blue mb-1">Devin Fleet Insights</h2>
        <p className="text-sm text-expedia-muted">Organization-wide AI engineering agent metrics</p>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <Card className="col-span-4 p-4">
          <div className="text-[10px] uppercase tracking-wider text-expedia-muted mb-1">PRs Generated</div>
          <div className="text-2xl font-semibold text-blue-600 tabular-nums">{devinMetrics.prsGenerated.toLocaleString()}</div>
          <div className="text-xs text-emerald-600 mt-1">↑ 2,847 this week</div>
        </Card>
        <Card className="col-span-4 p-4">
          <div className="text-[10px] uppercase tracking-wider text-expedia-muted mb-1">Engineering Hours Saved</div>
          <div className="text-2xl font-semibold text-emerald-600 tabular-nums">{devinMetrics.engineeringHoursSaved.toLocaleString()}</div>
          <div className="text-xs text-expedia-muted mt-1">≈ 231 FTE-years</div>
        </Card>
        <Card className="col-span-4 p-4">
          <div className="text-[10px] uppercase tracking-wider text-expedia-muted mb-1">Estimated Cost Saved</div>
          <div className="text-2xl font-semibold text-expedia-accent tabular-nums">{devinMetrics.estimatedCostSaved}</div>
          <div className="text-xs text-emerald-600 mt-1">↑ $1.2M this quarter</div>
        </Card>
        <Card className="col-span-4 p-4">
          <div className="text-[10px] uppercase tracking-wider text-expedia-muted mb-1">Vulnerabilities Patched</div>
          <div className="text-2xl font-semibold text-red-600 tabular-nums">{devinMetrics.vulnerabilitiesPatched.toLocaleString()}</div>
          <div className="text-xs text-expedia-muted mt-1">47 critical, 312 high</div>
        </Card>
        <Card className="col-span-4 p-4">
          <div className="text-[10px] uppercase tracking-wider text-expedia-muted mb-1">Tests Generated</div>
          <div className="text-2xl font-semibold text-violet-600 tabular-nums">{devinMetrics.testsGenerated.toLocaleString()}</div>
          <div className="text-xs text-expedia-muted mt-1">+14.2% code coverage avg</div>
        </Card>
        <Card className="col-span-4 p-4">
          <div className="text-[10px] uppercase tracking-wider text-expedia-muted mb-1">Code Reviews Completed</div>
          <div className="text-2xl font-semibold text-amber-600 tabular-nums">{devinMetrics.codeReviewsCompleted.toLocaleString()}</div>
          <div className="text-xs text-expedia-muted mt-1">Avg review time: 4.2 min</div>
        </Card>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <Card className="col-span-7 p-4">
          <h3 className="text-sm font-medium text-expedia-blue mb-3">ROI Breakdown</h3>
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
                  <span className="text-expedia-muted">{item.label}</span>
                  <span className="text-expedia-text tabular-nums">{item.value}</span>
                </div>
                <div className="h-1.5 bg-expedia-light rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="col-span-5 p-4">
          <h3 className="text-sm font-medium text-expedia-blue mb-3">Recent Activity</h3>
          <div className="space-y-2">
            {devinActivityFeed.slice(0, 7).map((activity) => {
              const cfg = typeConfig[activity.type];
              return (
                <div key={activity.id} className="flex items-start gap-2 py-1.5 border-b border-expedia-border last:border-0">
                  <span className={`mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded text-[10px] ${cfg.bg} ${cfg.text}`}>
                    {cfg.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-expedia-text leading-relaxed">{activity.message}</p>
                    <span className="text-[10px] text-expedia-muted">{activity.timestamp}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
