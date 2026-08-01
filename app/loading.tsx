export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-bg">
      <div className="flex items-center gap-1.5">
        <span className="terminal-dot animate-pulse bg-red" />
        <span className="terminal-dot animate-pulse bg-ink-muted [animation-delay:0.15s]" />
        <span className="terminal-dot animate-pulse bg-ink-muted [animation-delay:0.3s]" />
      </div>
      <p className="font-mono text-xs text-ink-muted">loading...</p>
    </div>
  );
}
