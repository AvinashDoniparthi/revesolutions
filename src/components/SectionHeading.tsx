import React from 'react';
import { motion } from 'framer-motion';
import { reveal, revealInitial, revealViewport } from '../lib/motion';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  subtitle,
  centered = false,
  className = '',
}) => {
  return (
    <div className={`${centered ? 'text-center max-w-4xl mx-auto' : 'max-w-4xl'} space-y-2 ${className}`}>
      {badge && (
        <motion.span 
          initial={revealInitial}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          transition={reveal()}
          className="inline-block text-xs font-bold uppercase tracking-wider text-[#0066D6] bg-[#E5F1FF] border border-[#BFDBFE] px-3.5 py-1 rounded-full shadow-2xs"
        >
          {badge}
        </motion.span>
      )}

      <motion.h2 
        initial={revealInitial}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={revealViewport}
        transition={reveal(0, 0.05)}
        className="text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.12]"
      >
        <span className="font-bold text-[#0C172B]">{title}</span>{' '}
        {subtitle && <span className="font-medium text-[#475569]">{subtitle}</span>}
      </motion.h2>
    </div>
  );
};
export default SectionHeading;
