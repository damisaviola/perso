"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gamepad2,
  Trophy,
  Volume2,
  VolumeX,
  Tv,
  CheckCircle2,
  Sparkles,
  X,
  HelpCircle,
  Zap,
} from "lucide-react";
import { useGame } from "./GameContext";
import { soundFX } from "@/lib/sound";

export default function GameHUD() {
  const {
    level,
    xp,
    maxXp,
    hp,
    mp,
    isMuted,
    toggleMute,
    crtEnabled,
    toggleCrt,
    setArcadeOpen,
    unlockedAchievements,
    achievementsList,
    floatingXPs,
  } = useGame();

  const [questsModalOpen, setQuestsModalOpen] = useState(false);
  const xpPercent = Math.min(100, Math.round((xp / maxXp) * 100));

  return (
    <>
      {/* Retro CRT Scanlines & Cyber Glow Filter if enabled */}
      {crtEnabled && (
        <div className="fixed inset-0 pointer-events-none z-[999] overflow-hidden">
          {/* Scanlines */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.35)_50%)] bg-[length:100%_4px] opacity-80" />
          {/* Subtle phosphor bloom vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_65%,rgba(0,0,0,0.6)_100%)]" />
        </div>
      )}

      {/* Floating XP Gain Indicators */}
      <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
        <AnimatePresence>
          {floatingXPs.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 1, y: item.y - 20, scale: 0.8 }}
              animate={{ opacity: 0, y: item.y - 90, scale: 1.15 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute left-0 top-0 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{ left: item.x, top: item.y }}
            >
              <div className="px-3 py-1 rounded-full bg-amber-500/90 text-black font-mono font-black text-xs shadow-[0_0_15px_rgba(245,158,11,0.8)] border border-amber-300 flex items-center gap-1.5 whitespace-nowrap">
                <Sparkles className="w-3.5 h-3.5 fill-black" />
                <span>+{item.amount} XP!</span>
                <span className="text-[10px] opacity-80">({item.reason})</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Floating Game HUD Dock at Bottom */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-2xl w-[94%] sm:w-auto pointer-events-auto">
        <div className="p-1.5 sm:p-2 rounded-2xl bg-[#090d16]/90 dark:bg-[#090d16]/95 backdrop-blur-xl border border-cyan-500/30 shadow-[0_10px_35px_rgba(0,0,0,0.5)] flex items-center justify-between sm:justify-start gap-2 sm:gap-3 text-white">
          
          {/* Player Level & Status Badge */}
          <div className="flex items-center gap-2 pl-2 pr-1">
            <div className="relative">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center font-mono font-bold text-xs text-white shadow-sm border border-cyan-400/50">
                P1
              </div>
              <span className="absolute -bottom-1 -right-1 px-1 rounded bg-amber-500 text-[9px] font-mono font-bold text-black leading-tight">
                {level}
              </span>
            </div>

            <div className="hidden sm:flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold text-slate-200">
                  DAMIANUS
                </span>
                <span className="text-[9px] font-mono text-cyan-400 border border-cyan-500/30 px-1 py-0.2 rounded">
                  ARCHITECT
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[9px] font-mono text-slate-400">XP</span>
                <div className="w-20 h-1.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-300"
                    style={{ width: `${xpPercent}%` }}
                  />
                </div>
                <span className="text-[9px] font-mono text-amber-400">{xpPercent}%</span>
              </div>
            </div>
          </div>

          <div className="h-6 w-px bg-white/10 hidden sm:block" />

          {/* Action HUD Buttons */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            {/* Play Arcade Game Button */}
            <button
              onClick={() => {
                soundFX.playClick();
                setArcadeOpen(true);
              }}
              onMouseEnter={() => soundFX.playHover()}
              className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.4)] active:scale-95 transition-all cursor-pointer"
              title="Mainkan Mini Game Arcade"
            >
              <Gamepad2 className="w-3.5 h-3.5 text-cyan-200" />
              <span className="hidden xs:inline">ARCADE</span>
            </button>

            {/* Quests / Achievements Button */}
            <button
              onClick={() => {
                soundFX.playClick();
                setQuestsModalOpen(true);
              }}
              onMouseEnter={() => soundFX.playHover()}
              className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 font-mono text-xs font-medium flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer"
              title="Lihat Pencapaian & Quest"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden xs:inline">QUESTS</span>
              <span className="text-[10px] font-bold text-amber-400 bg-amber-500/20 px-1 rounded">
                {unlockedAchievements.length}/{achievementsList.length}
              </span>
            </button>

            {/* Retro CRT Toggle Button */}
            <button
              onClick={toggleCrt}
              onMouseEnter={() => soundFX.playHover()}
              className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl font-mono text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                crtEnabled
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                  : "bg-white/5 hover:bg-white/10 text-slate-400 border border-white/10"
              }`}
              title="Toggle Retro CRT Scanlines"
            >
              <Tv className="w-3.5 h-3.5" />
              <span className="hidden md:inline">CRT</span>
            </button>

            {/* Sound FX Mute/Unmute */}
            <button
              onClick={toggleMute}
              onMouseEnter={() => soundFX.playHover()}
              className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl font-mono text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                !isMuted
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                  : "bg-white/5 hover:bg-white/10 text-slate-400 border border-white/10"
              }`}
              title={isMuted ? "Aktifkan Sound Effects" : "Matikan Suara"}
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5 text-slate-400" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              )}
              <span className="hidden md:inline">{isMuted ? "MUTE" : "SFX"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quests & Achievements Modal */}
      <AnimatePresence>
        {questsModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="w-full max-w-lg rounded-2xl bg-[#090d16] border border-amber-500/40 shadow-[0_0_40px_rgba(245,158,11,0.25)] p-5 text-white"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-white">
                      Quest & Achievements
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      {unlockedAchievements.length} dari {achievementsList.length} misi terbuka
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setQuestsModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Achievements Grid */}
              <div className="mt-4 space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
                {achievementsList.map((ach) => {
                  const isDone = unlockedAchievements.includes(ach.id);
                  return (
                    <div
                      key={ach.id}
                      className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-colors ${
                        isDone
                          ? "bg-amber-500/10 border-amber-500/30 text-white"
                          : "bg-white/[0.02] border-white/5 text-slate-400 opacity-60"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0 ${
                            isDone ? "bg-amber-500/20 border border-amber-500/40" : "bg-slate-800"
                          }`}
                        >
                          {ach.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-heading font-bold text-sm text-white">
                              {ach.title}
                            </span>
                            {isDone && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                            )}
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5">{ach.description}</p>
                        </div>
                      </div>
                      <div className="shrink-0 text-right">
                        <span className="font-mono text-xs font-bold text-amber-400">
                          +{ach.xpReward} XP
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Easter Egg hint */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-1 text-[11px]">
                  <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
                  Ketik Konami Code di keyboard untuk rahasia!
                </span>
                <span className="text-[10px] text-cyan-400">↑ ↑ ↓ ↓ ← → ← → B A</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
