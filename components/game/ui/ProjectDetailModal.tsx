"use client";

import React, { useEffect } from "react";
import { X, ExternalLink, Terminal, CheckCircle2, AlertTriangle, Cpu } from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";
import { ProjectDetail } from "@/lib/game/gameData";
import { gameAudio } from "@/lib/game/gameAudio";

interface ProjectDetailModalProps {
  project: ProjectDetail;
  onClose: () => void;
}

export default function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
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

      {/* Solid Game Dossier Frame */}
      <div className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0d121d] border-4 border-[#334155] p-5 sm:p-8 text-white shadow-[0_12px_40px_rgba(0,0,0,0.95)] my-auto scrollbar-hide">
        {/* Top Header Bar */}
        <div className="flex items-start justify-between gap-3 pb-4 border-b-2 border-[#1f2838] mb-5">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-[#17253d] text-[#38bdf8] border border-[#23416e]">
                [{project.badge}]
              </span>
              <span className="text-xs font-mono text-[#94a3b8]">
                CATEGORY: {project.category.toUpperCase()}
              </span>
            </div>
            <h2 className="font-mono font-bold text-lg sm:text-2xl text-white mt-1.5 uppercase tracking-wide">
              {project.name}
            </h2>
          </div>

          <button
            onClick={() => {
              gameAudio.playMenuClick();
              onClose();
            }}
            className="w-8 h-8 bg-[#161e2e] border-2 border-[#2b3952] hover:border-white text-[#94a3b8] hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
            aria-label="Tutup Detail Proyek"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="space-y-4">
          {/* 1. Ringkasan Proyek */}
          <div className="p-4 bg-[#080c14] border-2 border-[#1e2838]">
            <h4 className="text-xs font-mono font-bold text-[#38bdf8] mb-1.5 flex items-center gap-1.5 uppercase">
              <Terminal className="w-3.5 h-3.5" />
              <span>PROJECT SUMMARY</span>
            </h4>
            <p className="text-xs sm:text-sm text-[#cbd5e1] leading-relaxed font-sans font-medium">
              {project.summary}
            </p>
          </div>

          {/* 2. Masalah & Tujuan */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3.5 bg-[#130d12] border-2 border-[#4c1d28]">
              <h4 className="text-xs font-mono font-bold text-[#f87171] mb-1 flex items-center gap-1.5 uppercase">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>PROBLEM SOLVED</span>
              </h4>
              <p className="text-xs text-[#cbd5e1] leading-relaxed font-sans">
                {project.problem}
              </p>
            </div>

            <div className="p-3.5 bg-[#0c1618] border-2 border-[#134e48]">
              <h4 className="text-xs font-mono font-bold text-[#34d399] mb-1 flex items-center gap-1.5 uppercase">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>PROJECT OBJECTIVES</span>
              </h4>
              <p className="text-xs text-[#cbd5e1] leading-relaxed font-sans">
                {project.objectives}
              </p>
            </div>
          </div>

          {/* 3. Fitur Utama & Peran */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3.5 bg-[#080c14] border-2 border-[#1e2838]">
              <h4 className="text-xs font-mono font-bold text-[#f59e0b] mb-2 uppercase">
                KEY FEATURES
              </h4>
              <ul className="space-y-1.5">
                {project.keyFeatures.map((feat, idx) => (
                  <li key={idx} className="text-xs text-[#cbd5e1] flex items-start gap-2 font-sans">
                    <span className="text-[#f59e0b] font-mono shrink-0">▸</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 bg-[#080c14] border-2 border-[#1e2838]">
              <h4 className="text-xs font-mono font-bold text-[#38bdf8] mb-2 uppercase">
                ROLE & ARCHITECTURE
              </h4>
              <p className="text-xs text-[#cbd5e1] leading-relaxed font-sans mb-2">
                <span className="font-mono text-[#38bdf8] font-bold">KONTRIBUSI:</span> {project.roleAndContribution}
              </p>
              <p className="text-xs text-[#cbd5e1] leading-relaxed font-sans">
                <span className="font-mono text-[#38bdf8] font-bold">ARSITEKTUR:</span> {project.architecture}
              </p>
            </div>
          </div>

          {/* 4. Tech Stack Badges */}
          <div className="p-3.5 bg-[#080c14] border-2 border-[#1e2838]">
            <h4 className="text-xs font-mono font-bold text-[#94a3b8] mb-2 flex items-center gap-1.5 uppercase">
              <Cpu className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span>TECHNOLOGY ARSENAL</span>
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-[#141d2e] border border-[#283852] text-xs font-mono font-bold text-[#38bdf8]"
                >
                  [{tech}]
                </span>
              ))}
            </div>
          </div>

          {/* 5. Action Buttons (Live Demo & Source Code) */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t-2 border-[#1f2838]">
            <div className="text-[11px] font-mono text-[#64748b]">
              DAMIANUS SAVIOLA &bull; {project.id.toUpperCase()}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial px-4 py-2 bg-[#162030] hover:bg-[#20304a] active:translate-y-0.5 border-2 border-[#2f4260] hover:border-white text-white font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all"
                >
                  <GithubIcon className="w-4 h-4 fill-current" />
                  <span>VIEW CODE</span>
                </a>
              )}

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial px-4 py-2 bg-[#1b273b] hover:bg-[#263754] active:translate-y-0.5 border-2 border-[#38bdf8] text-[#38bdf8] hover:text-white font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>OPEN LIVE DEMO</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
