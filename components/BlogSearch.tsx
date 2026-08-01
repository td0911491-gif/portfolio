"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BlogPostMeta } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";

export default function BlogSearch({ posts }: { posts: BlogPostMeta[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      posts.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      ),
    [posts, query]
  );

  return (
    <>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="search posts..."
        className="mt-6 w-full rounded border border-border bg-bg-elevated px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-red sm:w-64"
      />

      <div className="mt-8 space-y-4">
        {filtered.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block rounded border border-border bg-bg-elevated p-5 transition-colors hover:border-red"
          >
            <p className="text-xs text-ink-muted">
              {formatDate(post.date)} · {post.readingTime} · {post.category}
            </p>
            <h2 className="mt-2 text-lg font-bold text-ink">{post.title}</h2>
            <p className="mt-2 text-sm text-ink-secondary">{post.excerpt}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {post.tags.map((t) => (
                <span key={t} className="rounded bg-bg-raised px-2 py-0.5 text-[10px] text-ink-muted">
                  #{t}
                </span>
              ))}
            </div>
          </Link>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-ink-muted">No posts match &quot;{query}&quot;.</p>
        )}
      </div>
    </>
  );
}
