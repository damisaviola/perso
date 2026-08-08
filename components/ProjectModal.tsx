"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Sparkles, CheckCircle2, Code2 } from "lucide-react";
import { Project } from "@/lib/data";
import confetti from "canvas-confetti";
import { GithubIcon } from "./SocialIcons";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  const handleLiveDemoClick = (url: string) => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.5 },
    });
    window.open(url, "_blank");
  };

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs">
          {/* Backdrop click to close */}
          <div className="fixed inset-0" onClick={onClose} />

          {/* Modal Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25 }}
            className="relative z-10 w-full max-w-3xl neo-card bg-white dark:bg-[#1A1A28] rounded-3xl p-6 sm:p-8 shadow-neo-xl overflow-hidden my-4 sm:my-8"
          >
            {/* Top Bar with Badge & Close */}
            <div className="flex items-center justify-between pb-4 border-b-3 border-[#111111] dark:border-white mb-6">
              <span
                className="font-heading font-black text-xs sm:text-sm px-3 py-1 rounded-full neo-border shadow-neo uppercase"
                style={{ backgroundColor: project.bgColor, color: "#111111" }}
              >
                {project.badge} ★ {project.category}
              </span>

              <button
                onClick={onClose}
                className="w-10 h-10 bg-[#FF5A5F] text-white neo-btn rounded-xl flex items-center justify-center"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Project Image Frame */}
            <div className="relative aspect-16/9 rounded-2xl overflow-hidden neo-border mb-6">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Info */}
            <div className="space-y-4">
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#111111] dark:text-white uppercase">
                {project.title}
              </h2>

              <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
                {project.longDescription}
              </p>

              {/* Tech Stack Chips */}
              <div>
                <h4 className="font-heading font-bold text-sm text-[#111111] dark:text-white mb-2 flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-[#3B82F6]" />
                  TEKNOLOGI YANG DIGUNAKAN:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="bg-[#FFF9F0] dark:bg-[#111111] text-[#111111] dark:text-white font-heading font-bold text-xs px-3 py-1 rounded-xl neo-border-sm"
                    >
                      #{tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4 border-t-3 border-[#111111] dark:border-white">
                <button
                  onClick={() => handleLiveDemoClick(project.liveUrl)}
                  className="bg-[#22C55E] text-[#111111] neo-btn px-6 py-3 rounded-2xl font-heading font-black text-sm sm:text-base flex items-center gap-2 cursor-pointer"
                >
                  <ExternalLink className="w-5 h-5" />
                  <span>LIVE DEMO</span>
                </button>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white dark:bg-[#111111] text-[#111111] dark:text-white neo-btn px-6 py-3 rounded-2xl font-heading font-black text-sm sm:text-base flex items-center gap-2"
                >
                  <GithubIcon className="w-5 h-5" />
                  <span>GITHUB REPO</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
