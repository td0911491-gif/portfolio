/**
 * GithubRepos
 * -----------
 * Replaces the old GitHub Activity stats-image section with a live grid of
 * your actual public repositories, pulled from the GitHub REST API.
 *
 * This is a Server Component (no "use client") -- the fetch happens on the
 * server at build/request time, so no client-side loading spinner is needed.
 * Next.js caches the result and revalidates it hourly (see `revalidate` below).
 */

const GITHUB_USERNAME = "td0911491-gif";

type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  fork: boolean;
};

async function getRepos(): Promise<Repo[]> {
  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
    {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 }, // re-check GitHub at most once an hour
    }
  );
  if (!res.ok) return [];
  const data: Repo[] = await res.json();
  // drop forks so this reads as "things I built", not everything you've ever forked
  return data.filter((r) => !r.fork);
}

export default async function GithubRepos() {
  const repos = await getRepos();

  return (
    <section id="repos" className="px-[8vw] py-24 border-b border-[#262422]">
      <p className="font-mono text-xs text-[#ff3b3b] mb-4">$ ls ./repos --all</p>
      <h2 className="font-mono text-3xl md:text-5xl font-black text-[#e9e6e2] mb-2">
        Repositories
      </h2>
      <p className="font-mono text-sm text-[#7a7672] mb-10">
        {repos.length > 0
          ? `${repos.length} public repositories for @${GITHUB_USERNAME}`
          : `Live data for @${GITHUB_USERNAME}`}
      </p>

      {repos.length === 0 ? (
        <p className="font-mono text-sm text-[#7a7672]">
          Couldn&apos;t load repositories right now — check back shortly.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {repos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block border border-[#262422] hover:border-[#ff3b3b] transition-colors duration-200 p-5"
            >
              <div className="flex items-center justify-between gap-3 mb-2">
                <h3 className="font-mono text-sm text-[#e9e6e2] font-semibold truncate">
                  {repo.name}
                </h3>
                <span className="font-mono text-xs text-[#ff3b3b] shrink-0">
                  ★ {repo.stargazers_count}
                </span>
              </div>
              <p
                className="font-mono text-xs text-[#7a7672] mb-3"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {repo.description || "No description provided."}
              </p>
              {repo.language && (
                <span className="inline-block font-mono text-[11px] text-[#ff3b3b] border border-[#7a1f1f] px-2 py-0.5">
                  {repo.language}
                </span>
              )}
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
