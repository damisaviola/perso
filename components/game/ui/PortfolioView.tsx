"use client";

import React, { useState } from "react";
import {
  Gamepad2,
  Mail,
  ExternalLink,
  ChevronRight,
  GraduationCap,
  Award,
  Layers,
  Code2,
  Download,
  Building2,
  Terminal,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";
import { GAME_DEVELOPER_DATA, ProjectDetail } from "@/lib/game/gameData";
import ProjectDetailModal from "./ProjectDetailModal";
import { gameAudio } from "@/lib/game/gameAudio";

interface PortfolioViewProps {
  onBackToGame: () => void;
}

export default function PortfolioView({ onBackToGame }: PortfolioViewProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);

  return (
    <div className="min-h-screen bg-[#0a0f1d] text-white">
      {/* Top Banner with Game Return Shortcut */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#090d16]/90 border-b border-emerald-500/20 px-4 sm:px-8 py-3.5">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-xs font-mono font-bold text-emerald-400">
              DSM
            </div>
            <div>
              <span className="font-heading font-black text-sm sm:text-base text-white tracking-tight">
                {GAME_DEVELOPER_DATA.profile.name}
              </span>
              <span className="text-[10px] font-mono text-emerald-400 block sm:inline sm:ml-2">
                {GAME_DEVELOPER_DATA.profile.role}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              gameAudio.playInteract();
              onBackToGame();
            }}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-mono text-xs font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all cursor-pointer active:scale-95"
          >
            <Gamepad2 className="w-4 h-4" />
            <span>PLAY 2D RPG GAME</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-16">
        {/* Section 1: Hero & Profile */}
        <section className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <span>YOGYAKARTA, INDONESIA</span>
          </div>

          <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight max-w-3xl">
            Damianus Saviola Maturbongs
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed font-sans">
            {GAME_DEVELOPER_DATA.profile.bio}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={`mailto:${GAME_DEVELOPER_DATA.profile.contact.email}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-bold transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email: {GAME_DEVELOPER_DATA.profile.contact.email}</span>
            </a>

            <a
              href={GAME_DEVELOPER_DATA.profile.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-mono text-xs font-bold transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            <a
              href={GAME_DEVELOPER_DATA.profile.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-mono text-xs font-bold transition-colors"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
          </div>
        </section>

        {/* Section 2: Projects Showcase */}
        <section className="space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-white">
              Daftar Proyek Aplikasi Web
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Klik proyek untuk membaca detail teknis, problem solving, peran, dan arsitektur lengkap.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {GAME_DEVELOPER_DATA.projects.map((project) => (
              <div
                key={project.id}
                onClick={() => {
                  gameAudio.playInteract();
                  setSelectedProject(project);
                }}
                className="group p-5 rounded-2xl bg-[#0c1220] border-2 border-white/10 hover:border-cyan-500/50 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      {project.badge}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="font-heading font-black text-lg text-white group-hover:text-cyan-400 transition-colors mt-2">
                    {project.name}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed font-sans">
                    {project.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {project.techStack.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <span className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Detail</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Skills Arsenal */}
        <section className="space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-white">
              Tech Arsenal & Keahlian
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Teknologi yang telah dikuasai dan diterapkan pada proyek produksi nyata.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {GAME_DEVELOPER_DATA.skills.map((skill) => (
              <div
                key={skill.id}
                className="p-4 rounded-xl bg-[#0c1220] border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-bold text-sm text-white">
                      {skill.name}
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                      {skill.proficiencyLevel}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                    {skill.description}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-white/5 text-[10px] font-mono text-cyan-400">
                  {skill.category}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Education & Experience */}
        <section className="space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-white">
              Pendidikan & Pengalaman Organisasi
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-[#0c1220] border border-white/10 space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4" />
                <span>PENDIDIKAN SARJANA</span>
              </span>
              <h3 className="font-heading font-black text-lg text-white">
                {GAME_DEVELOPER_DATA.profile.education.university}
              </h3>
              <p className="text-xs text-slate-300 font-sans">
                {GAME_DEVELOPER_DATA.profile.education.degree} ({GAME_DEVELOPER_DATA.profile.education.period})
              </p>
              <div className="pt-2">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  IPK: {GAME_DEVELOPER_DATA.profile.education.gpa}
                </span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0c1220] border border-white/10 space-y-3">
              <span className="text-xs font-mono font-bold text-blue-400 flex items-center gap-1.5">
                <Building2 className="w-4 h-4" />
                <span>KONTRIBUSI ORGANISASI</span>
              </span>
              <div className="space-y-2 text-xs text-slate-300">
                <div>
                  <strong className="text-white">Amikom Computer Club (AMCC)</strong> — Anggota Web Development Frontend (2022 — 2025)
                </div>
                <div>
                  <strong className="text-white">Google Developer Groups (GDG)</strong> — Member Divisi Pengembangan Web (2023 — 2025)
                </div>
                <div>
                  <strong className="text-white">KOMPARI Paroki Babarsari</strong> — Divisi Pengembangan Web (2023 — 2026)
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Achievements & Certifications */}
        <section className="space-y-4">
          <div className="border-b border-white/10 pb-4">
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-white">
              Sertifikasi & Pencapaian
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {GAME_DEVELOPER_DATA.achievements.map((ach) => (
              <div
                key={ach.id}
                className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30"
              >
                <div className="flex items-center justify-between text-[10px] font-mono font-bold text-amber-400">
                  <span>{ach.badge}</span>
                  <span>{ach.year}</span>
                </div>
                <h4 className="font-heading font-bold text-sm text-white mt-1">
                  {ach.title}
                </h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {ach.description}
                </p>
                <span className="text-[10px] font-mono text-slate-400 block mt-1.5">
                  Institusi: {ach.issuer}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
