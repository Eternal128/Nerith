'use client'

import { useState } from 'react'

export default function RequestAccessPage() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <div>
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="max-w-md">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-muted)] mb-4">REQUEST ACCESS</p>
            <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-4">
              Request early access
            </h1>
            <p className="text-base leading-relaxed text-[var(--color-ink)]/70 mb-10">
              We&apos;re onboarding 50 engineering teams in 2025. We review every application personally.
            </p>

            {submitted ? (
              <div className="bg-[var(--color-paper)] border border-[var(--color-rule)] rounded-lg p-8">
                <div className="font-serif text-2xl mb-3">You&apos;re on the list.</div>
                <p className="text-sm text-[var(--color-ink)]/70">
                  We&apos;ll be in touch within 48 hours. In the meantime, explore the demo.
                </p>
                <a href="/app/feed" className="btn btn-primary mt-6 inline-flex">Open the demo →</a>
              </div>
            ) : (
              <form
                className="space-y-8"
                onSubmit={(e) => {
                  e.preventDefault()
                  setSubmitted(true)
                }}
              >
                {[
                  { label: 'Full name', name: 'name', type: 'text', placeholder: 'Priya Nair' },
                  { label: 'Work email', name: 'email', type: 'email', placeholder: 'priya@company.com' },
                  { label: 'Company', name: 'company', type: 'text', placeholder: 'Hartwell Robotics' },
                  { label: 'Engineering team size', name: 'teamSize', type: 'text', placeholder: '20–50' },
                ].map(({ label, name, type, placeholder }) => (
                  <div key={name}>
                    <label className="block text-xs font-mono uppercase tracking-[0.12em] text-[var(--color-muted)] mb-2">{label}</label>
                    <input
                      type={type}
                      name={name}
                      placeholder={placeholder}
                      required
                      className="w-full bg-transparent border-b border-[var(--color-rule)] focus:border-[var(--color-ink)] py-2 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-muted)] outline-none transition-colors"
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-xs font-mono uppercase tracking-[0.12em] text-[var(--color-muted)] mb-2">
                    What&apos;s your biggest context problem?
                  </label>
                  <textarea
                    name="problem"
                    rows={4}
                    className="w-full bg-transparent border-b border-[var(--color-rule)] focus:border-[var(--color-ink)] py-2 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-muted)] outline-none transition-colors resize-none"
                    placeholder="Decisions aren't tracked. Sales commits to things engineering doesn't know about. Our retros are archaeology sessions..."
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Request access →
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
