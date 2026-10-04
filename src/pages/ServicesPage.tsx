import React from 'react';
import { duration, ease, transition } from '../lib/motion';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '../components/Button';
import { websiteServices } from '../data/services';
import { FaqSection } from '../components/FaqSection';

export const ServicesPage: React.FC = () => {
  return (
    <div className="space-y-16 sm:space-y-24 pb-20 pt-24 sm:pt-28 relative">
      {/* Cohesive Ambient Blue Atmosphere */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[300px] h-[140px] xs:w-[380px] xs:h-[180px] sm:w-[600px] sm:h-[280px] md:w-[700px] md:h-[330px] lg:w-[900px] lg:h-[420px] bg-gradient-to-b from-gold/25 via-gold/10 to-transparent rounded-full blur-[80px] sm:blur-[120px] lg:blur-[140px] pointer-events-none -z-10" />


      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition('slow'), ease: ease.entrance, delay: 0.05 }}
          className="text-3xl sm:text-5xl lg:text-display tracking-tight max-w-4xl leading-[1.08]"
        >
          <span className="font-bold text-ink">Services.</span>{' '}
          <span className="font-semibold text-ink-2">Everything your website needs, from the first design to ongoing care.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition('slow'), ease: ease.entrance, delay: 0.1 }}
          className="text-base sm:text-lg text-ink-2 max-w-3xl leading-relaxed font-normal"
        >
          We build, launch, and continuously manage business websites so you never have to worry about updates, maintenance, or technical headaches again.
        </motion.p>
      </section>

      {/* Services List Breakdown */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 overflow-hidden">
        {websiteServices.map((service, index) => {
          // Alternating entry: Right (0), Left (1), Right (2), Left (3)
          const isFromRight = index % 2 === 0;
          const initialX = isFromRight ? 80 : -80;

          return (
            <motion.div
              key={service.id}
              id={service.id}
              initial={{ opacity: 0, x: initialX }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: duration.entrance,
                ease: ease.entrance,
              }}
              className="apple-card p-6 xs:p-8 sm:p-12 space-y-8 shadow-xl hover:border-line-hover transition-all"
            >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Title & Description */}
              <div className="lg:col-span-5 space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
                  {service.title}
                </h2>

                <p className="text-sm font-semibold text-brand">
                  {service.tagline}
                </p>

                <p className="text-sm text-ink-2 leading-relaxed font-normal">
                  {service.description}
                </p>

                <div className="pt-2">
                  <Button
                    variant="primary"
                    size="sm"
                    showArrow
                    to="/contact"
                  >
                    Let's Talk
                  </Button>
                </div>
              </div>

              {/* Right Column: Scope Included & Business Value */}
              <div className="lg:col-span-7 space-y-4 lg:pl-4">
                <div className="p-5 xs:p-6 rounded-2xl bg-brand-tint border border-line-strong space-y-3">
                  <h3 className="text-sm font-bold text-ink">
                    What is included
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.features.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-center gap-2.5 text-xs text-ink font-medium">
                        <CheckCircle2 className="w-4.5 h-4.5 text-brand shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-brand-tint/60 border border-line-strong space-y-1">
                  <h4 className="text-sm font-bold text-brand">
                    What it does for your business
                  </h4>
                  <p className="text-xs text-ink-2 leading-relaxed font-normal">
                    {service.businessBenefit}
                  </p>
                </div>
              </div>

            </div>
          </motion.div>
        );
      })}
      </section>

      <FaqSection />



      {/* Closing call to action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 xs:p-8 sm:p-12 lg:p-14 rounded-3xl bg-gradient-to-br from-night via-night-2 to-night-3 text-white text-center space-y-5 shadow-2xl border border-night-line relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold/25 rounded-full blur-[90px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand/25 rounded-full blur-[90px] pointer-events-none" />

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white relative z-10">
            Need someone to take care of your website?
          </h3>
          <p className="text-sm sm:text-base text-night-ink max-w-xl mx-auto font-normal leading-relaxed relative z-10">
            Whether starting a new build or handing over an existing website, we're ready to look after it so you can focus on your business.
          </p>
          <div className="pt-2 relative z-10">
            <Button variant="white" size="lg" showArrow to="/contact">
              Let's Talk
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
export default ServicesPage;
