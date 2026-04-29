'use client'

import { motion } from 'framer-motion'
import { formatDistanceToNow } from 'date-fns'
import { SeverityPill, StatusPill } from '@/components/ui'
import type { DriftEvent } from '@/types'

interface DriftCardProps {
  event: DriftEvent
  onSelect: () => void
}

export function DriftCard({ event, onSelect }: DriftCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="card p-4 hover:border-[var(--color-accent)] transition-colors cursor-none"
      onClick={onSelect}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <SeverityPill severity={event.severity} />
          <StatusPill status={event.status} />
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] font-mono text-[var(--color-muted)]">
            {Math.round(event.confidence * 100)}% confidence
          </span>
          <span className="text-[10px] text-[var(--color-muted)]">
            {formatDistanceToNow(new Date(event.generatedAt), { addSuffix: true })}
          </span>
        </div>
      </div>

      {/* Headline */}
      <h3 className="font-serif text-[var(--color-ink)] mb-1.5 leading-snug">
        {event.headline}
      </h3>

      {/* Evidence */}
      <p className="text-xs text-[var(--color-muted)] leading-relaxed mb-3 line-clamp-2">
        {event.evidence}
      </p>

      {/* Node chips */}
      <div className="flex items-center gap-1.5 mb-3 flex-wrap">
        {event.nodeIds.slice(0, 5).map((id) => (
          <span
            key={id}
            className="text-[10px] font-mono bg-[var(--color-accent-soft)] text-[var(--color-accent)] px-2 py-0.5 rounded"
          >
            {id}
          </span>
        ))}
        {event.nodeIds.length > 5 && (
          <span className="text-[10px] text-[var(--color-muted)]">+{event.nodeIds.length - 5} more</span>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 flex-wrap border-t border-[var(--color-rule)] pt-3">
        {event.actions.slice(0, 4).map((action) => (
          <button
            key={action.type}
            className="btn btn-ghost text-[11px] py-1 px-2 h-6"
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            {action.label}
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-2 pt-2 border-t border-[var(--color-rule)] flex items-center gap-2 text-[10px] text-[var(--color-muted)]">
        <span className="font-mono text-[var(--color-accent)]">{event.agentName}</span>
        <span>·</span>
        <span className="font-mono">{event.ruleId}</span>
      </div>
    </motion.div>
  )
}
