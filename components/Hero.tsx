import ProfileCard from "./ProfileCard";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-[6vw] pt-32 pb-16 relative bg-bg overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(225,58,75,0.18), transparent 70%)",
        }}
      />

      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="flex items-center gap-1 text-red text-sm mb-4 font-mono">
            $ whoami
            <span className="inline-block w-[9px] h-[18px] bg-red ml-1 animate-pulse" />
          </div>

          <h1 className="font-display font-black leading-[0.92] tracking-tight text-cream text-[clamp(52px,7vw,100px)]">
            TAMOGHNA
            <br />
            <span className="text-red italic font-semibold">Dhar</span>
          </h1>

          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted font-mono">
            1st-year BCA student and software engineer intern, building clean
            solutions with Python, SQL and Java — one commit at a time.
          </p>

          <div className="mt-7 inline-flex items-center gap-2 text-sm text-cream border border-border bg-surface px-4 py-2.5 rounded-sm w-fit font-mono">
            <span className="text-red">&gt;</span> Software Engineer Intern @
            HackerRank
          </div>
        </div>

        <div className="hidden md:flex justify-center">
          <ProfileCard />
        </div>
      </div>

      <div className="absolute bottom-10 left-[6vw] flex items-center gap-3 text-[11px] uppercase tracking-widest text-muted-2 font-mono">
        <div className="w-px h-9 bg-gradient-to-b from-red to-transparent" />
        scroll
      </div>
    </section>
  );
}
