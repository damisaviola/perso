"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { gameAudio } from "@/lib/game/gameAudio";

export interface DialoguePayload {
  npcName: string;
  role?: string;
  avatar?: string;
  pages: string[];
}

interface DialogueBoxProps {
  dialogue: DialoguePayload;
  onClose: () => void;
}

export default function DialogueBox({ dialogue, onClose }: DialogueBoxProps) {
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = dialogue.pages.length;
  const isLastPage = currentPage === totalPages - 1;

  const handleNext = () => {
    gameAudio.playMenuClick();
    if (isLastPage) {
      onClose();
    } else {
      setCurrentPage((p) => p + 1);
    }
  };

  // Keyboard navigation: Enter or Space or E moves to next page, Esc closes
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "e" || e.key === "E" || e.key === "Enter" || e.code === "Space") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-6 flex justify-center pointer-events-auto select-none">
      {/* Authentic RPG Dialogue Frame */}
      <div className="relative w-full max-w-4xl bg-[#0e121d] border-2 sm:border-[3px] border-[#3a4760] shadow-[0_4px_24px_rgba(0,0,0,0.85)] text-white">
        {/* Decorative Inner Border */}
        <div className="absolute inset-[3px] border border-[#222b3d] pointer-events-none" />

        {/* Nameplate Tab perched on top-left */}
        <div className="absolute -top-7 sm:-top-8 left-4 px-3 sm:px-4 py-1 bg-[#151b2a] border-2 border-[#3a4760] border-b-[#151b2a] flex items-center gap-2 z-10">
          <span className="font-mono font-bold text-xs sm:text-sm text-[#f1c40f] tracking-wider uppercase">
            {dialogue.npcName}
          </span>
          {dialogue.role && (
            <span className="text-[10px] font-mono text-[#8fa1c2] border-l border-[#3a4760] pl-2 hidden sm:inline">
              {dialogue.role}
            </span>
          )}
        </div>

        {/* Close Button on top-right */}
        <button
          onClick={() => {
            gameAudio.playMenuClick();
            onClose();
          }}
          className="absolute -top-7 sm:-top-8 right-4 w-7 h-7 sm:w-8 sm:h-8 bg-[#151b2a] border-2 border-[#3a4760] border-b-[#151b2a] text-[#8fa1c2] hover:text-white hover:bg-[#1f283d] flex items-center justify-center cursor-pointer z-10"
          title="Tutup (ESC)"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Main Dialogue Content Area */}
        <div className="relative z-0 p-4 sm:p-6 flex items-start gap-4 sm:gap-6">
          {/* NPC Portrait Box */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 bg-[#090c14] border-2 border-[#2b3547] flex items-center justify-center text-3xl sm:text-4xl shadow-inner">
            {dialogue.avatar || "💬"}
          </div>

          {/* Dialogue Text Area */}
          <div className="flex-1 min-h-[70px] sm:min-h-[85px] flex flex-col justify-between">
            <p className="text-sm sm:text-base text-[#e2e8f0] font-sans leading-relaxed tracking-normal font-medium">
              {dialogue.pages[currentPage]}
            </p>

            {/* Bottom Bar: Page Status & Blinking Prompt */}
            <div className="mt-3 pt-2 border-t border-[#1e2638] flex items-center justify-between text-xs font-mono">
              <span className="text-[#64748b]">
                HALAMAN {currentPage + 1}/{totalPages} &bull; [E / ENTER / SPACE]
              </span>

              <button
                onClick={handleNext}
                className="px-3 py-1.5 bg-[#1b2334] hover:bg-[#28344e] active:bg-[#131926] border border-[#3d4d6b] text-[#38bdf8] hover:text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>{isLastPage ? "TUTUP [E]" : "LANJUT [E]"}</span>
                <span className="animate-pulse text-[#f1c40f]">▼</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
