"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, Sparkles } from "lucide-react";
import { PORTFOLIO_DATA, FaqItem } from "@/lib/data";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 px-4 sm:px-8 relative bg-neo-lines">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col items-start gap-2 mb-12">
          <div className="bg-[#22C55E] text-[#111111] neo-border px-4 py-1 rounded-full font-heading font-black text-sm uppercase shadow-neo flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4" />
            <span>GOT QUESTIONS?</span>
          </div>

          <h2 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl tracking-tight uppercase text-[#111111] dark:text-white">
            FREQUENTLY ASKED <span className="bg-[#FFD60A] text-[#111111] px-3 py-0.5 neo-border shadow-neo inline-block rotate-1">QUESTIONS</span>
          </h2>
        </div>

        {/* Accordion Stack */}
        <div className="space-y-4">
          {PORTFOLIO_DATA.faqs.map((faq: FaqItem, idx: number) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="neo-card bg-white dark:bg-[#1A1A28] rounded-3xl overflow-hidden transition-all"
              >
                {/* Header button */}
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left font-heading font-black text-lg sm:text-xl text-[#111111] dark:text-white flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-8 h-8 rounded-xl neo-border flex items-center justify-center text-xs shrink-0 text-[#111111]"
                      style={{ backgroundColor: faq.color }}
                    >
                      Q{idx + 1}
                    </span>
                    <span>{faq.question}</span>
                  </div>

                  <div
                    className={`w-10 h-10 rounded-xl neo-btn flex items-center justify-center transition-transform duration-200 shrink-0 ${
                      isOpen ? "bg-[#FF5A5F] text-white rotate-180" : "bg-[#FFD60A] text-[#111111]"
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {/* Collapsible Answer Body */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-6 pt-2 border-t-3 border-[#111111] dark:border-white text-gray-700 dark:text-gray-300 font-medium text-base sm:text-lg leading-relaxed">
                        {faq.answer}
                      </div>
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
