"use client";

import { Music, ExternalLink, ChevronRight } from "lucide-react";

export default function SpotifySection() {
  return (
    <section id="spotify" className="py-16 sm:py-24 md:py-28 px-4 sm:px-8 border-b border-black/[0.05] dark:border-white/[0.06]">
      <div className="max-w-5xl mx-auto">
        
        {/* Apple Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 pb-8 sm:pb-10 border-b border-black/[0.05] dark:border-white/[0.06]">
          <div>
            <span className="text-xs sm:text-[13px] font-medium text-[#0071e3] dark:text-[#2997ff]">
              Spotify Playlist
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-[#1d1d1f] dark:text-[#f5f5f7] mt-1">
              Kurasi Musik.
            </h2>
          </div>
          <div className="flex flex-col sm:items-end gap-1">
            <p className="text-xs sm:text-sm text-[#86868b] max-w-sm">
              Playlist pilihan yang menemani aktivitas koding, eksplorasi ide, dan waktu santai.
            </p>
            <a
              href="https://open.spotify.com/playlist/2fMU9es2sX6N89wCIt0vdT"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium text-[#0071e3] dark:text-[#2997ff] hover:underline mt-1"
            >
              <span>Buka Playlist "Uku" di Spotify</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Centered Symmetrical Spotify Container (Unboxed) */}
        <div className="mt-8 sm:mt-10 max-w-3xl mx-auto w-full">
          {/* Player Header Bar */}
          <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-black/[0.04] dark:border-white/[0.06]">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#1DB954]/10 text-[#1DB954] flex items-center justify-center shrink-0">
                <Music className="w-3.5 h-3.5" />
              </div>
              <div className="flex items-baseline gap-2">
                <h3 className="font-heading font-semibold text-xs sm:text-sm text-[#1d1d1f] dark:text-[#f5f5f7]">
                  Playlist: Uku
                </h3>
                <span className="text-[11px] text-[#86868b] hidden sm:inline">
                  • Kurasi oleh damisaviola
                </span>
              </div>
            </div>

            <a
              href="https://open.spotify.com/playlist/2fMU9es2sX6N89wCIt0vdT"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium text-[#1DB954] hover:underline py-1"
            >
              <span>Buka di Spotify</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Responsive Spotify Official Embed Iframe */}
          <div className="w-full overflow-hidden rounded-2xl border border-black/[0.08] dark:border-white/[0.1] shadow-xs">
            <iframe
              data-testid="embed-iframe"
              style={{ borderRadius: "16px" }}
              src="https://open.spotify.com/embed/playlist/2fMU9es2sX6N89wCIt0vdT?utm_source=generator&theme=0&si=9851f99735da4a8e"
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="w-full"
            />
          </div>

          {/* Player Info Note */}
          <div className="mt-3 flex items-center justify-between text-xs text-[#86868b]">
            <span>Dapat diputar langsung di browser</span>
            <span className="text-[11px] opacity-70">Spotify Web Player</span>
          </div>
        </div>

      </div>
    </section>
  );
}
