'use client'

import { useState } from 'react'
import { AlertTriangle, CheckCircle, X } from 'lucide-react'
import { DRIFT_EVENTS } from '@/lib/fixtures/drift-events'
import type { DriftEvent } from '@/types'
import { SeverityPill, StatusPill } from '@/components/ui'
import { DriftCard } from '@/components/feed/DriftCard'
import { DriftDrawer } from '@/components/feed/DriftDrawer'

export default function FeedPage() {
  const [selected, setSelected] = useState<DriftEvent | null>(null)
  const [filter, setFilter] = useState<{ severity?: string; status?: string }>({})

  const filtered = DRIFT_EVENTS.filter((e) => {
    if (filter.severity && e.severity !== filter.severity) return false
    if (filter.status && e.status !== filter.status) return false
    return true
  }).sort((a, b) => {
    const sev: Record<string, number> = { critical: 0, warn: 1, info: 2 }
    return (sev[a.severity] ?? 3) - (sev[b.severity] ?? 3) || new Date(b.generatedAt).getTime() - new Date(a.generatedAt).getTime()
  })

  const counts = {
    open: DRIFT_EVENTS.filter((e) => e.status === 'open').length,
    critical: DRIFT_EVENTS.filter((e) => e.severity === 'critical').length,
    accepted: DRIFT_EVENTS.filter((e) => e.status === 'accepted').length,
    dismissed: DRIFT_EVENTS.filter((e) => e.status === 'dismissed').length,
  }

  return (
    <div className="flex h-full">
      {/* Left filter rail */}
      <aside className="w-52 shrink-0 border-r border-[var(--color-rule)] p-3 space-y-4 overflow-y-auto">
        <div>
          <div className="text-[10px] font-medium uppercase tracking-wider text-[var(--color-muted)] mb-2">Severity</div>
          {(['critical', 'warn', 'info'] as const).map((s) => (
            <button
              key={s}
              className={`flex items-center gap-2 w-full text-left px-2 py-1.5 rounded text-xs transition-colors ${filter.severity === s ? 'bg-[var(--color-rule)]' : 'hover:bg-[var(--color-rule)]'}`}
              onClick={() => setFilter((f) => ({ ...f, severity: f.severity === s ? undefined : s }))}
            >
              <SeverityPill severity={s} />
              <span className="ml-auto text-[var(--color-muted)]">{DRIFT_EVENTS.filter((e) => e.severity === s).length}</span>
            </button>
          ))}
        </div>

        <hr className="rule" />

        <div>
          <div className="text-[10px] font-medium uppercase tracking-wider text-[var(--color-muted)] mb-2">Status</div>
          {(['open', 'accepted', 'dismissed', 'snoozed'] as const).map((s) => (
            <button
              key={s}
              className={`flex items-center gap-2 w-full text-left px-2 py-1.5 rounded text-xs transition-colors ${filter.status === s ? 'bg-[var(--color-rule)]' : 'hover:bg-[var(--color-rule)]'}`}
              onClick={() => setFilter((f) => ({ ...f, status: f.status === s ? undefined : s }))}
            >
              <StatusPill status={s} />
              <span className="ml-auto text-[var(--color-muted)]">{DRIFT_EVENTS.filter((e) => e.status === s).length}</span>
            </button>
          ))}
        </div>

        <hr className="rule" />

        <div>
          <div className="text-[10px] font-medium uppercase tracking-wider text-[var(--color-muted)] mb-2">Agent</div>
          {Array.from(new Set(DRIFT_EVENTS.map((e) => e.agentName))).map((agent) => (
            <button key={agent} className="flex items-center gap-2 w-full text-left px-2 py-1.5 rounded text-xs hover:bg-[var(--color-rule)] transition-colors">
              <span className="font-mono text-[var(--color-accent)]">{agent}</span>
              <span className="ml-auto text-[var(--color-muted)]">{DRIFT_EVENTS.filter((e) => e.agentName === agent).length}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* Center: feed */}
      <div className="flex-1 overflow-y-auto">
        {/* Feed header */}
        <div className="sticky top-0 bg-[var(--color-paper)] border-b border-[var(--color-rule)] px-6 py-3 flex items-center justify-between z-10">
          <div className="flex items-center gap-4">
            <h1 className="font-serif text-lg">Drift Feed</h1>
            <div className="flex items-center gap-2 text-xs text-[var(--color-muted)]">
              <span className="font-mono">{filtered.length}</span> events
              {(filter.severity || filter.status) && (
                <button
                  className="text-[var(--color-accent)] hover:underline"
                  onClick={() => setFilter({})}
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-[var(--color-muted)]">
            <span className="w-2 h-2 rounded-full bg-[var(--color-success)] animate-pulse" />
            Live — last event 2m ago
          </div>
        </div>

        {/* Events */}
        <div className="p-4 space-y-2">
          {filtered.map((event) => (
            <DriftCard key={event.id} event={event} onSelect={() => setSelected(event)} />
          ))}
        </div>
      </div>

      {/* Right rail: stats */}
      <aside className="w-56 shrink-0 border-l border-[var(--color-rule)] p-3 space-y-4">
        <div>
          <div className="text-[10px] font-medium uppercase tracking-wider text-[var(--color-muted)] mb-3">Today</div>
          <div className="space-y-2">
            {[
              { icon: AlertTriangle, label: 'Open', value: counts.open, color: 'var(--color-warn)' },
              { icon: X, label: 'Critical', value: counts.critical, color: 'var(--color-danger)' },
              { icon: CheckCircle, label: 'Accepted', value: counts.accepted, color: 'var(--color-success)' },
              { icon: X, label: 'Dismissed', value: counts.dismissed, color: 'var(--color-muted)' },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-[var(--color-muted)]">
                  <Icon className="w-3 h-3" style={{ color }} />
                  {label}
                </span>
                <span className="font-mono font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <hr className="rule" />

        <div>
          <div className="text-[10px] font-medium uppercase tracking-wider text-[var(--color-muted)] mb-3">Live Activity</div>
          <div className="space-y-2 text-[11px] text-[var(--color-muted)]">
            {[
              'PR #488 opened in auth-svc',
              'HART-264 status → In Review',
              'Slack: @yuki in #security',
              'PR #482 review requested',
              'Linear webhook received',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-1.5">
                <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-[var(--color-accent-soft)] shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <hr className="rule" />

        <div>
          <div className="text-[10px] font-medium uppercase tracking-wider text-[var(--color-muted)] mb-2">Time Saved</div>
          <div className="font-serif text-2xl text-[var(--color-accent)]">14.2h</div>
          <div className="text-[10px] text-[var(--color-muted)]">this week, estimated</div>
        </div>
      </aside>

      {/* Drawer */}
      {selected && <DriftDrawer event={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
