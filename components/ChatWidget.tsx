"use client";

// ChatWidget — a floating "AI terminal" button in the corner of the site.
// Clicking it opens a small chat panel. Runs the model fully client-side
// via WebLLM (WebGPU) — no API key, no backend route needed.
//
// Usage: import and render <ChatWidget /> once, in app/layout.tsx, so it
// shows up on every page:
//
//   import ChatWidget from "@/components/ChatWidget";
//   ...
//   <body>{children}<ChatWidget /></body>

import { useEffect, useRef, useState } from "react";

const MODEL_ID = "Llama-3.2-1B-Instruct-q4f16_1-MLC";

// Edit this to change what the bot knows / how it talks. Fill in your own
// details so it can actually answer questions about you.
const SYSTEM_PROMPT = `You are the AI assistant embedded in Tamoghna Dhar's developer portfolio site.
Tamoghna is a 1st year BCA student and Software Engineer Intern at HackerRank,
into Python, SQL, Java, and building projects like Mathopia, CogniDBG, and RouteComps_AI.
Answer visitor questions about his background, skills, and projects in a friendly,
concise way — a few sentences at most. Talk like a normal person, not a corporate bot.
If you don't know something specific about him, say so plainly and suggest they check
the relevant section of the site or reach out directly. Don't use bullet points or emoji.`;

type Msg = { role: "user" | "assistant" | "system"; content: string };
type EngineStatus = "idle" | "loading" | "ready" | "error";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<EngineStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [generating, setGenerating] = useState(false);

  const engineRef = useRef<any>(null);
  const historyRef = useRef<Msg[]>([{ role: "system", content: SYSTEM_PROMPT }]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load the model lazily — only once the visitor actually opens the panel,
  // so nobody pays the download cost just for landing on the page.
  useEffect(() => {
    if (!open || status !== "idle") return;

    let cancelled = false;
    setStatus("loading");

    (async () => {
      if (!("gpu" in navigator)) {
        setStatus("error");
        setProgressText("Your browser doesn't support WebGPU. Try the latest Chrome or Edge on desktop.");
        return;
      }

      try {
        const webllm = await import("@mlc-ai/web-llm");
        const engine = new webllm.MLCEngine();
        engine.setInitProgressCallback((report: any) => {
          if (cancelled) return;
          setProgress(Math.round((report.progress || 0) * 100));
          setProgressText(report.text || "Loading…");
        });
        await engine.reload(MODEL_ID);
        if (cancelled) return;
        engineRef.current = engine;
        setStatus("ready");
      } catch (err) {
        console.error(err);
        if (!cancelled) {
          setStatus("error");
          setProgressText("Couldn't load the model. Check the console for details.");
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [open, status]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, generating]);

  async function send() {
    const text = input.trim();
    if (!text || generating || status !== "ready") return;

    const userMsg: Msg = { role: "user", content: text };
    historyRef.current.push(userMsg);
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setGenerating(true);

    try {
      const stream = await engineRef.current.chat.completions.create({
        messages: historyRef.current,
        stream: true,
        temperature: 0.8,
        max_tokens: 400,
      });

      let reply = "";
      setMessages((m) => [...m, { role: "assistant", content: "" }]);

      for await (const chunk of stream) {
        const delta = chunk.choices[0]?.delta?.content || "";
        if (!delta) continue;
        reply += delta;
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: reply };
          return copy;
        });
      }

      historyRef.current.push({ role: "assistant", content: reply || "…" });
    } catch (err) {
      console.error(err);
      setMessages((m) => [...m, { role: "assistant", content: "Sorry, something broke generating that reply." }]);
    } finally {
      setGenerating(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 font-mono">
      {open && (
        <div className="mb-3 flex h-[420px] w-[320px] flex-col overflow-hidden rounded-lg border border-red-600/40 bg-black shadow-[0_0_24px_rgba(220,38,38,0.25)] sm:w-[360px]">
          {/* header */}
          <div className="flex items-center justify-between border-b border-red-600/30 bg-zinc-950 px-3 py-2">
            <div className="flex items-center gap-2">
              <span
                className={`h-2 w-2 rounded-full ${
                  status === "ready" ? "bg-red-500 animate-pulse" : "bg-zinc-600"
                }`}
              />
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
            {status === "loading" && (
              <div className="text-zinc-500 text-xs">
                <p className="mb-2">$ loading model… ({progress}%)</p>
                <div className="h-1 w-full rounded-full bg-zinc-800">
                  <div
                    className="h-1 rounded-full bg-red-600 transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="mt-2 text-zinc-600">{progressText}</p>
              </div>
            )}

            {status === "error" && (
              <p className="text-xs text-red-400">$ error: {progressText}</p>
            )}

            {status === "ready" && messages.length === 0 && (
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

            {generating && messages[messages.length - 1]?.content === "" && (
              <p className="text-xs text-zinc-500">…</p>
            )}
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
              disabled={status !== "ready" || generating}
              placeholder={status === "ready" ? "type a message…" : "waiting for model…"}
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
