import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://damisaviola.com"),
  title: {
    default: "Damianus Saviola | Personal Website",
    template: "%s | damisaviola.",
  },
  description: "Situs personal Damianus Saviola Maturbongs — proyek web, aktivitas GitHub, tontonan film di Letterboxd, dan catatan.",
  keywords: ["Damianus Saviola Maturbongs", "Dami Saviola", "Personal Website", "Web Developer", "React", "Next.js", "Laravel", "Yogyakarta", "Letterboxd", "Indonesia"],
  authors: [{ name: "Damianus Saviola Maturbongs", url: "https://github.com/damisaviola" }],
  creator: "Damianus Saviola Maturbongs",
  publisher: "Damianus Saviola Maturbongs",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Damianus Saviola | Personal Website",
    description: "Situs personal Damianus Saviola Maturbongs — kumpulan proyek web, catatan, dan aktivitas.",
    url: "/",
    siteName: "damisaviola.",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Damianus Saviola | Personal Website",
    description: "Situs personal Damianus Saviola Maturbongs — kumpulan proyek web, catatan, dan aktivitas.",
    creator: "@damisaviola",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
  }
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
        className="font-sans bg-[#f5f5f7] text-[#1d1d1f] dark:bg-[#000000] dark:text-[#f5f5f7] selection:bg-[#0071e3] selection:text-white dark:selection:bg-[#2997ff] dark:selection:text-[#000000] transition-colors duration-200 min-h-screen antialiased"
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
      <GoogleAnalytics gaId="G-XXXXXXXXXX" />
    </html>
  );
}

