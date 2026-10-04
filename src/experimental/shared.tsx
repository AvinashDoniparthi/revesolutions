import React, { useRef } from 'react';
import { gsap, MQ, useGSAP } from './motion';
import { Eyebrow, Pill } from './primitives';

const d = (s: string) => ({ '--d': s }) as React.CSSProperties;

/**
 * Opening chapter for the inner pages: the home hero's language at a smaller
 * scale. Lines rise out of masks in CSS (so it plays from prerendered HTML),
 * the horizon line draws, and the block drifts up as the reader scrolls away.
 */
export const PageHero: React.FC<{
  eyebrow: string;
  lines: React.ReactNode[];
  body: React.ReactNode;
  aside?: React.ReactNode;
}> = ({ eyebrow, lines, body, aside }) => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.to('.x-ph-inner', {
          yPercent: -14,
          opacity: 0.25,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} data-nav="dark" className="x-grain relative bg-night-3 text-surface overflow-hidden">
      <div
        className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 w-[120vw] h-[60vh] pointer-events-none bg-[radial-gradient(closest-side,rgba(186,159,113,0.2),transparent)]"
        aria-hidden="true"
      />
      <div className="x-ph-inner relative max-w-[96rem] mx-auto px-5 sm:px-8 lg:px-12 pt-40 sm:pt-48 pb-24 sm:pb-32">
        <div className="x-fade-in" style={d('0.05s')}>
          <Eyebrow tone="light">{eyebrow}</Eyebrow>
        </div>
        <h1 className="mt-10 font-medium tracking-[-0.045em] leading-[0.96] text-[clamp(2.75rem,7vw,7.5rem)]">
          {lines.map((line, i) => (
            <span key={i} className="x-line-mask">
              <span style={d(`${i * 0.09}s`)}>{line}</span>
            </span>
          ))}
        </h1>
        <div className="x-horizon x-draw origin-left mt-14 sm:mt-20" style={d('0.3s')} />
        <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <p className="md:col-span-6 lg:col-span-5 text-base sm:text-lg leading-relaxed text-surface/65 x-fade-in" style={d('0.45s')}>
            {body}
          </p>
          {aside && (
            <div className="md:col-span-6 lg:col-span-6 lg:col-start-7 x-fade-in" style={d('0.55s')}>
              {aside}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

/**
 * Closing panel shared by the inner pages: a dark slab inset from the edges,
 * with the logo's horizon glowing under the question.
 */
export const CtaPanel: React.FC<{ title: React.ReactNode; body: string }> = ({ title, body }) => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          '.x-cta-slab',
          { scale: 0.92, borderRadius: '4rem' },
          {
            scale: 1,
            borderRadius: '2.5rem',
            ease: 'none',
            scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'top 30%', scrub: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} data-nav="light" className="bg-ground px-3 sm:px-5 pb-3 sm:pb-5 pt-10">
      <div data-nav="dark" className="x-cta-slab relative overflow-hidden rounded-[2.5rem] bg-night-3 text-surface px-6 py-24 sm:py-32 text-center">
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(60%_80%_at_50%_100%,rgba(186,159,113,0.22),transparent_70%)] pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-4xl mx-auto space-y-8">
          <h2 className="text-[clamp(2.3rem,5.4vw,5.5rem)] leading-[1] tracking-[-0.045em] font-medium">{title}</h2>
          <div className="x-horizon w-40 mx-auto" />
          <p className="text-lg text-surface/65 leading-relaxed max-w-xl mx-auto">{body}</p>
          <div className="pt-2">
            <Pill to="/contact" tone="gold" size="lg">
              Let's Talk
            </Pill>
          </div>
        </div>
      </div>
    </section>
  );
};
