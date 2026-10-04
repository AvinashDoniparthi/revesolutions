import React, { useRef } from 'react';
import { companyInfo } from '../../data/companyInfo';
import { gsap, MQ, useGSAP } from '../motion';
import { Pill } from '../primitives';

/**
 * Chapter one. The logo's own composition, scaled to a screen: black field,
 * wide white type, and the gold horizon line glowing at its centre. The
 * entrance runs in CSS (see `.x-line-mask` in index.css) so it plays straight
 * from the prerendered HTML; GSAP only handles the scroll-away.
 */
export const Hero: React.FC = () => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const st = { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true };
        gsap.to('.x-hero-type', { yPercent: -18, opacity: 0.15, ease: 'none', scrollTrigger: st });
        gsap.to('.x-hero-foot', { y: -60, opacity: 0, ease: 'none', scrollTrigger: { ...st, end: '60% top' } });
        gsap.to('.x-hero-glow', { scale: 1.5, opacity: 1, ease: 'none', scrollTrigger: st });
        gsap.to('.x-hero-grid', { yPercent: 12, ease: 'none', scrollTrigger: st });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      data-nav="dark"
      className="x-grain relative min-h-[100dvh] bg-night-3 text-surface overflow-hidden flex flex-col"
    >
      {/* Ambient light pooled under the horizon line. */}
      <div
        className="x-hero-glow absolute left-1/2 top-[64%] -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[70vh] opacity-70 pointer-events-none bg-[radial-gradient(closest-side,rgba(186,159,113,0.22),rgba(186,159,113,0.06)_55%,transparent)]"
        aria-hidden="true"
      />
      {/* Hairline column grid, like the margins of a drafting sheet. */}
      <div className="x-hero-grid absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="max-w-[96rem] h-full mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-2 md:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`border-l border-white/[0.05] ${i >= 2 ? 'hidden md:block' : ''} ${i === 3 ? 'border-r' : ''}`} />
          ))}
        </div>
      </div>

      <div className="relative flex-1 flex flex-col max-w-[96rem] w-full mx-auto px-5 sm:px-8 lg:px-12 pt-32 sm:pt-36 pb-10">
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.24em] text-surface/50">
          <span className="x-fade-in" style={{ '--d': '0.1s' } as React.CSSProperties}>
            Web studio
          </span>
          <span className="x-fade-in text-gold-soft/80" style={{ '--d': '0.2s' } as React.CSSProperties}>
            Dream. Build. Deliver.
          </span>
        </div>

        <div className="flex-1 flex flex-col justify-center py-12">
          <h1 className="x-hero-type font-medium tracking-[-0.045em] leading-[0.94] text-[clamp(2.9rem,8.2vw,9.25rem)]">
            <span className="x-line-mask">
              <span style={{ '--d': '0s' } as React.CSSProperties}>Websites.</span>
            </span>
            <span className="x-line-mask">
              <span style={{ '--d': '0.09s' } as React.CSSProperties}>
                Fully built and{' '}
                <span className="font-serif italic font-normal tracking-[-0.02em] x-gold-text pr-[0.06em]">managed</span>
              </span>
            </span>
            <span className="x-line-mask">
              <span style={{ '--d': '0.18s' } as React.CSSProperties} className="text-surface/55">
                by real people.
              </span>
            </span>
          </h1>
        </div>

        <div className="x-hero-foot space-y-8">
          <div className="x-horizon x-draw origin-center" style={{ '--d': '0.25s' } as React.CSSProperties} />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <div className="hidden md:flex md:col-span-2 items-end gap-4 x-fade-in" style={{ '--d': '0.6s' } as React.CSSProperties}>
              <span className="x-scroll-cue" aria-hidden="true" />
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-surface/40">Scroll</span>
            </div>
            <p
              className="md:col-span-5 text-base sm:text-lg leading-relaxed text-surface/65 max-w-md x-fade-in"
              style={{ '--d': '0.45s' } as React.CSSProperties}
            >
              {companyInfo.heroSubtext}
            </p>
            <div
              className="md:col-span-5 flex flex-wrap items-center md:justify-end gap-3 x-fade-in"
              style={{ '--d': '0.55s' } as React.CSSProperties}
            >
              <Pill to="/contact" tone="gold" size="lg">
                Let's Talk
              </Pill>
              <Pill to="/services" tone="ghost-light" size="lg" arrow={false}>
                See what we do
              </Pill>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
