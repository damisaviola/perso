"use client";

import { useState } from "react";
import {
  Send,
  Mail,
  CheckCircle2,
  Copy,
  Check,
  ChevronRight,
} from "lucide-react";
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
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 6000);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialLinks = [
    { name: "GitHub", href: PORTFOLIO_DATA.personal.github, icon: GithubIcon },
    { name: "LinkedIn", href: PORTFOLIO_DATA.personal.linkedin, icon: LinkedinIcon },
    { name: "Email", href: `mailto:${PORTFOLIO_DATA.personal.email}`, icon: Mail },
  ];

  return (
    <section id="contact" className="py-16 sm:py-24 md:py-28 px-4 sm:px-8 border-b border-black/[0.05] dark:border-white/[0.06]">
      <div className="max-w-5xl mx-auto">

        {/* Apple Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 pb-8 sm:pb-10 border-b border-black/[0.05] dark:border-white/[0.06]">
          <div>
            <span className="text-xs sm:text-[13px] font-medium text-[#0071e3] dark:text-[#2997ff]">
              Kontak
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-[#1d1d1f] dark:text-[#f5f5f7] mt-1">
              Mari Terhubung.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#86868b] max-w-sm">
            Punya ide proyek, pertanyaan seputar web, atau sekadar ingin menyapa? Silakan hubungi saya.
          </p>
        </div>

        {/* Unboxed 2-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-8 sm:pt-12 items-start">

          {/* Left Column: Direct Communication (Span 5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-medium text-[#0071e3] dark:text-[#2997ff]">
                Kanal Langsung
              </span>
              <h3 className="font-heading font-semibold text-xl sm:text-2xl text-[#1d1d1f] dark:text-[#f5f5f7]">
                Sapa & Ngobrol.
              </h3>
              <p className="text-xs sm:text-sm text-[#86868b] leading-relaxed">
                Saya selalu terbuka untuk diskusi santai, kolaborasi pembuatan website, atau sekadar bertukar rekomendasi film dan komik.
              </p>
            </div>

            {/* Copyable Email Box */}
            <div>
              <label className="text-xs text-[#86868b] block mb-1.5 font-medium">
                Alamat Email
              </label>
              <div className="flex items-center justify-between p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.1]">
                <span className="text-xs sm:text-sm text-[#1d1d1f] dark:text-[#f5f5f7] font-medium truncate mr-2">
                  {PORTFOLIO_DATA.personal.email}
                </span>
                <button
                  onClick={copyEmail}
                  className="p-1.5 rounded-lg text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7] hover:bg-black/[0.05] dark:hover:bg-white/[0.1] transition-colors shrink-0 cursor-pointer"
                  title="Salin alamat email"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Status Note */}
            <div className="pt-2 text-xs text-[#86868b] space-y-1.5 border-t border-black/[0.04] dark:border-white/[0.06]">
              <div className="flex items-center gap-2 text-[#1d1d1f] dark:text-[#f5f5f7]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="font-medium">Respon dalam 1x24 jam</span>
              </div>
              <p>Berdomisili di Yogyakarta, Indonesia (WIB / UTC+7)</p>
            </div>

            {/* Social Links */}
            <div className="pt-2">
              <label className="text-xs text-[#86868b] block mb-2 font-medium">
                Jejaring Profesional
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
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/[0.03] dark:bg-white/[0.06] hover:bg-black/[0.06] dark:hover:bg-white/[0.1] text-xs font-medium text-[#1d1d1f] dark:text-[#f5f5f7] transition-colors"
                    >
                      <Icon className="w-3.5 h-3.5 text-[#0071e3] dark:text-[#2997ff]" />
                      <span>{s.name}</span>
                      <ChevronRight className="w-3 h-3 opacity-40" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form (Span 7, Unboxed) */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="py-12 text-center space-y-3 rounded-2xl bg-emerald-500/[0.05] border border-emerald-500/20 p-8">
                <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-200 dark:border-emerald-800">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-semibold text-lg sm:text-xl text-[#1d1d1f] dark:text-[#f5f5f7]">
                  Pesan Terkirim
                </h3>
                <p className="text-xs sm:text-sm text-[#86868b] max-w-sm mx-auto">
                  Terima kasih sudah menghubungi. Saya akan membalas pesan Anda secepatnya.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[#86868b] block">
                      Nama
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nama Anda"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-black/[0.08] dark:border-white/[0.1] bg-black/[0.02] dark:bg-white/[0.03] text-base sm:text-sm text-[#1d1d1f] dark:text-[#f5f5f7] placeholder:text-[#86868b] focus:outline-none focus:border-[#0071e3] focus:ring-1 focus:ring-[#0071e3] transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[#86868b] block">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="email@anda.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-black/[0.08] dark:border-white/[0.1] bg-black/[0.02] dark:bg-white/[0.03] text-base sm:text-sm text-[#1d1d1f] dark:text-[#f5f5f7] placeholder:text-[#86868b] focus:outline-none focus:border-[#0071e3] focus:ring-1 focus:ring-[#0071e3] transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#86868b] block">
                    Pesan
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tuliskan pesan atau ide Anda di sini..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-black/[0.08] dark:border-white/[0.1] bg-black/[0.02] dark:bg-white/[0.03] text-base sm:text-sm text-[#1d1d1f] dark:text-[#f5f5f7] placeholder:text-[#86868b] focus:outline-none focus:border-[#0071e3] focus:ring-1 focus:ring-[#0071e3] transition-colors leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#0071e3] text-white text-xs sm:text-sm font-medium hover:bg-[#0077ed] transition-colors cursor-pointer active:scale-98"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim Pesan</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
