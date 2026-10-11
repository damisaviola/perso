"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  ChevronRight,
  FolderGit2,
  Sword,
  Sparkles,
  Trophy,
} from "lucide-react";
import { Project } from "@/lib/data";
import ProjectModal from "./ProjectModal";
import { GithubIcon } from "./SocialIcons";
import { soundFX } from "@/lib/sound";
import { useGame } from "./GameContext";

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const { addXp, unlockAchievement } = useGame();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        setProjects(data.projects || []);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleOpenProject = (project: Project, e: React.MouseEvent) => {
    soundFX.playCoin();
    setActiveProject(project);
    addXp(30, `Quest Dossier: ${project.title}`, { x: e.clientX, y: e.clientY });
    unlockAchievement("inspect_project");
  };

  return (
    <section id="projects" className="py-16 sm:py-24 md:py-28 px-4 sm:px-8 border-b border-black/[0.06] dark:border-white/[0.08] relative">
      <div className="max-w-5xl mx-auto">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 pb-8 sm:pb-10 border-b border-black/[0.06] dark:border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20 mb-2">
              <Sword className="w-3 h-3" />
              <span>ACTIVE BOUNTY BOARD & COMPLETED MISSIONS</span>
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-[#0f172a] dark:text-[#f8fafc]">
              Bounty Proyek & Ekspedisi
            </h2>
            <p className="text-xs sm:text-sm text-[#64748b] dark:text-[#94a3b8] mt-1.5 max-w-md">
              Koleksi misi aplikasi web yang telah dibangun dan disinkronkan secara langsung dari arsip GitHub.
            </p>
          </div>
          <div className="flex flex-col sm:items-end gap-1">
            <a
              href="https://github.com/damisaviola?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFX.playClick()}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 hover:underline self-start sm:self-auto"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>Semua repositori di GitHub</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Interactive Gaming Bounty Ledger */}
        <div className="mt-8 sm:mt-10 space-y-4">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.06] dark:border-white/[0.06] flex flex-col gap-3 animate-pulse"
              >
                <div className="flex items-center justify-between">
                  <div className="h-6 bg-black/[0.04] dark:bg-white/[0.05] rounded-md w-1/3" />
                  <div className="h-5 bg-black/[0.04] dark:bg-white/[0.05] rounded-full w-20" />
                </div>
                <div className="h-4 bg-black/[0.04] dark:bg-white/[0.05] rounded-md w-3/4" />
                <div className="flex gap-2 mt-2">
                  <div className="h-5 bg-black/[0.04] dark:bg-white/[0.05] rounded-full w-16" />
                  <div className="h-5 bg-black/[0.04] dark:bg-white/[0.05] rounded-full w-14" />
                </div>
              </div>
            ))
          ) : (
            <AnimatePresence>
              {projects.map((project: Project, idx) => {
                const isFeatured = idx === 0 || project.badge === "FEATURED" || project.badge === "BEST";
                return (
                  <motion.div
                    key={project.id || idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: idx * 0.04 }}
                    onClick={(e) => handleOpenProject(project, e)}
                    onMouseEnter={() => soundFX.playHover()}
                    className={`group relative p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0c1220] border-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl cursor-pointer ${
                      isFeatured
                        ? "border-cyan-500/40 dark:border-cyan-500/30 hover:border-cyan-400"
                        : "border-black/[0.06] dark:border-white/[0.08] hover:border-cyan-500/40"
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 sm:gap-4">
                      {/* Left: Title & Badge */}
                      <div className="flex items-baseline gap-2.5 flex-wrap">
                        <span className="font-mono text-xs font-bold text-cyan-600 dark:text-cyan-400">
                          [QUEST #{idx + 1}]
                        </span>
                        <h3 className="font-heading font-black text-lg sm:text-xl md:text-2xl text-[#0f172a] dark:text-[#f8fafc] group-hover:text-cyan-500 transition-colors">
                          {project.title}
                        </h3>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                          {project.badge || "S-RANK"}
                        </span>
                        <span className="text-xs font-mono text-slate-500 dark:text-slate-400 hidden sm:inline">
                          &bull; {project.category}
                        </span>
                      </div>

                      {/* Right: Loot Actions */}
                      <div className="flex items-center gap-3 text-xs font-mono text-slate-500 dark:text-slate-400 self-start md:self-auto shrink-0">
                        {project.liveUrl && project.liveUrl !== project.githubUrl && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              soundFX.playClick();
                              window.open(project.liveUrl, "_blank");
                            }}
                            className="inline-flex items-center gap-1 font-bold text-cyan-600 dark:text-cyan-400 hover:underline cursor-pointer py-1"
                          >
                            <span>LIVE DEMO</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                        )}

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            soundFX.playClick();
                            window.open(project.githubUrl, "_blank");
                          }}
                          className="inline-flex items-center gap-1 hover:text-cyan-500 transition-colors cursor-pointer py-1"
                          title="Lihat source code di GitHub"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">SOURCE</span>
                        </button>

                        <span className="inline-flex items-center gap-1 font-bold text-cyan-600 dark:text-cyan-400 group-hover:translate-x-1 transition-transform">
                          <span>INSPECT</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>

                    {/* Mission Description */}
                    <p className="mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
                      {project.description}
                    </p>

                    {/* Loot Drop: Tech Stack Badges */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-4 pt-3 border-t border-black/[0.04] dark:border-white/[0.05]">
                      <span className="text-[10px] font-mono text-slate-400 mr-1">LOOT DROPS:</span>
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-black/[0.04] dark:bg-white/[0.06] text-slate-700 dark:text-slate-300 border border-black/[0.04] dark:border-white/[0.06]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
        </div>

        {/* Modal for detail view */}
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />

      </div>
    </section>
  );
}
