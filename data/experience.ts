import { ExperienceItem } from "@/types";

// Add a new object to this array for every internship, freelance gig,
// research role, leadership position, or open-source contribution.
// Leave `end` unset for anything ongoing.
export const experience: ExperienceItem[] = [
  {
    id: "hackerrank-intern",
    role: "Software Engineer Intern",
    organization: "HackerRank",
    type: "internship",
    start: "2026",
    description:
      "Gaining hands-on experience in real-world software engineering practices, working alongside experienced engineers on practical development tasks.",
    bullets: [
      "Strengthening skills in problem-solving, code quality, and collaborative development workflows",
      "Building on a foundation in Python, Java, and SQL in a production engineering environment",
      "Learning real-world development workflows beyond the classroom"
    ]
  }
];
