import { llm } from '@/lib/llm/router'
import { CARTOGRAPHER_SYSTEM, cartographerPrompt } from './prompt'
import { CartographerOutputSchema, type CartographerInput, type CartographerOutput } from './types'
import { createNode, createEdge } from '@/lib/graph/mutations'

export async function runCartographer(input: CartographerInput): Promise<CartographerOutput> {
  const response = await llm({
    system: CARTOGRAPHER_SYSTEM,
    user: cartographerPrompt(input.event as Record<string, unknown>),
    temperature: 0.1,
  })

  // In mock mode, return a deterministic mutation based on the event
  if (response.mock) {
    return getMockCartographerOutput(input)
  }

  try {
    const parsed = JSON.parse(response.content) as CartographerOutput
    const validated = CartographerOutputSchema.parse(parsed)
    applyMutations(validated, input.event.workspaceId)
    return validated
  } catch {
    return getMockCartographerOutput(input)
  }
}

function getMockCartographerOutput(input: CartographerInput): CartographerOutput {
  const mutations: CartographerOutput['mutations'] = []

  if (input.event.source === 'github' && input.event.type === 'pull_request') {
    const pr = input.event.payload as Record<string, unknown>
    mutations.push({
      op: 'upsert_node',
      node: {
        id: `pr-${pr['number']}`,
        type: 'PullRequest',
        props: { number: pr['number'], title: pr['title'], status: pr['status'] },
        workspaceId: input.event.workspaceId,
        confidence: 1.0,
      },
    })
  }

  if (input.event.source === 'slack') {
    const msg = input.event.payload as Record<string, unknown>
    mutations.push({
      op: 'upsert_node',
      node: {
        id: `msg-${msg['id']}`,
        type: 'Message',
        props: { text: msg['text'], channel: msg['channel'] },
        workspaceId: input.event.workspaceId,
        confidence: 1.0,
      },
    })
  }

  return {
    mutations,
    summary: `Processed ${input.event.source} ${input.event.type} event`,
    confidence: 0.9,
  }
}

function applyMutations(output: CartographerOutput, workspaceId: string) {
  for (const mut of output.mutations) {
    if (mut.op === 'upsert_node') {
      const n = mut.node as Record<string, unknown>
      createNode({
        id: n['id'] as string,
        type: n['type'] as Parameters<typeof createNode>[0]['type'],
        props: (n['props'] as Record<string, unknown>) ?? {},
        workspaceId,
        confidence: (n['confidence'] as number) ?? 0.9,
      })
    } else if (mut.op === 'upsert_edge') {
      const e = mut.edge as Record<string, unknown>
      createEdge({
        id: e['id'] as string | undefined,
        type: e['type'] as Parameters<typeof createEdge>[0]['type'],
        fromId: e['fromId'] as string,
        toId: e['toId'] as string,
        workspaceId,
        confidence: (e['confidence'] as number) ?? 0.9,
      })
    }
  }
}
