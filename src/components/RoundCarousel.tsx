// Rectangular 3D Conveyor Carousel
// Smooth, slow, neat rectangular loop with flat-facing cards, wide gaps & cohesive Ice-Blue styling

import React, { useEffect, useRef } from "react";
import {
  Laptop,
  HeartHandshake,
  Zap,
  ShieldCheck,
  FileEdit,
  Search,
} from "lucide-react";

export interface RectangularServiceItem {
  name: string;
  icon: React.ElementType;
  tagline?: string;
}

export interface RectangularCarouselProps {
  services?: RectangularServiceItem[];
  cardWidth?: number;
  cardHeight?: number;
  gap?: number;
  speed?: number;
  direction?: "right" | "left";
  cornerRadius?: number;
  style?: React.CSSProperties;
}

const DEFAULT_SERVICES: RectangularServiceItem[] = [
  { name: "Custom Design", icon: Laptop, tagline: "Bespoke handcrafted code" },
  { name: "Monthly Care", icon: HeartHandshake, tagline: "Unlimited monthly edits" },
  { name: "Speed & SEO", icon: Zap, tagline: "100/100 Core Vitals score" },
  { name: "Security & Hosting", icon: ShieldCheck, tagline: "Daily backups & SSL" },
  { name: "Content Edits", icon: FileEdit, tagline: "Fast turnaround updates" },
  { name: "Search Optimization", icon: Search, tagline: "Google search indexing" },
];

export function RoundCarousel({
  services = DEFAULT_SERVICES,
  cardWidth = 285,
  cardHeight = 165,
  gap = 34,
  speed = 0.7,
  direction = "right",
  cornerRadius = 24,
  style = {},
}: RectangularCarouselProps) {
  const items = services.length > 0 ? services : DEFAULT_SERVICES;
  const count = items.length;

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const posRef = useRef(0);
  const lastTimeRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const cardPitch = cardWidth + gap;
  const totalLength = count * cardPitch;
  const halfSpan = (count * cardPitch) / 3.4;
  const depthZ = 130;
  const pixelsPerSec = speed * 42 * (direction === "left" ? -1 : 1);

  useEffect(() => {
    const updatePositions = () => {
      const curPos = posRef.current;

      items.forEach((_, i) => {
        const el = cardRefs.current[i];
        if (!el) return;

        let d = (i * cardPitch + curPos) % totalLength;
        if (d < 0) d += totalLength;

        const u = d / totalLength;
        const theta = u * 2 * Math.PI;

        const sinT = Math.sin(theta);
        const cosT = Math.cos(theta);

        const x = halfSpan * sinT;
        const z = depthZ * cosT;
        const scale = 0.88 + 0.12 * Math.max(-0.2, cosT);

        const opacity = cosT >= 0 
          ? 0.8 + 0.2 * cosT 
          : Math.max(0.25, 0.8 + 0.55 * cosT);

        const zIndex = Math.round(500 + z * 5);

        el.style.transform = `translate3d(${x}px, 0px, ${z}px) scale(${scale})`;
        el.style.opacity = `${opacity}`;
        el.style.zIndex = `${zIndex}`;
      });
    };

    const draw = (now: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = now;
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = now;

      posRef.current += pixelsPerSec * dt;
      updatePositions();
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [cardPitch, totalLength, halfSpan, depthZ, pixelsPerSec, count, items]);

  return (
    <div
      ref={containerRef}
      style={{
        ...style,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        perspective: "1800px",
        overflow: "hidden",
        userSelect: "none",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: cardHeight + 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transformStyle: "preserve-3d",
        }}
      >
        {items.map((srv, i) => {
          const Icon = srv.icon;
          return (
            <div
              key={i}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              style={{
                position: "absolute",
                width: `${cardWidth}px`,
                height: `${cardHeight}px`,
                borderRadius: `${cornerRadius}px`,
                willChange: "transform, opacity",
                transformStyle: "preserve-3d",
              }}
              className="bg-gradient-to-b from-white via-white to-[#F2F7FD] border border-[#CADDF4] shadow-[0_16px_40px_rgba(12,44,98,0.08),_0_2px_8px_rgba(12,44,98,0.03)] backdrop-blur-md flex flex-col items-center justify-center p-5 gap-3 text-center"
            >
              {/* Service Icon Container */}
              <div className="w-12 h-12 rounded-2xl bg-[#E5F1FF] border border-[#BFDBFE] flex items-center justify-center text-[#0066D6] shadow-xs">
                <Icon className="w-6 h-6 text-[#0066D6]" />
              </div>

              {/* Service Typography */}
              <div className="space-y-1">
                <span className="text-sm sm:text-base font-bold text-[#0C172B] block tracking-tight leading-tight">
                  {srv.name}
                </span>
                {srv.tagline && (
                  <span className="text-xs text-[#475569] font-medium block">
                    {srv.tagline}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RoundCarousel;
