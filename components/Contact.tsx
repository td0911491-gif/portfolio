"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import Section from "@/components/ui/Section";
import { personal } from "@/data/personal";
import { socialLinks } from "@/data/social";
import SocialIcon from "@/components/SocialIcon";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard not available — ignore silently
    }
  };

  return (
    <Section
      id="contact"
      command="contact.sh"
      title="Get in touch"
      subtitle="Reach out directly — no forms, no middleman."
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded border border-border bg-bg-elevated p-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs text-ink-muted">
              <span className="text-red">$</span> mail -s &quot;hello&quot;
            </p>
            <p className="mt-1 text-lg font-bold text-ink">{personal.email}</p>
          </div>
          <button
            onClick={copyEmail}
            className="flex items-center gap-1.5 rounded border border-border px-4 py-2 text-xs font-semibold text-ink-secondary transition-colors hover:border-red hover:text-red"
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            {copied ? "Copied" : "Copy email"}
          </button>
        </div>

        <div className="mt-6 flex flex-wrap gap-3 border-t border-border pt-6">
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded border border-border px-4 py-2 text-xs text-ink-secondary transition-colors hover:border-red hover:text-red"
            >
              <SocialIcon icon={s.icon} size={14} />
              {s.label}
            </a>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
