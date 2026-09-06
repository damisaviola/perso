"use client";

import { useState } from "react";
import { Menu, X, ArrowUpRight, Briefcase, Film } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";

interface NavbarProps {
  activeMode: "work" | "hobbies";
  onSelectMode: (mode: "work" | "hobbies") => void;
}

export default function Navbar({ activeMode, onSelectMode }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const workLinks = [
    { name: "Proyek", href: "#projects" },
    { name: "GitHub", href: "#github" },
    { name: "Pengalaman", href: "#experience" },
    { name: "Kontak", href: "#contact" },
  ];

  const hobbiesLinks = [
    { name: "Film", href: "#letterboxd" },
    { name: "Komik", href: "#comics" },
    { name: "Steam", href: "#steam" },
    { name: "Musik", href: "#spotify" },
    { name: "Catatan", href: "#blog" },
    { name: "Kanvas", href: "#canvas" },
  ];

  const currentLinks = activeMode === "work" ? workLinks : hobbiesLinks;

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#f5f5f7]/85 dark:bg-[#000000]/85 border-b border-black/[0.06] dark:border-white/[0.08] transition-colors duration-200">
      <nav className="max-w-5xl mx-auto px-4 sm:px-8 h-12 sm:h-14 flex items-center justify-between gap-3">
        {/* Apple Brand Mark */}
        <a
          href="#hero"
          className="flex items-center group cursor-pointer shrink-0"
        >
          <span className="font-heading font-semibold text-base sm:text-lg tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] group-hover:opacity-75 transition-opacity">
            damisaviola<span className="text-[#0071e3] dark:text-[#2997ff]">.</span>
          </span>
        </a>

        {/* Center: Apple Segmented Pill Switcher */}
        <div className="hidden sm:inline-flex p-0.5 rounded-full bg-black/[0.05] dark:bg-white/[0.08] border border-black/[0.04] dark:border-white/[0.06]">
          <button
            onClick={() => onSelectMode("work")}
            className={`relative px-3 py-1 text-xs font-medium rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
              activeMode === "work"
                ? "text-[#1d1d1f] dark:text-[#f5f5f7]"
                : "text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7]"
            }`}
          >
            {activeMode === "work" && (
              <motion.div
                layoutId="navSegmentedPill"
                className="absolute inset-0 bg-white dark:bg-[#2c2c2e] rounded-full shadow-xs"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            <Briefcase className="w-3 h-3 relative z-10" />
            <span className="relative z-10">Kerjaan</span>
          </button>

          <button
            onClick={() => onSelectMode("hobbies")}
            className={`relative px-3 py-1 text-xs font-medium rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
              activeMode === "hobbies"
                ? "text-[#1d1d1f] dark:text-[#f5f5f7]"
                : "text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7]"
            }`}
          >
            {activeMode === "hobbies" && (
              <motion.div
                layoutId="navSegmentedPill"
                className="absolute inset-0 bg-white dark:bg-[#2c2c2e] rounded-full shadow-xs"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            <Film className="w-3 h-3 relative z-10" />
            <span className="relative z-10">Hobi</span>
          </button>
        </div>

        {/* Desktop Dynamic Navigation Links */}
        <div className="hidden md:flex items-center gap-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMode}
              initial={{ opacity: 0, y: -2 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 2 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-5"
            >
              {currentLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-[13px] text-[#1d1d1f]/70 dark:text-[#f5f5f7]/70 hover:text-[#0071e3] dark:hover:text-[#2997ff] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 -mr-1 text-[#1d1d1f] dark:text-[#f5f5f7] hover:opacity-70 transition-opacity active:scale-95"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b border-black/[0.06] dark:border-white/[0.08] bg-[#f5f5f7]/95 dark:bg-[#000000]/95 backdrop-blur-xl px-4 py-3"
          >
            {/* Mobile Mode Switcher */}
            <div className="flex p-1 mb-3 rounded-full bg-black/[0.05] dark:bg-white/[0.08] border border-black/[0.04] dark:border-white/[0.06]">
              <button
                onClick={() => onSelectMode("work")}
                className={`flex-1 py-1.5 text-xs font-medium rounded-full transition-all flex items-center justify-center gap-1.5 ${
                  activeMode === "work"
                    ? "bg-white dark:bg-[#2c2c2e] text-[#1d1d1f] dark:text-[#f5f5f7] shadow-xs"
                    : "text-[#86868b]"
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Kerjaan</span>
              </button>
              <button
                onClick={() => onSelectMode("hobbies")}
                className={`flex-1 py-1.5 text-xs font-medium rounded-full transition-all flex items-center justify-center gap-1.5 ${
                  activeMode === "hobbies"
                    ? "bg-white dark:bg-[#2c2c2e] text-[#1d1d1f] dark:text-[#f5f5f7] shadow-xs"
                    : "text-[#86868b]"
                }`}
              >
                <Film className="w-3.5 h-3.5" />
                <span>Hobi</span>
              </button>
            </div>

            <div className="flex flex-col divide-y divide-black/[0.04] dark:divide-white/[0.06]">
              {currentLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-medium py-3 text-[#1d1d1f]/80 dark:text-[#f5f5f7]/80 hover:text-[#0071e3] dark:hover:text-[#2997ff] flex items-center justify-between active:opacity-60"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-40" />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
