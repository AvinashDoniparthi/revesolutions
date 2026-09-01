import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  Compass,
  Utensils,
  Building2,
  Smartphone
} from 'lucide-react';

interface ProjectShowcase {
  id: string;
  name: string;
  category: string;
  tabLabel: string;
  icon: React.ElementType;
  domain: string;
  location: string;
  headline: string;
  subheadline: string;
  tagPill: string;
  imageUrl: string;
  ctaText: string;
  navLinks: string[];
  metrics: {
    speed: string;
    tech: string;
    highlight: string;
  };
  accentColor: string;
}

const PROJECTS: ProjectShowcase[] = [
  {
    id: 'architecture',
    name: 'LUMEN ARCHITECTURE',
    category: 'Spatial Design & Architecture',
    tabLabel: 'Architecture',
    icon: Building2,
    domain: 'lumen-arch.com',
    location: 'Zürich • Copenhagen',
    headline: 'Handcrafted spaces for contemporary living.',
    subheadline: 'Bespoke portfolio platform engineered with immersive editorial layouts, high-res project archiving, and private client portals.',
    tagPill: 'Featured Project • Villa Vals',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    ctaText: 'Explore Projects',
    navLinks: ['Projects', 'Studio', 'Inquiries'],
    metrics: {
      speed: '100/100',
      tech: 'Custom Next.js & Tailwind',
      highlight: '420ms TTFB'
    },
    accentColor: '#0066D6'
  },
  {
    id: 'culinary',
    name: 'KŌSO DINING ROOM',
    category: 'Fine Dining & Hospitality',
    tabLabel: 'Fine Dining',
    icon: Utensils,
    domain: 'koso-dining.com',
    location: 'Kyoto • Tokyo',
    headline: 'Seasonal gastronomy & intimate dining.',
    subheadline: 'Atmospheric digital storefront with real-time table booking integration, seasonal tasting menu showcase, and private cellar catalog.',
    tagPill: 'Autumn Tasting Menu • Open',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    ctaText: 'Reserve Table',
    navLinks: ['Experience', 'Cellar', 'Reserve'],
    metrics: {
      speed: '99/100',
      tech: 'Real-time Booking Engine',
      highlight: 'Zero Lag'
    },
    accentColor: '#D97706'
  }
];

export const HeroWebsiteMockup: React.FC = () => {
  const [activeProject, setActiveProject] = useState<ProjectShowcase>(PROJECTS[0]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative w-full select-none"
    >
      {/* Outer Studio Showcase Shell */}
      <div className="apple-card p-4 sm:p-6 lg:p-7 space-y-5 shadow-2xl border border-[#D0E2F6] bg-gradient-to-b from-white via-[#F9FBFE] to-[#EFF6FF]">
        
        {/* Top Control Bar: Studio Identity + Project Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#D8E6F7]">
          {/* Left: Studio Header */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0052B4] to-[#007AFF] flex items-center justify-center text-white font-bold text-sm shadow-md shadow-[#0066D6]/25 shrink-0">
              <span>RS</span>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm font-bold text-[#0C172B]">Rêve Studio Production</h3>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#E1EFFF] text-[#0066D6] border border-[#BFDBFE]">
                  Client Showcase
                </span>
              </div>
              <p className="text-xs text-[#52637A] font-medium">Bespoke Design • Pure Handcrafted Code • Fully Managed</p>
            </div>
          </div>

          {/* Right: Studio Concept Pill */}
          <div className="inline-flex items-center gap-2 self-start sm:self-center px-3 py-1.5 rounded-full bg-white/90 border border-[#CDE1F8] shadow-2xs text-xs font-semibold text-[#0C172B]">
            <Sparkles className="w-3.5 h-3.5 text-[#0066D6]" />
            <span>Studio Concept Showcase</span>
          </div>
        </div>

        {/* Interactive Project Switcher Tabs */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 scrollbar-none">
          <div className="flex items-center gap-1.5 p-1 bg-[#E8F2FD] rounded-xl border border-[#CDE1F8] w-full sm:w-auto">
            {PROJECTS.map((project) => {
              const Icon = project.icon;
              const isActive = activeProject.id === project.id;
              return (
                <button
                  key={project.id}
                  onClick={() => setActiveProject(project)}
                  className={`relative flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-[#0066D6] shadow-xs'
                      : 'text-[#52637A] hover:text-[#0C172B] hover:bg-white/50'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabBadge"
                      className="absolute inset-0 bg-white rounded-lg border border-[#BFDBFE] shadow-2xs"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{project.tabLabel}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <span className="hidden md:inline-flex text-[11px] font-mono text-[#798CA6] items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-[#0066D6]" />
            Click tabs to preview real sites
          </span>
        </div>

        {/* =========================================================================
            Realistic High-Fidelity Browser Viewport
            ========================================================================= */}
        <div className="rounded-2xl bg-white border border-[#CDE1F8] shadow-lg overflow-hidden transition-all duration-300">
          
          {/* macOS / Safari Chrome Window Header */}
          <div className="px-4 py-2.5 bg-gradient-to-r from-[#F4F8FC] via-[#EDF4FB] to-[#F4F8FC] border-b border-[#D8E6F7] flex items-center justify-between gap-3">
            
            {/* Window Traffic Lights */}
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
            </div>

            {/* Studio Concept Bar */}
            <div className="flex-1 max-w-sm mx-auto flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-[#D0E2F6] text-[11px] text-[#475569] shadow-2xs">
              <Sparkles className="w-3 h-3 text-[#0066D6] shrink-0" />
              <span className="text-[#0C172B] font-semibold">Studio Concept Preview</span>
              <span className="hidden xs:inline-block text-[10px] text-[#798CA6] font-medium">• {activeProject.category}</span>
            </div>

            {/* Device / Fluid Tag */}
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#0066D6] shrink-0">
              <span className="hidden sm:inline">100% Fluid</span>
              <Smartphone className="w-3.5 h-3.5 hidden sm:inline" />
            </div>
          </div>

          {/* =========================================================================
              Inner Website Live Preview Canvas
              ========================================================================= */}
          <div className="relative min-h-[310px] sm:min-h-[330px] p-4 sm:p-6 bg-gradient-to-br from-[#FFFFFF] via-[#FAFDFE] to-[#F3F8FD] overflow-hidden">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {/* Mock Website Internal Top Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-[#E2EEFC]">
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-2.5 h-2.5 rounded-full" 
                      style={{ backgroundColor: activeProject.accentColor }} 
                    />
                    <span className="text-xs font-extrabold tracking-wider text-[#0C172B] uppercase">
                      {activeProject.name}
                    </span>
                    <span className="hidden sm:inline-block text-[10px] font-mono text-[#798CA6]">
                      • {activeProject.location}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="hidden sm:flex items-center gap-3 text-[11px] font-medium text-[#52637A]">
                      {activeProject.navLinks.slice(0, 2).map((link) => (
                        <span key={link} className="hover:text-[#0C172B] transition-colors">{link}</span>
                      ))}
                    </div>
                    <span 
                      className="px-2.5 py-1 rounded-full text-white text-[10px] font-bold shadow-2xs flex items-center gap-1"
                      style={{ backgroundColor: activeProject.accentColor }}
                    >
                      <span>{activeProject.navLinks[2]}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>

                {/* Hero Grid Preview: Left Copy + Right Rich Visual Image */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  
                  {/* Left Column: Typography & Conversion Area */}
                  <div className="md:col-span-7 space-y-3">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EBF4FE] border border-[#BFDBFE] text-[10px] font-mono font-bold text-[#0066D6]">
                      <Sparkles className="w-3 h-3" />
                      <span>{activeProject.category}</span>
                    </div>

                    <h4 className="text-lg sm:text-xl font-bold text-[#0C172B] leading-snug tracking-tight">
                      {activeProject.headline}
                    </h4>

                    <p className="text-xs text-[#52637A] leading-relaxed line-clamp-2 sm:line-clamp-none">
                      {activeProject.subheadline}
                    </p>

                    <div className="pt-1 flex flex-wrap items-center gap-2">
                      <button 
                        className="px-3.5 py-1.5 rounded-xl text-white text-xs font-semibold shadow-sm flex items-center gap-1.5 hover:opacity-90 transition-all cursor-pointer"
                        style={{ backgroundColor: activeProject.accentColor }}
                      >
                        <span>{activeProject.ctaText}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>

                      <span className="text-[11px] font-mono text-[#52637A] bg-white px-2.5 py-1 rounded-lg border border-[#D5E4F5]">
                        ⚡ {activeProject.metrics.speed} Speed
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Visual Case Study Card with Photography */}
                  <div className="md:col-span-5 relative group">
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[#CDE1F8] shadow-md bg-slate-900">
                      <img 
                        src={activeProject.imageUrl} 
                        alt={activeProject.headline}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                      {/* Floating Project Pill */}
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between p-2 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px]">
                        <span className="font-semibold truncate">{activeProject.tagPill}</span>
                        <span className="font-mono text-emerald-400 font-bold shrink-0">99.8%</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Micro Metric Highlights Grid */}
                <div className="grid grid-cols-3 gap-2 pt-1">
                  <div className="p-2.5 rounded-xl bg-white/90 border border-[#D8E6F7] shadow-2xs">
                    <div className="flex items-center gap-1 text-[10px] text-[#798CA6] font-medium">
                      <Zap className="w-3 h-3 text-[#0066D6]" />
                      <span>Page Speed</span>
                    </div>
                    <span className="text-xs font-extrabold text-[#0C172B] block mt-0.5">
                      {activeProject.metrics.speed}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/90 border border-[#D8E6F7] shadow-2xs">
                    <div className="flex items-center gap-1 text-[10px] text-[#798CA6] font-medium">
                      <ShieldCheck className="w-3 h-3 text-[#0066D6]" />
                      <span>Engineering</span>
                    </div>
                    <span className="text-xs font-extrabold text-[#0C172B] block mt-0.5 truncate">
                      {activeProject.metrics.tech}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/90 border border-[#D8E6F7] shadow-2xs">
                    <div className="flex items-center gap-1 text-[10px] text-[#798CA6] font-medium">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Latency / Perf</span>
                    </div>
                    <span className="text-xs font-extrabold text-[#0C172B] block mt-0.5">
                      {activeProject.metrics.highlight}
                    </span>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>

          </div>

        </div>

        {/* Bottom Studio Human Care & Guarantee Banner */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-[#EBF4FD] via-[#F3F8FE] to-[#E8F2FD] border border-[#BFDBFE] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-3">
            {/* Designer Avatar Stack */}
            <div className="flex -space-x-2 shrink-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0066D6] to-[#4094F7] text-white flex items-center justify-center font-bold text-[10px] border-2 border-white shadow-xs">
                JD
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0F172A] to-[#334155] text-white flex items-center justify-center font-bold text-[10px] border-2 border-white shadow-xs">
                AL
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#059669] to-[#34D399] text-white flex items-center justify-center font-bold text-[10px] border-2 border-white shadow-xs">
                EK
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-[#0C172B] block">
                Dedicated Human Design &amp; Web Engineering Team
              </span>
              <span className="text-[11px] text-[#52637A] block font-normal">
                Direct Slack &amp; email access • Unlimited edits • 24h turnaround guarantee
              </span>
            </div>
          </div>

          <div className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0066D6] self-start sm:self-center shrink-0">
            <span>Direct Partner Access</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default HeroWebsiteMockup;
