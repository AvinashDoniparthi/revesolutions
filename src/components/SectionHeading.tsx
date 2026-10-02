import React from 'react';
import { motion } from 'framer-motion';
import { reveal, revealInitial, revealViewport } from '../lib/motion';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  className?: string;
}

/**
 * One reveal per heading, on the wrapper.
 *
 * The badge and the heading used to animate separately, which meant a page with
 * five headings fired ten reveals on the way down and every one of them looked
 * the same. Moving the animation to the wrapper halves that and keeps the badge
 * and title visually attached while they arrive.
 */
export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  subtitle,
  className = '',
}) => {
  return (
    <motion.div
      initial={revealInitial}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={revealViewport}
      transition={reveal()}
      className={`max-w-4xl space-y-2 ${className}`}
    >
      {badge && (
        <span className="inline-block text-xs font-bold uppercase tracking-wider text-brand bg-brand-tint border border-line-strong px-3.5 py-1 rounded-full shadow-2xs">
          {badge}
        </span>
      )}

      <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.12]">
        <span className="font-bold text-ink">{title}</span>{' '}
        {subtitle && <span className="font-medium text-ink-2">{subtitle}</span>}
      </h2>
    </motion.div>
  );
};
export default SectionHeading;
