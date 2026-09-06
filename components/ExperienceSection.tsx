"use client";

import { PORTFOLIO_DATA, ExperienceItem } from "@/lib/data";

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 sm:py-28 px-4 sm:px-8 border-b border-black/[0.05] dark:border-white/[0.06]">
      <div className="max-w-5xl mx-auto">
        
        {/* Apple Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-10 border-b border-black/[0.05] dark:border-white/[0.06]">
          <div>
            <span className="text-xs sm:text-[13px] font-medium text-[#0071e3] dark:text-[#2997ff]">
              Riwayat
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#1d1d1f] dark:text-[#f5f5f7] mt-1">
              Pengalaman.
            </h2>
          </div>
          <p className="text-sm text-[#86868b] max-w-sm">
            Tempat saya pernah belajar, berkolaborasi dalam tim, dan membangun proyek web.
          </p>
        </div>

        {/* Clean Ledger */}
        <div className="divide-y divide-black/[0.05] dark:divide-white/[0.06]">
          {PORTFOLIO_DATA.experiences.map((exp: ExperienceItem) => {
            return (
              <div
                key={exp.id}
                className="py-10 first:pt-8 last:pb-0 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8"
              >
                {/* Left Col: Period & Company (Span 4) */}
                <div className="lg:col-span-4 space-y-2">
                  <div className="flex items-center gap-3">
                    {exp.logo && (
                      <div className="w-10 h-10 rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-white p-1 flex items-center justify-center shrink-0">
                        <img src={exp.logo} alt={exp.company} className="w-full h-full object-contain" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-heading font-semibold text-base text-[#1d1d1f] dark:text-[#f5f5f7]">
                        {exp.company}
                      </h3>
                      <span className="text-xs text-[#86868b]">
                        {exp.period}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Col: Role, Accomplishments & Tech (Span 8) */}
                <div className="lg:col-span-8 space-y-3">
                  <div>
                    <h4 className="font-heading font-medium text-lg text-[#1d1d1f] dark:text-[#f5f5f7]">
                      {exp.role}
                    </h4>
                    <p className="mt-1.5 text-sm text-[#86868b] leading-relaxed">
                      {exp.description}
                    </p>
                  </div>

                  {/* Key Contributions */}
                  <div className="space-y-1.5 pt-1">
                    {exp.achievements.map((ach, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#1d1d1f] dark:text-[#f5f5f7]">
                        <span className="w-1 h-1 rounded-full bg-[#0071e3] dark:bg-[#2997ff] mt-2 shrink-0" />
                        <span className="leading-relaxed text-[#86868b]">{ach}</span>
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
