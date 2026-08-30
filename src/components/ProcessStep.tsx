import React from 'react';
import { motion } from 'framer-motion';
import { reveal, revealInitial, revealViewport } from '../lib/motion';

interface ProcessStepCardProps {
  step: string;
  title: string;
  description: string;
  index: number;
}

export const ProcessStepCard: React.FC<ProcessStepCardProps> = ({
  step,
  title,
  description,
  index,
}) => {
  return (
    <motion.div
      initial={revealInitial}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={revealViewport}
      transition={reveal(index)}
      className="apple-card p-7 sm:p-8 space-y-3.5 group hover:border-[#A9CEF7] transition-all duration-300 relative overflow-hidden"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-[#0066D6] bg-[#E5F1FF] border border-[#BFDBFE] px-3.5 py-1 rounded-full inline-block font-mono shadow-2xs">
          STEP {step}
        </span>
        <div className="w-2.5 h-2.5 rounded-full bg-[#0066D6]/40 group-hover:bg-[#0066D6] transition-colors" />
      </div>
      <h3 className="text-xl font-bold text-[#0C172B] tracking-tight group-hover:text-[#0066D6] transition-colors">
        {title}
      </h3>
      <p className="text-sm text-[#475569] leading-relaxed font-normal">
        {description}
      </p>
    </motion.div>
  );
};
export default ProcessStepCard;
