"use client";

import { ChevronRight, Clock } from "lucide-react";
import { PORTFOLIO_DATA, BlogPost } from "@/lib/data";

export default function BlogSection() {
  return (
    <section id="blog" className="py-20 sm:py-28 px-4 sm:px-8 border-b border-black/[0.05] dark:border-white/[0.06]">
      <div className="max-w-5xl mx-auto">
        
        {/* Apple Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-10 border-b border-black/[0.05] dark:border-white/[0.06]">
          <div>
            <span className="text-xs sm:text-[13px] font-medium text-[#0071e3] dark:text-[#2997ff]">
              Catatan
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#1d1d1f] dark:text-[#f5f5f7] mt-1">
              Tulisan & Artikel.
            </h2>
          </div>
          <p className="text-sm text-[#86868b] max-w-sm">
            Catatan proses belajar, tips seputar web development, dan eksperimen koding.
          </p>
        </div>

        {/* Editorial Writing Ledger (Unboxed) */}
        <div className="mt-8 sm:mt-10 divide-y divide-black/[0.05] dark:divide-white/[0.06]">
          {PORTFOLIO_DATA.blogs.map((blog: BlogPost) => {
            return (
              <article
                key={blog.id}
                className="group py-6 sm:py-7 first:pt-4 -mx-3 sm:-mx-4 px-3 sm:px-4 rounded-2xl hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors cursor-pointer flex flex-col md:flex-row md:items-baseline justify-between gap-3 sm:gap-6"
              >
                {/* Left Col: Date & Category */}
                <div className="md:w-44 shrink-0 flex items-center md:flex-col md:items-start gap-2 md:gap-1 text-xs text-[#86868b]">
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] text-[#1d1d1f] dark:text-[#f5f5f7]">
                    {blog.category}
                  </span>
                  <span className="text-xs text-[#86868b]">
                    {blog.date}
                  </span>
                </div>

                {/* Middle Col: Title & Excerpt */}
                <div className="flex-1 space-y-1.5">
                  <h3 className="font-heading font-semibold text-lg sm:text-xl text-[#1d1d1f] dark:text-[#f5f5f7] group-hover:text-[#0071e3] dark:group-hover:text-[#2997ff] transition-colors leading-snug">
                    {blog.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#86868b] leading-relaxed max-w-2xl">
                    {blog.snippet}
                  </p>
                </div>

                {/* Right Col: Read Time & Action */}
                <div className="md:w-36 shrink-0 flex items-center md:justify-end gap-3 text-xs text-[#86868b] pt-1 md:pt-0">
                  <div className="flex items-center gap-1 opacity-70">
                    <Clock className="w-3 h-3" />
                    <span>{blog.readTime}</span>
                  </div>
                  <span className="font-medium text-[#0071e3] dark:text-[#2997ff] inline-flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                    <span>Baca</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
