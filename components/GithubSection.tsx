"use client";

import dynamic from "next/dynamic";

const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((mod) => mod.GitHubCalendar),
  { ssr: false }
);
import "react-github-calendar/tooltips.css";
import { Activity } from "lucide-react";
import { GithubIcon } from "./SocialIcons";

export default function GithubSection() {
  const username = "damisaviola";

  return (
    <section id="github" className="py-12 sm:py-24 px-3 sm:px-8 relative bg-[#FFF9F0] dark:bg-[#111111]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col items-start gap-2 mb-8 sm:mb-12">
          <div className="bg-[#22C55E] text-white neo-border px-3.5 py-1 rounded-full font-heading font-black text-xs sm:text-sm uppercase shadow-neo flex items-center gap-1.5">
            <Activity className="w-4 h-4" />
            <span>OPEN SOURCE</span>
          </div>

          <h2 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl tracking-tight uppercase text-[#111111] dark:text-white flex items-center gap-4 flex-wrap">
            GITHUB <span className="bg-[#FFD60A] text-[#111111] px-2.5 py-0.5 neo-border shadow-neo inline-block rotate-[-2deg]">CONTRIBUTIONS</span>
          </h2>
        </div>

        {/* Content Card */}
        <div className="bg-white dark:bg-[#1A1A28] neo-card rounded-3xl p-6 sm:p-10 flex flex-col items-center justify-center border-3 border-[#111111] dark:border-white shadow-neo">
          <div className="flex items-center gap-3 mb-8 w-full border-b-3 border-[#111111] dark:border-white pb-6">
            <div className="w-12 h-12 bg-[#111111] dark:bg-white text-white dark:text-[#111111] rounded-2xl flex items-center justify-center shadow-neo">
              <GithubIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading font-black text-xl sm:text-2xl text-[#111111] dark:text-white">
                @{username}
              </h3>
              <p className="text-sm font-bold text-gray-500 dark:text-gray-400">
                My coding activity on GitHub
              </p>
            </div>
          </div>

          <div className="w-full overflow-x-auto pb-4 flex justify-center scrollbar-hide">
            <div className="min-w-[800px] flex justify-center bg-white dark:bg-[#1A1A28] p-4 rounded-xl">
              <GitHubCalendar 
                username={username} 
                colorScheme="light"
                blockSize={14}
                blockMargin={4}
                fontSize={14}
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
                  ]
                }}
                tooltips={{
                  activity: {
                    text: (activity) => `${activity.count} contributions on ${activity.date}`,
                  },
                  colorLegend: {
                    text: (level) => {
                      if (level === 0) return 'No contributions';
                      if (level === 1) return 'Few contributions';
                      if (level === 2) return 'Some contributions';
                      if (level === 3) return 'Many contributions';
                      return 'Lots of contributions';
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
