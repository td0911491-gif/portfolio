"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Section({
  id,
  command,
  title,
  subtitle,
  children,
  className
}: {
  id: string;
  command: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("scroll-mt-20 px-5 py-24", className)}>
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="mb-2 text-xs text-ink-muted">
            <span className="text-red">$</span> cat {command}
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 max-w-xl text-sm text-ink-secondary">{subtitle}</p>
          )}
        </motion.div>
        {children}
      </div>
    </section>
  );
}
