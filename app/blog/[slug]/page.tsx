import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPostSlugs, getPostBySlug } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";
import ShareButtons from "@/components/ShareButtons";

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  let post;
  try {
    post = getPostBySlug(params.slug);
  } catch {
    return notFound();
  }

  const { frontmatter, content, readingTime } = post;

  return (
    <article className="mx-auto max-w-3xl px-5 pb-24 pt-32">
      <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs text-ink-secondary hover:text-red">
        <ArrowLeft size={13} /> Back to blog
      </Link>

      <p className="mt-6 text-xs text-ink-muted">
        {formatDate(frontmatter.date)} · {readingTime} · {frontmatter.category}
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink">{frontmatter.title}</h1>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {frontmatter.tags.map((t) => (
            <span key={t} className="rounded bg-bg-elevated px-2 py-0.5 text-[10px] text-ink-muted">
              #{t}
            </span>
          ))}
        </div>
        <ShareButtons title={frontmatter.title} />
      </div>

      <div className="prose-blog mt-10">
        <MDXRemote source={content} />
      </div>
    </article>
  );
}
