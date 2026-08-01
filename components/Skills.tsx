"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import { skills, skillCategories } from "@/data/skills";
import { cn } from "@/lib/utils";

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return skills.filter((s) => {
      const matchesCategory = activeCategory === "All" || s.category === activeCategory;
      const matchesQuery = s.name.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  return (
    <Section id="skills" command="skills.json" title="Skills" subtitle="What I've been building with so far.">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {["All", ...skillCategories].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "rounded border px-3 py-1.5 text-xs transition-colors",
                activeCategory === cat
                  ? "border-red text-red"
                  : "border-border text-ink-secondary hover:border-red hover:text-ink"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="grep skill..."
          className="w-full rounded border border-border bg-bg-elevated px-3 py-1.5 text-xs text-ink placeholder:text-ink-muted focus:border-red sm:w-48"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((skill, i) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="rounded border border-border bg-bg-elevated p-4 transition-colors hover:border-red"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-semibold text-ink">{skill.name}</span>
              <span className="text-xs text-ink-muted">{skill.category}</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-bg-raised">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full rounded-full bg-red"
              />
            </div>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-ink-muted">No skills match &quot;{query}&quot;.</p>
        )}
      </div>
    </Section>
  );
}
