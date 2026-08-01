"use client";

import { useMemo, useState } from "react";
import { FolderGit2 } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

export default function ProjectsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.category)))],
    []
  );

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const matchesQuery =
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-32">
      <p className="mb-2 text-xs text-ink-muted">
        <span className="text-red">$</span> ls -la ./projects
      </p>
      <h1 className="text-3xl font-bold tracking-tight text-ink">Projects</h1>
      <p className="mt-2 max-w-xl text-sm text-ink-secondary">
        Everything here is pulled straight from a single data file — new work shows up
        the moment it's added.
      </p>

      {projects.length > 0 && (
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  "rounded border px-3 py-1.5 text-xs transition-colors",
                  category === cat
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
            placeholder="search projects..."
            className="w-full rounded border border-border bg-bg-elevated px-3 py-1.5 text-xs text-ink placeholder:text-ink-muted focus:border-red sm:w-56"
          />
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="mt-10 rounded border border-dashed border-border p-16 text-center">
          <FolderGit2 className="mx-auto mb-3 text-ink-muted" size={26} />
          <p className="text-sm text-ink-muted">
            {projects.length === 0
              ? "No projects yet. Add one to data/projects.ts and it'll show up here automatically."
              : `No projects match "${query}".`}
          </p>
        </div>
      ) : (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
