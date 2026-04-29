'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, ArrowRight } from 'lucide-react'
import { DRIFT_EVENTS } from '@/lib/fixtures/drift-events'
import { DECISIONS } from '@/lib/fixtures/decisions'
import { PROJECTS } from '@/lib/fixtures/projects'
import { PEOPLE } from '@/lib/fixtures/people'

interface CommandPaletteProps {
  open: boolean
  onClose: () => void
}

interface Result {
  id: string
  type: string
  label: string
  description: string
  href: string
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const router = useRouter()

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        if (open) onClose()
      }
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  if (!open) return null

  const results: Result[] = []

  if (query.length >= 1) {
    const q = query.toLowerCase()

    PROJECTS.filter((p) => p.name.toLowerCase().includes(q)).forEach((p) => {
      results.push({ id: p.id, type: 'Project', label: p.name, description: p.description.slice(0, 60), href: '/app/graph' })
    })

    DECISIONS.filter((d) => d.title.toLowerCase().includes(q)).forEach((d) => {
      results.push({ id: d.id, type: 'Decision', label: d.title, description: d.body.slice(0, 60), href: '/app/decisions' })
    })

    PEOPLE.filter((p) => p.name.toLowerCase().includes(q)).slice(0, 3).forEach((p) => {
      results.push({ id: p.id, type: 'Person', label: p.name, description: `${p.role}, ${p.team}`, href: '/app/graph' })
    })

    DRIFT_EVENTS.filter((e) => e.headline.toLowerCase().includes(q)).slice(0, 3).forEach((e) => {
      results.push({ id: e.id, type: 'Drift', label: e.headline.slice(0, 60), description: e.severity, href: '/app/feed' })
    })
  } else {
    results.push(
      { id: 'feed', type: 'Nav', label: 'Drift Feed', description: '33 open events', href: '/app/feed' },
      { id: 'graph', type: 'Nav', label: 'Graph Explorer', description: 'Interactive knowledge graph', href: '/app/graph' },
      { id: 'decisions', type: 'Nav', label: 'Decisions Ledger', description: '6 active decisions', href: '/app/decisions' },
      { id: 'auth-migration', type: 'Project', label: 'Auth Migration', description: 'Migrate to Auth0', href: '/app/graph' },
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative w-full max-w-xl bg-[var(--color-paper)] border border-[var(--color-rule)] rounded-[8px] shadow-none overflow-hidden">
        {/* Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--color-rule)]">
          <Search className="w-4 h-4 text-[var(--color-muted)] shrink-0" />
          <input
            autoFocus
            type="text"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--color-muted)]"
            placeholder="Search projects, decisions, people, drift events..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <kbd className="text-[10px] border border-[var(--color-rule)] rounded px-1 text-[var(--color-muted)]">ESC</kbd>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto">
          {results.length === 0 ? (
            <div className="py-8 text-center text-sm text-[var(--color-muted)]">No results for &ldquo;{query}&rdquo;</div>
          ) : (
            results.map((r) => (
              <button
                key={r.id}
                className="flex items-center gap-3 w-full px-4 py-2.5 hover:bg-[var(--color-rule)] transition-colors text-left"
                onClick={() => {
                  router.push(r.href)
                  onClose()
                }}
              >
                <span className="text-[10px] font-mono text-[var(--color-muted)] w-16 shrink-0">{r.type}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{r.label}</div>
                  <div className="text-xs text-[var(--color-muted)] truncate">{r.description}</div>
                </div>
                <ArrowRight className="w-3 h-3 text-[var(--color-muted)] shrink-0" />
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
