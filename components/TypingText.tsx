"use client";

import { useEffect, useState } from "react";

export default function TypingText({
  lines,
  speed = 35,
  startDelay = 300,
  onDone
}: {
  lines: string[];
  speed?: number;
  startDelay?: number;
  onDone?: () => void;
}) {
  const [displayed, setDisplayed] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;
    let lineIndex = 0;
    let charIndex = 0;
    const shown: string[] = [];

    const start = setTimeout(() => {
      const tick = () => {
        if (cancelled) return;
        if (lineIndex >= lines.length) {
          onDone?.();
          return;
        }
        const current = lines[lineIndex];
        charIndex++;
        shown[lineIndex] = current.slice(0, charIndex);
        setDisplayed([...shown]);
        if (charIndex >= current.length) {
          lineIndex++;
          charIndex = 0;
          setTimeout(tick, 220);
        } else {
          setTimeout(tick, speed);
        }
      };
      tick();
    }, startDelay);

    return () => {
      cancelled = true;
      clearTimeout(start);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {displayed.map((line, i) => (
        <div key={i}>{line}</div>
      ))}
    </>
  );
}
