import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { websiteServices } from '../../data/services';
import { gsap, MQ, useGSAP } from '../motion';
import { Eyebrow } from '../primitives';

const TICKS = 72;

/**
 * Chapter four. The section pins and the four services travel sideways past
 * the reader, measured by a drafting ruler along the bottom edge whose gold
 * cursor tracks progress. Below `md` the rail unrolls into a plain stack.
 */
export const ServicesRail: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const counter = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.desktopMotion, () => {
        const track = ref.current?.querySelector<HTMLElement>('.x-rail-track');
        if (!track) return;
        const distance = () => track.scrollWidth - window.innerWidth;

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: ref.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.35,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const n = Math.min(websiteServices.length, Math.max(1, Math.round(self.progress * (websiteServices.length - 1)) + 1));
              if (counter.current) counter.current.textContent = String(n).padStart(2, '0');
            },
          },
        });
        tl.to(track, { x: () => -distance() }, 0).fromTo('.x-rail-cursor', { xPercent: 0 }, { xPercent: 100 }, 0);

        // Each panel's numeral drifts slower than the panel itself.
        gsap.utils.toArray<HTMLElement>('.x-rail-num').forEach((num) => {
          gsap.fromTo(
            num,
            { xPercent: 30 },
            {
              xPercent: -30,
              ease: 'none',
              scrollTrigger: {
                trigger: num.closest('.x-rail-panel'),
                containerAnimation: tl,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            },
          );
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      data-nav="dark"
      className="x-grain relative bg-night-3 text-surface overflow-hidden md:h-[100dvh] md:flex md:flex-col"
    >
      <div className="x-rail-track flex flex-col md:flex-row md:flex-1 md:items-center gap-6 md:gap-8 px-5 sm:px-8 lg:px-12 py-28 md:py-0 md:w-max">
        {/* Intro panel */}
        <div className="md:w-[38vw] md:max-w-[560px] shrink-0 md:pr-10 space-y-7 mb-8 md:mb-0">
          <Eyebrow tone="light">Services</Eyebrow>
          <h2 className="text-[clamp(2.4rem,4.6vw,4.75rem)] leading-[0.98] tracking-[-0.04em] font-medium">
            Everything your website needs, <span className="font-serif italic font-normal x-gold-text">from design to ongoing care.</span>
          </h2>
          <p className="text-surface/55 leading-relaxed max-w-sm">
            Four services, one team. The people who build your site are the people who look after it.
          </p>
        </div>

        {websiteServices.map((service, i) => (
          <article
            key={service.id}
            className="x-rail-panel group shrink-0 w-full md:w-[min(64vw,880px)] md:h-[72vh] rounded-[2rem] p-1.5 bg-white/[0.04] ring-1 ring-white/[0.08]"
          >
            <div className="relative h-full overflow-hidden rounded-[calc(2rem-0.375rem)] bg-gradient-to-br from-night-2 to-night-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] p-7 sm:p-10 lg:p-12 flex flex-col">
              <span
                className="x-rail-num absolute -right-6 -bottom-16 font-serif italic text-[clamp(10rem,22vw,20rem)] leading-none text-transparent [-webkit-text-stroke:1px_rgba(186,159,113,0.22)] select-none pointer-events-none"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="relative flex items-start justify-between gap-6">
                <span className="font-mono text-xs tracking-[0.2em] text-gold-soft/80">{String(i + 1).padStart(2, '0')} / 04</span>
                <Link
                  to={`/services#${service.id}`}
                  aria-label={`Learn more about ${service.title}`}
                  className="w-12 h-12 rounded-full ring-1 ring-white/15 flex items-center justify-center text-surface transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-gold hover:text-night-3 hover:ring-gold group-hover:rotate-45"
                >
                  <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" aria-hidden="true">
                    <path d="M3.5 12.5 12.5 3.5M12.5 3.5H5.5M12.5 3.5v7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>

              <div className="relative mt-10 md:mt-auto space-y-6 max-w-xl">
                <h3 className="text-[clamp(2rem,3.4vw,3.4rem)] leading-[1] tracking-[-0.035em] font-medium">{service.title}</h3>
                <p className="text-lg text-surface/80 leading-snug max-w-lg">{service.tagline}</p>
                <p className="text-sm text-surface/55 leading-relaxed">{service.description}</p>
                <ul className="flex flex-wrap gap-2 pt-1">
                  {service.features.map((f) => (
                    <li key={f} className="rounded-full px-3 py-1.5 text-xs text-surface/75 ring-1 ring-white/12 bg-white/[0.03]">
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="pt-5 border-t border-white/10 text-sm text-gold-soft/90 leading-relaxed">{service.businessBenefit}</p>
              </div>
            </div>
          </article>
        ))}
        <div className="hidden md:block shrink-0 w-[8vw]" aria-hidden="true" />
      </div>

      {/* Drafting ruler with a gold cursor (desktop only). */}
      <div className="hidden md:block relative px-12 pb-8">
        <div className="flex items-end justify-between font-mono text-[10px] text-surface/40 mb-3">
          <span>
            <span ref={counter} className="text-gold-soft">01</span> / 04
          </span>
          <span className="uppercase tracking-[0.24em]">Scroll to travel</span>
        </div>
        <div className="relative h-4">
          <div className="absolute inset-x-0 bottom-0 flex justify-between items-end">
            {Array.from({ length: TICKS + 1 }).map((_, i) => (
              <span key={i} className={`w-px ${i % 6 === 0 ? 'h-3 bg-white/30' : 'h-1.5 bg-white/12'}`} />
            ))}
          </div>
          {/* The track spans the ruler; moving it by its own width carries the
              cursor from the first tick to the last on transforms alone. */}
          <span className="x-rail-cursor absolute inset-0 pointer-events-none">
            <span className="absolute left-0 bottom-0 -translate-x-1/2 flex flex-col items-center">
              <span className="w-0 h-0 border-x-[4px] border-x-transparent border-t-[6px] border-t-gold mb-0.5" />
              <span className="w-px h-4 bg-gold" />
            </span>
          </span>
        </div>
      </div>
    </section>
  );
};
