"use client";

import { useState } from "react";
import {
  Send,
  Mail,
  MessageCircle,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import confetti from "canvas-confetti";
import { PORTFOLIO_DATA } from "@/lib/data";
import {
  GithubIcon,
  LinkedinIcon,
} from "./SocialIcons";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#FFD60A", "#3B82F6", "#FF5A5F", "#22C55E", "#EC4899"],
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 5000);
  };

  const socialLinks = [
    { name: "Email", href: `mailto:${PORTFOLIO_DATA.personal.email}`, icon: Mail, color: "#FF5A5F" },
    { name: "GitHub", href: PORTFOLIO_DATA.personal.github, icon: GithubIcon, color: "#111111" },
    { name: "LinkedIn", href: PORTFOLIO_DATA.personal.linkedin, icon: LinkedinIcon, color: "#3B82F6" },
  ];

  return (
    <section id="contact" className="py-16 sm:py-24 px-4 sm:px-8 relative bg-neo-grid">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col items-start gap-2 mb-12">
          <div className="bg-[#FF5A5F] text-white neo-border px-4 py-1 rounded-full font-heading font-black text-sm uppercase shadow-neo flex items-center gap-1.5">
            <Mail className="w-4 h-4" />
            <span>LET'S CONNECT</span>
          </div>

          <h2 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl tracking-tight uppercase text-[#111111] dark:text-white">
            CONTACT <span className="bg-[#FFD60A] text-[#111111] px-3 py-0.5 neo-border shadow-neo inline-block rotate-1">ME</span>
          </h2>
        </div>

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form (Span 7) */}
          <div className="lg:col-span-7 bg-white dark:bg-[#1A1A28] neo-card p-6 sm:p-10 rounded-3xl relative">
            
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-[#22C55E] text-[#111111] neo-border rounded-full flex items-center justify-center mx-auto shadow-neo animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-heading font-black text-3xl text-[#111111] dark:text-white uppercase">
                  PESAN TERKIRIM! 🎉
                </h3>
                <p className="text-base font-bold text-gray-700 dark:text-gray-300 max-w-md mx-auto">
                  Terima kasih! Pesan Anda telah diterima. Saya akan merespons dalam waktu 1x24 jam.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Form Field: Nama */}
                <div className="space-y-2">
                  <label className="font-heading font-black text-sm uppercase text-[#111111] dark:text-white block">
                    NAMA LENGKAP <span className="text-[#FF5A5F]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Alex Rivers"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#FFF9F0] dark:bg-[#111111] text-[#111111] dark:text-white neo-border p-4 rounded-2xl font-bold placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-[#FFD60A]"
                  />
                </div>

                {/* Form Field: Email */}
                <div className="space-y-2">
                  <label className="font-heading font-black text-sm uppercase text-[#111111] dark:text-white block">
                    ALAMAT EMAIL <span className="text-[#FF5A5F]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#FFF9F0] dark:bg-[#111111] text-[#111111] dark:text-white neo-border p-4 rounded-2xl font-bold placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-[#FFD60A]"
                  />
                </div>


                {/* Form Field: Message */}
                <div className="space-y-2">
                  <label className="font-heading font-black text-sm uppercase text-[#111111] dark:text-white block">
                    DETAIL PESAN / PROYEK <span className="text-[#FF5A5F]">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Ceritakan detail proyek, alokasi budget, atau deadline Anda..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#FFF9F0] dark:bg-[#111111] text-[#111111] dark:text-white neo-border p-4 rounded-2xl font-bold placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-[#FFD60A]"
                  />
                </div>

                {/* Big Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#FF5A5F] text-white neo-btn py-4 rounded-2xl font-heading font-black text-lg sm:text-xl flex items-center justify-center gap-3 cursor-pointer group"
                >
                  <Send className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                  <span>KIRIM PESAN SEKARANG</span>
                </button>

              </form>
            )}

          </div>

          {/* Right Column: Direct Contact Info & Socials (Span 5) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Card */}
            <div className="bg-[#FFD60A] text-[#111111] neo-card p-6 sm:p-8 rounded-3xl space-y-4">
              <div className="w-12 h-12 bg-[#111111] text-[#FFD60A] neo-border rounded-2xl flex items-center justify-center font-black">
                <Sparkles className="w-6 h-6" />
              </div>

              <h3 className="font-heading font-black text-3xl uppercase tracking-tight">
                DIRECT CONTACT
              </h3>

              <p className="text-base font-bold leading-relaxed">
                Lebih suka berkomunikasi secara langsung? Hubungi saya melalui email di bawah ini:
              </p>

              <div className="space-y-3 pt-2">
                <a
                  href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                  className="bg-white dark:bg-[#111111] neo-border p-3.5 rounded-2xl font-heading font-extrabold text-sm sm:text-base flex items-center gap-3 shadow-neo hover:translate-x-1 transition-transform text-[#111111] dark:text-white"
                >
                  <Mail className="w-5 h-5 text-[#FF5A5F]" />
                  <span>{PORTFOLIO_DATA.personal.email}</span>
                </a>
              </div>
            </div>

            {/* Social Media Grid */}
            <div className="bg-white dark:bg-[#1A1A28] neo-card p-6 sm:p-8 rounded-3xl space-y-4">
              <h3 className="font-heading font-black text-xl text-[#111111] dark:text-white uppercase">
                SOCIAL MEDIA
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {socialLinks.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="neo-btn p-3 rounded-2xl flex flex-col items-center justify-center gap-1.5 font-heading font-bold text-xs text-[#111111]"
                      style={{
                        backgroundColor: s.color === "#111111" ? "#FFD60A" : s.color,
                        color: s.color === "#3B82F6" || s.color === "#FF5A5F" || s.color === "#EC4899" ? "#FFFFFF" : "#111111"
                      }}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{s.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
