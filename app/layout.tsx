import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "damisaviola.",
  description: "Portfolio Neo Brutalism UI berani, modern, dan interaktif karya Damianus Saviola Maturbongs - Creative Frontend Developer, UI Engineer, dan Creative Coder.",
  keywords: ["Damianus Saviola Maturbongs", "Frontend Developer", "UI Engineer", "Neo Brutalism", "React", "Next.js", "Portfolio", "Creative Coder"],
  authors: [{ name: "Damianus Saviola Maturbongs" }],
  openGraph: {
    title: "damisaviola.",
    description: "Portofolio Neo Brutalism UI yang berani, penuh warna, dan interaktif.",
    type: "website",
  },
};

import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${spaceGrotesk.variable} ${plusJakarta.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body 
        className="font-sans bg-[#FFF9F0] text-[#111111] dark:bg-[#0F0F12] dark:text-[#F3F4F6] selection:bg-[#FFD60A] selection:text-[#111111] transition-colors duration-300 min-h-screen"
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

