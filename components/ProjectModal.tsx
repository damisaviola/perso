"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, FolderGit2, ShieldAlert, Sparkles, Terminal } from "lucide-react";
import { Project } from "@/lib/data";
import { GithubIcon } from "./SocialIcons";
import { soundFX } from "@/lib/sound";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-md">
          {/* Backdrop click to close */}
          <div
            className="fixed inset-0"
            onClick={() => {
              soundFX.playClick();
              onClose();
            }}
          />

          {/* Modal Window styled like Mission Briefing Dossier */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#090d16] text-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-[0_0_50px_rgba(6,182,212,0.3)] border-2 border-cyan-500/40 my-auto scrollbar-hide"
          >
            {/* Top Bar with Badge & Close */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {project.badge || "MISSION COMPLETE"}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  &bull; {project.category}
                </span>
              </div>

              <button
                onClick={() => {
                  soundFX.playClick();
                  onClose();
                }}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Info */}
            <div className="space-y-4 sm:space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                  <Terminal className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-heading font-black text-xl sm:text-2xl md:text-3xl text-white tracking-tight leading-tight">
                    {project.title}
                  </h2>
                  <p className="text-xs font-mono text-cyan-400 mt-1">
                    QUEST RECORD // {project.category}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {project.longDescription || project.description}
              </p>

              {/* Tech Stack Chips */}
              <div className="pt-2">
                <span className="text-xs font-mono font-bold text-slate-300 block mb-2">
                  LOOT & ARSENAL TEKNOLOGI:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono font-medium px-2.5 py-1 rounded-lg bg-cyan-950/40 border border-cyan-800/40 text-cyan-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
                {project.liveUrl && project.liveUrl !== project.githubUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundFX.playClick()}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-mono text-xs font-bold transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer active:scale-95"
                  >
                    <span>LUNCURKAN LIVE DEMO</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFX.playClick()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-mono text-xs font-bold transition-colors cursor-pointer active:scale-95"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>PERIKSA KODE GITHUB</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
