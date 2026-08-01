"use client";

import Link from "next/link";
import { FolderGit2, ArrowUpRight } from "lucide-react";
import Section from "@/components/ui/Section";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function ProjectsPreview() {
  const preview = projects.slice(0, 3);

  return (
    <Section
      id="projects"
      command="projects/"
      title="Projects"
      subtitle="What I've been building — updated as I go."
    >
      {preview.length === 0 ? (
        <div className="rounded border border-dashed border-border p-12 text-center">
          <FolderGit2 className="mx-auto mb-3 text-ink-muted" size={24} />
          <p className="text-sm text-ink-muted">
            <span className="text-red">$</span> No projects added yet. This section fills in
            automatically the moment something is pushed to{" "}
            <code className="rounded bg-bg-elevated px-1.5 py-0.5 text-ink-secondary">
              data/projects.ts
            </code>
            .
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {preview.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      )}
      <div className="mt-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-red hover:underline"
        >
          View all projects <ArrowUpRight size={14} />
        </Link>
      </div>
    </Section>
  );
}
