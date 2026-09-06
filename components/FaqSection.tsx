"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { PORTFOLIO_DATA, FaqItem } from "@/lib/data";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 px-4 sm:px-8 border-b border-black/[0.05] dark:border-white/[0.06]">
      <div className="max-w-4xl mx-auto">
        
        {/* Apple Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-10 border-b border-black/[0.05] dark:border-white/[0.06]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0071e3] dark:text-[#2997ff]">
              FAQ
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#1d1d1f] dark:text-[#f5f5f7] mt-1">
              Pertanyaan Umum.
            </h2>
          </div>
          <p className="text-sm text-[#86868b] max-w-sm">
            Informasi mengenai proyek, stack teknologi, dan alur kerja sama.
          </p>
        </div>

        {/* Minimal Accordion List */}
        <div className="divide-y divide-black/[0.05] dark:divide-white/[0.06] pt-2">
          {PORTFOLIO_DATA.faqs.map((faq: FaqItem, idx: number) => {
            const isOpen = openIndex === idx;

            return (
              <div key={idx} className="py-5">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left font-heading font-medium text-base sm:text-lg text-[#1d1d1f] dark:text-[#f5f5f7] flex items-center justify-between gap-4 cursor-pointer group py-1"
                >
                  <span className="group-hover:text-[#0071e3] dark:group-hover:text-[#2997ff] transition-colors">
                    {faq.question}
                  </span>

                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-[#86868b] group-hover:text-[#1d1d1f] dark:group-hover:text-[#f5f5f7] shrink-0 transition-colors">
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#0071e3] dark:text-[#2997ff]" : ""
                      }`}
                    />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="pt-2 pb-2 text-sm sm:text-base text-[#86868b] leading-relaxed max-w-3xl">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
