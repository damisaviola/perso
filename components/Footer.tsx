"use client";

import { ArrowUp, Briefcase, Film } from "lucide-react";
import { PORTFOLIO_DATA } from "@/lib/data";
import {
  GithubIcon,
  LinkedinIcon,
} from "./SocialIcons";

interface FooterProps {
  activeMode?: "work" | "hobbies";
  onSelectMode?: (mode: "work" | "hobbies") => void;
}

export default function Footer({ activeMode = "work", onSelectMode }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-10 sm:py-12 px-4 sm:px-8 border-t border-black/[0.05] dark:border-white/[0.06] bg-[#f5f5f7] dark:bg-[#000000]">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Top Row: Brand & Quick Navigation */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="font-heading font-semibold text-base sm:text-lg tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7]">
              damisaviola<span className="text-[#0071e3] dark:text-[#2997ff]">.</span>
            </span>
          </div>

          {/* Nav Quick Links */}
          <div className="flex flex-wrap items-center gap-3.5 sm:gap-5 text-xs text-[#86868b]">
            <a href="#hero" className="hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7] transition-colors py-1">Awal</a>
            
            {activeMode === "work" ? (
              <>
                <a href="#projects" className="hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7] transition-colors py-1">Proyek</a>
                <a href="#github" className="hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7] transition-colors py-1">GitHub</a>
                <a href="#experience" className="hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7] transition-colors py-1">Pengalaman</a>
                <a href="#contact" className="hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7] transition-colors py-1">Kontak</a>
                {onSelectMode && (
                  <button
                    onClick={() => onSelectMode("hobbies")}
                    className="inline-flex items-center gap-1 text-[#0071e3] dark:text-[#2997ff] hover:underline cursor-pointer py-1 ml-1"
                  >
                    <Film className="w-3 h-3" />
                    <span>Mode Hobi</span>
                  </button>
                )}
              </>
            ) : (
              <>
                <a href="#letterboxd" className="hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7] transition-colors py-1">Film</a>
                <a href="#comics" className="hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7] transition-colors py-1">Komik</a>
                <a href="#steam" className="hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7] transition-colors py-1">Steam</a>
                <a href="#spotify" className="hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7] transition-colors py-1">Musik</a>
                <a href="#blog" className="hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7] transition-colors py-1">Catatan</a>
                <a href="#canvas" className="hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7] transition-colors py-1">Kanvas</a>
                {onSelectMode && (
                  <button
                    onClick={() => onSelectMode("work")}
                    className="inline-flex items-center gap-1 text-[#0071e3] dark:text-[#2997ff] hover:underline cursor-pointer py-1 ml-1"
                  >
                    <Briefcase className="w-3 h-3" />
                    <span>Mode Kerjaan</span>
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-black/[0.05] dark:border-white/[0.06] flex items-center justify-between gap-4 text-xs text-[#86868b]">
          <div className="flex items-center gap-1.5">
            <a
              href={PORTFOLIO_DATA.personal.github}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-full hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7] transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={PORTFOLIO_DATA.personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-full hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7] transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1 text-xs text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7] transition-colors cursor-pointer py-1 active:scale-95"
          >
            <span>Atas</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>

      </div>
    </footer>
  );
}
