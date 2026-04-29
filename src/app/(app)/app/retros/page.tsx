'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { ISSUES } from '@/lib/fixtures/issues'

const SPRINT_DATA = [
  { sprint: 'S21', planned: 24, shipped: 22 },
  { sprint: 'S22', planned: 26, shipped: 18 },
  { sprint: 'S23', planned: 24, shipped: 15 },
  { sprint: 'S24', planned: 22, shipped: 13 },
]

const RETRO = {
  sprintNumber: 24,
  sprintGoal: 'Ship Billing v2 beta + auth migration groundwork',
  shipped: ['HART-089', 'HART-112', 'HART-135', 'HART-471'],
  missed: ['HART-201', 'HART-215'],
  velocityPlanned: 22,
  velocityShipped: 13,
  cycleTimeP50: 4.2,
  cycleTimeP95: 9.8,
  rootCauses: [
    { label: 'External dependency delay', issues: ['HART-201'], description: 'Auth0 vendor contract delayed migration 2 weeks.' },
    { label: 'Scope creep', issues: ['HART-215'], description: 'Usage-based billing schema grew from 8pt to 13pt.' },
  ],
  actionItems: [
    { owner: 'Marcus Hartwell', action: 'Unblock Auth0 contract by EOW' },
    { owner: 'Sarah Chen', action: 'Fix flaky auth tests' },
    { owner: 'Nina Petrov', action: 'Break HART-215 into sub-issues for Sprint 25' },
  ],
}

export default function RetrosPage() {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="pb-4 border-b border-[var(--color-rule)]">
        <h1 className="font-serif text-2xl">Sprint {RETRO.sprintNumber} Retrospective</h1>
        <p className="text-sm text-[var(--color-muted)] mt-0.5">
          Goal: {RETRO.sprintGoal}
        </p>
      </div>

      {/* Velocity chart */}
      <div className="card p-4">
        <div className="text-sm font-medium mb-4">Velocity: Planned vs Shipped</div>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={SPRINT_DATA} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e3ddd0" vertical={false} />
              <XAxis dataKey="sprint" tick={{ fontSize: 11, fontFamily: 'JetBrains Mono' }} />
              <YAxis tick={{ fontSize: 11, fontFamily: 'JetBrains Mono' }} />
              <Tooltip
                contentStyle={{ background: '#f7f5ef', border: '1px solid #e3ddd0', borderRadius: 8, fontSize: 11 }}
              />
              <Bar dataKey="planned" fill="#c9d4e3" radius={[3, 3, 0, 0]} />
              <Bar dataKey="shipped" fill="#1f3a5f" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-4 mt-2 text-xs text-[var(--color-muted)]">
          <span className="flex items-center gap-1.5"><span className="w-3 h-2 rounded-sm bg-[var(--color-accent-soft)]" />Planned</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-2 rounded-sm bg-[var(--color-accent)]" />Shipped</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Velocity', value: `${RETRO.velocityShipped}/${RETRO.velocityPlanned}pt`, sub: `${Math.round(RETRO.velocityShipped / RETRO.velocityPlanned * 100)}% of target` },
          { label: 'Cycle P50', value: `${RETRO.cycleTimeP50}d`, sub: 'Target: 3.5d' },
          { label: 'Cycle P95', value: `${RETRO.cycleTimeP95}d`, sub: 'Includes review wait' },
          { label: 'Shipped', value: `${RETRO.shipped.length}/${RETRO.shipped.length + RETRO.missed.length}`, sub: 'issues completed' },
        ].map(({ label, value, sub }) => (
          <div key={label} className="card p-3">
            <div className="text-[10px] text-[var(--color-muted)] uppercase tracking-wider">{label}</div>
            <div className="font-serif text-xl mt-1">{value}</div>
            <div className="text-[10px] text-[var(--color-muted)]">{sub}</div>
          </div>
        ))}
      </div>

      {/* Shipped / Missed */}
      <div className="grid grid-cols-2 gap-4">
        <div className="card p-4">
          <div className="text-[10px] font-medium uppercase tracking-wider text-[var(--color-success)] mb-2">Shipped ✓</div>
          {RETRO.shipped.map((id) => {
            const issue = ISSUES.find((i) => i.identifier === id)
            return (
              <div key={id} className="flex items-start gap-2 py-1.5 border-b border-[var(--color-rule)] last:border-0 text-xs">
                <span className="font-mono text-[var(--color-muted)]">{id}</span>
                <span className="text-[var(--color-ink)]">{issue?.title?.slice(0, 40) ?? ''}</span>
              </div>
            )
          })}
        </div>
        <div className="card p-4">
          <div className="text-[10px] font-medium uppercase tracking-wider text-[var(--color-warn)] mb-2">Missed ✗</div>
          {RETRO.missed.map((id) => {
            const issue = ISSUES.find((i) => i.identifier === id)
            return (
              <div key={id} className="flex items-start gap-2 py-1.5 border-b border-[var(--color-rule)] last:border-0 text-xs">
                <span className="font-mono text-[var(--color-muted)]">{id}</span>
                <span className="text-[var(--color-ink)]">{issue?.title?.slice(0, 40) ?? ''}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Root causes */}
      <div className="card p-4">
        <div className="text-sm font-medium mb-3">Root Cause Clusters</div>
        {RETRO.rootCauses.map((rc) => (
          <div key={rc.label} className="flex items-start gap-3 py-3 border-b border-[var(--color-rule)] last:border-0">
            <div className="w-2 h-2 rounded-full bg-[var(--color-warn)] mt-1.5 shrink-0" />
            <div>
              <div className="text-xs font-medium">{rc.label}</div>
              <div className="text-xs text-[var(--color-muted)] mt-0.5">{rc.description}</div>
              <div className="flex gap-1 mt-1">
                {rc.issues.map((id) => (
                  <span key={id} className="text-[10px] font-mono bg-[var(--color-rule)] px-1.5 py-0.5 rounded">{id}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action items */}
      <div className="card p-4">
        <div className="text-sm font-medium mb-3">Action Items</div>
        {RETRO.actionItems.map((item, i) => (
          <div key={i} className="flex items-start gap-3 py-2 border-b border-[var(--color-rule)] last:border-0 text-xs">
            <input type="checkbox" className="mt-0.5" readOnly />
            <div>
              <span className="text-[var(--color-ink)]">{item.action}</span>
              <span className="text-[var(--color-muted)] ml-2">— {item.owner}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
