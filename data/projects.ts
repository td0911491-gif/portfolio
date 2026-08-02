import { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "mathopia",
    name: "Mathopia",
    category: "Game",
    shortDescription: "An interactive HTML math game to test and improve problem-solving skills.",
    longDescription: "Mathopia is an interactive browser-based game designed to challenge mental math speed and problem-solving abilities.",
    technologies: ["HTML5", "CSS3", "JavaScript"],
    liveDemo: "/games/mathopia.html",
    github: "https://github.com/td0911491-gif/portfolio",
    featured: true,
    status: "completed",
    tags: ["game", "javascript", "html5"]
  }
];

export const featuredProjects = projects.filter((p) => p.featured);
