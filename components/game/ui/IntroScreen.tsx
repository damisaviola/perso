"use client";

import React, { useState } from "react";
import { Play, BookOpen, Settings, Compass, Shield } from "lucide-react";
import { GAME_DEVELOPER_DATA } from "@/lib/game/gameData";
import { gameAudio } from "@/lib/game/gameAudio";

interface IntroScreenProps {
  onStartGame: () => void;
  onViewPortfolio: () => void;
  onOpenSettings: () => void;
}

export default function IntroScreen({
  onStartGame,
  onViewPortfolio,
  onOpenSettings,
}: IntroScreenProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080b12] text-white overflow-hidden select-none">
      {/* Subtle Retro Grid Floor */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#141c2c40_1px,transparent_1px),linear-gradient(to_bottom,#141c2c40_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Main Game Menu Box (Solid RPG Window Frame) */}
      <div className="relative z-10 w-full max-w-xl bg-[#0e131f] border-4 border-[#334155] p-6 sm:p-9 text-center shadow-[0_12px_40px_rgba(0,0,0,0.9)]">
        {/* Corner Rivet Trims */}
        <div className="absolute top-1 left-1 w-2 h-2 bg-[#475569]" />
        <div className="absolute top-1 right-1 w-2 h-2 bg-[#475569]" />
        <div className="absolute bottom-1 left-1 w-2 h-2 bg-[#475569]" />
        <div className="absolute bottom-1 right-1 w-2 h-2 bg-[#475569]" />

        {/* Top Header Tag */}
        <div className="inline-block px-3 py-1 bg-[#172033] border border-[#2b3952] text-[11px] font-mono font-bold text-[#38bdf8] uppercase tracking-wider mb-3">
          [ 2D EXPLORATION PORTFOLIO GAME ]
        </div>

        {/* Game Title */}
        <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-wide uppercase leading-tight drop-shadow">
          DEVELOPER WORLD
        </h1>
        <p className="font-mono text-xs sm:text-sm text-[#f59e0b] mt-1 font-bold tracking-widest uppercase">
          AN INTERACTIVE PORTFOLIO ADVENTURE
        </p>

        {/* Character Card Info Plate */}
        <div className="mt-5 p-3.5 bg-[#080c14] border-2 border-[#1e293b] text-left">
          <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-[#1e293b]">
            <span className="text-[#38bdf8] font-bold">CHARACTER PROFILE</span>
            <span className="text-[#10b981] font-bold">READY TO PLAY</span>
          </div>

          <div className="mt-2.5 flex items-start gap-3">
            <div className="w-12 h-12 bg-[#141d2e] border-2 border-[#2b3952] flex items-center justify-center font-mono font-black text-lg text-[#f1c40f] shrink-0">
              🧙‍♂️
            </div>
            <div>
              <h2 className="font-mono font-bold text-sm sm:text-base text-white">
                {GAME_DEVELOPER_DATA.profile.name}
              </h2>
              <p className="text-xs text-[#94a3b8] font-mono mt-0.5">
                {GAME_DEVELOPER_DATA.profile.role} &bull; {GAME_DEVELOPER_DATA.profile.location}
              </p>
              <p className="text-[11px] text-[#f59e0b] font-mono mt-0.5 font-bold">
                {GAME_DEVELOPER_DATA.profile.education.university} (IPK: 3.88/4.00)
              </p>
            </div>
          </div>
        </div>

        {/* Classic RPG Main Menu Actions */}
        <div className="mt-6 space-y-2.5 max-w-md mx-auto">
          {/* 1. Start Adventure */}
          <button
            onClick={() => {
              gameAudio.playInteract();
              onStartGame();
            }}
            onMouseEnter={() => {
              setHoveredIndex(0);
              gameAudio.playFootstep();
            }}
            className={`w-full p-3 bg-[#131b29] hover:bg-[#1a2538] active:translate-y-0.5 border-2 text-left font-mono font-bold text-xs sm:text-sm flex items-center justify-between transition-colors cursor-pointer ${
              hoveredIndex === 0
                ? "border-[#10b981] text-white bg-[#1a2538]"
                : "border-[#2b3952] text-[#cbd5e1]"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className={`text-xs ${hoveredIndex === 0 ? "text-[#10b981]" : "text-transparent"}`}>
                ▶
              </span>
              <span>START ADVENTURE</span>
            </div>
            <span className="text-[10px] text-[#64748b]">[ ENTER ]</span>
          </button>

          {/* 2. Skip to Full Portfolio */}
          <button
            onClick={() => {
              gameAudio.playInteract();
              onViewPortfolio();
            }}
            onMouseEnter={() => {
              setHoveredIndex(1);
              gameAudio.playFootstep();
            }}
            className={`w-full p-3 bg-[#131b29] hover:bg-[#1a2538] active:translate-y-0.5 border-2 text-left font-mono font-bold text-xs sm:text-sm flex items-center justify-between transition-colors cursor-pointer ${
              hoveredIndex === 1
                ? "border-[#f59e0b] text-[#f59e0b] bg-[#1a2538]"
                : "border-[#2b3952] text-[#cbd5e1]"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className={`text-xs ${hoveredIndex === 1 ? "text-[#f59e0b]" : "text-transparent"}`}>
                ▶
              </span>
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#f59e0b]" />
                VIEW FULL PORTFOLIO (RECRUITER MODE)
              </span>
            </div>
            <span className="text-[10px] text-[#f59e0b]">[ FAST VIEW ]</span>
          </button>

          {/* 3. Settings */}
          <button
            onClick={() => {
              gameAudio.playMenuClick();
              onOpenSettings();
            }}
            onMouseEnter={() => {
              setHoveredIndex(2);
              gameAudio.playFootstep();
            }}
            className={`w-full p-3 bg-[#131b29] hover:bg-[#1a2538] active:translate-y-0.5 border-2 text-left font-mono font-bold text-xs sm:text-sm flex items-center justify-between transition-colors cursor-pointer ${
              hoveredIndex === 2
                ? "border-[#38bdf8] text-white bg-[#1a2538]"
                : "border-[#2b3952] text-[#cbd5e1]"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className={`text-xs ${hoveredIndex === 2 ? "text-[#38bdf8]" : "text-transparent"}`}>
                ▶
              </span>
              <span className="flex items-center gap-1.5">
                <Settings className="w-4 h-4 text-[#94a3b8]" />
                OPTIONS & CONTROLS
              </span>
            </div>
            <span className="text-[10px] text-[#64748b]">[ ESC ]</span>
          </button>
        </div>

        {/* Footer Hotkey Legend */}
        <div className="mt-6 pt-3 border-t border-[#1e293b] flex flex-wrap items-center justify-center gap-3 text-[10px] font-mono text-[#64748b]">
          <span>[WASD] MOVE</span>
          <span>&bull;</span>
          <span>[SHIFT] DASH</span>
          <span>&bull;</span>
          <span>[E] INTERACT</span>
          <span>&bull;</span>
          <span>[ESC] MENU</span>
        </div>
      </div>
    </div>
  );
}
