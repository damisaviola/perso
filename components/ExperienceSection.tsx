"use client";

import Image from "next/image";
import { PORTFOLIO_DATA, ExperienceItem } from "@/lib/data";

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 sm:py-28 px-4 sm:px-8 border-b border-black/[0.05] dark:border-white/[0.06]">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 pb-8 sm:pb-10 border-b border-black/[0.06] dark:border-white/[0.08]">
          <div>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-[#0f172a] dark:text-[#f8fafc]">
              Pengalaman & Organisasi
            </h2>
            <p className="text-xs sm:text-sm text-[#64748b] dark:text-[#94a3b8] mt-1.5 max-w-md">
              Jejak kontribusi dalam proyek web nyata, organisasi mahasiswa, dan komunitas developer.
            </p>
          </div>
        </div>

        {/* Clean Ledger */}
        <div className="divide-y divide-black/[0.06] dark:divide-white/[0.08]">
          {PORTFOLIO_DATA.experiences.map((exp: ExperienceItem) => {
            return (
              <div
                key={exp.id}
                className="py-8 sm:py-10 first:pt-6 last:pb-0 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8"
              >
                {/* Left Col: Period & Company (Span 4) */}
                <div className="lg:col-span-4 space-y-2">
                  <div className="flex items-center gap-3">
                    {exp.logo && (
                      <div className="w-10 h-10 rounded-xl border border-black/[0.08] dark:border-white/[0.1] bg-white p-1 flex items-center justify-center shrink-0 overflow-hidden shadow-xs">
                        <Image
                          src={exp.logo}
                          alt={exp.company}
                          width={40}
                          height={40}
                          className="w-full h-full object-contain rounded-lg"
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="font-heading font-semibold text-base text-[#0f172a] dark:text-[#f8fafc]">
                        {exp.company}
                      </h3>
                      <span className="text-xs text-[#64748b] dark:text-[#94a3b8]">
                        {exp.period}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Col: Role, Accomplishments & Tech (Span 8) */}
                <div className="lg:col-span-8 space-y-3">
                  <div>
                    <h4 className="font-heading font-medium text-base sm:text-lg text-[#0f172a] dark:text-[#f8fafc]">
                      {exp.role}
                    </h4>
                    <p className="mt-1.5 text-xs sm:text-sm text-[#64748b] dark:text-[#94a3b8] leading-relaxed">
                      {exp.description}
                    </p>
                  </div>

                  {/* Key Contributions */}
                  <div className="space-y-1.5 pt-1">
                    {exp.achievements.map((ach, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-[13px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb] dark:bg-[#60a5fa] mt-1.5 shrink-0" />
                        <span className="leading-relaxed text-[#64748b] dark:text-[#94a3b8]">{ach}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {exp.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2.5 py-0.5 rounded-full bg-black/[0.03] dark:bg-white/[0.05] text-[#86868b]"
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
