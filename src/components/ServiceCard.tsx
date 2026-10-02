import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { reveal, revealInitial, revealViewport } from '../lib/motion';

interface ServiceCardProps {
  title: string;
  description: string;
  features?: string[];
  index: number;
  /** Where the card navigates. The whole card is the link target. */
  to: string;
}

/**
 * The card is a real `<Link>`, not a div with an onClick.
 *
 * It used to be a `motion.div` carrying `onClick={() => navigate('/services')}`
 * with no role and no tabIndex, so it was invisible to the keyboard and to
 * assistive technology, and the destination was not in the markup for crawlers
 * either. The visual treatment is unchanged.
 */
export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  features,
  index,
  to,
}) => {
  return (
    <motion.div
      initial={revealInitial}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={revealViewport}
      transition={reveal(index)}
      className="h-full"
    >
      <Link
        to={to}
        className="group apple-card p-7 sm:p-8 h-full no-underline space-y-4 flex flex-col justify-between hover:border-line-hover transition-all"
      >
        <div className="space-y-3">
          {/* The card's position in the grid already numbers it, so the title
              leads and the affordance sits beside it rather than under a
              `SERVICE 0N` label. */}
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-2xl font-bold text-ink group-hover:text-brand transition-colors tracking-tight">
              {title}
            </h3>
            <div
              aria-hidden="true"
              className="w-8 h-8 shrink-0 mt-1 rounded-full bg-brand-tint border border-line-strong flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all shadow-2xs"
            >
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>

          <p className="text-sm text-ink-2 leading-relaxed font-normal">
            {description}
          </p>
        </div>

        <div className="space-y-4 pt-2">
          {features && features.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {features.slice(0, 3).map((f) => (
                <span
                  key={f}
                  className="px-3 py-1 rounded-full bg-brand-tint text-ink border border-line text-xs font-semibold"
                >
                  {f}
                </span>
              ))}
            </div>
          )}

          <div className="pt-2 border-t border-line">
            <span className="text-xs font-semibold text-brand group-hover:underline inline-flex items-center gap-1">
              Learn more about {title}
              <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
export default ServiceCard;
