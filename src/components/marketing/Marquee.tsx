"use client";
import { motion } from "framer-motion";

const COMPANIES = [
  "Stripe",
  "Vercel",
  "Linear",
  "Figma",
  "Notion",
  "Anthropic",
  "GitHub",
  "Cloudflare",
  "Shopify",
  "Datadog",
  "PlanetScale",
  "Fly.io",
];

export function Marquee() {
  return (
    <div className="overflow-hidden py-8 border-y border-border">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {[...COMPANIES, ...COMPANIES].map((company, i) => (
          <span
            key={i}
            className="text-sm font-mono uppercase tracking-widest text-muted-foreground opacity-40"
          >
            {company}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
