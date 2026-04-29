import { PEOPLE } from '@/lib/fixtures/people'
import { ISSUES } from '@/lib/fixtures/issues'
import { PULL_REQUESTS } from '@/lib/fixtures/pull-requests'

const ENG_PEOPLE = PEOPLE.filter((p) =>
  ['Platform', 'Auth', 'Billing', 'Telemetry', 'Mobile', 'Security'].includes(p.team)
).slice(0, 8)

function generateStandup(personId: string) {
  const person = PEOPLE.find((p) => p.id === personId)!
  const issues = ISSUES.filter((i) => i.assigneeId === personId)
  const prs = PULL_REQUESTS.filter((p) => p.authorId === personId)
  const merged = prs.filter((p) => p.status === 'merged')
  const open = prs.filter((p) => p.status === 'open')
  const inProgress = issues.filter((i) => i.status === 'in-progress')

  return {
    person,
    yesterday: [
      ...merged.slice(0, 1).map((p) => `Merged PR #${p.number}: ${p.title}`),
      ...issues.filter((i) => i.status === 'done').slice(0, 1).map((i) => `Completed ${i.identifier}: ${i.title}`),
    ].filter(Boolean),
    today: [
      ...inProgress.slice(0, 2).map((i) => `Continue ${i.identifier}: ${i.title}`),
      ...open.slice(0, 1).map((p) => `Address review on PR #${p.number}`),
    ].filter(Boolean),
    blockers: inProgress.filter((i) => i.labels.includes('blocked')).map((i) => `${i.identifier} blocked`),
    summary: `${merged.length} PR(s) merged · ${inProgress.length} in progress`,
  }
}

export default function StandupsPage() {
  const standups = ENG_PEOPLE.map((p) => generateStandup(p.id))
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="pb-4 border-b border-[var(--color-rule)] flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl">Daily Standup</h1>
          <p className="text-sm text-[var(--color-muted)] mt-0.5">{today}</p>
        </div>
        <button className="btn btn-secondary text-xs">Post to Slack (mock)</button>
      </div>

      <div className="space-y-4">
        {standups.map(({ person, yesterday, today: todayItems, blockers, summary }) => (
          <div key={person.id} className="card p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[var(--color-accent-soft)] flex items-center justify-center text-[10px] font-medium text-[var(--color-accent)]">
                  {person.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <div className="text-sm font-medium">{person.name}</div>
                  <div className="text-[10px] text-[var(--color-muted)]">{person.role}</div>
                </div>
              </div>
              <span className="text-[10px] text-[var(--color-muted)] font-mono">{summary}</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {yesterday.length > 0 && (
                <div>
                  <div className="text-[10px] font-medium uppercase tracking-wider text-[var(--color-muted)] mb-1.5">Yesterday</div>
                  <ul className="space-y-1">
                    {yesterday.map((item, i) => (
                      <li key={i} className="text-xs flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-[var(--color-success)] shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {todayItems.length > 0 && (
                <div>
                  <div className="text-[10px] font-medium uppercase tracking-wider text-[var(--color-muted)] mb-1.5">Today</div>
                  <ul className="space-y-1">
                    {todayItems.map((item, i) => (
                      <li key={i} className="text-xs flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-[var(--color-accent)] shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {blockers.length > 0 && (
              <div className="mt-3 pt-3 border-t border-[var(--color-rule)]">
                <div className="text-[10px] font-medium uppercase tracking-wider text-[var(--color-warn)] mb-1">Blockers</div>
                {blockers.map((b, i) => (
                  <div key={i} className="text-xs text-[var(--color-warn)]">{b}</div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
