import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { ShowcaseItem } from '../data/showcase';

interface ShowcaseCardProps {
  item: ShowcaseItem;
  index: number;
  onClick?: () => void;
}

export const ShowcaseCard: React.FC<ShowcaseCardProps> = ({ item, index, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.1 }}
      onClick={onClick}
      className="group apple-card p-6 sm:p-8 cursor-pointer space-y-5"
    >
      {/* Website Preview Container */}
      <div className="relative w-full aspect-[16/10] rounded-2xl bg-[#F5F5F7] border border-black/5 overflow-hidden transition-all duration-300">
        
        {/* Mock Browser Top Header inside showcase */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-white/80 border-b border-black/[0.04] backdrop-blur-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-black/20"></span>
            <span className="w-2 h-2 rounded-full bg-black/20"></span>
            <span className="w-2 h-2 rounded-full bg-black/20"></span>
          </div>
          <span className="text-[11px] text-[#6E6E73] font-sans truncate font-medium">
            {item.category.toLowerCase().replace(/\s+/g, '')}.com
          </span>
          <span className="text-[10px] text-emerald-600 font-medium">Live</span>
        </div>

        {/* Website Content Layout Graphic */}
        <div className="p-5 bg-white h-full space-y-3.5 transition-transform duration-300 group-hover:scale-[1.01]">
          
          {/* Header Bar representation */}
          <div className="flex items-center justify-between pb-2 border-b border-black/[0.04]">
            <div className="w-24 h-2.5 rounded bg-[#1D1D1F]"></div>
            <div className="flex gap-2">
              <div className="w-8 h-2 rounded bg-black/10"></div>
              <div className="w-8 h-2 rounded bg-black/10"></div>
              <div className="w-12 h-2.5 rounded bg-[#0071E3]"></div>
            </div>
          </div>

          {/* Hero Section representation */}
          <div className="grid grid-cols-12 gap-3 items-center pt-1">
            <div className="col-span-7 space-y-2">
              <div className="w-3/4 h-3.5 rounded bg-[#1D1D1F]"></div>
              <div className="w-1/2 h-2 rounded bg-black/30"></div>
              <div className="w-16 h-3.5 rounded bg-[#0071E3] mt-2"></div>
            </div>
            <div className="col-span-5">
              <div className="w-full h-16 rounded-xl bg-[#F5F5F7] border border-black/5 flex items-center justify-center text-[10px] text-[#6E6E73] font-medium px-2 text-center">
                {item.category}
              </div>
            </div>
          </div>

        </div>

        {/* Hover Overlay Arrow */}
        <div className="absolute top-3 right-3 p-2 rounded-full bg-white/90 shadow-xs border border-black/5 text-[#1D1D1F] group-hover:bg-[#0071E3] group-hover:text-white transition-all">
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>

      {/* Description below preview */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#86868B] block">
          {item.category}
        </span>
        <h3 className="text-xl font-bold text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors tracking-tight">
          {item.title}
        </h3>
        <p className="text-sm text-[#6E6E73] leading-relaxed font-normal">
          {item.description}
        </p>
        <div className="pt-2">
          <span className="text-xs font-medium text-[#0066CC] group-hover:underline inline-flex items-center gap-1">
            <span>Explore project</span>
            <span aria-hidden="true">&gt;</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
};
