import { personal } from "@/data/personal";
import { socialLinks } from "@/data/social";

const links = [
  ...socialLinks.map((link) => ({
    label: link.label,
    icon: link.label === "GitHub" ? "⌥" : link.label === "LinkedIn" ? "in" : link.label === "LeetCode" ? "</>" : link.label === "Instagram" ? "◆" : "✉",
    href: link.href,
  })),
  {
    label: "Email",
    icon: "✉",
    href: `mailto:${personal.email}`,
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-bg-alt border-t border-border text-center px-[6vw] py-28"
    >
      <div className="flex items-center justify-center gap-2.5 text-red text-xs tracking-wide mb-4 font-mono">
        $ ./connect.sh
      </div>
      <h2 className="font-display font-extrabold text-cream text-[clamp(32px,5vw,58px)] mb-4">
        Let&apos;s <span className="text-red italic font-medium">connect</span>
      </h2>
      <p className="text-sm text-muted max-w-md mx-auto mb-12 leading-relaxed font-mono">
        Open to internship opportunities, collaborations, and just talking
        shop about code.
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="flex items-center gap-3 border border-border bg-surface px-6 py-4 rounded-sm text-sm min-w-[200px] transition-all hover:border-red hover:bg-red/5 hover:-translate-y-1"
          >
            <span className="text-red text-lg">{link.icon}</span>
            {link.label}
          </a>
        ))}
      </div>
    </section>
  );
}
