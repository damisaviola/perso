"use client";

import React, { useState } from "react";
import {
  Compass,
  Sparkles,
  Volume2,
  VolumeX,
  Settings,
  BookOpen,
  MapPin,
  ChevronDown,
  ChevronUp,
  Zap,
} from "lucide-react";
import { GAME_DEVELOPER_DATA } from "@/lib/game/gameData";
import { gameAudio } from "@/lib/game/gameAudio";

interface GameHUDProps {
  xp: number;
  completedQuestsCount: number;
  collectedCrystalsCount: number;
  nearbyTargetName: string | null;
  playerCoords?: { x: number; y: number };
  activeQuest?: { title: string; location: string; xpReward: number; coords?: { x: number; y: number } } | null;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenQuests: () => void;
  onOpenSettings: () => void;
  onViewPortfolio: () => void;
  onFastTravel?: (x: number, y: number) => void;
}

// World Landmarks for Radar Minimap (Map Size: 2200 x 1600)
const RADAR_LANDMARKS = [
  { id: "home", name: "Home Village", icon: "🏠", x: 430, y: 420 },
  { id: "academy", name: "Academy", icon: "🎓", x: 1100, y: 390 },
  { id: "hall", name: "Achievement Hall", icon: "🏆", x: 1700, y: 390 },
  { id: "altar", name: "Skill Forest", icon: "🔮", x: 400, y: 1080 },
  { id: "coffee", name: "Espresso Station", icon: "☕", x: 1116, y: 940 },
  { id: "lab", name: "Project Lab", icon: "💻", x: 1100, y: 1130 },
  { id: "tower", name: "Comm Tower", icon: "📡", x: 1700, y: 1110 },
];

export default function GameHUD({
  xp,
  completedQuestsCount,
  collectedCrystalsCount,
  nearbyTargetName,
  playerCoords = { x: 430, y: 420 },
  activeQuest,
  isMuted,
  onToggleMute,
  onOpenQuests,
  onOpenSettings,
  onViewPortfolio,
  onFastTravel,
}: GameHUDProps) {
  const [isMinimapOpen, setIsMinimapOpen] = useState(true);

  const level = Math.floor(xp / 200) + 1;
  const currentLevelXp = xp % 200;
  const xpPercent = Math.min(100, Math.round((currentLevelXp / 200) * 100));

  // Determine current zone based on coordinates
  const getCurrentZone = () => {
    const { x, y } = playerCoords;
    if (y < 700) {
      if (x < 750) return "HOME VILLAGE";
      if (x < 1450) return "ACADEMY GROUNDS";
      return "ACHIEVEMENT HALL";
    } else {
      if (x < 750) return "SKILL FOREST";
      if (x < 1450) {
        if (y < 980) return "CENTRAL WATER PLAZA";
        return "PROJECT LABORATORY";
      }
      return "COMMUNICATION TOWER";
    }
  };

  const currentZone = getCurrentZone();

  // Radar coordinates relative to 2200x1600 map (scaled to 100%)
  const pxPercent = Math.max(0, Math.min(100, (playerCoords.x / 2200) * 100));
  const pyPercent = Math.max(0, Math.min(100, (playerCoords.y / 1600) * 100));

  return (
    <div className="fixed inset-0 pointer-events-none z-20 select-none font-sans">
      {/* 1. TOP BAR HUD */}
      <div className="p-3 sm:p-5 flex items-start justify-between gap-3">
        {/* Left Column: Player Status & Pinned Active Objective */}
        <div className="flex flex-col gap-2 max-w-sm">
          {/* Classic RPG Player Plate */}
          <div className="pointer-events-auto bg-[#0d121c] border-2 border-[#2c374d] p-2.5 text-white shadow-xl flex items-center gap-3">
            {/* Square Portrait Frame */}
            <div className="relative shrink-0">
              <div className="w-11 h-11 bg-[#151c2a] border-2 border-[#3c4a64] flex items-center justify-center font-mono font-black text-sm text-[#f1c40f]">
                P1
              </div>
              <span className="absolute -bottom-1.5 -right-1.5 px-1 bg-[#b45309] border border-[#f59e0b] text-[9px] font-mono font-black text-white">
                LV.{level}
              </span>
            </div>

            {/* Status Bars */}
            <div className="flex flex-col flex-1 min-w-[140px]">
              <div className="flex items-center justify-between text-xs font-mono font-bold leading-none mb-1.5">
                <span className="text-[#f8fafc] tracking-wide">
                  {GAME_DEVELOPER_DATA.profile.shortName}
                </span>
                <span className="text-[9px] text-[#38bdf8] bg-[#17253d] px-1 py-0.5 border border-[#1e3a5f]">
                  DEV
                </span>
              </div>

              {/* Classic EXP Bar */}
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono font-bold text-[#f59e0b]">EXP</span>
                <div className="flex-1 h-2 bg-[#05080e] border border-[#2d3748] overflow-hidden">
                  <div
                    className="h-full bg-[#f59e0b] transition-all duration-300"
                    style={{ width: `${xpPercent}%` }}
                  />
                </div>
                <span className="text-[9px] font-mono text-[#94a3b8]">{xp} XP</span>
              </div>

              {/* Dash / Action Status */}
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[9px] font-mono font-bold text-[#10b981]">DASH</span>
                <div className="flex-1 h-1.5 bg-[#05080e] border border-[#2d3748] overflow-hidden">
                  <div className="h-full bg-[#10b981] w-full" />
                </div>
                <span className="text-[8px] font-mono text-[#10b981] uppercase font-bold">
                  [SHIFT] READY
                </span>
              </div>
            </div>
          </div>

          {/* Pinned Active Mission Card */}
          {activeQuest && (
            <div
              onClick={() => {
                gameAudio.playMenuClick();
                onOpenQuests();
              }}
              className="pointer-events-auto bg-[#0d121c] border-2 border-[#253248] hover:border-[#38bdf8] p-2 text-white shadow-lg cursor-pointer transition-colors"
              title="Klik untuk membuka Quest Log"
            >
              <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                <span className="text-[#38bdf8] font-bold flex items-center gap-1">
                  <span>▶</span> MISSION OBJECTIVE:
                </span>
                <span className="text-[#f59e0b] font-bold">+{activeQuest.xpReward} XP</span>
              </div>
              <p className="text-xs font-mono font-bold text-[#f1f5f9] truncate">
                {activeQuest.title}
              </p>
              <div className="flex items-center justify-between text-[10px] font-mono text-[#94a3b8] mt-1 pt-1 border-t border-[#1a2334]">
                <span className="flex items-center gap-1">
                  <MapPin className="w-2.5 h-2.5 text-[#38bdf8]" />
                  {activeQuest.location}
                </span>
                <span className="text-[#38bdf8] hover:underline font-bold">OPEN LOG &rarr;</span>
              </div>
            </div>
          )}

          {/* Controls helper bar */}
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 bg-[#090d14] border border-[#1e2738] text-[10px] font-mono text-[#64748b] pointer-events-auto">
            <span>[WASD] MOVE</span>
            <span className="text-[#334155]">&bull;</span>
            <span className="text-[#38bdf8] font-bold">[SHIFT] DASH</span>
            <span className="text-[#334155]">&bull;</span>
            <span className="text-[#10b981] font-bold">[E] INTERACT</span>
            <span className="text-[#334155]">&bull;</span>
            <span>[ESC] PAUSE</span>
          </div>
        </div>

        {/* Right Column: Game Menu Action Buttons & Minimap */}
        <div className="flex flex-col items-end gap-2">
          {/* Tactical Game Menu Bar */}
          <div className="pointer-events-auto flex items-center gap-1.5 flex-wrap justify-end">
            {/* View Portfolio Button (Prominent Gold RPG Button) */}
            <button
              onClick={() => {
                gameAudio.playInteract();
                onViewPortfolio();
              }}
              className="px-3 py-1.5 bg-[#1b2333] hover:bg-[#253248] active:translate-y-0.5 border-2 border-[#f59e0b] text-[#f59e0b] hover:text-[#fef08a] text-xs font-mono font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
              title="Lihat versi portofolio konvensional lengkap"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#f59e0b]" />
              <span>VIEW PORTFOLIO</span>
            </button>

            {/* Quests Journal Button */}
            <button
              onClick={() => {
                gameAudio.playMenuClick();
                onOpenQuests();
              }}
              className="px-2.5 py-1.5 bg-[#121723] hover:bg-[#1a2233] active:translate-y-0.5 border-2 border-[#2b374c] hover:border-[#38bdf8] text-[#e2e8f0] text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              title="Buka Quest Journal"
            >
              <Compass className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span className="hidden md:inline">QUESTS</span>
              <span className="text-[10px] text-[#38bdf8] font-mono font-bold bg-[#17253d] px-1 border border-[#1e3a5f]">
                {completedQuestsCount}/7
              </span>
            </button>

            {/* Crystals Item Counter */}
            <div
              onClick={() => {
                gameAudio.playMenuClick();
                onOpenQuests();
              }}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 bg-[#121723] border-2 border-[#2b374c] hover:border-[#a855f7] text-xs font-mono font-bold text-[#c084fc] cursor-pointer transition-colors"
              title="Knowledge Crystals dikumpulkan"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#a855f7]" />
              <span>{collectedCrystalsCount}/8</span>
            </div>

            {/* Sound Toggle Button */}
            <button
              onClick={() => {
                gameAudio.playMenuClick();
                onToggleMute();
              }}
              className={`p-1.5 border-2 transition-all cursor-pointer ${
                !isMuted
                  ? "bg-[#121723] border-[#2b374c] text-[#10b981] hover:border-[#10b981]"
                  : "bg-[#121723] border-[#2b374c] text-[#64748b] hover:border-[#94a3b8]"
              }`}
              title={isMuted ? "Unmute Audio" : "Mute Audio"}
              aria-label="Toggle Sound"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Settings Button */}
            <button
              onClick={() => {
                gameAudio.playMenuClick();
                onOpenSettings();
              }}
              className="p-1.5 bg-[#121723] hover:bg-[#1a2233] border-2 border-[#2b374c] hover:border-[#e2e8f0] text-[#94a3b8] hover:text-white transition-colors cursor-pointer"
              title="Pengaturan"
              aria-label="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>

          {/* Tactical Radar Minimap Frame */}
          <div className="hidden sm:block pointer-events-auto">
            <div className="w-48 bg-[#0c101a] border-2 border-[#2c374d] text-white shadow-xl">
              {/* Radar Title Bar */}
              <div className="flex items-center justify-between px-2 py-1 bg-[#141b27] border-b border-[#242e40] text-[10px] font-mono font-bold">
                <span className="text-[#38bdf8] flex items-center gap-1">
                  <span>●</span> RADAR MAP
                </span>
                <button
                  onClick={() => setIsMinimapOpen(!isMinimapOpen)}
                  className="text-[#94a3b8] hover:text-white"
                >
                  {isMinimapOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>
              </div>

              {isMinimapOpen && (
                <div className="p-2">
                  {/* Radar Screen Visual */}
                  <div className="relative w-full h-28 bg-[#060910] border border-[#1e2838] overflow-hidden">
                    {/* Retro Radar Grid Lines */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b20_1px,transparent_1px),linear-gradient(to_bottom,#1e293b20_1px,transparent_1px)] bg-[size:16px_16px]" />
                    <div className="absolute inset-x-0 top-1/2 h-px bg-[#1e293b40]" />
                    <div className="absolute inset-y-0 left-1/2 w-px bg-[#1e293b40]" />

                    {/* Interactive Landmark Pins */}
                    {RADAR_LANDMARKS.map((lm) => {
                      const lx = (lm.x / 2200) * 100;
                      const ly = (lm.y / 1600) * 100;

                      return (
                        <button
                          key={lm.id}
                          onClick={() => {
                            gameAudio.playInteract();
                            onFastTravel?.(lm.x, lm.y);
                          }}
                          style={{ left: `${lx}%`, top: `${ly}%` }}
                          className="absolute -translate-x-1/2 -translate-y-1/2 text-[10px] hover:scale-125 transition-transform cursor-pointer z-10"
                          title={`Warp ke ${lm.name}`}
                        >
                          <span className="block drop-shadow-[0_1px_2px_rgba(0,0,0,1)]">
                            {lm.icon}
                          </span>
                        </button>
                      );
                    })}

                    {/* Player Radar Blip */}
                    <div
                      style={{ left: `${pxPercent}%`, top: `${pyPercent}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
                    >
                      <span className="w-2.5 h-2.5 bg-[#38bdf8] block animate-ping" />
                      <span className="w-2 h-2 bg-white block absolute inset-0 m-auto" />
                    </div>
                  </div>

                  {/* Telemetry info */}
                  <div className="mt-1 pt-1 border-t border-[#182131] flex items-center justify-between text-[9px] font-mono text-[#94a3b8]">
                    <span className="text-[#38bdf8] font-bold truncate max-w-[100px]">
                      {currentZone}
                    </span>
                    <span>
                      {playerCoords.x}, {playerCoords.y}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. PROXIMITY INTERACTION BANNER (CENTER BOTTOM) */}
      {nearbyTargetName && (
        <div className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-auto">
          <div className="px-4 py-2 bg-[#0c101a] border-2 border-[#10b981] text-white font-mono text-xs font-bold shadow-2xl flex items-center gap-2">
            <span className="text-[#10b981] animate-pulse">▶</span>
            <span className="text-[#94a3b8]">TEKAN</span>
            <span className="px-1.5 py-0.5 bg-[#1b2537] border border-[#3b4c68] text-[#38bdf8] font-mono text-[11px]">
              [E]
            </span>
            <span className="text-[#e2e8f0]">UNTUK INTERAKSI:</span>
            <span className="text-[#10b981] uppercase tracking-wide">{nearbyTargetName}</span>
          </div>
        </div>
      )}
    </div>
  );
}
