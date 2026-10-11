"use client";

import React, { useState, useEffect } from "react";
import { X, Volume2, VolumeX, RotateCcw, Home, Keyboard } from "lucide-react";
import { gameAudio } from "@/lib/game/gameAudio";

interface SettingsModalProps {
  isMuted: boolean;
  onToggleMute: () => void;
  onResetProgress: () => void;
  onBackToMainMenu: () => void;
  onClose: () => void;
}

export default function SettingsModal({
  isMuted,
  onToggleMute,
  onResetProgress,
  onBackToMainMenu,
  onClose,
}: SettingsModalProps) {
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

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

      {/* Solid Game Settings Frame */}
      <div className="relative z-10 w-full max-w-md bg-[#0d121d] border-4 border-[#334155] p-5 sm:p-7 text-white shadow-[0_12px_40px_rgba(0,0,0,0.95)] my-auto">
        <div className="flex items-center justify-between pb-3.5 border-b-2 border-[#1f2838] mb-5">
          <h3 className="font-mono font-bold text-base text-white uppercase tracking-wider">
            [ SYSTEM OPTIONS & CONTROLS ]
          </h3>
          <button
            onClick={() => {
              gameAudio.playMenuClick();
              onClose();
            }}
            className="w-8 h-8 bg-[#161e2e] border-2 border-[#2b3952] hover:border-white text-[#94a3b8] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Audio Controls */}
          <div className="flex items-center justify-between p-3 bg-[#080c14] border-2 border-[#1e2838]">
            <div className="flex items-center gap-3">
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-[#64748b]" />
              ) : (
                <Volume2 className="w-5 h-5 text-[#10b981]" />
              )}
              <div>
                <span className="text-xs font-mono font-bold text-white block">
                  SFX & AMBIENT BGM
                </span>
                <span className="text-[10px] font-mono text-[#64748b]">
                  {isMuted ? "STATUS: MUTED" : "STATUS: ACTIVE"}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                gameAudio.playMenuClick();
                onToggleMute();
              }}
              className={`px-3 py-1.5 border-2 text-xs font-mono font-bold transition-all cursor-pointer ${
                isMuted
                  ? "bg-[#182030] border-[#2c3d59] text-[#94a3b8]"
                  : "bg-[#0f291e] border-[#10b981] text-[#10b981]"
              }`}
            >
              {isMuted ? "UNMUTE" : "MUTE"}
            </button>
          </div>

          {/* Controls Guide */}
          <div className="p-3 bg-[#080c14] border-2 border-[#1e2838] space-y-2">
            <span className="text-xs font-mono font-bold text-[#38bdf8] flex items-center gap-2">
              <Keyboard className="w-4 h-4" />
              <span>GAME CONTROLS REFERENCE</span>
            </span>
            <div className="text-xs font-mono text-[#94a3b8] space-y-1">
              <div>&bull; [W, A, S, D] / [ARROWS]: Move Character</div>
              <div>&bull; [SHIFT] / [SPACE]: Dash Sprint</div>
              <div>&bull; [E] / [ENTER]: Interact (NPC / Objects)</div>
              <div>&bull; [ESC]: Close Dialog / Open Options</div>
              <div>&bull; Touch: Virtual D-Pad + [ACTION] & [DASH] buttons</div>
            </div>
          </div>

          {/* Reset Progress */}
          <div>
            {!confirmReset ? (
              <button
                onClick={() => {
                  gameAudio.playMenuClick();
                  setConfirmReset(true);
                }}
                className="w-full py-2.5 bg-[#170e12] hover:bg-[#24131b] border-2 border-[#4c1d28] hover:border-[#ef4444] text-[#f87171] font-mono text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>RESET EXPEDITION DATA</span>
              </button>
            ) : (
              <div className="p-3 bg-[#170e12] border-2 border-[#ef4444] text-center space-y-2">
                <span className="text-xs font-mono text-[#f87171] block">
                  Hapus seluruh progres quest, XP, dan kristal?
                </span>
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => {
                      gameAudio.playInteract();
                      onResetProgress();
                      setConfirmReset(false);
                      onClose();
                    }}
                    className="px-4 py-1.5 bg-[#dc2626] hover:bg-[#b91c1c] text-white font-mono text-xs font-bold"
                  >
                    YA, RESET
                  </button>
                  <button
                    onClick={() => setConfirmReset(false)}
                    className="px-4 py-1.5 bg-[#1e293b] text-white font-mono text-xs"
                  >
                    BATAL
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Back to Intro Screen */}
          <button
            onClick={() => {
              gameAudio.playMenuClick();
              onBackToMainMenu();
            }}
            className="w-full py-2.5 bg-[#162030] hover:bg-[#20304a] active:translate-y-0.5 border-2 border-[#2b3d54] text-white font-mono text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>RETURN TO TITLE SCREEN</span>
          </button>
        </div>
      </div>
    </div>
  );
}
