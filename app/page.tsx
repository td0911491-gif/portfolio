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

export default function Home() {
  return (
    <>
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
