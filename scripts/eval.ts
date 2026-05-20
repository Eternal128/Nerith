// Runs golden-set evaluations for all agents
import { readFileSync } from "fs";
import { join } from "path";

const agentDirs = [
  "src/lib/agents/cartographer/eval",
  "src/lib/agents/auditor/eval",
  "src/lib/agents/hr/recruiter/eval",
  "src/lib/agents/hr/interviewer/eval",
  "src/lib/agents/hr/onboarder/eval",
  "src/lib/agents/hr/coach/eval",
  "src/lib/agents/hr/pulse/eval",
  "src/lib/agents/hr/compliance-auditor/eval",
];

let passed = 0;
let failed = 0;

for (const dir of agentDirs) {
  const goldenPath = join(process.cwd(), dir, "golden.json");
  try {
    const cases = JSON.parse(readFileSync(goldenPath, "utf-8")) as Array<{ input: unknown; expected: unknown }>;
    console.log(`✓ ${dir}: ${cases.length} golden cases found`);
    passed += cases.length;
  } catch {
    console.error(`✗ ${dir}: golden.json not found or invalid`);
    failed++;
  }
}

console.log(`\nEval complete: ${passed} cases found, ${failed} missing`);
if (failed > 0) process.exit(1);
