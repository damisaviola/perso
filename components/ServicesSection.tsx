"use client";

import {
  Code2,
  Palette,
  Rocket,
  Building2,
  LayoutDashboard,
  Smartphone,
  Cpu,
  Layers,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { PORTFOLIO_DATA, ServiceItem } from "@/lib/data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code2,
  Palette,
  Rocket,
  Building2,
  LayoutDashboard,
  Smartphone,
  Cpu,
};

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 sm:py-24 px-4 sm:px-8 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col items-start gap-2 mb-12">
          <div className="bg-[#FF9F1C] text-[#111111] neo-border px-4 py-1 rounded-full font-heading font-black text-sm uppercase shadow-neo flex items-center gap-1.5">
            <Layers className="w-4 h-4" />
            <span>WHAT I OFFER</span>
          </div>

          <h2 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl tracking-tight uppercase text-[#111111] dark:text-white">
            SERVICES & <span className="bg-[#22C55E] text-[#111111] px-3 py-0.5 neo-border shadow-neo inline-block rotate-1">SOLUTIONS</span>
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
          {PORTFOLIO_DATA.services.map((service: ServiceItem) => {
            const IconComponent = iconMap[service.iconName] || Code2;
            return (
              <div
                key={service.id}
                className="neo-card neo-card-hover rounded-3xl p-6 sm:p-8 flex flex-col justify-between"
                style={{ backgroundColor: service.color }}
              >
                <div className="space-y-4">
                  {/* Top Bar: Large Icon */}
                  <div className="w-14 h-14 bg-white dark:bg-[#111111] text-[#111111] dark:text-white neo-border rounded-2xl flex items-center justify-center shadow-neo">
                    <IconComponent className="w-7 h-7" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-heading font-black text-2xl text-[#111111] uppercase tracking-tight">
                    {service.title}
                  </h3>

                  <p className="text-sm sm:text-base font-semibold text-[#111111]/90 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Deliverables Checklist */}
                  <div className="space-y-2 pt-2">
                    <div className="font-heading font-extrabold text-xs uppercase text-[#111111]">
                      DELIVERABLES & FEATURES:
                    </div>
                    {service.deliverables.map((item) => (
                      <div
                        key={item}
                        className="bg-white/80 dark:bg-[#111111]/80 neo-border-sm px-3 py-1.5 rounded-xl font-heading font-bold text-xs text-[#111111] dark:text-white flex items-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4 text-[#FF5A5F]" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="mt-8 pt-4 border-t-3 border-[#111111]">
                  <a
                    href="#contact"
                    className="w-full bg-[#111111] text-white neo-btn py-3 px-4 rounded-2xl font-heading font-black text-xs sm:text-sm flex items-center justify-center gap-2 group"
                  >
                    <span>PESAN LAYANAN INI</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
