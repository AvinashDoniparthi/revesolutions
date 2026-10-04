import React, { useCallback, useEffect, useState, useSyncExternalStore } from 'react';
import { ease, transition, duration } from '../lib/motion';
import { AnimatePresence, motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
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
import { RoundCarousel } from '../components/RoundCarousel';
import { CoverflowCarousel } from '../components/CoverflowCarousel';
import { ProcessStepCard } from '../components/ProcessStep';
import { websiteServices } from '../data/services';
import { companyInfo } from '../data/companyInfo';
import { showcaseSlides } from '../data/showcase';
import { useViewportTier, type ViewportTier } from '../lib/useViewportTier';

const subscribeToClient = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

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
  const portalReady = useSyncExternalStore(subscribeToClient, getClientSnapshot, getServerSnapshot);

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
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[300px] h-[140px] xs:w-[380px] xs:h-[180px] sm:w-[600px] sm:h-[280px] md:w-[700px] md:h-[330px] lg:w-[900px] lg:h-[420px] bg-gradient-to-b from-gold/25 via-gold/10 to-transparent rounded-full blur-[80px] sm:blur-[120px] lg:blur-[140px] pointer-events-none -z-10" />


      {/* =========================================================================
          1. APPLE STORE HERO & 3D ROUND SERVICES CAROUSEL
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-6 border-b border-line">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition('slow'), ease: ease.entrance }}
            className="max-w-3xl space-y-2"
          >
            <h1 className="text-3xl sm:text-5xl lg:text-display tracking-tight leading-[1.08]">
              <span className="font-bold text-ink">Websites.</span>{' '}
              <span className="font-semibold text-ink-2">Fully built and managed by real people.</span>
            </h1>

            {/*
              The H1 alone gave crawlers no context and never named the brand.
              This paragraph is the keyword-bearing copy for the page. Kept
              under 20 words so the headline, the copy and the CTA all sit in
              the first viewport together.
            */}
            <p className="text-base sm:text-lg text-ink-2 max-w-2xl leading-relaxed font-normal pt-1">
              {companyInfo.heroSubtext}
            </p>

            {/* The hero had no CTA at all: the only thing to act on above the
                fold was an autoplaying carousel. */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <Button variant="primary" size="lg" showArrow to="/contact">
                Let's Talk
              </Button>
              <Button variant="outline" size="lg" to="/services">
                See what we do
              </Button>
            </div>
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
          2. "WHAT YOU GET": one wide statement over two equal cards.

          This used to be a 7/5 bento whose wide cell existed to hold a project
          preview widget. The widget showed the same four projects as the
          Showcase section further down this page, and it sat directly under a
          headline reading "not a template" while rendering a four-tab strip
          that looked exactly like a template picker. With it gone the 7/5 split
          had nothing justifying it, so the strongest claim takes the full width
          and carries itself on type, and the two operational claims sit beneath
          as the peers they are.
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <SectionHeading
          title="What you get."
          subtitle="Built properly once, then kept that way."
        />

        <div className="space-y-6">

          {/* The differentiator, full width. Tinted rather than white so the
              group is not three identical card surfaces in a row. */}
          <div className="rounded-3xl bg-brand-tint border border-line-strong p-6 xs:p-8 sm:p-10 space-y-3">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-ink tracking-tight leading-snug max-w-3xl">
              Design built around your business, not a template.
            </h3>
            <p className="text-sm sm:text-base text-ink-2 max-w-2xl leading-relaxed font-normal">
              Every site is written as custom code, so it loads quickly, holds its layout on a phone, and gives visitors a clear path to contacting you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">

            {/* Card: ongoing care */}
            <div className="apple-card p-6 xs:p-8 space-y-4 flex flex-col justify-between hover:border-line-hover transition-all">
              <div className="space-y-2.5">
                <h3 className="text-2xl font-bold text-ink tracking-tight">
                  Hand over your website. We keep it current.
                </h3>
                <p className="text-sm text-ink-2 leading-relaxed">
                  Need new pictures, text changes, seasonal promos, or layout tweaks? Simply message us and our team handles it.
                </p>
              </div>

              <div className="pt-4 border-t border-line flex items-center justify-between gap-3">
                <span className="text-xs text-brand font-semibold">Build once, then we maintain it</span>
                <Button variant="primary" size="sm" to="/contact">
                  Let's Talk
                </Button>
              </div>
            </div>

            {/* Card: performance and hosting */}
            <div className="apple-card p-6 xs:p-8 space-y-4 flex flex-col justify-between hover:border-line-hover transition-all">
              <div className="space-y-2.5">
                <h3 className="text-2xl font-bold text-ink tracking-tight">
                  Fast pages, and hosting we look after.
                </h3>
                <p className="text-sm text-ink-2 leading-relaxed">
                  We build to hit 95+ on Google PageSpeed Insights, because faster sites rank better and lose fewer visitors. Daily automated backups and SSL are included.
                </p>
              </div>

              <div className="pt-4 border-t border-line">
                <Link to="/services#website-maintenance" className="text-xs font-semibold text-brand hover:underline flex items-center gap-1">
                  <span>See security &amp; performance details</span>
                  <span aria-hidden="true">&gt;</span>
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          3. "THE RÊVE DIFFERENCE"

          Four points, deliberately not four cards. The section directly above
          is a card grid and the one below is another, so boxing these too made
          three consecutive card rows read as one undifferentiated wall.
          Elevation is not communicating anything here, so a divided list does
          the grouping instead.
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <SectionHeading
          title="The Rêve difference."
          subtitle="Even more reasons to partner with our web studio."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
          {[
            {
              icon: Paintbrush,
              title: 'Code written for you',
              body: 'No drag-and-drop page builders. Clean markup that search engines can read and browsers render quickly.',
            },
            {
              icon: Users,
              title: 'A team you can reach',
              body: 'You work directly with the designers and developers who know your website, not a ticket queue.',
            },
            {
              icon: CheckCircle2,
              title: 'Pricing you can see coming',
              body: 'A one-time cost to build the site, and a separate maintenance quote agreed before we start. No hourly charges, no surprise bills.',
            },
            {
              icon: Clock,
              title: 'Edits inside a day',
              body: 'Content updates, new pages and media changes turned around within 24 hours of your request.',
            },
          ].map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="flex items-start gap-4 py-6 border-b border-line last:border-b-0 md:[&:nth-last-child(2)]:border-b-0"
            >
              <Icon className="w-5 h-5 text-brand shrink-0 mt-1" strokeWidth={1.75} />
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-ink tracking-tight">{title}</h3>
                <p className="text-sm text-ink-2 leading-relaxed font-normal">{body}</p>
              </div>
            </div>
          ))}
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
              to="/services"
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

        <div className="w-full rounded-3xl overflow-hidden border border-line-strong shadow-sm bg-gradient-to-b from-surface to-surface-raised flex flex-col">
          <div className="relative h-[240px] sm:h-[340px] lg:h-[420px]">
            <CoverflowCarousel
              images={showcaseSlides}
              {...showcaseSizing}
              autoplay={true}
              pauseOnHover={true}
              paused={lightbox !== null}
              onActiveIndexChange={handleActiveSlide}
              onImageClick={openLightbox}
              transition={{ duration: duration.slow, delay: 2.4 }}
              showArrows={true}
              arrowColor="var(--color-ink)"
              arrowBackground="rgba(255, 253, 249, 0.95)"
              arrowSize={46}
            />
          </div>

          <div className="border-t border-line bg-surface/70 px-5 sm:px-8 py-5 text-center min-h-[132px] sm:min-h-[120px]">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transition('base') }}
              className="max-w-2xl mx-auto space-y-2"
            >
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-brand bg-brand-tint border border-line-strong px-3.5 py-1 rounded-full shadow-2xs">
                {slide.project} &middot; {slide.category}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-ink tracking-tight">
                {slide.title}
              </h3>
              <p className="text-sm sm:text-base text-ink-2 leading-relaxed">
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
                transition={{ ...transition('fast') }}
                onClick={closeLightbox}
                role="dialog"
                aria-modal="true"
                aria-label={`${lightboxSlide.project}: ${lightboxSlide.title}`}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-ink/85 backdrop-blur-sm cursor-zoom-out"
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
                  transition={{ ...transition('fast') }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full max-w-6xl cursor-default"
                >
                  <img
                    src={lightboxSlide.srcUrl}
                    alt={lightboxSlide.alt}
                    width={1024}
                    height={576}
                    decoding="async"
                    className="w-full max-h-[72vh] object-contain rounded-2xl bg-white shadow-2xl"
                  />

                  <div className="mt-5 text-center space-y-2">
                    <span className="inline-block text-xs font-bold uppercase tracking-wider text-gold-soft bg-white/10 border border-white/20 px-3.5 py-1 rounded-full">
                      {lightboxSlide.project} &middot; {lightboxSlide.category}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      {lightboxSlide.title}
                    </h3>
                    <p className="max-w-2xl mx-auto text-sm sm:text-base text-night-ink leading-relaxed">
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
          8. CALL TO ACTION: the one dark panel on the page, used once as a close.
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 xs:p-8 sm:p-12 lg:p-14 rounded-3xl bg-gradient-to-br from-night via-night-2 to-night-3 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl border border-night-line relative overflow-hidden group">
          {/* Luminous Sapphire Ambient Lighting */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-gold/25 rounded-full blur-[90px] pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-brand/25 rounded-full blur-[80px] pointer-events-none" />

          <div className="space-y-2.5 text-center md:text-left max-w-xl relative z-10">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
              Ready to hand over your website care?
            </h3>
            <p className="text-sm sm:text-base text-night-ink font-normal leading-relaxed">
              Tell us about your business or your current website, and we will come back with a tailored proposal within 24 hours.
            </p>
          </div>

          <Button
            variant="white"
            size="lg"
            showArrow
            to="/contact"
            className="shrink-0 relative z-10"
          >
            Let's Talk
          </Button>
        </div>
      </section>
    </div>
  );
};
export default HomePage;
