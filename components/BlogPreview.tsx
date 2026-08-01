import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Section from "@/components/ui/Section";
import { getAllPosts } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";

export default function BlogPreview() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <Section id="blog-preview" command="blog/" title="Latest writing" subtitle="Notes as I learn.">
      {posts.length === 0 ? (
        <p className="text-sm text-ink-muted">Nothing posted yet — check back soon.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded border border-border bg-bg-elevated p-5 transition-colors hover:border-red"
            >
              <p className="text-xs text-ink-muted">
                {formatDate(post.date)} · {post.readingTime}
              </p>
              <h3 className="mt-2 text-sm font-bold text-ink group-hover:text-red">
                {post.title}
              </h3>
              <p className="mt-2 text-xs text-ink-secondary">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      )}
      <div className="mt-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-red hover:underline"
        >
          Read all posts <ArrowUpRight size={14} />
        </Link>
      </div>
    </Section>
  );
}
