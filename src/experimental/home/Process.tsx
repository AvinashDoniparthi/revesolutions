import React, { useRef } from 'react';
import { gsap, MQ, useGSAP } from '../motion';
import { Eyebrow } from '../primitives';

const STEPS = [
  {
    title: 'We Build',
    tag: '100% Handcrafted Code',
    body: 'We design and code a custom website tailored specifically to your business, brand, and target audience.',
  },
  {
    title: 'We Launch',
    tag: 'Zero-Downtime Deployment',
    body: 'We configure domain settings, optimize performance, run security tests, and publish your website live.',
  },
  {
    title: 'We Manage Everything',
    tag: '24/7 Dedicated Care',
    body: 'We handle all monthly content edits, backups, security, bug fixes, and maintenance on a simple plan.',
  },
];

/**
 * Chapter seven. The section pins and the three steps advance in place: the
 * numeral rolls over, the copy crossfades, and a gold rail fills. Below `md`
 * (or with reduced motion) the steps simply stack.
 */
export const Process: React.FC = () => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.desktopMotion, () => {
        const tl = gsap.timeline({
          defaults: { ease: 'power2.inOut' },
          scrollTrigger: { trigger: ref.current, start: 'top top', end: '+=220%', pin: true, scrub: 0.35, anticipatePin: 1 },
        });
        gsap.set('.x-step:not(:first-child)', { opacity: 0, yPercent: 30 });
        tl.fromTo('.x-proc-fill', { scaleY: 0.0 }, { scaleY: 1 / STEPS.length, duration: 0.5, ease: 'none' });
        STEPS.slice(1).forEach((_, i) => {
          const at = 0.5 + i * 1.2;
          tl.to(`.x-step:nth-child(${i + 1})`, { opacity: 0, yPercent: -30, duration: 0.6 }, at)
            .to(`.x-step:nth-child(${i + 2})`, { opacity: 1, yPercent: 0, duration: 0.6 }, at + 0.25)
            .to('.x-proc-num', { yPercent: (-100 / STEPS.length) * (i + 1), duration: 0.7 }, at + 0.1)
            .to('.x-proc-fill', { scaleY: (i + 2) / STEPS.length, duration: 0.7, ease: 'none' }, at)
            .to(`.x-proc-dot-${i + 1}`, { backgroundColor: '#BA9F71', scale: 1.4, duration: 0.3 }, at + 0.5);
        });
        tl.to({}, { duration: 0.5 });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="how-it-works"
      data-nav="dark"
      className="x-grain relative bg-night-3 text-surface overflow-hidden md:h-[100dvh] flex items-center"
    >
      <div className="absolute inset-0 bg-[radial-gradient(50%_60%_at_20%_60%,rgba(186,159,113,0.12),transparent_70%)] pointer-events-none" aria-hidden="true" />

      <div className="relative w-full max-w-[96rem] mx-auto px-5 sm:px-8 lg:px-12 py-28 md:py-0 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-10 items-center">
        <div className="md:col-span-5 space-y-7">
          <Eyebrow tone="light">How it works</Eyebrow>
          <h2 className="text-[clamp(2.3rem,4.2vw,4.25rem)] leading-[1] tracking-[-0.04em] font-medium">
            Three simple steps to <span className="font-serif italic font-normal x-gold-text">website peace of mind.</span>
          </h2>

          {/* Rolling numeral (desktop) */}
          <div className="hidden md:flex items-end gap-6 pt-6">
            <div className="h-[11rem] overflow-hidden">
              <div className="x-proc-num flex flex-col">
                {STEPS.map((_, i) => (
                  <span key={i} className="font-serif italic text-[11rem] leading-none h-[11rem] x-gold-text pr-4">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                ))}
              </div>
            </div>
            <span className="font-mono text-xs text-surface/40 pb-6">/ 03</span>
          </div>
        </div>

        <div className="md:col-span-6 md:col-start-7 flex gap-8 md:gap-12">
          {/* Progress rail */}
          <div className="hidden md:flex relative flex-col justify-between items-center py-2" aria-hidden="true">
            <span className="absolute top-0 bottom-0 w-px bg-white/10" />
            <span className="x-proc-fill absolute top-0 bottom-0 w-px bg-gold origin-top" />
            {STEPS.map((_, i) => (
              <span
                key={i}
                className={`x-proc-dot-${i} relative w-2 h-2 rounded-full ${i === 0 ? 'bg-gold scale-[1.4]' : 'bg-white/25'}`}
              />
            ))}
          </div>

          <ol className="relative flex-1 grid gap-14 motion-safe:md:gap-0 motion-safe:md:min-h-[22rem] motion-safe:md:[&>*]:[grid-area:1/1]">
            {STEPS.map((step, i) => (
              <li key={step.title} className="x-step space-y-6 md:self-center">
                <span className="md:hidden block font-serif italic text-6xl leading-none x-gold-text">{String(i + 1).padStart(2, '0')}</span>
                <span className="inline-flex rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-gold-soft ring-1 ring-gold/30 bg-gold/[0.06]">
                  {step.tag}
                </span>
                <h3 className="text-[clamp(2.2rem,4vw,4rem)] leading-[1] tracking-[-0.04em] font-medium">{step.title}</h3>
                <p className="text-lg text-surface/65 leading-relaxed max-w-md">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};
