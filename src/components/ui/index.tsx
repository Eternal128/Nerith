'use client'

import { clsx } from 'clsx'
import { type ReactNode } from 'react'

type PillVariant = 'neutral' | 'accent' | 'warn' | 'success' | 'danger'

export function Pill({
  variant = 'neutral',
  children,
}: {
  variant?: PillVariant
  children: ReactNode
}) {
  return (
    <span className={clsx('pill', `pill-${variant}`)}>
      {children}
    </span>
  )
}

export function SeverityPill({ severity }: { severity: 'info' | 'warn' | 'critical' }) {
  const map = {
    info: { variant: 'accent' as PillVariant, label: 'INFO' },
    warn: { variant: 'warn' as PillVariant, label: 'WARN' },
    critical: { variant: 'danger' as PillVariant, label: 'CRITICAL' },
  }
  const { variant, label } = map[severity]
  return <Pill variant={variant}>{label}</Pill>
}

export function StatusPill({ status }: { status: string }) {
  const map: Record<string, PillVariant> = {
    open: 'warn',
    accepted: 'success',
    dismissed: 'neutral',
    snoozed: 'neutral',
    active: 'success',
    superseded: 'neutral',
    contradicted: 'danger',
    draft: 'neutral',
    'in-review': 'accent',
    approved: 'success',
    published: 'success',
  }
  return <Pill variant={map[status] ?? 'neutral'}>{status}</Pill>
}

export function Card({
  children,
  className,
  onClick,
}: {
  children: ReactNode
  className?: string
  onClick?: () => void
}) {
  return (
    <div className={clsx('card p-4', className, onClick && 'cursor-none hover:border-[var(--color-accent)] transition-colors')} onClick={onClick}>
      {children}
    </div>
  )
}

export function Button({
  variant = 'secondary',
  children,
  onClick,
  disabled,
  className,
  type = 'button',
}: {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
  type?: 'button' | 'submit'
}) {
  return (
    <button
      type={type}
      className={clsx(`btn btn-${variant}`, disabled && 'opacity-50 cursor-not-allowed', className)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export function Divider() {
  return <hr className="rule my-4" />
}

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string
  subtitle?: string
  actions?: ReactNode
}) {
  return (
    <div className="flex items-start justify-between gap-4 pb-4 border-b border-[var(--color-rule)]">
      <div>
        <h1 className="text-2xl font-serif text-[var(--color-ink)]">{title}</h1>
        {subtitle && <p className="text-sm text-[var(--color-muted)] mt-1">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
    </div>
  )
}

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-10 h-10 rounded bg-[var(--color-accent-soft)] mb-4 flex items-center justify-center">
        <div className="w-3 h-3 rounded-full bg-[var(--color-accent)]" />
      </div>
      <h3 className="font-serif text-lg mb-1">{title}</h3>
      <p className="text-sm text-[var(--color-muted)] max-w-xs">{description}</p>
    </div>
  )
}
