import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { reveal, revealInitial, revealViewport } from '../lib/motion';

interface ServiceCardProps {
  title: string;
  description: string;
  features?: string[];
  iconName?: string;
  index: number;
  onClick?: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  features,
  index,
  onClick
}) => {
  return (
    <motion.div
      initial={revealInitial}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={revealViewport}
      transition={reveal(index)}
      onClick={onClick}
      className="group apple-card p-7 sm:p-8 cursor-pointer space-y-4 flex flex-col justify-between"
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#86868B]">
            SERVICE 0{index + 1}
          </span>
          <div className="w-8 h-8 rounded-full bg-[#F5F5F7] flex items-center justify-center text-[#1D1D1F] group-hover:bg-[#0071E3] group-hover:text-white transition-all">
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        <h3 className="text-2xl font-bold text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors tracking-tight">
          {title}
        </h3>

        <p className="text-sm text-[#6E6E73] leading-relaxed font-normal">
          {description}
        </p>
      </div>

      <div className="space-y-4 pt-2">
        {features && features.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {features.slice(0, 3).map((f, fIdx) => (
              <span key={fIdx} className="px-3 py-1 rounded-full bg-[#F5F5F7] text-[#1D1D1F] text-xs font-medium">
                {f}
              </span>
            ))}
          </div>
        )}

        <div className="pt-2 border-t border-black/[0.04]">
          <span className="text-xs font-medium text-[#0066CC] group-hover:underline inline-flex items-center gap-1">
            <span>Learn more about {title}</span>
            <span aria-hidden="true">&gt;</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
};
