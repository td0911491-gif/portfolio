"use client";

// ChatWidget — a floating "AI terminal" button in the corner of the site.
// Clicking it opens a small chat panel. This is a lightweight, fully
// client-side FAQ matcher (no model download, no backend, no API key) --
// it scores the visitor's question against a set of pre-written topics
// about Tamoghna and replies with a canned answer. Loads instantly.
//
// To teach it more, add entries to the KNOWLEDGE array below: give each
// one a list of keywords to match on and the answer to show.
//
// Usage: import and render <ChatWidget /> once, in app/layout.tsx:
//
//   import ChatWidget from "@/components/ChatWidget";
//   ...
//   <body>{children}<ChatWidget /></body>

import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

type KnowledgeEntry = {
  keywords: string[];
  answer: string;
};

// Edit these to change what the bot knows. Each entry needs a few keywords
// (lowercase, no punctuation) and the answer to give when one of them
// appears in the visitor's message.
const KNOWLEDGE: KnowledgeEntry[] = [
  {
    keywords: ["who", "about", "yourself", "tamoghna", "intro"],
    answer:
      "Tamoghna is a 1st-year BCA student at Brainware University and a Software Engineer Intern at HackerRank, working with Python, SQL, and Java.",
  },
  {
    keywords: ["work", "job", "intern", "internship", "hackerrank", "experience"],
    answer:
      "He's currently a Software Engineer Intern at HackerRank, getting hands-on with real engineering workflows.",
  },
  {
    keywords: ["study", "college", "university", "school", "education", "bca", "degree"],
    answer:
      "He's a 1st-year Bachelor of Computer Applications (BCA) student at Brainware University, focused on general CS with an eye toward AI/ML.",
  },
  {
    keywords: ["skill", "language", "tech", "stack", "know", "python", "java", "sql"],
    answer:
      "His main tools are Python, Java, and SQL, along with problem solving, data structures & algorithms, and Git/GitHub.",
  },
  {
    keywords: ["project", "built", "build", "made", "portfolio"],
    answer:
      "A few things he's built: Mathopia (a math game), CogniDBG (a debugger), and RouteComps AI (an AI-powered travel comparison app). Check the Projects section for more.",
  },
  {
    keywords: ["certification", "certificate", "certified", "cs50"],
    answer:
      "He's completed CS50x from Harvard, plus HackerRank certifications in Problem Solving and SQL, and a Deloitte data analytics job simulation. See the Certifications section for details.",
  },
  {
    keywords: ["contact", "email", "reach", "hire", "linkedin", "connect"],
    answer:
      "Best way to reach him is via LinkedIn or email — links are in the 'Let's connect' section at the bottom of the site.",
  },
  {
    keywords: ["hobby", "interest", "free time", "outside"],
    answer:
      "Outside of code, he's into cooking, basketball, cricket, football, and music.",
  },
  {
    keywords: ["blog", "writing", "article", "post"],
    answer:
      "He writes short posts on things he's building — recent ones cover a SQL engine built from scratch and a CLI file organizer in C. Check the blog section.",
  },
];

const FALLBACK_ANSWER =
  "I don't have a specific answer for that — try asking about his skills, projects, education, or how to get in touch, or check the relevant section of the site.";

function findAnswer(question: string): string {
  const q = question.toLowerCase();
  let best: { entry: KnowledgeEntry; score: number } | null = null;

  for (const entry of KNOWLEDGE) {
    const score = entry.keywords.reduce(
      (acc, kw) => acc + (q.includes(kw) ? 1 : 0),
      0
    );
    if (score > 0 && (!best || score > best.score)) {
      best = { entry, score };
    }
  }

  return best ? best.entry.answer : FALLBACK_ANSWER;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, typing]);

  function send() {
    const text = input.trim();
    if (!text || typing) return;

    const userMsg: Msg = { role: "user", content: text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);

    // Small delay so the reply doesn't feel instant/robotic.
    const answer = findAnswer(text);
    setTimeout(() => {
      setMessages((m) => [...m, { role: "assistant", content: answer }]);
      setTyping(false);
    }, 400);
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 font-mono">
      {open && (
        <div className="mb-3 flex h-[420px] w-[320px] flex-col overflow-hidden rounded-lg border border-red-600/40 bg-black shadow-[0_0_24px_rgba(220,38,38,0.25)] sm:w-[360px]">
          {/* header */}
          <div className="flex items-center justify-between border-b border-red-600/30 bg-zinc-950 px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs text-zinc-300">~/ask-tamoghna</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-zinc-500 hover:text-red-500 text-xs"
              aria-label="Close chat"
            >
              [x]
            </button>
          </div>

          {/* body */}
          <div ref={scrollRef} className="flex-1 space-y-2 overflow-y-auto px-3 py-3 text-sm">
            {messages.length === 0 && (
              <p className="text-zinc-500 text-xs">$ ready. ask me anything about Tamoghna.</p>
            )}

            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
                <span
                  className={`inline-block max-w-[85%] whitespace-pre-wrap rounded px-2 py-1 text-xs ${
                    m.role === "user"
                      ? "bg-red-600/20 text-red-100"
                      : "bg-zinc-900 text-zinc-200 border border-zinc-800"
                  }`}
                >
                  {m.content}
                </span>
              </div>
            ))}

            {typing && <p className="text-xs text-zinc-500">…</p>}
          </div>

          {/* input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="flex items-center gap-2 border-t border-red-600/30 bg-zinc-950 p-2"
          >
            <span className="text-red-500 text-xs">$</span>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={typing}
              placeholder="type a message…"
              className="flex-1 bg-transparent text-xs text-zinc-100 outline-none placeholder:text-zinc-600 disabled:opacity-40"
            />
          </form>
        </div>
      )}

      {/* toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-red-600/50 bg-black text-red-500 shadow-[0_0_16px_rgba(220,38,38,0.35)] transition-transform hover:scale-105"
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? (
          <span className="text-lg leading-none">×</span>
        ) : (
          <span className="text-lg leading-none">&gt;_</span>
        )}
      </button>
    </div>
  );
}
