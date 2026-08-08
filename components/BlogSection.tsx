"use client";

import { BookOpen, Clock, Calendar, ArrowUpRight } from "lucide-react";
import { PORTFOLIO_DATA, BlogPost } from "@/lib/data";

export default function BlogSection() {
  return (
    <section id="blog" className="py-16 sm:py-24 px-4 sm:px-8 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col items-start gap-2 mb-12">
          <div className="bg-[#06B6D4] text-[#111111] neo-border px-4 py-1 rounded-full font-heading font-black text-sm uppercase shadow-neo flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            <span>LATEST INSIGHTS</span>
          </div>

          <h2 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl tracking-tight uppercase text-[#111111] dark:text-white">
            RECENT <span className="bg-[#FF5A5F] text-white px-3 py-0.5 neo-border shadow-neo inline-block rotate-[-1deg]">ARTICLES</span>
          </h2>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PORTFOLIO_DATA.blogs.map((blog: BlogPost) => {
            return (
              <article
                key={blog.id}
                className="bg-white dark:bg-[#1A1A28] neo-card neo-card-hover rounded-3xl p-6 flex flex-col justify-between group cursor-pointer"
              >
                <div className="space-y-4">
                  {/* Top Bar: Topic Badge & Read Time */}
                  <div className="flex items-center justify-between">
                    <span
                      className="font-heading font-black text-xs px-3 py-1 rounded-full neo-border uppercase text-[#111111]"
                      style={{ backgroundColor: blog.color }}
                    >
                      {blog.category}
                    </span>

                    <div className="flex items-center gap-1 text-xs font-bold text-gray-600 dark:text-gray-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{blog.readTime}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading font-black text-xl text-[#111111] dark:text-white group-hover:text-[#3B82F6] transition-colors leading-snug">
                    {blog.title}
                  </h3>

                  {/* Snippet */}
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 line-clamp-3">
                    {blog.snippet}
                  </p>
                </div>

                {/* Footer Bar */}
                <div className="pt-6 mt-6 border-t-3 border-[#111111] dark:border-white flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-600 dark:text-gray-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{blog.date}</span>
                  </div>

                  <span className="font-heading font-black text-xs text-[#111111] dark:text-white flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    READ ARTICLE
                    <ArrowUpRight className="w-4 h-4 text-[#FF5A5F]" />
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
