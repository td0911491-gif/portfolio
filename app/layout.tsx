import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CircuitField from "@/components/CircuitField";
import ChatWidget from "@/components/ChatWidget";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Tamoghna Dhar",
  description: "Portfolio of Tamoghna Dhar",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${jetbrainsMono.variable} font-mono bg-bg text-cream`}>
        <CircuitField />
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
