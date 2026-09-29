"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ChevronRight, Mail, Briefcase, Film, BookOpen, ExternalLink, Gamepad2, Music } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";
import { PORTFOLIO_DATA } from "@/lib/data";

interface HeroSectionProps {
  activeMode: "work" | "hobbies";
  onSelectMode: (mode: "work" | "hobbies") => void;
}

export default function HeroSection({ activeMode, onSelectMode }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative pt-12 sm:pt-16 md:pt-24 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-8 border-b border-black/[0.05] dark:border-white/[0.06]"
    >
      <div className="max-w-5xl mx-auto w-full">

        {/* Dual Mode Perspective Switcher */}
        <div className="mb-6 sm:mb-8">
          <div className="w-full sm:w-auto inline-flex p-1 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08]">
            <button
              onClick={() => onSelectMode("work")}
              className={`flex-1 sm:flex-initial justify-center relative px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium rounded-full transition-colors cursor-pointer flex items-center gap-1.5 sm:gap-2 ${
                activeMode === "work"
                  ? "text-[#0f172a] dark:text-[#f8fafc]"
                  : "text-[#64748b] hover:text-[#0f172a] dark:hover:text-[#f8fafc]"
              }`}
            >
              {activeMode === "work" && (
                <motion.div
                  layoutId="heroSegmentedPill"
                  className="absolute inset-0 bg-white dark:bg-[#1e293b] rounded-full shadow-xs border border-black/[0.04] dark:border-white/[0.08]"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
              <Briefcase className="w-3.5 h-3.5 relative z-10 shrink-0" />
              <span className="relative z-10 font-medium truncate">Kerjaan & Proyek</span>
            </button>

            <button
              onClick={() => onSelectMode("hobbies")}
              className={`flex-1 sm:flex-initial justify-center relative px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium rounded-full transition-colors cursor-pointer flex items-center gap-1.5 sm:gap-2 ${
                activeMode === "hobbies"
                  ? "text-[#0f172a] dark:text-[#f8fafc]"
                  : "text-[#64748b] hover:text-[#0f172a] dark:hover:text-[#f8fafc]"
              }`}
            >
              {activeMode === "hobbies" && (
                <motion.div
                  layoutId="heroSegmentedPill"
                  className="absolute inset-0 bg-white dark:bg-[#1e293b] rounded-full shadow-xs border border-black/[0.04] dark:border-white/[0.08]"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
              <Film className="w-3.5 h-3.5 relative z-10 shrink-0" />
              <span className="relative z-10 font-medium truncate">Hobi & Kultur</span>
            </button>
          </div>
        </div>

        {/* Dynamic Content based on Active Mode */}
        <AnimatePresence mode="wait">
          {activeMode === "work" ? (
            <motion.div
              key="work-hero"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
            >
              {/* Availability Status Chip */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 mb-4 sm:mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Terbuka untuk kolaborasi proyek web</span>
              </div>

              {/* Display Headline */}
              <h1 className="font-heading font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-[#0f172a] dark:text-[#f8fafc] leading-[1.1] max-w-3xl">
                Damianus Saviola
              </h1>

              {/* Human Bio & Role */}
              <p className="mt-4 sm:mt-5 text-base sm:text-lg md:text-xl text-[#64748b] dark:text-[#94a3b8] max-w-2xl leading-relaxed font-normal">
                Frontend Developer & UI Engineer berbasis di Yogyakarta. Berfokus pada perancangan antarmuka web modern yang responsif, terstruktur rapi, dan nyaman digunakan dengan ekosistem Next.js, React, dan Vue.
              </p>

              {/* Action Controls */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-6 sm:pt-8">
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-[#0f172a] hover:bg-[#1e293b] text-white dark:bg-[#f8fafc] dark:hover:bg-[#e2e8f0] dark:text-[#0f172a] text-xs sm:text-sm font-medium transition-all shadow-xs active:scale-95"
                >
                  <span>Lihat Proyek</span>
                  <ArrowDown className="w-3.5 h-3.5" />
                </a>

                <a
                  href="#github"
                  className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-black/[0.04] dark:bg-white/[0.08] border border-black/[0.06] dark:border-white/[0.08] text-xs sm:text-sm font-medium text-[#0f172a] dark:text-[#f8fafc] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] transition-colors active:scale-95"
                >
                  <span>Aktivitas GitHub</span>
                </a>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-[#2563eb] dark:text-[#60a5fa] hover:underline px-2 py-2"
                >
                  <span>Hubungi saya</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>

                <div className="h-4 w-px bg-black/10 dark:bg-white/10 hidden md:block mx-1" />

                {/* Social Icons */}
                <div className="flex items-center gap-1">
                  <a
                    href="https://github.com/damisaviola"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full text-[#64748b] hover:text-[#0f172a] dark:hover:text-[#f8fafc] hover:bg-black/[0.04] dark:hover:bg-white/[0.08] transition-colors active:scale-90"
                    aria-label="GitHub Profile"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                  <a
                    href="https://linkedin.com/in/damimaturbongs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full text-[#64748b] hover:text-[#0f172a] dark:hover:text-[#f8fafc] hover:bg-black/[0.04] dark:hover:bg-white/[0.08] transition-colors active:scale-90"
                    aria-label="LinkedIn Profile"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                    className="p-2 rounded-full text-[#64748b] hover:text-[#0f172a] dark:hover:text-[#f8fafc] hover:bg-black/[0.04] dark:hover:bg-white/[0.08] transition-colors active:scale-90"
                    aria-label="Send Email"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="hobbies-hero"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
            >
              {/* Display Headline */}
              <h1 className="font-heading font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-[#0f172a] dark:text-[#f8fafc] leading-[1.1] max-w-3xl">
                Di Luar Koding
              </h1>

              <p className="mt-4 sm:mt-5 text-base sm:text-lg md:text-xl text-[#64748b] dark:text-[#94a3b8] max-w-2xl leading-relaxed font-normal">
                Kultur dan minat di waktu rehat — dari arsip tontonan film di <span className="text-[#0f172a] dark:text-[#f8fafc] font-medium">Letterboxd</span>, apresiasi <span className="text-[#0f172a] dark:text-[#f8fafc] font-medium">komik & novel grafis</span>, catatan jam bermain game di <span className="text-[#0f172a] dark:text-[#f8fafc] font-medium">Steam</span>, hingga playlist di <span className="text-[#0f172a] dark:text-[#f8fafc] font-medium">Spotify</span>.
              </p>

              {/* Action Controls */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-6 sm:pt-8">
                <a
                  href="#letterboxd"
                  className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-[#0f172a] hover:bg-[#1e293b] text-white dark:bg-[#f8fafc] dark:hover:bg-[#e2e8f0] dark:text-[#0f172a] text-xs sm:text-sm font-medium transition-all shadow-xs active:scale-95"
                >
                  <span>Tontonan Film</span>
                  <ArrowDown className="w-3.5 h-3.5" />
                </a>

                <a
                  href="#comics"
                  className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-black/[0.05] dark:bg-white/[0.1] text-xs sm:text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-black/[0.08] dark:hover:bg-white/[0.15] transition-colors active:scale-95"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Top 10 Komik</span>
                </a>

                <a
                  href="#steam"
                  className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-black/[0.05] dark:bg-white/[0.1] text-xs sm:text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-black/[0.08] dark:hover:bg-white/[0.15] transition-colors active:scale-95"
                >
                  <Gamepad2 className="w-3.5 h-3.5" />
                  <span>Aktivitas Steam</span>
                </a>

                <a
                  href="#spotify"
                  className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-black/[0.05] dark:bg-white/[0.1] text-xs sm:text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-black/[0.08] dark:hover:bg-white/[0.15] transition-colors active:scale-95"
                >
                  <Music className="w-3.5 h-3.5 text-[#1DB954]" />
                  <span>Playlist Spotify</span>
                </a>

                <a
                  href="https://letterboxd.com/damisaviola"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-[#0071e3] dark:text-[#2997ff] hover:underline px-2 py-2"
                >
                  <span>@damisaviola di Letterboxd</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <div className="h-4 w-px bg-black/10 dark:bg-white/10 hidden md:block mx-1" />

                {/* Quick Link to Interactive Canvas */}
                <a
                  href="#canvas"
                  className="inline-flex items-center gap-1.5 text-xs text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7] transition-colors py-2 px-1"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Kanvas Tamu</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
