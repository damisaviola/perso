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
    default: "Damianus Saviola | Creative Frontend Developer & UI Engineer",
    template: "%s | damisaviola.",
  },
  description: "Portfolio Neo Brutalism UI berani, modern, dan interaktif karya Damianus Saviola Maturbongs - Creative Frontend Developer, UI Engineer, dan Creative Coder.",
  keywords: ["Damianus Saviola Maturbongs", "Frontend Developer", "UI Engineer", "Neo Brutalism", "React", "Next.js", "Portfolio", "Creative Coder", "Web Developer Indonesia"],
  authors: [{ name: "Damianus Saviola Maturbongs", url: "https://github.com/damisaviola" }],
  creator: "Damianus Saviola Maturbongs",
  publisher: "Damianus Saviola Maturbongs",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Damianus Saviola | Creative Frontend Developer",
    description: "Portofolio Neo Brutalism UI yang berani, penuh warna, dan interaktif karya Damianus Saviola Maturbongs.",
    url: "/",
    siteName: "damisaviola. Portfolio",
    locale: "id_ID",
    type: "website",
    // images: [
    //   {
    //     url: "/og-image.png", // Tambahkan gambar og-image.png (1200x630) di folder public/
    //     width: 1200,
    //     height: 630,
    //     alt: "damisaviola. Portfolio Preview",
    //   },
    // ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Damianus Saviola | Creative Frontend Developer",
    description: "Portofolio Neo Brutalism UI yang berani, penuh warna, dan interaktif.",
    creator: "@damisaviola", // Ganti dengan username twitter kamu jika ada
    // images: ["/og-image.png"], // Tambahkan gambar og-image.png di folder public/
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
    // google: "your-google-site-verification", // Tambahkan jika mendaftar Google Search Console
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
      <GoogleAnalytics gaId="G-XXXXXXXXXX" />
    </html>
  );
}

