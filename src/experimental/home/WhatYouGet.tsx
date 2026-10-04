import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap, MQ, useGSAP } from '../motion';
import { Eyebrow, Pill, Reveal, ScrubWords } from '../primitives';

const HANDOVER = ['New pictures', 'Text changes', 'Seasonal promos', 'Layout tweaks'];

/**
 * Chapter three, the first ivory chapter. It rises over the black with a
 * rounded lip so the change of light reads as a page turning, not a seam.
 */
export const WhatYouGet: React.FC = () => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        // PageSpeed dial: the arc fills to the 95 target as the card arrives.
        gsap.fromTo(
          '.x-dial-arc',
          { strokeDashoffset: 302 },
          {
            strokeDashoffset: 302 * 0.05,
            ease: 'power2.out',
            scrollTrigger: { trigger: '.x-dial', start: 'top 85%', end: 'top 40%', scrub: true },
          },
        );
        gsap.fromTo('.x-check', { x: -16, opacity: 0 }, {
          x: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.9,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.x-checks', start: 'top 85%', once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      data-nav="light"
      className="relative z-10 -mt-10 rounded-t-[2.5rem] bg-ground py-28 md:py-44"
    >
      <div className="max-w-[96rem] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-3 pt-3">
            <Eyebrow>What you get</Eyebrow>
          </div>
          <div className="lg:col-span-9">
            <ScrubWords
              as="h2"
              className="text-[clamp(1.85rem,3.9vw,3.9rem)] leading-[1.08] tracking-[-0.035em] text-ink font-medium"
              text="Design built around your business, not a template. Every site is written as custom code, so it loads quickly, holds its layout on a phone, and gives visitors a clear path to contacting you."
            />
          </div>
        </div>

        <Reveal className="mt-24 md:mt-36 grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Card: ongoing care */}
          <article data-reveal className="group rounded-[2rem] p-1.5 bg-ink/[0.03] ring-1 ring-ink/[0.06]">
            <div className="h-full rounded-[calc(2rem-0.375rem)] bg-surface shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_30px_60px_-30px_rgba(40,30,14,0.18)] p-7 sm:p-10 flex flex-col gap-10">
              <div className="space-y-4">
                <h3 className="text-[1.75rem] sm:text-[2.1rem] leading-[1.08] tracking-[-0.03em] font-medium text-ink">
                  Hand over your website. <span className="font-serif italic text-brand">We keep it current.</span>
                </h3>
                <p className="text-ink-2 leading-relaxed max-w-md">
                  Need new pictures, text changes, seasonal promos, or layout tweaks? Simply message us and our team handles it.
                </p>
              </div>
              <ul className="x-checks grid grid-cols-2 gap-2.5">
                {HANDOVER.map((item) => (
                  <li key={item} className="x-check flex items-center gap-2.5 rounded-full bg-ground ring-1 ring-line px-3.5 py-2.5 text-sm text-ink">
                    <span className="w-5 h-5 rounded-full bg-ink text-gold flex items-center justify-center shrink-0" aria-hidden="true">
                      <svg viewBox="0 0 12 12" className="w-2.5 h-2.5" fill="none">
                        <path d="m2.5 6.2 2.2 2.2L9.5 3.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-6 border-t border-line flex flex-wrap items-center justify-between gap-4">
                <span className="text-sm text-brand font-medium">Build once, then we maintain it</span>
                <Pill to="/contact" tone="dark">
                  Let's Talk
                </Pill>
              </div>
            </div>
          </article>

          {/* Card: performance and hosting, dark for contrast within the pair */}
          <article data-reveal className="group rounded-[2rem] p-1.5 bg-ink/[0.03] ring-1 ring-ink/[0.06]">
            <div className="relative h-full overflow-hidden rounded-[calc(2rem-0.375rem)] bg-night-3 text-surface shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] p-7 sm:p-10 flex flex-col gap-10">
              <div className="absolute -right-40 -top-40 w-[28rem] h-[28rem] bg-[radial-gradient(closest-side,rgba(186,159,113,0.2),transparent)] pointer-events-none" aria-hidden="true" />
              <div className="relative space-y-4">
                <h3 className="text-[1.75rem] sm:text-[2.1rem] leading-[1.08] tracking-[-0.03em] font-medium text-surface">
                  Fast pages, and hosting <span className="font-serif italic text-gold-soft">we look after.</span>
                </h3>
                <p className="text-surface/65 leading-relaxed max-w-md">
                  We build to hit 95+ on Google PageSpeed Insights, because faster sites rank better and lose fewer visitors. Daily automated backups and SSL are included.
                </p>
              </div>

              <div className="relative flex items-center gap-8">
                <div className="x-dial relative w-28 h-28 shrink-0">
                  <svg viewBox="0 0 112 112" className="w-full h-full -rotate-90" aria-hidden="true">
                    <circle cx="56" cy="56" r="48" stroke="rgba(255,255,255,0.08)" strokeWidth="5" fill="none" />
                    <circle
                      className="x-dial-arc"
                      cx="56"
                      cy="56"
                      r="48"
                      stroke="url(#x-dial-gold)"
                      strokeWidth="5"
                      strokeLinecap="round"
                      fill="none"
                      strokeDasharray="302"
                      strokeDashoffset={302 * 0.05}
                    />
                    <defs>
                      <linearGradient id="x-dial-gold" x1="0" y1="0" x2="112" y2="112" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#E3CFA4" />
                        <stop offset="1" stopColor="#9C8257" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-medium tracking-tight">95+</span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-surface/45">target</span>
                  </div>
                </div>
                <ul className="space-y-2.5 text-sm text-surface/75">
                  {['PageSpeed Insights 95+', 'Daily automated backups', 'SSL included'].map((t) => (
                    <li key={t} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold" aria-hidden="true" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative mt-auto pt-6 border-t border-white/10">
                <Link
                  to="/services#website-maintenance"
                  className="x-underline inline-flex items-center gap-2 text-sm text-gold-soft pb-0.5"
                >
                  See security &amp; performance details
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
};
