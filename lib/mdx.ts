import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface BlogFrontmatter {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  category: string;
  coverImage?: string;
}

export interface BlogPostMeta extends BlogFrontmatter {
  slug: string;
  readingTime: string;
}

function getReadingTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => f.replace(/\.mdx?$/, ""));
}

export function getPostBySlug(slug: string) {
  const fullPathMdx = path.join(BLOG_DIR, `${slug}.mdx`);
  const fullPathMd = path.join(BLOG_DIR, `${slug}.md`);
  const fullPath = fs.existsSync(fullPathMdx) ? fullPathMdx : fullPathMd;
  const raw = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = data as BlogFrontmatter;
  return {
    slug,
    frontmatter,
    content,
    readingTime: getReadingTime(content)
  };
}

export function getAllPosts(): BlogPostMeta[] {
  return getAllPostSlugs()
    .map((slug) => {
      const { frontmatter, content } = getPostBySlug(slug);
      return {
        slug,
        ...frontmatter,
        readingTime: getReadingTime(content)
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
