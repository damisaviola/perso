"use client";

import { ArrowUp, Heart } from "lucide-react";
import { PORTFOLIO_DATA } from "@/lib/data";
import {
  GithubIcon,
  LinkedinIcon,
  YoutubeIcon,
  InstagramIcon,
} from "./SocialIcons";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#111111] text-white neo-border-t border-[#111111] pt-12 pb-12 px-4 sm:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Middle Footer Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-2">
          
          <div className="md:col-span-5 space-y-3">
            <div>
              <span className="font-heading font-black text-2xl sm:text-3xl tracking-tight uppercase text-white">
                damisaviola.
              </span>
            </div>

          </div>

          {/* Nav Quick Links */}
          <div className="md:col-span-4 flex flex-wrap gap-4 font-heading font-bold text-sm">
            <a href="#hero" className="hover:text-[#FFD60A] transition-colors">Home</a>
            <a href="#about" className="hover:text-[#FFD60A] transition-colors">About</a>
            <a href="#projects" className="hover:text-[#FFD60A] transition-colors">Projects</a>
            <a href="#experience" className="hover:text-[#FFD60A] transition-colors">Experience</a>
            <a href="#contact" className="hover:text-[#FFD60A] transition-colors">Contact</a>
          </div>

          {/* Social Icons */}
          <div className="md:col-span-3 flex items-center gap-3 justify-start md:justify-end">
            <a href={PORTFOLIO_DATA.personal.github} target="_blank" rel="noreferrer" className="w-10 h-10 bg-white dark:bg-[#1A1A28] text-[#111111] dark:text-white neo-btn rounded-xl flex items-center justify-center">
              <GithubIcon className="w-5 h-5" />
            </a>
            <a href={PORTFOLIO_DATA.personal.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 bg-[#3B82F6] text-white neo-btn rounded-xl flex items-center justify-center">
              <LinkedinIcon className="w-5 h-5" />
            </a>
            <a href={PORTFOLIO_DATA.personal.youtube} target="_blank" rel="noreferrer" className="w-10 h-10 bg-[#FF0000] text-white neo-btn rounded-xl flex items-center justify-center">
              <YoutubeIcon className="w-5 h-5" />
            </a>
            <a href={PORTFOLIO_DATA.personal.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 bg-[#EC4899] text-white neo-btn rounded-xl flex items-center justify-center">
              <InstagramIcon className="w-5 h-5" />
            </a>
          </div>

        </div>

        {/* Bottom Bar & Back to Top */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-heading font-bold text-xs text-gray-400">
          <div className="flex items-center flex-wrap justify-center sm:justify-start gap-1.5 text-center sm:text-left">
            <span>© {new Date().getFullYear()} damsaviola</span>
          </div>

          <button
            onClick={scrollToTop}
            className="bg-[#FFD60A] text-[#111111] neo-btn px-4 py-2 rounded-xl font-heading font-black text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}
