"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Compass,
  Sparkles,
  MapPin,
  Navigation,
  Zap,
} from "lucide-react";
import { GAME_DEVELOPER_DATA, Quest } from "@/lib/game/gameData";
import { gameAudio } from "@/lib/game/gameAudio";

interface QuestTrackerModalProps {
  completedQuestIds: string[];
  collectedCrystals: string[];
  onFastTravel?: (x: number, y: number) => void;
  onClose: () => void;
}

const QUEST_COORDINATES: Record<string, { x: number; y: number; zone: string }> = {
  quest_meet: { x: 430, y: 420, zone: "Home Village" },
  quest_coffee: { x: 1116, y: 940, zone: "Lab Breakroom" },
  quest_puzzle: { x: 1100, y: 1220, zone: "Project Lab (Mainframe)" },
  quest_skills: { x: 400, y: 1080, zone: "Skill Forest" },
  quest_academy: { x: 1100, y: 390, zone: "Academy of Knowledge" },
  quest_crystals: { x: 1116, y: 840, zone: "Fountain Plaza" },
  quest_tower: { x: 1700, y: 1110, zone: "Communication Tower" },
};

const CRYSTAL_LOCATIONS = GAME_DEVELOPER_DATA.collectibles;

export default function QuestTrackerModal({
  completedQuestIds,
  collectedCrystals,
  onFastTravel,
  onClose,
}: QuestTrackerModalProps) {
  const [activeTab, setActiveTab] = useState<"quests" | "crystals">("quests");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const totalQuests = GAME_DEVELOPER_DATA.quests.length;
  const completedCount = completedQuestIds.length;
  const questProgressPercent = Math.round((completedCount / totalQuests) * 100);

  const filteredQuests = GAME_DEVELOPER_DATA.quests.filter((q) => {
    const isCompleted = completedQuestIds.includes(q.id);
    if (filter === "active") return !isCompleted;
    if (filter === "completed") return isCompleted;
    return true;
  });

  const handleWarp = (coords: { x: number; y: number }) => {
    gameAudio.playInteract();
    if (onFastTravel) {
      onFastTravel(coords.x, coords.y);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 overflow-y-auto select-none">
      {/* Backdrop */}
      <div
        className="fixed inset-0"
        onClick={() => {
          gameAudio.playMenuClick();
          onClose();
        }}
      />

      {/* Solid RPG Quest Journal Frame */}
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] flex flex-col bg-[#0d121e] border-4 border-[#334155] p-5 sm:p-7 text-white shadow-[0_10px_35px_rgba(0,0,0,0.95)] my-auto overflow-hidden">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pb-3.5 border-b-2 border-[#20293a] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#161e2e] border-2 border-[#2f3d54] flex items-center justify-center text-[#f59e0b]">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-mono font-bold text-base sm:text-lg text-white uppercase tracking-wider">
                  QUEST JOURNAL & INVENTORY
                </h3>
                <span className="px-1.5 py-0.5 bg-[#17253d] border border-[#2b446e] text-[10px] font-mono text-[#38bdf8] font-bold">
                  {completedCount}/{totalQuests} SOLVED
                </span>
              </div>
              <p className="text-[11px] font-mono text-[#64748b]">
                DEVELOPER WORLD &bull; PROGRESS: {questProgressPercent}%
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              gameAudio.playMenuClick();
              onClose();
            }}
            className="w-8 h-8 bg-[#161e2e] border-2 border-[#2f3d54] hover:border-white text-[#94a3b8] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Global Progress Gauge */}
        <div className="my-3.5 p-3 bg-[#080c14] border border-[#1e2838] shrink-0">
          <div className="flex items-center justify-between text-xs font-mono mb-1.5">
            <span className="text-[#94a3b8]">
              EXPEDITION COMPLETION: <span className="text-[#10b981] font-bold">{completedCount}/{totalQuests}</span>
            </span>
            <span className="text-[#f59e0b] font-bold">{questProgressPercent}%</span>
          </div>
          <div className="w-full h-2 bg-[#05080e] border border-[#222d3d] overflow-hidden">
            <div
              className="h-full bg-[#10b981] transition-all duration-300"
              style={{ width: `${questProgressPercent}%` }}
            />
          </div>
        </div>

        {/* Main Tab Controls */}
        <div className="flex items-center justify-between gap-2 pb-3 shrink-0">
          <div className="flex items-center gap-1.5 text-xs font-mono">
            <button
              onClick={() => {
                gameAudio.playMenuClick();
                setActiveTab("quests");
              }}
              className={`px-3 py-1.5 border-2 transition-all cursor-pointer ${
                activeTab === "quests"
                  ? "bg-[#1b2537] border-[#38bdf8] text-white font-bold"
                  : "bg-[#101624] border-[#222d3e] text-[#94a3b8] hover:text-white"
              }`}
            >
              MISSIONS ({totalQuests})
            </button>
            <button
              onClick={() => {
                gameAudio.playMenuClick();
                setActiveTab("crystals");
              }}
              className={`px-3 py-1.5 border-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "crystals"
                  ? "bg-[#251833] border-[#a855f7] text-[#e9d5ff] font-bold"
                  : "bg-[#101624] border-[#222d3e] text-[#94a3b8] hover:text-white"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#a855f7]" />
              <span>CRYSTALS ({collectedCrystals.length}/8)</span>
            </button>
          </div>

          {activeTab === "quests" && (
            <div className="flex items-center gap-1 text-[10px] font-mono">
              {(["all", "active", "completed"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    gameAudio.playMenuClick();
                    setFilter(t);
                  }}
                  className={`px-2 py-0.5 uppercase border transition-colors cursor-pointer ${
                    filter === t
                      ? "bg-[#1e2a3c] border-[#38bdf8] text-white font-bold"
                      : "bg-[#0b1018] border-[#1e2838] text-[#64748b] hover:text-white"
                  }`}
                >
                  [{t}]
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
          {activeTab === "quests" ? (
            filteredQuests.length === 0 ? (
              <div className="py-12 text-center text-[#64748b] font-mono text-xs">
                Tidak ada quest dalam kategori ini.
              </div>
            ) : (
              filteredQuests.map((quest: Quest) => {
                const isCompleted = completedQuestIds.includes(quest.id);
                const coords = QUEST_COORDINATES[quest.id];

                return (
                  <div
                    key={quest.id}
                    className={`p-3.5 border-2 transition-colors ${
                      isCompleted
                        ? "bg-[#0c1618] border-[#134e48] text-white"
                        : "bg-[#0f1422] border-[#20293a] text-[#cbd5e1]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        {/* Checkbox Icon */}
                        <span className="font-mono text-xs font-black mt-0.5 shrink-0">
                          {isCompleted ? (
                            <span className="text-[#10b981]">[✓]</span>
                          ) : (
                            <span className="text-[#f59e0b]">[ ]</span>
                          )}
                        </span>

                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="font-mono font-bold text-xs sm:text-sm text-white">
                              {quest.title}
                            </h4>
                            <span className="px-1.5 py-0.2 bg-[#172033] border border-[#2b3a52] text-[9px] font-mono text-[#38bdf8] flex items-center gap-1">
                              <MapPin className="w-2.5 h-2.5" />
                              {quest.location}
                            </span>
                            {isCompleted && (
                              <span className="text-[9px] font-mono text-[#10b981] font-bold">
                                [COMPLETED]
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-[#94a3b8] mt-1 font-sans leading-relaxed">
                            {quest.description}
                          </p>

                          <div className="flex flex-wrap items-center gap-3 mt-2 pt-1.5 border-t border-[#1a2333] text-[10px] font-mono">
                            <span className="text-[#f59e0b] font-bold flex items-center gap-1">
                              <Zap className="w-2.5 h-2.5" />+{quest.xpReward} XP
                            </span>
                            <span className="text-[#64748b]">
                              REWARD: <span className="text-[#cbd5e1]">{quest.reward}</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Warp / Fast Travel Button */}
                      {coords && onFastTravel && (
                        <button
                          onClick={() => handleWarp(coords)}
                          className="px-2.5 py-1 bg-[#162133] hover:bg-[#20304a] active:translate-y-0.5 border border-[#304364] hover:border-[#38bdf8] text-[#38bdf8] hover:text-white text-[10px] font-mono font-bold flex items-center gap-1 shrink-0 transition-all cursor-pointer"
                          title={`Warp langsung ke ${coords.zone}`}
                        >
                          <Navigation className="w-3 h-3" />
                          <span>WARP ▶</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )
          ) : (
            /* Knowledge Crystals Inventory Grid */
            <div className="space-y-3">
              <div className="p-3 bg-[#0a0e17] border border-[#231b33] text-xs text-[#c084fc] font-sans">
                Knowledge Crystals adalah inti data memori yang tersembunyi di seluruh peta. Kumpulkan ke-8 kristal untuk melengkapi koleksi.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {CRYSTAL_LOCATIONS.map((c, idx) => {
                  const isCollected = collectedCrystals.includes(c.id);

                  return (
                    <div
                      key={c.id}
                      className={`p-2.5 border-2 transition-colors flex items-center justify-between ${
                        isCollected
                          ? "bg-[#181124] border-[#7e22ce] text-white"
                          : "bg-[#0b0f17] border-[#1d2535] text-[#64748b]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-7 h-7 border flex items-center justify-center font-mono text-xs font-bold ${
                            isCollected
                              ? "bg-[#581c87] border-[#a855f7] text-white"
                              : "bg-[#121824] border-[#222d3e] text-[#475569]"
                          }`}
                        >
                          {String(idx + 1).padStart(2, "0")}
                        </div>
                        <div>
                          <span className="font-mono text-xs font-bold text-white block">
                            {c.name}
                          </span>
                          <span className="text-[10px] font-sans text-[#94a3b8] block line-clamp-1 max-w-[180px]">
                            {c.description}
                          </span>
                        </div>
                      </div>

                      {isCollected ? (
                        <span className="text-[9px] font-mono text-[#a855f7] font-bold px-1.5 py-0.5 bg-[#25133d] border border-[#7e22ce]">
                          OBTAINED
                        </span>
                      ) : (
                        onFastTravel && (
                          <button
                            onClick={() => handleWarp({ x: c.x, y: c.y })}
                            className="px-2 py-0.5 bg-[#141b27] hover:bg-[#1f2b3e] border border-[#2b3952] text-[#94a3b8] hover:text-white text-[9px] font-mono flex items-center gap-1 cursor-pointer"
                          >
                            <Navigation className="w-2.5 h-2.5" />
                            NEARBY
                          </button>
                        )
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
