import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Marquee } from "@/components/marketing/Marquee";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="pt-14">
      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center px-6 max-w-7xl mx-auto">
        <RevealOnScroll>
          <p className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-8">
            Cover letters, redesigned
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <h1 className="text-[clamp(3rem,10vw,9rem)] font-serif font-light leading-[0.9] tracking-tight">
            Cover letters
            <br />
            that don&apos;t
            <br />
            <em className="italic text-accent">sound like</em>
            <br />a robot.
          </h1>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <p className="mt-10 text-lg text-muted-foreground max-w-md leading-relaxed">
            Upload your resume once. For every job, we write a cover letter that
            sounds like you - not ChatGPT.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.3}>
          <div className="mt-10 flex items-center gap-4">
            <Link href="/app">
              <MagneticButton className="bg-foreground text-background h-12 px-8 text-sm font-medium rounded-lg hover:opacity-80 transition-opacity">
                Start for free
              </MagneticButton>
            </Link>
            <span className="text-sm text-muted-foreground">
              No credit card required
            </span>
          </div>
        </RevealOnScroll>
      </section>

      {/* Marquee */}
      <Marquee />

      {/* How it works */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <RevealOnScroll>
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-serif font-light mb-20">
            How it works
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              number: "01",
              title: "Upload your resume",
              body: "Drag and drop your PDF or DOCX. We extract your experience, skills, and writing style automatically.",
            },
            {
              number: "02",
              title: "Paste the job description",
              body: "Drop in a job URL or paste the description. We read the role requirements and company context.",
            },
            {
              number: "03",
              title: "Get a letter that sounds like you",
              body: "We generate a cover letter with contractions, varied sentence length, and zero corporate-speak. Then you edit.",
            },
          ].map((step, i) => (
            <RevealOnScroll key={i} delay={i * 0.1}>
              <div className="border border-border rounded-xl p-8 h-full">
                <p className="text-4xl font-mono text-muted-foreground/40 mb-6">
                  {step.number}
                </p>
                <h3 className="text-xl font-serif mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.body}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* Anti-AI section */}
      <section className="py-32 px-6 bg-foreground text-background">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <p className="text-sm font-mono uppercase tracking-widest opacity-40 mb-8">
              The difference
            </p>
          </RevealOnScroll>
          <div className="grid md:grid-cols-2 gap-16">
            <RevealOnScroll>
              <div>
                <p className="text-sm font-mono uppercase tracking-widest text-red-400 mb-4">
                  ❌ What AI usually writes
                </p>
                <div className="border border-background/20 rounded-lg p-6 text-sm leading-relaxed opacity-60 line-through">
                  I am writing to express my enthusiastic interest in the
                  Software Engineer position at Vercel. I am passionate about
                  leveraging cutting-edge technologies to drive innovative
                  solutions. With a robust track record of success and proven
                  ability to deliver results, I believe I would be an ideal
                  candidate...
                </div>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <div>
                <p className="text-sm font-mono uppercase tracking-widest text-green-400 mb-4">
                  ✅ What Coverly writes
                </p>
                <div className="border border-background/20 rounded-lg p-6 text-sm leading-relaxed">
                  I&apos;ve been watching Vercel&apos;s Edge Runtime work for
                  about a year. When you shipped the v2 compiler - my team
                  tested it the day it dropped. Cut our cold starts by 40%.
                  That&apos;s the kind of thing that makes you want to work on
                  the tool, not just use it.
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-32 px-6 max-w-7xl mx-auto" id="pricing">
        <RevealOnScroll>
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-serif font-light mb-20">
            Simple pricing
          </h2>
        </RevealOnScroll>
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl">
          {[
            {
              name: "Free",
              price: "$0",
              description: "For occasional job seekers",
              features: [
                "3 cover letters / month",
                "Resume parsing",
                "4 voice presets",
                "PDF export",
              ],
              highlighted: false,
            },
            {
              name: "Pro",
              price: "$9",
              description: "For active job seekers",
              features: [
                "Unlimited cover letters",
                "Job tracker Kanban",
                "Job browsing",
                "Priority generation",
                "BYOK (bring your own key)",
              ],
              highlighted: true,
            },
          ].map((plan) => (
            <RevealOnScroll key={plan.name}>
              <div
                className={`border rounded-xl p-8 ${plan.highlighted ? "border-foreground" : "border-border"}`}
              >
                <h3 className="text-2xl font-serif mb-1">{plan.name}</h3>
                <p className="text-3xl font-mono font-light mb-2">
                  {plan.price}
                  <span className="text-sm text-muted-foreground">/mo</span>
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  {plan.description}
                </p>
                <ul className="space-y-2 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="text-sm flex items-center gap-2">
                      <span className="text-accent">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full h-10 rounded-md text-sm font-medium transition-opacity hover:opacity-80 ${plan.highlighted ? "bg-foreground text-background" : "border border-border"}`}
                >
                  Get started
                </button>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="font-serif italic">Coverly</span>
          <p className="text-sm text-muted-foreground">MIT License · 2025</p>
        </div>
      </footer>
    </main>
  );
}
