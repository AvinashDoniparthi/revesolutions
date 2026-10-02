import React from 'react';
import { ease, transition } from '../lib/motion';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const destinations = [
  { to: '/', label: 'Home', blurb: 'What we do and how it works.' },
  { to: '/services', label: 'Services', blurb: 'Development, management, maintenance and support.' },
  { to: '/about', label: 'About', blurb: 'The four people behind the studio.' },
  { to: '/contact', label: 'Contact', blurb: 'Talk to us about your website.' },
];

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[100dvh] pb-20 pt-24 sm:pt-28 relative">
      {/* Cohesive Ambient Blue Atmosphere */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[300px] h-[140px] xs:w-[380px] xs:h-[180px] sm:w-[600px] sm:h-[280px] md:w-[700px] md:h-[330px] lg:w-[900px] lg:h-[420px] bg-gradient-to-b from-brand/10 via-brand/5 to-transparent rounded-full blur-[80px] sm:blur-[120px] lg:blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition('slow'), ease: ease.entrance }}
          className="space-y-3 max-w-3xl"
        >
          <h1 className="text-3xl sm:text-5xl lg:text-display tracking-tight leading-[1.08]">
            <span className="font-bold text-ink">Page not found.</span>{' '}
            <span className="font-semibold text-ink-2">This one got away from us.</span>
          </h1>

          <p className="text-base sm:text-lg text-ink-2 max-w-2xl leading-relaxed font-normal">
            The page you were after does not exist, or it has moved. Broken links are exactly the
            sort of thing we fix for our clients. Here is where to go instead.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition('slow'), ease: ease.entrance, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl"
        >
          {destinations.map((destination) => (
            <Link
              key={destination.to}
              to={destination.to}
              className="apple-card p-6 sm:p-8 space-y-1.5 shadow-xl transition-transform duration-300 hover:-translate-y-1"
            >
              <h2 className="text-xl font-bold text-ink tracking-tight">{destination.label}</h2>
              <p className="text-sm text-ink-2 font-normal leading-relaxed">{destination.blurb}</p>
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
