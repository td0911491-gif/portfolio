"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { personal } from "@/data/personal";
import { cn } from "@/lib/utils";

const links = [
  { href: "/#about", label: "about" },
  { href: "/#skills", label: "skills" },
  { href: "/#experience", label: "experience" },
  { href: "/projects", label: "projects" },
  { href: "/blog", label: "blog" },
  { href: "/#contact", label: "contact" }
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border bg-bg/80 backdrop-blur-md dark:bg-bg/80"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link href="/" className="flex items-center gap-3 text-sm">
          <span className="flex items-center gap-1.5" aria-hidden>
            <span className="terminal-dot bg-red" />
            <span className="terminal-dot bg-ink-muted" />
            <span className="terminal-dot bg-ink-muted" />
          </span>
          <span className="font-semibold tracking-tight text-ink dark:text-ink">
            ~/{personal.shortName.toLowerCase()}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group relative text-sm text-ink-secondary transition-colors hover:text-ink"
            >
              <span className="text-red">./</span>
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-red transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            aria-label="Toggle menu"
            className="text-ink md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-border bg-bg px-5 py-4 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded px-2 py-2.5 text-sm text-ink-secondary hover:bg-bg-elevated hover:text-ink"
            >
              <span className="text-red">./</span>
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
