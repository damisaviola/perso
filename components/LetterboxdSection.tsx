"use client";

import { useEffect, useState } from "react";
import { Film, Star, ExternalLink } from "lucide-react";

interface Movie {
  title: string;
  year: string;
  rating: string;
  link: string;
  thumbnail: string | null;
  pubDate: string;
}

export default function LetterboxdSection() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch("/api/letterboxd");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setMovies(data.movies || []);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const renderStars = (ratingStr: string) => {
    if (!ratingStr) return null;
    const numStars = parseFloat(ratingStr);
    if (isNaN(numStars)) return null;

    return (
      <div className="flex items-center gap-0.5 text-[#FFD60A]">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(numStars)
                ? "fill-current"
                : i < numStars
                ? "fill-current opacity-50"
                : "text-gray-300 dark:text-gray-600"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section id="letterboxd" className="py-12 sm:py-24 px-3 sm:px-8 relative bg-neo-grid">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col items-start gap-2 mb-8 sm:mb-12">
          <div className="bg-[#EC4899] text-white neo-border px-3.5 py-1 rounded-full font-heading font-black text-xs sm:text-sm uppercase shadow-neo flex items-center gap-1.5">
            <Film className="w-4 h-4" />
            <span>LETTERBOXD</span>
          </div>

          <h2 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl tracking-tight uppercase text-[#111111] dark:text-white flex items-center gap-4 flex-wrap">
            RECENT <span className="bg-[#FFD60A] text-[#111111] px-2.5 py-0.5 neo-border shadow-neo inline-block rotate-[-2deg]">WATCHES</span>
          </h2>
        </div>

        {/* Content */}
        {error ? (
          <div className="bg-white dark:bg-[#1A1A28] neo-card rounded-3xl p-6 sm:p-10 border-3 border-[#111111] dark:border-white shadow-neo text-center font-bold text-gray-500">
            Gagal memuat data dari Letterboxd.
          </div>
        ) : (
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 sm:gap-6 pb-6 -mx-3 px-3 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 lg:grid-cols-6 scrollbar-hide">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="w-[160px] sm:w-full shrink-0 snap-center bg-gray-200 dark:bg-gray-800 animate-pulse neo-card rounded-2xl aspect-[2/3] border-3 border-[#111111] dark:border-white shadow-neo"></div>
                ))
              : movies.map((movie, index) => (
                  <a
                    key={index}
                    href={movie.link}
                    target="_blank"
                    rel="noreferrer"
                    className="w-[160px] sm:w-full shrink-0 snap-center group relative bg-white dark:bg-[#1A1A28] neo-card rounded-2xl overflow-hidden border-3 border-[#111111] dark:border-white shadow-neo hover:translate-x-1 hover:-translate-y-1 transition-transform flex flex-col aspect-[2/3]"
                  >
                    {/* Poster */}
                    <div className="relative flex-1 bg-gray-100 dark:bg-gray-900 w-full overflow-hidden">
                      {movie.thumbnail ? (
                        <img
                          src={movie.thumbnail}
                          alt={movie.title}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                          <Film className="w-8 h-8 opacity-50" />
                        </div>
                      )}
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                        <div className="translate-y-4 group-hover:translate-y-0 transition-transform">
                          <h3 className="text-white font-heading font-bold text-sm sm:text-base leading-tight mb-1 line-clamp-2">
                            {movie.title}
                          </h3>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-300 text-xs font-bold">{movie.year}</span>
                            <ExternalLink className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Rating Bar (if any) */}
                    {movie.rating && (
                      <div className="absolute top-2 right-2 bg-[#111111]/90 backdrop-blur-sm neo-border px-2 py-1 rounded-lg">
                        {renderStars(movie.rating)}
                      </div>
                    )}
                  </a>
                ))}
          </div>
        )}
      </div>
    </section>
  );
}
