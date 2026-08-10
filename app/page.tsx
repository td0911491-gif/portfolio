import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Certifications from "@/components/Certifications";
import Achievements from "@/components/Achievements";
import GithubRepos from "@/components/GithubRepos";
import LeetCodeStats from "@/components/LeetCodeStats";
import ProjectsHoverPreview from "@/components/ProjectsHoverPreview";
import BlogPreview from "@/components/BlogPreview";
import Contact from "@/components/Contact";
import { ScrollProgressBar } from "@/components/ScrollLog";

const SECTION_IDS = ["hero", "about", "skills", "experience", "projects", "contact"];

export default function Home() {
  return (
    <>
      <ScrollProgressBar sectionIds={SECTION_IDS} />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Certifications />
      <Achievements />
      <GithubRepos />
      <LeetCodeStats />
      <ProjectsHoverPreview />
      <BlogPreview />
      <Contact />
    </>
  );
}
