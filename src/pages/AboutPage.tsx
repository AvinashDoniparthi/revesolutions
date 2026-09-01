import React, { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { SectionHeading } from '../components/SectionHeading';
import { TeamCard } from '../components/TeamCard';
import { Button } from '../components/Button';
import { LinePath } from '../components/Skiper19';
import { teamMembers } from '../data/team';
import { companyInfo } from '../data/companyInfo';

export const AboutPage: React.FC = () => {
  const navigate = useNavigate();
  const storyRef = useRef<HTMLDivElement>(null);
  
  // Track scroll strictly across the story & team section
  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ["start start", "end end"],
  });

  return (
    <div className="pb-20 pt-24 sm:pt-28 space-y-20 sm:space-y-28 relative">
      <SEOHead 
        title="About Us" 
        description="Four people. One dedicated design studio. Learn how Rêve Solutions helps businesses build and maintain professional websites."
      />

      {/* =========================================================================
          1. Story & Team Journey Section (Integrated with Skiper19 Scroll Line)
          ========================================================================= */}
      <div ref={storyRef} className="space-y-16 sm:space-y-24 relative overflow-hidden">
        
        {/* Dynamic Animated Scroll Stroke (Skiper 19) — Restricted to this journey */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex justify-center">
          <LinePath
            className="absolute -top-10 left-1/2 -translate-x-[45%] w-[1000px] sm:w-[1300px] lg:w-[1550px] max-w-none opacity-85"
            scrollYProgress={scrollYProgress}
            strokeColor="#0066D6"
            strokeWidth={14}
          />
        </div>

        {/* Cohesive Ambient Blue Atmosphere */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[300px] h-[140px] xs:w-[380px] xs:h-[180px] sm:w-[600px] sm:h-[280px] md:w-[700px] md:h-[330px] lg:w-[900px] lg:h-[420px] bg-gradient-to-b from-[#0066D6]/10 via-[#0066D6]/3 to-transparent rounded-full blur-[80px] sm:blur-[120px] lg:blur-[140px] pointer-events-none -z-10" />

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-5xl lg:text-[56px] tracking-tight max-w-4xl leading-[1.08]"
          >
            <span className="font-bold text-[#0C172B]">About Rêve Solutions.</span>{' '}
            <span className="font-semibold text-[#475569]">{companyInfo.aboutHeadline}</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
            className="text-base sm:text-lg text-[#475569] max-w-3xl leading-relaxed font-normal"
          >
            {companyInfo.aboutSubtext}
          </motion.p>
        </section>

        {/* Story / Philosophy Section — Luxury Slow Reveal */}
        <motion.section 
          initial={{ opacity: 0, y: 80, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          <div className="apple-card p-6 xs:p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center shadow-xl">
            
            <div className="lg:col-span-7 space-y-5">
              <span className="text-[11px] font-bold text-[#0066D6] uppercase tracking-wider bg-[#E5F1FF] border border-[#BFDBFE] px-3.5 py-1 rounded-full inline-block shadow-2xs">
                WHY WE FOCUS EXCLUSIVELY ON WEBSITES
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0C172B] leading-tight tracking-tight">
                We started Rêve Solutions to solve the ongoing website management problem.
              </h2>
              <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-normal">
                Most web designers build a site, hand over the login credentials, and disappear. Over time, business owners find themselves stuck dealing with broken links, outdated copy, formatting errors, and technical fixes they don't have time to manage.
              </p>
              <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-normal">
                Rêve Solutions is a dedicated website company built to solve this exact issue. We build your website, deploy it, and then manage it for you every month. You can hand over your website to us and focus entirely on running your business.
              </p>
            </div>

            <div className="lg:col-span-5 p-5 xs:p-6 sm:p-8 rounded-2xl bg-[#EAF3FD] border border-[#BFDBFE] space-y-4">
              <h3 className="text-base font-bold text-[#0C172B]">Our Commitment to Clients:</h3>
              <ul className="space-y-3.5 text-xs sm:text-sm text-[#0C172B]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4.5 h-4.5 text-[#0066D6] shrink-0 mt-0.5" />
                  <span>One predictable monthly service for complete website care.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4.5 h-4.5 text-[#0066D6] shrink-0 mt-0.5" />
                  <span>Fast response times for text changes, images, and updates.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4.5 h-4.5 text-[#0066D6] shrink-0 mt-0.5" />
                  <span>Routine technical maintenance, bug fixes, and speed checks.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4.5 h-4.5 text-[#0066D6] shrink-0 mt-0.5" />
                  <span>Long-term team relationship — we stay with your website after launch.</span>
                </li>
              </ul>
            </div>

          </div>
        </motion.section>

        {/* TEAM SECTION — Staggered Pro Float In */}
        <motion.section 
          initial={{ opacity: 0, y: 80, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10"
        >
          <SectionHeading
            title="The specialist team."
            subtitle="Four people dedicated to website design, code, and care."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: index * 0.12 }}
              >
                <TeamCard member={member} index={index} />
              </motion.div>
            ))}
          </div>
        </motion.section>

      </div>

      {/* =========================================================================
          2. Standalone CTA Footer Box (Clean, separate section without line animation)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-6 xs:p-8 sm:p-12 lg:p-14 rounded-3xl bg-gradient-to-br from-[#061226] via-[#0B1E40] to-[#040C1A] text-white text-center space-y-5 shadow-2xl border border-[#1A4B8C] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#0066D6]/30 rounded-full blur-[90px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#004EA8]/30 rounded-full blur-[90px] pointer-events-none" />

          <span className="text-xs font-bold uppercase tracking-wider text-white bg-[#0066D6] px-4 py-1.5 rounded-full inline-block shadow-md shadow-[#0066D6]/35 relative z-10">
            WORK WITH US
          </span>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white relative z-10">
            Ready to hand over your website care?
          </h3>
          <p className="text-sm sm:text-base text-[#D0E2FF] max-w-lg mx-auto font-normal leading-relaxed relative z-10">
            Talk with our specialist team to discuss building a new site or managing your current website setup.
          </p>
          <div className="pt-2 relative z-10">
            <Button variant="white" size="lg" showArrow onClick={() => navigate('/contact')}>
              Let's Talk
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
export default AboutPage;
