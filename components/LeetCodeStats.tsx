/**
 * LeetCodeStats
 * -------------
 * Terminal-styled coding stats section. Top card is a live Codeforces
 * rating card (rating graph + rank/level badges) pulled from the
 * Codeforces-Readme-Stats service (https://github.com/RedHeadphone/codeforces-readme-stats) --
 * no API key needed. Bottom card is the LeetCode activity heatmap from
 * LeetCode-Stats-Card (https://github.com/JacobLinCool/LeetCode-Stats-Card).
 */
const LEETCODE_USERNAME = "td0911491-gif";
const CODEFORCES_HANDLE = "Tamoghna_Dhar";

// Codeforces rating card: rating graph + rank + max rating + contests attended.
// Case-insensitive username. See project docs for theme/customization options.
const CF_CARD_URL = `https://codeforces-readme-stats.vercel.app/api/card?username=${CODEFORCES_HANDLE}`;

// LeetCode activity heatmap -- swap ext=heatmap for ext=activity or ext=contest
// if you'd rather show one of those instead.
const STREAK_CARD_URL = `https://leetcard.jacoblin.cool/${LEETCODE_USERNAME}?theme=dark&ext=heatmap`;

export default function LeetCodeStats() {
  return (
    <section id="leetcode" className="px-[8vw] py-24 border-b border-[#262422]">
      <p className="font-mono text-xs text-[#ff3b3b] mb-4">
        $ cat competitive --stats
      </p>
      <h2 className="font-mono text-3xl md:text-5xl font-black text-[#e9e6e2] mb-2">
        Competitive Programming
      </h2>
      <p className="font-mono text-sm text-[#7a7672] mb-10">
        Codeforces @{CODEFORCES_HANDLE} · LeetCode @{LEETCODE_USERNAME}
      </p>
      <a
        href={`https://codeforces.com/profile/${CODEFORCES_HANDLE}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block border border-[#262422] hover:border-[#ff3b3b] transition-colors duration-200 overflow-hidden"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={CF_CARD_URL}
          alt="Codeforces rating card"
          className="w-full block"
          loading="lazy"
        />
      </a>

      
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
