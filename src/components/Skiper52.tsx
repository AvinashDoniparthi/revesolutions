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
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
};

export { HoverExpand_001 };
export default Skiper52;
