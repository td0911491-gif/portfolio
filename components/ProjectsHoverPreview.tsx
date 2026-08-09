"use client";

/**
 * ProjectsHoverPreview
 * --------------------
 * A project list styled as plain text rows (dev-terminal style). On hover,
 * a small preview image appears and follows the cursor, smoothed with a
 * spring so it trails slightly rather than snapping -- swap in for your
 * existing ProjectsPreview.tsx, or use it as a new "Projects" section.
 *
 * SETUP
 * -----
 * 1. Add a preview screenshot for each project to /public/projects/, e.g.
 *      public/projects/pydb.png
 *      public/projects/file-organizer.png
 *      public/projects/dodge-game.png
 *
 * 2. Edit the PROJECTS array below -- title, description, tags, href, and
 *    the image path (must start with "/", matching Next's /public convention).
 *
 * 3. Drop <ProjectsHoverPreview /> into app/page.tsx wherever your current
 *    <ProjectsPreview /> is (or alongside it).
 *
 * Colors are hardcoded to match the existing black/red palette
 * (#0a0a0a / #ff3b3b / #262422 / #7a7672) -- swap for your Tailwind theme
 * tokens if you have them defined, per the note in ScrollLog.tsx.
 */

import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";

type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  href: string;
  image: string; // path under /public, e.g. "/projects/pydb.png"
};

const PROJECTS: Project[] = [
  {
    slug: "pydb",
    title: "pydb — SQL engine",
    description: "A relational database built from scratch: B-tree storage, SQL parser, query executor, transactions.",
    tags: ["Python", "B-Trees", "SQL"],
    href: "#",
    image: "/projects/pydb.png",
  },
  {
    slug: "file-organizer",
    title: "File organizer CLI",
    description: "A command-line tool for searching and organizing files by type, size, and date.",
    tags: ["C", "CLI"],
    href: "#",
    image: "/projects/file-organizer.png",
  },
  {
    slug: "dodge-game",
    title: "Arcade dodge shooter",
    description: "A top-down arcade shooter built with the LÖVE framework.",
    tags: ["Lua", "LÖVE"],
    href: "#",
    image: "/projects/dodge-game.png",
  },
];

export default function ProjectsHoverPreview() {
  const [hovered, setHovered] = useState<Project | null>(null);

  // raw cursor position -> springed position, so the preview trails smoothly
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30, mass: 0.5 });

  function handleMouseMove(e: React.MouseEvent) {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  }

  return (
    <section
      id="projects"
      onMouseMove={handleMouseMove}
      className="relative px-[8vw] py-24 border-b border-[#262422]"
    >
      <p className="font-mono text-xs text-[#ff3b3b] mb-4">$ ls ./projects</p>
      <h2 className="font-mono text-3xl md:text-5xl font-black text-[#e9e6e2] mb-12">
        Selected work
      </h2>

      <ul className="border-t border-[#262422]">
        {PROJECTS.map((project) => (
          <li key={project.slug} className="border-b border-[#262422]">
            <a
              href={project.href}
              onMouseEnter={() => setHovered(project)}
              onMouseLeave={() => setHovered(null)}
              className="flex items-baseline justify-between gap-6 py-6 group"
            >
              <span
                className={`font-mono text-xl md:text-3xl font-bold transition-colors duration-200 ${
                  hovered?.slug === project.slug ? "text-[#ff3b3b]" : "text-[#e9e6e2]"
                }`}
              >
                {project.title}
              </span>
              <span className="hidden md:flex gap-2 shrink-0">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[11px] text-[#7a7672] border border-[#262422] px-2 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </span>
            </a>
          </li>
        ))}
      </ul>

      {/* floating preview image, follows the cursor */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key={hovered.slug}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              left: springX,
              top: springY,
              translateX: "24px",
              translateY: "-50%",
              pointerEvents: "none",
              zIndex: 60,
            }}
            className="w-[320px] border border-[#ff3b3b] bg-[#0a0a0a] overflow-hidden"
          >
            <div className="relative w-full aspect-video bg-[#121212]">
              <Image
                src={hovered.image}
                alt={`${hovered.title} preview`}
                fill
                sizes="320px"
                className="object-cover"
              />
            </div>
            <p className="font-mono text-xs text-[#7a7672] px-3 py-2 border-t border-[#262422]">
              {hovered.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
