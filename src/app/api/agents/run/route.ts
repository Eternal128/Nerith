import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const AgentRunRequestSchema = z.object({
  agent: z.enum(["cartographer", "auditor", "recruiter", "interviewer", "onboarder", "coach", "pulse", "compliance-auditor"]),
  input: z.record(z.unknown()),
});

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = AgentRunRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });
  }

  const { agent, input } = parsed.data;

  try {
    let output: unknown;
    switch (agent) {
      case "cartographer": {
        const { runCartographer } = await import("@/lib/agents/cartographer/runner");
        const { CartographerInputSchema } = await import("@/lib/agents/cartographer/types");
        output = await runCartographer(CartographerInputSchema.parse(input));
        break;
      }
      case "auditor": {
        const { runAuditor } = await import("@/lib/agents/auditor/runner");
        const { AuditorInputSchema } = await import("@/lib/agents/auditor/types");
        output = await runAuditor(AuditorInputSchema.parse(input));
        break;
      }
      case "recruiter": {
        const { runRecruiter } = await import("@/lib/agents/hr/recruiter/runner");
        const { RecruiterInputSchema } = await import("@/lib/agents/hr/recruiter/types");
        output = await runRecruiter(RecruiterInputSchema.parse(input));
        break;
      }
      case "interviewer": {
        const { runInterviewer } = await import("@/lib/agents/hr/interviewer/runner");
        const { InterviewerInputSchema } = await import("@/lib/agents/hr/interviewer/types");
        output = await runInterviewer(InterviewerInputSchema.parse(input));
        break;
      }
      case "onboarder": {
        const { runOnboarder } = await import("@/lib/agents/hr/onboarder/runner");
        const { OnboarderInputSchema } = await import("@/lib/agents/hr/onboarder/types");
        output = await runOnboarder(OnboarderInputSchema.parse(input));
        break;
      }
      case "coach": {
        const { runCoach } = await import("@/lib/agents/hr/coach/runner");
        const { CoachInputSchema } = await import("@/lib/agents/hr/coach/types");
        output = await runCoach(CoachInputSchema.parse(input));
        break;
      }
      case "pulse": {
        const { runPulse } = await import("@/lib/agents/hr/pulse/runner");
        const { PulseInputSchema } = await import("@/lib/agents/hr/pulse/types");
        output = await runPulse(PulseInputSchema.parse(input));
        break;
      }
      case "compliance-auditor": {
        const { runComplianceAuditor } = await import("@/lib/agents/hr/compliance-auditor/runner");
        const { ComplianceAuditorInputSchema } = await import("@/lib/agents/hr/compliance-auditor/types");
        output = await runComplianceAuditor(ComplianceAuditorInputSchema.parse(input));
        break;
      }
      default:
        return NextResponse.json({ error: "Unknown agent" }, { status: 404 });
    }
    return NextResponse.json({ output });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
