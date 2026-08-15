"use client";

// ChatWidget — floating "AI terminal" button. Sends messages to /api/chat,
// a server-side route that calls Gemini using GEMINI_API_KEY (set in
// Vercel's Environment Variables, never exposed to the browser).

import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, typing]);

  async function send() {
    const text = input.trim();
    if (!text || typing) return;

    const nextMessages = [...messages, { role: "user" as const, content: text }];
    setMessages(nextMessages);
    setInput("");
    setTyping(true);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
      } else {
        setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
      }
    } catch {
      setError("Couldn't reach the server. Try again in a moment.");
    } finally {
      setTyping(false);
    }
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
            {error && <p className="text-xs text-red-400">$ error: {error}</p>}
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
