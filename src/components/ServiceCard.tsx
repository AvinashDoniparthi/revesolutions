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
      className="group apple-card p-7 sm:p-8 cursor-pointer space-y-4 flex flex-col justify-between hover:border-[#A9CEF7] transition-all"
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#0066D6] bg-[#E5F1FF] border border-[#BFDBFE] px-3 py-0.5 rounded-full inline-block shadow-2xs">
            SERVICE 0{index + 1}
          </span>
          <div className="w-8 h-8 rounded-full bg-[#E5F1FF] border border-[#BFDBFE] flex items-center justify-center text-[#0066D6] group-hover:bg-[#0066D6] group-hover:text-white transition-all shadow-2xs">
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        <h3 className="text-2xl font-bold text-[#0C172B] group-hover:text-[#0066D6] transition-colors tracking-tight">
          {title}
        </h3>

        <p className="text-sm text-[#475569] leading-relaxed font-normal">
          {description}
        </p>
      </div>

      <div className="space-y-4 pt-2">
        {features && features.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {features.slice(0, 3).map((f, fIdx) => (
              <span key={fIdx} className="px-3 py-1 rounded-full bg-[#EAF3FD] text-[#0C172B] border border-[#D6E4F5] text-xs font-semibold">
                {f}
              </span>
            ))}
          </div>
        )}

        <div className="pt-2 border-t border-[#D5E4F5]">
          <span className="text-xs font-semibold text-[#0066D6] group-hover:underline inline-flex items-center gap-1">
            <span>Learn more about {title}</span>
            <span aria-hidden="true">&gt;</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
};
export default ServiceCard;
