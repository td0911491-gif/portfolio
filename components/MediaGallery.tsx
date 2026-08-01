"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { MediaItem } from "@/types";

function MediaThumb({ item }: { item: MediaItem }) {
  if (item.type === "image") {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={item.src} alt={item.caption ?? ""} className="h-full w-full object-cover" />;
  }
  if (item.type === "youtube") {
    return (
      <img
        src={`https://img.youtube.com/vi/${item.id}/hqdefault.jpg`}
        alt={item.caption ?? "video thumbnail"}
        className="h-full w-full object-cover"
      />
    );
  }
  return (
    <div className="flex h-full w-full items-center justify-center bg-bg-raised text-xs text-ink-muted">
      video
    </div>
  );
}

function MediaPlayer({ item }: { item: MediaItem }) {
  switch (item.type) {
    case "image":
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={item.src} alt={item.caption ?? ""} className="max-h-[80vh] w-auto" />;
    case "video-local":
      return <video src={item.src} controls className="max-h-[80vh] w-auto" />;
    case "youtube":
      return (
        <iframe
          className="aspect-video w-[80vw] max-w-3xl"
          src={`https://www.youtube.com/embed/${item.id}`}
          title={item.caption ?? "YouTube video"}
          allowFullScreen
        />
      );
    case "vimeo":
      return (
        <iframe
          className="aspect-video w-[80vw] max-w-3xl"
          src={`https://player.vimeo.com/video/${item.id}`}
          title={item.caption ?? "Vimeo video"}
          allowFullScreen
        />
      );
    case "loom":
      return (
        <iframe
          className="aspect-video w-[80vw] max-w-3xl"
          src={`https://www.loom.com/embed/${item.id}`}
          title={item.caption ?? "Loom video"}
          allowFullScreen
        />
      );
  }
}

export default function MediaGallery({ items }: { items: MediaItem[] }) {
  const [active, setActive] = useState<number | null>(null);

  if (!items || items.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="aspect-video overflow-hidden rounded border border-border transition-colors hover:border-red"
          >
            <MediaThumb item={item} />
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setActive(null)}
        >
          <button
            aria-label="Close"
            className="absolute right-5 top-5 text-white"
            onClick={() => setActive(null)}
          >
            <X size={22} />
          </button>
          <div onClick={(e) => e.stopPropagation()}>
            <MediaPlayer item={items[active]} />
            {items[active].caption && (
              <p className="mt-3 text-center text-xs text-ink-secondary">
                {items[active].caption}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
