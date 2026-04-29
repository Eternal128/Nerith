import type { Metadata } from 'next'
import './globals.css'
import { Cursor } from '@/components/Cursor'

export const metadata: Metadata = {
  title: {
    template: '%s · Nerith',
    default: 'Nerith — Closed-Loop Engineering Intelligence',
  },
  description:
    'Nerith ingests Slack, Linear, GitHub, Notion, and call transcripts, builds a live knowledge graph of intent → spec → work → outcome, and runs autonomous agents that detect drift.',
  openGraph: {
    title: 'Nerith — Closed-Loop Engineering Intelligence',
    description: 'The operating system for engineering orgs that never ships the wrong thing.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Cursor />
        {children}
      </body>
    </html>
  )
}
