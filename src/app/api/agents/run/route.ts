import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { runDriftWatcher } from '@/lib/agents/drift-watcher/runner'
import { runRetroAgent } from '@/lib/agents/retro-agent/runner'

const RequestSchema = z.object({
  agent: z.enum(['drift-watcher', 'retro-agent', 'standup-composer']),
  workspaceId: z.string(),
  params: z.record(z.unknown()).optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as unknown
    const input = RequestSchema.parse(body)

    let result: unknown

    switch (input.agent) {
      case 'drift-watcher':
        result = await runDriftWatcher({
          workspaceId: input.workspaceId,
          windowDays: (input.params?.['windowDays'] as number) ?? 30,
        })
        break
      case 'retro-agent':
        result = await runRetroAgent({
          sprintNumber: (input.params?.['sprintNumber'] as number) ?? 24,
          workspaceId: input.workspaceId,
          sprintStartDate: (input.params?.['sprintStartDate'] as string) ?? '2025-04-01',
          sprintEndDate: (input.params?.['sprintEndDate'] as string) ?? '2025-04-14',
        })
        break
      default:
        return NextResponse.json({ error: 'Agent not found' }, { status: 404 })
    }

    return NextResponse.json({ agent: input.agent, result })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
