# Tamoghna Dhar — Portfolio

A premium, terminal-themed developer portfolio built with Next.js (App Router),
TypeScript, Tailwind CSS, and Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

To build for production:

```bash
npm run build
npm start
```

Deploys cleanly to Vercel — just push this folder to a GitHub repo and import it.

## Editing content (no code changes needed)

Everything you'll want to update regularly lives in `/data`:

| File | Controls |
|---|---|
| `data/personal.ts` | Name, tagline, bio, university, interests, email |
| `data/skills.ts` | Skills grid, categories, progress levels |
| `data/experience.ts` | Experience timeline (internships, freelance, etc.) |
| `data/certifications.ts` | Certification cards — drop new certificate files into `public/documents/` and point `fileUrl` at them |
| `data/achievements.ts` | Hackathons, awards, competitions |
| `data/projects.ts` | Every project — see the example object in the comments at the top of the file. Adding one object here automatically creates a card on `/projects` **and** a full detail page at `/projects/your-slug` |
| `data/social.ts` | Social links + your GitHub username (for the GitHub stats section) |

### Adding a project

Push a new object into the `projects` array in `data/projects.ts`. Every field
maps directly to something on the project's detail page (problem statement,
architecture, features, challenges, gallery, etc.) — only `slug`, `name`,
`shortDescription`, `longDescription`, `technologies`, `category`, `featured`,
`status`, and `tags` are required; everything else is optional and simply
won't render if left out.

For media, add items to `gallery`:
```ts
gallery: [
  { type: "image", src: "/images/projects/your-project/1.png", caption: "Dashboard" },
  { type: "youtube", id: "dQw4w9WgXcQ", caption: "Demo walkthrough" }
]
```
Supported video types: `video-local` (put the file in `/public/videos`),
`youtube`, `vimeo`, `loom`.

### Adding a blog post

Drop a new `.mdx` file into `content/blog/`. Required frontmatter:

```md
---
title: "Your title"
date: "2026-08-15"
excerpt: "One sentence summary."
tags: ["python", "learning"]
category: "Journal"
---

Your content here, in Markdown.
```

It shows up on `/blog` and gets its own page at `/blog/your-file-name`
automatically — reading time is calculated for you.

### Things to finish when you're ready

- [ ] Add your university name in `data/personal.ts`
- [ ] Add your real email in `data/personal.ts`
- [ ] Add your real social URLs in `data/social.ts`
- [ ] Set your real GitHub username in `data/social.ts` to make the GitHub stats section go live
- [ ] Drop a profile photo into `public/images/` and wire it into `Hero.tsx` / `About.tsx`
- [ ] Add your first real project to `data/projects.ts`
- [ ] Update `metadataBase` in `app/layout.tsx` and the `sitemap.ts` / `robots.ts` base URL once you have a real domain

## Tech stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (custom black/red terminal design tokens in `tailwind.config.ts`)
- Framer Motion for animation
- next-mdx-remote + gray-matter for the blog
- next-themes for dark/light mode (dark is default, matching the terminal aesthetic)
- lucide-react for icons

## Project structure

```
app/                  routes (pages)
  page.tsx            homepage — assembles all sections
  projects/            /projects and /projects/[slug]
  blog/                 /blog and /blog/[slug]
components/           all UI components
  ui/Section.tsx       shared section wrapper (terminal-style header)
data/                  <- edit these files to update content
content/blog/          <- drop .mdx files here for new posts
lib/                   utilities (mdx reading, class-name helper)
types/                 shared TypeScript types
public/                images, videos, documents (certificates live in /documents)
```
