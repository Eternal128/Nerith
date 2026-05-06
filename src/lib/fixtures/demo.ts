/** Fixture data used in demo mode — no database or auth required */

export const DEMO_RESUME_TEXT =
  "Alex Rivera\nalex@example.com · (555) 012-3456\n\nSoftware Engineer with 5 years of experience in TypeScript, React, and Node.js. " +
  "Previously at Acme Corp where I led a team of 4 engineers through a full infrastructure migration, " +
  "cutting deployment time from 12 minutes to 3 and ops overhead by 60%. " +
  "Strong background in developer tooling, distributed systems, and shipping things people actually use.\n\n" +
  "Skills: TypeScript, React, Node.js, Go, PostgreSQL, Redis, Docker, Kubernetes, AWS\n\n" +
  "Experience\n" +
  "Acme Corp — Senior Software Engineer (2021–2025)\n" +
  "- Led migration from self-managed Kubernetes to managed cloud, reducing ops overhead by 60%\n" +
  "- Built internal CLI tool used daily by 200+ engineers, cutting deployment time from 12 min to 3 min\n" +
  "- Mentored team of 4 engineers; shipped 3 major product features per quarter\n\n" +
  "StartupXYZ — Software Engineer (2019–2021)\n" +
  "- Rebuilt core API in TypeScript, reducing error rate by 40%\n" +
  "- Designed and shipped real-time notification system (WebSockets, 50k concurrent users)\n\n" +
  "Education\nState University — BS Computer Science, 2019";

export const DEMO_APPLICATIONS = [
  {
    id: "demo-1",
    company: "Vercel",
    role: "Senior Software Engineer",
    status: "interview",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    letter:
      "I've been watching Vercel's Edge Runtime work for about a year. When you shipped the v2 compiler my team tested it the day it dropped. Cut our cold starts by 40%. That's the kind of thing that makes you want to work on the tool, not just use it.\n\nI'm a TypeScript engineer, five years mostly on infrastructure and developer experience. At Acme Corp I built our internal deployment CLI from scratch. It went from a weekend prototype to something 200 engineers used every day. Median deployment time dropped from 12 minutes to 3.\n\nThe role's focus on DX is exactly where I want to be. I have opinions about this and I'd enjoy bringing them somewhere they'd get stress-tested.\n\nThanks for reading.\n\nAlex",
    jobDescText: "Build the future of the web at Vercel.",
    jobUrl: "https://vercel.com/careers",
    notes: "Had a great first call with the recruiter.",
    tags: "[]",
    userId: "demo-user",
  },
  {
    id: "demo-2",
    company: "Linear",
    role: "Product Designer",
    status: "sent",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    letter:
      "I use Linear every day. Not as a task I'm supposed to do. Because it's the only project tool that doesn't make me want to close the tab.\n\nI'm a product designer, five years in, mostly on B2B tools. At my last job I redesigned the core workflow for a 30,000-user platform. Before launch, 68% of users said the old flow was confusing. After, 91% said the new one was clear or very clear.\n\nI'm interested in the role because of where Linear seems to be heading, and I think my background in making complex systems feel simple maps well to what you're building.\n\nHappy to talk whenever.\n\nAlex",
    jobDescText: "Design tools that developers actually love.",
    jobUrl: "https://linear.app/careers",
    notes: "",
    tags: "[]",
    userId: "demo-user",
  },
  {
    id: "demo-3",
    company: "Stripe",
    role: "Staff Engineer, Infrastructure",
    status: "drafting",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    letter: "",
    jobDescText:
      "Join Stripe's infrastructure team. Work on systems that process billions of dollars in transactions.",
    jobUrl: "https://stripe.com/jobs",
    notes: "",
    tags: "[]",
    userId: "demo-user",
  },
];
