"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "./GameContext";
import { Trophy, X, Sparkles } from "lucide-react";

export default function AchievementToast() {
  const { recentAchievement, clearRecentAchievement } = useGame();

  return (
    <AnimatePresence>
      {recentAchievement && (
        <motion.div
          initial={{ opacity: 0, y: -60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -40, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="fixed top-20 right-4 sm:right-8 z-50 max-w-sm w-full pointer-events-auto"
        >
          <div className="relative p-4 rounded-xl bg-[#090d16]/95 dark:bg-[#090d16]/95 border-2 border-amber-500/80 shadow-[0_0_30px_rgba(245,158,11,0.35)] backdrop-blur-xl text-white overflow-hidden">
            {/* Retro Scanline shimmer overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/10 to-transparent pointer-events-none animate-pulse" />

            <div className="flex items-start gap-3.5 relative z-10">
              <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-xl shrink-0 shadow-md border border-amber-300/40">
                <span>{recentAchievement.icon}</span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider font-bold text-amber-400 uppercase">
                  <Trophy className="w-3 h-3 text-amber-400 shrink-0" />
                  <span>ACHIEVEMENT UNLOCKED!</span>
                </div>
                <h4 className="font-heading font-bold text-sm sm:text-base text-white tracking-tight truncate mt-0.5">
                  {recentAchievement.title}
                </h4>
                <p className="text-xs text-slate-300 mt-0.5 line-clamp-2 leading-relaxed">
                  {recentAchievement.description}
                </p>
                <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-mono font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-500/30">
                  <Sparkles className="w-3 h-3" />
                  <span>+{recentAchievement.xpReward} XP GAINED</span>
                </div>
              </div>

              <button
                onClick={clearRecentAchievement}
                className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
                aria-label="Tutup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
