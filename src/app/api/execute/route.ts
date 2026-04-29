import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { runExecutor, getAuditLog } from '@/lib/agents/executor/runner'

const RequestSchema = z.object({
  driftEventId: z.string(),
  actionType: z.enum(['open_pr', 'file_ticket', 'update_doc', 'dm_owner', 'dismiss', 'snooze']),
  payload: z.record(z.unknown()),
  userId: z.string(),
  workspaceId: z.string(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as unknown
    const input = RequestSchema.parse(body)

    const result = await runExecutor({
      ...input,
      approved: true,
    })

    return NextResponse.json(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}

export async function GET() {
  const log = getAuditLog()
  return NextResponse.json({ log, count: log.length })
}
