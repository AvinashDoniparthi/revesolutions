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
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Skiper52;
