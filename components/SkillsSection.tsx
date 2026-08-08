"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";


import {
  Code2,
  FileCode,
  Palette,
  Sparkles,
  Zap,
  Server,
  Globe,
  Database,
  Cpu,
  Layers,
  Terminal,
  Cloud,
  Bot,
  Wrench,
} from "lucide-react";
import { PORTFOLIO_DATA, Skill } from "@/lib/data";
import { FigmaIcon } from "./SocialIcons";

const iconMap: Record<string, any> = {
  Code2,
  FileCode,
  Palette,
  Sparkles,
  Zap,
  Server,
  Globe,
  Database,
  Cpu,
  Layers,
  Figma: FigmaIcon,
  Terminal,
  Cloud,
  Bot,
};

export default function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Frontend",
    "Backend",
    "Database",
    "DevOps",
  ];

  const filteredSkills =
    selectedCategory === "All"
      ? PORTFOLIO_DATA.skills
      : PORTFOLIO_DATA.skills.filter(
          (skill) => skill.category === selectedCategory
        );

  return (
    <section id="skills" className="py-16 sm:py-24 px-4 sm:px-8 relative bg-neo-grid">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col items-start gap-2 mb-10">
          <div className="bg-[#3B82F6] text-white neo-border px-4 py-1 rounded-full font-heading font-black text-sm uppercase shadow-neo flex items-center gap-1.5">
            <Wrench className="w-4 h-4" />
            <span>MY TECH ARSENAL</span>
          </div>

          <h2 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl tracking-tight uppercase text-[#111111] dark:text-white">
            SKILLS
          </h2>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2.5 mb-10">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`font-heading font-extrabold text-sm sm:text-base px-4 py-2 rounded-2xl neo-btn transition-all ${
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

        {/* Skills Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredSkills.map((skill: Skill) => {
              const IconComponent = iconMap[skill.iconName] || Code2;
              return (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="neo-card neo-card-hover rounded-3xl p-5 flex flex-col justify-between"
                  style={{ backgroundColor: skill.color }}
                >
                  <div className="space-y-4">
                    {/* Top Row: Icon & Category Badge */}
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 bg-white dark:bg-[#111111] text-[#111111] dark:text-white neo-border rounded-2xl flex items-center justify-center shadow-neo">
                        {skill.logo ? (
                          <motion.div
                            whileHover={{ scale: 1.2, rotate: [0, -10, 10, -10, 0] }}
                            transition={{ duration: 0.5 }}
                            className="w-8 h-8 relative flex items-center justify-center"
                          >
                            <img
                              src={typeof skill.logo === 'string' ? skill.logo : skill.logo.src}
                              alt={skill.name}
                              className="w-8 h-8 object-contain drop-shadow-sm"
                            />
                          </motion.div>
                        ) : (
                          <IconComponent className="w-6 h-6" />
                        )}
                      </div>
                      <span className="bg-[#111111] text-white font-heading font-bold text-xs px-3 py-1 rounded-full neo-border-sm">
                        {skill.experience}
                      </span>
                    </div>

                    {/* Skill Title & Category */}
                    <div>
                      <h3 className="font-heading font-black text-xl text-[#111111] tracking-tight">
                        {skill.name}
                      </h3>
                      <span className="text-xs font-extrabold uppercase text-[#111111]/80">
                        {skill.category}
                      </span>
                    </div>
                  </div>

                  {/* Level Progress Bar */}
                  <div className="mt-6 pt-4 border-t-3 border-[#111111]">
                    <div className="flex items-center justify-between font-heading font-black text-xs text-[#111111] mb-1.5">
                      <span>PROFICIENCY</span>
                      <span>{skill.level}%</span>
                    </div>

                    <div className="w-full h-4 bg-white dark:bg-[#1A1A28] neo-border-sm rounded-full overflow-hidden p-0.5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full bg-[#111111] rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Core Tech Stack Summary */}
        <div className="mt-12 bg-[#FFD60A] neo-card rounded-3xl p-6 sm:p-8 border-4 border-[#111111] shadow-neo-xl">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-8 h-8 text-[#111111]" />
            <h3 className="font-heading font-black text-2xl sm:text-3xl text-[#111111] uppercase tracking-tight">
              Tech Stack Inti
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-white dark:bg-[#1A1A28] p-5 rounded-2xl neo-border-sm shadow-neo flex flex-col justify-between">
              <div>
                <h4 className="font-heading font-black text-lg text-[#3B82F6] uppercase mb-2">Frontend</h4>
                <p className="font-medium text-gray-800 dark:text-gray-300 mb-4">HTML, CSS, JavaScript (React, Next.js, Tailwind CSS, Bootstrap).</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <img src="/assets/logo/html logo.png" alt="HTML" className="w-8 h-8 object-contain drop-shadow-sm" title="HTML" />
                <img src="/assets/logo/javascript.webp" alt="JavaScript" className="w-8 h-8 object-contain drop-shadow-sm" title="JavaScript" />
                <img src="/assets/logo/typescript.webp" alt="TypeScript" className="w-8 h-8 object-contain drop-shadow-sm" title="TypeScript" />
                <img src="/assets/logo/reactjs.webp" alt="React" className="w-8 h-8 object-contain drop-shadow-sm" title="React" />
                <img src="/assets/logo/next_js_145038.webp" alt="Next.js" className="w-8 h-8 object-contain drop-shadow-sm" title="Next.js" />
              </div>
            </div>
            
            <div className="bg-white dark:bg-[#1A1A28] p-5 rounded-2xl neo-border-sm shadow-neo flex flex-col justify-between">
              <div>
                <h4 className="font-heading font-black text-lg text-[#FF5A5F] uppercase mb-2">Backend</h4>
                <p className="font-medium text-gray-800 dark:text-gray-300 mb-4">PHP (Laravel, CodeIgniter), Golang, RESTful API.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <img src="/assets/logo/PHP-logo.svg.webp" alt="PHP" className="w-8 h-8 object-contain drop-shadow-sm" title="PHP" />
                <img src="/assets/logo/Laravel.svg.webp" alt="Laravel" className="w-8 h-8 object-contain drop-shadow-sm" title="Laravel" />
                <img src="/assets/logo/codeigniter_plain_logo_icon_146591.webp" alt="CodeIgniter" className="w-8 h-8 object-contain drop-shadow-sm" title="CodeIgniter" />
                <img src="/assets/logo/Go-Logo_LightBlue.png" alt="Golang" className="w-8 h-8 object-contain drop-shadow-sm" title="Golang" />
              </div>
            </div>

            <div className="bg-white dark:bg-[#1A1A28] p-5 rounded-2xl neo-border-sm shadow-neo flex flex-col justify-between">
              <div>
                <h4 className="font-heading font-black text-lg text-[#22C55E] uppercase mb-2">Database</h4>
                <p className="font-medium text-gray-800 dark:text-gray-300 mb-4">MySQL (Normalisasi, Query Optimization), Firebase, Supabase.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <img src="/assets/logo/mysql.webp" alt="MySQL" className="w-8 h-8 object-contain drop-shadow-sm" title="MySQL" />
                <img src="/assets/logo/supabase.webp" alt="Supabase" className="w-8 h-8 object-contain drop-shadow-sm" title="Supabase" />
                <img src="/assets/logo/postgresql.webp" alt="PostgreSQL" className="w-8 h-8 object-contain drop-shadow-sm" title="PostgreSQL" />
              </div>
            </div>

            <div className="bg-white dark:bg-[#1A1A28] p-5 rounded-2xl neo-border-sm shadow-neo flex flex-col justify-between">
              <div>
                <h4 className="font-heading font-black text-lg text-[#EC4899] uppercase mb-2">Metodologi</h4>
                <p className="font-medium text-gray-800 dark:text-gray-300 mb-4">Clean Code, SDLC, Git Version Control.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <img src="/assets/logo/docker.png" alt="Docker" className="w-8 h-8 object-contain drop-shadow-sm" title="Docker" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
