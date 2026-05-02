import Link from 'next/link'

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--color-paper)]">
      <header className="border-b border-[var(--color-rule)] sticky top-0 bg-[var(--color-paper)] z-50 h-16">
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-full flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-[var(--color-accent)] font-serif text-lg">·</span>
            <span className="font-serif text-xl tracking-tight">Nerith</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <Link href="/how-it-works" className="text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors">How it works</Link>
            <Link href="/for-engineering-leaders" className="text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors">For eng leaders</Link>
            <Link href="/security" className="text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors">Security</Link>
            <Link href="/pricing" className="text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors">Pricing</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/app/feed" className="btn btn-primary text-sm">Sign in to demo</Link>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-[var(--color-rule)] py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-1.5 mb-3">
                <span className="text-[var(--color-accent)] font-serif">·</span>
                <span className="font-serif text-base">Nerith</span>
              </div>
              <p className="text-xs text-[var(--color-muted)] leading-relaxed max-w-48">
                The closed-loop operating system for engineering orgs.
              </p>
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-[0.15em] text-[var(--color-muted)] mb-4">Product</div>
              <div className="space-y-2.5 text-xs text-[var(--color-muted)]">
                <div><Link href="/how-it-works" className="hover:text-[var(--color-ink)] transition-colors">How it works</Link></div>
                <div><Link href="/for-engineering-leaders" className="hover:text-[var(--color-ink)] transition-colors">For eng leaders</Link></div>
                <div><Link href="/pricing" className="hover:text-[var(--color-ink)] transition-colors">Pricing</Link></div>
                <div><Link href="/app/feed" className="hover:text-[var(--color-ink)] transition-colors">Drift Feed</Link></div>
              </div>
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-[0.15em] text-[var(--color-muted)] mb-4">Company</div>
              <div className="space-y-2.5 text-xs text-[var(--color-muted)]">
                <div><Link href="/security" className="hover:text-[var(--color-ink)] transition-colors">Security</Link></div>
                <div><Link href="/request-access" className="hover:text-[var(--color-ink)] transition-colors">Request access</Link></div>
              </div>
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-[0.15em] text-[var(--color-muted)] mb-4">Demo</div>
              <div className="space-y-2.5 text-xs text-[var(--color-muted)]">
                <div><Link href="/app/feed" className="hover:text-[var(--color-ink)] transition-colors">Open demo</Link></div>
                <div><a href="https://github.com/Eternal128/Nerith" className="hover:text-[var(--color-ink)] transition-colors">GitHub repo</a></div>
                <div><Link href="/request-access" className="hover:text-[var(--color-ink)] transition-colors">Request access</Link></div>
              </div>
            </div>
          </div>
          <div className="pt-6 border-t border-[var(--color-rule)] flex items-center justify-between font-mono text-xs text-[var(--color-muted)]">
            <span>© 2025 Nerith, Inc.</span>
            <span>MIT License · SOC2 Type II in progress</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
