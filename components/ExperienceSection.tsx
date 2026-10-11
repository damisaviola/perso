"use client";

import Image from "next/image";
import { PORTFOLIO_DATA, ExperienceItem } from "@/lib/data";
import { Flag, Trophy, Sparkles, CheckCircle2 } from "lucide-react";
import { soundFX } from "@/lib/sound";

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 sm:py-28 px-4 sm:px-8 border-b border-black/[0.06] dark:border-white/[0.08] relative">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 pb-8 sm:pb-10 border-b border-black/[0.06] dark:border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 mb-2">
              <Flag className="w-3 h-3" />
              <span>CAMPAIGN LOG & GUILD EXPEDITIONS</span>
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-[#0f172a] dark:text-[#f8fafc]">
              Riwayat Kampanye & Karir
            </h2>
            <p className="text-xs sm:text-sm text-[#64748b] dark:text-[#94a3b8] mt-1.5 max-w-md">
              Daftar misi utama dan ekspedisi organisasi yang telah dituntaskan sepanjang perjalanan profesional.
            </p>
          </div>
        </div>

        {/* Campaign Quest Cards */}
        <div className="mt-8 sm:mt-10 space-y-6">
          {PORTFOLIO_DATA.experiences.map((exp: ExperienceItem, idx: number) => {
            return (
              <div
                key={exp.id}
                onMouseEnter={() => soundFX.playHover()}
                className="group p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#0c1220] border-2 border-black/[0.06] dark:border-white/[0.08] hover:border-amber-500/40 transition-all duration-200 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8"
              >
                {/* Left Col: Chapter Badge & Company */}
                <div className="lg:col-span-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                      CHAPTER 0{idx + 1} // CLEARED
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {exp.logo && (
                      <div className="w-11 h-11 rounded-xl border border-black/[0.08] dark:border-white/[0.1] bg-white p-1 flex items-center justify-center shrink-0 overflow-hidden shadow-xs">
                        <Image
                          src={exp.logo}
                          alt={exp.company}
                          width={44}
                          height={44}
                          className="w-full h-full object-contain rounded-lg"
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="font-heading font-bold text-base text-[#0f172a] dark:text-[#f8fafc]">
                        {exp.company}
                      </h3>
                      <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                        {exp.period}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Col: Role, Accomplishments & Tech */}
                <div className="lg:col-span-8 space-y-3">
                  <div>
                    <h4 className="font-heading font-bold text-base sm:text-lg text-cyan-600 dark:text-cyan-400">
                      {exp.role}
                    </h4>
                    <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                      {exp.description}
                    </p>
                  </div>

                  {/* Key Quest Objectives Achieved */}
                  <div className="space-y-1.5 pt-1">
                    {exp.achievements.map((ach, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-[13px]">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                        <span className="leading-relaxed text-slate-600 dark:text-slate-300 font-sans">{ach}</span>
                      </div>
                    ))}
                  </div>

                  {/* Equipped Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-black/[0.04] dark:border-white/[0.05]">
                    {exp.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-black/[0.04] dark:bg-white/[0.06] text-slate-700 dark:text-slate-300 border border-black/[0.04] dark:border-white/[0.06]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
