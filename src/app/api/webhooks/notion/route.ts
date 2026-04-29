import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const payload = await req.json() as Record<string, unknown>
  console.log('[notion webhook]', payload['type'])
  return NextResponse.json({ ok: true })
}
