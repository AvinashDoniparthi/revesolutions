import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useNavigate, Link } from 'react-router-dom';
import {
  CheckCircle2,
  Paintbrush,
  Users,
  Clock,
  X
} from 'lucide-react';
import { Button } from '../components/Button';
import { SectionHeading } from '../components/SectionHeading';
import { ServiceCard } from '../components/ServiceCard';
import { WebsiteConfigurator } from '../components/WebsiteConfigurator';
import { RoundCarousel } from '../components/RoundCarousel';
import { CoverflowCarousel } from '../components/CoverflowCarousel';
import { ProcessStepCard } from '../components/ProcessStep';
import { websiteServices } from '../data/services';
import { companyInfo } from '../data/companyInfo';
import { showcaseSlides } from '../data/showcase';
import { useViewportTier, type ViewportTier } from '../lib/useViewportTier';

type ShowcaseSizing = {
  activeWidth: number;
  activeHeight: number;
  restWidth: number;
  restHeight: number;
  gap: number;
};

// Both carousels take pixel card sizes, so they are chosen per breakpoint. Every
// showcase pair is ~16:9 to match the screenshots, and the tiers come from
// `useViewportTier` so they stay in step with the stage height classes below.
// The `xs` tier exists because a 320px phone only leaves 288px inside the
// section's `px-4` — anything wider than that gets clipped at the edges.
const SHOWCASE_SIZES: Record<ViewportTier, ShowcaseSizing> = {
  xs: { activeWidth: 232, activeHeight: 131, restWidth: 72, restHeight: 41, gap: 10 },
  mobile: { activeWidth: 300, activeHeight: 169, restWidth: 96, restHeight: 54, gap: 14 },
  tablet: { activeWidth: 460, activeHeight: 259, restWidth: 170, restHeight: 96, gap: 22 },
  desktop: { activeWidth: 620, activeHeight: 349, restWidth: 250, restHeight: 141, gap: 30 },
};

// The services conveyor keeps the same ~1.73:1 card ratio at every tier so the
// belt reads the same shape on a phone as it does on a desktop.
const CONVEYOR_SIZES: Record<ViewportTier, { cardWidth: number; cardHeight: number; gap: number }> = {
  xs: { cardWidth: 168, cardHeight: 97, gap: 18 },
  mobile: { cardWidth: 210, cardHeight: 122, gap: 22 },
  tablet: { cardWidth: 250, cardHeight: 145, gap: 28 },
  desktop: { cardWidth: 285, cardHeight: 165, gap: 34 },
};

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  // Which showcase screenshot is centred, so the caption below the carousel can
  // describe it. The handler must stay referentially stable — CoverflowCarousel
  // resubscribes to its position value whenever it changes.
  const [activeSlide, setActiveSlide] = useState(0);
  const handleActiveSlide = useCallback((index: number) => setActiveSlide(index), []);
  const slide = showcaseSlides[activeSlide] ?? showcaseSlides[0];

  const tier = useViewportTier();
  const showcaseSizing = SHOWCASE_SIZES[tier];
  const conveyorSizing = CONVEYOR_SIZES[tier];

  // Clicking the centred screenshot opens it full-screen.
  const [lightbox, setLightbox] = useState<number | null>(null);
  const openLightbox = useCallback((index: number) => setLightbox(index), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const lightboxSlide = lightbox === null ? null : showcaseSlides[lightbox];

  /**
   * The lightbox portals into `document.body`, which does not exist during the
   * build-time prerender. Deferring it to a post-mount flag keeps the server
   * and the first client render identical (both emit nothing), so hydration
   * matches — and unlike gating on `lightboxSlide`, it leaves AnimatePresence
   * mounted so the close animation still plays.
   */
  const [portalReady, setPortalReady] = useState(false);
  useEffect(() => setPortalReady(true), []);

  useEffect(() => {
    if (lightbox === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
    };
    const previousOverflow = document.body.style.overflow;

    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [lightbox, closeLightbox]);

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 pt-24 sm:pt-28 relative">
      {/* Cohesive Ambient Blue Atmosphere Orbs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[300px] h-[140px] xs:w-[380px] xs:h-[180px] sm:w-[600px] sm:h-[280px] md:w-[700px] md:h-[330px] lg:w-[900px] lg:h-[420px] bg-gradient-to-b from-[#0066D6]/10 via-[#0066D6]/3 to-transparent rounded-full blur-[80px] sm:blur-[120px] lg:blur-[140px] pointer-events-none -z-10" />


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
              <span className="font-semibold text-[#475569]">Fully built and managed by real people.</span>
            </h1>

            {/*
              The H1 alone gave crawlers no context and never named the brand.
              This paragraph is the keyword-bearing copy for the page — it was
              already written in companyInfo.heroSubtext but rendered nowhere.
            */}
            <p className="text-base sm:text-lg text-[#475569] max-w-2xl leading-relaxed font-normal pt-1">
              {companyInfo.heroSubtext}
            </p>
          </motion.div>
        </div>

        {/* Rectangular 3D Conveyor Services Animation */}
        <div className="pt-6 pb-2 w-full h-[260px] sm:h-[300px] lg:h-[320px] relative overflow-hidden">
          <RoundCarousel
            {...conveyorSizing}
            speed={1.3}
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
          <div className="lg:col-span-7 apple-card p-6 xs:p-8 sm:p-10 space-y-6 flex flex-col justify-between hover:border-[#A9CEF7] transition-all">
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
              <WebsiteConfigurator />
            </div>
          </div>

          {/* Right Column: 2 Stacked Apple Widget Cards (5-col) */}
          <div className="lg:col-span-5 flex flex-col gap-6">

            {/* Card 2: Monthly Care Apple Widget */}
            <div className="apple-card p-6 xs:p-8 space-y-4 flex-1 flex flex-col justify-between hover:border-[#A9CEF7] transition-all">
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
            <div className="apple-card p-6 xs:p-8 space-y-4 flex-1 flex flex-col justify-between hover:border-[#A9CEF7] transition-all">
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

          <div className="apple-card p-6 xs:p-7 space-y-3 hover:border-[#A9CEF7] transition-all">
            <div className="w-11 h-11 rounded-2xl bg-[#E5F1FF] border border-[#BFDBFE] flex items-center justify-center text-[#0066D6] shadow-xs">
              <Paintbrush className="w-5 h-5 text-[#0066D6]" />
            </div>
            <h3 className="text-lg font-bold text-[#0C172B] tracking-tight">Handcrafted Code</h3>
            <p className="text-xs text-[#475569] leading-relaxed">
              No bloated drag-and-drop page builders. Pure clean code optimized for Google search and speed.
            </p>
          </div>

          <div className="apple-card p-6 xs:p-7 space-y-3 hover:border-[#A9CEF7] transition-all">
            <div className="w-11 h-11 rounded-2xl bg-[#E5F1FF] border border-[#BFDBFE] flex items-center justify-center text-[#0066D6] shadow-xs">
              <Users className="w-5 h-5 text-[#0066D6]" />
            </div>
            <h3 className="text-lg font-bold text-[#0C172B] tracking-tight">Dedicated Team</h3>
            <p className="text-xs text-[#475569] leading-relaxed">
              Work directly with human web designers and developers who know your website inside and out.
            </p>
          </div>

          <div className="apple-card p-6 xs:p-7 space-y-3 hover:border-[#A9CEF7] transition-all">
            <div className="w-11 h-11 rounded-2xl bg-[#E5F1FF] border border-[#BFDBFE] flex items-center justify-center text-[#0066D6] shadow-xs">
              <CheckCircle2 className="w-5 h-5 text-[#0066D6]" />
            </div>
            <h3 className="text-lg font-bold text-[#0C172B] tracking-tight">Predictable Fee</h3>
            <p className="text-xs text-[#475569] leading-relaxed">
              One transparent monthly subscription. Zero surprise bills, maintenance invoices, or hourly charges.
            </p>
          </div>

          <div className="apple-card p-6 xs:p-7 space-y-3 hover:border-[#A9CEF7] transition-all">
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

        <div className="w-full rounded-3xl overflow-hidden border border-[#C5DFFD] shadow-sm bg-gradient-to-b from-white to-[#F2F7FD] flex flex-col">
          <div className="relative h-[240px] sm:h-[340px] lg:h-[420px]">
            <CoverflowCarousel
              images={showcaseSlides}
              {...showcaseSizing}
              autoplay={true}
              pauseOnHover={true}
              paused={lightbox !== null}
              onActiveIndexChange={handleActiveSlide}
              onImageClick={openLightbox}
              transition={{ type: 'tween', duration: 0.6, delay: 2.4, ease: 'easeInOut' }}
              showArrows={true}
              arrowColor="#0C172B"
              arrowBackground="rgba(255, 255, 255, 0.95)"
              arrowSize={46}
            />
          </div>

          <div className="border-t border-[#DCEAFB] bg-white/70 px-5 sm:px-8 py-5 text-center min-h-[132px] sm:min-h-[120px]">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="max-w-2xl mx-auto space-y-2"
            >
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#0066D6] bg-[#E5F1FF] border border-[#BFDBFE] px-3.5 py-1 rounded-full shadow-2xs">
                {slide.project} &middot; {slide.category}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-[#0C172B] tracking-tight">
                {slide.title}
              </h3>
              <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                {slide.description}
              </p>
            </motion.div>
          </div>
        </div>

        {portalReady && createPortal(
          <AnimatePresence>
            {lightboxSlide && (
              <motion.div
                key="showcase-lightbox"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                onClick={closeLightbox}
                role="dialog"
                aria-modal="true"
                aria-label={`${lightboxSlide.project} — ${lightboxSlide.title}`}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-[#0C172B]/85 backdrop-blur-sm cursor-zoom-out"
              >
                <button
                  type="button"
                  onClick={closeLightbox}
                  aria-label="Close"
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <motion.div
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full max-w-6xl cursor-default"
                >
                  <img
                    src={lightboxSlide.srcUrl}
                    alt={lightboxSlide.alt}
                    className="w-full max-h-[72vh] object-contain rounded-2xl bg-white shadow-2xl"
                  />

                  <div className="mt-5 text-center space-y-2">
                    <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#BFDBFE] bg-white/10 border border-white/20 px-3.5 py-1 rounded-full">
                      {lightboxSlide.project} &middot; {lightboxSlide.category}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      {lightboxSlide.title}
                    </h3>
                    <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#CBD9EC] leading-relaxed">
                      {lightboxSlide.description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
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
          8. CALL TO ACTION (Apple Specialist Banner — Midnight Sapphire Luxury)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 xs:p-8 sm:p-12 lg:p-14 rounded-3xl bg-gradient-to-br from-[#061226] via-[#0B1E40] to-[#040C1A] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl border border-[#1A4B8C] relative overflow-hidden group">
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
