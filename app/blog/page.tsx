import { getAllPosts } from "@/lib/mdx";
import BlogSearch from "@/components/BlogSearch";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-4xl px-5 pb-24 pt-32">
      <p className="mb-2 text-xs text-ink-muted">
        <span className="text-red">$</span> ls -la ./blog
      </p>
      <h1 className="text-3xl font-bold tracking-tight text-ink">Blog</h1>
      <p className="mt-2 text-sm text-ink-secondary">Notes, write-ups, and things I&apos;m learning.</p>

      <BlogSearch posts={posts} />
    </div>
  );
}
