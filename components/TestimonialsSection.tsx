"use client";

import { MessageSquare, Star, Quote } from "lucide-react";
import { PORTFOLIO_DATA, Testimonial } from "@/lib/data";

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 sm:py-24 px-4 sm:px-8 relative bg-neo-grid">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col items-start gap-2 mb-12">
          <div className="bg-[#EC4899] text-white neo-border px-4 py-1 rounded-full font-heading font-black text-sm uppercase shadow-neo flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4" />
            <span>CLIENT REVIEWS</span>
          </div>

          <h2 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl tracking-tight uppercase text-[#111111] dark:text-white">
            WHAT CLIENTS <span className="bg-[#FFD60A] text-[#111111] px-3 py-0.5 neo-border shadow-neo inline-block rotate-1">SAY</span>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PORTFOLIO_DATA.testimonials.map((item: Testimonial) => {
            return (
              <div
                key={item.id}
                className="neo-card neo-card-hover rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative"
                style={{ backgroundColor: item.color }}
              >
                {/* Quote Icon Bubble */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#111111] text-[#FFD60A] neo-border rounded-2xl flex items-center justify-center shadow-neo">
                  <Quote className="w-6 h-6" />
                </div>

                <div className="space-y-4">
                  {/* Star Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-[#111111] text-[#111111]"
                      />
                    ))}
                  </div>

                  {/* Speech Bubble Quote */}
                  <div className="bg-white dark:bg-[#1A1A28] neo-border p-4 rounded-2xl text-[#111111] dark:text-gray-200 font-medium text-sm sm:text-base leading-relaxed shadow-neo">
                    "{item.quote}"
                  </div>
                </div>

                {/* Client Profile Info */}
                <div className="flex items-center gap-3 pt-6 mt-6 border-t-3 border-[#111111]">
                  <div className="w-12 h-12 rounded-2xl neo-border shadow-neo bg-[#FFD60A] flex items-center justify-center font-heading font-black text-xl text-[#111111] shrink-0">
                    {item.name.charAt(0)}
                  </div>

                  <div>
                    <h4 className="font-heading font-black text-lg text-[#111111]">
                      {item.name}
                    </h4>
                    <p className="text-xs font-extrabold uppercase text-[#111111]/80">
                      {item.role} • {item.company}
                    </p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
