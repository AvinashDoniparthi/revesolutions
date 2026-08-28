import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { SectionHeading } from '../components/SectionHeading';
import { TeamCard } from '../components/TeamCard';
import { Button } from '../components/Button';
import { teamMembers } from '../data/team';
import { companyInfo } from '../data/companyInfo';

export const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 pt-24 sm:pt-28">
      <SEOHead 
        title="About Us" 
        description="Four people. One dedicated design studio. Learn how Rêve Solutions helps businesses build and maintain professional websites."
      />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <span className="text-xs font-semibold uppercase tracking-wider text-[#86868B]">
            OUR STORY & STUDIO
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: 0.05 }}
          className="text-3xl sm:text-5xl lg:text-[52px] tracking-tight max-w-4xl leading-[1.08]"
        >
          <span className="font-bold text-[#1D1D1F]">About Rêve.</span>{' '}
          <span className="font-semibold text-[#6E6E73]">{companyInfo.aboutHeadline}</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: 0.1 }}
          className="text-base sm:text-lg text-[#6E6E73] max-w-3xl leading-relaxed font-normal"
        >
          {companyInfo.aboutSubtext}
        </motion.p>
      </section>

      {/* Story / Philosophy Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="apple-card p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center shadow-xl">
          
          <div className="lg:col-span-7 space-y-5">
            <span className="text-[11px] font-semibold text-[#0071E3] uppercase tracking-wider bg-[#F5F5F7] px-3 py-1 rounded-full inline-block">
              WHY WE FOCUS EXCLUSIVELY ON WEBSITES
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1D1D1F] leading-tight tracking-tight">
              We started Rêve Solutions to solve the ongoing website management problem.
            </h2>
            <p className="text-[#6E6E73] text-sm sm:text-base leading-relaxed font-normal">
              Most web designers build a site, hand over the login credentials, and disappear. Over time, business owners find themselves stuck dealing with broken links, outdated copy, formatting errors, and technical fixes they don't have time to manage.
            </p>
            <p className="text-[#6E6E73] text-sm sm:text-base leading-relaxed font-normal">
              Rêve Solutions is a dedicated website company built to solve this exact issue. We build your website, deploy it, and then manage it for you every month. You can hand over your website to us and focus entirely on running your business.
            </p>
          </div>

          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-[#F5F5F7] space-y-4">
            <h3 className="text-base font-bold text-[#1D1D1F]">Our Commitment to Clients:</h3>
            <ul className="space-y-3.5 text-xs sm:text-sm text-[#1D1D1F]">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#0071E3] shrink-0 mt-0.5" />
                <span>One predictable monthly service for complete website care.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#0071E3] shrink-0 mt-0.5" />
                <span>Fast response times for text changes, images, and updates.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#0071E3] shrink-0 mt-0.5" />
                <span>Routine technical maintenance, bug fixes, and speed checks.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#0071E3] shrink-0 mt-0.5" />
                <span>Long-term team relationship — we stay with your website after launch.</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <SectionHeading
          title="The specialist team."
          subtitle="Four people dedicated to website design, code, and care."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <TeamCard key={member.id} member={member} index={index} />
          ))}
        </div>
      </section>

      {/* CTA Footer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="apple-card p-8 sm:p-12 lg:p-14 bg-white text-center space-y-5 shadow-xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#86868B] block">
            WORK WITH US
          </span>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#1D1D1F]">
            Ready to hand over your website care?
          </h3>
          <p className="text-sm sm:text-base text-[#6E6E73] max-w-lg mx-auto font-normal leading-relaxed">
            Talk with our specialist team to discuss building a new site or managing your current website setup.
          </p>
          <div className="pt-2">
            <Button variant="primary" size="lg" showArrow onClick={() => navigate('/contact')}>
              Let's Talk
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
