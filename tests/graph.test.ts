import { describe, it, expect, beforeEach } from 'vitest'
import { createNode, createEdge } from '../src/lib/graph/mutations'
import { getGraphStore } from '../src/lib/graph/store'

beforeEach(() => {
  const store = getGraphStore()
  // @ts-expect-error test cleanup
  store.nodes = new Map()
  // @ts-expect-error test cleanup
  store.edges = new Map()
})

describe('Graph mutations', () => {
  it('createNode creates a node with correct properties', () => {
    const node = createNode({ type: 'Decision', props: { title: 'Use Auth0' }, workspaceId: 'ws-test' })
    expect(node.id).toBeDefined()
    expect(node.type).toBe('Decision')
    expect(node.props['title']).toBe('Use Auth0')
    expect(node.workspaceId).toBe('ws-test')
    expect(node.confidence).toBe(1.0)
  })

  it('createNode with explicit ID is idempotent', () => {
    createNode({ id: 'dec-007', type: 'Decision', props: { title: 'ADR-007' }, workspaceId: 'ws-test' })
    createNode({ id: 'dec-007', type: 'Decision', props: { title: 'ADR-007 updated' }, workspaceId: 'ws-test' })
    const node = getGraphStore().getNode('dec-007')
    expect(node?.props['title']).toBe('ADR-007 updated')
  })

  it('createEdge creates an edge', () => {
    createNode({ id: 'pr-001', type: 'PullRequest', props: {}, workspaceId: 'ws-test' })
    createNode({ id: 'dec-001', type: 'Decision', props: {}, workspaceId: 'ws-test' })
    const edge = createEdge({ type: 'CONTRADICTS', fromId: 'pr-001', toId: 'dec-001', workspaceId: 'ws-test' })
    expect(edge.type).toBe('CONTRADICTS')
    expect(edge.fromId).toBe('pr-001')
  })

  it('getNeighbors returns connected nodes', () => {
    createNode({ id: 'person-001', type: 'Person', props: { name: 'Priya' }, workspaceId: 'ws-test' })
    createNode({ id: 'pr-001', type: 'PullRequest', props: {}, workspaceId: 'ws-test' })
    createEdge({ type: 'AUTHORED', fromId: 'person-001', toId: 'pr-001', workspaceId: 'ws-test' })
    const neighbors = getGraphStore().getNeighbors('person-001', 'ws-test')
    expect(neighbors.length).toBe(1)
    expect(neighbors[0].node.id).toBe('pr-001')
  })

  it('search finds nodes by props content', () => {
    createNode({ id: 'dec-007', type: 'Decision', props: { title: 'ADR-007: Auth0 provider' }, workspaceId: 'ws-test' })
    createNode({ id: 'pr-482', type: 'PullRequest', props: { title: 'feat: Clerk integration' }, workspaceId: 'ws-test' })
    const results = getGraphStore().search('auth0', 'ws-test')
    expect(results.some((n) => n.id === 'dec-007')).toBe(true)
    expect(results.some((n) => n.id === 'pr-482')).toBe(false)
  })

  it('workspace isolation works', () => {
    createNode({ id: 'node-a', type: 'Person', props: {}, workspaceId: 'ws-a' })
    createNode({ id: 'node-b', type: 'Person', props: {}, workspaceId: 'ws-b' })
    const wsANodes = getGraphStore().getAllNodes('ws-a')
    expect(wsANodes.every((n) => n.workspaceId === 'ws-a')).toBe(true)
    expect(wsANodes.some((n) => n.id === 'node-b')).toBe(false)
  })
})
