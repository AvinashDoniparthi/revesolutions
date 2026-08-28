import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Zap, HeartHandshake, Globe, Sparkles, Layers, ArrowUpRight } from 'lucide-react';

export const HeroWebsiteMockup: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'preview' | 'care'>('preview');

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative w-full"
    >
      {/* Apple Store Widget Card */}
      <div className="apple-card p-6 sm:p-8 space-y-6 shadow-xl">
        
        {/* Top Header inside card */}
        <div className="flex items-center justify-between pb-5 border-b border-black/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F5F5F7] border border-black/5 flex items-center justify-center text-[#1D1D1F] font-bold text-sm">
              RS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-[#1D1D1F]">Rêve Studio Partnership</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#F5F5F7] text-[#6E6E73] font-medium">
                  Direct Care
                </span>
              </div>
              <p className="text-xs text-[#6E6E73] font-normal">Custom Design • Fast Hosting • Monthly Edits</p>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Human Managed</span>
          </div>
        </div>

        {/* Tab switcher - Apple segmented pill control */}
        <div className="flex items-center p-1 rounded-full bg-[#F5F5F7] text-xs">
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex-1 py-2 px-3 rounded-full font-medium transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'preview'
                ? 'bg-white text-[#1D1D1F] shadow-xs font-semibold'
                : 'text-[#6E6E73] hover:text-[#1D1D1F]'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-[#0071E3]" />
            <span>Crafted Website Preview</span>
          </button>
          <button
            onClick={() => setActiveTab('care')}
            className={`flex-1 py-2 px-3 rounded-full font-medium transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'care'
                ? 'bg-white text-[#1D1D1F] shadow-xs font-semibold'
                : 'text-[#6E6E73] hover:text-[#1D1D1F]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#0071E3]" />
            <span>Monthly Care Features</span>
          </button>
        </div>

        {activeTab === 'preview' ? (
          <div className="space-y-4">
            {/* Visual preview of a real editorial website */}
            <div className="p-5 rounded-2xl bg-[#F5F5F7] border border-black/5 space-y-4">
              
              {/* Mock site top navigation */}
              <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#1D1D1F]" />
                  <span className="text-xs font-bold text-[#1D1D1F] tracking-wide text-sm">
                    LUMEN ARCHITECTURE & DESIGN
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-[#6E6E73] font-medium">
                  <span>Projects</span>
                  <span>Studio</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#1D1D1F] text-white text-[10px]">Contact</span>
                </div>
              </div>

              {/* Mock site hero banner */}
              <div className="p-4 rounded-xl bg-white border border-black/5 space-y-2">
                <span className="text-[10px] font-mono text-[#0071E3] uppercase tracking-wider font-semibold">
                  Featured Case Study
                </span>
                <p className="text-base sm:text-lg font-bold text-[#1D1D1F] leading-tight">
                  Handcrafted digital spaces for contemporary architecture.
                </p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-[#6E6E73]">100% Custom Code • Mobile Responsive</span>
                  <span className="text-[11px] font-semibold text-[#0071E3] inline-flex items-center gap-0.5">
                    Live <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>

              {/* 3 Quick highlights */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-white border border-black/5">
                  <span className="text-xs font-bold text-[#1D1D1F] block">100/100</span>
                  <span className="text-[10px] text-[#6E6E73]">Page Speed</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-black/5">
                  <span className="text-xs font-bold text-[#1D1D1F] block">Unlimited</span>
                  <span className="text-[10px] text-[#6E6E73]">Edits Monthly</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-black/5">
                  <span className="text-xs font-bold text-[#1D1D1F] block">24h</span>
                  <span className="text-[10px] text-[#6E6E73]">Response</span>
                </div>
              </div>

            </div>
          </div>
        ) : (
          /* Care Features Grid inside card */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="p-3.5 rounded-xl bg-[#F5F5F7] border border-black/5 space-y-1.5">
              <div className="flex items-center gap-2 text-[#0071E3]">
                <Zap className="w-4 h-4" />
                <span className="text-xs font-bold tracking-tight text-[#1D1D1F]">Speed & SEO</span>
              </div>
              <p className="text-xs text-[#6E6E73] leading-relaxed">
                Handcrafted clean code optimized for Google search and lightning fast load times.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F5F5F7] border border-black/5 space-y-1.5">
              <div className="flex items-center gap-2 text-[#0071E3]">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xs font-bold tracking-tight text-[#1D1D1F]">Total Maintenance</span>
              </div>
              <p className="text-xs text-[#6E6E73] leading-relaxed">
                Security updates, domain renewals, backups, and bug fixes taken care of.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F5F5F7] border border-black/5 space-y-1.5">
              <div className="flex items-center gap-2 text-[#0071E3]">
                <HeartHandshake className="w-4 h-4" />
                <span className="text-xs font-bold tracking-tight text-[#1D1D1F]">Unlimited Edits</span>
              </div>
              <p className="text-xs text-[#6E6E73] leading-relaxed">
                Need text, pricing, or photo changes? Email us and we handle it promptly.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F5F5F7] border border-black/5 space-y-1.5">
              <div className="flex items-center gap-2 text-[#0071E3]">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-xs font-bold tracking-tight text-[#1D1D1F]">One Flat Fee</span>
              </div>
              <p className="text-xs text-[#6E6E73] leading-relaxed">
                Simple monthly plan with zero surprise bills or unexpected developer charges.
              </p>
            </div>
          </div>
        )}

        {/* Bottom Banner callout */}
        <div className="p-4 rounded-2xl bg-[#F5F5F7] border border-black/5 flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-[#1D1D1F] block">Real Web Designers at Your Service</span>
            <span className="text-[11px] text-[#6E6E73] block">Direct communication — no ticketing bots or automated queues.</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-white border border-black/5 flex items-center justify-center text-[#0071E3] shadow-xs shrink-0">
            <Layers className="w-4 h-4" />
          </div>
        </div>

      </div>
    </motion.div>
  );
};
