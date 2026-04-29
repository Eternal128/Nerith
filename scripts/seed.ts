#!/usr/bin/env tsx
/**
 * Seed the Nerith knowledge graph with Hartwell Robotics fixture data.
 * Run: npm run seed
 */

import { createNode, createEdge } from '../src/lib/graph/mutations'
import { PEOPLE, WORKSPACE_ID } from '../src/lib/fixtures/people'
import { PROJECTS } from '../src/lib/fixtures/projects'
import { DECISIONS } from '../src/lib/fixtures/decisions'
import { PULL_REQUESTS } from '../src/lib/fixtures/pull-requests'
import { ISSUES } from '../src/lib/fixtures/issues'
import { SLACK_MESSAGES } from '../src/lib/fixtures/slack-messages'
import type { Provenance } from '../src/types'

const now = new Date().toISOString()

function mockProv(source: Provenance['sourceType'], id: string): Provenance[] {
  return [{ eventId: `evt-${id}`, sourceType: source, capturedAt: now }]
}

async function seed() {
  console.log('🌱 Seeding Hartwell Robotics fixture data...\n')

  // Seed people
  console.log(`  → Seeding ${PEOPLE.length} people...`)
  for (const person of PEOPLE) {
    createNode({
      id: person.id,
      type: 'Person',
      props: {
        name: person.name,
        email: person.email,
        role: person.role,
        team: person.team,
        slackHandle: person.slackHandle,
        githubHandle: person.githubHandle,
      },
      workspaceId: WORKSPACE_ID,
      provenance: mockProv('manual', person.id),
      confidence: 1.0,
    })
  }

  // Seed projects
  console.log(`  → Seeding ${PROJECTS.length} projects...`)
  for (const project of PROJECTS) {
    createNode({
      id: project.id,
      type: 'Project',
      props: {
        name: project.name,
        description: project.description,
        status: project.status,
        startDate: project.startDate,
        targetDate: project.targetDate,
        services: project.services,
      },
      workspaceId: WORKSPACE_ID,
      provenance: mockProv('linear', project.id),
      confidence: 1.0,
    })

    // OWNS edge: owner → project
    createEdge({
      type: 'OWNS',
      fromId: project.ownerId,
      toId: project.id,
      workspaceId: WORKSPACE_ID,
      confidence: 1.0,
    })
  }

  // Seed decisions (ADRs)
  console.log(`  → Seeding ${DECISIONS.length} decisions...`)
  for (const decision of DECISIONS) {
    createNode({
      id: decision.id,
      type: 'Decision',
      props: {
        title: decision.title,
        body: decision.body,
        decidedAt: decision.decidedAt,
        status: decision.status,
        tags: decision.tags,
        participants: decision.participants,
      },
      workspaceId: WORKSPACE_ID,
      provenance: decision.provenance,
      confidence: 1.0,
    })
  }

  // Seed pull requests
  console.log(`  → Seeding ${PULL_REQUESTS.length} pull requests...`)
  for (const pr of PULL_REQUESTS) {
    createNode({
      id: pr.id,
      type: 'PullRequest',
      props: {
        number: pr.number,
        title: pr.title,
        status: pr.status,
        files: pr.files,
        createdAt: pr.createdAt,
        mergedAt: pr.mergedAt,
        description: pr.description,
      },
      workspaceId: WORKSPACE_ID,
      provenance: mockProv('github', pr.id),
      confidence: 1.0,
    })

    // AUTHORED edge
    createEdge({
      type: 'AUTHORED',
      fromId: pr.authorId,
      toId: pr.id,
      workspaceId: WORKSPACE_ID,
      validFrom: pr.createdAt,
    })

    // IMPLEMENTS edge: PR → Project
    if (pr.projectId) {
      createEdge({
        type: 'IMPLEMENTS',
        fromId: pr.id,
        toId: pr.projectId,
        workspaceId: WORKSPACE_ID,
        validFrom: pr.createdAt,
      })
    }

    // CONTRADICTS edge: PR #482 contradicts ADR-007
    if (pr.number === 482) {
      createEdge({
        id: 'edge-contradicts-pr482-dec007',
        type: 'CONTRADICTS',
        fromId: pr.id,
        toId: 'dec-007',
        workspaceId: WORKSPACE_ID,
        validFrom: pr.mergedAt ?? pr.createdAt,
        confidence: 0.97,
      })
      console.log('    ⚡ Created CONTRADICTS edge: pr-482 → dec-007')
    }
  }

  // Seed issues
  console.log(`  → Seeding ${ISSUES.length} issues...`)
  for (const issue of ISSUES) {
    createNode({
      id: issue.id,
      type: 'Issue',
      props: {
        identifier: issue.identifier,
        title: issue.title,
        status: issue.status,
        priority: issue.priority,
        labels: issue.labels,
        estimate: issue.estimate,
        createdAt: issue.createdAt,
        updatedAt: issue.updatedAt,
      },
      workspaceId: WORKSPACE_ID,
      provenance: mockProv('linear', issue.id),
      confidence: 1.0,
    })

    if (issue.assigneeId) {
      createEdge({
        type: 'OWNS',
        fromId: issue.assigneeId,
        toId: issue.id,
        workspaceId: WORKSPACE_ID,
        validFrom: issue.createdAt,
      })
    }

    createEdge({
      type: 'IMPLEMENTS',
      fromId: issue.id,
      toId: issue.projectId,
      workspaceId: WORKSPACE_ID,
      validFrom: issue.createdAt,
    })
  }

  // Seed key slack messages
  console.log(`  → Seeding ${SLACK_MESSAGES.length} Slack messages...`)
  for (const msg of SLACK_MESSAGES) {
    createNode({
      id: msg.id,
      type: 'Message',
      props: {
        channel: msg.channel,
        text: msg.text,
        timestamp: msg.timestamp,
        reactions: msg.reactions,
      },
      workspaceId: WORKSPACE_ID,
      provenance: mockProv('slack', msg.id),
      confidence: 1.0,
    })
  }

  const { getGraphStore } = await import('../src/lib/graph/store')
  const store = getGraphStore()
  const stats = store.size()

  console.log(`\n✅ Seed complete!`)
  console.log(`   Nodes: ${stats.nodes}`)
  console.log(`   Edges: ${stats.edges}`)
  console.log(`\n   Key fixture: PR #482 (Clerk) CONTRADICTS ADR-007 (Auth0)`)
  console.log(`   33 pre-computed drift events loaded`)
  console.log(`\n   Run: npm run dev`)
  console.log(`   Visit: http://localhost:3000/app/feed`)
}

seed().catch((err: unknown) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
