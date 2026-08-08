"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Download, FileText, Mail, MapPin } from "lucide-react";
import { PORTFOLIO_DATA } from "@/lib/data";

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CvModal({ isOpen, onClose }: CvModalProps) {
  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([
      `DAMIANUS SAVIOLA MATURBONGS - CURRICULUM VITAE
Role: Creative Frontend Developer & UI Engineer
Experience: ${PORTFOLIO_DATA.personal.experienceYears}
Email: ${PORTFOLIO_DATA.personal.email}

SUMMARY:
${PORTFOLIO_DATA.personal.bio}

SKILLS:
- ${PORTFOLIO_DATA.skills.map(s => s.name).join(", ")}

EXPERIENCE:
${PORTFOLIO_DATA.experiences.map(e => `${e.role} at ${e.company} (${e.period})`).join("\n")}
    `], { type: 'text/plain' });

    element.href = URL.createObjectURL(file);
    element.download = "Damianus_Saviola_Maturbongs_CV.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs">
          <div className="fixed inset-0" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative z-10 w-full max-w-2xl neo-card bg-white dark:bg-[#1A1A28] rounded-3xl p-5 sm:p-8 shadow-neo-xl overflow-hidden my-4 sm:my-8"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3.5 border-b-3 border-[#111111] dark:border-white mb-5">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#FFD60A] neo-border rounded-xl flex items-center justify-center text-[#111111] shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <h2 className="font-heading font-black text-xl sm:text-2xl text-[#111111] dark:text-white uppercase">
                  CURRICULUM VITAE
                </h2>
              </div>

              <button
                onClick={onClose}
                className="w-9 h-9 sm:w-10 sm:h-10 bg-[#FF5A5F] text-white neo-btn rounded-xl flex items-center justify-center cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* CV Content Preview */}
            <div className="space-y-5 max-h-[58vh] overflow-y-auto pr-1">
              {/* Header info */}
              <div className="bg-[#FFF9F0] dark:bg-[#111111] neo-border p-4 rounded-2xl space-y-2">
                <h3 className="font-heading font-black text-lg sm:text-xl text-[#111111] dark:text-white">
                  {PORTFOLIO_DATA.personal.name}
                </h3>
                <p className="text-xs sm:text-sm font-bold text-[#FF5A5F]">
                  Creative Frontend Developer • UI Engineer
                </p>
                <div className="flex flex-wrap gap-3 text-xs font-bold text-gray-700 dark:text-gray-300 pt-1">
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
                <h4 className="font-heading font-black text-xs sm:text-sm text-[#111111] dark:text-white uppercase">
                  PENGALAMAN KERJA UTAMA
                </h4>
                {PORTFOLIO_DATA.experiences.map((exp) => (
                  <div key={exp.id} className="border-l-3 border-[#FFD60A] pl-3 py-1 space-y-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between text-xs sm:text-sm font-heading font-bold text-[#111111] dark:text-white">
                      <span>{exp.role} — {exp.company}</span>
                      <span className="text-[11px] text-gray-500">{exp.period}</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Education & Certification */}
              <div className="space-y-2">
                <h4 className="font-heading font-black text-xs sm:text-sm text-[#111111] dark:text-white uppercase">
                  PENDIDIKAN & SERTIFIKASI
                </h4>
                <div className="bg-white dark:bg-[#111111] neo-border-sm p-3 rounded-xl text-xs font-bold text-gray-800 dark:text-gray-200">
                  🎓 Universitas Amikom Yogyakarta (2022 - 2026)
                  <span className="block mt-1 font-medium text-gray-600 dark:text-gray-400">S1 Sistem Informasi (Digital Bisnis) - IPK 3.88/4.00</span>
                </div>
                <div className="bg-white dark:bg-[#111111] neo-border-sm p-3 rounded-xl text-xs font-bold text-gray-800 dark:text-gray-200">
                  📜 Sertifikasi Pelatihan Frontend Web Development (Internal)
                </div>
              </div>
            </div>

            {/* Footer download action */}
            <div className="pt-5 border-t-3 border-[#111111] dark:border-white mt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-[11px] font-bold text-gray-500">
                Format file: TXT / PDF Ready
              </span>

              <button
                onClick={handleDownload}
                className="w-full sm:w-auto bg-[#3B82F6] text-white neo-btn px-5 py-2.5 rounded-2xl font-heading font-black text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD RESUME (CV)</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
