import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowUpRight,
  Zap,
  ShieldCheck,
  Building2,
  Utensils,
  Cpu,
  Sparkles,
  Smartphone
} from 'lucide-react';

interface SiteDemo {
  id: string;
  name: string;
  category: string;
  tabLabel: string;
  icon: React.ElementType;
  location: string;
  headline: string;
  subheadline: string;
  tagPill: string;
  imageUrl: string;
  ctaText: string;
  accentColor: string;
  speedScore: number;
  ttfb: string;
}

const DEMOS: SiteDemo[] = [
  {
    id: 'architecture',
    name: 'LUMEN ARCHITECTURE',
    category: 'Spatial Design & Architecture',
    tabLabel: 'Architecture',
    icon: Building2,
    location: 'Zürich • Copenhagen',
    headline: 'Handcrafted spaces for contemporary living.',
    subheadline: 'Bespoke portfolio platform engineered with editorial archiving, high-res project showcase, and private client portals.',
    tagPill: 'Featured Project • Villa Vals',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    ctaText: 'Explore Projects',
    accentColor: '#0066D6',
    speedScore: 100,
    ttfb: '380ms'
  },
  {
    id: 'hospitality',
    name: 'KŌSO DINING ROOM',
    category: 'Fine Dining & Gastronomy',
    tabLabel: 'Fine Dining',
    icon: Utensils,
    location: 'Kyoto • Tokyo',
    headline: 'Seasonal gastronomy & intimate dining.',
    subheadline: 'Atmospheric digital storefront with real-time table booking integration, seasonal tasting menu, and private cellar catalog.',
    tagPill: 'Autumn Tasting Menu',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
    ctaText: 'Reserve Table',
    accentColor: '#D97706',
    speedScore: 100,
    ttfb: '340ms'
  },
  {
    id: 'tech',
    name: 'APEX ENGINE',
    category: 'High-Tech Platform',
    tabLabel: 'High-Tech SaaS',
    icon: Cpu,
    location: 'San Francisco • London',
    headline: 'Engineering intelligence for modern teams.',
    subheadline: 'Ultra-fast product landing page engineered with interactive code terminals, live telemetry analytics, and zero-latency docs.',
    tagPill: 'Bespoke Engineering • 100/100 Core',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80',
    ctaText: 'Launch Sandbox',
    accentColor: '#059669',
    speedScore: 100,
    ttfb: '310ms'
  }
];

export const WebsiteConfigurator: React.FC = () => {
  const navigate = useNavigate();
  const [activeDemo, setActiveDemo] = useState<SiteDemo>(DEMOS[0]);
  const [isTestingSpeed, setIsTestingSpeed] = useState(false);
  const [testedScore, setTestedScore] = useState(100);
  const [simulatedStatus, setSimulatedStatus] = useState('✨ Dedicated engineering team on standby');

  const handleTestSpeed = () => {
    if (isTestingSpeed) return;
    setIsTestingSpeed(true);
    setTestedScore(82);
    const timer = setInterval(() => {
      setTestedScore((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsTestingSpeed(false);
          return 100;
        }
        return prev + 6;
      });
    }, 50);
  };

  return (
    <div className="relative w-full select-none space-y-4">
      {/* Outer Safari Window Container */}
      <div className="rounded-3xl border border-[#CDE1F8] bg-white shadow-xl overflow-hidden transition-all duration-300">
        
        {/* Safari Browser Chrome Bar */}
        <div className="px-4 py-3 bg-gradient-to-r from-[#F4F8FC] via-[#EDF4FB] to-[#F4F8FC] border-b border-[#D8E6F7] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          
          {/* Traffic Lights + Studio Concept Preview Label */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-[#D0E2F6] text-[11px] text-[#475569] shadow-2xs">
              <Sparkles className="w-3 h-3 text-[#0066D6] shrink-0" />
              <span className="text-[#0C172B] font-semibold">Studio Concept Preview</span>
              <span className="hidden xs:inline-block text-[10px] text-[#798CA6] font-medium">• {activeDemo.category}</span>
            </div>
          </div>

          {/* Clean Industry Switcher Tabs */}
          <div className="flex items-center gap-1 p-1 bg-[#E2EEFC] rounded-xl border border-[#CDE1F8] self-start sm:self-center overflow-x-auto">
            {DEMOS.map((demo) => {
              const Icon = demo.icon;
              const isActive = activeDemo.id === demo.id;
              return (
                <button
                  key={demo.id}
                  onClick={() => setActiveDemo(demo)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-white text-[#0066D6] shadow-xs border border-[#BFDBFE]'
                      : 'text-[#52637A] hover:text-[#0C172B] hover:bg-white/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{demo.tabLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            Inner "Proper Website" Canvas with Moving/Floating Interactive Widgets
            ========================================================================= */}
        <div className="relative bg-gradient-to-br from-[#FFFFFF] via-[#FBFDFF] to-[#F2F7FD] p-5 sm:p-8 lg:p-10 overflow-hidden min-h-[420px] sm:min-h-[460px]">
          
          {/* Subtle Ambient Glow */}
          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[90px] pointer-events-none opacity-30 transition-all duration-700"
            style={{ backgroundColor: activeDemo.accentColor }}
          />

          {/* --- Internal Website Top Navigation --- */}
          <div className="flex items-center justify-between pb-6 border-b border-[#E2EEFC] relative z-10">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: activeDemo.accentColor }}
              />
              <span className="text-xs sm:text-sm font-extrabold tracking-wider text-[#0C172B] uppercase">
                {activeDemo.name}
              </span>
              <span className="hidden sm:inline text-[11px] font-mono text-[#798CA6]">
                • {activeDemo.location}
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-medium text-[#52637A]">
              <span className="hidden md:inline hover:text-[#0C172B] cursor-pointer">Projects</span>
              <span className="hidden md:inline hover:text-[#0C172B] cursor-pointer">Studio</span>
              <button
                onClick={() => navigate('/contact')}
                className="px-3 py-1.5 rounded-full text-white text-xs font-bold shadow-xs flex items-center gap-1 hover:opacity-90 transition-all cursor-pointer"
                style={{ backgroundColor: activeDemo.accentColor }}
              >
                <span>Get in Touch</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* --- Internal Website Hero Section --- */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-6 sm:pt-8 relative z-10">
            
            {/* Left Column: Proper Website Hero Copy */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF4FE] border border-[#BFDBFE] text-xs font-mono font-bold text-[#0066D6]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{activeDemo.category}</span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDemo.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3"
                >
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0C172B] leading-tight tracking-tight">
                    {activeDemo.headline}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed max-w-lg">
                    {activeDemo.subheadline}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => navigate('/contact')}
                  className="px-4 py-2 rounded-xl text-white text-xs font-bold shadow-md flex items-center gap-2 hover:opacity-90 active:scale-98 transition-all cursor-pointer"
                  style={{ backgroundColor: activeDemo.accentColor }}
                >
                  <span>{activeDemo.ctaText}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-[#D5E4F5] text-xs text-[#52637A] font-medium shadow-2xs">
                  <Smartphone className="w-3.5 h-3.5 text-[#0066D6]" />
                  <span>100% Fluid Mobile Code</span>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Case Showcase Photo with Floating HUDs */}
            <div className="lg:col-span-5 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDemo.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35 }}
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#CDE1F8] shadow-lg bg-slate-900 group"
                >
                  <img
                    src={activeDemo.imageUrl}
                    alt={activeDemo.headline}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Photo Info Badge */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs">
                    <span className="font-semibold truncate">{activeDemo.tagPill}</span>
                    <span className="font-mono text-emerald-400 font-bold shrink-0">100/100 Speed</span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* =============================================================
                  MOVING FLOATING WIDGET 1: Speed & Core Web Vitals HUD
                  (Gently floating with continuous kinetic levitation)
                  ============================================================= */}
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ scale: 1.03 }}
                className="absolute -top-4 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md rounded-2xl border border-emerald-200 p-3 shadow-lg flex items-center gap-3 z-20"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center font-extrabold text-xs">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-extrabold text-[#0C172B]">
                      {testedScore}/100 Speed
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  </div>
                  <button
                    onClick={handleTestSpeed}
                    disabled={isTestingSpeed}
                    className="text-[10px] text-emerald-700 font-semibold hover:underline cursor-pointer flex items-center gap-0.5"
                  >
                    <span>{isTestingSpeed ? 'Testing...' : '⚡ Click to benchmark'}</span>
                  </button>
                </div>
              </motion.div>

              {/* =============================================================
                  MOVING FLOATING WIDGET 2: Dedicated Lead Engineer Care
                  (Gently floating with counter-phase levitation)
                  ============================================================= */}
              <motion.div
                animate={{ y: [0, 7, 0] }}
                transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                whileHover={{ scale: 1.03 }}
                className="absolute -bottom-4 -left-2 sm:-left-4 bg-white/95 backdrop-blur-md rounded-2xl border border-[#BFDBFE] p-3 shadow-lg flex items-center gap-3 z-20"
              >
                <div className="relative">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0066D6] to-[#38BDF8] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    RS
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#0C172B] block">
                    Dedicated Human Lead
                  </span>
                  <span className="text-[10px] text-[#52637A] block font-medium">
                    Unlimited 24h edits included
                  </span>
                </div>
              </motion.div>

            </div>

          </div>

          {/* --- Interactive Moving Status Ticker at Bottom of Website --- */}
          <div className="mt-8 pt-4 border-t border-[#E2EEFC] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#52637A]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-medium text-[#0C172B]">{simulatedStatus}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-[#798CA6]">Test client request:</span>
              <button
                onClick={() => setSimulatedStatus('🚀 Promo banner deployed in 12 mins')}
                className="px-2 py-0.5 rounded-md bg-white border border-[#D5E4F5] text-[11px] font-semibold text-[#0066D6] hover:bg-[#EBF4FE] transition-colors cursor-pointer"
              >
                Promo
              </button>
              <button
                onClick={() => setSimulatedStatus('🍱 Tasting menu updated & verified')}
                className="px-2 py-0.5 rounded-md bg-white border border-[#D5E4F5] text-[11px] font-semibold text-[#0066D6] hover:bg-[#EBF4FE] transition-colors cursor-pointer"
              >
                Menu
              </button>
              <button
                onClick={() => setSimulatedStatus('⚡ 100/100 Core Web Vitals audit passed')}
                className="px-2 py-0.5 rounded-md bg-white border border-[#D5E4F5] text-[11px] font-semibold text-[#0066D6] hover:bg-[#EBF4FE] transition-colors cursor-pointer"
              >
                SEO
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Studio Banner */}
        <div className="p-4 bg-gradient-to-r from-[#EBF4FD] via-[#F3F8FE] to-[#E8F2FD] border-t border-[#BFDBFE] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2 shrink-0">
              <div className="w-8 h-8 rounded-full bg-[#0066D6] text-white flex items-center justify-center font-bold text-[10px] border-2 border-white shadow-xs">
                RS
              </div>
              <div className="w-8 h-8 rounded-full bg-[#0F172A] text-white flex items-center justify-center font-bold text-[10px] border-2 border-white shadow-xs">
                DEV
              </div>
            </div>
            <div>
              <span className="text-xs font-bold text-[#0C172B] block">
                Pure Handcrafted Code • Managed by Real Humans
              </span>
              <span className="text-[11px] text-[#52637A] block font-normal">
                No slow page builders • 24h turnaround guarantee • Simple monthly plan
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate('/contact')}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-[#0066D6] text-white text-xs font-bold shadow-md shadow-[#0066D6]/25 hover:bg-[#0054B3] active:scale-98 transition-all cursor-pointer self-start sm:self-center shrink-0"
          >
            <span>Start Your Site</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default WebsiteConfigurator;
