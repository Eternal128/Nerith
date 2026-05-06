import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { generateCoverLetter } from "@/lib/cover-letter/generate";
import { isDemoMode } from "@/lib/env";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

const DEMO_RESUME_TEXT =
  "Software engineer with 5 years of experience in TypeScript, React, and Node.js. Previously at Acme Corp where I led a team of 4 engineers.";

const GenerateSchema = z.object({
  company: z.string().min(1),
  role: z.string().min(1),
  jobDescription: z.string().min(10),
  hiringManager: z.string().optional(),
  voice: z
    .enum(["direct", "warm", "confident", "understated"])
    .default("direct"),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = GenerateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  let resumeText = DEMO_RESUME_TEXT;
  let voiceNotes: string | null = null;

  if (!isDemoMode) {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const resume = await db.resume.findUnique({
      where: { userId: session.user.id },
    });
    if (resume) {
      resumeText = resume.rawText;
    }

    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: { voiceNotes: true },
    });
    voiceNotes = user?.voiceNotes ?? null;
  }

  const letter = await generateCoverLetter({
    resumeText,
    company: parsed.data.company,
    role: parsed.data.role,
    jobDescription: parsed.data.jobDescription,
    hiringManager: parsed.data.hiringManager,
    voice: parsed.data.voice,
    voiceNotes,
  });

  return NextResponse.json({ letter });
}
