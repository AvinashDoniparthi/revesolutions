import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const destinations = [
  { to: '/', label: 'Home', blurb: 'What we do and how the monthly plan works.' },
  { to: '/services', label: 'Services', blurb: 'Development, management, maintenance and support.' },
  { to: '/about', label: 'About', blurb: 'The four people behind the studio.' },
  { to: '/contact', label: 'Contact', blurb: 'Talk to a specialist about your website.' },
];

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen pb-20 pt-24 sm:pt-28 relative">
      {/* Cohesive Ambient Blue Atmosphere */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[300px] h-[140px] xs:w-[380px] xs:h-[180px] sm:w-[600px] sm:h-[280px] md:w-[700px] md:h-[330px] lg:w-[900px] lg:h-[420px] bg-gradient-to-b from-[#0066D6]/10 via-[#0066D6]/3 to-transparent rounded-full blur-[80px] sm:blur-[120px] lg:blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="space-y-3 max-w-3xl"
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0066D6] bg-[#E5F1FF] border border-[#BFDBFE] px-3.5 py-1 rounded-full inline-block shadow-2xs">
              ERROR 404
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-[52px] tracking-tight leading-[1.08]">
            <span className="font-bold text-[#0C172B]">Page not found.</span>{' '}
            <span className="font-semibold text-[#475569]">This one got away from us.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#475569] max-w-2xl leading-relaxed font-normal">
            The page you were after does not exist, or it has moved. Broken links are exactly the
            sort of thing we fix for our clients every month — here is where to go instead.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl"
        >
          {destinations.map((destination) => (
            <Link
              key={destination.to}
              to={destination.to}
              className="apple-card p-6 sm:p-8 space-y-1.5 shadow-xl transition-transform duration-300 hover:-translate-y-1"
            >
              <h2 className="text-xl font-bold text-[#0C172B] tracking-tight">{destination.label}</h2>
              <p className="text-sm text-[#475569] font-normal leading-relaxed">{destination.blurb}</p>
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
