import { Github, Linkedin, Mail, MessageCircle, Code2 } from "lucide-react";
import { SocialLink } from "@/types";

export default function SocialIcon({
  icon,
  size = 18
}: {
  icon: SocialLink["icon"];
  size?: number;
}) {
  switch (icon) {
    case "github":
      return <Github size={size} />;
    case "linkedin":
      return <Linkedin size={size} />;
    case "mail":
      return <Mail size={size} />;
    case "discord":
      return <MessageCircle size={size} />;
    case "leetcode":
    case "codeforces":
    default:
      return <Code2 size={size} />;
  }
}
