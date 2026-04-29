import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[var(--color-paper)] flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <span className="text-[var(--color-accent)] font-serif text-xl">·</span>
            <span className="font-serif text-2xl">Nerith</span>
          </Link>
          <h1 className="font-serif text-2xl mb-2">Welcome back</h1>
          <p className="text-sm text-[var(--color-muted)]">Sign in to your workspace</p>
        </div>

        <div className="card p-6 space-y-4">
          <Link
            href="/app/feed"
            className="btn btn-primary w-full justify-center text-sm"
          >
            Continue as demo user
          </Link>

          <div className="relative">
            <hr className="rule" />
            <span className="absolute inset-x-0 -top-2.5 text-center text-xs text-[var(--color-muted)] bg-[var(--color-paper)] mx-auto w-fit px-2">
              or sign in with email
            </span>
          </div>

          <input type="email" placeholder="you@company.com" className="input" />
          <input type="password" placeholder="Password" className="input" />
          <button className="btn btn-secondary w-full justify-center text-sm">
            Sign in
          </button>
        </div>

        <p className="text-center text-xs text-[var(--color-muted)] mt-4">
          Don&#39;t have an account?{' '}
          <Link href="/request-access" className="text-[var(--color-accent)] hover:underline">
            Request access
          </Link>
        </p>
      </div>
    </div>
  )
}
