"use client";

import {
  Film,
  Gamepad2,
  BookOpen,
  Code2,
  Globe,
  Database,
  Terminal,
} from "lucide-react";

export default function AboutSection() {
  const interests = [
    { label: "Film & Sinema", desc: "Mencatat review dan daftar tontonan di Letterboxd.", icon: Film },
    { label: "Membaca Komik", desc: "Menikmati seni visual dan cerita bergambar.", icon: BookOpen },
    { label: "Video Game", desc: "Mengapresiasi desain game dan alur cerita interaktif.", icon: Gamepad2 },
    { label: "Eksplorasi Web", desc: "Mengulik teknologi baru dan membuat eksperimen kode.", icon: Code2 },
  ];

  const tools = [
    {
      category: "Frontend",
      icon: Globe,
      items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML5 & CSS3"],
    },
    {
      category: "Backend & Basis Data",
      icon: Database,
      items: ["PHP", "Laravel", "CodeIgniter", "Go (Golang)", "MySQL", "PostgreSQL", "Supabase"],
    },
    {
      category: "Alat & Alur Kerja",
      icon: Terminal,
      items: ["Git & GitHub", "VS Code", "Postman", "Figma", "REST API"],
    },
  ];

  return (
    <section id="about" className="py-16 sm:py-24 md:py-28 px-4 sm:px-8 border-b border-black/[0.05] dark:border-white/[0.06]">
      <div className="max-w-5xl mx-auto">
        
        {/* Apple Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 pb-8 sm:pb-10 border-b border-black/[0.05] dark:border-white/[0.06]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0071e3] dark:text-[#2997ff]">
              Profil
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-[#1d1d1f] dark:text-[#f5f5f7] mt-1">
              Tentang Dami.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#86868b] max-w-sm">
            Menyukai dunia pembuatan website, bercerita lewat tulisan, dan menikmati waktu luang bersama film.
          </p>
        </div>

        {/* Apple Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 pt-6 sm:pt-10">
          
          {/* Main Personal Story (Span 7) */}
          <div className="lg:col-span-7 apple-card p-5 sm:p-8 rounded-2xl sm:rounded-3xl space-y-4 flex flex-col justify-between">
            <div className="space-y-3 sm:space-y-4">
              <h3 className="font-heading font-semibold text-lg sm:text-xl md:text-2xl text-[#1d1d1f] dark:text-[#f5f5f7]">
                Halo! Saya Damianus Saviola Maturbongs.
              </h3>
              
              <p className="text-xs sm:text-sm md:text-base text-[#86868b] leading-relaxed font-normal">
                Saya tinggal di Yogyakarta dan menyelesaikan studi S1 Sistem Informasi (Digital Bisnis) di Universitas Amikom Yogyakarta. Ketertarikan saya pada dunia web bermula dari rasa ingin tahu bagaimana kode-kode di editor bisa mewujud menjadi halaman interaktif yang dinikmati orang banyak.
              </p>

              <p className="text-xs sm:text-sm md:text-base text-[#86868b] leading-relaxed font-normal">
                Saya suka membuat website yang terasa ringan, punya tampilan rapi, dan mudah dipakai. Baik itu merancang tampilan antarmuka dengan React/Next.js, mengatur struktur database MySQL, maupun menyusun logika aplikasi dengan Laravel dan PHP.
              </p>
            </div>

            <div className="pt-4 sm:pt-5 border-t border-black/[0.05] dark:border-white/[0.06] flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-[#86868b]">
              <span>📍 Yogyakarta, Indonesia</span>
              <span className="hidden sm:inline">•</span>
              <span>🎓 Amikom Yogyakarta</span>
            </div>
          </div>

          {/* Tools & Technologies (Span 5) */}
          <div className="lg:col-span-5 apple-card p-5 sm:p-8 rounded-2xl sm:rounded-3xl space-y-4 sm:space-y-5">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#86868b]">
                Ekosistem
              </span>
              <h3 className="font-heading font-semibold text-base sm:text-lg text-[#1d1d1f] dark:text-[#f5f5f7] mt-0.5">
                Alat yang Digunakan
              </h3>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {tools.map((t) => {
                const Icon = t.icon;
                return (
                  <div key={t.category} className="space-y-1.5 sm:space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-[#1d1d1f] dark:text-[#f5f5f7]">
                      <Icon className="w-3.5 h-3.5 text-[#0071e3] dark:text-[#2997ff]" />
                      <span>{t.category}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 sm:gap-1.5">
                      {t.items.map((item) => (
                        <span
                          key={item}
                          className="text-[11px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-black/[0.03] dark:bg-white/[0.05] text-[#86868b]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Leisure (Span 12) */}
          <div className="lg:col-span-12 apple-card p-5 sm:p-8 rounded-2xl sm:rounded-3xl">
            <div className="pb-3 sm:pb-4 border-b border-black/[0.05] dark:border-white/[0.06]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#86868b]">
                Di Luar Koding
              </span>
              <h3 className="font-heading font-semibold text-base sm:text-lg text-[#1d1d1f] dark:text-[#f5f5f7] mt-0.5">
                Kegemaran & Waktu Luang
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-4 sm:pt-5">
              {interests.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.05] flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#0071e3]/10 text-[#0071e3] dark:text-[#2997ff] flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7]">
                        {item.label}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-[#86868b] mt-0.5 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
