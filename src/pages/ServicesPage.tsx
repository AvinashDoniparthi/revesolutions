import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Button } from '../components/Button';
import { websiteServices } from '../data/services';

export const ServicesPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 pt-24 sm:pt-28 relative">
      {/* Cohesive Ambient Blue Atmosphere */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[300px] h-[140px] xs:w-[380px] xs:h-[180px] sm:w-[600px] sm:h-[280px] md:w-[700px] md:h-[330px] lg:w-[900px] lg:h-[420px] bg-gradient-to-b from-[#0066D6]/10 via-[#0066D6]/3 to-transparent rounded-full blur-[80px] sm:blur-[120px] lg:blur-[140px] pointer-events-none -z-10" />

      <SEOHead 
        title="Services" 
        description="Website Development, Website Management, Website Maintenance, and Ongoing Support for business websites."
      />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <span className="text-xs font-bold uppercase tracking-wider text-[#0066D6] bg-[#E5F1FF] border border-[#BFDBFE] px-3.5 py-1 rounded-full inline-block shadow-2xs">
            OUR STUDIO OFFERINGS
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: 0.05 }}
          className="text-3xl sm:text-5xl lg:text-[52px] tracking-tight max-w-4xl leading-[1.08]"
        >
          <span className="font-bold text-[#0C172B]">Services.</span>{' '}
          <span className="font-semibold text-[#475569]">Everything your website needs — from the first design to ongoing care.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: 0.1 }}
          className="text-base sm:text-lg text-[#475569] max-w-3xl leading-relaxed font-normal"
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
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="apple-card p-6 xs:p-8 sm:p-12 space-y-8 shadow-xl hover:border-[#A9CEF7] transition-all"
            >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Title & Description */}
              <div className="lg:col-span-5 space-y-4">
                <span className="text-[11px] font-bold text-[#0066D6] uppercase tracking-wider bg-[#E5F1FF] border border-[#BFDBFE] px-3.5 py-1 rounded-full inline-block shadow-2xs">
                  Service 0{index + 1}
                </span>

                <h2 className="text-2xl sm:text-3xl font-bold text-[#0C172B] tracking-tight">
                  {service.title}
                </h2>

                <p className="text-sm font-bold text-[#0066D6]">
                  "{service.tagline}"
                </p>

                <p className="text-sm text-[#475569] leading-relaxed font-normal">
                  {service.description}
                </p>

                <div className="pt-2">
                  <Button 
                    variant="primary" 
                    size="sm" 
                    showArrow
                    onClick={() => navigate('/contact')}
                  >
                    Inquire About {service.title}
                  </Button>
                </div>
              </div>

              {/* Right Column: Scope Included & Business Value */}
              <div className="lg:col-span-7 space-y-4 lg:pl-4">
                <div className="p-5 xs:p-6 rounded-2xl bg-[#EAF3FD] border border-[#BFDBFE] space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#0C172B]">
                    Scope Included:
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.features.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-center gap-2.5 text-xs text-[#0C172B] font-medium">
                        <CheckCircle2 className="w-4.5 h-4.5 text-[#0066D6] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-[#E5F1FF]/60 border border-[#BFDBFE] space-y-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#0066D6]">
                    Business Value
                  </h4>
                  <p className="text-xs text-[#475569] leading-relaxed font-normal">
                    {service.businessBenefit}
                  </p>
                </div>
              </div>

            </div>
          </motion.div>
        );
      })}
      </section>

      {/* Footer Banner — Midnight Sapphire Luxury */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 xs:p-8 sm:p-12 lg:p-14 rounded-3xl bg-gradient-to-br from-[#061226] via-[#0B1E40] to-[#040C1A] text-white text-center space-y-5 shadow-2xl border border-[#1A4B8C] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#0066D6]/30 rounded-full blur-[90px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#004EA8]/30 rounded-full blur-[90px] pointer-events-none" />

          <span className="text-xs font-bold uppercase tracking-wider text-white bg-[#0066D6] px-4 py-1.5 rounded-full inline-block shadow-md shadow-[#0066D6]/35 relative z-10">
            SPECIALIST CARE
          </span>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white relative z-10">
            Need someone to take care of your website?
          </h3>
          <p className="text-sm sm:text-base text-[#D0E2FF] max-w-xl mx-auto font-normal leading-relaxed relative z-10">
            Whether starting a new build or handing over an existing website, we're ready to manage it every month so you can focus on your business.
          </p>
          <div className="pt-2 relative z-10">
            <Button variant="white" size="lg" showArrow onClick={() => navigate('/contact')}>
              Let's Talk About Your Website
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
export default ServicesPage;
