import { Project } from "@/types";

// ---------------------------------------------------------------------------
// Add a new project by pushing one object into this array. That's it —
// no component or route needs to change. Each project automatically gets
// a card on /projects and its own page at /projects/[slug].
//
// Minimal example:
//
// {
//   slug: "chatbot",
//   name: "Support Chatbot",
//   shortDescription: "A rules-based chatbot for customer support.",
//   longDescription: "Longer write-up of what it does and why you built it.",
//   technologies: ["Python", "Flask"],
//   category: "AI",
//   github: "https://github.com/you/chatbot",
//   featured: true,
//   status: "completed",
//   tags: ["python", "nlp"]
// }
// ---------------------------------------------------------------------------

export const projects: Project[] = [];

export const featuredProjects = projects.filter((p) => p.featured);
