'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, ThumbsUp, ThumbsDown, ExternalLink } from 'lucide-react'
import type { DriftEvent } from '@/types'
import { SeverityPill, StatusPill, Button } from '@/components/ui'

interface DriftDrawerProps {
  event: DriftEvent
  onClose: () => void
}

export function DriftDrawer({ event, onClose }: DriftDrawerProps) {
  const [executed, setExecuted] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  async function handleExecute(actionType: string, label: string) {
    try {
      const res = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          driftEventId: event.id,
          actionType,
          payload: event.actions.find((a) => a.type === actionType)?.payload ?? {},
          userId: 'person-002',
          workspaceId: event.workspaceId,
        }),
      })
      const data = await res.json() as { result: { ticketId?: string; prNumber?: number } }
      setExecuted(actionType)
      const resultMsg = data.result?.ticketId
        ? `Created ${data.result.ticketId} (mock)`
        : data.result?.prNumber
          ? `Opened PR #${data.result.prNumber} (mock)`
          : `${label} executed (mock)`
      setToast(resultMsg)
      setTimeout(() => setToast(null), 4000)
    } catch {
      setToast('Error executing action')
      setTimeout(() => setToast(null), 3000)
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed top-0 right-0 h-full w-[500px] bg-[var(--color-paper)] border-l border-[var(--color-rule)] z-50 overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-[var(--color-paper)] border-b border-[var(--color-rule)] px-6 py-4 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <SeverityPill severity={event.severity} />
            <StatusPill status={event.status} />
          </div>
          <button className="btn btn-ghost p-1" onClick={onClose}>
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Headline */}
          <h2 className="font-serif text-xl leading-snug">{event.headline}</h2>

          {/* Evidence */}
          <div>
            <div className="text-[10px] font-medium uppercase tracking-wider text-[var(--color-muted)] mb-2">Evidence</div>
            <p className="text-sm leading-relaxed text-[var(--color-ink)]">{event.evidence}</p>
          </div>

          {/* Node references */}
          <div>
            <div className="text-[10px] font-medium uppercase tracking-wider text-[var(--color-muted)] mb-2">Graph Nodes</div>
            <div className="flex flex-wrap gap-2">
              {event.nodeIds.map((id) => (
                <span
                  key={id}
                  className="text-xs font-mono bg-[var(--color-accent-soft)] text-[var(--color-accent)] px-2 py-1 rounded flex items-center gap-1"
                >
                  {id}
                  <ExternalLink className="w-2.5 h-2.5" />
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div>
            <div className="text-[10px] font-medium uppercase tracking-wider text-[var(--color-muted)] mb-3">Proposed Actions</div>
            <div className="space-y-2">
              {event.actions.filter((a) => a.type !== 'dismiss').map((action) => (
                <div
                  key={action.type}
                  className={`card p-3 flex items-center justify-between gap-3 ${executed === action.type ? 'border-[var(--color-success)]' : ''}`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">{action.label}</div>
                    {action.payload && Object.keys(action.payload).length > 0 && (
                      <pre className="text-[10px] text-[var(--color-muted)] mt-1 overflow-x-auto font-mono">
                        {JSON.stringify(action.payload, null, 2).slice(0, 120)}
                      </pre>
                    )}
                  </div>
                  <Button
                    variant={executed === action.type ? 'ghost' : 'primary'}
                    onClick={() => handleExecute(action.type, action.label)}
                    disabled={executed === action.type}
                  >
                    {executed === action.type ? '✓ Done' : 'Execute'}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Feedback */}
          <div>
            <div className="text-[10px] font-medium uppercase tracking-wider text-[var(--color-muted)] mb-2">Feedback</div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={() => setToast('Positive feedback recorded')}>
                <ThumbsUp className="w-3.5 h-3.5" />
                Useful
              </Button>
              <Button variant="ghost" onClick={() => setToast('Negative feedback recorded')}>
                <ThumbsDown className="w-3.5 h-3.5" />
                Not useful
              </Button>
            </div>
          </div>

          {/* Metadata */}
          <div className="card p-3 space-y-1.5 text-xs text-[var(--color-muted)]">
            <div className="flex justify-between">
              <span>Agent</span>
              <span className="font-mono text-[var(--color-accent)]">{event.agentName}</span>
            </div>
            <div className="flex justify-between">
              <span>Rule</span>
              <span className="font-mono">{event.ruleId}</span>
            </div>
            <div className="flex justify-between">
              <span>Confidence</span>
              <span className="font-mono">{Math.round(event.confidence * 100)}%</span>
            </div>
            <div className="flex justify-between">
              <span>Generated</span>
              <span className="font-mono">{new Date(event.generatedAt).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Toast */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 right-6 z-[100] bg-[var(--color-ink)] text-white text-sm px-4 py-2.5 rounded-[8px] shadow-none"
        >
          {toast}
        </motion.div>
      )}
    </>
  )
}
