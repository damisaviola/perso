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

        {/* Apple Segmented Control - Dual Choice: Kerjaan vs Hobi */}
        <div className="mb-6 sm:mb-8">
          <div className="w-full sm:w-auto inline-flex p-1 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.05] dark:border-white/[0.08] backdrop-blur-md">
            <button
              onClick={() => onSelectMode("work")}
              className={`flex-1 sm:flex-initial justify-center relative px-3.5 sm:px-5 py-2 text-xs sm:text-sm font-medium rounded-full transition-colors cursor-pointer flex items-center gap-1.5 sm:gap-2 ${
                activeMode === "work"
                  ? "text-[#1d1d1f] dark:text-[#f5f5f7]"
                  : "text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7]"
              }`}
            >
              {activeMode === "work" && (
                <motion.div
                  layoutId="heroSegmentedPill"
                  className="absolute inset-0 bg-white dark:bg-[#2c2c2e] rounded-full shadow-xs border border-black/[0.04] dark:border-white/[0.08]"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
              <Briefcase className="w-3.5 h-3.5 relative z-10 shrink-0" />
              <span className="relative z-10 font-medium truncate">Kerjaan & Proyek</span>
            </button>

            <button
              onClick={() => onSelectMode("hobbies")}
              className={`flex-1 sm:flex-initial justify-center relative px-3.5 sm:px-5 py-2 text-xs sm:text-sm font-medium rounded-full transition-colors cursor-pointer flex items-center gap-1.5 sm:gap-2 ${
                activeMode === "hobbies"
                  ? "text-[#1d1d1f] dark:text-[#f5f5f7]"
                  : "text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7]"
              }`}
            >
              {activeMode === "hobbies" && (
                <motion.div
                  layoutId="heroSegmentedPill"
                  className="absolute inset-0 bg-white dark:bg-[#2c2c2e] rounded-full shadow-xs border border-black/[0.04] dark:border-white/[0.08]"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
              <Film className="w-3.5 h-3.5 relative z-10 shrink-0" />
              <span className="relative z-10 font-medium truncate">Hobi & Minat</span>
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
              {/* Display Headline */}
              <h1 className="font-heading font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] leading-[1.1] max-w-3xl">
                Damianus Saviola.
              </h1>

              {/* Action Controls */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-6 sm:pt-8">
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-[#0071e3] text-white text-xs sm:text-sm font-medium hover:bg-[#0077ed] transition-colors shadow-xs active:scale-95"
                >
                  <span>Lihat Proyek</span>
                  <ArrowDown className="w-3.5 h-3.5" />
                </a>

                <a
                  href="#github"
                  className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-black/[0.05] dark:bg-white/[0.1] text-xs sm:text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-black/[0.08] dark:hover:bg-white/[0.15] transition-colors active:scale-95"
                >
                  <span>Aktivitas GitHub</span>
                </a>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-[#0071e3] dark:text-[#2997ff] hover:underline px-2 py-2"
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
                    className="p-2 rounded-full text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7] hover:bg-black/[0.04] dark:hover:bg-white/[0.08] transition-colors active:scale-90"
                    aria-label="GitHub Profile"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                  <a
                    href="https://linkedin.com/in/damimaturbongs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7] hover:bg-black/[0.04] dark:hover:bg-white/[0.08] transition-colors active:scale-90"
                    aria-label="LinkedIn Profile"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                    className="p-2 rounded-full text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7] hover:bg-black/[0.04] dark:hover:bg-white/[0.08] transition-colors active:scale-90"
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
              <h1 className="font-heading font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] leading-[1.1] max-w-3xl">
                Di Luar Koding.
              </h1>

              <p className="mt-4 sm:mt-5 text-base sm:text-lg md:text-xl text-[#86868b] max-w-2xl leading-relaxed font-normal">
                Saat rehat dari baris kode, saya menikmati menonton film di <span className="text-[#1d1d1f] dark:text-[#f5f5f7] font-medium">Letterboxd</span>, membaca <span className="text-[#1d1d1f] dark:text-[#f5f5f7] font-medium">komik & novel grafis</span>, bermain game di <span className="text-[#1d1d1f] dark:text-[#f5f5f7] font-medium">Steam</span>, serta memutar playlist di <span className="text-[#1d1d1f] dark:text-[#f5f5f7] font-medium">Spotify</span>.
              </p>

              {/* Action Controls */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-6 sm:pt-8">
                <a
                  href="#letterboxd"
                  className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-[#0071e3] text-white text-xs sm:text-sm font-medium hover:bg-[#0077ed] transition-colors shadow-xs active:scale-95"
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
