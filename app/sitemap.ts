import { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { getAllPostSlugs } from "@/lib/mdx";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://example.com";
  const staticRoutes = ["", "/projects", "/blog"].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date()
  }));
  const projectRoutes = projects.map((p) => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: new Date()
  }));
  const blogRoutes = getAllPostSlugs().map((slug) => ({
    url: `${base}/blog/${slug}`,
    lastModified: new Date()
  }));
  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
