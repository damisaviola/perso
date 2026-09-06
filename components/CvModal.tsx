"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, MapPin } from "lucide-react";
import { PORTFOLIO_DATA } from "@/lib/data";

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CvModal({ isOpen, onClose }: CvModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/40 backdrop-blur-xl">
          <div className="fixed inset-0" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 w-full max-w-2xl bg-white dark:bg-[#1c1c1e] rounded-3xl p-6 sm:p-8 shadow-2xl border border-black/[0.06] dark:border-white/[0.08] overflow-hidden my-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-black/[0.05] dark:border-white/[0.06] mb-5">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#0071e3] dark:text-[#2997ff]">
                  Dokumen
                </span>
                <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#1d1d1f] dark:text-[#f5f5f7]">
                  Curriculum Vitae.
                </h2>
              </div>

              <button
                onClick={onClose}
                className="w-7 h-7 rounded-full bg-black/[0.05] dark:bg-white/[0.1] text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* CV Content Preview */}
            <div className="space-y-5 max-h-[55vh] overflow-y-auto pr-2 scrollbar-hide">
              {/* Header info */}
              <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.06] space-y-1">
                <h3 className="font-heading font-semibold text-base sm:text-lg text-[#1d1d1f] dark:text-[#f5f5f7]">
                  {PORTFOLIO_DATA.personal.name}
                </h3>
                <p className="text-xs text-[#0071e3] dark:text-[#2997ff] font-medium">
                  Web Developer
                </p>
                <div className="flex flex-wrap gap-3 text-xs text-[#86868b] pt-1">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5" />
                    {PORTFOLIO_DATA.personal.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {PORTFOLIO_DATA.personal.location}
                  </span>
                </div>
              </div>

              {/* Work history summary */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#86868b]">
                  Riwayat Pengalaman
                </h4>
                {PORTFOLIO_DATA.experiences.map((exp) => (
                  <div key={exp.id} className="border-l-2 border-[#0071e3] dark:border-[#2997ff] pl-3 py-0.5 space-y-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between text-xs sm:text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7]">
                      <span>{exp.role} — {exp.company}</span>
                      <span className="text-xs text-[#86868b]">{exp.period}</span>
                    </div>
                    <p className="text-xs text-[#86868b] leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Education & Certification */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#86868b]">
                  Pendidikan
                </h4>
                <div className="p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.06] text-xs text-[#1d1d1f] dark:text-[#f5f5f7]">
                  <span className="font-semibold">Universitas Amikom Yogyakarta (2022 — 2026)</span>
                  <span className="block mt-0.5 text-[#86868b]">S1 Sistem Informasi (Digital Bisnis) — IPK 3.88/4.00</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
