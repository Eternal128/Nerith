'use client'

import { useState } from 'react'
import { CheckCircle, XCircle, AlertCircle, RefreshCw } from 'lucide-react'
import type { IntegrationStatus } from '@/types'

const INTEGRATIONS: IntegrationStatus[] = [
  { id: 'slack', name: 'Slack', type: 'slack', mode: 'mock', lastSync: '2025-04-28T12:00:00Z', eventCount: 247, errorCount: 0 },
  { id: 'github', name: 'GitHub', type: 'github', mode: 'mock', lastSync: '2025-04-28T11:55:00Z', eventCount: 89, errorCount: 0 },
  { id: 'linear', name: 'Linear', type: 'linear', mode: 'mock', lastSync: '2025-04-28T11:58:00Z', eventCount: 156, errorCount: 2 },
  { id: 'notion', name: 'Notion', type: 'notion', mode: 'mock', lastSync: '2025-04-28T10:00:00Z', eventCount: 23, errorCount: 0 },
  { id: 'granola', name: 'Granola / Fathom', type: 'granola', mode: 'mock', lastSync: '2025-04-28T09:00:00Z', eventCount: 12, errorCount: 0 },
]

const STATUS_ICONS: Record<string, React.ReactNode> = {
  connected: <CheckCircle className="w-4 h-4 text-[var(--color-success)]" />,
  mock: <AlertCircle className="w-4 h-4 text-[var(--color-warn)]" />,
  disconnected: <XCircle className="w-4 h-4 text-[var(--color-danger)]" />,
}

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState(INTEGRATIONS)

  function toggleMock(id: string) {
    setIntegrations((prev) =>
      prev.map((i) =>
        i.id === id
          ? { ...i, mode: i.mode === 'mock' ? ('disconnected' as const) : ('mock' as const) }
          : i
      )
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="pb-4 border-b border-[var(--color-rule)]">
        <h1 className="font-serif text-2xl">Integrations</h1>
        <p className="text-sm text-[var(--color-muted)] mt-0.5">
          All connectors running in mock mode. Toggle to connect real accounts.
        </p>
      </div>

      <div className="space-y-3">
        {integrations.map((integration) => (
          <div key={integration.id} className="card p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {STATUS_ICONS[integration.mode]}
                <div>
                  <div className="text-sm font-medium">{integration.name}</div>
                  <div className="text-xs text-[var(--color-muted)]">
                    {integration.eventCount.toLocaleString()} events ingested
                    {integration.errorCount > 0 && (
                      <span className="ml-2 text-[var(--color-warn)]">{integration.errorCount} errors</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-[10px] text-[var(--color-muted)] uppercase tracking-wider">
                    {integration.mode === 'mock' ? 'Mock Mode' : integration.mode}
                  </div>
                  {integration.lastSync && (
                    <div className="text-[10px] font-mono text-[var(--color-muted)]">
                      {new Date(integration.lastSync).toLocaleTimeString()}
                    </div>
                  )}
                </div>

                {/* Mock toggle */}
                <button
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${integration.mode === 'mock' ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-rule)]'}`}
                  onClick={() => toggleMock(integration.id)}
                >
                  <span
                    className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${integration.mode === 'mock' ? 'translate-x-5' : 'translate-x-1'}`}
                  />
                </button>

                <button className="btn btn-ghost p-1">
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card p-4 bg-amber-50 border-amber-200">
        <div className="text-xs font-medium text-[var(--color-warn)] mb-1">Demo Mode Active</div>
        <p className="text-xs text-[var(--color-warn)]">
          All integrations are replaying fixture data from Hartwell Robotics. Set real API keys in .env to connect live accounts.
        </p>
      </div>
    </div>
  )
}
