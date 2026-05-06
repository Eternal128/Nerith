import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import { db } from "./db";

const isDemoModeActive =
  process.env.DEMO_MODE === "true" ||
  (!process.env.ANTHROPIC_API_KEY &&
    !process.env.OPENAI_API_KEY &&
    !process.env.AUTH_GOOGLE_ID);

// Validate at module init so a misconfigured non-demo deployment surfaces the
// problem at server startup rather than silently failing during an auth flow.
if (!isDemoModeActive && (!process.env.AUTH_GOOGLE_ID || !process.env.AUTH_GOOGLE_SECRET)) {
  // Log rather than throw so Next.js can still render the error page instead of
  // crashing the process entirely. Auth will fail naturally when the user tries
  // to sign in with an invalid OAuth client.
  console.error(
    "[auth] AUTH_GOOGLE_ID and AUTH_GOOGLE_SECRET must be set when not running in DEMO_MODE. " +
      "Authentication will fail until these are configured."
  );
}

// In demo mode auth is bypassed at the page level, so Google credentials
// are never actually used. We still need *some* value to satisfy NextAuth's
// schema validation — use clearly non-functional placeholders that will not
// accidentally succeed against Google's OAuth endpoints.
const googleClientId =
  process.env.AUTH_GOOGLE_ID ?? (isDemoModeActive ? "__demo__" : "");
const googleClientSecret =
  process.env.AUTH_GOOGLE_SECRET ?? (isDemoModeActive ? "__demo__" : "");

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Google({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
  ],
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
});
