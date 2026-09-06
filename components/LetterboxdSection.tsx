"use client";

import { useEffect, useState } from "react";
import { Film, Star, ChevronRight } from "lucide-react";

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
      <div className="flex items-center gap-0.5 text-amber-400">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${i < Math.floor(numStars)
                ? "fill-current"
                : i < numStars
                  ? "fill-current opacity-50"
                  : "text-gray-400/40"
              }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section id="letterboxd" className="py-16 sm:py-24 md:py-28 px-4 sm:px-8 border-b border-black/[0.05] dark:border-white/[0.06]">
      <div className="max-w-5xl mx-auto">

        {/* Apple Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 pb-8 sm:pb-10 border-b border-black/[0.05] dark:border-white/[0.06]">
          <div>
            <span className="text-xs sm:text-[13px] font-medium text-[#0071e3] dark:text-[#2997ff]">
              Letterboxd
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-[#1d1d1f] dark:text-[#f5f5f7] mt-1">
              Film yang Baru Ditonton.
            </h2>
          </div>
          <a
            href="https://letterboxd.com/damisaviola"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-[#0071e3] dark:text-[#2997ff] hover:underline self-start sm:self-auto"
          >
            <span>@damisaviola di Letterboxd</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Content */}
        {error ? (
          <div className="mt-8 py-12 text-center text-xs sm:text-sm text-[#86868b] border border-dashed border-black/[0.1] dark:border-white/[0.1] rounded-2xl">
            Tidak dapat memuat data dari Letterboxd saat ini.
          </div>
        ) : (
          <div className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-[2/3] rounded-xl sm:rounded-2xl bg-black/[0.03] dark:bg-white/[0.05] animate-pulse"
                />
              ))
              : movies.map((movie, index) => (
                <a
                  key={index}
                  href={movie.link}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative rounded-xl sm:rounded-2xl overflow-hidden border border-black/[0.06] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.03] flex flex-col aspect-[2/3] hover:scale-[1.02] active:scale-98 transition-transform duration-300 ease-out"
                >
                  {/* Poster */}
                  <div className="relative flex-1 w-full overflow-hidden">
                    {movie.thumbnail ? (
                      <img
                        src={movie.thumbnail}
                        alt={movie.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        <Film className="w-6 h-6 opacity-30" />
                      </div>
                    )}

                    {/* Apple-style Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2.5 sm:p-3">
                      <h3 className="text-white font-medium text-[11px] sm:text-xs leading-tight mb-0.5 line-clamp-2">
                        {movie.title}
                      </h3>
                      <div className="flex items-center justify-between text-[10px] text-white/70">
                        <span>{movie.year}</span>
                      </div>
                    </div>
                  </div>

                  {/* Rating Pill */}
                  {movie.rating && (
                    <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px]">
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
