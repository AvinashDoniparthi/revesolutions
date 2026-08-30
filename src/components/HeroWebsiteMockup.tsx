import React from 'react';
import { motion } from 'framer-motion';
import { Layers, ArrowUpRight } from 'lucide-react';

export const HeroWebsiteMockup: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative w-full"
    >
      {/* Apple Store Widget Card */}
      <div className="apple-card p-6 sm:p-8 space-y-6 shadow-xl border border-[#D8E6F7]">
        
        {/* Top Header inside card */}
        <div className="flex items-center justify-between pb-5 border-b border-[#D5E4F5]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E5F1FF] border border-[#BFDBFE] flex items-center justify-center text-[#0066D6] font-bold text-sm shadow-2xs">
              RS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-[#0C172B]">Rêve Studio Partnership</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#E5F1FF] text-[#0066D6] font-semibold border border-[#BFDBFE]">
                  Direct Care
                </span>
              </div>
              <p className="text-xs text-[#475569] font-normal">Custom Design • Fast Hosting • Monthly Edits</p>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5F1FF] text-[#0066D6] border border-[#BFDBFE] text-xs font-semibold shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#0066D6]" />
            <span>Human Managed</span>
          </div>
        </div>

        {/* Visual preview of a real editorial website */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-[#F0F5FA] border border-[#D5E4F5] space-y-4">
            
            {/* Mock site top navigation */}
            <div className="flex items-center justify-between pb-3 border-b border-[#D5E4F5]">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#0066D6]" />
                <span className="text-xs font-bold text-[#0C172B] tracking-wide">
                  LUMEN ARCHITECTURE &amp; DESIGN
                </span>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-[#475569] font-medium">
                <span>Projects</span>
                <span>Studio</span>
                <span className="px-2 py-0.5 rounded-full bg-[#0066D6] text-white text-[10px] font-semibold">Contact</span>
              </div>
            </div>

            {/* Mock site hero banner */}
            <div className="p-4 rounded-xl bg-white border border-[#D5E4F5] space-y-2">
              <span className="text-[10px] font-mono text-[#0066D6] uppercase tracking-wider font-bold">
                Featured Case Study
              </span>
              <p className="text-base sm:text-lg font-bold text-[#0C172B] leading-tight">
                Handcrafted digital spaces for contemporary architecture.
              </p>
              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-[#475569]">100% Custom Code • Mobile Responsive</span>
                <span className="text-[11px] font-semibold text-[#0066D6] inline-flex items-center gap-0.5">
                  Live <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </div>

            {/* 3 Quick highlights */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 rounded-xl bg-white border border-[#D5E4F5] hover:border-[#A9CEF7] transition-colors">
                <span className="text-xs font-bold text-[#0C172B] block">100/100</span>
                <span className="text-[10px] text-[#475569]">Page Speed</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-[#D5E4F5] hover:border-[#A9CEF7] transition-colors">
                <span className="text-xs font-bold text-[#0C172B] block">Unlimited</span>
                <span className="text-[10px] text-[#475569]">Edits Monthly</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-[#D5E4F5] hover:border-[#A9CEF7] transition-colors">
                <span className="text-xs font-bold text-[#0C172B] block">24h</span>
                <span className="text-[10px] text-[#475569]">Response</span>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Banner callout */}
        <div className="p-4 rounded-2xl bg-[#EBF4FD] border border-[#BFDBFE] flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-[#0C172B] block">Real Web Designers at Your Service</span>
            <span className="text-[11px] text-[#475569] block">Direct communication — no ticketing bots or automated queues.</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-white border border-[#BFDBFE] flex items-center justify-center text-[#0066D6] shadow-xs shrink-0">
            <Layers className="w-4 h-4 text-[#0066D6]" />
          </div>
        </div>

      </div>
    </motion.div>
  );
};
export default HeroWebsiteMockup;
