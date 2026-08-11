"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Section from "@/components/ui/Section";
import { personal } from "@/data/personal";
import { certifications } from "@/data/certifications";

const stats = [
  { label: "Year", value: "1st" },
  { label: "Certifications", value: String(certifications.length) },
  { label: "Focus", value: "General CS" },
  { label: "Status", value: "Interning" }
];

export default function About() {
  return (
    <Section id="about" command="about.md" title="About me" subtitle={personal.university}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8 flex justify-center md:justify-start"
      >
        <div className="relative h-40 w-40 overflow-hidden rounded-full border-2 border-red shadow-[0_0_30px_rgba(225,58,75,0.25)]">
          <Image
            src="/profile.jpeg"
            alt="Tamoghna Dhar"
            fill
            className="object-cover"
            priority
          />
        </div>
      </motion.div>

      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-base leading-relaxed text-ink-secondary"
        >
          {personal.bio}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 gap-3"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded border border-border bg-bg-elevated p-4 transition-colors hover:border-red"
            >
              <p className="text-xl font-bold text-red">{s.value}</p>
              <p className="mt-1 text-xs text-ink-muted">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-10"
      >
        <p className="mb-3 text-xs text-ink-muted">
          <span className="text-red">$</span> ls ./interests
        </p>
        <div className="flex flex-wrap gap-2">
          {personal.interests.map((interest) => (
            <span
              key={interest}
              className="rounded border border-border px-3 py-1.5 text-xs text-ink-secondary transition-colors hover:border-red hover:text-red"
            >
              {interest}
            </span>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
