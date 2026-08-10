"use client";

import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";

type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  href: string;
  image: string;
};

const PROJECTS: Project[] = [
  {
    slug: "mathopia",
    title: "Mathopia",
    description: "A game to make maths fun.",
    tags: ["Game"],
    href: "https://tamoghnadhar.vercel.app/games/mathopia.html",
    image: "/images/projects/mathopia.png",
  },
  {
    slug: "cognidbg",
    title: "CogniDBG",
    description: "The step-by-step debugger.",
    tags: ["Debugger"],
    href: "https://tamoghnadhar.vercel.app/cognidbg.html",
    image: "/images/projects/cognidbg.png",
  },
  {
    slug: "routecomps",
    title: "RouteComps_AI",
    description: "Compare every way to get there — shortest, cheapest, and most luxurious routes, side by side.",
    tags: ["AI", "Routing"],
    href: "https://routecomp.vercel.app/",
    image: "/images/projects/routecomps.png",
  },
];

export default function ProjectsHoverPreview() {
  const [hovered, setHovered] = useState<Project | null>(null);

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
            <a href={project.href} target="_blank" rel="noopener noreferrer" onMouseEnter={() => setHovered(project)} onMouseLeave={() => setHovered(null)} className="flex items-baseline justify-between gap-6 py-6 group">
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
                className="object-contain p-6"
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
