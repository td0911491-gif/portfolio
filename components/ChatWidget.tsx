"use client";

// ChatWidget — a floating "AI terminal" button in the corner of the site.
// Fully client-side, no API key, no model download — loads instantly.
// Combines light conversational handling (greetings, thanks, small talk)
// with topic-matching so it can answer questions about Tamoghna too.
//
// To teach it more, add entries to KNOWLEDGE below: a list of keywords
// to match on, and the answer to give.
//
// Usage: import and render <ChatWidget /> once, in app/layout.tsx:
//   import ChatWidget from "@/components/ChatWidget";
//   <body>{children}<ChatWidget /></body>

import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };
type KnowledgeEntry = { keywords: string[]; answers: string[] };

// --- Small talk: matched first, checked with whole-word/phrase matching ---
const SMALL_TALK: { patterns: RegExp[]; answers: string[] }[] = [
  {
    patterns: [/\b(hi|hello|hey|yo|sup)\b/],
    answers: [
      "Hey! I'm the little terminal bot for this site. Ask me about Tamoghna's work, skills, or projects.",
      "Hi there — what do you want to know about Tamoghna?",
    ],
  },
  {
    patterns: [/how are you/, /how's it going/, /how you doing/],
    answers: [
      "Running fine, no crashes today. How can I help — curious about a project, or his skills?",
    ],
  },
  {
    patterns: [/\bthank/],
    answers: ["Anytime.", "No problem — anything else you want to know?"],
  },
  {
    patterns: [/\b(bye|goodbye|see ya|later)\b/],
    answers: ["Later! Feel free to reach out to Tamoghna directly if you want to talk further."],
  },
  {
    patterns: [/who are you/, /what are you/],
    answers: [
      "I'm a small terminal-styled chatbot built into this portfolio — here to answer questions about Tamoghna.",
    ],
  },
  {
    patterns: [/\bjoke\b/],
    answers: [
      "Why do programmers prefer dark mode? Because light attracts bugs.",
    ],
  },
];

// --- Topic knowledge: scored keyword matching, picks the best entry ---
const KNOWLEDGE: KnowledgeEntry[] = [
  {
    keywords: ["who", "about", "tamoghna", "intro", "yourself"],
    answers: [
      "Tamoghna is a 1st-year BCA student at Brainware University and a Software Engineer Intern at HackerRank, working with Python, SQL, and Java.",
    ],
  },
  {
    keywords: ["work", "job", "intern", "internship", "hackerrank", "experience"],
    answers: [
      "He's currently a Software Engineer Intern at HackerRank, getting hands-on with real engineering workflows.",
    ],
  },
  {
    keywords: ["study", "college", "university", "school", "education", "bca", "degree"],
    answers: [
      "He's a 1st-year Bachelor of Computer Applications (BCA) student at Brainware University, general CS focus with an eye toward AI/ML.",
    ],
  },
  {
    keywords: ["skill", "language", "tech", "stack", "know", "python", "java", "sql"],
    answers: [
      "Mainly Python, Java, and SQL, plus problem solving, data structures & algorithms, and Git/GitHub. He's also leaning into AI/ML.",
    ],
  },
  {
    keywords: ["project", "built", "build", "made", "portfolio"],
    answers: [
      "A few things he's built: Mathopia (a math game), CogniDBG (a debugger), and RouteComps AI (an AI travel comparison app). Check the Projects section for more.",
    ],
  },
  {
    keywords: ["certification", "certificate", "certified", "cs50"],
    answers: [
      "He's completed CS50x from Harvard, plus HackerRank certifications in Problem Solving and SQL, and a Deloitte data analytics job simulation.",
    ],
  },
  {
    keywords: ["contact", "email", "reach", "hire", "linkedin", "connect"],
    answers: [
      "Best way to reach him is via LinkedIn or email — links are in the 'Let's connect' section at the bottom of the site.",
    ],
  },
  {
    keywords: ["hobby", "interest", "free time", "outside"],
    answers: ["Outside of code, he's into cooking, basketball, cricket, football, and music."],
  },
  {
    keywords: ["blog", "writing", "article", "post"],
    answers: [
      "He writes short posts on things he's building — recent ones cover a SQL engine from scratch and a CLI file organizer in C.",
    ],
  },
];

const FALLBACK_ANSWERS = [
  "Not sure about that one — try asking about his skills, projects, education, or how to get in touch.",
  "I don't have a specific answer for that. Ask me about Tamoghna's background, work, or projects instead.",
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function findReply(question: string): string {
  const q = question.toLowerCase();

  for (const st of SMALL_TALK) {
    if (st.patterns.some((p) => p.test(q))) return pick(st.answers);
  }

  let best: { entry: KnowledgeEntry; score: number } | null = null;
  for (const entry of KNOWLEDGE) {
    const score = entry.keywords.reduce((acc, kw) => acc + (q.includes(kw) ? 1 : 0), 0);
    if (score > 0 && (!best || score > best.score)) best = { entry, score };
  }

  return best ? pick(best.entry.answers) : pick(FALLBACK_ANSWERS);
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

    setMessages((m) => [...m, { role: "user", content: text }]);
    setInput("");
    setTyping(true);

    const reply = findReply(text);
    const delay = 350 + Math.random() * 400; // feels more natural than a fixed delay
    setTimeout(() => {
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
      setTyping(false);
    }, delay);
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 font-mono">
      {open && (
        <div className="mb-3 flex h-[420px] w-[320px] flex-col overflow-hidden rounded-lg border border-red-600/40 bg-black shadow-[0_0_24px_rgba(220,38,38,0.25)] sm:w-[360px]">
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

          <div ref={scrollRef} className="flex-1 space-y-2 overflow-y-auto px-3 py-3 text-sm">
            {messages.length === 0 && (
              <p className="text-zinc-500 text-xs">$ ready. say hi, or ask about Tamoghna.</p>
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
