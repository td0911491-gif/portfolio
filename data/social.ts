import { SocialLink } from "@/types";

// Fill in your real URLs. Leaving a value as "#" keeps the icon visible
// but inert until you're ready to add the link.
export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/your-username", icon: "github" },
  { label: "LinkedIn", href: "https://linkedin.com/in/your-username", icon: "linkedin" },
  { label: "LeetCode", href: "https://leetcode.com/your-username", icon: "leetcode" },
  { label: "Codeforces", href: "https://codeforces.com/profile/your-username", icon: "codeforces" },
  { label: "Discord", href: "#", icon: "discord" }
];

// Used by the GitHub stats section. Swap in your real username to go live —
// the component is already wired to accept it.
export const githubUsername = "your-username";
