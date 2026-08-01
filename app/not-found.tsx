import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-5 text-center">
      <p className="font-mono text-sm text-red">$ 404</p>
      <h1 className="text-2xl font-bold text-ink">command not found</h1>
      <p className="max-w-sm text-sm text-ink-secondary">
        The page you&apos;re looking for doesn&apos;t exist, or has moved.
      </p>
      <Link
        href="/"
        className="mt-2 rounded border border-red px-5 py-2.5 text-sm font-semibold text-red hover:bg-red hover:text-white"
      >
        cd ~/
      </Link>
    </div>
  );
}
