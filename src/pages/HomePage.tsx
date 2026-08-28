import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Paintbrush, 
  ShieldCheck, 
  Zap, 
  FileEdit, 
  Search, 
  HeartHandshake,
  Users,
  Clock,
  Laptop
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Button } from '../components/Button';
import { SectionHeading } from '../components/SectionHeading';
import { ServiceCard } from '../components/ServiceCard';
import { HeroWebsiteMockup } from '../components/HeroWebsiteMockup';
import { ShowcaseCard } from '../components/ShowcaseCard';
import { ProcessStepCard } from '../components/ProcessStep';
import { websiteServices } from '../data/services';
import { showcaseItems } from '../data/showcase';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const serviceCategories = [
    { name: 'Custom Design', icon: Laptop, path: '/services#website-development' },
    { name: 'Monthly Care', icon: HeartHandshake, path: '/services#website-management' },
    { name: 'Speed & SEO', icon: Zap, path: '/services#website-maintenance' },
    { name: 'Security & Hosting', icon: ShieldCheck, path: '/services#website-maintenance' },
    { name: 'Content Edits', icon: FileEdit, path: '/services#website-support' },
    { name: 'Search Optimization', icon: Search, path: '/services#website-development' },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 pt-24 sm:pt-28">
      <SEOHead 
        title="Home" 
        description="Rêve Solutions — Your website. Fully built and managed by real people."
      />

      {/* =========================================================================
          1. APPLE STORE HERO & SPECIALIST BAR
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-black/[0.06]">
          
          {/* Two-tone headline */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="max-w-3xl space-y-2"
          >
            <h1 className="text-3xl sm:text-5xl lg:text-[54px] tracking-tight leading-[1.08]">
              <span className="font-bold text-[#1D1D1F]">Websites.</span>{' '}
              <span className="font-semibold text-[#6E6E73]">The best way to build and manage your site.</span>
            </h1>
          </motion.div>

          {/* Right Specialist Assistance Widget */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut', delay: 0.1 }}
            className="flex items-center gap-3 bg-white p-3.5 px-4 rounded-2xl shadow-xs border border-black/5 shrink-0"
          >
            <div className="w-10 h-10 rounded-full bg-[#0071E3]/10 text-[#0071E3] flex items-center justify-center font-bold text-sm">
              <Users className="w-5 h-5" />
            </div>
            <div className="space-y-0.5 text-xs">
              <span className="font-bold text-[#1D1D1F] block">Need guidance?</span>
              <Link to="/contact" className="text-[#0066CC] hover:underline font-medium flex items-center gap-1">
                <span>Connect with a web specialist</span>
                <span aria-hidden="true">&gt;</span>
              </Link>
            </div>
          </motion.div>

        </div>

        {/* Horizontal Category / Service Icon Shelf (like Apple product shelf) */}
        <div className="pt-8 pb-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center justify-start md:justify-center gap-8 sm:gap-12 min-w-max px-2">
            {serviceCategories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <button
                  key={idx}
                  onClick={() => navigate(cat.path)}
                  className="apple-shelf-item flex flex-col items-center gap-2.5 group cursor-pointer text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-white border border-black/5 shadow-xs flex items-center justify-center text-[#1D1D1F] group-hover:scale-105 group-hover:bg-[#0071E3] group-hover:text-white transition-all duration-200">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-medium text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors">
                    {cat.name}
                  </span>
                </button>
              );
            })}
          </div>
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
          <div className="lg:col-span-7 apple-card p-8 sm:p-10 space-y-6 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#86868B]">
                CUSTOM WEB STUDIO
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1D1D1F] tracking-tight leading-snug">
                Handcrafted design.<br />
                Tailored specifically for your business.
              </h2>
              <p className="text-sm text-[#6E6E73] max-w-lg leading-relaxed font-normal">
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
            <div className="apple-card p-8 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0071E3]">
                  DEDICATED CARE
                </span>
                <h3 className="text-2xl font-bold text-[#1D1D1F] tracking-tight">
                  Unlimited monthly edits. Hand over your website.
                </h3>
                <p className="text-sm text-[#6E6E73] leading-relaxed">
                  Need new pictures, text changes, seasonal promos, or layout tweaks? Simply message us and our team handles it promptly.
                </p>
              </div>

              <div className="pt-4 border-t border-black/5 flex items-center justify-between">
                <span className="text-xs text-[#86868B]">One simple monthly plan</span>
                <Button variant="primary" size="sm" onClick={() => navigate('/contact')}>
                  Inquire Now
                </Button>
              </div>
            </div>

            {/* Card 3: Performance & SEO Widget */}
            <div className="apple-card p-8 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#86868B]">
                  SPEED & SECURITY
                </span>
                <h3 className="text-2xl font-bold text-[#1D1D1F] tracking-tight">
                  100/100 PageSpeed & bulletproof hosting.
                </h3>
                <p className="text-sm text-[#6E6E73] leading-relaxed">
                  Fast sites rank higher on Google and convert more visitors. Daily automated backups and SSL security included.
                </p>
              </div>

              <div className="pt-4 border-t border-black/5">
                <Link to="/services#website-maintenance" className="text-xs font-medium text-[#0066CC] hover:underline flex items-center gap-1">
                  <span>See security & performance details</span>
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
          
          <div className="apple-card p-7 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F5F5F7] border border-black/5 flex items-center justify-center text-[#0071E3]">
              <Paintbrush className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#1D1D1F] tracking-tight">Handcrafted Code</h3>
            <p className="text-xs text-[#6E6E73] leading-relaxed">
              No bloated drag-and-drop page builders. Pure clean code optimized for Google search and speed.
            </p>
          </div>

          <div className="apple-card p-7 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F5F5F7] border border-black/5 flex items-center justify-center text-[#0071E3]">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#1D1D1F] tracking-tight">Dedicated Team</h3>
            <p className="text-xs text-[#6E6E73] leading-relaxed">
              Work directly with human web designers and developers who know your website inside and out.
            </p>
          </div>

          <div className="apple-card p-7 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F5F5F7] border border-black/5 flex items-center justify-center text-[#0071E3]">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#1D1D1F] tracking-tight">Predictable Fee</h3>
            <p className="text-xs text-[#6E6E73] leading-relaxed">
              One transparent monthly subscription. Zero surprise bills, maintenance invoices, or hourly charges.
            </p>
          </div>

          <div className="apple-card p-7 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F5F5F7] border border-black/5 flex items-center justify-center text-[#0071E3]">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#1D1D1F] tracking-tight">24h Fast Edits</h3>
            <p className="text-xs text-[#6E6E73] leading-relaxed">
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
          5. WEBSITE SHOWCASE
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <SectionHeading
          title="Showcase."
          subtitle="Built and maintained for real businesses."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {showcaseItems.map((item, index) => (
            <ShowcaseCard
              key={item.id}
              item={item}
              index={index}
              onClick={() => navigate('/services')}
            />
          ))}
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
        <div className="apple-card p-8 sm:p-12 space-y-8 shadow-xl">
          
          <div className="max-w-2xl space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0071E3]">
              ALL-IN-ONE PLAN
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1D1D1F] tracking-tight">
              One simple monthly fee. Complete website peace of mind.
            </h2>
            <p className="text-base text-[#6E6E73] leading-relaxed font-normal">
              No expensive upfront build costs, no surprise maintenance bills, and no hidden technical fees.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-black/5">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#F5F5F7]">
              <CheckCircle2 className="w-5 h-5 text-[#0071E3] shrink-0" />
              <span className="text-sm font-semibold text-[#1D1D1F]">Custom Web Design</span>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#F5F5F7]">
              <CheckCircle2 className="w-5 h-5 text-[#0071E3] shrink-0" />
              <span className="text-sm font-semibold text-[#1D1D1F]">Unlimited Edits</span>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#F5F5F7]">
              <CheckCircle2 className="w-5 h-5 text-[#0071E3] shrink-0" />
              <span className="text-sm font-semibold text-[#1D1D1F]">Hosting & Security</span>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#F5F5F7]">
              <CheckCircle2 className="w-5 h-5 text-[#0071E3] shrink-0" />
              <span className="text-sm font-semibold text-[#1D1D1F]">Dedicated Specialist</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-sm text-[#6E6E73] font-normal">Ready to get started or discuss custom requirements?</span>
            <Button variant="primary" size="md" showArrow onClick={() => navigate('/contact')}>
              Inquire About Pricing & Plans
            </Button>
          </div>

        </div>
      </section>

      {/* =========================================================================
          8. CALL TO ACTION (Apple Specialist Banner)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="apple-card p-8 sm:p-12 lg:p-14 bg-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-2 text-center md:text-left max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#86868B] block">
              SPECIALIST CARE
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F]">
              Ready to hand over your website care?
            </h3>
            <p className="text-sm sm:text-base text-[#6E6E73] font-normal leading-relaxed">
              Tell us about your business or current website. A specialist will provide a tailored proposal within 24 hours.
            </p>
          </div>

          <Button 
            variant="primary" 
            size="lg" 
            showArrow
            onClick={() => navigate('/contact')}
            className="shrink-0"
          >
            Get Started Today
          </Button>
        </div>
      </section>
    </div>
  );
};
