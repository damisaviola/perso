"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, FolderGit2 } from "lucide-react";
import { Project } from "@/lib/data";
import { GithubIcon } from "./SocialIcons";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/40 backdrop-blur-xl">
          {/* Backdrop click to close */}
          <div className="fixed inset-0" onClick={onClose} />

          {/* Modal Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#1c1c1e] rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl border border-black/[0.06] dark:border-white/[0.08] my-auto scrollbar-hide"
          >
            {/* Top Bar with Badge & Close */}
            <div className="flex items-center justify-between pb-3.5 sm:pb-4 border-b border-black/[0.05] dark:border-white/[0.06] mb-4 sm:mb-5">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-medium tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-black/[0.04] dark:bg-white/[0.08] text-[#1d1d1f] dark:text-[#f5f5f7]">
                  {project.badge}
                </span>
                <span className="text-xs text-[#86868b]">
                  • {project.category}
                </span>
              </div>

              <button
                onClick={onClose}
                className="w-7 h-7 rounded-full bg-black/[0.05] dark:bg-white/[0.1] text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Content Info */}
            <div className="space-y-4 sm:space-y-5">
              <div className="flex items-start gap-3.5 sm:gap-4">
                <div className="w-12 h-12 rounded-2xl bg-black/[0.04] dark:bg-white/[0.08] border border-black/[0.05] dark:border-white/[0.08] flex items-center justify-center text-[#0071e3] dark:text-[#2997ff] shrink-0 mt-0.5">
                  <FolderGit2 className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-heading font-bold text-xl sm:text-2xl md:text-3xl text-[#1d1d1f] dark:text-[#f5f5f7] tracking-tight leading-tight">
                    {project.title}
                  </h2>
                  <p className="text-xs text-[#86868b] mt-1">
                    Repositori GitHub • {project.category}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#86868b] leading-relaxed">
                {project.longDescription}
              </p>

              {/* Tech Stack Chips */}
              <div className="pt-1 sm:pt-2">
                <span className="text-xs font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] block mb-2">
                  Teknologi:
                </span>
                <div className="flex flex-wrap gap-1 sm:gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] sm:text-xs px-2.5 py-0.5 sm:py-1 rounded-full bg-black/[0.03] dark:bg-white/[0.06] text-[#86868b]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 pt-5 sm:pt-6 border-t border-black/[0.05] dark:border-white/[0.06]">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-[#0071e3] text-white text-xs sm:text-sm font-medium hover:bg-[#0077ed] transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Buka Live Demo</span>
                </a>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-black/[0.05] dark:bg-white/[0.1] text-xs sm:text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-black/[0.08] dark:hover:bg-white/[0.15] transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>Lihat Kode</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
