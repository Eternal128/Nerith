# DEMO.md — Demo Walkthroughs

---

## Hartwell Robotics Demo (10 steps)

**Theme:** An engineering org ships a major auth migration before the ADR is ratified, creating a CRITICAL compliance drift.

**Setup:** `npm run seed` to populate the in-memory graph with Hartwell Robotics fixture data.

### Steps

1. **Open the HR Hub** at `/app/hr`. The Live Agent Activity section shows recent drift events.

2. **Observe ADR-007** in the graph: "ADR-007: Migrate Auth to Supabase" with `status: "proposed"`. Not yet accepted.

3. **See the Slack debate node** `hw-slack-001` — 47 messages in `#engineering-arch`, mixed sentiment. The team is divided on Supabase vs rolling their own.

4. **PR #482 appears** (`hw-pr-482`): "Implement Supabase auth client" — 1,243 lines changed. It's open and linked to ADR-007.

5. **The Auditor agent fires**: It detects that PR #482 implements an auth migration before ADR-007 is in `accepted` state.

6. **CRITICAL drift event emitted**: `"PR #482 merges auth implementation before ADR-007 is accepted — decision not ratified"`. Severity: CRITICAL.

7. **The drift event appears** in the Live Agent Activity panel on `/app/hr` — highlighted in red.

8. **Navigate to Consulting** (`/app/hr/consulting`) — run a Compliance Audit. The Auditor output cites `hw-pr-482` and `hw-adr-007`.

9. **Human review gate**: The CRITICAL finding blocks automated merge. An engineer must review and either update ADR-007 to `accepted` or close PR #482.

10. **Resolution**: Update ADR-007 status to `accepted`. The drift event is resolved. The system returns to green.

---

## Nerith HR Demo — Apex Talent (6 steps)

**Theme:** A screening model is found to disadvantage female candidates, triggering a compliance investigation and policy update.

**Setup:** HR fixture is auto-seeded on page load at `/app/hr`.

### Steps

1. **Open the Marketplace** at `/app/hr/marketplace`. See 8 open requisitions and 240 AI-screened candidates from the Apex Talent fixture.

2. **Run the Compliance Auditor** at `/app/hr/consulting`. Select `auditType: "screening-bias"` for `apt-req-001`. The agent detects that female candidate pass rate is 28% below male pass rate — exceeding the EEOC 4/5ths rule.

3. **CRITICAL finding returned**: Regulation `EEOC §703`. The Compliance Auditor calls `emitDriftEvent` — node `apt-drift-001` appears in the graph with `severity: "critical"`.

4. **Slack thread surfaces** (`apt-slack-001`): "#people-ops screening model bias detected" — 31 messages. The People team is aware and escalating.

5. **ADR-HR-002 update required**: "ADR-HR-002: Adopt bias-aware screening" moves from `proposed` to `in-review`. The Recruiter agent is updated to use the bias-aware screening model.

6. **Policy updated**: `apt-policy-005` (Data Privacy & AI Use Policy) is revised to mandate bias audits before any screening model is deployed. The system returns to compliance. Human review completed and logged.
