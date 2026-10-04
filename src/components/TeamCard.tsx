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
      className="apple-card p-6 sm:p-7 space-y-4 flex flex-col justify-between hover:shadow-lg hover:border-line-hover transition-all duration-300 group"
    >
      <div className="space-y-4">
        {/* Photo / Initials Visual Area */}
        <div className="w-full aspect-square rounded-2xl bg-gradient-to-b from-brand-tint to-line border border-line flex flex-col items-center justify-center text-ink relative overflow-hidden group-hover:border-line-hover transition-colors">
          {member.image ? (
            <img
              src={member.image}
              alt={member.name}
              loading="lazy"
              decoding="async"
              width={512}
              height={512}
              className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${member.imagePosition || 'object-top'}`}
            />
          ) : (
            <div className="w-14 h-14 rounded-2xl bg-surface shadow-xs border border-line-strong flex items-center justify-center text-brand font-bold text-lg tracking-tight transition-transform group-hover:scale-105">
              {member.initials}
            </div>
          )}
        </div>

        <div className="space-y-1">
          <h3 className="text-base sm:text-lg font-bold text-ink tracking-tight leading-snug">
            {member.name}
          </h3>

          <p className="text-xs font-semibold text-brand tracking-tight leading-normal">
            {member.role}
          </p>
        </div>

        <p className="text-xs text-ink-2 leading-relaxed font-normal">
          {member.bio}
        </p>
      </div>
    </motion.div>
  );
};
export default TeamCard;
