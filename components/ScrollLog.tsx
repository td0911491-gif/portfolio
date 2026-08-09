"use client";

/**
 * ScrollLog
 * ---------
 * A dev-terminal styled scroll indicator, built for a black/red palette
 * portfolio. Two pieces, exported separately so you can use either alone:
 *
 *   <ScrollProgressBar />              -> fixed top bar: [███-------] 42%
 *   <GitLogNav sections={SECTIONS} />  -> fixed left nav styled like `git log --oneline`,
 *                                          highlights the section currently in view
 *
 * Or use <ScrollLog sections={SECTIONS} /> to get both together, matching
 * the combined behavior from the original demo.
 *
 * ---------------------------------------------------------------------
 * SETUP
 * ---------------------------------------------------------------------
 * 1. Each section on the page needs a matching `id` attribute:
 *
 *      <section id="hero">...</section>
 *      <section id="about">...</section>
 *
 * 2. Pass the same ids in, in top-to-bottom order, with a short fake commit
 *    hash and label for flavor:
 *
 *      const SECTIONS = [
 *        { id: "hero",     hash: "a1f9c2", label: "init: hero" },
 *        { id: "about",    hash: "7b3e01", label: "feat: about" },
 *        { id: "projects", hash: "e4d820", label: "feat: projects" },
 *        { id: "contact",  hash: "c09f11", label: "chore: contact" },
 *      ];
 *
 * 3. Drop <ScrollLog sections={SECTIONS} /> once near the root of your page
 *    (e.g. in app/page.tsx, as a sibling of your sections -- it's `fixed`,
 *    so placement in the DOM doesn't matter).
 *
 * ---------------------------------------------------------------------
 * MATCHING YOUR PALETTE
 * ---------------------------------------------------------------------
 * The colors below are hardcoded to the black/red palette from the demo
 * (#0a0a0a / #ff3b3b). If you already have these as Tailwind theme tokens
 * (e.g. `background` / `brand-red` in tailwind.config), swap the className
 * strings marked below for your token names instead of the arbitrary
 * `[#hex]` values, so this stays in sync if the palette ever shifts.
 *
 * Font: assumes `font-mono` resolves to your dev-terminal monospace
 * (e.g. IBM Plex Mono) via tailwind.config's fontFamily.mono.
 */

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

export type ScrollLogSection = {
  id: string;
  hash: string;
  label: string;
};

// -----------------------------------------------------------------------
// shared scroll-tracking hook
// -----------------------------------------------------------------------
function useScrollProgress(sectionIds: string[]) {
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");
  const [scrolled, setScrolled] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    function measure() {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const pct = max > 0 ? Math.min(100, Math.round((doc.scrollTop / max) * 100)) : 0;
      setProgress(pct);
      setScrolled(doc.scrollTop > 40);

      let current = sectionIds[0] ?? "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight * 0.5) current = id;
      }
      setActiveId(current);
      ticking.current = false;
    }

    function onScroll() {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(measure);
      }
    }

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sectionIds]);

  return { progress, activeId, scrolled };
}

// -----------------------------------------------------------------------
// ScrollProgressBar — fixed top bar: scroll.log [███-------] 42%
// -----------------------------------------------------------------------
export function ScrollProgressBar({
  sectionIds,
  label = "scroll.log",
}: {
  sectionIds: string[];
  label?: string;
}) {
  const { progress, scrolled } = useScrollProgress(sectionIds);
  const filled = Math.round(progress / 10);
  const bar = `[${"█".repeat(filled)}${"-".repeat(10 - filled)}] ${progress}%`;

  return (
    <motion.div
      initial={false}
      animate={{ opacity: scrolled ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 h-9",
        "flex items-center gap-3 px-5",
        "border-b border-[#262422] bg-[#0a0a0a]/85 backdrop-blur-sm",
        "font-mono text-xs text-[#7a7672] pointer-events-none"
      )}
      style={{ pointerEvents: scrolled ? "auto" : "none" }}
    >
      <span>{label}</span>
      <span className="text-[#ff3b3b] tracking-wider">{bar}</span>
    </motion.div>
  );
}

// -----------------------------------------------------------------------
// GitLogNav — fixed left nav styled like `git log --oneline`
// -----------------------------------------------------------------------
export function GitLogNav({ sections }: { sections: ScrollLogSection[] }) {
  const sectionIds = sections.map((s) => s.id);
  const { activeId } = useScrollProgress(sectionIds);

  function goTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <nav
      aria-label="Section navigation"
      className={clsx(
        "fixed left-6 top-1/2 -translate-y-1/2 z-40",
        "hidden lg:flex flex-col gap-0.5",
        "font-mono text-[11px] text-[#7a7672]"
      )}
    >
      {sections.map((s) => {
        const active = s.id === activeId;
        return (
          <button
            key={s.id}
            onClick={() => goTo(s.id)}
            aria-current={active ? "true" : undefined}
            className={clsx(
              "text-left whitespace-nowrap px-2.5 py-1.5 border-l-2 transition-all duration-200",
              active
                ? "border-[#ff3b3b] text-[#e9e6e2] opacity-100"
                : "border-[#262422] opacity-50 hover:opacity-100"
            )}
          >
            <span className="text-[#ff3b3b] mr-2">{s.hash}</span>
            {s.label}
          </button>
        );
      })}
    </nav>
  );
}

// -----------------------------------------------------------------------
// ScrollLog — convenience wrapper: both pieces together
// -----------------------------------------------------------------------
export default function ScrollLog({ sections }: { sections: ScrollLogSection[] }) {
  const sectionIds = sections.map((s) => s.id);
  return (
    <>
      <ScrollProgressBar sectionIds={sectionIds} />
      <GitLogNav sections={sections} />
    </>
  );
}
