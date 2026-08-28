import React from 'react';
import { motion } from 'framer-motion';
import type { TeamMember } from '../data/team';

interface TeamCardProps {
  member: TeamMember;
  index: number;
}

export const TeamCard: React.FC<TeamCardProps> = ({ member, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.1 }}
      className="apple-card p-6 space-y-4"
    >
      {/* Photo Placeholder Area */}
      <div className="w-full aspect-square rounded-2xl bg-[#F5F5F7] border border-black/5 flex flex-col items-center justify-center text-[#6E6E73] gap-2">
        <div className="w-12 h-12 rounded-full bg-white shadow-xs border border-black/5 flex items-center justify-center text-[#0071E3] font-bold text-sm">
          {member.placeholderId}
        </div>
        <span className="text-xs font-medium text-[#86868B]">{member.imagePlaceholder}</span>
      </div>

      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[#1D1D1F] tracking-tight">
            {member.name}
          </h3>
          <span className="text-xs font-semibold text-[#86868B]">
            Specialist
          </span>
        </div>

        <p className="text-xs font-semibold text-[#0071E3]">
          {member.role}
        </p>
      </div>

      <p className="text-xs text-[#6E6E73] leading-relaxed font-normal">
        {member.bio}
      </p>
    </motion.div>
  );
};
