import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Certifications from "@/components/Certifications";
import Achievements from "@/components/Achievements";
import GithubStats from "@/components/GithubStats";
import ProjectsPreview from "@/components/ProjectsPreview";
import BlogPreview from "@/components/BlogPreview";
import Contact from "@/components/Contact";
import ScrollLog from "@/components/ScrollLog";

const SECTIONS = [
  { id: "hero", hash: "a1f9c2", label: "init: hero" },
  { id: "about", hash: "7b3e01", label: "feat: about" },
  { id: "skills", hash: "3c8d92", label: "feat: skills" },
  { id: "experience", hash: "5f10ab", label: "feat: experience" },
  { id: "projects", hash: "e4d820", label: "feat: projects" },
  { id: "contact", hash: "c09f11", label: "chore: contact" },
];

export default function Home() {
  return (
    <>
      <ScrollLog sections={SECTIONS} />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Certifications />
      <Achievements />
      <GithubStats />
      <ProjectsPreview />
      <BlogPreview />
      <Contact />
    </>
  );
}
