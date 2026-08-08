"use client";

import { useState, useEffect } from "react";
import { Download, Menu, X, Sparkles, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PORTFOLIO_DATA } from "@/lib/data";
import { ThemeToggle } from "@/components/ThemeToggle";

interface NavbarProps {
  onOpenCvModal: () => void;
}

export default function Navbar({ onOpenCvModal }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },

    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 px-3 sm:px-6 py-2.5 sm:py-3 transition-all duration-300">
      <nav
        className={`max-w-7xl mx-auto neo-card bg-[#FFD60A] dark:bg-[#1A1A28] rounded-2xl px-3.5 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between transition-all duration-200 ${
          scrolled ? "neo-shadow-lg scale-[0.99]" : "neo-shadow"
        }`}
      >
        {/* Brand Logo */}
        <a
          href="#hero"
          className="flex items-center group cursor-pointer shrink-0"
        >
          <span className="font-heading font-black text-xl sm:text-2xl tracking-tight lowercase text-[#111111] dark:text-white group-hover:text-[#FF5A5F] dark:group-hover:text-[#FFD60A] transition-colors">
            damisaviola<span className="text-[#FF5A5F]">.</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-heading font-bold text-xs xl:text-sm px-3 py-1.5 rounded-xl border-2 border-transparent hover:border-[#111111] dark:hover:border-white hover:bg-white dark:hover:bg-[#111111] text-[#111111] dark:text-white transition-all shadow-[0px_0px_0px_0px_transparent] hover:shadow-[3px_3px_0px_0px_#111111] dark:hover:shadow-[3px_3px_0px_0px_#ffffff]"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Dark Mode Toggle */}
          <ThemeToggle />

          {/* Download CV */}
          <button
            onClick={onOpenCvModal}
            className="hidden sm:flex items-center gap-2 bg-[#3B82F6] text-white neo-btn px-3.5 py-2 rounded-xl font-heading font-extrabold text-xs sm:text-sm tracking-wide"
          >
            <Download className="w-4 h-4" />
            <span>CV</span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 bg-[#EC4899] text-white neo-btn rounded-xl flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden max-w-7xl mx-auto mt-2.5 neo-card bg-white dark:bg-[#111111] rounded-2xl p-4 sm:p-6 text-[#111111] dark:text-white"
          >
            <div className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-heading font-extrabold text-base px-4 py-2.5 rounded-xl border-3 border-[#111111] dark:border-white bg-[#FFF9F0] dark:bg-[#1A1A28] neo-shadow hover:bg-[#FFD60A] dark:hover:bg-[#FFD60A] dark:hover:text-[#111111] transition-all flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <Terminal className="w-4 h-4 text-[#FF5A5F]" />
                </a>
              ))}

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenCvModal();
                }}
                className="mt-2 w-full flex items-center justify-center gap-2 bg-[#3B82F6] text-white neo-btn px-4 py-3 rounded-xl font-heading font-black text-sm"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD CV</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
