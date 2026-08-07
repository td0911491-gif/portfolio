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
  },
  {
    slug: "cognidbg",
    name: "CogniDBG",
    category: "Developer Tool",
    shortDescription: "A step-by-step code debugger with real JavaScript execution and AI trace analysis.",
    longDescription: "CogniDBG is an interactive step-by-step code execution visualizer and debugger featuring real JavaScript execution, Python AI tracing, live variable state tracking, and AI assistance hints.",
    technologies: ["JavaScript", "HTML5", "CSS3", "AI Tracing"],
    liveDemo: "/cognidbg.html",
    github: "https://github.com/td0911491-gif/portfolio", // Replace with CogniDBG repo URL if hosted separately
    featured: true,
    status: "completed",
    tags: ["debugger", "javascript", "developer-tools", "ai"]
  }
{
    slug: "routeComp",
    name: "RouteComp",
    category: "Web Application",
    shortDescription: "A interactive route comparison preview tool.",
    longDescription: "An interactive visualization tool for testing and previewing route comparisons and travel paths.",
    technologies: ["HTML", "CSS", "JavaScript"],
    liveDemo: "routecomp_preview.html",
    github: "https://github.com/td0911491-gif/portfolio",
    featured: true,
    status: "completed",
    tags: ["routes", "preview", "web", "tool"]
  },
  
];

export const featuredProjects = projects.filter((p) => p.featured);

