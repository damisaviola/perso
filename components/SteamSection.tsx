"use client";

import { useEffect, useState } from "react";
import { Gamepad2, Clock, ExternalLink, ChevronRight, Sparkles } from "lucide-react";

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
    <section id="steam" className="py-16 sm:py-24 md:py-28 px-4 sm:px-8 border-b border-black/[0.05] dark:border-white/[0.06]">
      <div className="max-w-5xl mx-auto">
        
        {/* Apple Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 pb-8 sm:pb-10 border-b border-black/[0.05] dark:border-white/[0.06]">
          <div>
            <span className="text-xs sm:text-[13px] font-medium text-[#0071e3] dark:text-[#2997ff]">
              Steam Gaming
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-[#1d1d1f] dark:text-[#f5f5f7] mt-1">
              Aktivitas Game di Steam.
            </h2>
          </div>
          <div className="flex flex-col sm:items-end gap-1">
            <p className="text-xs sm:text-sm text-[#86868b] max-w-sm">
              Data aktivitas game dan waktu bermain yang diambil langsung dari akun Steam saya.
            </p>
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium text-[#0071e3] dark:text-[#2997ff] hover:underline mt-1"
            >
              <span>Profil Steam @damimaturbongs</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Profile Status Strip (Unboxed) */}
        <div className="mt-8 pb-6 border-b border-black/[0.05] dark:border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 sm:gap-4">
            {loading ? (
              <div className="w-12 h-12 rounded-2xl bg-black/[0.04] dark:bg-white/[0.05] animate-pulse" />
            ) : (
              <img
                src={profile?.avatar}
                alt="Steam Avatar"
                className="w-12 h-12 rounded-2xl object-cover border border-black/[0.06] dark:border-white/[0.08]"
              />
            )}
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-heading font-semibold text-base sm:text-lg text-[#1d1d1f] dark:text-[#f5f5f7]">
                  {loading ? "Memuat profil..." : profile?.steamID}
                </h3>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-black/[0.03] dark:bg-white/[0.06] text-[#86868b]">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      profile?.onlineState === "in-game"
                        ? "bg-emerald-500 animate-pulse"
                        : profile?.onlineState === "online"
                        ? "bg-blue-500"
                        : "bg-gray-400"
                    }`}
                  />
                  {profile?.stateMessage || "Offline"}
                </span>
              </div>
              <p className="text-xs text-[#86868b] mt-0.5">
                ID: damimaturbongs • {profile?.memberSince ? `Bergabung ${profile.memberSince}` : "Steam Community"}
              </p>
            </div>
          </div>

          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-black/[0.04] dark:bg-white/[0.08] text-xs font-medium text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-black/[0.08] dark:hover:bg-white/[0.14] transition-colors"
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>Buka Profil Steam</span>
          </a>
        </div>

        {/* Most Played Games Ledger (Unboxed, clean row list) */}
        <div className="mt-2 divide-y divide-black/[0.05] dark:divide-white/[0.06]">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="py-5 flex items-center justify-between gap-4 animate-pulse"
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
                className="group py-5 -mx-3 px-3 rounded-xl hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5 sm:gap-5">
                  {/* Game Capsule Cover */}
                  <div className="relative w-32 sm:w-44 aspect-[184/69] rounded-lg overflow-hidden bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.05] dark:border-white/[0.08] shrink-0">
                    {game.logo ? (
                      <img
                        src={game.logo}
                        alt={game.name}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#86868b]">
                        <Gamepad2 className="w-6 h-6 opacity-40" />
                      </div>
                    )}
                  </div>

                  {/* Title & Stats */}
                  <div className="space-y-1">
                    <h3 className="font-heading font-semibold text-base sm:text-lg text-[#1d1d1f] dark:text-[#f5f5f7] group-hover:text-[#0071e3] dark:group-hover:text-[#2997ff] transition-colors leading-snug">
                      {game.name}
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs text-[#86868b]">
                      <Clock className="w-3.5 h-3.5 opacity-60 shrink-0" />
                      <span>{game.hoursOnRecord} jam tercatat di Steam</span>
                    </div>

                    {game.hoursPlayed2Wk && parseFloat(game.hoursPlayed2Wk) > 0 && (
                      <p className="text-[11px] text-[#0071e3] dark:text-[#2997ff] font-medium">
                        • {game.hoursPlayed2Wk} jam dalam 2 minggu terakhir
                      </p>
                    )}
                  </div>
                </div>

                {/* Direct Link Action */}
                <div className="self-end sm:self-auto shrink-0">
                  <a
                    href={game.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-[#0071e3] dark:text-[#2997ff] hover:underline cursor-pointer py-1"
                  >
                    <span>Detail di Steam</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </section>
  );
}
