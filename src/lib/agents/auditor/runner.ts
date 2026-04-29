import type { AuditorInput, AuditorOutput } from './types'
import { getGraphStore } from '@/lib/graph/store'

export async function runAuditor(input: AuditorInput): Promise<AuditorOutput> {
  const findings: AuditorOutput['findings'] = []
  const store = getGraphStore()

  // Check 1: Citations exist in graph
  const output = input.agentOutput
  const citationFields = ['citations', 'nodeIds', 'sourceIds']

  for (const field of citationFields) {
    const ids = output[field]
    if (!Array.isArray(ids)) continue

    for (const id of ids) {
      if (typeof id !== 'string') continue
      const node = store.getNode(id)
      if (!node) {
        findings.push({
          type: 'citation_missing',
          description: `Node ${id} referenced in ${field} does not exist in the knowledge graph`,
          severity: 'warn',
          field,
        })
      }
    }
  }

  // Check 2: Confidence threshold
  if (typeof output['confidence'] === 'number' && (output['confidence'] as number) < 0.5) {
    findings.push({
      type: 'low_confidence',
      description: `Agent output confidence ${output['confidence']} is below threshold 0.5`,
      severity: 'warn',
    })
  }

  // Check 3: Required fields present for drift events
  if (input.agentName === 'drift-watcher') {
    const requiredFields = ['headline', 'evidence', 'nodeIds']
    for (const field of requiredFields) {
      if (!output[field]) {
        findings.push({
          type: 'claim_unsupported',
          description: `Required field '${field}' missing from drift-watcher output`,
          severity: 'error',
          field,
        })
      }
    }
  }

  const errors = findings.filter((f) => f.severity === 'error')
  const warns = findings.filter((f) => f.severity === 'warn')

  const score = Math.max(0, 1 - errors.length * 0.3 - warns.length * 0.1)
  const recommendation = errors.length > 0 ? 'reject' : warns.length > 2 ? 'review' : 'approve'

  return {
    passed: errors.length === 0,
    findings,
    score,
    recommendation,
  }
}
