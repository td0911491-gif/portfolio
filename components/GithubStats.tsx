"use client";

import { motion } from "framer-motion";
import { GitBranch, GitCommitHorizontal, Star, Users } from "lucide-react";
import Section from "@/components/ui/Section";
import { githubUsername } from "@/data/social";

// Placeholder numbers until a real GitHub username is set in data/social.ts.
// Swap `isLive` to true once githubUsername is real — the component then
// renders the live GitHub Readme Stats card instead of the placeholder grid.
const isLive = githubUsername !== "your-username";

const placeholderStats = [
  { label: "Public Repos", value: "—", icon: GitBranch },
  { label: "Contributions", value: "—", icon: GitCommitHorizontal },
  { label: "Stars Earned", value: "—", icon: Star },
  { label: "Followers", value: "—", icon: Users }
];

export default function GithubStats() {
  return (
    <Section
      id="github"
      command="github --stats"
      title="GitHub Activity"
      subtitle={
        isLive
          ? `Live data for @${githubUsername}`
          : "Placeholder — set a real username in data/social.ts to go live."
      }
    >
      {isLive ? (
        <div className="overflow-hidden rounded border border-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://github-readme-stats.vercel.app/api?username=${githubUsername}&show_icons=true&theme=dark&hide_border=true&bg_color=121212&text_color=ededed&title_color=e5303f&icon_color=e5303f`}
            alt="GitHub stats"
            className="w-full"
          />
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {placeholderStats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded border border-dashed border-border bg-bg-elevated p-5 text-center"
            >
              <s.icon className="mx-auto mb-2 text-ink-muted" size={18} />
              <p className="text-xl font-bold text-ink-muted">{s.value}</p>
              <p className="mt-1 text-xs text-ink-muted">{s.label}</p>
            </motion.div>
          ))}
        </div>
      )}
    </Section>
  );
}
