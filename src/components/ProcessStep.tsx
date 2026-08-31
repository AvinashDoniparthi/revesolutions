import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Rocket, ShieldCheck } from 'lucide-react';
import { reveal, revealInitial, revealViewport } from '../lib/motion';

interface ProcessStepCardProps {
  step: string;
  title: string;
  description: string;
  index: number;
}

const STEP_ICONS: Record<string, React.ElementType> = {
  '01': Sparkles,
  '02': Rocket,
  '03': ShieldCheck,
};

const STEP_TAGS: Record<string, string> = {
  '01': '100% Handcrafted Code',
  '02': 'Zero-Downtime Deployment',
  '03': '24/7 Dedicated Care',
};

export const ProcessStepCard: React.FC<ProcessStepCardProps> = ({
  step,
  title,
  description,
  index,
}) => {
  const Icon = STEP_ICONS[step] || Sparkles;
  const tag = STEP_TAGS[step] || 'Fully Managed';

  return (
    <motion.div
      initial={revealInitial}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={revealViewport}
      transition={reveal(index)}
      className="uiverse-process-card group w-full min-h-[250px] sm:min-h-[270px] relative select-none"
    >
      {/* =========================================================================
          1. Default State (Visible Before Hover)
          ========================================================================= */}
<<<<<<< HEAD
      <div className="absolute inset-0 p-6 sm:p-7 flex flex-col justify-between z-[2] transition-all duration-400 ease-out group-hover:opacity-0 group-hover:scale-95 group-hover:pointer-events-none">
=======
      <div className="absolute inset-0 p-6 sm:p-7 flex flex-col justify-between z-2 transition-all duration-400 ease-out group-hover:opacity-0 group-hover:scale-95 group-hover:pointer-events-none">
>>>>>>> db580f972c483f6255d365d1294f6f8b6325173d
        
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#0066D6] bg-[#E5F1FF] border border-[#BFDBFE] px-3 py-1 rounded-full font-mono shadow-2xs">
            STEP {step}
          </span>
          <div className="w-2.5 h-2.5 rounded-full bg-[#0066D6]/40" />
        </div>

        {/* Center Prominent Step Title & Big Numeral */}
        <div className="space-y-1.5 my-auto py-2">
          <span className="text-3xl sm:text-4xl font-extrabold text-[#0066D6]/20 font-mono block tracking-tight">
            {step}
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-[#0C172B] tracking-tight">
            {title}
          </h3>
        </div>

        {/* Bottom Hint */}
        <div className="flex items-center gap-1 text-xs font-semibold text-[#0066D6]">
          <span>Hover to explore process</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </div>
      </div>

      {/* =========================================================================
          2. Hover State (Revealed as Royal Blue expands over the card)
          ========================================================================= */}
<<<<<<< HEAD
      <div className="absolute inset-0 p-6 sm:p-7 flex flex-col justify-between z-[3] opacity-0 translate-y-3 scale-95 pointer-events-none transition-all duration-450 ease-out delay-75 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 group-hover:pointer-events-auto text-white">
=======
      <div className="absolute inset-0 p-6 sm:p-7 flex flex-col justify-between z-3 opacity-0 translate-y-3 scale-95 pointer-events-none transition-all duration-450 ease-out delay-75 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 group-hover:pointer-events-auto text-white">
>>>>>>> db580f972c483f6255d365d1294f6f8b6325173d
        
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-white bg-white/20 border border-white/30 backdrop-blur-md px-3 py-1 rounded-full font-mono shadow-xs">
            STEP {step}
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-xs shadow-emerald-400/80" />
        </div>

        {/* Center Process Details */}
        <div className="space-y-2 my-auto py-1">
          <div className="flex items-center gap-2">
            <Icon className="w-4 h-4 text-[#D0E6FF] shrink-0" />
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
              {title}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#E2EFFF] leading-relaxed font-normal">
            {description}
          </p>
        </div>

        {/* Bottom Feature Tag */}
        <div className="pt-2 border-t border-white/20 flex items-center justify-between">
          <span className="text-[11px] font-mono text-[#D0E6FF] font-medium">
            {tag}
          </span>
<<<<<<< HEAD
=======
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-[#0066D6]">
            Active
          </span>
>>>>>>> db580f972c483f6255d365d1294f6f8b6325173d
        </div>

      </div>
    </motion.div>
  );
};

export default ProcessStepCard;
