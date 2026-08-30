import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Paintbrush, 
  Users, 
  Clock 
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Button } from '../components/Button';
import { SectionHeading } from '../components/SectionHeading';
import { ServiceCard } from '../components/ServiceCard';
import { HeroWebsiteMockup } from '../components/HeroWebsiteMockup';
import { RoundCarousel } from '../components/RoundCarousel';
import { CoverflowCarousel } from '../components/CoverflowCarousel';
import { ProcessStepCard } from '../components/ProcessStep';
import { websiteServices } from '../data/services';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 pt-24 sm:pt-28 relative">
      {/* Cohesive Ambient Blue Atmosphere Orbs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[420px] bg-gradient-to-b from-[#0066D6]/10 via-[#0066D6]/3 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />

      <SEOHead 
        title="Home" 
        description="Rêve Solutions — Your website. Fully built and managed by real people."
      />

      {/* =========================================================================
          1. APPLE STORE HERO & 3D ROUND SERVICES CAROUSEL
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-6 border-b border-[#D5E4F5]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="max-w-3xl space-y-2"
          >
            <h1 className="text-3xl sm:text-5xl lg:text-[54px] tracking-tight leading-[1.08]">
              <span className="font-bold text-[#0C172B]">Websites.</span>{' '}
              <span className="font-semibold text-[#475569]">The best way to build and manage your site.</span>
            </h1>
          </motion.div>
        </div>

        {/* Rectangular 3D Conveyor Services Animation */}
        <div className="pt-6 pb-2 w-full h-[260px] sm:h-[300px] lg:h-[320px] relative overflow-hidden">
          <RoundCarousel
            cardWidth={285}
            cardHeight={165}
            gap={34}
            speed={0.7}
            direction="right"
            cornerRadius={24}
          />
        </div>
      </section>

      {/* =========================================================================
          2. "THE LATEST" — LARGE APPLE STORE WIDGET CARDS
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <SectionHeading
          title="The latest."
          subtitle="Take a look at what's new and crafted for your business."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Card 1: Full-width / 7-col Interactive Studio Mockup Card */}
          <div className="lg:col-span-7 apple-card p-8 sm:p-10 space-y-6 flex flex-col justify-between hover:border-[#A9CEF7] transition-all">
            <div className="space-y-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0066D6] bg-[#E5F1FF] border border-[#BFDBFE] px-3.5 py-1 rounded-full inline-block shadow-2xs">
                CUSTOM WEB STUDIO
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0C172B] tracking-tight leading-snug">
                Handcrafted design.<br />
                Tailored specifically for your business.
              </h2>
              <p className="text-sm text-[#475569] max-w-lg leading-relaxed font-normal">
                We write clean, bespoke code to deliver ultra-fast loading speeds, pristine mobile responsiveness, and high conversion rates.
              </p>
            </div>

            <div className="pt-2">
              <HeroWebsiteMockup />
            </div>
          </div>

          {/* Right Column: 2 Stacked Apple Widget Cards (5-col) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Card 2: Monthly Care Apple Widget */}
            <div className="apple-card p-8 space-y-4 flex-1 flex flex-col justify-between hover:border-[#A9CEF7] transition-all">
              <div className="space-y-2.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0066D6] bg-[#E5F1FF] border border-[#BFDBFE] px-3.5 py-1 rounded-full inline-block shadow-2xs">
                  DEDICATED CARE
                </span>
                <h3 className="text-2xl font-bold text-[#0C172B] tracking-tight">
                  Unlimited monthly edits. Hand over your website.
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed">
                  Need new pictures, text changes, seasonal promos, or layout tweaks? Simply message us and our team handles it promptly.
                </p>
              </div>

              <div className="pt-4 border-t border-[#D5E4F5] flex items-center justify-between">
                <span className="text-xs text-[#0066D6] font-semibold">One simple monthly plan</span>
                <Button variant="primary" size="sm" onClick={() => navigate('/contact')}>
                  Inquire Now
                </Button>
              </div>
            </div>

            {/* Card 3: Performance & SEO Widget */}
            <div className="apple-card p-8 space-y-4 flex-1 flex flex-col justify-between hover:border-[#A9CEF7] transition-all">
              <div className="space-y-2.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0066D6] bg-[#E5F1FF] border border-[#BFDBFE] px-3.5 py-1 rounded-full inline-block shadow-2xs">
                  SPEED &amp; SECURITY
                </span>
                <h3 className="text-2xl font-bold text-[#0C172B] tracking-tight">
                  100/100 PageSpeed &amp; bulletproof hosting.
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed">
                  Fast sites rank higher on Google and convert more visitors. Daily automated backups and SSL security included.
                </p>
              </div>

              <div className="pt-4 border-t border-[#D5E4F5]">
                <Link to="/services#website-maintenance" className="text-xs font-semibold text-[#0066D6] hover:underline flex items-center gap-1">
                  <span>See security &amp; performance details</span>
                  <span aria-hidden="true">&gt;</span>
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          3. "THE RÊVE DIFFERENCE" — 4 FEATURE WIDGET CARDS
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <SectionHeading
          title="The Rêve difference."
          subtitle="Even more reasons to partner with our web studio."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="apple-card p-7 space-y-3 hover:border-[#A9CEF7] transition-all">
            <div className="w-11 h-11 rounded-2xl bg-[#E5F1FF] border border-[#BFDBFE] flex items-center justify-center text-[#0066D6] shadow-xs">
              <Paintbrush className="w-5 h-5 text-[#0066D6]" />
            </div>
            <h3 className="text-lg font-bold text-[#0C172B] tracking-tight">Handcrafted Code</h3>
            <p className="text-xs text-[#475569] leading-relaxed">
              No bloated drag-and-drop page builders. Pure clean code optimized for Google search and speed.
            </p>
          </div>

          <div className="apple-card p-7 space-y-3 hover:border-[#A9CEF7] transition-all">
            <div className="w-11 h-11 rounded-2xl bg-[#E5F1FF] border border-[#BFDBFE] flex items-center justify-center text-[#0066D6] shadow-xs">
              <Users className="w-5 h-5 text-[#0066D6]" />
            </div>
            <h3 className="text-lg font-bold text-[#0C172B] tracking-tight">Dedicated Team</h3>
            <p className="text-xs text-[#475569] leading-relaxed">
              Work directly with human web designers and developers who know your website inside and out.
            </p>
          </div>

          <div className="apple-card p-7 space-y-3 hover:border-[#A9CEF7] transition-all">
            <div className="w-11 h-11 rounded-2xl bg-[#E5F1FF] border border-[#BFDBFE] flex items-center justify-center text-[#0066D6] shadow-xs">
              <CheckCircle2 className="w-5 h-5 text-[#0066D6]" />
            </div>
            <h3 className="text-lg font-bold text-[#0C172B] tracking-tight">Predictable Fee</h3>
            <p className="text-xs text-[#475569] leading-relaxed">
              One transparent monthly subscription. Zero surprise bills, maintenance invoices, or hourly charges.
            </p>
          </div>

          <div className="apple-card p-7 space-y-3 hover:border-[#A9CEF7] transition-all">
            <div className="w-11 h-11 rounded-2xl bg-[#E5F1FF] border border-[#BFDBFE] flex items-center justify-center text-[#0066D6] shadow-xs">
              <Clock className="w-5 h-5 text-[#0066D6]" />
            </div>
            <h3 className="text-lg font-bold text-[#0C172B] tracking-tight">24h Fast Edits</h3>
            <p className="text-xs text-[#475569] leading-relaxed">
              Fast turnaround on content updates, new pages, and media updates whenever you request them.
            </p>
          </div>

        </div>
      </section>

      {/* =========================================================================
          4. SERVICES OVERVIEW
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <SectionHeading
          title="Services."
          subtitle="Everything your website needs from design to ongoing care."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {websiteServices.map((service, index) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              features={service.features}
              index={index}
              onClick={() => navigate('/services')}
            />
          ))}
        </div>
      </section>

      {/* =========================================================================
          5. WEBSITE SHOWCASE (3D COVERFLOW GALLERY)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <SectionHeading
          title="Showcase."
          subtitle="A gallery of websites handcrafted and managed by our studio."
        />

        <div className="w-full h-[360px] sm:h-[430px] lg:h-[470px] relative rounded-3xl overflow-hidden border border-[#C5DFFD] shadow-sm bg-gradient-to-b from-white to-[#F2F7FD]">
          <CoverflowCarousel
            autoplay={true}
            showArrows={true}
            arrowColor="#0C172B"
            arrowBackground="rgba(255, 255, 255, 0.95)"
            arrowSize={46}
          />
        </div>
      </section>

      {/* =========================================================================
          6. HOW IT WORKS
          ========================================================================= */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <SectionHeading
          title="How it works."
          subtitle="Three simple steps to website peace of mind."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ProcessStepCard
            step="01"
            title="1. We Build"
            description="We design and code a custom website tailored specifically to your business, brand, and target audience."
            index={0}
          />
          <ProcessStepCard
            step="02"
            title="2. We Launch"
            description="We configure domain settings, optimize performance, run security tests, and publish your website live."
            index={1}
          />
          <ProcessStepCard
            step="03"
            title="3. We Manage Everything"
            description="We handle all monthly content edits, backups, security, bug fixes, and maintenance on a simple plan."
            index={2}
          />
        </div>
      </section>

      {/* =========================================================================
          7. TRANSPARENT PRICING / PLAN WIDGET
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="apple-card p-8 sm:p-12 space-y-8 shadow-xl bg-gradient-to-br from-white via-[#F7FAFD] to-[#E9F3FE] border border-[#BFDBFE] hover:border-[#8FC2FB] transition-all">
          
          <div className="max-w-2xl space-y-2.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0066D6] bg-[#E5F1FF] border border-[#BFDBFE] px-3.5 py-1 rounded-full inline-block shadow-2xs">
              ALL-IN-ONE PLAN
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0C172B] tracking-tight">
              One simple monthly fee. Complete website peace of mind.
            </h2>
            <p className="text-base text-[#475569] leading-relaxed font-normal">
              No expensive upfront build costs, no surprise maintenance bills, and no hidden technical fees.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-[#D5E4F5]">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#EBF4FD] border border-[#BFDBFE] hover:border-[#8FC2FB] transition-all">
              <CheckCircle2 className="w-5 h-5 text-[#0066D6] shrink-0" />
              <span className="text-sm font-semibold text-[#0C172B]">Custom Web Design</span>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#EBF4FD] border border-[#BFDBFE] hover:border-[#8FC2FB] transition-all">
              <CheckCircle2 className="w-5 h-5 text-[#0066D6] shrink-0" />
              <span className="text-sm font-semibold text-[#0C172B]">Unlimited Edits</span>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#EBF4FD] border border-[#BFDBFE] hover:border-[#8FC2FB] transition-all">
              <CheckCircle2 className="w-5 h-5 text-[#0066D6] shrink-0" />
              <span className="text-sm font-semibold text-[#0C172B]">Hosting &amp; Security</span>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#EBF4FD] border border-[#BFDBFE] hover:border-[#8FC2FB] transition-all">
              <CheckCircle2 className="w-5 h-5 text-[#0066D6] shrink-0" />
              <span className="text-sm font-semibold text-[#0C172B]">Dedicated Specialist</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-sm text-[#475569] font-normal">Ready to get started or discuss custom requirements?</span>
            <Button variant="primary" size="md" showArrow onClick={() => navigate('/contact')}>
              Inquire About Pricing &amp; Plans
            </Button>
          </div>

        </div>
      </section>

      {/* =========================================================================
          8. CALL TO ACTION (Apple Specialist Banner — Midnight Sapphire Luxury)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 lg:p-14 rounded-3xl bg-gradient-to-br from-[#061226] via-[#0B1E40] to-[#040C1A] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl border border-[#1A4B8C] relative overflow-hidden group">
          {/* Luminous Sapphire Ambient Lighting */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#0066D6]/30 rounded-full blur-[90px] pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-[#004EA8]/30 rounded-full blur-[80px] pointer-events-none" />

          <div className="space-y-2.5 text-center md:text-left max-w-xl relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-white bg-[#0066D6] px-3.5 py-1 rounded-full inline-block shadow-md shadow-[#0066D6]/35">
              SPECIALIST CARE
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
              Ready to hand over your website care?
            </h3>
            <p className="text-sm sm:text-base text-[#D0E2FF] font-normal leading-relaxed">
              Tell us about your business or current website. A specialist will provide a tailored proposal within 24 hours.
            </p>
          </div>

          <Button 
            variant="white" 
            size="lg" 
            showArrow
            onClick={() => navigate('/contact')}
            className="shrink-0 relative z-10"
          >
            Get Started Today
          </Button>
        </div>
      </section>
    </div>
  );
};
export default HomePage;
