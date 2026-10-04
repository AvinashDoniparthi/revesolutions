import React, { useRef } from 'react';
import { teamMembers } from '../../data/team';
import { websiteServices } from '../../data/services';
import { gsap, MQ, useGSAP } from '../motion';
import { Pill } from '../primitives';

/**
 * Chapter eight. A slow marquee of the four services as a breath between
 * chapters, then the close: the question set large, with the four people who
 * answer it sitting inside the sentence.
 */
export const Closing: React.FC = () => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo('.x-face', { scale: 0, rotate: -12 }, {
          scale: 1,
          rotate: 0,
          duration: 1.2,
          ease: 'back.out(1.6)',
          stagger: 0.08,
          scrollTrigger: { trigger: '.x-close-head', start: 'top 80%', once: true },
        });
        gsap.fromTo('.x-close-line', { yPercent: 105 }, {
          yPercent: 0,
          duration: 1.3,
          ease: 'expo.out',
          stagger: 0.1,
          scrollTrigger: { trigger: '.x-close-head', start: 'top 85%', once: true },
        });
        gsap.fromTo(
          '.x-marquee-wrap',
          { xPercent: 4 },
          { xPercent: -4, ease: 'none', scrollTrigger: { trigger: '.x-marquee-wrap', start: 'top bottom', end: 'bottom top', scrub: true } },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  const words = websiteServices.map((s) => s.title);

  return (
    <section ref={ref} data-nav="light" className="relative bg-ground overflow-hidden">
      {/* Marquee */}
      <div className="x-marquee-wrap border-y border-line py-7 md:py-9 select-none" aria-hidden="true">
        <div className="x-marquee" style={{ '--speed': '60s' } as React.CSSProperties}>
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center shrink-0">
              {words.map((w) => (
                <span key={`${dup}-${w}`} className="flex items-center">
                  <span className="px-8 md:px-12 text-[clamp(2.5rem,6vw,6rem)] leading-none tracking-[-0.04em] font-medium text-ink whitespace-nowrap">
                    {w}
                  </span>
                  <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-8 md:h-8 shrink-0 text-gold" fill="currentColor">
                    <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" />
                  </svg>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Close */}
      <div className="relative max-w-[96rem] mx-auto px-5 sm:px-8 lg:px-12 py-32 md:py-48 text-center">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vh] bg-[radial-gradient(closest-side,rgba(186,159,113,0.18),transparent)] pointer-events-none" aria-hidden="true" />

        <h2 className="x-close-head relative text-[clamp(2.6rem,6.6vw,7rem)] leading-[1] tracking-[-0.045em] font-medium text-ink">
          <span className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
            <span className="x-close-line block">
              Ready to hand{' '}
              <span className="inline-flex align-middle -space-x-3 md:-space-x-4 mx-1 md:mx-2 -translate-y-[0.06em]">
                {teamMembers.map((m) => (
                  <span
                    key={m.id}
                    className="x-face inline-block w-[0.82em] h-[0.82em] rounded-full overflow-hidden ring-[3px] ring-ground bg-surface-sunken"
                  >
                    {m.image && (
                      <img decoding="async" src={m.image} alt="" width={96} height={96} loading="lazy" className={`w-full h-full object-cover ${m.imagePosition ?? ''}`} />
                    )}
                  </span>
                ))}
              </span>{' '}
              over
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
            <span className="x-close-line block">
              your <span className="font-serif italic font-normal text-brand">website care?</span>
            </span>
          </span>
        </h2>

        <p className="relative mt-10 text-lg text-ink-2 leading-relaxed max-w-xl mx-auto">
          Tell us about your business or your current website, and we will come back with a tailored proposal within 24 hours.
        </p>

        <div className="relative mt-12 flex flex-wrap items-center justify-center gap-3">
          <Pill to="/contact" tone="dark" size="lg">
            Let's Talk
          </Pill>
          <Pill to="/about" tone="ghost-dark" size="lg" arrow={false}>
            Meet the team
          </Pill>
        </div>
      </div>
    </section>
  );
};
