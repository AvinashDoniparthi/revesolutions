import React from 'react';
import { motion } from 'framer-motion';

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
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="inline-block text-xs font-semibold uppercase tracking-wider text-[#6E6E73]"
        >
          {badge}
        </motion.span>
      )}

      <motion.h2 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: 'easeOut', delay: 0.05 }}
        className="text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.12]"
      >
        <span className="font-bold text-[#1D1D1F]">{title}</span>{' '}
        {subtitle && <span className="font-medium text-[#6E6E73]">{subtitle}</span>}
      </motion.h2>
    </div>
  );
};
