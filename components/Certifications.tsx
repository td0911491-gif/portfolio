"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink, FileText } from "lucide-react";
import Section from "@/components/ui/Section";
import { certifications } from "@/data/certifications";
import { formatDate } from "@/lib/utils";

export default function Certifications() {
  return (
    <Section
      id="certifications"
      command="certifications.db"
      title="Certifications"
      subtitle="Third-party proof of what I've learned so far."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert, i) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="flex flex-col justify-between rounded border border-border bg-bg-elevated p-5 transition-colors hover:border-red"
          >
            <div>
              <Award className="mb-3 text-red" size={20} />
              <h3 className="text-sm font-bold text-ink">{cert.title}</h3>
              <p className="mt-1 text-xs text-ink-muted">{cert.issuer}</p>
              <p className="mt-1 text-xs text-ink-muted">{formatDate(cert.date)}</p>
              {cert.description && (
                <p className="mt-3 text-xs leading-relaxed text-ink-secondary">
                  {cert.description}
                </p>
              )}
              {cert.credentialId && (
                <p className="mt-3 font-mono text-[10px] text-ink-muted">
                  ID: {cert.credentialId}
                </p>
              )}
            </div>
            <div className="mt-4 flex gap-3">
              {cert.fileUrl && (
                <a
                  href={cert.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-red hover:underline"
                >
                  <FileText size={13} /> View certificate
                </a>
              )}
              {cert.verificationUrl && (
                <a
                  href={cert.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-secondary hover:text-ink"
                >
                  <ExternalLink size={13} /> Verify
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
