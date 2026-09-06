"use client";

import { ExternalLink, BookOpen } from "lucide-react";
import { PORTFOLIO_DATA, ComicBook } from "@/lib/data";

export default function ComicsSection() {
  const comics = PORTFOLIO_DATA.comics;

  return (
    <section
      id="comics"
      className="py-16 sm:py-24 md:py-28 px-4 sm:px-8 border-b border-black/[0.05] dark:border-white/[0.06]"
    >
      <div className="max-w-5xl mx-auto">
        {/* Apple Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 pb-8 sm:pb-10 border-b border-black/[0.05] dark:border-white/[0.06]">
          <div>
            <span className="text-xs sm:text-[13px] font-medium text-[#0071e3] dark:text-[#2997ff]">
              Koleksi & Bacaan
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-[#1d1d1f] dark:text-[#f5f5f7] mt-1">
              Top 10 Komik & Novel Grafis.
            </h2>
          </div>
          <div className="flex flex-col sm:items-end gap-1">
            <p className="text-xs sm:text-sm text-[#86868b] max-w-sm">
              Sepuluh karya berpengaruh yang membentuk kecintaan saya pada seni visual sekuensial dan penulisan narasi mendalam.
            </p>
            <span className="text-xs font-medium text-[#86868b] flex items-center gap-1.5 mt-0.5">
              <BookOpen className="w-3.5 h-3.5 text-[#0071e3] dark:text-[#2997ff]" />
              <span>Pilihan Personal</span>
            </span>
          </div>
        </div>

        {/* Editorial Numbered Ledger (Unboxed) */}
        <div className="mt-8 sm:mt-10 divide-y divide-black/[0.06] dark:divide-white/[0.08]">
          {comics.map((comic: ComicBook) => {
            const formattedRank = comic.rank < 10 ? `0${comic.rank}` : `${comic.rank}`;

            return (
              <article
                key={comic.id}
                className="group py-5 sm:py-6 first:pt-4 -mx-3 sm:-mx-4 px-3 sm:px-4 rounded-2xl hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors flex items-start gap-3 sm:gap-5"
              >
                {/* Rank Number */}
                <div className="text-xs sm:text-sm font-mono text-[#0071e3] dark:text-[#2997ff] font-semibold w-6 sm:w-8 shrink-0 pt-0.5 select-none">
                  {formattedRank}
                </div>

                {/* Content Column */}
                <div className="flex-1 min-w-0 space-y-1.5">
                  {/* Top Bar: Title & Actions */}
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-1.5 md:gap-4">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <h3 className="font-heading font-semibold text-base sm:text-lg text-[#1d1d1f] dark:text-[#f5f5f7] group-hover:text-[#0071e3] dark:group-hover:text-[#2997ff] transition-colors leading-snug">
                        {comic.title}
                      </h3>
                      <span className="text-xs text-[#86868b]">
                        ({comic.year})
                      </span>
                    </div>

                    {/* Metadata & Tag */}
                    <div className="flex items-center gap-2 self-start md:self-auto shrink-0 text-xs">
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-black/[0.03] dark:bg-white/[0.06] text-[#86868b]">
                        {comic.publisher}
                      </span>
                      <a
                        href={comic.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-[#0071e3] dark:text-[#2997ff] hover:underline cursor-pointer py-0.5 ml-1"
                      >
                        <span className="hidden sm:inline">Info</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* Creators Line */}
                  <p className="text-xs text-[#86868b] font-medium">
                    Karya: {comic.creator}
                  </p>

                  {/* Synopsis / Commentary */}
                  <p className="text-xs sm:text-[13px] text-[#86868b] leading-relaxed max-w-3xl pt-0.5">
                    {comic.synopsis}
                  </p>

                  {/* Key Quote / Insight */}
                  {comic.quote && (
                    <div className="pt-1 flex items-start gap-2 text-[11px] sm:text-xs text-[#1d1d1f]/80 dark:text-[#f5f5f7]/80 italic">
                      <span className="text-[#0071e3] dark:text-[#2997ff] not-italic font-semibold shrink-0">
                        “
                      </span>
                      <span>{comic.quote}</span>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
