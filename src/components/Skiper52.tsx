<<<<<<< HEAD
"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { cn } from "@/lib/utils";

export interface SkiperImage {
  src: string;
  alt: string;
  code: string;
}

export interface Skiper52Props {
  images?: SkiperImage[];
  className?: string;
  containerClassName?: string;
}

const DEFAULT_IMAGES: SkiperImage[] = [
  {
    src: "/showcase/kts-properties.png",
    alt: "KTS Properties — Real Estate & Property Management Platform",
    code: "KTS Properties",
  },
  {
    src: "/showcase/tracezero-landing.png",
    alt: "TraceZero — Digital Exposure & OSINT Intelligence Platform",
    code: "TraceZero Scan",
  },
  {
    src: "/showcase/tracezero-report.png",
    alt: "TraceZero — Threat Intelligence & Exposure Assessment Report",
    code: "TraceZero Report",
  },
  {
    src: "/showcase/smartscan-command.png",
    alt: "Smart Scan — AI-Driven Spectrum Intelligence Command Center",
    code: "Smart Scan Hub",
  },
  {
    src: "/showcase/smartscan-telemetry.png",
    alt: "Smart Scan — Real-Time RF Spectrum Operations Dashboard",
    code: "Smart Scan Live",
  },
  {
    src: "/showcase/aevum-dashboard.png",
    alt: "Aevum Health — Personal Health Intelligence & Medical Records Hub",
    code: "Aevum Health",
  },
  {
    src: "/showcase/aevum-trends.png",
    alt: "Aevum Clinical — Biometric Timeline & Diagnostic Trends Platform",
    code: "Aevum Trends",
  },
];

const Skiper52: React.FC<Skiper52Props> = ({
  images = DEFAULT_IMAGES,
  className,
  containerClassName,
}) => {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center overflow-hidden bg-[#f5f4f3] rounded-3xl py-8",
        containerClassName
      )}
    >
      <HoverExpand_001 className={className} images={images} />
    </div>
  );
};

export { Skiper52 };

const HoverExpand_001 = ({
  images,
  className,
}: {
  images: SkiperImage[];
  className?: string;
}) => {
  const [activeImage, setActiveImage] = useState<number | null>(0);

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.2,
      }}
      className={cn("relative w-full max-w-6xl px-4 sm:px-6", className)}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full overflow-x-auto scrollbar-none py-2"
      >
        <div className="flex w-full items-center justify-center gap-2 sm:gap-3 min-w-max md:min-w-0">
          {images.map((image, index) => {
            const isActive = activeImage === index;
            return (
              <motion.div
                key={index}
                className={cn(
                  "relative cursor-pointer overflow-hidden rounded-2xl sm:rounded-3xl shrink-0 transition-shadow duration-300 border",
                  isActive
                    ? "border-[#0066D6]/40 shadow-[0_16px_40px_rgba(0,102,214,0.18)]"
                    : "border-black/5 hover:border-black/15 shadow-sm"
                )}
                initial={{ width: "4.5rem", height: "22rem" }}
                animate={{
                  width: isActive ? "28rem" : "5.5rem",
                  height: "22rem",
                }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setActiveImage(index)}
                onHoverStart={() => setActiveImage(index)}
              >
                {/* Active Gradient and Caption */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none"
                    />
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.25, delay: 0.05 }}
                      className="absolute inset-0 flex flex-col justify-between p-5 z-20 pointer-events-none"
                    >
                      {/* Top Pill */}
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-black/50 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full shadow-xs">
                          Live Project
                        </span>
                      </div>

                      {/* Bottom Info */}
                      <div className="space-y-1">
                        <p className="text-base sm:text-lg font-bold text-white tracking-tight drop-shadow-sm">
                          {image.code}
                        </p>
                        <p className="text-xs text-white/80 font-normal line-clamp-1 drop-shadow-xs">
                          {image.alt}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Collapsed Vertical Title on Inactive Slats */}
                {!isActive && (
                  <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors z-10 flex flex-col items-center justify-end pb-6 pointer-events-none">
                    <span className="text-[11px] font-semibold text-white/90 tracking-wide [writing-mode:vertical-rl] rotate-180 drop-shadow-md">
                      {image.code}
                    </span>
                  </div>
                )}

                <img
                  src={image.src}
                  className="size-full object-cover object-top select-none"
                  alt={image.alt}
                  draggable={false}
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.onerror = null;
                    target.src = "/showcase/kts-properties.png";
                  }}
                />
=======
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Laptop,
  HeartHandshake,
  Zap,
  ShieldCheck,
  FileEdit,
  Search,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import { cn } from "../lib/utils";

export interface ServiceAccordionItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  badge: string;
  icon: React.ElementType;
  accent: string;
}

export const SERVICE_ACCORDION_ITEMS: ServiceAccordionItem[] = [
  {
    id: "custom-design",
    name: "Custom Design",
    tagline: "Bespoke handcrafted code",
    description: "No bloated page builders. Pure, clean bespoke design & code tailored to your exact brand.",
    badge: "100% Custom",
    icon: Laptop,
    accent: "#0066D6",
  },
  {
    id: "monthly-care",
    name: "Monthly Care",
    tagline: "Unlimited monthly edits",
    description: "Hand over your website worries. Dedicated human designers and engineers at your service.",
    badge: "Unlimited Edits",
    icon: HeartHandshake,
    accent: "#0066D6",
  },
  {
    id: "speed-seo",
    name: "Speed & SEO",
    tagline: "100/100 Core Vitals score",
    description: "Ultra-fast load times engineered to rank at the top of Google search and convert visitors.",
    badge: "100/100 Score",
    icon: Zap,
    accent: "#0066D6",
  },
  {
    id: "security-hosting",
    name: "Security & Hosting",
    tagline: "Daily backups & SSL",
    description: "Enterprise-grade high-speed hosting with 24/7 uptime monitoring and automated backups.",
    badge: "99.99% Uptime",
    icon: ShieldCheck,
    accent: "#0066D6",
  },
  {
    id: "content-edits",
    name: "Content Edits",
    tagline: "Fast turnaround updates",
    description: "New pictures, seasonal promos, layout tweaks, or text changes completed within 24 hours.",
    badge: "24h Response",
    icon: FileEdit,
    accent: "#0066D6",
  },
  {
    id: "search-optimization",
    name: "Search Optimization",
    tagline: "Google search indexing",
    description: "Structured schema markup, semantic HTML, and localized search visibility optimization.",
    badge: "Top Ranking",
    icon: Search,
    accent: "#0066D6",
  },
];

export const Skiper52: React.FC<{
  items?: ServiceAccordionItem[];
  className?: string;
}> = ({ items = SERVICE_ACCORDION_ITEMS, className }) => {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  return (
    <div className={cn("w-full max-w-6xl mx-auto px-2 sm:px-4 py-2", className)}>
      <div className="w-full overflow-x-auto scrollbar-none py-3">
        <div className="flex w-full items-center justify-center gap-2 sm:gap-3 min-w-max md:min-w-0">
          {items.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeIdx === index;

            return (
              <motion.div
                key={item.id}
                className={cn(
                  "relative cursor-pointer overflow-hidden rounded-2xl sm:rounded-3xl transition-all duration-300 select-none",
                  isActive
                    ? "bg-gradient-to-b from-white via-white to-[#F0F6FD] border border-[#A9CEF7] shadow-[0_16px_36px_rgba(0,102,214,0.12),_0_2px_8px_rgba(0,102,214,0.04)]"
                    : "bg-gradient-to-b from-white via-white to-[#F6FAFE] border border-[#D5E4F5] hover:border-[#BFDBFE] hover:bg-[#FAFDFE] shadow-sm"
                )}
                initial={false}
                animate={{
                  width: isActive ? "22rem" : "4.75rem",
                  height: "14.5rem",
                }}
                transition={{
                  duration: 0.38,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={() => setActiveIdx(index)}
                onHoverStart={() => setActiveIdx(index)}
              >
                {/* Collapsed State View */}
                {!isActive && (
                  <div className="absolute inset-0 flex flex-col items-center justify-between p-3.5 sm:p-4 text-center">
                    <div className="w-10 h-10 rounded-2xl bg-[#E5F1FF] border border-[#BFDBFE] flex items-center justify-center text-[#0066D6] shadow-2xs shrink-0">
                      <Icon className="w-5 h-5 text-[#0066D6]" />
                    </div>

                    <div className="writing-vertical flex items-center justify-center flex-1 py-2">
                      <span className="text-xs font-bold text-[#0C172B] tracking-tight whitespace-nowrap [writing-mode:vertical-rl] rotate-180">
                        {item.name}
                      </span>
                    </div>

                    <span className="w-2 h-2 rounded-full bg-[#0066D6]/40" />
                  </div>
                )}

                {/* Expanded State View */}
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.28, delay: 0.06 }}
                    className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between"
                  >
                    {/* Top Row: Icon + Badge */}
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-[#E5F1FF] border border-[#BFDBFE] flex items-center justify-center text-[#0066D6] shadow-xs">
                        <Icon className="w-6 h-6 text-[#0066D6]" />
                      </div>
                      <span className="text-[10px] font-bold font-mono px-2.5 py-1 rounded-full bg-[#E5F1FF] text-[#0066D6] border border-[#BFDBFE] shadow-2xs">
                        {item.badge}
                      </span>
                    </div>

                    {/* Middle: Name, Tagline & Description */}
                    <div className="space-y-1.5 my-auto py-1">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-[#0C172B] tracking-tight leading-snug">
                          {item.name}
                        </h3>
                        <span className="text-xs font-semibold text-[#0066D6] block">
                          {item.tagline}
                        </span>
                      </div>
                      <p className="text-xs text-[#52637A] leading-relaxed line-clamp-3">
                        {item.description}
                      </p>
                    </div>

                    {/* Bottom: Feature Footer */}
                    <div className="pt-2.5 border-t border-[#DDE8F6] flex items-center justify-between text-xs text-[#0066D6] font-semibold">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0066D6]" />
                        Included in every plan
                      </span>
                      <ArrowUpRight className="w-4 h-4 opacity-75" />
                    </div>
                  </motion.div>
                )}
>>>>>>> db580f972c483f6255d365d1294f6f8b6325173d
              </motion.div>
            );
          })}
        </div>
<<<<<<< HEAD
      </motion.div>
    </motion.div>
  );
};

export { HoverExpand_001 };
export default Skiper52;

/**
 * Skiper 52 HoverExpand_001 — React + Framer Motion
 * Configured with custom studio showcase projects.
 */
=======
      </div>
    </div>
  );
};

export default Skiper52;
>>>>>>> db580f972c483f6255d365d1294f6f8b6325173d
