"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";

import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import BlogSection from "@/components/BlogSection";
import FaqSection from "@/components/FaqSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import StickerPlayground from "@/components/StickerPlayground";
import CvModal from "@/components/CvModal";
import GithubSection from "@/components/GithubSection";
import LetterboxdSection from "@/components/LetterboxdSection";

export default function Home() {
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);

  return (
    <main className="min-h-screen relative overflow-x-hidden selection:bg-[#FFD60A] selection:text-[#111111]">
      {/* Sticky Header Navbar */}
      <Navbar onOpenCvModal={() => setIsCvModalOpen(true)} />

      {/* Hero Section */}
      <HeroSection />

      {/* About Me Section */}
      <AboutSection />


      {/* Projects Showcase */}
      <ProjectsSection />

      {/* Github Contributions */}
      <GithubSection />

      {/* Letterboxd Recent Watches */}
      <LetterboxdSection />

      {/* Experience Timeline */}
      <ExperienceSection />

      {/* Articles & Insights */}
      <BlogSection />

      {/* FAQ Accordions */}
      <FaqSection />

      {/* Interactive Sticker Board */}
      <StickerPlayground />

      {/* Contact Form & Socials */}
      <ContactSection />

      {/* Footer & Back to Top */}
      <Footer />

      {/* Curriculum Vitae Modal */}
      <CvModal
        isOpen={isCvModalOpen}
        onClose={() => setIsCvModalOpen(false)}
      />
    </main>
  );
}
