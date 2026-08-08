"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Trash2, Smile, Zap, Heart, Star, Flame, ThumbsUp } from "lucide-react";

interface Sticker {
  id: number;
  x: number;
  y: number;
  iconIndex: number;
  color: string;
  rotation: number;
}

const stickerIcons = [Star, Zap, Smile, Heart, Flame, ThumbsUp];
const stickerColors = ["#FFD60A", "#FF5A5F", "#3B82F6", "#22C55E", "#EC4899", "#8B5CF6"];

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
      color: stickerColors[Math.floor(Math.random() * stickerColors.length)],
      rotation: Math.floor(Math.random() * 40) - 20,
    };

    setStickers((prev) => [...prev.slice(-15), newSticker]); // Keep last 15
  };

  const clearStickers = () => {
    setStickers([]);
  };

  return (
    <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="bg-[#FFD60A] neo-card p-6 sm:p-8 rounded-3xl space-y-6">
        
        {/* Widget Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#FF5A5F]" />
              <h3 className="font-heading font-black text-2xl uppercase text-[#111111]">
                INTERACTIVE STICKER BOARD 🎨
              </h3>
            </div>
            <p className="text-xs sm:text-sm font-bold text-[#111111]/80">
              Pilih stiker favorit lalu klik di dalam papan canvas di bawah untuk menempelkan stiker Neo Brutalism!
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <div className="flex flex-wrap items-center gap-1 bg-white dark:bg-[#1A1A28] neo-border p-1.5 rounded-2xl shadow-neo">
              {stickerIcons.map((Icon, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIconIndex(idx)}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-transform ${
                    activeIconIndex === idx
                      ? "bg-[#FF5A5F] text-white scale-110 neo-border-sm"
                      : "hover:bg-gray-100 text-[#111111]"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </button>
              ))}
            </div>

            <button
              onClick={clearStickers}
              className="bg-[#111111] text-white neo-btn p-3 rounded-2xl font-heading font-bold text-xs flex items-center gap-1 cursor-pointer"
              title="Clear Canvas"
            >
              <Trash2 className="w-4 h-4 text-[#FF5A5F]" />
            </button>
          </div>
        </div>

        {/* Interactive Click Stamp Canvas Box */}
        <div
          onClick={addSticker}
          className="relative min-h-[220px] bg-white dark:bg-[#1A1A28] neo-border rounded-2xl p-4 overflow-hidden cursor-crosshair shadow-neo flex items-center justify-center select-none"
        >
          {stickers.length === 0 && (
            <div className="text-center font-heading font-extrabold text-sm sm:text-base text-gray-400 pointer-events-none">
              ✨ KLIK DI SINI UNTUK MENEMPELKAN STIKER INTERAKTIF ✨
            </div>
          )}

          <AnimatePresence>
            {stickers.map((st) => {
              const Icon = stickerIcons[st.iconIndex];
              return (
                <motion.div
                  key={st.id}
                  initial={{ scale: 0, rotate: st.rotation }}
                  animate={{ scale: 1, rotate: st.rotation }}
                  exit={{ scale: 0 }}
                  style={{
                    position: "absolute",
                    left: st.x - 24,
                    top: st.y - 24,
                    backgroundColor: st.color,
                  }}
                  className="w-12 h-12 neo-border rounded-2xl flex items-center justify-center shadow-neo pointer-events-none text-[#111111]"
                >
                  <Icon className="w-7 h-7" />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
