const items = [
  {
    date: "CURRENT",
    title: "Software Engineer Intern",
    sub: "HackerRank",
  },
  {
    date: "YEAR 1",
    title: "Bachelor of Computer Applications (BCA)",
    sub: "1st year student — general CS, no specialization chosen yet",
  },
];

export default function Experience() {
  return (
    <section className="bg-bg-alt border-y border-border px-[6vw] py-28">
      <div className="flex items-center gap-2.5 text-red text-xs tracking-wide mb-4 font-mono before:content-[''] before:w-6 before:h-px before:bg-red">
        $ git log --education --experience
      </div>
      <h2 className="font-display font-extrabold text-cream text-[clamp(32px,5vw,58px)] mb-12">
        Education &amp; <span className="text-red italic font-medium">Experience</span>
      </h2>

      <div className="relative pl-9">
        <div className="absolute left-[5px] top-1.5 bottom-1.5 w-px bg-border" />
        {items.map((item, i) => (
          <div key={i} className="relative pb-12 last:pb-0">
            <div className="absolute -left-9 top-1 w-[11px] h-[11px] rounded-full bg-bg border-2 border-red" />
            <div className="text-xs text-red tracking-wide mb-2 font-mono">
              {item.date}
            </div>
            <div className="font-display font-bold text-2xl text-cream mb-1.5">
              {item.title}
            </div>
            <div className="text-sm text-muted font-mono">{item.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
