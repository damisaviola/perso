"use client";

import { ArrowUp, Briefcase, Film, Gamepad2, Sparkles } from "lucide-react";
import { PORTFOLIO_DATA } from "@/lib/data";
import {
  GithubIcon,
  LinkedinIcon,
} from "./SocialIcons";
import { soundFX } from "@/lib/sound";
import { useGame } from "./GameContext";

interface FooterProps {
  activeMode?: "work" | "hobbies";
  onSelectMode?: (mode: "work" | "hobbies") => void;
}

export default function Footer({ activeMode = "work", onSelectMode }: FooterProps) {
  const { setArcadeOpen } = useGame();

  const scrollToTop = () => {
    soundFX.playPowerUp();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 sm:py-16 px-4 sm:px-8 border-t border-black/[0.06] dark:border-white/[0.08] bg-[#fafafa] dark:bg-[#090d16] pb-24 sm:pb-28">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Top Row: Brand & Quick Navigation */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-xs font-mono font-bold text-cyan-400">
              👾
            </div>
            <div>
              <span className="font-heading font-black text-base sm:text-lg tracking-tight text-[#0f172a] dark:text-[#f8fafc]">
                damisaviola
              </span>
              <span className="text-[10px] font-mono text-cyan-500 block">
                PLAYER 1 SESSION ACTIVE
              </span>
            </div>
          </div>

          {/* Nav Quick Links */}
          <div className="flex flex-wrap items-center gap-3.5 sm:gap-5 text-xs font-mono text-[#64748b] dark:text-[#94a3b8]">
            <a
              href="#hero"
              onClick={() => soundFX.playClick()}
              className="hover:text-cyan-500 transition-colors py-1"
            >
              Start Realm
            </a>
            
            {activeMode === "work" ? (
              <>
                <a
                  href="#projects"
                  onClick={() => soundFX.playClick()}
                  className="hover:text-cyan-500 transition-colors py-1"
                >
                  Bounty
                </a>
                <a
                  href="#skills"
                  onClick={() => soundFX.playClick()}
                  className="hover:text-cyan-500 transition-colors py-1"
                >
                  Loadout
                </a>
                <a
                  href="#github"
                  onClick={() => soundFX.playClick()}
                  className="hover:text-cyan-500 transition-colors py-1"
                >
                  Heatmap
                </a>
                <a
                  href="#experience"
                  onClick={() => soundFX.playClick()}
                  className="hover:text-cyan-500 transition-colors py-1"
                >
                  Campaign
                </a>
                <a
                  href="#contact"
                  onClick={() => soundFX.playClick()}
                  className="hover:text-cyan-500 transition-colors py-1"
                >
                  Comm Link
                </a>
                {onSelectMode && (
                  <button
                    onClick={() => {
                      soundFX.playPowerUp();
                      onSelectMode("hobbies");
                    }}
                    className="inline-flex items-center gap-1 text-amber-500 hover:underline cursor-pointer py-1 ml-1"
                  >
                    <Film className="w-3 h-3" />
                    <span>🍺 Buka Tavern Hobi</span>
                  </button>
                )}
              </>
            ) : (
              <>
                <a
                  href="#letterboxd"
                  onClick={() => soundFX.playClick()}
                  className="hover:text-amber-500 transition-colors py-1"
                >
                  Film
                </a>
                <a
                  href="#comics"
                  onClick={() => soundFX.playClick()}
                  className="hover:text-amber-500 transition-colors py-1"
                >
                  Komik
                </a>
                <a
                  href="#steam"
                  onClick={() => soundFX.playClick()}
                  className="hover:text-amber-500 transition-colors py-1"
                >
                  Steam
                </a>
                <a
                  href="#spotify"
                  onClick={() => soundFX.playClick()}
                  className="hover:text-amber-500 transition-colors py-1"
                >
                  Musik
                </a>
                <a
                  href="#blog"
                  onClick={() => soundFX.playClick()}
                  className="hover:text-amber-500 transition-colors py-1"
                >
                  Catatan
                </a>
                <a
                  href="#canvas"
                  onClick={() => soundFX.playClick()}
                  className="hover:text-amber-500 transition-colors py-1"
                >
                  Kanvas
                </a>
                {onSelectMode && (
                  <button
                    onClick={() => {
                      soundFX.playClick();
                      onSelectMode("work");
                    }}
                    className="inline-flex items-center gap-1 text-cyan-500 hover:underline cursor-pointer py-1 ml-1"
                  >
                    <Briefcase className="w-3 h-3" />
                    <span>⚔️ Kembali ke Main Quest</span>
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Bottom Strip: Respawn & Copyright */}
        <div className="pt-6 border-t border-black/[0.05] dark:border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500 dark:text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} Damianus Saviola Maturbongs. Designed & Built like an Interactive Game.
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                soundFX.playClick();
                setArcadeOpen(true);
              }}
              className="inline-flex items-center gap-1 text-cyan-500 hover:underline cursor-pointer"
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>Buka Mini-Game</span>
            </button>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] text-[#0f172a] dark:text-[#f8fafc] font-bold transition-all cursor-pointer active:scale-95"
            >
              <span>RESPAWN AT TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
