"use client";

import dynamic from "next/dynamic";
import { ChevronRight } from "lucide-react";
import { GithubIcon } from "./SocialIcons";

const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((mod) => mod.GitHubCalendar),
  { ssr: false }
);
import "react-github-calendar/tooltips.css";

export default function GithubSection() {
  const username = "damisaviola";

  return (
    <section id="github" className="py-16 sm:py-24 md:py-28 px-4 sm:px-8 border-b border-black/[0.05] dark:border-white/[0.06]">
      <div className="max-w-5xl mx-auto">
        
        {/* Apple Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 pb-8 sm:pb-10 border-b border-black/[0.05] dark:border-white/[0.06]">
          <div>
            <span className="text-xs sm:text-[13px] font-medium text-[#0071e3] dark:text-[#2997ff]">
              Aktivitas
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-[#1d1d1f] dark:text-[#f5f5f7] mt-1">
              Kontribusi GitHub.
            </h2>
          </div>
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-[#0071e3] dark:text-[#2997ff] hover:underline self-start sm:self-auto"
          >
            <span>github.com/{username}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Unboxed GitHub Activity View */}
        <div className="mt-8 sm:mt-10">
          <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-black/[0.04] dark:border-white/[0.06]">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-8 h-8 rounded-full bg-black/[0.05] dark:bg-white/[0.1] text-[#1d1d1f] dark:text-[#f5f5f7] flex items-center justify-center shrink-0">
                <GithubIcon className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-heading font-medium text-xs sm:text-sm text-[#1d1d1f] dark:text-[#f5f5f7]">
                  Aktivitas 12 Bulan Terakhir
                </h3>
                <p className="text-[11px] sm:text-xs text-[#86868b]">
                  Commit dan kontribusi pada repositori publik.
                </p>
              </div>
            </div>

            <span className="text-xs text-[#86868b]">
              @damisaviola
            </span>
          </div>

          {/* Touch-Friendly Heatmap Container */}
          <div className="w-full overflow-x-auto pb-4 flex sm:justify-center scrollbar-hide -mx-2 px-2 sm:mx-0">
            <div className="min-w-[680px] sm:min-w-[800px] flex justify-center py-2">
              <GitHubCalendar 
                username={username} 
                colorScheme="light"
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
                    '#1c1c1e',
                    '#0e4429',
                    '#006d32',
                    '#26a641',
                    '#39d353',
                  ]
                }}
                tooltips={{
                  activity: {
                    text: (activity) => `${activity.count} kontribusi pada ${activity.date}`,
                  },
                  colorLegend: {
                    text: (level) => {
                      if (level === 0) return 'Tidak ada kontribusi';
                      if (level === 1) return 'Sedikit';
                      if (level === 2) return 'Sedang';
                      if (level === 3) return 'Banyak';
                      return 'Sangat aktif';
                    },
                  },
                }}
              />
            </div>
          </div>
          <div className="text-[10px] text-[#86868b] sm:hidden text-center mt-1">
            ← Geser untuk melihat seluruh riwayat →
          </div>
        </div>

      </div>
    </section>
  );
}
