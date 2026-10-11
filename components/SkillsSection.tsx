"use client";

import { useState } from "react";
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
  Shield,
  Sword,
  Wand2,
} from "lucide-react";
import { PORTFOLIO_DATA, Skill } from "@/lib/data";
import { FigmaIcon } from "./SocialIcons";
import { soundFX } from "@/lib/sound";
import { useGame } from "./GameContext";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
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
};

export default function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [inspectedSkill, setInspectedSkill] = useState<Skill | null>(null);
  const { addXp, unlockAchievement } = useGame();

  const categories = [
    { id: "All", label: "ALL GEAR" },
    { id: "Frontend", label: "⚔️ FRONTEND WEAPONS" },
    { id: "Backend", label: "🔮 BACKEND SPELLS" },
    { id: "Database", label: "💾 DATA TOMES" },
    { id: "DevOps", label: "🛡️ DEVOPS RELICS" },
  ];

  const filteredSkills =
    selectedCategory === "All"
      ? PORTFOLIO_DATA.skills
      : PORTFOLIO_DATA.skills.filter(
          (skill) => skill.category === selectedCategory
        );

  const getRarity = (level: number) => {
    if (level >= 90) return { name: "LEGENDARY", color: "#f59e0b", border: "border-amber-500/60 dark:border-amber-400/50", glow: "shadow-[0_0_15px_rgba(245,158,11,0.25)]", tag: "bg-amber-500/20 text-amber-500" };
    if (level >= 85) return { name: "EPIC", color: "#a855f7", border: "border-purple-500/60 dark:border-purple-400/50", glow: "shadow-[0_0_15px_rgba(168,85,247,0.25)]", tag: "bg-purple-500/20 text-purple-400" };
    return { name: "RARE", color: "#38bdf8", border: "border-sky-500/60 dark:border-sky-400/50", glow: "shadow-[0_0_15px_rgba(56,189,248,0.25)]", tag: "bg-sky-500/20 text-sky-400" };
  };

  const handleInspect = (skill: Skill, e: React.MouseEvent) => {
    soundFX.playCoin();
    setInspectedSkill(skill);
    addXp(15, `Inspected ${skill.name}`, { x: e.clientX, y: e.clientY });
    unlockAchievement("inspect_project");
  };

  return (
    <section id="skills" className="py-16 sm:py-24 md:py-28 px-4 sm:px-8 border-b border-black/[0.06] dark:border-white/[0.08] relative">
      <div className="max-w-5xl mx-auto">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 pb-8 sm:pb-10 border-b border-black/[0.06] dark:border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20 mb-2">
              <Sword className="w-3 h-3" />
              <span>CHARACTER LOADOUT & INVENTORY</span>
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-[#0f172a] dark:text-[#f8fafc]">
              Skill Tree & Equipment
            </h2>
            <p className="text-xs sm:text-sm text-[#64748b] dark:text-[#94a3b8] mt-1.5 max-w-md">
              Koleksi senjata kode, spell backend, dan perlengkapan teknis yang telah dikuasai di medan pengembangan web.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08] text-right font-mono text-xs">
              <span className="text-slate-400 text-[10px] block">TOTAL GEAR COUNT</span>
              <span className="font-bold text-cyan-600 dark:text-cyan-400">{PORTFOLIO_DATA.skills.length} SLOTS EQUIPPED</span>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2 mt-8 mb-8">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  soundFX.playClick();
                  setSelectedCategory(cat.id);
                }}
                onMouseEnter={() => soundFX.playHover()}
                className={`font-mono text-xs font-bold px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#0f172a] text-white dark:bg-cyan-500 dark:text-black shadow-md scale-102"
                    : "bg-black/[0.04] dark:bg-white/[0.06] text-slate-600 dark:text-slate-300 hover:bg-black/[0.08] dark:hover:bg-white/[0.1]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Inventory Item Slots Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          <AnimatePresence>
            {filteredSkills.map((skill, idx) => {
              const IconComponent = iconMap[skill.iconName] || Code2;
              const rarity = getRarity(skill.level);

              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.15, delay: idx * 0.02 }}
                  onClick={(e) => handleInspect(skill, e)}
                  onMouseEnter={() => soundFX.playHover()}
                  className={`group relative p-3 sm:p-4 rounded-2xl bg-[#ffffff] dark:bg-[#0c1220] border-2 ${rarity.border} ${rarity.glow} transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer flex flex-col justify-between`}
                >
                  {/* Top: Icon & Rarity Tag */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="w-10 h-10 rounded-xl bg-black/[0.03] dark:bg-white/[0.06] flex items-center justify-center p-2 border border-black/[0.06] dark:border-white/[0.08]">
                      {skill.logo ? (
                        <img
                          src={typeof skill.logo === "string" ? skill.logo : skill.logo.src}
                          alt={skill.name}
                          className="w-full h-full object-contain filter group-hover:scale-110 transition-transform"
                        />
                      ) : (
                        <IconComponent className="w-5 h-5 text-slate-700 dark:text-slate-200" />
                      )}
                    </div>
                    <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${rarity.tag}`}>
                      {rarity.name}
                    </span>
                  </div>

                  {/* Middle: Name & Level */}
                  <div className="mt-3">
                    <h4 className="font-heading font-bold text-sm text-[#0f172a] dark:text-[#f8fafc] group-hover:text-cyan-500 transition-colors">
                      {skill.name}
                    </h4>
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      {skill.category}
                    </span>
                  </div>

                  {/* Bottom: Power Rating Bar */}
                  <div className="mt-3 pt-2.5 border-t border-black/[0.05] dark:border-white/[0.06]">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-slate-400">PWR</span>
                      <span className="font-bold text-slate-700 dark:text-slate-200">{skill.level}/100</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full mt-1 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${skill.level}%`,
                          backgroundColor: rarity.color,
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Selected Skill Item Detail Tooltip Box */}
        <AnimatePresence>
          {inspectedSkill && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-8 p-4 sm:p-5 rounded-2xl bg-cyan-950/20 dark:bg-cyan-950/40 border border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center p-2.5">
                  {inspectedSkill.logo ? (
                    <img
                      src={typeof inspectedSkill.logo === "string" ? inspectedSkill.logo : inspectedSkill.logo.src}
                      alt={inspectedSkill.name}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <Zap className="w-6 h-6 text-cyan-400" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-black text-lg text-white">
                      {inspectedSkill.name}
                    </h3>
                    <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
                      LEVEL {inspectedSkill.level}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-mono mt-0.5">
                    Pengalaman: <span className="text-white font-bold">{inspectedSkill.experience}</span> &bull; Kategori: <span className="text-cyan-300">{inspectedSkill.category}</span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setInspectedSkill(null)}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                TUTUP INSPEKSI &times;
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
