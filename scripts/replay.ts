#!/usr/bin/env tsx
/**
 * Replay Hartwell Robotics event stream for live demo.
 * Run: npm run replay (in a separate terminal while dev is running)
 */

import { SLACK_MESSAGES } from '../src/lib/fixtures/slack-messages'
import { PULL_REQUESTS } from '../src/lib/fixtures/pull-requests'

const INTERVAL_SECONDS = parseInt(process.env['REPLAY_INTERVAL_SECONDS'] ?? '10', 10)
const API_URL = process.env['NEXT_PUBLIC_APP_URL'] ?? 'http://localhost:3000'

const EVENTS = [
  ...SLACK_MESSAGES.slice(0, 10).map((msg) => ({
    type: 'slack.message',
    summary: `#${msg.channel}: ${msg.text.slice(0, 60)}`,
    webhook: `${API_URL}/api/webhooks/slack`,
    payload: { type: 'event_callback', event: { type: 'message', ...msg } },
  })),
  ...PULL_REQUESTS.slice(0, 5).map((pr) => ({
    type: 'github.pull_request',
    summary: `PR #${pr.number}: ${pr.title}`,
    webhook: `${API_URL}/api/webhooks/github`,
    payload: { action: pr.status === 'merged' ? 'closed' : 'opened', pull_request: pr },
  })),
]

let eventIndex = 0

async function sendEvent() {
  const event = EVENTS[eventIndex % EVENTS.length]
  eventIndex++
  console.log(`\n[${new Date().toLocaleTimeString()}] 📨 ${event.type}`)
  console.log(`   ${event.summary}`)
  try {
    const res = await fetch(event.webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-github-event': 'pull_request' },
      body: JSON.stringify(event.payload),
    })
    const data = await res.json() as Record<string, unknown>
    if (data['ok']) console.log(`   ✅ Processed (${data['mutations'] ?? 0} mutations)`)
  } catch {
    console.log(`   ⚠️  Server not running at ${API_URL}`)
  }
}

async function main() {
  console.log('\n🎬 Nerith Replay Stream')
  console.log(`   Sending events every ${INTERVAL_SECONDS}s → ${API_URL}`)
  console.log('   Press Ctrl+C to stop\n')
  await sendEvent()
  setInterval(sendEvent, INTERVAL_SECONDS * 1000)
}

main().catch(console.error)
