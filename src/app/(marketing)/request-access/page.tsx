'use client'

import { useState } from 'react'

export default function RequestAccessPage() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="max-w-lg mx-auto px-6 py-16">
      <div className="mb-8">
        <h1 className="font-serif text-4xl mb-4">Request early access</h1>
        <p className="text-lg text-[var(--color-muted)]">
          We&#39;re onboarding 50 engineering teams in 2025. Tell us about your org.
        </p>
      </div>

      {submitted ? (
        <div className="card p-6 text-center">
          <div className="font-serif text-xl mb-2">You&#39;re on the list.</div>
          <p className="text-sm text-[var(--color-muted)]">
            We&#39;ll be in touch within 48 hours. In the meantime, explore the demo.
          </p>
        </div>
      ) : (
        <form
          className="space-y-4"
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
              <label className="block text-xs font-medium mb-1.5">{label}</label>
              <input type={type} name={name} placeholder={placeholder} required className="input" />
            </div>
          ))}

          <div>
            <label className="block text-xs font-medium mb-1.5">What&#39;s your biggest context problem?</label>
            <textarea
              name="problem"
              rows={3}
              className="input resize-none"
              placeholder="Decisions aren't tracked. Sales commits to things engineering doesn't know about. Our retros are archaeology sessions..."
            />
          </div>

          <button type="submit" className="btn btn-primary w-full justify-center">
            Request access
          </button>

          <p className="text-xs text-center text-[var(--color-muted)]">
            No spam. We review every application personally.
          </p>
        </form>
      )}
    </div>
  )
}
