import { describe, it, expect } from 'vitest'
import { DRIFT_RULES } from '../src/lib/agents/drift-watcher/rules'
import { DRIFT_EVENTS } from '../src/lib/fixtures/drift-events'

describe('Drift rules', () => {
  it('at least 6 drift rules are defined', () => {
    expect(DRIFT_RULES.length).toBeGreaterThanOrEqual(6)
  })

  it('rule-issue-no-commits fires on in-progress issues without PRs', () => {
    const rule = DRIFT_RULES.find((r) => r.id === 'rule-issue-no-commits')
    expect(rule).toBeDefined()
    const results = rule!.run('ws-hartwell-001', 30)
    expect(results.length).toBeGreaterThan(0)
  })

  it('rule-pr-no-issue fires on PRs without linked issues', () => {
    const rule = DRIFT_RULES.find((r) => r.id === 'rule-pr-no-issue')
    expect(rule).toBeDefined()
    const results = rule!.run('ws-hartwell-001', 90)
    expect(results.length).toBeGreaterThan(0)
    const prNums = results.map((r) => r.headline.match(/PR #(\d+)/)?.[1]).filter(Boolean)
    expect(prNums).toContain('482')
  })

  it('rule-pr-contradicts-adr fires as CRITICAL on PR #482 vs ADR-007', () => {
    const rule = DRIFT_RULES.find((r) => r.id === 'rule-pr-contradicts-adr')
    expect(rule).toBeDefined()
    const results = rule!.run('ws-hartwell-001', 30)
    const hit = results.find((r) => r.headline.includes('#482'))
    expect(hit).toBeDefined()
    expect(hit?.severity).toBe('critical')
    expect(hit?.confidence).toBeGreaterThan(0.9)
  })

  it('all drift rules have required fields', () => {
    for (const rule of DRIFT_RULES) {
      expect(rule.id).toBeDefined()
      expect(rule.name).toBeDefined()
      expect(typeof rule.run).toBe('function')
    }
  })
})

describe('Drift event fixtures', () => {
  it('at least 30 drift events are defined', () => {
    expect(DRIFT_EVENTS.length).toBeGreaterThanOrEqual(30)
  })

  it('all drift events have required fields', () => {
    for (const event of DRIFT_EVENTS) {
      expect(event.id).toBeDefined()
      expect(event.headline).toBeTruthy()
      expect(event.evidence).toBeTruthy()
      expect(event.confidence).toBeGreaterThan(0)
      expect(event.actions.length).toBeGreaterThan(0)
    }
  })

  it('headline PR #482 drift event is CRITICAL', () => {
    const ev = DRIFT_EVENTS.find((e) => e.headline.includes('#482') && e.severity === 'critical')
    expect(ev).toBeDefined()
    expect(ev?.ruleId).toBe('rule-pr-contradicts-adr')
  })
})
