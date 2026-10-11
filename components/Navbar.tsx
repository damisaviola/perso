"use client";

import { useState } from "react";
import { Menu, X, ArrowUpRight, Briefcase, Film, Gamepad2, Volume2, VolumeX, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";
import { soundFX } from "@/lib/sound";
import { useGame } from "./GameContext";

interface NavbarProps {
  activeMode: "work" | "hobbies";
  onSelectMode: (mode: "work" | "hobbies") => void;
}

export default function Navbar({ activeMode, onSelectMode }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { level, isMuted, toggleMute, setArcadeOpen } = useGame();

  const workLinks = [
    { name: "Bounty Proyek", href: "#projects" },
    { name: "Loadout Skills", href: "#skills" },
    { name: "GitHub Activity", href: "#github" },
    { name: "Campaign Exp", href: "#experience" },
    { name: "Guild Kontak", href: "#contact" },
  ];

  const hobbiesLinks = [
    { name: "Sinema Film", href: "#letterboxd" },
    { name: "Top Komik", href: "#comics" },
    { name: "Steam Hub", href: "#steam" },
    { name: "Jukebox Spotify", href: "#spotify" },
    { name: "Arsip Catatan", href: "#blog" },
    { name: "Kanvas Tamu", href: "#canvas" },
  ];

  const currentLinks = activeMode === "work" ? workLinks : hobbiesLinks;

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#fafafa]/90 dark:bg-[#090d16]/90 border-b border-black/[0.08] dark:border-cyan-500/20 transition-colors duration-200">
      <nav className="max-w-5xl mx-auto px-4 sm:px-8 h-13 sm:h-14 flex items-center justify-between gap-3">
        {/* Brand Mark with Arcade Indicator */}
        <a
          href="#hero"
          onClick={() => soundFX.playClick()}
          onMouseEnter={() => soundFX.playHover()}
          className="flex items-center gap-2 group cursor-pointer shrink-0"
        >
          <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-[10px] font-mono font-bold text-white shadow-xs">
            👾
          </div>
          <span className="font-heading font-black text-sm sm:text-base tracking-tight text-[#0f172a] dark:text-[#f8fafc] group-hover:text-cyan-500 transition-colors font-mono">
            damisaviola
          </span>
          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20 hidden xs:inline">
            P1:LVL{level}
          </span>
        </a>

        {/* Center: Dual Mode Switcher */}
        <div className="hidden sm:inline-flex p-1 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08]">
          <button
            onClick={() => {
              soundFX.playClick();
              onSelectMode("work");
            }}
            onMouseEnter={() => soundFX.playHover()}
            className={`relative px-3.5 py-1 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeMode === "work"
                ? "text-[#0f172a] dark:text-cyan-300"
                : "text-[#64748b] hover:text-[#0f172a] dark:hover:text-white"
            }`}
          >
            {activeMode === "work" && (
              <motion.div
                layoutId="navSegmentedPill"
                className="absolute inset-0 bg-white dark:bg-[#131d33] rounded-lg shadow-xs border border-black/[0.04] dark:border-cyan-500/30"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            <Briefcase className="w-3 h-3 relative z-10" />
            <span className="relative z-10">⚔️ Kerjaan</span>
          </button>

          <button
            onClick={() => {
              soundFX.playPowerUp();
              onSelectMode("hobbies");
            }}
            onMouseEnter={() => soundFX.playHover()}
            className={`relative px-3.5 py-1 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeMode === "hobbies"
                ? "text-[#0f172a] dark:text-amber-300"
                : "text-[#64748b] hover:text-[#0f172a] dark:hover:text-white"
            }`}
          >
            {activeMode === "hobbies" && (
              <motion.div
                layoutId="navSegmentedPill"
                className="absolute inset-0 bg-white dark:bg-[#131d33] rounded-lg shadow-xs border border-black/[0.04] dark:border-amber-500/30"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            <Film className="w-3 h-3 relative z-10" />
            <span className="relative z-10">🍺 Hobi</span>
          </button>
        </div>

        {/* Desktop Dynamic Navigation Links */}
        <div className="hidden lg:flex items-center gap-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMode}
              initial={{ opacity: 0, y: -2 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 2 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-4"
            >
              {currentLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => soundFX.playClick()}
                  onMouseEnter={() => soundFX.playHover()}
                  className="text-xs font-mono text-[#64748b] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-cyan-300 font-medium transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Quick Arcade Button */}
          <button
            onClick={() => {
              soundFX.playClick();
              setArcadeOpen(true);
            }}
            onMouseEnter={() => soundFX.playHover()}
            className="p-1.5 sm:px-2.5 sm:py-1 rounded-lg text-xs font-mono font-bold bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20 hover:bg-cyan-500/20 transition-all flex items-center gap-1 cursor-pointer"
            title="Buka Arcade Mini Game"
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">ARCADE</span>
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={toggleMute}
            onMouseEnter={() => soundFX.playHover()}
            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
              !isMuted
                ? "text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border-cyan-500/20"
                : "text-slate-400 border-black/10 dark:border-white/10"
            }`}
            title={isMuted ? "Aktifkan Sound Effects" : "Matikan Suara"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => {
              soundFX.playClick();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            className="lg:hidden p-1.5 text-[#0f172a] dark:text-[#f8fafc] hover:opacity-70 transition-opacity active:scale-95"
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
            className="lg:hidden border-b border-black/[0.06] dark:border-cyan-500/20 bg-[#fafafa]/95 dark:bg-[#090d16]/95 backdrop-blur-xl px-4 py-3"
          >
            {/* Mobile Mode Switcher */}
            <div className="flex p-1 mb-3 rounded-xl bg-black/[0.05] dark:bg-white/[0.08] border border-black/[0.04] dark:border-white/[0.06]">
              <button
                onClick={() => {
                  soundFX.playClick();
                  onSelectMode("work");
                }}
                className={`flex-1 py-1.5 text-xs font-mono font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  activeMode === "work"
                    ? "bg-white dark:bg-[#131d33] text-[#0f172a] dark:text-cyan-300 shadow-xs"
                    : "text-slate-500 dark:text-slate-400"
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>⚔️ Kerjaan</span>
              </button>
              <button
                onClick={() => {
                  soundFX.playPowerUp();
                  onSelectMode("hobbies");
                }}
                className={`flex-1 py-1.5 text-xs font-mono font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  activeMode === "hobbies"
                    ? "bg-white dark:bg-[#131d33] text-[#0f172a] dark:text-amber-300 shadow-xs"
                    : "text-slate-500 dark:text-slate-400"
                }`}
              >
                <Film className="w-3.5 h-3.5" />
                <span>🍺 Hobi</span>
              </button>
            </div>

            <div className="flex flex-col divide-y divide-black/[0.04] dark:divide-white/[0.06]">
              {currentLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    soundFX.playClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-xs font-mono py-2.5 text-[#0f172a]/90 dark:text-[#f8fafc]/90 hover:text-cyan-500 flex items-center justify-between active:opacity-60"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
