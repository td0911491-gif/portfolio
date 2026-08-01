import { SkillItem } from "@/types";

// Add or edit skills here. `category` controls which group/filter it appears under.
export const skills: SkillItem[] = [
  { name: "Python", level: 80, category: "Languages" },
  { name: "Java", level: 70, category: "Languages" },
  { name: "SQL", level: 75, category: "Languages" },
  { name: "Problem Solving", level: 85, category: "Core" },
  { name: "Data Structures & Algorithms", level: 70, category: "Core" },
  { name: "Git & GitHub", level: 65, category: "Tools" },
  { name: "VS Code", level: 80, category: "Tools" }
];

export const skillCategories = Array.from(new Set(skills.map((s) => s.category)));
