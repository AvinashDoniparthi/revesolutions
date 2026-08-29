import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Button } from '../components/Button';
import { websiteServices } from '../data/services';
import { reveal, revealInitial, revealViewport } from '../lib/motion';

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
    <div className="space-y-16 sm:space-y-24 pb-20 pt-24 sm:pt-28">
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
          <span className="text-xs font-semibold uppercase tracking-wider text-[#86868B]">
            OUR STUDIO OFFERINGS
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: 0.05 }}
          className="text-3xl sm:text-5xl lg:text-[52px] tracking-tight max-w-4xl leading-[1.08]"
        >
          <span className="font-bold text-[#1D1D1F]">Services.</span>{' '}
          <span className="font-semibold text-[#6E6E73]">Everything your website needs — from the first design to ongoing care.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: 0.1 }}
          className="text-base sm:text-lg text-[#6E6E73] max-w-3xl leading-relaxed font-normal"
        >
          We build, launch, and continuously manage business websites so you never have to worry about updates, maintenance, or technical headaches again.
        </motion.p>
      </section>

      {/* Services List Breakdown */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {websiteServices.map((service, index) => (
          <motion.div
            key={service.id}
            id={service.id}
            initial={revealInitial}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={revealViewport}
            transition={reveal(index)}
            className="apple-card p-8 sm:p-12 space-y-8 shadow-xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Title & Description */}
              <div className="lg:col-span-5 space-y-4">
                <span className="text-[11px] font-semibold text-[#0071E3] uppercase tracking-wider bg-[#F5F5F7] px-3 py-1 rounded-full inline-block">
                  Service 0{index + 1}
                </span>

                <h2 className="text-2xl sm:text-3xl font-bold text-[#1D1D1F] tracking-tight">
                  {service.title}
                </h2>

                <p className="text-sm font-medium text-[#0071E3]">
                  "{service.tagline}"
                </p>

                <p className="text-sm text-[#6E6E73] leading-relaxed font-normal">
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
                <div className="p-6 rounded-2xl bg-[#F5F5F7] space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#1D1D1F]">
                    Scope Included:
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.features.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-center gap-2.5 text-xs text-[#1D1D1F] font-medium">
                        <CheckCircle2 className="w-4 h-4 text-[#0071E3] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-[#F5F5F7] space-y-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#0071E3]">
                    Business Value
                  </h4>
                  <p className="text-xs text-[#6E6E73] leading-relaxed font-normal">
                    {service.businessBenefit}
                  </p>
                </div>
              </div>

            </div>
          </motion.div>
        ))}
      </section>

      {/* Footer Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="apple-card p-8 sm:p-12 lg:p-14 bg-white text-center space-y-5 shadow-xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#86868B] block">
            SPECIALIST CARE
          </span>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#1D1D1F]">
            Need someone to take care of your website?
          </h3>
          <p className="text-sm sm:text-base text-[#6E6E73] max-w-xl mx-auto font-normal leading-relaxed">
            Whether starting a new build or handing over an existing website, we're ready to manage it every month so you can focus on your business.
          </p>
          <div className="pt-2">
            <Button variant="primary" size="lg" showArrow onClick={() => navigate('/contact')}>
              Let's Talk About Your Website
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
