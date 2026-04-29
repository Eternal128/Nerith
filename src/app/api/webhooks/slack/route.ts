import { NextRequest, NextResponse } from 'next/server'
import { runCartographer } from '@/lib/agents/cartographer/runner'

export async function POST(req: NextRequest) {
  const payload = await req.json() as Record<string, unknown>

  // Slack URL verification challenge
  if (payload['type'] === 'url_verification') {
    return NextResponse.json({ challenge: payload['challenge'] })
  }

  try {
    const result = await runCartographer({
      event: {
        id: `slack-${Date.now()}`,
        source: 'slack',
        type: (payload['type'] as string) ?? 'message',
        payload,
        workspaceId: 'ws-hartwell-001',
        receivedAt: new Date().toISOString(),
      },
    })
    return NextResponse.json({ ok: true, mutations: result.mutations.length })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
