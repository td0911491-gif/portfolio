import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { projects } from "@/data/projects";
import MediaGallery from "@/components/MediaGallery";
import ProjectCard from "@/components/ProjectCard";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return notFound();

  const related = projects.filter((p) => p.slug !== project.slug && p.category === project.category).slice(0, 3);

  const sections: { heading: string; body?: string; list?: string[] }[] = [
    { heading: "Overview", body: project.longDescription },
    { heading: "Problem Statement", body: project.problemStatement },
    { heading: "Architecture", body: project.architecture },
    { heading: "Features", list: project.features },
    { heading: "Development Timeline", body: project.timeline },
    { heading: "Challenges", list: project.challenges },
    { heading: "Lessons Learned", body: project.lessonsLearned },
    { heading: "Future Roadmap", list: project.futureImprovements }
  ].filter((s) => s.body || (s.list && s.list.length > 0));

  return (
    <div className="mx-auto max-w-4xl px-5 pb-24 pt-32">
      <Link href="/projects" className="inline-flex items-center gap-1.5 text-xs text-ink-secondary hover:text-red">
        <ArrowLeft size={13} /> Back to projects
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <span className="rounded border border-border px-2 py-0.5 text-[10px] uppercase tracking-wide text-ink-muted">
          {project.category}
        </span>
        <span className="rounded border border-border px-2 py-0.5 text-[10px] uppercase tracking-wide text-ink-muted">
          {project.status.replace("-", " ")}
        </span>
        {project.completionDate && (
          <span className="text-[10px] text-ink-muted">{formatDate(project.completionDate)}</span>
        )}
      </div>

      <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink">{project.name}</h1>
      <p className="mt-3 text-base text-ink-secondary">{project.shortDescription}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.technologies.map((t) => (
          <span key={t} className="rounded bg-bg-elevated px-2.5 py-1 text-xs text-ink-secondary">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded border border-border px-4 py-2 text-xs font-semibold text-ink-secondary hover:border-red hover:text-red">
            <Github size={13} /> GitHub
          </a>
        )}
        {project.liveDemo && (
          <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded border border-red bg-red px-4 py-2 text-xs font-semibold text-white">
