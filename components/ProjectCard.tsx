"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { Project } from "@/types";

export default function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="group flex flex-col justify-between rounded border border-border bg-bg-elevated p-5 transition-all hover:-translate-y-1 hover:border-red"
    >
      <div>
        <div className="mb-3 flex items-center justify-between">
          <span className="rounded border border-border px-2 py-0.5 text-[10px] uppercase tracking-wide text-ink-muted">
            {project.category}
          </span>
          {project.featured && <span className="text-[10px] text-red">★ featured</span>}
        </div>
        <h3 className="text-base font-bold text-ink group-hover:text-red">{project.name}</h3>
        <p className="mt-2 text-sm text-ink-secondary">{project.shortDescription}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((t) => (
            <span key={t} className="rounded bg-bg-raised px-2 py-0.5 text-[10px] text-ink-muted">
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-5 flex items-center gap-4 text-xs">
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1 font-semibold text-red hover:underline"
        >
          Details <ArrowUpRight size={12} />
        </Link>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-ink-secondary hover:text-ink"
          >
            <Github size={12} /> Code
          </a>
        )}
      </div>
    </motion.div>
  );
}
