export interface ParsedResume {
  name: string;
  email: string;
  phone: string;
  location: string;
  skills: string[];
  experience: Array<{
    company: string;
    role: string;
    duration: string;
    bullets: string[];
  }>;
  education: Array<{
    institution: string;
    degree: string;
    year: string;
  }>;
}

export async function parseResumeFile(
  buffer: Buffer,
  mimeType: string
): Promise<{ rawText: string; parsed: ParsedResume }> {
  let rawText = "";

  if (mimeType === "application/pdf") {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pdfParseModule = await import("pdf-parse") as any;
      const pdfParse = pdfParseModule.default ?? pdfParseModule;
      const data = await pdfParse(buffer);
      rawText = data.text;
    } catch {
      rawText = buffer.toString("utf-8");
    }
  } else if (
    mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    mimeType === "application/msword"
  ) {
    const mammoth = await import("mammoth");
    const result = await mammoth.extractRawText({ buffer });
    rawText = result.value;
  } else {
    rawText = buffer.toString("utf-8");
  }

  const parsed = extractStructuredData(rawText);
  return { rawText, parsed };
}

function extractStructuredData(text: string): ParsedResume {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);

  const emailMatch = text.match(/[\w.+-]+@[\w-]+\.[a-z]{2,}/i);
  const email = emailMatch ? emailMatch[0] : "";

  const phoneMatch = text.match(/(\+?[\d\s\-().]{10,20})/);
  const phone = phoneMatch ? phoneMatch[0].trim() : "";

  const name = lines[0] ?? "";

  const skillsIdx = lines.findIndex((l) =>
    /^(skills|technologies|technical skills|core competencies)/i.test(l)
  );
  const skills: string[] = [];
  if (skillsIdx !== -1) {
    const skillText = lines.slice(skillsIdx + 1, skillsIdx + 5).join(" ");
    skills.push(
      ...skillText
        .split(/[,|•·\t]/)
        .map((s) => s.trim())
        .filter((s) => s.length > 1 && s.length < 40)
        .slice(0, 20)
    );
  }

  return {
    name,
    email,
    phone,
    location: "",
    skills,
    experience: [],
    education: [],
  };
}
