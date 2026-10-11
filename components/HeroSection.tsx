"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDown,
  ChevronRight,
  Mail,
  Briefcase,
  Film,
  BookOpen,
  ExternalLink,
  Gamepad2,
  Music,
  Sparkles,
  Dices,
  Terminal,
  Shield,
  Zap,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";
import { PORTFOLIO_DATA } from "@/lib/data";
import { soundFX } from "@/lib/sound";
import { useGame } from "./GameContext";

interface HeroSectionProps {
  activeMode: "work" | "hobbies";
  onSelectMode: (mode: "work" | "hobbies") => void;
}

export default function HeroSection({ activeMode, onSelectMode }: HeroSectionProps) {
  const { addXp, setArcadeOpen } = useGame();
  const [diceRollResult, setDiceRollResult] = useState<string | null>(null);
  const [isRolling, setIsRolling] = useState(false);

  const rollD20 = (e: React.MouseEvent) => {
    if (isRolling) return;
    setIsRolling(true);
    soundFX.playPowerUp();

    const outcomes = [
      { score: 20, msg: "NATURAL 20! Critical hotfix shipped without bugs! (+50 XP)", xp: 50 },
      { score: 19, msg: "Rolled 19! CSS grid centered div vertically on first try! (+40 XP)", xp: 40 },
      { score: 18, msg: "Rolled 18! Next.js Turbopack build finished in 0.8s! (+35 XP)", xp: 35 },
      { score: 16, msg: "Rolled 16! TypeScript inferred all complicated generic types! (+30 XP)", xp: 30 },
      { score: 14, msg: "Rolled 14! Git rebase executed smoothly without conflicts! (+25 XP)", xp: 25 },
      { score: 12, msg: "Rolled 12! Coffee brewed to perfection, stamina refilled! (+20 XP)", xp: 20 },
    ];

    setTimeout(() => {
      const picked = outcomes[Math.floor(Math.random() * outcomes.length)];
      setDiceRollResult(picked.msg);
      setIsRolling(false);
      addXp(picked.xp, `D20 Roll: ${picked.score}`, { x: e.clientX, y: e.clientY });
    }, 600);
  };

  return (
    <section
      id="hero"
      className="relative pt-10 sm:pt-14 md:pt-20 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-8 border-b border-black/[0.06] dark:border-white/[0.08] overflow-hidden"
    >
      {/* Subtle Game Grid Ambient Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full relative z-10">

        {/* Dual Mode Switcher styled like Arcade Console Tabs */}
        <div className="mb-6 sm:mb-8 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex p-1 rounded-2xl bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.08] dark:border-white/[0.1] shadow-inner">
            <button
              onClick={() => {
                soundFX.playClick();
                onSelectMode("work");
              }}
              onMouseEnter={() => soundFX.playHover()}
              className={`relative px-4 sm:px-5 py-2 text-xs sm:text-sm font-mono font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-2 ${
                activeMode === "work"
                  ? "text-[#0f172a] dark:text-[#38bdf8]"
                  : "text-[#64748b] hover:text-[#0f172a] dark:hover:text-white"
              }`}
            >
              {activeMode === "work" && (
                <motion.div
                  layoutId="heroSegmentedPill"
                  className="absolute inset-0 bg-white dark:bg-[#131d33] rounded-xl shadow-xs border border-black/[0.06] dark:border-cyan-500/30"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
              <Briefcase className="w-3.5 h-3.5 relative z-10 shrink-0 text-cyan-500" />
              <span className="relative z-10 uppercase tracking-wider">⚔️ MAIN QUEST (WORK)</span>
            </button>

            <button
              onClick={() => {
                soundFX.playPowerUp();
                onSelectMode("hobbies");
              }}
              onMouseEnter={() => soundFX.playHover()}
              className={`relative px-4 sm:px-5 py-2 text-xs sm:text-sm font-mono font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-2 ${
                activeMode === "hobbies"
                  ? "text-[#0f172a] dark:text-[#f59e0b]"
                  : "text-[#64748b] hover:text-[#0f172a] dark:hover:text-white"
              }`}
            >
              {activeMode === "hobbies" && (
                <motion.div
                  layoutId="heroSegmentedPill"
                  className="absolute inset-0 bg-white dark:bg-[#131d33] rounded-xl shadow-xs border border-black/[0.06] dark:border-amber-500/30"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
              <Film className="w-3.5 h-3.5 relative z-10 shrink-0 text-amber-500" />
              <span className="relative z-10 uppercase tracking-wider">🍺 TAVERN (LORE & HOBBIES)</span>
            </button>
          </div>

          {/* Quick Arcade Launcher Pill */}
          <button
            onClick={() => {
              soundFX.playClick();
              setArcadeOpen(true);
            }}
            onMouseEnter={() => soundFX.playHover()}
            className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 hover:from-cyan-500/20 hover:to-blue-500/20 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 font-mono text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer"
          >
            <Gamepad2 className="w-4 h-4 animate-bounce" />
            <span>PLAY BUG BUSTER ARCADE</span>
          </button>
        </div>

        {/* Dynamic Content based on Active Mode */}
        <AnimatePresence mode="wait">
          {activeMode === "work" ? (
            <motion.div
              key="work-hero"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              {/* Player 1 Status Card & Character HUD */}
              <div className="flex flex-wrap items-center gap-2 mb-4 sm:mb-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>PLAYER 1 [ONLINE] // LVL 25 FRONTEND ARCHITECT</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono text-slate-500 dark:text-slate-400 bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08]">
                  <span>📍 REALM: YOGYAKARTA, ID</span>
                </div>
              </div>

              {/* Display Headline */}
              <h1 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-[#0f172a] dark:text-[#f8fafc] leading-[1.08] max-w-4xl">
                Damianus Saviola
              </h1>

              {/* Bio styled like RPG Character Spec */}
              <p className="mt-4 sm:mt-5 text-base sm:text-lg md:text-xl text-[#475569] dark:text-[#94a3b8] max-w-2xl leading-relaxed font-normal">
                Frontend Developer & UI Engineer yang merancang antarmuka web modern, responsif, dan interaktif dengan ekosistem <span className="font-semibold text-cyan-600 dark:text-cyan-400">Next.js, React, Vue, & TypeScript</span>. Siap memimpin misi rekayasa web skala produksi.
              </p>

              {/* RPG Character Attributes HUD Cards */}
              <div className="mt-6 sm:mt-7 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 max-w-2xl">
                <div className="p-2.5 sm:p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08] flex flex-col">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    <span className="font-bold text-cyan-600 dark:text-cyan-400">DEX (Frontend)</span>
                    <span className="font-bold text-slate-700 dark:text-slate-200">98/100</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-cyan-500 rounded-full" style={{ width: "98%" }} />
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 truncate">Next.js & React Mastery</span>
                </div>

                <div className="p-2.5 sm:p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08] flex flex-col">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    <span className="font-bold text-blue-600 dark:text-blue-400">INT (Architecture)</span>
                    <span className="font-bold text-slate-700 dark:text-slate-200">92/100</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: "92%" }} />
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 truncate">TypeScript & Clean Code</span>
                </div>

                <div className="p-2.5 sm:p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08] flex flex-col">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    <span className="font-bold text-purple-600 dark:text-purple-400">STR (Backend)</span>
                    <span className="font-bold text-slate-700 dark:text-slate-200">88/100</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: "88%" }} />
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 truncate">Go, PHP, Laravel, DB</span>
                </div>

                <div className="p-2.5 sm:p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08] flex flex-col">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    <span className="font-bold text-amber-600 dark:text-amber-400">STA (Resilience)</span>
                    <span className="font-bold text-slate-700 dark:text-slate-200">95/100</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: "95%" }} />
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 truncate">Fueled by Caffeine & Code</span>
                </div>
              </div>

              {/* Action Controls & Interactive Dice Roller */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-6 sm:pt-8">
                <a
                  href="#projects"
                  onClick={() => soundFX.playClick()}
                  onMouseEnter={() => soundFX.playHover()}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#0f172a] hover:bg-[#1e293b] text-white dark:bg-gradient-to-r dark:from-cyan-500 dark:to-blue-600 dark:hover:from-cyan-400 dark:hover:to-blue-500 dark:text-white text-xs sm:text-sm font-mono font-bold transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] active:scale-95 cursor-pointer"
                >
                  <span>⚔️ JELAJAHI BOUNTY PROYEK</span>
                  <ArrowDown className="w-3.5 h-3.5" />
                </a>

                <a
                  href="#skills"
                  onClick={() => soundFX.playClick()}
                  onMouseEnter={() => soundFX.playHover()}
                  className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-black/[0.04] dark:bg-white/[0.08] border border-black/[0.06] dark:border-white/[0.08] text-xs sm:text-sm font-mono font-bold text-[#0f172a] dark:text-[#f8fafc] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] transition-colors active:scale-95"
                >
                  <span>🎒 LOADOUT KEAHLIAN</span>
                </a>

                {/* Interactive D20 Dice Roll */}
                <button
                  onClick={rollD20}
                  onMouseEnter={() => soundFX.playHover()}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-700 dark:text-amber-300 font-mono text-xs font-bold transition-all cursor-pointer active:scale-95 ${
                    isRolling ? "animate-spin" : ""
                  }`}
                  title="Lempar D20 Dice untuk Bonus XP!"
                >
                  <Dices className="w-4 h-4 text-amber-500" />
                  <span>{isRolling ? "ROLLING..." : "ROLL D20 🎲"}</span>
                </button>

                <a
                  href="#contact"
                  onClick={() => soundFX.playClick()}
                  onMouseEnter={() => soundFX.playHover()}
                  className="inline-flex items-center gap-1 text-xs sm:text-sm font-mono font-bold text-[#2563eb] dark:text-[#60a5fa] hover:underline px-2 py-2"
                >
                  <span>📡 Transmit Guild</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>

                <div className="h-4 w-px bg-black/10 dark:bg-white/10 hidden md:block mx-1" />

                {/* Social Icons */}
                <div className="flex items-center gap-1">
                  <a
                    href="https://github.com/damisaviola"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundFX.playClick()}
                    className="p-2 rounded-xl text-[#64748b] hover:text-[#0f172a] dark:hover:text-[#f8fafc] hover:bg-black/[0.04] dark:hover:bg-white/[0.08] transition-colors active:scale-90"
                    aria-label="GitHub Profile"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                  <a
                    href="https://linkedin.com/in/damimaturbongs"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundFX.playClick()}
                    className="p-2 rounded-xl text-[#64748b] hover:text-[#0f172a] dark:hover:text-[#f8fafc] hover:bg-black/[0.04] dark:hover:bg-white/[0.08] transition-colors active:scale-90"
                    aria-label="LinkedIn Profile"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                    onClick={() => soundFX.playClick()}
                    className="p-2 rounded-xl text-[#64748b] hover:text-[#0f172a] dark:hover:text-[#f8fafc] hover:bg-black/[0.04] dark:hover:bg-white/[0.08] transition-colors active:scale-90"
                    aria-label="Send Email"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* D20 Roll Banner Alert */}
              <AnimatePresence>
                {diceRollResult && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 font-mono text-xs flex items-center justify-between gap-2 max-w-xl"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>{diceRollResult}</span>
                    </div>
                    <button
                      onClick={() => setDiceRollResult(null)}
                      className="text-amber-500/80 hover:text-amber-500 p-1"
                    >
                      &times;
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="hobbies-hero"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              {/* Tavern Status Indicator */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30 mb-4 sm:mb-5 shadow-xs">
                <span>🍺 ADVENTURER&apos;S TAVERN // SIDE-QUESTS & LORE</span>
              </div>

              {/* Display Headline */}
              <h1 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-[#0f172a] dark:text-[#f8fafc] leading-[1.08] max-w-3xl">
                Arsip Kultur & Santai
              </h1>

              <p className="mt-4 sm:mt-5 text-base sm:text-lg md:text-xl text-[#64748b] dark:text-[#94a3b8] max-w-2xl leading-relaxed font-normal">
                Koleksi lore dan hiburan saat beristirahat dari dungeon koding — dari holotape sinema di <span className="text-[#0f172a] dark:text-[#f8fafc] font-semibold">Letterboxd</span>, gulungan <span className="text-[#0f172a] dark:text-[#f8fafc] font-semibold">komik & novel grafis</span>, catatan tempur di <span className="text-[#0f172a] dark:text-[#f8fafc] font-semibold">Steam</span>, hingga melodi penyemangat di <span className="text-[#0f172a] dark:text-[#f8fafc] font-semibold">Spotify</span>.
              </p>

              {/* Action Controls for Tavern */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-6 sm:pt-8">
                <a
                  href="#letterboxd"
                  onClick={() => soundFX.playClick()}
                  onMouseEnter={() => soundFX.playHover()}
                  className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-[#0f172a] hover:bg-[#1e293b] text-white dark:bg-[#f8fafc] dark:hover:bg-[#e2e8f0] dark:text-[#0f172a] text-xs sm:text-sm font-mono font-bold transition-all shadow-xs active:scale-95"
                >
                  <Film className="w-3.5 h-3.5" />
                  <span>Sinema Film</span>
                </a>

                <a
                  href="#comics"
                  onClick={() => soundFX.playClick()}
                  onMouseEnter={() => soundFX.playHover()}
                  className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-black/[0.05] dark:bg-white/[0.1] text-xs sm:text-sm font-mono font-bold text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-black/[0.08] dark:hover:bg-white/[0.15] transition-colors active:scale-95"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Gulungan Komik</span>
                </a>

                <a
                  href="#steam"
                  onClick={() => soundFX.playClick()}
                  onMouseEnter={() => soundFX.playHover()}
                  className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-black/[0.05] dark:bg-white/[0.1] text-xs sm:text-sm font-mono font-bold text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-black/[0.08] dark:hover:bg-white/[0.15] transition-colors active:scale-95"
                >
                  <Gamepad2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Riwayat Steam</span>
                </a>

                <a
                  href="#spotify"
                  onClick={() => soundFX.playClick()}
                  onMouseEnter={() => soundFX.playHover()}
                  className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-black/[0.05] dark:bg-white/[0.1] text-xs sm:text-sm font-mono font-bold text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-black/[0.08] dark:hover:bg-white/[0.15] transition-colors active:scale-95"
                >
                  <Music className="w-3.5 h-3.5 text-[#1DB954]" />
                  <span>Jukebox Spotify</span>
                </a>

                <a
                  href="#canvas"
                  onClick={() => soundFX.playClick()}
                  onMouseEnter={() => soundFX.playHover()}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-600 dark:text-amber-400 hover:underline py-2 px-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
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
