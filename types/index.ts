export type MediaItem =
  | { type: "image"; src: string; caption?: string }
  | { type: "video-local"; src: string; caption?: string }
  | { type: "youtube"; id: string; caption?: string }
  | { type: "vimeo"; id: string; caption?: string }
  | { type: "loom"; id: string; caption?: string };

export interface Project {
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  technologies: string[];
  category: string;
  github?: string;
  liveDemo?: string;
  featured: boolean;
  status: "planned" | "in-progress" | "completed" | "archived";
  completionDate?: string;
  teamMembers?: string[];
  myRole?: string;
  features?: string[];
  challenges?: string[];
  futureImprovements?: string[];
  tags: string[];
  coverImage?: string;
  gallery?: MediaItem[];
  problemStatement?: string;
  architecture?: string;
  timeline?: string;
  lessonsLearned?: string;
}

export interface SkillItem {
  name: string;
  level: number; // 0-100
  category: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  type: "internship" | "freelance" | "research" | "leadership" | "open-source";
  start: string;
  end?: string; // omit for ongoing
  description: string;
  bullets?: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  verificationUrl?: string;
  fileUrl?: string;
  credentialId?: string;
  description?: string;
}

export interface Achievement {
  id: string;
  title: string;
  organization?: string;
  date: string;
  description?: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "leetcode" | "codeforces" | "mail" | "discord";
}

export interface PersonalInfo {
  name: string;
  shortName: string;
  tagline: string;
  status: string;
  university: string;
  bio: string;
  location: string;
  interests: string[];
  email: string;
  resumeUrl?: string;
}
