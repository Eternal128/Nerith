import type { RecruiterInput, RecruiterOutput } from "./recruiter/types";
import type { InterviewerInput, InterviewerOutput } from "./interviewer/types";
import type { OnboarderInput, OnboarderOutput } from "./onboarder/types";
import type { CoachInput, CoachOutput } from "./coach/types";
import type { PulseInput, PulseOutput } from "./pulse/types";
import type { ComplianceAuditorInput, ComplianceAuditorOutput } from "./compliance-auditor/types";

async function runAgent<I, O>(agent: string, input: I): Promise<O> {
  const res = await fetch("/api/agents/run", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ agent, input }),
  });
  if (!res.ok) throw new Error(`Agent ${agent} failed: ${res.statusText}`);
  const { output } = await res.json() as { output: O };
  return output;
}

export const hrClient = {
  recruiter: (input: RecruiterInput) => runAgent<RecruiterInput, RecruiterOutput>("recruiter", input),
  interviewer: (input: InterviewerInput) => runAgent<InterviewerInput, InterviewerOutput>("interviewer", input),
  onboarder: (input: OnboarderInput) => runAgent<OnboarderInput, OnboarderOutput>("onboarder", input),
  coach: (input: CoachInput) => runAgent<CoachInput, CoachOutput>("coach", input),
  pulse: (input: PulseInput) => runAgent<PulseInput, PulseOutput>("pulse", input),
  complianceAuditor: (input: ComplianceAuditorInput) => runAgent<ComplianceAuditorInput, ComplianceAuditorOutput>("compliance-auditor", input),
};
