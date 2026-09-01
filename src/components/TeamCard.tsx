import React from 'react';
import { motion } from 'framer-motion';
import type { TeamMember } from '../data/team';
import { reveal, revealInitial, revealViewport } from '../lib/motion';

interface TeamCardProps {
  member: TeamMember;
  index: number;
}

export const TeamCard: React.FC<TeamCardProps> = ({ member, index }) => {
  return (
    <motion.div
      initial={revealInitial}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={revealViewport}
      transition={reveal(index)}
      className="apple-card p-6 sm:p-7 space-y-4 flex flex-col justify-between hover:shadow-lg hover:border-[#A9CEF7] transition-all duration-300 group"
    >
      <div className="space-y-4">
        {/* Photo / Initials Visual Area */}
        <div className="w-full aspect-square rounded-2xl bg-gradient-to-b from-[#EBF3FD] to-[#DEECFA] border border-[#CADDF4] flex flex-col items-center justify-center text-[#0C172B] gap-2.5 relative overflow-hidden group-hover:border-[#A9CEF7] transition-colors">
          {member.image ? (
            <>
              <img
                src={member.image}
                alt={member.name}
                className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${member.imagePosition || 'object-top'}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C172B]/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-mono text-white font-semibold shadow-xs">
                <span>SPECIALIST {member.placeholderId}</span>
              </div>
            </>
          ) : (
            <>
              <div className="w-14 h-14 rounded-2xl bg-white shadow-xs border border-[#BFDBFE] flex items-center justify-center text-[#0066D6] font-bold text-lg tracking-tight transition-transform group-hover:scale-105">
                {member.initials || member.placeholderId}
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-xs border border-[#BFDBFE] text-[10px] font-mono text-[#0066D6] font-semibold">
                <span>SPECIALIST {member.placeholderId}</span>
              </div>
            </>
          )}
        </div>

        <div className="space-y-1">
          <h3 className="text-base sm:text-lg font-bold text-[#0C172B] tracking-tight leading-snug">
            {member.name}
          </h3>

          <p className="text-xs font-semibold text-[#0066D6] tracking-tight leading-normal">
            {member.role}
          </p>
        </div>

        <p className="text-xs text-[#475569] leading-relaxed font-normal">
          {member.bio}
        </p>
      </div>
    </motion.div>
  );
};
export default TeamCard;
