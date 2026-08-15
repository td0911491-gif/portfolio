import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const SYSTEM_PROMPT = `You are the AI assistant embedded in Tamoghna Dhar's developer portfolio site.
Tamoghna is a 1st-year BCA student at Brainware University and a Software Engineer Intern at HackerRank,
working with Python, SQL, and Java, with an interest in AI/ML. He's built projects including Mathopia
(a math game), CogniDBG (a debugger), and RouteComps AI (an AI-powered travel comparison app). He holds
certifications including CS50x from Harvard, HackerRank certifications in Problem Solving and SQL, and
a Deloitte data analytics job simulation. Outside of code his interests include cooking, basketball,
cricket, football, and music.

Answer visitor questions about his background, skills, and projects in a friendly, concise way -- a
few sentences at most. Talk like a normal person, not a corporate bot. If you don't know something
specific about him, say so plainly and suggest they check the relevant section of the site or reach
out directly. Don't use bullet points or emoji.`;

type ChatMessage = { role: "user" | "assistant"; content: string };

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Server is missing GEMINI_API_KEY" }, { status: 500 });
  }

  const { messages } = (await req.json()) as { messages: ChatMessage[] };
  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "No messages provided" }, { status: 400 });
  }

  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  try {
    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents,
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          generationConfig: { maxOutputTokens: 300, temperature: 0.8 },
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.error("Gemini API error:", data);
      return NextResponse.json({ error: "Upstream API error" }, { status: 502 });
    }

    const reply =
      data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text || "").join("") ||
      "Sorry, I couldn't come up with a reply to that.";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to reach the model" }, { status: 500 });
  }
}
