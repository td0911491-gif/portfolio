import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { personal } from "@/data/personal";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-mono",
  display: "swap"
});

export const metadata: Metadata = {
  title: `${personal.name} — ${personal.status}`,
  description: personal.bio,
  openGraph: {
    title: `${personal.name} — Portfolio`,
    description: personal.tagline,
    type: "website"
  },
  metadataBase: new URL("https://example.com")
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jetbrainsMono.variable} suppressHydrationWarning>
      <body>
        <Providers>
          <ScrollProgress />
          <Nav />
          <main>{children}</main>
          <Footer />
          <BackToTop />
        </Providers>
      </body>
    </html>
  );
}
