"use client";

import React, { useRef } from "react";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Zap } from "lucide-react";
import { gameAudio } from "@/lib/game/gameAudio";

interface MobileControllerProps {
  onMoveChange: (dx: number, dy: number) => void;
  onInteract: () => void;
  onDash?: () => void;
  nearbyTargetName: string | null;
}

export default function MobileController({
  onMoveChange,
  onInteract,
  onDash,
  nearbyTargetName,
}: MobileControllerProps) {
  const activeKeys = useRef({ up: false, down: false, left: false, right: false });

  const updateVelocity = () => {
    let dx = 0;
    let dy = 0;
    if (activeKeys.current.left) dx -= 1;
    if (activeKeys.current.right) dx += 1;
    if (activeKeys.current.up) dy -= 1;
    if (activeKeys.current.down) dy += 1;
    onMoveChange(dx, dy);
  };

  const handleTouch = (dir: "up" | "down" | "left" | "right", isDown: boolean) => {
    activeKeys.current[dir] = isDown;
    updateVelocity();
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-30 sm:hidden select-none">
      {/* Bottom-Left: Solid Handheld D-Pad Cross */}
      <div className="absolute bottom-6 left-5 pointer-events-auto">
        <div className="relative w-36 h-36 bg-[#0a0e17] border-2 border-[#2b3952] p-2 shadow-2xl">
          {/* UP */}
          <button
            onTouchStart={(e) => {
              e.preventDefault();
              handleTouch("up", true);
            }}
            onTouchEnd={() => handleTouch("up", false)}
            className="absolute top-1 left-1/2 -translate-x-1/2 w-11 h-11 bg-[#1a2336] active:bg-[#38bdf8] text-white border-2 border-[#334155] flex items-center justify-center cursor-pointer"
            aria-label="Atas"
          >
            <ArrowUp className="w-5 h-5" />
          </button>

          {/* DOWN */}
          <button
            onTouchStart={(e) => {
              e.preventDefault();
              handleTouch("down", true);
            }}
            onTouchEnd={() => handleTouch("down", false)}
            className="absolute bottom-1 left-1/2 -translate-x-1/2 w-11 h-11 bg-[#1a2336] active:bg-[#38bdf8] text-white border-2 border-[#334155] flex items-center justify-center cursor-pointer"
            aria-label="Bawah"
          >
            <ArrowDown className="w-5 h-5" />
          </button>

          {/* LEFT */}
          <button
            onTouchStart={(e) => {
              e.preventDefault();
              handleTouch("left", true);
            }}
            onTouchEnd={() => handleTouch("left", false)}
            className="absolute left-1 top-1/2 -translate-y-1/2 w-11 h-11 bg-[#1a2336] active:bg-[#38bdf8] text-white border-2 border-[#334155] flex items-center justify-center cursor-pointer"
            aria-label="Kiri"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* RIGHT */}
          <button
            onTouchStart={(e) => {
              e.preventDefault();
              handleTouch("right", true);
            }}
            onTouchEnd={() => handleTouch("right", false)}
            className="absolute right-1 top-1/2 -translate-y-1/2 w-11 h-11 bg-[#1a2336] active:bg-[#38bdf8] text-white border-2 border-[#334155] flex items-center justify-center cursor-pointer"
            aria-label="Kanan"
          >
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Center Hub */}
          <div className="absolute inset-0 m-auto w-7 h-7 bg-[#0d121f] border border-[#232d3f] pointer-events-none" />
        </div>
      </div>

      {/* Bottom-Right: Solid Arcade Action & Dash Buttons */}
      <div className="absolute bottom-6 right-5 pointer-events-auto flex flex-col items-end gap-2">
        {nearbyTargetName && (
          <div className="px-2.5 py-1 bg-[#0c101a] border-2 border-[#10b981] text-[#10b981] font-mono font-bold text-[10px] shadow-lg">
            [E] {nearbyTargetName}
          </div>
        )}

        <div className="flex items-end gap-2.5">
          {/* DASH BUTTON (Button B) */}
          <button
            onTouchStart={(e) => {
              e.preventDefault();
              onDash?.();
            }}
            className="w-14 h-14 bg-[#0369a1] active:bg-[#0284c7] text-white font-mono font-bold text-[11px] flex flex-col items-center justify-center border-2 border-[#38bdf8] active:translate-y-0.5 shadow-lg cursor-pointer"
            aria-label="Dash"
          >
            <span className="text-xs">⚡</span>
            <span>DASH</span>
          </button>

          {/* ACTION BUTTON (Button A) */}
          <button
            onTouchStart={(e) => {
              e.preventDefault();
              gameAudio.playInteract();
              onInteract();
            }}
            className={`w-16 h-16 font-mono font-bold text-xs flex flex-col items-center justify-center border-2 active:translate-y-0.5 shadow-xl cursor-pointer ${
              nearbyTargetName
                ? "bg-[#059669] text-white border-[#34d399] animate-pulse"
                : "bg-[#1e293b] text-[#cbd5e1] border-[#475569]"
            }`}
            aria-label="Action"
          >
            <Zap className="w-5 h-5 fill-current" />
            <span>ACTION</span>
          </button>
        </div>
      </div>
    </div>
  );
}
