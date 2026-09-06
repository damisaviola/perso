"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import GithubSection from "@/components/GithubSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";

import LetterboxdSection from "@/components/LetterboxdSection";
import ComicsSection from "@/components/ComicsSection";
import SteamSection from "@/components/SteamSection";
import SpotifySection from "@/components/SpotifySection";
import BlogSection from "@/components/BlogSection";
import StickerPlayground from "@/components/StickerPlayground";
import Footer from "@/components/Footer";

export default function Home() {
  const [activeMode, setActiveMode] = useState<"work" | "hobbies">("work");

  // Sync mode with URL hash if visitor navigates via direct hash link
  useEffect(() => {
    const handleHashSync = () => {
      const hash = window.location.hash;
      if (["#letterboxd", "#comics", "#steam", "#spotify", "#blog", "#canvas"].includes(hash)) {
        setActiveMode("hobbies");
      } else if (["#projects", "#github", "#experience", "#contact"].includes(hash)) {
        setActiveMode("work");
      }
    };

    handleHashSync();
    window.addEventListener("hashchange", handleHashSync);
    return () => window.removeEventListener("hashchange", handleHashSync);
  }, []);

  return (
    <main className="min-h-screen relative overflow-x-hidden">
      {/* Sticky Apple Header Navbar */}
      <Navbar activeMode={activeMode} onSelectMode={setActiveMode} />

      {/* Hero Section with Dual Mode Apple Segmented Control */}
      <HeroSection activeMode={activeMode} onSelectMode={setActiveMode} />

      {/* Dual Mode Landing Page Content */}
      <AnimatePresence mode="wait">
        {activeMode === "work" ? (
          <motion.div
            key="work-mode-content"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Projects Showcase (Imageless developer cards) */}
            <ProjectsSection />

            {/* GitHub Contributions Activity */}
            <GithubSection />

            {/* Professional Experience & Education */}
            <ExperienceSection />

            {/* Contact & Inquiries */}
            <ContactSection />
          </motion.div>
        ) : (
          <motion.div
            key="hobbies-mode-content"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Letterboxd Recent Watches */}
            <LetterboxdSection />

            {/* Top 10 Comics & Graphic Novels */}
            <ComicsSection />

            {/* Steam Profile & Games Activity */}
            <SteamSection />

            {/* Spotify Playlist & Listening Activity */}
            <SpotifySection />

            {/* Articles, Reading & Notes */}
            <BlogSection />

            {/* Interactive Visitor Stamp Canvas */}
            <StickerPlayground />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer & Back to Top */}
      <Footer activeMode={activeMode} onSelectMode={setActiveMode} />
    </main>
  );
}
