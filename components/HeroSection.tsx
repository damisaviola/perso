"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Send,
} from "lucide-react";
import confetti from "canvas-confetti";
import { PORTFOLIO_DATA } from "@/lib/data";

export default function HeroSection() {
  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#FFD60A", "#3B82F6", "#FF5A5F", "#22C55E", "#EC4899"],
    });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[80vh] pt-12 sm:pt-16 pb-16 sm:pb-24 px-4 sm:px-8 flex flex-col justify-center items-center text-center overflow-hidden"
    >
      {/* Soft Ambient Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#FFD60A]/15 dark:bg-[#FFD60A]/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Main Centered Container */}
      <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center gap-6 sm:gap-8">

        {/* Big Aesthetic Header Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full"
        >
          <h1 className="font-heading font-black text-[1.75rem] sm:text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.15] sm:leading-[1.05] uppercase text-[#111111] dark:text-white">
            HELLO, I'M{" "}
            <span className="bg-[#FFD60A] text-[#111111] px-2 sm:px-4 py-0.5 sm:py-1 neo-border inline-block rotate-[-1deg] shadow-neo my-1">
              DAMIANUS SAVIOLA
            </span>{" "}
            <span className="text-[#FF5A5F] block sm:inline">MATURBONGS</span>
          </h1>
        </motion.div>

        {/* Description Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-base sm:text-xl font-medium text-gray-700 dark:text-gray-300 max-w-3xl leading-relaxed"
        >
          Portofolio ini menampilkan proyek dan kontribusi saya sebagai pengembang di bidang teknologi dan beberapa kesukaan saya pada bidang komik, film dan game.
        </motion.p>

        {/* Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-2 w-full sm:w-auto"
        >
          <a
            href="#projects"
            onClick={triggerConfetti}
            className="w-full sm:w-auto bg-[#FF5A5F] text-white neo-btn px-8 py-4 rounded-2xl font-heading font-black text-base sm:text-lg flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>VIEW PROJECTS</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </a>

          <a
            href="#contact"
            className="w-full sm:w-auto bg-[#FFD60A] text-[#111111] neo-btn px-8 py-4 rounded-2xl font-heading font-black text-base sm:text-lg flex items-center justify-center gap-2 group"
          >
            <Send className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span>CONTACT ME</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
