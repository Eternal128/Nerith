export const isDemoMode =
  process.env.DEMO_MODE === "true" ||
  (!process.env.ANTHROPIC_API_KEY &&
    !process.env.OPENAI_API_KEY &&
    !process.env.AUTH_GOOGLE_ID);
