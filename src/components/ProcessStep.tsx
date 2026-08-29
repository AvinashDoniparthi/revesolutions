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
      className="apple-card p-7 sm:p-8 space-y-3.5"
    >
      <span className="text-[11px] font-semibold text-[#1D1D1F] bg-[#F5F5F7] px-3 py-1 rounded-full inline-block">
        {step}
      </span>
      <h3 className="text-xl font-bold text-[#1D1D1F] tracking-tight">
        {title}
      </h3>
      <p className="text-sm text-[#6E6E73] leading-relaxed font-normal">
        {description}
      </p>
    </motion.div>
  );
};
