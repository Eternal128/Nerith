import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import { db } from "./db";

const isDemoModeActive =
  process.env.DEMO_MODE === "true" ||
  (!process.env.ANTHROPIC_API_KEY &&
    !process.env.OPENAI_API_KEY &&
    !process.env.AUTH_GOOGLE_ID);

// In demo mode auth is bypassed at the page level, so Google credentials
// are never actually used. We still need *some* value to satisfy NextAuth's
// schema validation — use clearly non-functional placeholders that will not
// accidentally succeed against Google's OAuth endpoints.
const googleClientId = process.env.AUTH_GOOGLE_ID ?? (isDemoModeActive ? "__demo__" : undefined);
const googleClientSecret = process.env.AUTH_GOOGLE_SECRET ?? (isDemoModeActive ? "__demo__" : undefined);

if (!isDemoModeActive && (!process.env.AUTH_GOOGLE_ID || !process.env.AUTH_GOOGLE_SECRET)) {
  throw new Error(
    "AUTH_GOOGLE_ID and AUTH_GOOGLE_SECRET must be set when not running in DEMO_MODE."
  );
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Google({
      clientId: googleClientId!,
      clientSecret: googleClientSecret!,
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
