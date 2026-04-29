'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'
import {
  Activity,
  GitBranch,
  BookOpen,
  FileText,
  Users,
  BarChart2,
  Plug,
  Settings,
  Command,
  ChevronDown,
} from 'lucide-react'
import { CommandPalette } from './CommandPalette'

const NAV_ITEMS = [
  { href: '/app/feed', icon: Activity, label: 'Drift Feed', badge: '33' },
  { href: '/app/graph', icon: GitBranch, label: 'Graph Explorer' },
  { href: '/app/decisions', icon: BookOpen, label: 'Decisions Ledger' },
  { href: '/app/specs', icon: FileText, label: 'Spec Synthesizer' },
  { href: '/app/standups', icon: Users, label: 'Standups' },
  { href: '/app/retros', icon: BarChart2, label: 'Retros' },
  { href: '/app/integrations', icon: Plug, label: 'Integrations' },
  { href: '/app/settings', icon: Settings, label: 'Settings' },
]

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [cmdOpen, setCmdOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--color-paper)]">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r border-[var(--color-rule)] flex flex-col">
        {/* Org header */}
        <div className="p-4 border-b border-[var(--color-rule)]">
          <button className="flex items-center gap-2 w-full hover:opacity-70 transition-opacity">
            <div className="w-6 h-6 rounded bg-[var(--color-accent)] flex items-center justify-center">
              <span className="text-white text-xs font-bold">H</span>
            </div>
            <span className="text-sm font-medium text-[var(--color-ink)]">Hartwell Robotics</span>
            <ChevronDown className="w-3 h-3 text-[var(--color-muted)] ml-auto" />
          </button>
        </div>

        {/* Cmd-K trigger */}
        <div className="px-3 py-2 border-b border-[var(--color-rule)]">
          <button
            className="flex items-center gap-2 w-full px-2 py-1.5 rounded text-xs text-[var(--color-muted)] hover:bg-[var(--color-rule)] transition-colors"
            onClick={() => setCmdOpen(true)}
          >
            <Command className="w-3 h-3" />
            <span>Quick search</span>
            <kbd className="ml-auto text-[10px] border border-[var(--color-rule)] rounded px-1">⌘K</kbd>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map(({ href, icon: Icon, label, badge }) => {
            const active = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link
                key={href}
                href={href}
                className={clsx(
                  'flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors',
                  active
                    ? 'bg-[var(--color-accent)] text-white'
                    : 'text-[var(--color-ink)] hover:bg-[var(--color-rule)]'
                )}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="flex-1">{label}</span>
                {badge && (
                  <span
                    className={clsx(
                      'text-[10px] font-medium px-1.5 py-0.5 rounded-full',
                      active ? 'bg-white/20 text-white' : 'bg-[var(--color-danger)] text-white'
                    )}
                  >
                    {badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* User footer */}
        <div className="p-3 border-t border-[var(--color-rule)]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[var(--color-accent-soft)] flex items-center justify-center text-[10px] font-medium text-[var(--color-accent)]">
              PN
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium truncate">Priya Nair</div>
              <div className="text-[10px] text-[var(--color-muted)] truncate">CTO & Co-founder</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>

      {/* Command Palette */}
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />
    </div>
  )
}
