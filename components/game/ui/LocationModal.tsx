"use client";

import React, { useEffect } from "react";
import { X, GraduationCap, Award, Radio, Sword, Mail, ExternalLink, Download } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";
import { GAME_DEVELOPER_DATA, SkillItem } from "@/lib/game/gameData";
import { gameAudio } from "@/lib/game/gameAudio";

interface LocationModalProps {
  type: "academy" | "achievements" | "altar" | "tower" | "location";
  data?: any;
  onClose: () => void;
}

export default function LocationModal({ type, data, onClose }: LocationModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 overflow-y-auto select-none">
      {/* Backdrop */}
      <div
        className="fixed inset-0"
        onClick={() => {
          gameAudio.playMenuClick();
          onClose();
        }}
      />

      {/* Solid RPG Archive Frame */}
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0d121d] border-4 border-[#334155] p-5 sm:p-8 text-white shadow-[0_12px_40px_rgba(0,0,0,0.95)] my-auto scrollbar-hide">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3.5 border-b-2 border-[#1f2838] mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#161e2e] border-2 border-[#2f3d54] flex items-center justify-center text-[#f59e0b]">
              {type === "academy" && <GraduationCap className="w-5 h-5" />}
              {type === "achievements" && <Award className="w-5 h-5" />}
              {type === "altar" && <Sword className="w-5 h-5" />}
              {type === "tower" && <Radio className="w-5 h-5" />}
              {type === "location" && <GraduationCap className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="font-mono font-bold text-base sm:text-lg text-white uppercase tracking-wider">
                {data?.title || data?.name || "ARCHIVES"}
              </h3>
              <p className="text-[10px] font-mono text-[#64748b]">
                DEVELOPER WORLD ARCHIVES // DAMIANUS SAVIOLA
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              gameAudio.playMenuClick();
              onClose();
            }}
            className="w-8 h-8 bg-[#161e2e] border-2 border-[#2b3952] hover:border-white text-[#94a3b8] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic Body based on location */}
        <div className="space-y-4">
          {/* Academy / Education View */}
          {(type === "academy" || data?.id === "loc_academy") && (
            <div className="space-y-3.5">
              <div className="p-4 bg-[#080c14] border-2 border-[#1e2838]">
                <span className="text-[10px] font-mono font-bold text-[#38bdf8] block mb-1">
                  [ PENDIDIKAN FORMAL SARJANA ]
                </span>
                <h4 className="font-mono font-bold text-base text-white">
                  {GAME_DEVELOPER_DATA.profile.education.university}
                </h4>
                <p className="text-xs text-[#cbd5e1] mt-0.5 font-sans">
                  {GAME_DEVELOPER_DATA.profile.education.degree} ({GAME_DEVELOPER_DATA.profile.education.period})
                </p>
                <div className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-mono font-bold px-2.5 py-1 bg-[#17253d] text-[#38bdf8] border border-[#23416e]">
                  <span>🏆 IPK: {GAME_DEVELOPER_DATA.profile.education.gpa}</span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono font-bold text-[#94a3b8] mb-2">
                  ORGANISASI & PENGALAMAN KAMPUS:
                </h4>
                <div className="space-y-2">
                  <div className="p-3 bg-[#080c14] border border-[#1e2838]">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="font-bold text-white">Amikom Computer Club (AMCC)</span>
                      <span className="text-[10px] text-[#64748b]">2022 — 2025</span>
                    </div>
                    <p className="text-xs text-[#94a3b8] mt-1 font-sans">
                      Divisi Web Development Frontend — Mengikuti lebih dari 10 pelatihan internal dan berkolaborasi dalam proyek web tim.
                    </p>
                  </div>

                  <div className="p-3 bg-[#080c14] border border-[#1e2838]">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="font-bold text-white">Google Developer Groups (GDG) On Campus</span>
                      <span className="text-[10px] text-[#64748b]">2023 — 2025</span>
                    </div>
                    <p className="text-xs text-[#94a3b8] mt-1 font-sans">
                      Peserta aktif dalam 8+ workshop teknologi Google, Next.js, Cloud, dan modern web patterns.
                    </p>
                  </div>

                  <div className="p-3 bg-[#080c14] border border-[#1e2838]">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="font-bold text-white">KOMPARI Babarsari</span>
                      <span className="text-[10px] text-[#64748b]">2023 — 2026</span>
                    </div>
                    <p className="text-xs text-[#94a3b8] mt-1 font-sans">
                      Tim Pengembang Media & Komunikasi — Merancang dan mengelola website profil paroki interaktif.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Achievement Hall View */}
          {(type === "achievements" || data?.id === "loc_achievements") && (
            <div className="space-y-2.5">
              <p className="text-xs text-[#94a3b8] font-sans">
                Daftar rekognisi akademik, sertifikasi pelatihan teknis, dan keterlibatan komunitas developer:
              </p>
              <div className="space-y-2">
                {GAME_DEVELOPER_DATA.achievements.map((ach) => (
                  <div key={ach.id} className="p-3.5 bg-[#080c14] border-2 border-[#1e2838]">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 bg-[#17253d] text-[#38bdf8] border border-[#23416e]">
                          [{ach.badge}]
                        </span>
                        <h4 className="font-mono font-bold text-xs sm:text-sm text-white mt-1">
                          {ach.title}
                        </h4>
                        <p className="text-xs text-[#94a3b8] mt-0.5 font-sans">
                          {ach.description}
                        </p>
                      </div>
                      <div className="text-right shrink-0 text-[10px] font-mono text-[#64748b]">
                        <span>{ach.year}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skill Altar View */}
          {type === "altar" && (
            <div className="space-y-3">
              <p className="text-xs text-[#94a3b8] font-sans">
                Keahlian teknologi pada domain <span className="text-[#38bdf8] font-bold">[{data?.category}]</span>:
              </p>
              <div className="space-y-2">
                {data?.skills?.map((sk: SkillItem) => (
                  <div key={sk.id} className="p-3 bg-[#080c14] border-2 border-[#1e2838]">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-sm text-white">
                        {sk.name}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 bg-[#17253d] text-[#38bdf8] border border-[#23416e]">
                        {sk.proficiencyLevel}
                      </span>
                    </div>
                    <p className="text-xs text-[#cbd5e1] mt-1 font-sans">
                      {sk.description}
                    </p>
                    <p className="text-[11px] text-[#94a3b8] mt-1 font-mono">
                      <span className="text-[#f59e0b]">USE CASE:</span> {sk.concreteUseCases}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Communication Tower View (Contact & CV) */}
          {(type === "tower" || data?.id === "loc_tower") && (
            <div className="space-y-4">
              <div className="p-4 bg-[#080c14] border-2 border-[#1e2838] text-center">
                <span className="text-[10px] font-mono font-bold text-[#10b981] block mb-1">
                  [ BROADCAST SIGNAL READY ]
                </span>
                <h4 className="font-mono font-bold text-base text-white">
                  Hubungi Damianus Saviola Maturbongs
                </h4>
                <p className="text-xs text-[#94a3b8] mt-1 max-w-md mx-auto font-sans">
                  Terbuka untuk peluang kerja sama, project frontend freelance, atau posisi Frontend Developer Full-time.
                </p>

                <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                  <a
                    href="mailto:damimaturbongs@gmail.com"
                    className="px-3.5 py-2 bg-[#1b273b] hover:bg-[#253754] active:translate-y-0.5 border-2 border-[#38bdf8] text-[#38bdf8] hover:text-white font-mono text-xs font-bold flex items-center gap-2 transition-all"
                  >
                    <Mail className="w-4 h-4" />
                    <span>damimaturbongs@gmail.com</span>
                  </a>

                  <a
                    href={GAME_DEVELOPER_DATA.profile.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 bg-[#162030] hover:bg-[#20304a] active:translate-y-0.5 border-2 border-[#2b3d54] text-white font-mono text-xs font-bold flex items-center gap-2 transition-all"
                  >
                    <LinkedinIcon className="w-4 h-4 fill-current" />
                    <span>LinkedIn</span>
                  </a>

                  <a
                    href={GAME_DEVELOPER_DATA.profile.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 bg-[#162030] hover:bg-[#20304a] active:translate-y-0.5 border-2 border-[#2b3d54] text-white font-mono text-xs font-bold flex items-center gap-2 transition-all"
                  >
                    <GithubIcon className="w-4 h-4 fill-current" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
