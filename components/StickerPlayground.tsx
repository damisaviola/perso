"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Smile, Zap, Heart, Star, Code2, Terminal } from "lucide-react";

interface Sticker {
  id: number;
  x: number;
  y: number;
  iconIndex: number;
  color: string;
  rotation: number;
}

const stickerIcons = [Code2, Terminal, Zap, Heart, Star, Smile];
const stickerColors = ["#2563EB", "#0F172A", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899"];

export default function StickerPlayground() {
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [activeIconIndex, setActiveIconIndex] = useState(0);

  const addSticker = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newSticker: Sticker = {
      id: Date.now(),
      x,
      y,
      iconIndex: activeIconIndex,
      color: stickerColors[activeIconIndex],
      rotation: Math.floor(Math.random() * 24) - 12,
    };

    setStickers((prev) => [...prev.slice(-20), newSticker]);
  };

  const clearStickers = () => {
    setStickers([]);
  };

  return (
    <section id="canvas" className="py-16 sm:py-24 md:py-28 px-4 sm:px-8 border-b border-black/[0.05] dark:border-white/[0.06]">
      <div className="max-w-5xl mx-auto">
        
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-black/[0.05] dark:border-white/[0.06]">
          <div>
            <span className="text-xs sm:text-[13px] font-medium text-[#0071e3] dark:text-[#2997ff]">
              Kanvas Tamu
            </span>
            <h3 className="font-heading font-semibold text-xl sm:text-2xl md:text-3xl text-[#1d1d1f] dark:text-[#f5f5f7] mt-0.5">
              Papan Stiker Interaktif.
            </h3>
            <p className="text-xs sm:text-sm text-[#86868b] mt-1">
              Pilih simbol lalu klik di dalam kanvas untuk meninggalkan jejak interaktif Anda.
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 p-1 rounded-xl border border-black/[0.05] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.04]">
              {stickerIcons.map((Icon, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIconIndex(idx)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                    activeIconIndex === idx
                      ? "bg-white text-[#1d1d1f] dark:bg-[#2c2c2e] dark:text-[#f5f5f7] shadow-xs"
                      : "text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7]"
                  }`}
                  aria-label={`Stamp Icon ${idx}`}
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>

            {stickers.length > 0 && (
              <button
                onClick={clearStickers}
                className="p-2 rounded-xl border border-black/[0.05] dark:border-white/[0.08] text-[#86868b] hover:text-red-500 transition-colors cursor-pointer"
                title="Bersihkan Kanvas"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Click Stamp Canvas Surface */}
        <div
          onClick={addSticker}
          className="relative min-h-[220px] sm:min-h-[260px] bg-technical-grid rounded-2xl mt-6 p-4 overflow-hidden cursor-crosshair border border-black/[0.08] dark:border-white/[0.1] bg-black/[0.02] dark:bg-white/[0.02] flex items-center justify-center select-none"
        >
          {stickers.length === 0 && (
            <div className="text-center font-mono text-xs text-[#94A3B8] dark:text-[#64748B] pointer-events-none">
              [ Klik di mana saja untuk menempelkan simbol ]
            </div>
          )}

          <AnimatePresence>
            {stickers.map((sticker) => {
              const Icon = stickerIcons[sticker.iconIndex];
              return (
                <motion.div
                  key={sticker.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="absolute p-2.5 rounded-xl border border-black/[0.1] dark:border-white/[0.15] bg-white dark:bg-[#1A1E26] shadow-sm pointer-events-none"
                  style={{
                    left: sticker.x - 20,
                    top: sticker.y - 20,
                    rotate: `${sticker.rotation}deg`,
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: sticker.color }} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
