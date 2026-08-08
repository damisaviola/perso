"use client";

import {
  User,
  Heart,
  Target,
  Sparkles,
  Coffee,
  Gamepad2,
  Music,
  Briefcase,
  Code2,
  CheckCircle,
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/lib/data";

export default function AboutSection() {
  const hobbies = [
    { name: "Membaca Komik", icon: Sparkles, color: "#FFD60A" },
    { name: "Menonton Film", icon: Target, color: "#EC4899" },
    { name: "Bermain Game", icon: Gamepad2, color: "#3B82F6" },
    { name: "Web Dev Communities", icon: Code2, color: "#FF9F1C" },
    { name: "UI/UX Exploration", icon: User, color: "#8B5CF6" },
  ];

  return (
    <section id="about" className="py-12 sm:py-24 px-3 sm:px-8 relative bg-neo-grid">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-start gap-2 mb-8 sm:mb-12">
          <div className="bg-[#FF5A5F] text-white neo-border px-3.5 py-1 rounded-full font-heading font-black text-xs sm:text-sm uppercase shadow-neo flex items-center gap-1.5">
            <User className="w-4 h-4" />
            <span>WHO I AM</span>
          </div>

          <h2 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl tracking-tight uppercase text-[#111111] dark:text-white">
            ABOUT <span className="bg-[#FFD60A] text-[#111111] px-2.5 py-0.5 neo-border shadow-neo inline-block rotate-1">MYSELF</span>
          </h2>
        </div>

        {/* Grid Layout of Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 xl:gap-8">
          
          {/* Card 1: Main Bio (Large Span 8) */}
          <div className="lg:col-span-8 bg-white dark:bg-[#1A1A28] neo-card neo-card-hover p-5 sm:p-8 rounded-3xl flex flex-col justify-between relative overflow-hidden">
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FFD60A] neo-border rounded-2xl flex items-center justify-center text-[#111111] shrink-0">
                  <User className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h3 className="font-heading font-black text-xl sm:text-3xl text-[#111111] dark:text-white">
                    Hi, I'm Damianus Saviola! 👋
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-[#FF5A5F]">
                    Web Developers
                  </p>
                </div>
              </div>

              <p className="text-sm sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                Sebagai Web Developer, spesialisasi saya ada pada pengembangan antarmuka (frontend) dan sistem full-stack menggunakan ekosistem Next.js, Laravel, dan CodeIgniter.
              </p>

              <p className="text-sm sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                Keahlian utama yang selalu saya kembangkan dan aplikasikan dalam berbagai proyek meliputi:
              </p>
            </div>

            {/* Highlights List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4 sm:pt-6 border-t-3 border-[#111111] dark:border-white mt-5">
              <div className="flex items-center gap-2 font-heading font-bold text-xs sm:text-base text-[#111111] dark:text-white">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#22C55E] shrink-0" />
                <span>Frontend: React, Next.js, Tailwind</span>
              </div>
              <div className="flex items-center gap-2 font-heading font-bold text-xs sm:text-base text-[#111111] dark:text-white">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#3B82F6] shrink-0" />
                <span>Backend: PHP (Laravel, CI), Go</span>
              </div>
              <div className="flex items-center gap-2 font-heading font-bold text-xs sm:text-base text-[#111111] dark:text-white">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#EC4899] shrink-0" />
                <span>Database: MySQL, Supabase, Firebase</span>
              </div>
              <div className="flex items-center gap-2 font-heading font-bold text-xs sm:text-base text-[#111111] dark:text-white">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF9F1C] shrink-0" />
                <span>Metodologi: Clean Code, Kolaborasi</span>
              </div>
            </div>
          </div>

          {/* Card 2: Career Goals & Philosophy (Span 4) */}
          <div className="lg:col-span-4 bg-[#8B5CF6] text-white neo-card neo-card-hover p-5 sm:p-8 rounded-3xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FFD60A] text-[#111111] neo-border rounded-2xl flex items-center justify-center">
                <Target className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>

              <h3 className="font-heading font-black text-xl sm:text-3xl">
                TECH STACK INTI
              </h3>

              <ul className="text-xs sm:text-sm leading-relaxed font-medium text-purple-100 space-y-2">
                <li><strong className="text-[#FFD60A]">Frontend:</strong> HTML, CSS, JavaScript (React, Next.js, Tailwind CSS, Bootstrap).</li>
                <li><strong className="text-[#FFD60A]">Backend:</strong> PHP (Laravel, CodeIgniter), Golang, RESTful API.</li>
                <li><strong className="text-[#FFD60A]">Database:</strong> MySQL (Normalisasi, Query Optimization), Firebase, Supabase.</li>
                <li><strong className="text-[#FFD60A]">Metodologi:</strong> Clean Code, SDLC, Git Version Control.</li>
              </ul>
            </div>
          </div>

          {/* Card 3: Experience Snapshot (Span 5) */}
          <div className="lg:col-span-5 bg-[#3B82F6] text-white neo-card neo-card-hover p-5 sm:p-8 rounded-3xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white dark:bg-[#111111] text-[#3B82F6] neo-border rounded-2xl flex items-center justify-center font-black">
                <Briefcase className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>

              <h3 className="font-heading font-black text-xl sm:text-3xl">
                QUICK STATS & TRACK RECORD
              </h3>

              <ul className="space-y-2.5 font-heading font-bold text-xs sm:text-base">
                <li className="bg-white/10 neo-border p-2.5 sm:p-3 rounded-xl flex items-center justify-between">
                  <span>Proyek Selesai:</span>
                  <span className="bg-[#FFD60A] text-[#111111] px-2 py-0.5 rounded-lg neo-border-sm">
                    {PORTFOLIO_DATA.personal.completedProjects}
                  </span>
                </li>

                <li className="bg-white/10 neo-border p-2.5 sm:p-3 rounded-xl flex items-center justify-between">
                  <span>Kepuasan Klien:</span>
                  <span className="bg-[#22C55E] text-[#111111] px-2 py-0.5 rounded-lg neo-border-sm">
                    {PORTFOLIO_DATA.personal.happyClients}
                  </span>
                </li>

                <li className="bg-white/10 neo-border p-2.5 sm:p-3 rounded-xl flex items-center justify-between">
                  <span>Pengalaman Industri:</span>
                  <span className="bg-[#EC4899] text-white px-2 py-0.5 rounded-lg neo-border-sm">
                    {PORTFOLIO_DATA.personal.experienceYears}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Card 4: Hobbies & Passions (Span 7) */}
          <div className="lg:col-span-7 bg-[#FFD60A] text-[#111111] neo-card neo-card-hover p-5 sm:p-8 rounded-3xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FF5A5F] text-white neo-border rounded-2xl flex items-center justify-center shrink-0">
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="font-heading font-black text-xl sm:text-3xl uppercase">
                  MARI TERKONEKSI
                </h3>
              </div>

              <p className="text-xs sm:text-base font-semibold">
                Saya selalu terbuka untuk kolaborasi, diskusi proyek, atau peluang profesional. Selain itu, saya juga menikmati:
              </p>

              <div className="flex flex-wrap gap-2.5 pt-1">
                {hobbies.map((hobby) => {
                  const Icon = hobby.icon;
                  return (
                    <div
                      key={hobby.name}
                      className="bg-white dark:bg-[#111111] dark:text-white neo-border px-3 py-1.5 rounded-xl font-heading font-bold text-xs sm:text-sm flex items-center gap-2 shadow-neo hover:scale-105 transition-transform"
                    >
                      <Icon className="w-3.5 h-3.5 text-[#FF5A5F]" />
                      <span>{hobby.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
