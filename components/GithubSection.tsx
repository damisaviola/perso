"use client";

import dynamic from "next/dynamic";
import { ChevronRight, GitCommit, Sparkles } from "lucide-react";
import { GithubIcon } from "./SocialIcons";
import { soundFX } from "@/lib/sound";

const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((mod) => mod.GitHubCalendar),
  { ssr: false }
);
import "react-github-calendar/tooltips.css";

export default function GithubSection() {
  const username = "damisaviola";

  return (
    <section id="github" className="py-16 sm:py-24 md:py-28 px-4 sm:px-8 border-b border-black/[0.06] dark:border-white/[0.08] relative">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 pb-8 sm:pb-10 border-b border-black/[0.06] dark:border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 mb-2">
              <GitCommit className="w-3 h-3" />
              <span>BATTLE LOG & COMMIT STREAK</span>
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-[#0f172a] dark:text-[#f8fafc]">
              Kontribusi & Aktivitas GitHub
            </h2>
            <p className="text-xs sm:text-sm text-[#64748b] dark:text-[#94a3b8] mt-1.5">
              Heatmap akumulasi XP komit dan kontribusi kode open-source sepanjang satu tahun terakhir.
            </p>
          </div>
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFX.playClick()}
            onMouseEnter={() => soundFX.playHover()}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 hover:underline self-start sm:self-auto"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>github.com/{username}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Gaming Heatmap Container */}
        <div className="mt-8 sm:mt-10 p-5 sm:p-7 rounded-2xl bg-white dark:bg-[#0c1220] border-2 border-black/[0.06] dark:border-emerald-500/20 shadow-sm">
          <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-black/[0.04] dark:border-white/[0.06]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
                <GithubIcon className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-xs sm:text-sm text-[#0f172a] dark:text-[#f8fafc]">
                  Heatmap Aktivitas 365 Hari
                </h3>
                <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  Sinkronisasi live komit dan branch pull request.
                </p>
              </div>
            </div>

            <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
              @{username}
            </span>
          </div>

          {/* Touch-Friendly Heatmap Container */}
          <div className="w-full overflow-x-auto pb-4 flex sm:justify-center scrollbar-hide -mx-2 px-2 sm:mx-0">
            <div className="min-w-[680px] sm:min-w-[800px] flex justify-center py-2">
              <GitHubCalendar 
                username={username} 
                blockSize={12}
                blockMargin={3.5}
                fontSize={12}
                theme={{
                  light: [
                    '#ebedf0',
                    '#9be9a8',
                    '#40c463',
                    '#30a14e',
                    '#216e39',
                  ],
                  dark: [
                    '#161b22',
                    '#0e4429',
                    '#006d32',
                    '#26a641',
                    '#39d353',
                  ],
                }}
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
