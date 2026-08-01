"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import Section from "@/components/ui/Section";
import { achievements } from "@/data/achievements";
import { formatDate } from "@/lib/utils";

export default function Achievements() {
  return (
    <Section
      id="achievements"
      command="achievements.log"
      title="Achievements"
      subtitle="Hackathons, competitions, and awards."
    >
      {achievements.length === 0 ? (
        <div className="rounded border border-dashed border-border p-10 text-center">
          <Trophy className="mx-auto mb-3 text-ink-muted" size={22} />
          <p className="text-sm text-ink-muted">
            <span className="text-red">$</span> No entries yet — add one to{" "}
            <code className="rounded bg-bg-elevated px-1.5 py-0.5 text-ink-secondary">
              data/achievements.ts
            </code>{" "}
            when it happens.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded border border-border bg-bg-elevated p-5"
            >
              <Trophy className="mb-3 text-red" size={20} />
              <h3 className="text-sm font-bold text-ink">{a.title}</h3>
              {a.organization && (
                <p className="mt-1 text-xs text-ink-muted">{a.organization}</p>
              )}
              <p className="mt-1 text-xs text-ink-muted">{formatDate(a.date)}</p>
              {a.description && (
                <p className="mt-3 text-xs text-ink-secondary">{a.description}</p>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </Section>
  );
}
