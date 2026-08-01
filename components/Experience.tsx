"use client";

import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import { experience } from "@/data/experience";

export default function Experience() {
  return (
    <Section
      id="experience"
      command="experience.log"
      title="Experience"
      subtitle="Internships, freelance work, and hands-on learning."
    >
      <div className="relative border-l border-border pl-6">
        {experience.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="relative mb-10 last:mb-0"
          >
            <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-red bg-bg" />
            <p className="text-xs text-ink-muted">
              {item.start}
              {item.end ? ` — ${item.end}` : " — Present"}
            </p>
            <h3 className="mt-1 text-lg font-bold text-ink">
              {item.role} <span className="text-red">@ {item.organization}</span>
            </h3>
            <p className="mt-2 text-sm text-ink-secondary">{item.description}</p>
            {item.bullets && (
              <ul className="mt-3 space-y-1.5">
                {item.bullets.map((b, idx) => (
                  <li key={idx} className="flex gap-2 text-sm text-ink-secondary">
                    <span className="text-red">›</span>
                    {b}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}
        {experience.length === 0 && (
          <p className="text-sm text-ink-muted">Nothing logged yet — check back soon.</p>
        )}
      </div>
    </Section>
  );
}
