import { personal } from "@/data/personal";
import { socialLinks } from "@/data/social";
import SocialIcon from "@/components/SocialIcon";

export default function Footer() {
  return (
    <footer className="border-t border-border px-5 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-ink-muted md:flex-row">
        <p>
          <span className="text-red">$</span> echo &quot;© {new Date().getFullYear()}{" "}
          {personal.name}&quot;
        </p>
        <div className="flex items-center gap-4">
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="text-ink-secondary transition-colors hover:text-red"
            >
              <SocialIcon icon={s.icon} size={16} />
            </a>
          ))}
        </div>
        <p className="text-ink-muted">
          Built with <span className="text-ink-secondary">Next.js</span>
        </p>
      </div>
    </footer>
  );
}
