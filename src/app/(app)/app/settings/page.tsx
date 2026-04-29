import { PEOPLE } from '@/lib/fixtures/people'

const AGENTS = [
  { name: 'cartographer', label: 'Cartographer', description: 'Converts events into graph mutations', enabled: true, precision: 0.91, recall: 0.88 },
  { name: 'drift-watcher', label: 'Drift Watcher', description: 'Detects drift between intent and code', enabled: true, precision: 0.94, recall: 0.82 },
  { name: 'decision-extractor', label: 'Decision Extractor', description: 'Extracts decisions from prose', enabled: true, precision: 0.87, recall: 0.79 },
  { name: 'spec-synthesizer', label: 'Spec Synthesizer', description: 'Drafts PRDs from source material', enabled: true, precision: 0.85, recall: null },
  { name: 'standup-composer', label: 'Standup Composer', description: 'Generates daily standups', enabled: true, precision: 0.96, recall: 0.93 },
  { name: 'executor', label: 'Executor', description: 'Applies approved actions with audit trail', enabled: true, precision: null, recall: null },
  { name: 'auditor', label: 'Auditor', description: 'Validates agent outputs for accuracy', enabled: true, precision: 0.98, recall: 0.95 },
  { name: 'retro-agent', label: 'Retro Agent', description: 'End-of-sprint analysis', enabled: true, precision: 0.89, recall: 0.85 },
]

const MEMBERS = PEOPLE.slice(0, 10)

export default function SettingsPage() {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <div className="pb-4 border-b border-[var(--color-rule)]">
        <h1 className="font-serif text-2xl">Settings</h1>
        <p className="text-sm text-[var(--color-muted)] mt-0.5">Hartwell Robotics workspace</p>
      </div>

      {/* Workspace */}
      <section>
        <h2 className="font-serif text-lg mb-3">Workspace</h2>
        <div className="card p-4 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--color-muted)]">Organization</span>
            <span>Hartwell Robotics</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--color-muted)]">Plan</span>
            <span className="font-mono text-[var(--color-accent)]">Growth — $420/mo</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--color-muted)]">Members</span>
            <span>{PEOPLE.length}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--color-muted)]">Mode</span>
            <span className="font-mono text-[var(--color-warn)]">DEMO_MODE=true</span>
          </div>
        </div>
      </section>

      {/* Agent toggles + eval scores */}
      <section>
        <h2 className="font-serif text-lg mb-3">Agents</h2>
        <div className="space-y-2">
          {AGENTS.map((agent) => (
            <div key={agent.name} className="card p-3 flex items-center gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{agent.label}</span>
                  <span className={`w-1.5 h-1.5 rounded-full ${agent.enabled ? 'bg-[var(--color-success)]' : 'bg-[var(--color-muted)]'}`} />
                </div>
                <div className="text-xs text-[var(--color-muted)]">{agent.description}</div>
              </div>
              <div className="flex items-center gap-4 text-xs text-[var(--color-muted)]">
                {agent.precision != null && (
                  <div className="text-right">
                    <div className="text-[10px] uppercase tracking-wider">Precision</div>
                    <div className="font-mono text-[var(--color-ink)]">{(agent.precision * 100).toFixed(0)}%</div>
                  </div>
                )}
                {agent.recall != null && (
                  <div className="text-right">
                    <div className="text-[10px] uppercase tracking-wider">Recall</div>
                    <div className="font-mono text-[var(--color-ink)]">{(agent.recall * 100).toFixed(0)}%</div>
                  </div>
                )}
              </div>
              <button
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${agent.enabled ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-rule)]'}`}
              >
                <span
                  className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${agent.enabled ? 'translate-x-5' : 'translate-x-1'}`}
                />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Members */}
      <section>
        <h2 className="font-serif text-lg mb-3">Members ({PEOPLE.length})</h2>
        <div className="card divide-y divide-[var(--color-rule)]">
          {MEMBERS.map((person) => (
            <div key={person.id} className="flex items-center gap-3 p-3">
              <div className="w-7 h-7 rounded-full bg-[var(--color-accent-soft)] flex items-center justify-center text-[10px] font-medium text-[var(--color-accent)] shrink-0">
                {person.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">{person.name}</div>
                <div className="text-xs text-[var(--color-muted)]">{person.role}</div>
              </div>
              <span className="text-[10px] text-[var(--color-muted)] font-mono">{person.team}</span>
            </div>
          ))}
          <div className="p-3 text-xs text-center text-[var(--color-muted)]">
            +{PEOPLE.length - MEMBERS.length} more members
          </div>
        </div>
      </section>
    </div>
  )
}
