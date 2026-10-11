"use client";

import { useState } from "react";
import {
  Send,
  Mail,
  CheckCircle2,
  Copy,
  Check,
  ChevronRight,
  Radio,
  Sparkles,
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/lib/data";
import {
  GithubIcon,
  LinkedinIcon,
} from "./SocialIcons";
import { soundFX } from "@/lib/sound";
import { useGame } from "./GameContext";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const { addXp, unlockAchievement } = useGame();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    soundFX.playPowerUp();
    setSubmitted(true);
    addXp(100, "Transmitted Guild Message");
    unlockAchievement("contact_transmit");

    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 6000);
  };

  const copyEmail = (e: React.MouseEvent) => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    soundFX.playCoin();
    setCopied(true);
    addXp(25, "Copied Guild Comm Email", { x: e.clientX, y: e.clientY });
    unlockAchievement("contact_transmit");
    setTimeout(() => setCopied(false), 2000);
  };

  const socialLinks = [
    { name: "GitHub", href: PORTFOLIO_DATA.personal.github, icon: GithubIcon },
    { name: "LinkedIn", href: PORTFOLIO_DATA.personal.linkedin, icon: LinkedinIcon },
    { name: "Email", href: `mailto:${PORTFOLIO_DATA.personal.email}`, icon: Mail },
  ];

  return (
    <section id="contact" className="py-16 sm:py-24 md:py-28 px-4 sm:px-8 border-b border-black/[0.06] dark:border-white/[0.08] relative">
      <div className="max-w-5xl mx-auto">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 pb-8 sm:pb-10 border-b border-black/[0.06] dark:border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20 mb-2">
              <Radio className="w-3 h-3 animate-pulse" />
              <span>GUILD COMM LINK // TRANSMIT FREQUENCY</span>
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-[#0f172a] dark:text-[#f8fafc]">
              Kirim Sinyal & Terhubung
            </h2>
            <p className="text-xs sm:text-sm text-[#64748b] dark:text-[#94a3b8] mt-1.5 max-w-md">
              Punya tawaran proyek web, misi baru, atau sekadar ingin menyapa? Hubungi kanal komunikasi di bawah.
            </p>
          </div>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-8 sm:pt-12 items-start">

          {/* Left Column: Direct Communication (Span 5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#0f172a] dark:text-[#f8fafc]">
                Frekuensi Komunikasi
              </h3>
              <p className="text-xs sm:text-sm text-[#64748b] dark:text-[#94a3b8] leading-relaxed font-sans">
                Terbuka untuk kolaborasi frontend, perancangan web app Next.js/React, atau diskusi seputar game dan kultur digital.
              </p>
            </div>

            {/* Copyable Email Box */}
            <div>
              <label className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 block mb-1.5">
                ALAMAT EMAIL RESMI:
              </label>
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-[#0c1220] border-2 border-black/[0.06] dark:border-cyan-500/30">
                <span className="text-xs sm:text-sm font-mono font-bold text-[#0f172a] dark:text-cyan-300 truncate mr-2">
                  {PORTFOLIO_DATA.personal.email}
                </span>
                <button
                  onClick={copyEmail}
                  onMouseEnter={() => soundFX.playHover()}
                  className="p-2 rounded-xl bg-black/[0.04] dark:bg-white/[0.08] hover:bg-black/[0.08] dark:hover:bg-white/[0.15] transition-colors shrink-0 cursor-pointer"
                  title="Salin alamat email"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-slate-500 dark:text-slate-300" />
                  )}
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-2">
              <label className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 block mb-2">
                SIGNAL RELAYS (SOSIAL):
              </label>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => soundFX.playClick()}
                      onMouseEnter={() => soundFX.playHover()}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-[#0c1220] hover:bg-black/[0.04] dark:hover:bg-[#131d33] border border-black/[0.06] dark:border-white/[0.08] text-xs font-mono font-bold text-[#0f172a] dark:text-slate-200 transition-colors"
                    >
                      <Icon className="w-3.5 h-3.5 text-cyan-500" />
                      <span>{s.name}</span>
                      <ChevronRight className="w-3 h-3 opacity-40" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="py-12 text-center space-y-3 rounded-2xl bg-emerald-500/[0.08] border-2 border-emerald-500/30 p-8">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-heading font-black text-xl text-[#0f172a] dark:text-white">
                  TRANSMISI BERHASIL TERKIRIM!
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-300 max-w-sm mx-auto font-sans">
                  Sinyal pesan kamu telah masuk ke inbox Damianus Saviola. Tanggapan balasan akan segera diproses.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-4 p-5 sm:p-7 rounded-2xl bg-white dark:bg-[#0c1220] border-2 border-black/[0.06] dark:border-white/[0.08]"
              >
                <div>
                  <label className="text-xs font-mono font-bold text-slate-600 dark:text-slate-300 block mb-1.5">
                    NAMA ADVENTURER / PENGIRIM:
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Traveler"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/[0.02] dark:bg-black/30 border border-black/[0.08] dark:border-white/[0.1] text-xs sm:text-sm text-[#0f172a] dark:text-white focus:outline-none focus:border-cyan-500 font-sans"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono font-bold text-slate-600 dark:text-slate-300 block mb-1.5">
                    FREKUENSI BALASAN (EMAIL):
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. alex@guild.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/[0.02] dark:bg-black/30 border border-black/[0.08] dark:border-white/[0.1] text-xs sm:text-sm text-[#0f172a] dark:text-white focus:outline-none focus:border-cyan-500 font-sans"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono font-bold text-slate-600 dark:text-slate-300 block mb-1.5">
                    PESAN MISI / BRIEFING:
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tuliskan ide proyek, penawaran kolaborasi, atau pertanyaan..."
                    className="w-full px-4 py-2.5 rounded-xl bg-black/[0.02] dark:bg-black/30 border border-black/[0.08] dark:border-white/[0.1] text-xs sm:text-sm text-[#0f172a] dark:text-white focus:outline-none focus:border-cyan-500 font-sans resize-none"
                  />
                </div>

                <button
                  type="submit"
                  onMouseEnter={() => soundFX.playHover()}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-mono font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all cursor-pointer active:scale-98"
                >
                  <Send className="w-4 h-4" />
                  <span>TRANSMIT SIGNAL KE DAMIANUS [ENTER]</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
