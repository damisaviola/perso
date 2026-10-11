"use client";

import { useEffect, useState } from "react";
import { Gamepad2, Clock, ExternalLink, ChevronRight, Sparkles, Trophy, Flame } from "lucide-react";
import { soundFX } from "@/lib/sound";
import { useGame } from "./GameContext";

interface SteamGame {
  name: string;
  link: string;
  icon: string;
  logo: string;
  hoursPlayed2Wk: string;
  hoursOnRecord: string;
}

interface SteamProfile {
  steamID: string;
  customURL: string;
  onlineState: string;
  stateMessage: string;
  avatar: string;
  memberSince: string;
  hoursPlayed2Wk: string;
  games: SteamGame[];
}

export default function SteamSection() {
  const [profile, setProfile] = useState<SteamProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { addXp } = useGame();

  useEffect(() => {
    const fetchSteam = async () => {
      try {
        const res = await fetch("/api/steam");
        if (!res.ok) throw new Error("Failed to fetch steam data");
        const data = await res.json();
        setProfile(data.profile);
      } catch (err) {
        console.error("Error fetching steam data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSteam();
  }, []);

  const profileUrl = `https://steamcommunity.com/id/${profile?.customURL || "damisaviola"}`;

  return (
    <section id="steam" className="py-16 sm:py-24 md:py-28 px-4 sm:px-8 border-b border-black/[0.06] dark:border-white/[0.08] relative">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 pb-8 sm:pb-10 border-b border-black/[0.06] dark:border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20 mb-2">
              <Gamepad2 className="w-3 h-3" />
              <span>COMBAT RECORDS & GAMER PROFILE</span>
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-[#0f172a] dark:text-[#f8fafc]">
              Aktivitas Game di Steam
            </h2>
            <p className="text-xs sm:text-sm text-[#64748b] dark:text-[#94a3b8] mt-1.5 max-w-md">
              Data aktivitas game dan riwayat waktu bermain yang diambil langsung dari profil Steam publik.
            </p>
          </div>
          <div className="flex flex-col sm:items-end gap-1">
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFX.playClick()}
              onMouseEnter={() => soundFX.playHover()}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 hover:underline mt-1"
            >
              <span>Profil Steam @damimaturbongs</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Profile Status Strip (Cyber Deck Card) */}
        <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0c1220] border-2 border-black/[0.06] dark:border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-4">
            {loading ? (
              <div className="w-14 h-14 rounded-2xl bg-black/[0.04] dark:bg-white/[0.05] animate-pulse" />
            ) : (
              <div className="relative">
                <img
                  src={profile?.avatar}
                  alt="Steam Avatar"
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-cyan-500/40"
                />
                <span
                  className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#0c1220] ${
                    profile?.onlineState === "in-game"
                      ? "bg-emerald-500 animate-pulse"
                      : profile?.onlineState === "online"
                      ? "bg-cyan-400"
                      : "bg-slate-500"
                  }`}
                />
              </div>
            )}
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-heading font-black text-base sm:text-lg text-[#0f172a] dark:text-[#f8fafc]">
                  {loading ? "Memuat profil..." : profile?.steamID}
                </h3>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20">
                  {profile?.stateMessage || "Offline"}
                </span>
              </div>
              <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-1">
                COMMUNITY ID: damimaturbongs &bull; {profile?.memberSince ? `Bergabung ${profile.memberSince}` : "Steam Community"}
              </p>
            </div>
          </div>

          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              soundFX.playCoin();
              addXp(20, "Inspected Steam Station", { x: e.clientX, y: e.clientY });
            }}
            onMouseEnter={() => soundFX.playHover()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-xs font-mono font-bold text-white transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] active:scale-95"
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>BUKA PROFIL STEAM</span>
          </a>
        </div>

        {/* Most Played Games Grid */}
        <div className="mt-6 space-y-3">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between gap-4 animate-pulse"
              >
                <div className="flex items-center gap-4">
                  <div className="w-36 sm:w-44 aspect-[184/69] rounded-lg bg-black/[0.04] dark:bg-white/[0.05]" />
                  <div className="space-y-2">
                    <div className="h-5 bg-black/[0.04] dark:bg-white/[0.05] rounded w-36" />
                    <div className="h-3.5 bg-black/[0.04] dark:bg-white/[0.05] rounded w-24" />
                  </div>
                </div>
                <div className="h-4 bg-black/[0.04] dark:bg-white/[0.05] rounded w-20" />
              </div>
            ))
          ) : (
            profile?.games.map((game, idx) => (
              <div
                key={game.name || idx}
                onMouseEnter={() => soundFX.playHover()}
                className="group p-4 rounded-2xl bg-white dark:bg-[#0c1220] border-2 border-black/[0.06] dark:border-white/[0.08] hover:border-cyan-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  {/* Game Capsule Cover */}
                  <div className="relative w-32 sm:w-44 aspect-[184/69] rounded-xl overflow-hidden bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] shrink-0">
                    {game.logo ? (
                      <img
                        src={game.logo}
                        alt={game.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        <Gamepad2 className="w-6 h-6 opacity-40" />
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-sm sm:text-base text-[#0f172a] dark:text-[#f8fafc] group-hover:text-cyan-500 transition-colors">
                      {game.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                        {game.hoursPlayed2Wk ? `${game.hoursPlayed2Wk} jam (2 minggu)` : "Di arsip koleksi"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{game.hoursOnRecord} JAM BERMAIN</span>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </section>
  );
}
