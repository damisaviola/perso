"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  ChevronRight,
  FolderGit2,
} from "lucide-react";
import { Project } from "@/lib/data";
import ProjectModal from "./ProjectModal";
import { GithubIcon } from "./SocialIcons";

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

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

  return (
    <section id="projects" className="py-16 sm:py-24 md:py-28 px-4 sm:px-8 border-b border-black/[0.05] dark:border-white/[0.06]">
      <div className="max-w-5xl mx-auto">

        {/* Apple Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 pb-8 sm:pb-10 border-b border-black/[0.05] dark:border-white/[0.06]">
          <div>
            <span className="text-xs sm:text-[13px] font-medium text-[#0071e3] dark:text-[#2997ff]">
              GitHub Showcase
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-[#1d1d1f] dark:text-[#f5f5f7] mt-1">
              Proyek Terbaru.
            </h2>
          </div>
          <div className="flex flex-col sm:items-end gap-1">
            <p className="text-xs sm:text-sm text-[#86868b] max-w-sm">
              Tiga proyek terbaru yang diambil langsung dari repositori GitHub saya.
            </p>
            <a
              href="https://github.com/damisaviola?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium text-[#0071e3] dark:text-[#2997ff] hover:underline mt-1"
            >
              <span>Semua di GitHub</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Editorial Projects Ledger (Unboxed, clean typographic rows) */}
        <div className="mt-8 sm:mt-10 divide-y divide-black/[0.06] dark:divide-white/[0.08]">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="py-7 sm:py-8 first:pt-4 flex flex-col gap-3 animate-pulse"
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
                return (
                  <motion.div
                    key={project.id || idx}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: idx * 0.04 }}
                    onClick={() => setActiveProject(project)}
                    className="group py-6 sm:py-8 first:pt-4 -mx-3 sm:-mx-4 px-3 sm:px-4 rounded-2xl hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors cursor-pointer"
                  >
                    <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 sm:gap-4">
                      {/* Left: Title & Badge */}
                      <div className="flex items-baseline gap-2.5 flex-wrap">
                        <h3 className="font-heading font-semibold text-lg sm:text-xl md:text-2xl text-[#1d1d1f] dark:text-[#f5f5f7] group-hover:text-[#0071e3] dark:group-hover:text-[#2997ff] transition-colors">
                          {project.title}
                        </h3>
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] text-[#86868b]">
                          {project.badge || (idx === 0 ? "Terbaru" : "Repositori")}
                        </span>
                        <span className="text-xs text-[#86868b] hidden sm:inline">
                          • {project.category}
                        </span>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex items-center gap-3 text-xs text-[#86868b] self-start md:self-auto shrink-0">
                        {project.liveUrl && project.liveUrl !== project.githubUrl && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(project.liveUrl, "_blank");
                            }}
                            className="inline-flex items-center gap-1 font-medium text-[#0071e3] dark:text-[#2997ff] hover:underline cursor-pointer py-1"
                          >
                            <span>Live Demo</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                        )}

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(project.githubUrl, "_blank");
                          }}
                          className="inline-flex items-center gap-1 hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7] transition-colors cursor-pointer py-1"
                          title="Lihat source code di GitHub"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Kode</span>
                        </button>

                        <span className="inline-flex items-center gap-0.5 text-[#0071e3] dark:text-[#2997ff] font-medium group-hover:translate-x-0.5 transition-transform">
                          <span>Detail</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="mt-2 text-xs sm:text-sm text-[#86868b] leading-relaxed max-w-3xl">
                      {project.description}
                    </p>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-3.5">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-black/[0.03] dark:bg-white/[0.04] text-[#86868b] border border-black/[0.03] dark:border-white/[0.04]"
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

