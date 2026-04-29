import { DRIFT_RULES } from './rules'
import type { DriftWatcherInput, DriftWatcherOutput } from './types'

export async function runDriftWatcher(input: DriftWatcherInput): Promise<DriftWatcherOutput> {
  const allResults = []
  let rulesFired = 0

  for (const rule of DRIFT_RULES) {
    const results = rule.run(input.workspaceId, input.windowDays ?? 30)
    const fired = results.filter((r) => r.fired)
    rulesFired += fired.length
    allResults.push(...fired)
  }

  return {
    results: allResults,
    rulesRun: DRIFT_RULES.length,
    rulesFired,
    timestamp: new Date().toISOString(),
  }
}
