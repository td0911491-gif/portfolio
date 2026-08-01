"use client";

import { useState } from "react";
import { Link2, Check } from "lucide-react";

export default function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore
    }
  };

  return (
    <button
      onClick={copyLink}
      aria-label={`Copy link to ${title}`}
      className="flex items-center gap-1.5 rounded border border-border px-3 py-1.5 text-xs text-ink-secondary transition-colors hover:border-red hover:text-red"
    >
      {copied ? <Check size={13} /> : <Link2 size={13} />}
      {copied ? "Copied" : "Copy link"}
    </button>
  );
}
