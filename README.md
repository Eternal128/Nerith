# Coverly

> Cover letters that don't read like a robot wrote them.

Coverly is a premium job application web app. Upload your resume once, generate tailored, human-sounding cover letters for every job.

## Features

- **Smart resume parsing** — Upload PDF or DOCX, extract skills and experience automatically
- **AI-powered cover letter generation** — 4 voice presets (Direct, Warm, Confident, Understated) with a lint pass that strips banned corporate-speak
- **Job board** — Browse 30+ curated roles plus live jobs from Remotive API
- **Kanban application tracker** — Drag-and-drop status board (Drafting → Sent → Interview → Offer)
- **Demo mode** — Works with zero API keys, no auth required
- **BYOK** — Bring your own Anthropic or OpenAI key

## Tech Stack

- **Next.js 15** App Router
- **Prisma** + SQLite (swappable to Postgres)
- **NextAuth v5** with Google OAuth
- **Vercel AI SDK** — supports Claude 3.5 and GPT-4o
- **Framer Motion** — custom cursor, scroll reveals, magnetic buttons
- **Tailwind v4** with `@theme inline` design tokens
- **Zod** for all IO validation

## Getting Started

```bash
npm install
cp .env.example .env
npm run db:push
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

```
DATABASE_URL="file:./dev.db"
AUTH_SECRET="your-secret"
DEMO_MODE="true"          # Set to false in production

# Optional — enables real AI generation
ANTHROPIC_API_KEY=""
OPENAI_API_KEY=""

# Optional — enables Google auth
AUTH_GOOGLE_ID=""
AUTH_GOOGLE_SECRET=""
```

When `DEMO_MODE=true` (or no API keys are set), the app runs fully offline with mock data and fixture jobs.

## LLM Priority

1. `DEMO_MODE=true` → Mock LLM (deterministic, no API call)
2. `ANTHROPIC_API_KEY` set → `claude-3-5-sonnet-20241022`
3. `OPENAI_API_KEY` set → `gpt-4o`
4. Neither → Mock LLM fallback

## Scripts

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # ESLint
npm run db:push      # Sync Prisma schema to DB
npm run db:generate  # Regenerate Prisma client
npm run db:studio    # Open Prisma Studio
```

## Project Structure

```
src/
├── app/
│   ├── (marketing)/    # Landing page
│   ├── (app)/app/      # Protected app pages
│   │   ├── page.tsx            # Dashboard
│   │   ├── apply/new/          # Cover letter generator
│   │   ├── applications/       # Kanban board
│   │   ├── jobs/               # Job browser
│   │   ├── resume/             # Resume upload
│   │   └── settings/           # Voice & API settings
│   ├── api/
│   │   ├── auth/               # NextAuth handlers
│   │   ├── letter/generate/    # Cover letter generation
│   │   ├── resume/parse/       # Resume file parsing
│   │   ├── jobs/search/        # Job search (fixtures + Remotive)
│   │   └── applications/       # CRUD for job applications
│   └── signin/
├── components/
│   ├── motion/         # CustomCursor, MagneticButton, RevealOnScroll
│   ├── marketing/      # Marquee
│   ├── ui/             # Button, Input, Card, Badge, Skeleton, Textarea
│   └── app/            # Sidebar, DemoBanner
└── lib/
    ├── cover-letter/   # generate, linter, prompt, voice
    ├── llm/            # router (Anthropic/OpenAI/Mock)
    ├── resume/         # PDF/DOCX parser
    ├── fixtures/       # 30 job fixtures (jobs.json)
    ├── auth.ts         # NextAuth config
    ├── db.ts           # Prisma client singleton
    ├── env.ts          # isDemoMode
    └── utils.ts        # cn, formatDate
```

## License

MIT
