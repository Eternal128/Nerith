import { NextRequest, NextResponse } from "next/server";
import { parseResumeFile } from "@/lib/resume/parse";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { isDemoMode } from "@/lib/env";

export async function POST(req: NextRequest) {
  let userId = "demo-user";

  if (!isDemoMode) {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    userId = session.user.id;
  }

  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const { rawText, parsed } = await parseResumeFile(buffer, file.type);

  if (!isDemoMode) {
    await db.resume.upsert({
      where: { userId },
      create: { userId, rawText, parsed: JSON.stringify(parsed) },
      update: { rawText, parsed: JSON.stringify(parsed) },
    });
  }

  return NextResponse.json({ parsed, rawText: rawText.slice(0, 500) });
}
