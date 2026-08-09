/**
 * LeetCodeStats
 * -------------
 * Mirrors the GitHub Activity section's terminal styling, but shows a
 * live-generated LeetCode stats/streak card instead. Uses the free
 * LeetCode-Stats-Card service (https://github.com/JacobLinCool/LeetCode-Stats-Card) --
 * no API key needed, the image is generated on request from your username.
 *
 * Swap this in wherever <GithubStats /> is currently used in app/page.tsx,
 * or place it right after GithubStats to show both.
 */

const LEETCODE_USERNAME = "td0911491-gif";

// theme=dark matches a black-background card; swap to a custom palette with
// ?colors=<comma-separated hex list> if you want to match your red accent
// exactly (see the project README for the color-slot order).
const STATS_CARD_URL = `https://leetcard.jacoblin.cool/${LEETCODE_USERNAME}?theme=dark`;

// The "streak bar" -- a heatmap/activity extension card. Swap ext=heatmap
// for ext=activity or ext=contest if you'd rather show those instead.
const STREAK_CARD_URL = `https://leetcard.jacoblin.cool/${LEETCODE_USERNAME}?theme=dark&ext=heatmap`;

export default function LeetCodeStats() {
  return (
    <section id="leetcode" className="px-[8vw] py-24 border-b border-[#262422]">
      <p className="font-mono text-xs text-[#ff3b3b] mb-4">
        $ cat leetcode --stats
      </p>
      <h2 className="font-mono text-3xl md:text-5xl font-black text-[#e9e6e2] mb-2">
        LeetCode Activity
      </h2>
      <p className="font-mono text-sm text-[#7a7672] mb-10">
        Live data for @{LEETCODE_USERNAME}
      </p>

      <a
        href={`https://leetcode.com/${LEETCODE_USERNAME}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block border border-[#262422] hover:border-[#ff3b3b] transition-colors duration-200 overflow-hidden"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={STATS_CARD_URL}
          alt="LeetCode stats"
          className="w-full block"
          loading="lazy"
        />
      </a>

      <a
        href={`https://leetcode.com/${LEETCODE_USERNAME}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block border border-[#262422] hover:border-[#ff3b3b] transition-colors duration-200 overflow-hidden mt-4"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={STREAK_CARD_URL}
          alt="LeetCode streak heatmap"
          className="w-full block"
          loading="lazy"
        />
      </a>
    </section>
  );
}
