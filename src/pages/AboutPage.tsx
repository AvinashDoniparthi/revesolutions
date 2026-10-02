import React, { useRef } from 'react';
import { duration, ease } from '../lib/motion';
import { motion, useReducedMotion, useScroll } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { TeamCard } from '../components/TeamCard';
import { Button } from '../components/Button';
import { LinePath } from '../components/Skiper19';
import { teamMembers } from '../data/team';
import { companyInfo } from '../data/companyInfo';

export const AboutPage: React.FC = () => {
  const storyRef = useRef<HTMLDivElement>(null);

  /**
   * `MotionConfig reducedMotion="user"` in App.tsx drops transform animations
   * on its own, but not `filter`, so the blur reveals on this page have to be
   * gated by hand.
   */
  const prefersReducedMotion = useReducedMotion();

  // Track scroll strictly across the story & team section
  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ["start start", "end end"],
  });

  return (
    <div className="pb-20 pt-24 sm:pt-28 space-y-20 sm:space-y-28 relative">

      {/* =========================================================================
          1. Story & Team Journey Section (Integrated with Skiper19 Scroll Line)
          ========================================================================= */}
      <div ref={storyRef} className="space-y-16 sm:space-y-24 relative overflow-hidden">
        
        {/* Scroll-drawn stroke (Skiper 19), scoped to this journey only */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex justify-center">
          <LinePath
            className="absolute -top-10 left-1/2 -translate-x-[45%] w-[1000px] sm:w-[1300px] lg:w-[1550px] max-w-none opacity-85"
            scrollYProgress={scrollYProgress}
            strokeColor="var(--color-brand)"
            strokeWidth={14}
          />
        </div>

        {/* Cohesive Ambient Blue Atmosphere */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[300px] h-[140px] xs:w-[380px] xs:h-[180px] sm:w-[600px] sm:h-[280px] md:w-[700px] md:h-[330px] lg:w-[900px] lg:h-[420px] bg-gradient-to-b from-brand/10 via-brand/5 to-transparent rounded-full blur-[80px] sm:blur-[120px] lg:blur-[140px] pointer-events-none -z-10" />

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10">
          <motion.h1 
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: duration.entrance, ease: ease.entrance }}
            className="text-3xl sm:text-5xl lg:text-display tracking-tight max-w-4xl leading-[1.08]"
          >
            <span className="font-bold text-ink">About Rêve Solutions.</span>{' '}
            <span className="font-semibold text-ink-2">{companyInfo.aboutHeadline}</span>
          </motion.h1>

          <motion.p 
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: duration.entrance, ease: ease.entrance, delay: 0.18 }}
            className="text-base sm:text-lg text-ink-2 max-w-3xl leading-relaxed font-normal"
          >
            {companyInfo.aboutSubtext}
          </motion.p>
        </section>

        {/* Story / philosophy section */}
        <motion.section 
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 80, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: duration.entrance, ease: ease.entrance }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          <div className="apple-card p-6 xs:p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center shadow-xl">
            
            <div className="lg:col-span-7 space-y-5">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-ink leading-tight tracking-tight">
                We started Rêve Solutions to solve the ongoing website management problem.
              </h2>
              <p className="text-ink-2 text-sm sm:text-base leading-relaxed font-normal">
                Most web designers build a site, hand over the login credentials, and disappear. Over time, business owners find themselves stuck dealing with broken links, outdated copy, formatting errors, and technical fixes they don't have time to manage.
              </p>
              <p className="text-ink-2 text-sm sm:text-base leading-relaxed font-normal">
                Rêve Solutions is a dedicated website company built to solve this exact issue. We build your website, deploy it, and then look after it for you from there. You can hand over your website to us and focus entirely on running your business.
              </p>
            </div>

            <div className="lg:col-span-5 p-5 xs:p-6 sm:p-8 rounded-2xl bg-brand-tint border border-line-strong space-y-4">
              <h3 className="text-base font-bold text-ink">Our Commitment to Clients:</h3>
              <ul className="space-y-3.5 text-xs sm:text-sm text-ink">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4.5 h-4.5 text-brand shrink-0 mt-0.5" />
                  <span>One clear price to build it, and a separate quote to look after it.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4.5 h-4.5 text-brand shrink-0 mt-0.5" />
                  <span>Fast response times for text changes, images, and updates.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4.5 h-4.5 text-brand shrink-0 mt-0.5" />
                  <span>Routine technical maintenance, bug fixes, and speed checks.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4.5 h-4.5 text-brand shrink-0 mt-0.5" />
                  <span>A long-term relationship. We stay with your website after launch.</span>
                </li>
              </ul>
            </div>

          </div>
        </motion.section>

        {/* Team section */}
        <motion.section 
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 80, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: duration.entrance, ease: ease.entrance }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10"
        >
          <SectionHeading
            title="The team."
            subtitle="Four people dedicated to website design, code, and care."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <TeamCard key={member.id} member={member} index={index} />
            ))}
          </div>
        </motion.section>

      </div>

      {/* =========================================================================
          2. Standalone CTA Footer Box (Clean, separate section without line animation)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-6 xs:p-8 sm:p-12 lg:p-14 rounded-3xl bg-gradient-to-br from-night via-night-2 to-night-3 text-white text-center space-y-5 shadow-2xl border border-night-line relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand/30 rounded-full blur-[90px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-deep/30 rounded-full blur-[90px] pointer-events-none" />

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white relative z-10">
            Ready to hand over your website care?
          </h3>
          <p className="text-sm sm:text-base text-night-ink max-w-lg mx-auto font-normal leading-relaxed relative z-10">
            Talk to us about building a new site, or about taking over the one you already have.
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
export default AboutPage;
