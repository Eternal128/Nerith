import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getGraphStore } from '@/lib/graph/store'

const QuerySchema = z.object({
  workspaceId: z.string(),
  type: z.string().optional(),
  query: z.string().optional(),
  nodeIds: z.array(z.string()).optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as unknown
    const input = QuerySchema.parse(body)
    const store = getGraphStore()

    if (input.nodeIds) {
      const nodes = input.nodeIds.map((id) => store.getNode(id)).filter(Boolean)
      return NextResponse.json({ nodes })
    }

    if (input.query) {
      const nodes = store.search(input.query, input.workspaceId)
      return NextResponse.json({ nodes })
    }

    if (input.type) {
      const nodes = store.getNodesByType(
        input.type as Parameters<typeof store.getNodesByType>[0],
        input.workspaceId
      )
      return NextResponse.json({ nodes })
    }

    const nodes = store.getAllNodes(input.workspaceId)
    const edges = store.getAllEdges(input.workspaceId)
    return NextResponse.json({ nodes, edges, stats: store.size() })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
