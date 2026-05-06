export interface LintIssue {
  type: "banned_phrase" | "banned_char" | "banned_opener";
  text: string;
  suggestion?: string;
}

export interface LintResult {
  clean: string;
  issues: LintIssue[];
}

const BANNED_PHRASES = [
  /i'm excited to/gi,
  /excited about the opportunity/gi,
  /i'm passionate about/gi,
  /in today's fast-paced world/gi,
  /in today's competitive landscape/gi,
  /\bleverage\b/gi,
  /\bleveraging\b/gi,
  /\bdelve\b/gi,
  /\bdelving\b/gi,
  /i believe i would be a great fit/gi,
  /perfect candidate/gi,
  /ideal candidate/gi,
  /wealth of experience/gi,
  /track record of success/gi,
  /proven ability to/gi,
  /dynamic and results-driven/gi,
  /\bsynergy\b/gi,
  /\bsynergize\b/gi,
  /\brobust\b/gi,
  /\bseamless\b/gi,
  /\binnovative\b/gi,
  /\bcutting-edge\b/gi,
  /\btapestry\b/gi,
  /navigate the landscape/gi,
  /it is my pleasure to/gi,
  /i am writing to express/gi,
  /\bfurthermore,/gi,
  /\bmoreover,/gi,
  /\badditionally,/gi,
];

export function lintLetter(text: string): LintResult {
  const issues: LintIssue[] = [];
  let clean = text;

  // Fix em-dashes and en-dashes
  if (/\u2014/.test(clean)) {
    issues.push({ type: "banned_char", text: "em-dash (—)", suggestion: "Use a period or comma instead" });
    clean = clean.replace(/\s*\u2014\s*/g, ". ");
  }
  if (/\u2013/.test(clean)) {
    issues.push({ type: "banned_char", text: "en-dash (–)", suggestion: "Use a hyphen instead" });
    clean = clean.replace(/\u2013/g, "-");
  }

  // Fix smart quotes
  clean = clean
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2018\u2019]/g, "'");

  // Check banned phrases
  for (const pattern of BANNED_PHRASES) {
    const matches = clean.match(pattern);
    if (matches) {
      for (const match of matches) {
        issues.push({ type: "banned_phrase", text: match });
      }
    }
  }

  return { clean, issues };
}
