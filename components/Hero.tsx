"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import TypingText from "@/components/TypingText";
import { personal } from "@/data/personal";

const badges = ["python", "java", "sql", "dsa", "git"];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const [doneTyping, setDoneTyping] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setGlow({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100
      });
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden px-5 pt-24"
      style={{
        backgroundImage: `radial-gradient(600px circle at ${glow.x}% ${glow.y}%, rgba(229,48,63,0.14), transparent 60%)`
      }}
    >
      <div className="bg-terminal-grid absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg" />

      {/* floating tech badges */}
      {badges.map((b, i) => (
        <motion.span
          key={b}
          className="pointer-events-none absolute hidden select-none rounded border border-border bg-bg-elevated/80 px-3 py-1 text-xs text-ink-muted backdrop-blur-sm md:block"
          style={{
            top: `${15 + i * 15}%`,
            left: i % 2 === 0 ? "8%" : "88%"
          }}
          animate={{ y: [0, -14, 0] }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4
          }}
        >
          {b}
        </motion.span>
      ))}

      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-lg border border-border bg-bg-elevated/90 shadow-2xl backdrop-blur"
        >
          <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
            <span className="terminal-dot bg-red" />
            <span className="terminal-dot bg-ink-muted" />
            <span className="terminal-dot bg-ink-muted" />
            <span className="ml-3 text-xs text-ink-muted">guest@portfolio: ~</span>
          </div>
          <div className="min-h-[220px] p-6 font-mono text-sm sm:text-base">
            <p className="mb-4 text-ink-secondary">
              <span className="text-red">$</span> whoami
            </p>
            <div className="text-ink-secondary">
              <TypingText
                lines={[
                  `> ${personal.name}`,
                  `> ${personal.status}`,
                  `> ${personal.tagline}`
                ]}
                onDone={() => setDoneTyping(true)}
              />
            </div>
            <span
              className={`inline-block h-4 w-2 bg-red align-middle ${
                doneTyping ? "animate-blink" : ""
              }`}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-wrap gap-4"
        >
          <Link
            href="/projects"
            className="group relative overflow-hidden rounded border border-red bg-red px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            View Projects
          </Link>
          <Link
            href="/#contact"
            className="rounded border border-border px-6 py-3 text-sm font-semibold text-ink-secondary transition-colors hover:border-red hover:text-ink"
          >
            Get in Touch
          </Link>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ink-muted"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown size={20} />
      </motion.div>
    </div>
  );
}
