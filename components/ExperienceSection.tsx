"use client";

import { Briefcase, Calendar, CheckCircle2 } from "lucide-react";
import { PORTFOLIO_DATA, ExperienceItem } from "@/lib/data";

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-12 sm:py-24 px-3 sm:px-8 relative bg-neo-lines">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col items-start gap-2 mb-8 sm:mb-12">
          <div className="bg-[#8B5CF6] text-white neo-border px-3.5 py-1 rounded-full font-heading font-black text-xs sm:text-sm uppercase shadow-neo flex items-center gap-1.5">
            <Briefcase className="w-4 h-4" />
            <span>CAREER JOURNEY</span>
          </div>

          <h2 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl tracking-tight uppercase text-[#111111] dark:text-white">
            WORK <span className="bg-[#FFD60A] text-[#111111] px-2.5 py-0.5 neo-border shadow-neo inline-block rotate-[-1deg]">EXPERIENCE</span>
          </h2>
        </div>

        {/* Vertical Timeline */}
        <div className="relative pl-3 sm:pl-8 border-l-3 sm:border-l-4 border-[#111111] dark:border-white space-y-8 sm:space-y-12">
          {PORTFOLIO_DATA.experiences.map((exp: ExperienceItem, idx: number) => {
            return (
              <div key={exp.id} className="relative group">
                
                {/* Timeline Dot Badge */}
                <div
                  className="absolute -left-[20px] sm:-left-[43px] top-4 w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl neo-border flex items-center justify-center font-heading font-black text-xs sm:text-lg shadow-neo text-[#111111]"
                  style={{ backgroundColor: exp.color }}
                >
                  0{idx + 1}
                </div>

                {/* Main Card */}
                <div className="bg-white dark:bg-[#1A1A28] neo-card neo-card-hover rounded-3xl p-5 sm:p-8 ml-3 sm:ml-6">
                  
                  {/* Top Bar: Role, Company & Period */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 pb-3 sm:pb-4 border-b-3 border-[#111111] dark:border-white mb-4">
                    <div className="flex items-center gap-3 sm:gap-4">
                      {exp.logo && (
                        <div className="w-10 h-10 sm:w-14 sm:h-14 shrink-0 bg-white rounded-xl neo-border flex items-center justify-center p-1 sm:p-2 shadow-sm">
                          <img src={exp.logo} alt={exp.company} className="w-full h-full object-contain" />
                        </div>
                      )}
                      <div>
                        <span
                          className="font-heading font-black text-[10px] sm:text-xs px-2.5 py-0.5 sm:py-1 rounded-full neo-border uppercase text-[#111111]"
                          style={{ backgroundColor: exp.color }}
                        >
                          {exp.company}
                        </span>
                        <h3 className="font-heading font-black text-xl sm:text-3xl text-[#111111] dark:text-white mt-1">
                          {exp.role}
                        </h3>
                      </div>
                    </div>

                    <div className="bg-[#111111] text-white font-heading font-bold text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl neo-border-sm flex items-center gap-1.5 self-start md:self-auto">
                      <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFD60A]" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-lg text-gray-700 dark:text-gray-300 font-medium mb-4">
                    {exp.description}
                  </p>

                  {/* Key Achievements Bullet points */}
                  <div className="space-y-2 mb-5">
                    <h4 className="font-heading font-bold text-xs sm:text-sm text-[#111111] dark:text-white uppercase">
                      PENCAPAIAN UTAMA:
                    </h4>
                    {exp.achievements.map((ach, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs sm:text-base font-medium text-gray-800 dark:text-gray-200">
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#22C55E] shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-3 border-t-3 border-[#111111] dark:border-white">
                    {exp.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="bg-[#FFF9F0] dark:bg-[#111111] text-[#111111] dark:text-white font-heading font-bold text-[11px] sm:text-xs px-2.5 py-1 rounded-xl neo-border-sm"
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
