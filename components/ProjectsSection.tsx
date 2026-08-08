"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FolderGit2,
  ExternalLink,
  Sparkles,
  ArrowUpRight,
  Code,
} from "lucide-react";
import { PORTFOLIO_DATA, Project } from "@/lib/data";
import ProjectModal from "./ProjectModal";
import { GithubIcon } from "./SocialIcons";

export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories = ["All", "Web App", "Mobile", "UI/UX", "AI"];

  const filteredProjects =
    selectedCategory === "All"
      ? PORTFOLIO_DATA.projects
      : PORTFOLIO_DATA.projects.filter(
          (p) => p.category === selectedCategory
        );

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "NEW":
        return "bg-[#06B6D4] text-[#111111]";
      case "FEATURED":
        return "bg-[#FFD60A] text-[#111111]";
      case "BEST":
        return "bg-[#EC4899] text-white";
      case "OPEN SOURCE":
        return "bg-[#22C55E] text-[#111111]";
      default:
        return "bg-white dark:bg-[#111111] text-[#111111] dark:text-white";
    }
  };

  return (
    <section id="projects" className="py-16 sm:py-24 px-4 sm:px-8 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-start gap-2 mb-10">
          <div className="bg-[#EC4899] text-white neo-border px-4 py-1 rounded-full font-heading font-black text-sm uppercase shadow-neo flex items-center gap-1.5">
            <FolderGit2 className="w-4 h-4" />
            <span>PORTFOLIO SHOWCASE</span>
          </div>

          <h2 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl tracking-tight uppercase text-[#111111] dark:text-white">
            FEATURED <span className="bg-[#3B82F6] text-white px-3 py-0.5 neo-border shadow-neo inline-block rotate-1">PROJECTS</span>
          </h2>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2.5 mb-10">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`font-heading font-extrabold text-sm sm:text-base px-5 py-2.5 rounded-2xl neo-btn transition-all ${
                  isSelected
                    ? "bg-[#FFD60A] text-[#111111] translate-x-[-2px] translate-y-[-2px] shadow-neo-lg"
                    : "bg-white dark:bg-[#1A1A28] text-[#111111] dark:text-white"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* 3-Column Responsive Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project: Project) => {
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => setActiveProject(project)}
                  className="bg-white dark:bg-[#1A1A28] neo-card neo-card-hover rounded-3xl p-5 flex flex-col justify-between cursor-pointer group relative overflow-hidden"
                >
                  <div>
                    {/* Thumbnail Frame */}
                    <div className="relative aspect-16/10 rounded-2xl overflow-hidden neo-border mb-5 bg-[#FFF9F0]">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Status Tag Badge */}
                      <div className="absolute top-3 left-3">
                        <span
                          className={`font-heading font-black text-xs px-3 py-1 rounded-full neo-border shadow-neo uppercase ${getBadgeColor(
                            project.badge
                          )}`}
                        >
                          {project.badge}
                        </span>
                      </div>

                      {/* Category Tag */}
                      <div className="absolute bottom-3 right-3 bg-[#111111] text-white font-heading font-bold text-xs px-2.5 py-1 rounded-lg neo-border-sm">
                        {project.category}
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-heading font-black text-2xl text-[#111111] dark:text-white uppercase group-hover:text-[#3B82F6] transition-colors flex items-center gap-1">
                          {project.title}
                        </h3>
                        <ArrowUpRight className="w-6 h-6 text-[#111111] dark:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </div>

                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Stack Badges */}
                    <div className="flex flex-wrap gap-1.5 my-4">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="bg-[#FFF9F0] dark:bg-[#111111] text-[#111111] dark:text-white font-heading font-bold text-xs px-2.5 py-1 rounded-lg neo-border-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Buttons Row */}
                  <div className="pt-4 border-t-3 border-[#111111] dark:border-white flex items-center justify-between gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.liveUrl, "_blank");
                      }}
                      className="flex-1 bg-[#22C55E] text-[#111111] neo-btn py-2.5 px-3 rounded-xl font-heading font-black text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>LIVE DEMO</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.githubUrl, "_blank");
                      }}
                      className="bg-white dark:bg-[#111111] text-[#111111] dark:text-white neo-btn p-2 rounded-xl font-heading font-bold cursor-pointer"
                      aria-label="GitHub Repository"
                    >
                      <GithubIcon className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Modal for detail view */}
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />

      </div>
    </section>
  );
}
